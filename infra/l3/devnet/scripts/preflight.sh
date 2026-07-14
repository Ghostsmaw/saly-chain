#!/usr/bin/env bash
# Preflight: validate tooling, env, secrets and L1 funding BEFORE any deploy or
# spend. Run standalone (`scripts/preflight.sh`) or via up.sh/deploy.sh.
set -euo pipefail
. "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

# Minimum L1 (Base Sepolia) balance required on batcher + proposer, in wei.
MIN_FUNDING_WEI="${MIN_FUNDING_WEI:-20000000000000000}" # 0.02 ETH

main() {
  log "SalyChain L3 devnet preflight"

  require_tools docker cast jq openssl
  load_env

  validate_url L1_RPC_URL
  validate_hex_key L3_BATCHER_PRIVATE_KEY
  validate_hex_key L3_PROPOSER_PRIVATE_KEY
  : "${L3_DEPLOYER_PRIVATE_KEY:=${L3_PROPOSER_PRIVATE_KEY}}"
  validate_hex_key L3_DEPLOYER_PRIVATE_KEY

  # Sequencer key is optional (p2p disabled in this single-sequencer devnet).
  if [ -n "${L3_SEQUENCER_PRIVATE_KEY:-}" ]; then validate_hex_key L3_SEQUENCER_PRIVATE_KEY; fi

  local l1_chain expected_l1
  expected_l1="${L2_SETTLEMENT_CHAIN_ID:-}"
  case "${L3_NETWORK:-saly-devnet}" in
    saly-mainnet) expected_l1="${expected_l1:-8453}" ;;
    *) expected_l1="${expected_l1:-84532}" ;;
  esac
  l1_chain="$(cast chain-id --rpc-url "${L1_RPC_URL}" 2>/dev/null)" || die "L1_RPC_URL unreachable: ${L1_RPC_URL}"
  [ "${l1_chain}" = "${expected_l1}" ] || warn "L1 chain id is ${l1_chain}, expected ${expected_l1}"
  ok "L1 reachable (chain ${l1_chain})"

  if [ "${L3_NETWORK:-}" = "saly-mainnet" ] && [ "${L3_SETTLEMENT_MODE:-fault_proofs}" = "fault_proofs" ]; then
    require_env L3_DISPUTE_GAME_FACTORY
    validate_address L3_DISPUTE_GAME_FACTORY
    ok "DisputeGameFactory configured for fault-proof mainnet"
  fi

  local batcher proposer deployer
  batcher="$(addr_from_key "${L3_BATCHER_PRIVATE_KEY}")"
  proposer="$(addr_from_key "${L3_PROPOSER_PRIVATE_KEY}")"
  deployer="$(addr_from_key "${L3_DEPLOYER_PRIVATE_KEY}")"

  assert_funded "batcher"  "${batcher}"  "${L1_RPC_URL}" "${MIN_FUNDING_WEI}"
  assert_funded "proposer" "${proposer}" "${L1_RPC_URL}" "${MIN_FUNDING_WEI}"
  assert_funded "deployer" "${deployer}" "${L1_RPC_URL}" "${MIN_FUNDING_WEI}"

  ok "Preflight passed — safe to deploy/boot the L3 devnet"
}

main "$@"
