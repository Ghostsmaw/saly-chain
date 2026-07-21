#!/usr/bin/env bash
# Custody Phase C — non-value sign probe (create key = KMS wrap path).
# Usage: SIGNER_URL=http://localhost:4099 INTERNAL_SERVICE_TOKEN=… ./scripts/custody/sign-probe.sh
set -euo pipefail

SIGNER_URL="${SIGNER_URL:-http://localhost:4099}"
CHAIN="${SIGN_PROBE_CHAIN:-XRPL}"

auth_args=()
if [[ -n "${INTERNAL_SERVICE_TOKEN:-}" ]]; then
  auth_args+=(-H "x-internal-token: ${INTERNAL_SERVICE_TOKEN}")
fi

curl_signer() {
  if ((${#auth_args[@]} > 0)); then
    curl -sS "${auth_args[@]}" "$@"
  else
    curl -sS "$@"
  fi
}

echo "==> Signer health"
HEALTH="$(curl_signer "$SIGNER_URL/v1/health")"
echo "    $HEALTH"
echo "$HEALTH" | jq -e '.ok == true' >/dev/null

KMS_PROVIDER="$(echo "$HEALTH" | jq -r '.kms_provider // empty')"
if [[ "${NODE_ENV:-development}" == "production" || "${NODE_ENV:-}" == "staging" ]]; then
  if [[ "$KMS_PROVIDER" == "local" ]]; then
    echo "FAIL: KMS_PROVIDER=local forbidden in staging/production" >&2
    exit 1
  fi
fi

echo "==> Create non-value key (chain=$CHAIN) — exercises KMS wrap"
CREATE="$(curl_signer -XPOST "$SIGNER_URL/v1/keys" \
  -H 'content-type: application/json' \
  -d "{\"chain\":\"$CHAIN\"}")"
echo "    $CREATE"
KEY_REF="$(echo "$CREATE" | jq -r '.key_ref // empty')"
ADDR="$(echo "$CREATE" | jq -r '.public_address // empty')"
[[ -n "$KEY_REF" && -n "$ADDR" ]] || {
  echo "FAIL: key create did not return key_ref/public_address: $CREATE" >&2
  exit 1
}

echo "OK sign-probe passed key_ref=$KEY_REF address=$ADDR kms=$KMS_PROVIDER"
