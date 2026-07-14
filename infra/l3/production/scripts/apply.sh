#!/usr/bin/env bash
# Production apply: preflight → mainnet settlement deploy (optional) → HA stack → verify.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export L3_STACK_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
REPO_ROOT="$(cd "${L3_STACK_DIR}/../../.." && pwd)"

main() {
  log() { printf '▸ %s\n' "$*"; }
  die() { printf '✗ %s\n' "$*" >&2; exit 1; }

  log "Step 1/4 — preflight"
  bash "${SCRIPT_DIR}/preflight.sh"

  if [ "${SKIP_L3_DEPLOY:-0}" != "1" ]; then
    log "Step 2/4 — mainnet op-deployer apply (one-time, spends ETH on Base mainnet)"
    bash "${SCRIPT_DIR}/deploy-mainnet.sh"
  else
    log "Step 2/4 — skipped (SKIP_L3_DEPLOY=1)"
  fi

  if [ "${SKIP_HA_UP:-0}" != "1" ]; then
    log "Step 3/4 — HA stack (compose)"
    bash "${SCRIPT_DIR}/up.sh"
  else
    log "Step 3/4 — skipped (SKIP_HA_UP=1)"
  fi

  if [ "${SKIP_HELM:-0}" != "1" ] && command -v helm >/dev/null 2>&1; then
    log "Step 3b — Helm l3-stack (RPC gateway + ops monitor)"
    bash "${SCRIPT_DIR}/helm-apply.sh"
  fi

  log "Step 4/4 — production verify gate"
  (cd "${REPO_ROOT}" && L3_NETWORK=saly-mainnet pnpm l3:verify:production) || die "Production verify failed"

  log "Production apply complete — see docs/runbooks/d3-l3-production.md"
}

main "$@"
