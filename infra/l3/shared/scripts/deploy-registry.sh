#!/usr/bin/env bash
# Deploy SalyAttestationRegistry + SalyAssetToken to L3 and record in deployments manifest.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "${SCRIPT_DIR}/../../devnet/scripts/lib.sh"

REGISTRY_DIR="${REPO_ROOT}/contracts/registry"

main() {
  require_tools forge cast jq
  load_env

  : "${L3_L3_RPC_URL:=http://127.0.0.1:${L3_GETH_HTTP_PORT:-9545}}"
  : "${DEPLOYER_PRIVATE_KEY:=${L3_DEPLOYER_PRIVATE_KEY:-${L3_PROPOSER_PRIVATE_KEY:-}}}"
  : "${REGISTRY_ADMIN:=${SALYSD_ADMIN:-}}"
  validate_url L3_L3_RPC_URL
  validate_hex_key DEPLOYER_PRIVATE_KEY
  validate_address REGISTRY_ADMIN

  local l3_chain
  l3_chain="$(cast chain-id --rpc-url "${L3_L3_RPC_URL}" 2>/dev/null)" || die "L3 RPC unreachable at ${L3_L3_RPC_URL}"
  [ "${l3_chain}" = "${L2_CHAIN_ID:-845320002}" ] || die "Connected chain id ${l3_chain} != expected ${L2_CHAIN_ID}"
  ok "L3 reachable (chain ${l3_chain})"

  log "Deploying vertical registry contracts via forge"
  (
    cd "${REGISTRY_DIR}"
    ln -sfn ../l3-usdc/lib lib 2>/dev/null || true
    PRIVATE_KEY="${DEPLOYER_PRIVATE_KEY}" \
    REGISTRY_ADMIN="${REGISTRY_ADMIN}" \
    forge script script/DeployRegistry.s.sol \
      --rpc-url "${L3_L3_RPC_URL}" \
      --broadcast \
      --private-key "${DEPLOYER_PRIVATE_KEY}" \
      --slow
  )

  local run="${REGISTRY_DIR}/broadcast/DeployRegistry.s.sol/${l3_chain}/run-latest.json"
  [ -f "${run}" ] || die "forge broadcast artifact not found at ${run}"
  local attest asset
  attest="$(jq -r '.transactions[] | select((.contractName // "") == "SalyAttestationRegistry") | .contractAddress' "${run}" | head -n1)"
  asset="$(jq -r '.transactions[] | select((.contractName // "") == "SalyAssetToken") | .contractAddress' "${run}" | head -n1)"
  printf '%s' "${attest}" | grep -Eq '^0x[0-9a-fA-F]{40}$' || die "Could not parse SalyAttestationRegistry address"
  ok "SalyAttestationRegistry deployed: ${attest}"
  [ -n "${asset}" ] && ok "SalyAssetToken deployed: ${asset}"

  if [ -f "${MANIFEST_FILE}" ]; then
    log "Recording registry contracts in ${MANIFEST_FILE}"
    local tmp
    tmp="$(mktemp)"
    jq --arg attest "${attest}" --arg asset "${asset}" \
      '.assets = (.assets // {}) | .assets.SalyAttestationRegistry = $attest | .assets.SalyAssetToken = $asset' \
      "${MANIFEST_FILE}" > "${tmp}"
    mv "${tmp}" "${MANIFEST_FILE}"
    ok "Manifest updated"
  else
    warn "No manifest at ${MANIFEST_FILE}; export L3_ATTESTATION_REGISTRY_ADDRESS=${attest}"
  fi

  log "Set contract-registry env: L3_ATTESTATION_REGISTRY_ADDRESS=${attest}"
}

main "$@"
