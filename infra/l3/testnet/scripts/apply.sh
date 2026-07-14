#!/usr/bin/env bash
# End-to-end testnet apply: preflight → settlement deploy → SalySD → verify (fail-closed).
set -euo pipefail
export L3_STACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export L3_NETWORK=saly-testnet
export L2_CHAIN_ID=845320002
export L3_SETTLEMENT=base-sepolia
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

main() {
  log() { printf '▸ %s\n' "$*"; }
  die() { printf '✗ %s\n' "$*" >&2; exit 1; }

  log "Step 1/4 — preflight"
  bash "${SCRIPT_DIR}/preflight.sh"

  if [ "${SKIP_L3_DEPLOY:-0}" != "1" ]; then
    log "Step 2/4 — op-deployer settlement deploy"
    bash "${SCRIPT_DIR}/deploy.sh"
  else
    log "Step 2/4 — skipped (SKIP_L3_DEPLOY=1)"
  fi

  if [ "${SKIP_SALYSD_DEPLOY:-0}" != "1" ] && [ -n "${SALYSD_ADMIN:-}" ]; then
    log "Step 3/4 — SalySD deploy"
    bash "${SCRIPT_DIR}/deploy-salysd.sh"
  else
    log "Step 3/4 — skipped (set SALYSD_ADMIN + roles to deploy token)"
  fi

  log "Step 4/4 — verify gate"
  (cd "${L3_STACK_DIR}/../../.." && L3_NETWORK=saly-testnet pnpm l3:verify) || die "Verify gate failed"

  log "Testnet apply complete — see docs/runbooks/d1-l3-testnet.md for worker wiring"
}

main "$@"
