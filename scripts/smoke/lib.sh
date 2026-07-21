#!/usr/bin/env bash
# Shared helpers for staging/local smoke scripts.
set -euo pipefail

smoke_http_code() {
  local url="$1"
  curl -sS -o /dev/null -w '%{http_code}' --max-time "${SMOKE_CURL_TIMEOUT:-10}" "$url" 2>/dev/null || echo 000
}

smoke_http_ok() {
  local url="$1"
  local code
  code="$(smoke_http_code "$url")"
  [[ "$code" == "200" ]]
}

smoke_require_cmd() {
  local cmd="$1"
  command -v "$cmd" >/dev/null 2>&1 || {
    echo "missing required command: $cmd" >&2
    exit 2
  }
}

smoke_json_field() {
  local json="$1"
  local field="$2"
  echo "$json" | jq -r "$field"
}
