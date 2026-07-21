#!/usr/bin/env bash
# Provision a funded XRPL testnet wallet for partner-flow smoke.
# Prints: export SMOKE_WALLET_ID=<uuid>
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
# shellcheck disable=SC1091
source "$ROOT/scripts/smoke/lib.sh"

smoke_require_cmd curl
smoke_require_cmd jq

WALLET_URL="${SMOKE_WALLET_URL:-http://localhost:4002}"
DEST="${SMOKE_DEST_ADDRESS:-rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe}"
FAUCET_URL="${SMOKE_XRPL_FAUCET_URL:-https://faucet.altnet.rippletest.net/accounts}"
# Execution resolves XRPL wallets via listWalletsByActor(actor.id) — owner_id must match.
OWNER_ID="${SMOKE_OWNER_ID:-usr_smoke_$(date +%s)}"

curl_auth=()
if [[ -n "${INTERNAL_SERVICE_TOKEN:-}" ]]; then
  curl_auth=(-H "x-internal-token: ${INTERNAL_SERVICE_TOKEN}")
fi

echo "==> Create XRPL wallet via $WALLET_URL (owner=$OWNER_ID)" >&2
CREATE=$(curl -sS -XPOST "$WALLET_URL/v1/wallets" \
  ${curl_auth[@]+"${curl_auth[@]}"} \
  -H 'content-type: application/json' \
  -d @<(cat <<JSON
{
  "chain": "XRPL",
  "kind": "USER_CUSTODIAL",
  "owner_id": "$OWNER_ID",
  "owner_kind": "USER",
  "label": "smoke-partner-xrpl"
}
JSON
))
WALLET_ID=$(echo "$CREATE" | jq -r .id)
ADDRESS=$(echo "$CREATE" | jq -r .address)
[[ "$WALLET_ID" != "null" && -n "$WALLET_ID" ]] || {
  echo "wallet create failed: $CREATE" >&2
  exit 1
}
echo "    wallet=$WALLET_ID address=$ADDRESS" >&2

echo "==> Patch destination allowlist (+ $DEST)" >&2
curl -sS -XPATCH "$WALLET_URL/v1/wallets/$WALLET_ID/policy" \
  ${curl_auth[@]+"${curl_auth[@]}"} \
  -H 'content-type: application/json' \
  -d "{\"destination_allowlist\":[\"$DEST\",\"*\"]}" >/dev/null

echo "==> Fund via XRPL faucet" >&2
FAUCET=$(curl -sS -XPOST "$FAUCET_URL" \
  -H 'content-type: application/json' \
  -d "{\"destination\":\"$ADDRESS\"}" || true)
echo "    faucet response: $(echo "$FAUCET" | jq -c . 2>/dev/null || echo "$FAUCET")" >&2
sleep "${SMOKE_FAUCET_WAIT_SEC:-8}"

# Book ledger deposit so chain-reservation settle can CR custody without insolvency.
#   DR asset.custody.xrpl.xrp
#   CR liability.wallet.{walletId}.xrp
# Never fail the seed on ledger booking — wallet UUID must still be exported for partner-flow.
LEDGER_URL="${SMOKE_LEDGER_URL:-http://localhost:4001}"
FUND_MINOR="${SMOKE_LEDGER_FUND_MINOR:-100000000}"

ledger_curl() {
  if ((${#curl_auth[@]} > 0)); then
    curl -sS "${curl_auth[@]}" "$@"
  else
    curl -sS "$@"
  fi
}

book_ledger_deposit() {
  if ! curl -sf -m 2 "$LEDGER_URL/v1/health" >/dev/null 2>&1; then
    echo "    WARN: ledger not reachable at $LEDGER_URL — skip deposit booking (settle may fail)" >&2
    return 0
  fi
  echo "==> Book ledger deposit ($FUND_MINOR drops) at $LEDGER_URL" >&2
  local cust wliab cust_id wliab_id wallet_code
  cust="$(ledger_curl "$LEDGER_URL/v1/accounts/by-code/asset.custody.xrpl.xrp" 2>/dev/null || true)"
  cust_id="$(echo "$cust" | jq -r '.id // empty' 2>/dev/null || true)"
  if [[ -z "$cust_id" ]]; then
    cust="$(ledger_curl -XPOST "$LEDGER_URL/v1/accounts" \
      -H 'content-type: application/json' \
      -d '{"code":"asset.custody.xrpl.xrp","type":"ASSET","currency":"XRP","ownerId":"treasury-custody","ownerKind":"SYSTEM"}' 2>/dev/null || true)"
    cust_id="$(echo "$cust" | jq -r '.id // empty' 2>/dev/null || true)"
  fi
  wallet_code="liability.wallet.${WALLET_ID}.xrp"
  wliab="$(ledger_curl "$LEDGER_URL/v1/accounts/by-code/${wallet_code}" 2>/dev/null || true)"
  wliab_id="$(echo "$wliab" | jq -r '.id // empty' 2>/dev/null || true)"
  if [[ -z "$wliab_id" ]]; then
    wliab="$(ledger_curl -XPOST "$LEDGER_URL/v1/accounts" \
      -H 'content-type: application/json' \
      -d "{\"code\":\"${wallet_code}\",\"type\":\"LIABILITY\",\"currency\":\"XRP\",\"ownerId\":\"${OWNER_ID}\",\"ownerKind\":\"USER\"}" 2>/dev/null || true)"
    wliab_id="$(echo "$wliab" | jq -r '.id // empty' 2>/dev/null || true)"
  fi
  if [[ -z "$cust_id" || -z "$wliab_id" ]]; then
    echo "    WARN: could not resolve ledger accounts for deposit booking (cust=${cust_id:-none} wallet=${wliab_id:-none})" >&2
    return 0
  fi
  ledger_curl -XPOST "$LEDGER_URL/v1/journal/entries" \
    -H 'content-type: application/json' \
    -d "{\"idempotency_key\":\"smoke:deposit:${WALLET_ID}\",\"memo\":\"Smoke XRPL faucet deposit booking\",\"postings\":[{\"account_id\":\"${cust_id}\",\"direction\":\"DEBIT\",\"amount_minor\":\"${FUND_MINOR}\",\"currency\":\"XRP\"},{\"account_id\":\"${wliab_id}\",\"direction\":\"CREDIT\",\"amount_minor\":\"${FUND_MINOR}\",\"currency\":\"XRP\"}]}" \
    >/dev/null 2>&1 || {
    echo "    WARN: ledger deposit journal failed (non-fatal)" >&2
    return 0
  }
  echo "    ledger deposit booked wallet=${wallet_code} custody=${cust_id}" >&2
}

book_ledger_deposit || true

echo "export SMOKE_WALLET_ID=$WALLET_ID"
echo "SMOKE_WALLET_ID=$WALLET_ID" >&2
