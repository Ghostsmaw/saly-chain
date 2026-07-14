#!/usr/bin/env bash
set -euo pipefail
export L3_STACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export L3_NETWORK="${L3_NETWORK:-saly-testnet}"
export L2_CHAIN_ID="${L2_CHAIN_ID:-845320002}"
exec "$(dirname "${BASH_SOURCE[0]}")/../../devnet/scripts/deploy.sh" "$@"
