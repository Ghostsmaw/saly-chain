#!/usr/bin/env bash
# Deploy SalyTestUSDC to the running L3 devnet and record the address in the
# deployments manifest (assets.USDC) so the chain adapter, listener, execution
# and routing pick it up automatically.
set -euo pipefail
. "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

USDC_DIR="${REPO_ROOT}/contracts/l3-usdc"

main() {
  require_tools forge cast jq
  load_env

  if [ "${L3_NETWORK:-saly-devnet}" != "saly-devnet" ]; then
    die "SalyTestUSDC is devnet-only. On ${L3_NETWORK:-unknown} use: pnpm l3:testnet:deploy:salysd"
  fi

  : "${L3_L3_RPC_URL:=http://127.0.0.1:${L3_GETH_HTTP_PORT:-9545}}"
  : "${L3_USDC_DEPLOYER_PRIVATE_KEY:=${L3_DEPLOYER_PRIVATE_KEY:-${L3_PROPOSER_PRIVATE_KEY:-}}}"
  validate_url L3_L3_RPC_URL
  validate_hex_key L3_USDC_DEPLOYER_PRIVATE_KEY

  local l3_chain
  l3_chain="$(cast chain-id --rpc-url "${L3_L3_RPC_URL}" 2>/dev/null)" || die "L3 RPC unreachable at ${L3_L3_RPC_URL} (is the devnet up?)"
  [ "${l3_chain}" = "${L2_CHAIN_ID:-845320001}" ] || die "Connected chain id ${l3_chain} != expected ${L2_CHAIN_ID:-845320001} — refusing to deploy"
  ok "L3 reachable (chain ${l3_chain})"

  log "Deploying SalyTestUSDC via forge"
  (
    cd "${USDC_DIR}"
    PRIVATE_KEY="${L3_USDC_DEPLOYER_PRIVATE_KEY}" \
    FAUCET_DRIP_CAP="${L3_USDC_FAUCET_DRIP_CAP:-10000000000}" \
    FAUCET_COOLDOWN="${L3_USDC_FAUCET_COOLDOWN:-3600}" \
    TREASURY_ADDRESS="${L3_USDC_TREASURY_ADDRESS:-}" \
    TREASURY_MINT="${L3_USDC_TREASURY_MINT:-0}" \
    forge script script/DeployTestUsdc.s.sol \
      --rpc-url "${L3_L3_RPC_URL}" \
      --broadcast \
      --private-key "${L3_USDC_DEPLOYER_PRIVATE_KEY}" \
      --slow
  )

  local run="${USDC_DIR}/broadcast/DeployTestUsdc.s.sol/${l3_chain}/run-latest.json"
  [ -f "${run}" ] || die "forge broadcast artifact not found at ${run}"
  local usdc
  usdc="$(jq -r '.transactions[] | select((.contractName // "") == "SalyTestUSDC") | .contractAddress' "${run}" | head -n1)"
  printf '%s' "${usdc}" | grep -Eq '^0x[0-9a-fA-F]{40}$' || die "Could not parse deployed USDC address from ${run}"
  ok "SalyTestUSDC deployed: ${usdc}"

  if [ -f "${MANIFEST_FILE}" ]; then
    log "Recording USDC in ${MANIFEST_FILE}"
    local tmp
    tmp="$(mktemp)"
    jq --arg usdc "${usdc}" '.assets = (.assets // {}) | .assets.USDC = $usdc' "${MANIFEST_FILE}" > "${tmp}"
    mv "${tmp}" "${MANIFEST_FILE}"
    ok "Manifest updated (assets.USDC=${usdc})"
  else
    warn "No manifest at ${MANIFEST_FILE}; set L3_USDC_ADDRESS=${usdc} in your env instead."
  fi

  log "Restart the L3 chain listener so it watches the new token contract:"
  log "  pnpm -F @salychain/worker-chain-listener-l3 dev"
}

main "$@"
