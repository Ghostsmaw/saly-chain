#!/usr/bin/env bash
# Provision SALY_L3 treasury hot wallets and print env vars for execution + on-chain roles.
set -euo pipefail
export L3_STACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
. "${L3_STACK_DIR}/../devnet/scripts/lib.sh"
. "${L3_STACK_DIR}/../shared/scripts/ops-http.sh"

main() {
  load_env
  : "${WALLET_BASE_URL:=http://localhost:4002}"
  : "${OPS_ORG_ID:=treasury-ops}"

  require_http "${WALLET_BASE_URL}/v1/health"

  log "Provisioning SalySD minter wallet (HOT_OPERATIONAL on SALY_L3)"
  local minter_resp burner_resp
  minter_resp="$(post_json "${WALLET_BASE_URL}/v1/wallets" "$(jq -n \
    --arg org "${OPS_ORG_ID}" \
    '{ chain: "SALY_L3", kind: "HOT_OPERATIONAL", owner_id: $org, owner_kind: "ORG", label: "salysd-minter" }')" \
    -H "X-Org-Id: ${OPS_ORG_ID}")"
  burner_resp="$(post_json "${WALLET_BASE_URL}/v1/wallets" "$(jq -n \
    --arg org "${OPS_ORG_ID}" \
    '{ chain: "SALY_L3", kind: "HOT_OPERATIONAL", owner_id: $org, owner_kind: "ORG", label: "salysd-burner" }')" \
    -H "X-Org-Id: ${OPS_ORG_ID}")"

  local minter_id minter_addr burner_id burner_addr
  minter_id="$(json_get "${minter_resp}" '.id')"
  minter_addr="$(json_get "${minter_resp}" '.address')"
  burner_id="$(json_get "${burner_resp}" '.id')"
  burner_addr="$(json_get "${burner_resp}" '.address')"

  ok "Minter wallet ${minter_id} → ${minter_addr}"
  ok "Burner wallet ${burner_id} → ${burner_addr}"

  cat <<EOF

# Add to execution .env:
SALYSD_MINTER_WALLET_ID=${minter_id}
SALYSD_BURNER_WALLET_ID=${burner_id}
L3_NETWORK=saly-testnet

# Use these addresses when deploying SalySD (DeploySalySD.s.sol):
SALYSD_MINTER=${minter_addr}
SALYSD_BURNER=${burner_addr}
SALYSD_ADMIN=${SALYSD_ADMIN:-${minter_addr}}

# Grant on-chain roles if redeploying to existing token:
# cast send \$L3_SALYSD_ADDRESS "grantRole(bytes32,address)" \$MINTER_ROLE ${minter_addr}
# cast send \$L3_SALYSD_ADDRESS "grantRole(bytes32,address)" \$BURNER_ROLE ${burner_addr}

EOF
}

main "$@"
