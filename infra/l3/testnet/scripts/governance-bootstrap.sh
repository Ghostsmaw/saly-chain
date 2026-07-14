#!/usr/bin/env bash
# Milestone E ops wiring: governance executor wallet + SalySD PAUSER_ROLE + env output.
set -euo pipefail
export L3_STACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
. "${L3_STACK_DIR}/../devnet/scripts/lib.sh"
. "${L3_STACK_DIR}/../shared/scripts/ops-http.sh"

main() {
  load_env

  : "${WALLET_BASE_URL:=http://localhost:4002}"
  : "${CONTRACT_REGISTRY_BASE_URL:=http://localhost:4013}"
  : "${OPS_ORG_ID:=treasury-ops}"
  : "${L3_L3_RPC_URL:=http://127.0.0.1:${L3_GETH_HTTP_PORT:-9545}}"

  local salysd
  if [ -f "${MANIFEST_FILE}" ]; then
    salysd="$(jq -r '.assets.SalySD // empty' "${MANIFEST_FILE}")"
  fi
  salysd="${salysd:-${L3_SALYSD_ADDRESS:-}}"
  if [ -z "${salysd}" ] || [ "${salysd}" = "0x0000000000000000000000000000000000000000" ]; then
    die "SalySD address missing — run pnpm l3:testnet:deploy:salysd first (or set L3_SALYSD_ADDRESS in ${ENV_FILE})"
  fi

  require_http "${WALLET_BASE_URL}/v1/health"

  log "Provisioning governance executor wallet (HOT_OPERATIONAL on SALY_L3)"
  local executor_resp executor_id executor_addr
  executor_resp="$(post_json "${WALLET_BASE_URL}/v1/wallets" "$(jq -n \
    --arg org "${OPS_ORG_ID}" \
    '{ chain: "SALY_L3", kind: "HOT_OPERATIONAL", owner_id: $org, owner_kind: "ORG", label: "governance-executor" }')" \
    -H "X-Org-Id: ${OPS_ORG_ID}")"
  executor_id="$(json_get "${executor_resp}" '.id')"
  executor_addr="$(json_get "${executor_resp}" '.address')"
  ok "Executor wallet ${executor_id} → ${executor_addr}"

  if [ -n "${SALYSD_ADMIN_PRIVATE_KEY:-${DEPLOYER_PRIVATE_KEY:-}}" ]; then
    export SALYSD_ADMIN_PRIVATE_KEY="${SALYSD_ADMIN_PRIVATE_KEY:-${DEPLOYER_PRIVATE_KEY:-}}"
    validate_hex_key SALYSD_ADMIN_PRIVATE_KEY
    local admin_key="${SALYSD_ADMIN_PRIVATE_KEY}"
    local pauser_role
    pauser_role="$(cast keccak "PAUSER_ROLE")"
    log "Granting PAUSER_ROLE on SalySD to executor ${executor_addr}"
    cast send "${salysd}" "grantRole(bytes32,address)" "${pauser_role}" "${executor_addr}" \
      --rpc-url "${L3_L3_RPC_URL}" \
      --private-key "${admin_key}" >/dev/null
    ok "PAUSER_ROLE granted"
  else
    warn "Set SALYSD_ADMIN_PRIVATE_KEY to auto-grant PAUSER_ROLE"
    log "  cast send ${salysd} \"grantRole(bytes32,address)\" \$(cast keccak PAUSER_ROLE) ${executor_addr} --rpc-url ${L3_L3_RPC_URL} --private-key \$ADMIN_KEY"
  fi

  if curl -sf "${CONTRACT_REGISTRY_BASE_URL}/v1/health" >/dev/null 2>&1; then
    log "Restart contract-registry to pick up manifest sync (or POST governance deployment manually)"
  fi

  cat <<EOF

# Add to services/contract-registry/.env:
GOVERNANCE_EXECUTOR_WALLET_ID=${executor_id}
WALLET_BASE_URL=${WALLET_BASE_URL}
L3_NETWORK=${L3_NETWORK:-saly-testnet}
L3_L3_RPC_URL=${L3_L3_RPC_URL}
L3_ATTESTATION_REGISTRY_ADDRESS=$(jq -r '.assets.SalyAttestationRegistry // empty' "${MANIFEST_FILE}" 2>/dev/null || true)
L3_SALYSD_ADDRESS=${salysd}

# Add to apps/admin/.env.local (optional):
CONTRACT_REGISTRY_BASE_URL=${CONTRACT_REGISTRY_BASE_URL}

# Verify wiring:
pnpm governance:verify

EOF
}

main "$@"
