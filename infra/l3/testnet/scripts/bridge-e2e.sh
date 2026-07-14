#!/usr/bin/env bash
# Smoke test: Base → L3 bridge deposit + L3 → Base withdraw (requires funded custodial wallets).
set -euo pipefail
export L3_STACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
. "${L3_STACK_DIR}/../devnet/scripts/lib.sh"
. "${L3_STACK_DIR}/../shared/scripts/ops-http.sh"

main() {
  load_env
  : "${EXECUTION_BASE_URL:=http://localhost:4003}"
  : "${BRIDGE_AMOUNT_MINOR:=1000000}"
  : "${OPS_ORG_ID:=demo-org}"
  require_env BRIDGE_BASE_SOURCE_WALLET_ID
  require_env BRIDGE_L3_DEST_WALLET_ID

  require_http "${EXECUTION_BASE_URL}/v1/health"

  log "Bridge status"
  get_json "${EXECUTION_BASE_URL}/v1/bridge/status" | jq .

  local idem="bridge-e2e-$(date +%s)"
  log "Initiating bridge deposit (${BRIDGE_AMOUNT_MINOR} minor USDC)"
  local dep
  dep="$(post_json "${EXECUTION_BASE_URL}/v1/bridge/deposit" "$(jq -n \
    --arg key "${idem}:dep" \
    --arg src "${BRIDGE_BASE_SOURCE_WALLET_ID}" \
    --arg dst "${BRIDGE_L3_DEST_WALLET_ID}" \
    --arg amt "${BRIDGE_AMOUNT_MINOR}" \
    '{ idempotency_key: $key, source_wallet_id: $src, destination_wallet_id: $dst, amount_minor: $amt, asset: "USDC" }')" \
    -H "X-Org-Id: ${OPS_ORG_ID}")"
  local dep_id
  dep_id="$(json_get "${dep}" '.id')"
  ok "Bridge deposit tx ${dep_id} (poll manually / via listeners for SETTLED)"

  if [ -n "${BRIDGE_L3_SOURCE_WALLET_ID:-}" ] && [ -n "${BRIDGE_BASE_DEST_ADDRESS:-}" ]; then
    log "Initiating bridge withdraw"
    local wit
    wit="$(post_json "${EXECUTION_BASE_URL}/v1/bridge/withdraw" "$(jq -n \
      --arg key "${idem}:wit" \
      --arg src "${BRIDGE_L3_SOURCE_WALLET_ID}" \
      --arg dst "${BRIDGE_BASE_DEST_ADDRESS}" \
      --arg amt "${BRIDGE_AMOUNT_MINOR}" \
      '{ idempotency_key: $key, source_wallet_id: $src, destination_address: $dst, amount_minor: $amt, asset: "USDC" }')" \
      -H "X-Org-Id: ${OPS_ORG_ID}")"
    ok "Bridge withdraw tx $(json_get "${wit}" '.id')"
  else
    warn "Set BRIDGE_L3_SOURCE_WALLET_ID + BRIDGE_BASE_DEST_ADDRESS to run withdraw leg"
  fi

  ok "Bridge E2E initiated — confirm via listeners + ledger reconciliation"
}

main "$@"
