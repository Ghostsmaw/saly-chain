#!/usr/bin/env bash
# End-to-end Milestone E0–E2 ops apply: registry deploy → governance bootstrap → verify.
set -euo pipefail
export L3_STACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export L3_NETWORK=saly-testnet
export L2_CHAIN_ID=845320002
export L3_SETTLEMENT=base-sepolia
TESTNET_SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "${L3_STACK_DIR}/../devnet/scripts/lib.sh"

main() {
  load_env

  log "Step 1/4 — deploy vertical registry (SalyAttestationRegistry + SalyAssetToken)"
  if [ "${SKIP_REGISTRY_DEPLOY:-0}" != "1" ] && [ -n "${SALYSD_ADMIN:-}" ]; then
    bash "${TESTNET_SCRIPT_DIR}/../../shared/scripts/deploy-registry.sh"
  else
    log "skipped (set SALYSD_ADMIN in ${ENV_FILE} to deploy registry contracts)"
  fi

  log "Step 2/4 — deploy Base governance (optional)"
  if [ "${SKIP_GOVERNANCE_DEPLOY:-0}" != "1" ] && [ -n "${GOVERNANCE_TREASURY:-}" ]; then
    bash "${TESTNET_SCRIPT_DIR}/../../shared/scripts/deploy-governance-base.sh"
  else
    log "skipped (set GOVERNANCE_TREASURY in ${ENV_FILE} to deploy SalyGovernor stack on Base)"
  fi

  log "Step 3/4 — governance executor wallet + PAUSER_ROLE"
  if [ "${SKIP_GOVERNANCE_BOOTSTRAP:-0}" != "1" ]; then
    bash "${TESTNET_SCRIPT_DIR}/governance-bootstrap.sh"
  else
    log "skipped (SKIP_GOVERNANCE_BOOTSTRAP=1)"
  fi

  log "Step 4/4 — verify gate"
  (cd "${L3_STACK_DIR}/../../.." && \
    L3_NETWORK=saly-testnet \
    GOVERNANCE_MANIFEST_OPTIONAL=1 \
    GOVERNANCE_EXECUTOR_OPTIONAL=1 \
    pnpm governance:verify) || die "Governance verify failed"

  log "E0–E2 ops apply complete — restart contract-registry to sync manifest rows"
}

main "$@"
