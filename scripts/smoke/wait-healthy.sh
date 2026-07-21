#!/usr/bin/env bash
# Wait until gateway + money-path services report healthy.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
# shellcheck disable=SC1091
source "$ROOT/scripts/smoke/lib.sh"

HOST="${SMOKE_HOST:-http://localhost}"
TIMEOUT_SEC="${SMOKE_WAIT_TIMEOUT_SEC:-180}"
INTERVAL_SEC="${SMOKE_WAIT_INTERVAL_SEC:-3}"

# port:path:name
TARGETS=(
  "4000:/v1/health:gateway"
  "4009:/v1/health:apikeys"
  "4010:/v1/health:webhooks"
  "4008:/v1/health:intent"
  "4003:/v1/health:execution"
  "4002:/v1/health:wallet"
  "4099:/v1/health:signer"
  "4001:/v1/health:ledger"
  "4004:/v1/health:compliance"
  "4007:/v1/health:routing"
)

deadline=$((SECONDS + TIMEOUT_SEC))
echo "Waiting for core services (timeout ${TIMEOUT_SEC}s)…"

while (( SECONDS < deadline )); do
  pending=0
  for t in "${TARGETS[@]}"; do
    IFS=':' read -r port path name <<<"$t"
    if ! smoke_http_ok "$HOST:$port$path"; then
      pending=1
    fi
  done
  if (( pending == 0 )); then
    echo "OK all core services healthy"
    for t in "${TARGETS[@]}"; do
      IFS=':' read -r port path name <<<"$t"
      echo "  OK $name :$port"
    done
    exit 0
  fi
  sleep "$INTERVAL_SEC"
done

echo "FAIL services not healthy within ${TIMEOUT_SEC}s:" >&2
for t in "${TARGETS[@]}"; do
  IFS=':' read -r port path name <<<"$t"
  code="$(smoke_http_code "$HOST:$port$path")"
  echo "  $name :$port → $code" >&2
done
exit 1
