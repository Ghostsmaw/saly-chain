#!/usr/bin/env bash
# Deploy SalyEscrow to Base Sepolia (or pass FOUNDRY_RPC_URL / --rpc-url).
#
# Required env:
#   RESOLVER_ADDRESS  — SalyChain operator key that can release/refund deals
#   PRIVATE_KEY       — deployer EOA private key (hex, with or without 0x)
#
# Optional:
#   BASE_RPC_URL      — defaults to https://sepolia.base.org
#
# After deploy, wire the logged address into:
#   ESCROW_CONTRACT_ADDRESS       (wallet, chain-listener-base)
#   ESCROW_CONTRACT_ADDRESS_BASE  (execution)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT/contracts/escrow"

if ! command -v forge >/dev/null 2>&1; then
  echo "forge not found — install Foundry: https://book.getfoundry.sh/getting-started/installation" >&2
  exit 1
fi

: "${RESOLVER_ADDRESS:?RESOLVER_ADDRESS is required}"
: "${PRIVATE_KEY:?PRIVATE_KEY is required}"

RPC_URL="${BASE_RPC_URL:-https://sepolia.base.org}"

if [[ ! -d lib/openzeppelin-contracts ]]; then
  forge install openzeppelin/openzeppelin-contracts --no-commit
fi
if [[ ! -d lib/forge-std ]]; then
  forge install foundry-rs/forge-std --no-commit
fi

forge build
forge script script/Deploy.s.sol:Deploy \
  --rpc-url "$RPC_URL" \
  --broadcast \
  -vvv

echo ""
echo "Set in .env:"
echo "  ESCROW_CONTRACT_ADDRESS=<address from log above>"
echo "  ESCROW_CONTRACT_ADDRESS_BASE=<same address>"
