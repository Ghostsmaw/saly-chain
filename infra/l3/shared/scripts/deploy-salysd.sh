#!/usr/bin/env bash
# Deploy SalySD + ReserveOracle to L3 and record assets.SalySD in the deployments manifest.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Caller sets L3_STACK_DIR (testnet/production) before sourcing lib from devnet.
. "${SCRIPT_DIR}/../../devnet/scripts/lib.sh"

SALYSD_DIR="${REPO_ROOT}/contracts/salysd"

main() {
  require_tools forge cast jq
  load_env

  : "${L3_L3_RPC_URL:=http://127.0.0.1:${L3_GETH_HTTP_PORT:-9545}}"
  : "${DEPLOYER_PRIVATE_KEY:=${L3_DEPLOYER_PRIVATE_KEY:-${L3_PROPOSER_PRIVATE_KEY:-}}}"
  validate_url L3_L3_RPC_URL
  validate_hex_key DEPLOYER_PRIVATE_KEY
  validate_address SALYSD_ADMIN
  validate_address SALYSD_MINTER
  validate_address SALYSD_BURNER
  require_env SALYSD_INITIAL_CEILING
  require_env SALYSD_ATTESTATION_HASH

  local l3_chain
  l3_chain="$(cast chain-id --rpc-url "${L3_L3_RPC_URL}" 2>/dev/null)" || die "L3 RPC unreachable at ${L3_L3_RPC_URL}"
  [ "${l3_chain}" = "${L2_CHAIN_ID:-845320002}" ] || die "Connected chain id ${l3_chain} != expected ${L2_CHAIN_ID} — refusing to deploy"
  ok "L3 reachable (chain ${l3_chain})"

  log "Deploying SalySD + ReserveOracle via forge"
  (
    cd "${SALYSD_DIR}"
    DEPLOYER_PRIVATE_KEY="${DEPLOYER_PRIVATE_KEY}" \
    SALYSD_ADMIN="${SALYSD_ADMIN}" \
    SALYSD_MINTER="${SALYSD_MINTER}" \
    SALYSD_BURNER="${SALYSD_BURNER}" \
    SALYSD_INITIAL_CEILING="${SALYSD_INITIAL_CEILING}" \
    SALYSD_ATTESTATION_HASH="${SALYSD_ATTESTATION_HASH}" \
    forge script script/DeploySalySD.s.sol \
      --rpc-url "${L3_L3_RPC_URL}" \
      --broadcast \
      --private-key "${DEPLOYER_PRIVATE_KEY}" \
      --slow
  )

  local run="${SALYSD_DIR}/broadcast/DeploySalySD.s.sol/${l3_chain}/run-latest.json"
  [ -f "${run}" ] || die "forge broadcast artifact not found at ${run}"
  local token oracle
  token="$(jq -r '.transactions[] | select((.contractName // "") == "SalySD") | .contractAddress' "${run}" | head -n1)"
  oracle="$(jq -r '.transactions[] | select((.contractName // "") == "ReserveOracle") | .contractAddress' "${run}" | head -n1)"
  printf '%s' "${token}" | grep -Eq '^0x[0-9a-fA-F]{40}$' || die "Could not parse SalySD address from ${run}"
  ok "SalySD deployed: ${token}"
  [ -n "${oracle}" ] && ok "ReserveOracle deployed: ${oracle}"

  if [ -f "${MANIFEST_FILE}" ]; then
    log "Recording SalySD in ${MANIFEST_FILE}"
    local tmp
    tmp="$(mktemp)"
    jq --arg salysd "${token}" '.assets = (.assets // {}) | .assets.SalySD = $salysd' "${MANIFEST_FILE}" > "${tmp}"
    mv "${tmp}" "${MANIFEST_FILE}"
    ok "Manifest updated (assets.SalySD=${token})"
  else
    warn "No manifest at ${MANIFEST_FILE}; export L3_SALYSD_ADDRESS=${token}"
  fi

  log "Set execution env: SALYSD_MINTER_WALLET_ID / SALYSD_BURNER_WALLET_ID (after treasury-bootstrap.sh)"
  log "  L3_SALYSD_ADDRESS=${token}"
}

main "$@"
