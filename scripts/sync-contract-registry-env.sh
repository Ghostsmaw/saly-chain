#!/usr/bin/env bash
# Merge L3 manifest + ops env into services/contract-registry/.env (fills empty keys only).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

die() { echo "✗ $*" >&2; exit 1; }

STACK_DIR="${L3_STACK_DIR:-${ROOT}/infra/l3/testnet}"
ENV_FILE="${STACK_DIR}/.env"
MANIFEST="${STACK_DIR}/deployments.base-sepolia.json"
TARGET="${ROOT}/services/contract-registry/.env"
EXAMPLE="${ROOT}/services/contract-registry/.env.example"

if [ ! -f "${TARGET}" ] && [ -f "${EXAMPLE}" ]; then
  cp "${EXAMPLE}" "${TARGET}"
  echo "Created ${TARGET} from .env.example"
fi
[ -f "${TARGET}" ] || die "Missing ${TARGET}"

if [ -f "${ENV_FILE}" ]; then
  set -a
  # shellcheck disable=SC1090
  . "${ENV_FILE}"
  set +a
fi

set_kv() {
  local key="$1"
  local val="$2"
  [ -n "${val}" ] || return 0
  if grep -q "^${key}=" "${TARGET}"; then
    local current
    current="$(grep "^${key}=" "${TARGET}" | head -n1 | cut -d= -f2-)"
    if [ -z "${current}" ]; then
      if [[ "$OSTYPE" == darwin* ]]; then
        sed -i '' "s|^${key}=.*|${key}=${val}|" "${TARGET}"
      else
        sed -i "s|^${key}=.*|${key}=${val}|" "${TARGET}"
      fi
    fi
  else
    printf '%s=%s\n' "${key}" "${val}" >> "${TARGET}"
  fi
}

merge_if_empty() {
  local key="$1"
  local val="$2"
  local current
  current="$(grep "^${key}=" "${TARGET}" 2>/dev/null | cut -d= -f2- || true)"
  if [ -n "${current}" ]; then
    return 0
  fi
  if [ -z "${val}" ]; then
    return 0
  fi
  if [[ "${val}" == 0x0000000000000000000000000000000000000000 ]]; then
    return 0
  fi
  if [[ "${val}" == *"example.com"* ]]; then
    return 0
  fi
  set_kv "${key}" "${val}"
}

if [ -f "${MANIFEST}" ]; then
  ATTEST="$(jq -r '.assets.SalyAttestationRegistry // empty' "${MANIFEST}")"
  SALYSD="$(jq -r '.assets.SalySD // empty' "${MANIFEST}")"
  L3_RPC="$(jq -r '.l3_rpc_url // empty' "${MANIFEST}")"
  merge_if_empty "L3_ATTESTATION_REGISTRY_ADDRESS" "${ATTEST}"
  merge_if_empty "L3_SALYSD_ADDRESS" "${SALYSD}"
  [ -n "${L3_RPC}" ] && [ "${L3_RPC}" != "https://l3-testnet-rpc.example.com" ] && merge_if_empty "L3_L3_RPC_URL" "${L3_RPC}"
fi

if [ -f "${EXAMPLE}" ] && [ -f "${TARGET}" ]; then
  while IFS= read -r line; do
    [[ "${line}" =~ ^[A-Z_]+= ]] || continue
    key="${line%%=*}"
    val="${line#*=}"
    merge_if_empty "${key}" "${val}"
  done < "${EXAMPLE}"
fi

merge_if_empty "GOVERNANCE_EXECUTOR_WALLET_ID" "${GOVERNANCE_EXECUTOR_WALLET_ID:-}"
merge_if_empty "WALLET_BASE_URL" "${WALLET_BASE_URL:-http://localhost:4002}"
merge_if_empty "L3_NETWORK" "${L3_NETWORK:-saly-testnet}"
merge_if_empty "L3_L3_RPC_URL" "${L3_L3_RPC_URL:-http://127.0.0.1:9545}"
merge_if_empty "GOVERNANCE_RECONCILE_INTERVAL_MS" "15000"

echo "Synced contract-registry env from manifest (${MANIFEST})"
