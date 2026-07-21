#!/usr/bin/env bash
# Stop services started by scripts/start-stack.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_FILE="${SMOKE_LOG_DIR:-$ROOT/.smoke-logs}/stack.pids"

if [[ ! -f "$PID_FILE" ]]; then
  echo "no pid file at $PID_FILE"
  exit 0
fi

while read -r pid; do
  [[ -n "$pid" ]] || continue
  if kill -0 "$pid" 2>/dev/null; then
    echo "stopping $pid"
    kill "$pid" 2>/dev/null || true
  fi
done <"$PID_FILE"

# Also stop orphaned package runners that may have re-parented
pkill -f 'turbo.*dev' 2>/dev/null || true

rm -f "$PID_FILE"
echo "stopped"
