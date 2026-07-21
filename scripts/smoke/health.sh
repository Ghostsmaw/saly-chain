#!/usr/bin/env bash
# SMK-INFRA-01 — probe core service + worker health endpoints.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
# shellcheck disable=SC1091
source "$ROOT/scripts/smoke/lib.sh"

PORTS=(4000 4001 4002 4003 4004 4005 4006 4007 4008 4009 4010 4011 4012 4013 4014 4099)
fail=0

for p in "${PORTS[@]}"; do
  base="${SMOKE_HOST:-http://localhost}:$p"
  if smoke_http_ok "$base/v1/health"; then
    echo "OK   :$p"
  else
    code="$(smoke_http_code "$base/v1/health")"
    echo "FAIL :$p ($code)"
    fail=1
  fi
done

check_worker() {
  local port="$1" path="$2" name="$3"
  local base="${SMOKE_HOST:-http://localhost}:$port"
  if smoke_http_ok "$base$path"; then
    echo "OK   $name"
  else
    local code
    code="$(smoke_http_code "$base$path")"
    echo "WARN $name ($code)"
  fi
}
check_worker 4098 /health l3-monitor
check_worker 4020 /health fiat-listener

exit "$fail"
