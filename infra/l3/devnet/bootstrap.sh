#!/usr/bin/env bash
# SalyChain L3 devnet bootstrap — checks prerequisites and prints the one-command
# flow. The heavy lifting now lives in scripts/ (no manual Optimism checkout).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
DEVNET="$ROOT/infra/l3/devnet"

echo "=== SalyChain L3 devnet bootstrap ==="
echo

missing=0
for cmd in docker cast forge jq openssl; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "✗ missing: $cmd"
    missing=1
  else
    echo "✓ $cmd"
  fi
done

if [[ $missing -eq 1 ]]; then
  echo
  echo "Install the missing tools and re-run. (Foundry: https://getfoundry.sh)"
  exit 1
fi

echo
if [[ ! -f "$DEVNET/.env" ]]; then
  echo "Next: create your devnet env"
  echo "  cp infra/l3/devnet/.env.example infra/l3/devnet/.env"
  echo "  # fill in L1_RPC_URL + funded L3_BATCHER/PROPOSER/DEPLOYER keys"
  echo
fi

cat <<'EOF'
One-command flow (from repo root):

  pnpm l3:preflight     # validate env, keys, and Base Sepolia funding (fail-closed)
  pnpm l3:deploy        # op-deployer → contracts + genesis/rollup + manifest
  #   then set L3_L2_OUTPUT_ORACLE in infra/l3/devnet/.env (from the manifest)
  pnpm l3:up            # start op-geth + op-node + op-batcher + op-proposer
  pnpm l3:deploy:usdc   # deploy SalyTestUSDC + record it in the manifest
  pnpm l3:status        # component health + spike exit criteria
  pnpm l3:verify        # S5 exit-criteria check
  pnpm l3:down          # teardown (--volumes to wipe chain data)

Full runbooks:
  docs/runbooks/s5-l3-devnet-rollup.md   (settlement)
  docs/runbooks/s6-l3-money-rail.md      (USDC money rail)
EOF
