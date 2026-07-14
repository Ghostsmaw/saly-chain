#!/usr/bin/env bash
# Shared curl helpers for L3 ops smoke tests (wallet / execution / stablecoin / gateway).
set -euo pipefail

json_get() { jq -r "$2 // empty" <<<"$1"; }

require_http() {
  local url="$1"
  curl -sf "${url}" >/dev/null 2>&1 || die "Service unreachable: ${url}"
}

tenant_headers() {
  local org="${OPS_ORG_ID:-demo-org}"
  printf '%s\n' "-H" "X-Org-Id: ${org}" "-H" "Content-Type: application/json"
}

post_json() {
  local url="$1" body="$2"
  shift 2
  curl -sfS -X POST "${url}" \
    -H "Content-Type: application/json" \
    "$@" \
    -d "${body}"
}

get_json() {
  local url="$1"
  shift
  curl -sfS "${url}" "$@"
}

wait_for_tx_state() {
  local base="$1" tx_id="$2" want_state="$3" max="${4:-60}"
  local i=0 state
  while [ "${i}" -lt "${max}" ]; do
    state="$(get_json "${base}/v1/transactions/${tx_id}" | jq -r '.state // empty')"
    [ "${state}" = "${want_state}" ] && return 0
    [ "${state}" = "FAILED" ] && die "Transaction ${tx_id} failed"
    sleep 2
    i=$((i + 1))
  done
  die "Timed out waiting for tx ${tx_id} → ${want_state} (last: ${state})"
}
