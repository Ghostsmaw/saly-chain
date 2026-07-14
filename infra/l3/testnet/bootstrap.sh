#!/usr/bin/env bash
# Testnet bootstrap — validates tooling and prints next steps.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
cd "${ROOT}"
echo "▸ Saly L3 testnet bootstrap"
bash scripts/bootstrap-l3-envs.sh
bash infra/l3/testnet/scripts/preflight.sh || true
echo ""
echo "Next:"
echo "  1. pnpm l3:testnet:deploy"
echo "  2. Deploy remote sequencer + set L3_L3_RPC_URL in infra/l3/testnet/.env"
echo "  3. L3_NETWORK=saly-testnet pnpm l3:verify"
echo "  4. Start workers: chain-listener-l3, chain-listener-base-bridge, l3-rollup-monitor"
