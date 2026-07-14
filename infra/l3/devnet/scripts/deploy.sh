#!/usr/bin/env bash
# Deploy the Saly L3 settlement contracts to Base Sepolia via op-deployer
# (containerized) and write:
#   - artifacts/genesis.json, artifacts/rollup.json  (consumed by op-geth/op-node)
#   - deployments.base-sepolia.json                  (consumed by SalyChain services)
#
# Idempotent: re-running re-applies (op-deployer is itself idempotent on a workdir).
set -euo pipefail
. "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

OP_DEPLOYER_IMAGE="${OP_DEPLOYER_IMAGE:-us-docker.pkg.dev/oplabs-tools-artifacts/images/op-deployer:v0.4.0-rc.1}"
WORKDIR="${ARTIFACTS_DIR}/deployer"

run_deployer() {
  docker run --rm \
    -v "${ARTIFACTS_DIR}:/artifacts" \
    -e DO_NOT_TRACK=1 \
    "${OP_DEPLOYER_IMAGE}" "$@"
}

extract_addr() {
  # Try several known state.json keys for a contract across op-deployer versions.
  local state="$1"; shift
  local key
  for key in "$@"; do
    local v
    v="$(jq -r "${key} // empty" "${state}" 2>/dev/null || true)"
    if printf '%s' "${v}" | grep -Eq '^0x[0-9a-fA-F]{40}$'; then printf '%s' "${v}"; return 0; fi
  done
  return 1
}

main() {
  # Validate config + funding first (fail-closed before any spend).
  "${SCRIPT_DIR}/preflight.sh"
  load_env
  : "${L2_CHAIN_ID:=845320001}"
  : "${L1_CHAIN_ID:=84532}"
  : "${L3_SETTLEMENT:=base-sepolia}"
  : "${L3_DEPLOYER_PRIVATE_KEY:=${L3_PROPOSER_PRIVATE_KEY}}"

  ensure_artifacts_dir
  mkdir -p "${WORKDIR}"

  log "op-deployer init (l1=${L1_CHAIN_ID} l2=${L2_CHAIN_ID})"
  run_deployer init \
    --l1-chain-id "${L1_CHAIN_ID}" \
    --l2-chain-ids "${L2_CHAIN_ID}" \
    --workdir /artifacts/deployer

  log "op-deployer apply (deploying to ${L3_SETTLEMENT} — this spends gas)"
  run_deployer apply \
    --workdir /artifacts/deployer \
    --l1-rpc-url "${L1_RPC_URL}" \
    --private-key "${L3_DEPLOYER_PRIVATE_KEY}"

  log "Inspecting genesis + rollup config"
  run_deployer inspect genesis --workdir /artifacts/deployer "${L2_CHAIN_ID}" > "${ARTIFACTS_DIR}/genesis.json"
  run_deployer inspect rollup  --workdir /artifacts/deployer "${L2_CHAIN_ID}" > "${ARTIFACTS_DIR}/rollup.json"
  [ -s "${ARTIFACTS_DIR}/genesis.json" ] || die "genesis.json empty — deploy failed"
  [ -s "${ARTIFACTS_DIR}/rollup.json" ]  || die "rollup.json empty — deploy failed"
  ok "Wrote artifacts/genesis.json + artifacts/rollup.json"

  local state="${WORKDIR}/state.json"
  [ -f "${state}" ] || die "Missing ${state} after apply"

  local oracle portal sysconfig batchinbox l1bridge l2bridge dgf
  oracle="$(extract_addr "${state}" \
    '.opChainDeployments[0].L2OutputOracleProxy' \
    '.opChainDeployments[0].l2OutputOracleProxyAddress' || true)"
  portal="$(extract_addr "${state}" \
    '.opChainDeployments[0].OptimismPortalProxy' \
    '.opChainDeployments[0].optimismPortalProxyAddress' || true)"
  dgf="$(extract_addr "${state}" \
    '.opChainDeployments[0].DisputeGameFactoryProxy' \
    '.opChainDeployments[0].disputeGameFactoryProxyAddress' || true)"
  l1bridge="$(extract_addr "${state}" \
    '.opChainDeployments[0].L1StandardBridgeProxy' \
    '.opChainDeployments[0].l1StandardBridgeProxyAddress' || true)"
  l2bridge="$(extract_addr "${state}" \
    '.opChainDeployments[0].L2StandardBridgeProxy' \
    '.opChainDeployments[0].l2StandardBridgeProxyAddress' || true)"
  sysconfig="$(extract_addr "${state}" \
    '.opChainDeployments[0].SystemConfigProxy' \
    '.opChainDeployments[0].systemConfigProxyAddress' || true)"
  batchinbox="$(jq -r '.appliedIntent.chains[0].batchInboxAddress // empty' "${state}" 2>/dev/null || true)"

  if [ -z "${oracle}" ]; then
    warn "No L2OutputOracle in deployer state — this deployment likely uses fault proofs"
    warn "(DisputeGameFactory). SalyChain's l3-rollup-monitor + op-proposer expect the"
    warn "legacy L2OutputOracle. Set the deploy intent to disable fault proofs, or point"
    warn "the proposer/monitor at the DisputeGameFactory. See docs/runbooks/s5-l3-devnet-rollup.md"
  fi

  local manifest_rpc="${L3_L3_RPC_URL:-http://127.0.0.1:${L3_GETH_HTTP_PORT:-9545}}"

  log "Writing ${MANIFEST_FILE}"
  jq -n \
    --arg net "${L3_NETWORK:-saly-devnet}" \
    --arg settlement "${L3_SETTLEMENT:-base-sepolia}" \
    --arg ver "${OP_DEPLOYER_IMAGE}" \
    --arg at "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
    --arg oracle "${oracle}" \
    --arg portal "${portal}" \
    --arg dgf "${dgf}" \
    --arg l1bridge "${l1bridge}" \
    --arg l2bridge "${l2bridge}" \
    --arg sysconfig "${sysconfig}" \
    --arg inbox "${batchinbox}" \
    --arg rpc "${manifest_rpc}" \
    --argjson chainid "${L2_CHAIN_ID}" \
    '{
      network: $net,
      settlement: $settlement,
      deployed_at: $at,
      op_deployer_version: $ver,
      l3_rpc_url: $rpc,
      l3_chain_id: $chainid,
      contracts: ({ l2OutputOracle: $oracle }
        + (if $portal != "" then { optimismPortal: $portal } else {} end)
        + (if $dgf != "" then { disputeGameFactory: $dgf } else {} end)
        + (if $l1bridge != "" then { l1StandardBridge: $l1bridge } else {} end)
        + (if $l2bridge != "" then { l2StandardBridge: $l2bridge } else {} end)
        + (if $sysconfig != "" then { systemConfig: $sysconfig } else {} end)
        + (if $inbox != "" then { batchInbox: $inbox } else {} end)),
      assets: {}
    }' > "${MANIFEST_FILE}"

  ok "Deploy complete."
  if [ -n "${oracle}" ]; then ok "L2OutputOracle: ${oracle}"; fi
  if [ -n "${dgf}" ]; then ok "DisputeGameFactory: ${dgf}"; fi
  if [ -n "${l1bridge}" ]; then ok "L1StandardBridge: ${l1bridge}"; fi
  if [ -n "${l2bridge}" ]; then ok "L2StandardBridge: ${l2bridge}"; fi
  log "Next: set L3_L2_OUTPUT_ORACLE in .env (from the manifest) then run scripts/up.sh"
}

main "$@"
