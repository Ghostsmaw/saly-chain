#!/usr/bin/env bash
# Remote testnet status — probes manifest RPC + settlement contracts (no local compose).
set -euo pipefail
export L3_STACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export L3_NETWORK="${L3_NETWORK:-saly-testnet}"
. "${L3_STACK_DIR}/../devnet/scripts/lib.sh"

main() {
  require_tools cast jq curl
  load_env

  [ -f "${MANIFEST_FILE}" ] || die "Missing ${MANIFEST_FILE} — run pnpm l3:testnet:deploy first"

  log "Manifest: ${MANIFEST_FILE}"
  jq '{ network, settlement, l3_rpc_url, l3_chain_id, contracts, assets }' "${MANIFEST_FILE}"

  : "${L3_L3_RPC_URL:?Set L3_L3_RPC_URL in .env or manifest}"
  validate_url L3_L3_RPC_URL

  local chain block
  chain="$(cast chain-id --rpc-url "${L3_L3_RPC_URL}" 2>/dev/null)" || die "L3 RPC unreachable: ${L3_L3_RPC_URL}"
  block="$(cast block-number --rpc-url "${L3_L3_RPC_URL}" 2>/dev/null)" || die "Could not read block number"
  ok "L3 RPC healthy — chain ${chain}, head ${block}"

  if [ -n "${L3_L1_RPC_URL:-${L1_RPC_URL:-}}" ]; then
    local l1_rpc="${L3_L1_RPC_URL:-${L1_RPC_URL}}"
    local portal
    portal="$(jq -r '.contracts.optimismPortal // empty' "${MANIFEST_FILE}")"
    if [ -n "${portal}" ] && printf '%s' "${portal}" | grep -Eq '^0x[0-9a-fA-F]{40}$'; then
      local code
      code="$(cast code "${portal}" --rpc-url "${l1_rpc}" 2>/dev/null || true)"
      [ "${code}" != "0x" ] && [ -n "${code}" ] && ok "OptimismPortal bytecode present at ${portal}" \
        || warn "OptimismPortal ${portal} has no code on ${l1_rpc}"
    fi
  fi

  log "Run verify gate: L3_NETWORK=saly-testnet pnpm l3:verify"
}

main "$@"
