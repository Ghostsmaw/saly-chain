#!/usr/bin/env bash
# Deploy SalyGovernor + Timelock + SalyTokenVotes on Base settlement layer.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "${SCRIPT_DIR}/../../devnet/scripts/lib.sh"

GOV_DIR="${REPO_ROOT}/contracts/governance"

main() {
  require_tools forge cast jq
  load_env

  : "${L1_RPC_URL:=https://sepolia.base.org}"
  : "${DEPLOYER_PRIVATE_KEY:=${L3_DEPLOYER_PRIVATE_KEY:-}}"
  : "${TREASURY_ADDRESS:=${GOVERNANCE_TREASURY:-}}"
  : "${INITIAL_MINT:=0}"
  : "${MAX_SUPPLY:=1000000000000000000000000000}"
  validate_url L1_RPC_URL
  validate_hex_key DEPLOYER_PRIVATE_KEY
  validate_address TREASURY_ADDRESS

  log "Deploying governance stack on Base settlement (${L1_RPC_URL})"
  (
    cd "${GOV_DIR}"
    ln -sfn ../l3-usdc/lib lib 2>/dev/null || true
    PRIVATE_KEY="${DEPLOYER_PRIVATE_KEY}" \
    TREASURY_ADDRESS="${TREASURY_ADDRESS}" \
    INITIAL_MINT="${INITIAL_MINT}" \
    MAX_SUPPLY="${MAX_SUPPLY}" \
    forge script script/DeployGovernance.s.sol \
      --rpc-url "${L1_RPC_URL}" \
      --broadcast \
      --private-key "${DEPLOYER_PRIVATE_KEY}" \
      --slow
  )

  local settlement_chain
  settlement_chain="$(cast chain-id --rpc-url "${L1_RPC_URL}")"
  local run="${GOV_DIR}/broadcast/DeployGovernance.s.sol/${settlement_chain}/run-latest.json"
  [ -f "${run}" ] || die "forge broadcast artifact not found at ${run}"

  local token timelock governor
  token="$(jq -r '.transactions[] | select((.contractName // "") == "SalyTokenVotes") | .contractAddress' "${run}" | head -n1)"
  timelock="$(jq -r '.transactions[] | select((.contractName // "") == "TimelockController") | .contractAddress' "${run}" | head -n1)"
  governor="$(jq -r '.transactions[] | select((.contractName // "") == "SalyGovernor") | .contractAddress' "${run}" | head -n1)"
  printf '%s' "${token}" | grep -Eq '^0x[0-9a-fA-F]{40}$' || die "Could not parse SalyTokenVotes address"
  ok "Governance deployed token=${token} timelock=${timelock} governor=${governor}"

  if [ -f "${MANIFEST_FILE}" ]; then
    local tmp
    tmp="$(mktemp)"
    jq --arg token "${token}" --arg timelock "${timelock}" --arg governor "${governor}" \
      '.governance = { token: $token, timelock: $timelock, governor: $governor }' \
      "${MANIFEST_FILE}" > "${tmp}"
    mv "${tmp}" "${MANIFEST_FILE}"
    ok "Manifest updated (governance.*)"
  fi

  cat <<EOF

# Optional: register via contract-registry API after service restart:
curl -X POST \${CONTRACT_REGISTRY_BASE_URL:-http://localhost:4013}/v1/governance/deployments \\
  -H 'content-type: application/json' \\
  -d '{
    "id": "gov_${L3_NETWORK:-saly-testnet}",
    "network": "${L3_SETTLEMENT:-base-sepolia}",
    "chain_id": ${settlement_chain},
    "token_address": "${token}",
    "timelock_address": "${timelock}",
    "governor_address": "${governor}"
  }'

EOF
}

main "$@"
