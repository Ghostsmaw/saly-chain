#!/usr/bin/env bash
# Staging/local e2e: provision → webhook → intent → poll settle → assert delivery.
#
# Required: jq, curl, python3
# Env:
#   SMOKE_GATEWAY_URL   (default http://localhost:4000)
#   SMOKE_APIKEYS_URL   (default http://localhost:4009)
#   SMOKE_API_KEY       optional — skip org/key provisioning when set
#   SMOKE_WALLET_ID     UUID wallet (auto-seeded if unset and SMOKE_AUTO_SEED=1)
#   INTERNAL_SERVICE_TOKEN  forwarded as x-internal-token to apikeys/wallet
#   SMOKE_SETTLE_TIMEOUT_SEC (default 180)
#   SMOKE_SKIP_SETTLE=1      accept ACCEPTED without waiting for SETTLED
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
# shellcheck disable=SC1091
source "$ROOT/scripts/smoke/lib.sh"

smoke_require_cmd curl
smoke_require_cmd jq
smoke_require_cmd python3

GATEWAY_URL="${SMOKE_GATEWAY_URL:-http://localhost:4000}"
APIKEYS_URL="${SMOKE_APIKEYS_URL:-http://localhost:4009}"
SETTLE_TIMEOUT_SEC="${SMOKE_SETTLE_TIMEOUT_SEC:-180}"
WEBHOOK_PORT="${SMOKE_WEBHOOK_PORT:-18080}"
DEST_ADDRESS="${SMOKE_DEST_ADDRESS:-rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe}"
TMPDIR="$(mktemp -d)"
trap 'rm -rf "$TMPDIR"; kill "${WEBHOOK_PID:-}" 2>/dev/null || true' EXIT

internal_headers=()
if [[ -n "${INTERNAL_SERVICE_TOKEN:-}" ]]; then
  internal_headers=(-H "x-internal-token: ${INTERNAL_SERVICE_TOKEN}")
fi

is_uuid() {
  [[ "${1:-}" =~ ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$ ]]
}

echo "==> Health: gateway"
smoke_http_ok "$GATEWAY_URL/v1/health" || {
  echo "gateway unhealthy at $GATEWAY_URL/v1/health" >&2
  exit 1
}

gen_prefixed() {
  local prefix="$1"
  NODE_PATH="$ROOT/services/gateway/node_modules${NODE_PATH:+:$NODE_PATH}" \
    node -e "const {ulid}=require('ulid'); process.stdout.write('${prefix}_'+ulid())"
}

# Actor must own the XRPL wallet (execution listWalletsByActor).
ACTOR_ID="${SMOKE_ACTOR_ID:-$(gen_prefixed usr)}"
echo "    actor=$ACTOR_ID"

# ── Wallet ───────────────────────────────────────────────────────────────────
if [[ -z "${SMOKE_WALLET_ID:-}" ]]; then
  if [[ "${SMOKE_AUTO_SEED:-1}" == "1" ]]; then
    echo "==> Auto-seeding XRPL wallet (SMOKE_WALLET_ID unset)"
    # shellcheck disable=SC1090
    eval "$(SMOKE_OWNER_ID="$ACTOR_ID" bash "$ROOT/scripts/smoke/seed-partner-wallet.sh")"
  else
    echo "SMOKE_WALLET_ID is required (UUID). Run scripts/smoke/seed-partner-wallet.sh" >&2
    exit 1
  fi
fi
WALLET_ID="${SMOKE_WALLET_ID:-}"
if ! is_uuid "$WALLET_ID"; then
  echo "SMOKE_WALLET_ID must be a UUID (got '${WALLET_ID:-}'). Placeholder wal_DEMO_* is not valid." >&2
  exit 1
fi
echo "    wallet=$WALLET_ID"

# ── Local webhook sink ───────────────────────────────────────────────────────
RECEIVED="$TMPDIR/webhook.jsonl"
: >"$RECEIVED"
python3 - "$WEBHOOK_PORT" "$RECEIVED" <<'PY' &
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

