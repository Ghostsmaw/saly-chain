#!/usr/bin/env bash
# Shared helpers for the SalyChain L3 devnet orchestration scripts.
# Sourced by preflight/deploy/up/down/status/deploy-usdc. Fail-closed by design:
# we never move funds or boot a money rail against an unvalidated configuration.
set -euo pipefail

# Resolve key paths regardless of the caller's CWD.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Override with L3_STACK_DIR for testnet (see infra/l3/testnet/scripts/* wrappers).
DEVNET_DIR="${L3_STACK_DIR:-$(cd "${SCRIPT_DIR}/.." && pwd)}"
REPO_ROOT="$(cd "${DEVNET_DIR}/../../.." && pwd)"
ARTIFACTS_DIR="${DEVNET_DIR}/artifacts"
ENV_FILE="${DEVNET_DIR}/.env"
# Manifest file selection: production mainnet vs sepolia settlement layers.
if [ "${L3_NETWORK:-}" = "saly-mainnet" ] || [ -f "${DEVNET_DIR}/deployments.base-mainnet.json" ]; then
  MANIFEST_FILE="${DEVNET_DIR}/deployments.base-mainnet.json"
else
  MANIFEST_FILE="${DEVNET_DIR}/deployments.base-sepolia.json"
fi
if [ -n "${MANIFEST_FILE_OVERRIDE:-}" ]; then
  MANIFEST_FILE="${MANIFEST_FILE_OVERRIDE}"
fi
COMPOSE_FILE="${DEVNET_DIR}/docker-compose.l3.yml"
if [ -f "${DEVNET_DIR}/docker-compose.l3-ha.yml" ]; then
  COMPOSE_FILE="${DEVNET_DIR}/docker-compose.l3-ha.yml"
fi

# Known placeholder keys that must never be used as real signing keys.
PLACEHOLDER_KEYS="
0x0000000000000000000000000000000000000000000000000000000000000000
0x0000000000000000000000000000000000000000000000000000000000000001
"

# ---- logging -------------------------------------------------------------
_c_reset='\033[0m'; _c_red='\033[31m'; _c_grn='\033[32m'; _c_ylw='\033[33m'; _c_blu='\033[34m'
log()  { printf "${_c_blu}▸${_c_reset} %s\n" "$*"; }
ok()   { printf "${_c_grn}✓${_c_reset} %s\n" "$*"; }
warn() { printf "${_c_ylw}⚠${_c_reset} %s\n" "$*" >&2; }
die()  { printf "${_c_red}✗ %s${_c_reset}\n" "$*" >&2; exit 1; }

# Mask all but the last 4 chars of a secret for safe logging.
mask() {
  local s="$1"
  local n=${#s}
  if [ "$n" -le 8 ]; then printf '****'; else printf '%s…%s' "${s:0:6}" "${s: -4}"; fi
}

# ---- tooling -------------------------------------------------------------
require_tools() {
  local missing=0 t
  for t in "$@"; do
    if ! command -v "$t" >/dev/null 2>&1; then warn "missing required tool: $t"; missing=1; fi
  done
  [ "$missing" -eq 0 ] || die "Install the missing tools above and re-run."
}

# docker compose v2 ("docker compose") with v1 fallback.
compose() {
  if docker compose version >/dev/null 2>&1; then
    docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" "$@"
  else
    docker-compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" "$@"
  fi
}

# ---- env -----------------------------------------------------------------
bootstrap_l3_stack_files() {
  local created=0
  if [ ! -f "${ENV_FILE}" ] && [ -f "${DEVNET_DIR}/.env.example" ]; then
    cp "${DEVNET_DIR}/.env.example" "${ENV_FILE}"
    warn "Created ${ENV_FILE} from .env.example — fill in keys and RPC URLs before production use."
    created=1
  fi
  local manifest_example="${DEVNET_DIR}/deployments.base-sepolia.example.json"
  if [ ! -f "${MANIFEST_FILE}" ] && [ -f "${manifest_example}" ]; then
    cp "${manifest_example}" "${MANIFEST_FILE}"
    warn "Created ${MANIFEST_FILE} from example — update contract addresses after deploy."
    created=1
  fi
  [ "${created}" -eq 1 ]
}

load_env() {
  bootstrap_l3_stack_files || true
  [ -f "${ENV_FILE}" ] || die "Missing ${ENV_FILE}. Copy .env.example → .env and fill it in."
  set -a
  # shellcheck disable=SC1090
  . "${ENV_FILE}"
  set +a
}

require_env() {
  local name="$1"
  local val="${!name:-}"
  [ -n "${val}" ] || die "Required env ${name} is not set in ${ENV_FILE}."
}

# ---- validation ----------------------------------------------------------
validate_hex_key() {
  # Validate a private key var: 0x + 64 hex, not a placeholder.
  local name="$1"
  local val="${!name:-}"
  [ -n "${val}" ] || die "Required key ${name} is not set."
  if ! printf '%s' "${val}" | grep -Eq '^0x[0-9a-fA-F]{64}$'; then
    die "${name} is not a valid 0x-prefixed 32-byte private key."
  fi
  local p
  for p in ${PLACEHOLDER_KEYS}; do
    [ "${val}" != "${p}" ] || die "${name} is a placeholder key — refusing to use it."
  done
}

validate_address() {
  local name="$1"
  local val="${!name:-}"
  [ -n "${val}" ] || die "Required address ${name} is not set."
  printf '%s' "${val}" | grep -Eq '^0x[0-9a-fA-F]{40}$' || die "${name} is not a valid 0x address."
}

validate_url() {
  local name="$1"
  local val="${!name:-}"
  [ -n "${val}" ] || die "Required URL ${name} is not set."
  printf '%s' "${val}" | grep -Eq '^https?://' || die "${name} must be an http(s) URL."
}

# Address derived from a private key (requires cast).
addr_from_key() { cast wallet address --private-key "$1"; }

# Assert an address holds at least MIN_WEI on L1 (funding guard before spend).
assert_funded() {
  local label="$1" addr="$2" rpc="$3" min_wei="$4"
  local settlement="${L3_SETTLEMENT:-base-sepolia}"
  local bal
  bal="$(cast balance "${addr}" --rpc-url "${rpc}" 2>/dev/null)" || die "Could not read ${label} balance from ${rpc}"
  if [ "$(printf '%s\n%s\n' "${bal}" "${min_wei}" | sort -g | head -n1)" = "${bal}" ] && [ "${bal}" != "${min_wei}" ]; then
    die "${label} (${addr}) underfunded: ${bal} wei < required ${min_wei} wei. Fund it on ${settlement}."
  fi
  ok "${label} funded: ${addr} (${bal} wei)"
}

ensure_artifacts_dir() { mkdir -p "${ARTIFACTS_DIR}"; }
