#!/usr/bin/env bash
# Boot infra + core Nest services needed for partner smoke (S2/S3 path).
# Usage:
#   ./scripts/start-stack.sh              # infra + migrate + services
#   ./scripts/start-stack.sh --infra-only
#   ./scripts/start-stack.sh --services-only
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

MODE="${1:-all}"
LOG_DIR="${SMOKE_LOG_DIR:-$ROOT/.smoke-logs}"
PID_FILE="$LOG_DIR/stack.pids"
mkdir -p "$LOG_DIR"

SERVICES=(
  "@salychain/service-ledger:ledger"
  "@salychain/service-wallet:wallet"
  "@salychain/service-signer:signer"
  "@salychain/service-execution:execution"
  "@salychain/service-compliance:compliance"
  "@salychain/service-risk:risk"
  "@salychain/service-liquidity:liquidity"
  "@salychain/service-routing:routing"
  "@salychain/service-intent:intent"
  "@salychain/service-apikeys:apikeys"
  "@salychain/service-webhooks:webhooks"
  "@salychain/service-gateway:gateway"
  "@salychain/worker-chain-listener-xrpl:xrpl-listener"
)

start_infra() {
  echo "==> Infra (postgres redis nats mailhog)"
  pnpm infra:up:core
  echo "==> Bootstrap missing service .env files"
  bash scripts/bootstrap-service-envs.sh
}

migrate() {
  echo "==> Prisma migrate"
  pnpm db:generate
  pnpm db:migrate
}

start_services() {
  : >"$PID_FILE"
  echo "==> Starting Nest services (logs in $LOG_DIR)"
  for entry in "${SERVICES[@]}"; do
    pkg="${entry%%:*}"
    name="${entry##*:}"
    log="$LOG_DIR/$name.log"
    echo "    → $pkg"
    # Use nest --watch (`dev`) so local smoke does not require a prior full build.
    # nohup + redirect stdin; macOS has no setsid.
    nohup pnpm -F "$pkg" dev >"$log" 2>&1 < /dev/null &
    echo $! >>"$PID_FILE"
  done
  echo "PIDs written to $PID_FILE"
  echo "Run: ./scripts/smoke/wait-healthy.sh"
}

case "$MODE" in
  --infra-only)
    start_infra
    ;;
  --services-only)
    start_services
    ;;
  --migrate-only)
    migrate
    ;;
  all|"")
    start_infra
    migrate
    start_services
    ;;
  *)
    echo "usage: $0 [--infra-only|--services-only|--migrate-only]" >&2
    exit 2
    ;;
esac