port = int(sys.argv[1])
out_path = sys.argv[2]

class H(BaseHTTPRequestHandler):
    def do_POST(self):
        n = int(self.headers.get("Content-Length", "0"))
        body = self.rfile.read(n)
        with open(out_path, "ab") as f:
            f.write(body + b"\n")
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'{"ok":true}')
    def log_message(self, *_args):
        return

HTTPServer(("127.0.0.1", port), H).serve_forever()
PY
WEBHOOK_PID=$!
sleep 0.4
WEBHOOK_URL="http://127.0.0.1:${WEBHOOK_PORT}/smoke"

# ── API key ──────────────────────────────────────────────────────────────────
if [[ -n "${SMOKE_API_KEY:-}" ]]; then
  SECRET="$SMOKE_API_KEY"
  echo "==> Using SMOKE_API_KEY"
else
  echo "==> Provision org + API key via $APIKEYS_URL"
  ORG_JSON=$(curl -sS -XPOST "$APIKEYS_URL/v1/orgs" \
    ${internal_headers[@]+"${internal_headers[@]}"} \
    -H 'content-type: application/json' \
    -d "{\"name\":\"Smoke $(date +%s)\",\"default_rate_limit_per_min\":600}")
  ORG=$(echo "$ORG_JSON" | jq -r .id)
  [[ "$ORG" != "null" && -n "$ORG" ]] || { echo "org create failed: $ORG_JSON" >&2; exit 1; }

  ISSUE=$(curl -sS -XPOST "$APIKEYS_URL/v1/api-keys" \
    ${internal_headers[@]+"${internal_headers[@]}"} \
    -H 'content-type: application/json' \
    -d @<(cat <<JSON
{
  "org_id": "$ORG",
  "environment": "TEST",
  "scopes": ["intents:write", "intents:read", "transactions:read", "webhooks:write"],
  "description": "smoke partner-flow"
}
JSON
))
  SECRET=$(echo "$ISSUE" | jq -r .secret)
  [[ "$SECRET" != "null" && -n "$SECRET" ]] || { echo "api key issue failed: $ISSUE" >&2; exit 1; }
  echo "    org=$ORG"
fi

# ── Webhook subscription ─────────────────────────────────────────────────────
echo "==> Subscribe webhook → $WEBHOOK_URL"
SUB=$(curl -sS -XPOST "$GATEWAY_URL/v1/webhooks" \
  -H "authorization: Bearer $SECRET" \
  -H 'content-type: application/json' \
  -d @<(cat <<JSON
{
  "url": "$WEBHOOK_URL",
  "subjects": ["salychain.tx.settled", "salychain.tx.failed", "salychain.intent.routed"],
  "description": "smoke partner-flow sink"
}
JSON
))
SUB_ID=$(echo "$SUB" | jq -r '.subscription.id // .id // empty')
[[ -n "$SUB_ID" ]] || { echo "webhook subscribe failed: $SUB" >&2; exit 1; }
echo "    subscription=$SUB_ID"

# ── Intent (canonical schema v1) ─────────────────────────────────────────────
INTENT_ID="$(gen_prefixed itn)"
IDEMP="smoke-$INTENT_ID"
echo "==> Submit intent $INTENT_ID"
INTENT_RESP=$(curl -sS -XPOST "$GATEWAY_URL/v1/intents" \
  -H "authorization: Bearer $SECRET" \
  -H "idempotency-key: $IDEMP" \
  -H 'content-type: application/json' \
  -d @<(cat <<JSON
{
  "intent": {
    "version": "1",
    "intent_id": "$INTENT_ID",
    "kind": "PAYOUT",
    "actor": { "type": "USER", "id": "$ACTOR_ID" },
    "source": { "amount": { "amount_minor": "1000000", "currency": "XRP" } },
    "destination": {
      "currency": "XRP",
      "beneficiary": {
        "kind": "WALLET",
        "chain": "XRPL",
        "address": "$DEST_ADDRESS",
        "memo": "smoke-partner-flow"
      }
    },
    "context": { "channel": "API" },
    "metadata": { "source_wallet_id": "$WALLET_ID" }
  }
}
JSON
))
STATE=$(echo "$INTENT_RESP" | jq -r '.state // .intent.state // empty')
TX_ID=$(echo "$INTENT_RESP" | jq -r '.execution_transaction_id // .transaction_id // empty')
REJECTION=$(echo "$INTENT_RESP" | jq -c '.rejection // empty')
echo "    state=$STATE tx=$TX_ID"
[[ -n "$STATE" ]] || { echo "intent submit failed: $INTENT_RESP" >&2; exit 1; }
case "$STATE" in
  RECEIVED|ACCEPTED|ROUTED|EXECUTING|AWAITING_CONFIRMATION|SETTLED) ;;
  *)
    echo "FAIL unexpected intent state='$STATE' rejection=$REJECTION" >&2
    echo "$INTENT_RESP" | jq . >&2 || true
    exit 1
    ;;
