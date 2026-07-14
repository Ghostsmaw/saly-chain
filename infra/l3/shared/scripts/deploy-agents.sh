#!/usr/bin/env bash
# Deploy SalyAgentRegistry + SalyStreamPay to L3 and record in deployments manifest (E3).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "${SCRIPT_DIR}/../../devnet/scripts/lib.sh"

AGENTS_DIR="${REPO_ROOT}/contracts/agents"

main() {
  require_tools forge cast jq
  load_env

  : "${L3_L3_RPC_URL:=http://127.0.0.1:${L3_GETH_HTTP_PORT:-9545}}"
  : "${DEPLOYER_PRIVATE_KEY:=${L3_DEPLOYER_PRIVATE_KEY:-${L3_PROPOSER_PRIVATE_KEY:-}}}"
  : "${AGENT_REGISTRY_ADMIN:=${SALYSD_ADMIN:-}}"
  validate_url L3_L3_RPC_URL
  validate_hex_key DEPLOYER_PRIVATE_KEY
  validate_address AGENT_REGISTRY_ADMIN

  local l3_chain
  l3_chain="$(cast chain-id --rpc-url "${L3_L3_RPC_URL}" 2>/dev/null)" || die "L3 RPC unreachable at ${L3_L3_RPC_URL}"
  [ "${l3_chain}" = "${L2_CHAIN_ID:-845320002}" ] || die "Connected chain id ${l3_chain} != expected ${L2_CHAIN_ID}"
  ok "L3 reachable (chain ${l3_chain})"

  log "Deploying agent vertical contracts via forge"
  (
    cd "${AGENTS_DIR}"
    ln -sfn ../registry/lib lib 2>/dev/null || ln -sfn ../l3-usdc/lib lib 2>/dev/null || true
    PRIVATE_KEY="${DEPLOYER_PRIVATE_KEY}" \
    AGENT_REGISTRY_ADMIN="${AGENT_REGISTRY_ADMIN}" \
    forge script script/DeployAgents.s.sol \
      --rpc-url "${L3_L3_RPC_URL}" \
      --broadcast \
      --private-key "${DEPLOYER_PRIVATE_KEY}" \
      --slow
  )

  local run="${AGENTS_DIR}/broadcast/DeployAgents.s.sol/${l3_chain}/run-latest.json"
  [ -f "${run}" ] || die "forge broadcast artifact not found at ${run}"
  local registry stream
  registry="$(jq -r '.transactions[] | select((.contractName // "") == "SalyAgentRegistry") | .contractAddress' "${run}" | head -n1)"
  stream="$(jq -r '.transactions[] | select((.contractName // "") == "SalyStreamPay") | .contractAddress' "${run}" | head -n1)"
  printf '%s' "${registry}" | grep -Eq '^0x[0-9a-fA-F]{40}$' || die "Could not parse SalyAgentRegistry address"
  ok "SalyAgentRegistry deployed: ${registry}"
  [ -n "${stream}" ] && ok "SalyStreamPay deployed: ${stream}"

  if [ -f "${MANIFEST_FILE}" ]; then
    log "Recording agent contracts in ${MANIFEST_FILE}"
    local tmp
    tmp="$(mktemp)"
    jq --arg registry "${registry}" --arg stream "${stream}" \
      '.assets = (.assets // {}) | .assets.SalyAgentRegistry = $registry | .assets.SalyStreamPay = $stream' \
      "${MANIFEST_FILE}" > "${tmp}"
    mv "${tmp}" "${MANIFEST_FILE}"
    ok "Manifest updated"
  else
    warn "No manifest at ${MANIFEST_FILE}; export L3_AGENT_REGISTRY_ADDRESS=${registry}"
  fi
}

main "$@"
