#!/usr/bin/env bash
# Apply committed Prisma migrations for every SalyChain service (production / CI).
# Requires DATABASE_URL (or per-service URLs) to point at the target databases.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Ensure every service has a .env (Prisma reads .env, not .env.example).
bash "${ROOT}/scripts/bootstrap-service-envs.sh"

FILTERS=(
  @salychain/service-ledger
  @salychain/service-wallet
  @salychain/service-signer
  @salychain/service-execution
  @salychain/service-compliance
  @salychain/service-risk
  @salychain/service-liquidity
  @salychain/service-routing
  @salychain/service-intent
  @salychain/service-apikeys
  @salychain/service-webhooks
  @salychain/service-analytics-datastreams
  @salychain/service-analytics-datashares
  @salychain/service-analytics-intelligence
  @salychain/service-merchant
  @salychain/service-stablecoin
  @salychain/service-gateway
  @salychain/service-agents
  @salychain/service-identity
  @salychain/service-contract-registry
  @salychain/service-finance
  @salychain/service-gov
  @salychain/service-agri
  @salychain/service-scm
  @salychain/service-aviation
  @salychain/service-health
  @salychain/service-edu
  @salychain/service-admin
  @salychain/worker-chain-listener-base
  @salychain/worker-chain-listener-base-bridge
  @salychain/worker-chain-listener-l3
  @salychain/worker-chain-listener-xrpl
  @salychain/worker-fiat-listener
  @salychain/worker-analytics-indexer
)

echo "Applying Prisma migrations (${#FILTERS[@]} services)…"
for filter in "${FILTERS[@]}"; do
  echo "→ $filter"
  pnpm --filter "$filter" prisma:deploy
done
echo "Done."