esac

# Resolve execution tx id (gateway may ACK RECEIVED before execution attaches).
if [[ -z "$TX_ID" || "$TX_ID" == "null" ]]; then
  echo "==> Poll intent for execution_transaction_id"
  deadline=$((SECONDS + 60))
  while (( SECONDS < deadline )); do
    INTENT_JSON=$(curl -sS -H "authorization: Bearer $SECRET" \
      "$GATEWAY_URL/v1/intents/$INTENT_ID" || true)
    STATE=$(echo "$INTENT_JSON" | jq -r '.state // empty')
    TX_ID=$(echo "$INTENT_JSON" | jq -r '.execution_transaction_id // .transaction_id // empty')
    REJECTION=$(echo "$INTENT_JSON" | jq -c '.rejection // empty')
    echo "    intent state=$STATE tx=$TX_ID"
    case "$STATE" in
      REJECTED|FAILED)
        echo "FAIL intent $STATE rejection=$REJECTION" >&2
        echo "$INTENT_JSON" | jq . >&2 || true
        exit 1
        ;;
    esac
    if [[ -n "$TX_ID" && "$TX_ID" != "null" ]]; then
      break
    fi
    sleep 2
  done
fi

# ── Poll settle ──────────────────────────────────────────────────────────────
if [[ "${SMOKE_SKIP_SETTLE:-}" == "1" ]]; then
  echo "==> Skipping settle wait (SMOKE_SKIP_SETTLE=1)"
else
  if [[ -z "$TX_ID" || "$TX_ID" == "null" ]]; then
    echo "FAIL no execution_transaction_id for settle poll" >&2
    exit 1
  fi
  echo "==> Poll transaction $TX_ID (timeout ${SETTLE_TIMEOUT_SEC}s)"
  deadline=$((SECONDS + SETTLE_TIMEOUT_SEC))
  TX_STATE=""
  TX_JSON="{}"
  while (( SECONDS < deadline )); do
    TX_JSON=$(curl -sS -H "authorization: Bearer $SECRET" \
      "$GATEWAY_URL/v1/transactions/$TX_ID" || true)
    TX_STATE=$(echo "$TX_JSON" | jq -r '.state // .status // empty')
    case "$TX_STATE" in
      SETTLED|FAILED|REVERSED)
        echo "    terminal state=$TX_STATE"
        break
        ;;
    esac
    sleep 3
  done
  if [[ "$TX_STATE" != "SETTLED" ]]; then
    echo "FAIL expected SETTLED, got '${TX_STATE:-timeout}'" >&2
    echo "$TX_JSON" | jq . >&2 || true
    exit 1
  fi
fi

# ── Webhook evidence ─────────────────────────────────────────────────────────
echo "==> Check webhook deliveries"
sleep 2
if [[ ! -s "$RECEIVED" ]]; then
  # routed may fire before settle; for SKIP_SETTLE still require at least one POST
  echo "FAIL no webhook POSTs received at sink" >&2
  exit 1
fi
COUNT=$(wc -l <"$RECEIVED" | tr -d ' ')
echo "    received $COUNT delivery payload(s)"
echo "OK partner-flow smoke passed"
