#!/usr/bin/env bash
# Mainnet settlement deploy — Base mainnet (L1=8453) + saly-mainnet (L2=845320003).
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export L3_STACK_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
export L3_NETWORK=saly-mainnet
export L2_CHAIN_ID=845320003
export L1_CHAIN_ID=8453
export L3_SETTLEMENT=base-mainnet
export MANIFEST_FILE_OVERRIDE="${L3_STACK_DIR}/deployments.base-mainnet.json"
: "${L1_RPC_URL:?Set L1_RPC_URL to a Base mainnet RPC in production/.env}"

bash "${L3_STACK_DIR}/../devnet/scripts/deploy.sh" "$@"
