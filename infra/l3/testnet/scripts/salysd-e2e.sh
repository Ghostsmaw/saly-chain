#!/usr/bin/env bash
# Smoke test: SalySD mint + redeem via stablecoin → execution (requires deployed token + treasury wallets).
set -euo pipefail
export L3_STACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
. "${L3_STACK_DIR}/../devnet/scripts/lib.sh"
. "${L3_STACK_DIR}/../shared/scripts/ops-http.sh"

main() {
  load_env
  : "${STABLECOIN_BASE_URL:=http://localhost:4022}"
  : "${EXECUTION_BASE_URL:=http://localhost:4003}"
  : "${MINT_AMOUNT_MINOR:=1000000}"
  : "${OPS_ORG_ID:=demo-org}"

  require_env STABLECOIN_DEFAULT_RESERVE_ACCOUNT_ID
  require_env SALYSD_DESTINATION_WALLET_ID
  require_env SALYSD_SOURCE_WALLET_ID

  require_http "${STABLECOIN_BASE_URL}/v1/health"
  require_http "${EXECUTION_BASE_URL}/v1/health"

  local idem="salysd-e2e-$(date +%s)"

  log "Creating mint request"
  local mint
  mint="$(post_json "${STABLECOIN_BASE_URL}/v1/mint-requests" "$(jq -n \
    --arg key "${idem}:mint" \
    --arg amt "${MINT_AMOUNT_MINOR}" \
    --arg dst "${SALYSD_DESTINATION_WALLET_ID}" \
    --arg res "${STABLECOIN_DEFAULT_RESERVE_ACCOUNT_ID}" \
    '{ idempotency_key: $key, amount_minor: $amt, destination_wallet_id: $dst, reserve_account_id: $res, chain: "SALY_L3" }')" \
    -H "X-Org-Id: ${OPS_ORG_ID}")"
  local mint_id
  mint_id="$(json_get "${mint}" '.id')"
  ok "Mint request ${mint_id}"

  log "Approving mint (on-chain broadcast)"
  post_json "${STABLECOIN_BASE_URL}/v1/mint-requests/${mint_id}/approve" "{}" \
    -H "X-Org-Id: ${OPS_ORG_ID}" >/dev/null
  ok "Mint approval submitted — wait for L3 listener + TX_SETTLED"

  log "Creating redeem request (INTERNAL rail)"
  local redeem
  redeem="$(post_json "${STABLECOIN_BASE_URL}/v1/redeem-requests" "$(jq -n \
    --arg key "${idem}:redeem" \
    --arg amt "${MINT_AMOUNT_MINOR}" \
    --arg src "${SALYSD_SOURCE_WALLET_ID}" \
    '{ idempotency_key: $key, amount_minor: $amt, source_wallet_id: $src, payout_rail: "INTERNAL", chain: "SALY_L3" }')" \
    -H "X-Org-Id: ${OPS_ORG_ID}")"
  local redeem_id
  redeem_id="$(json_get "${redeem}" '.id')"

  log "Approving redeem (burn)"
  post_json "${STABLECOIN_BASE_URL}/v1/redeem-requests/${redeem_id}/approve" "{}" \
    -H "X-Org-Id: ${OPS_ORG_ID}" >/dev/null
  ok "Redeem approval submitted — wait for burn confirmation"

  ok "SalySD E2E flow initiated (mint_id=${mint_id}, redeem_id=${redeem_id})"
}

main "$@"
