#!/usr/bin/env bash
# Milestone E full ops closeout (E0–E7): migrations → governance → agents → env sync → verify.
set -euo pipefail

export L3_STACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export L3_NETWORK="${L3_NETWORK:-saly-testnet}"
export L2_CHAIN_ID="${L2_CHAIN_ID:-845320002}"
TESTNET_SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "${TESTNET_SCRIPT_DIR}/../../../.." && pwd)"

. "${L3_STACK_DIR}/../devnet/scripts/lib.sh"

has_deploy_keys() {
  [ -n "${L3_DEPLOYER_PRIVATE_KEY:-${L3_PROPOSER_PRIVATE_KEY:-}}" ] \
    && [ -n "${SALYSD_ADMIN:-}" ] \
    && printf '%s' "${L3_DEPLOYER_PRIVATE_KEY:-${L3_PROPOSER_PRIVATE_KEY:-}}" | grep -Eq '^0x[0-9a-fA-F]{64}$'
}

main() {
  load_env

  log "Step 1/7 — bootstrap service + L3 env files"
  (cd "${ROOT}" && pnpm bootstrap:l3-envs && bash scripts/bootstrap-service-envs.sh)

  log "Step 2/7 — database migrations (E1/E2/E3–E7 schemas)"
  (cd "${ROOT}" && pnpm db:migrate)

  log "Step 3/7 — code + contract verify (E3–E7)"
  (cd "${ROOT}" && pnpm verticals:verify)

  if has_deploy_keys; then
    log "Step 4/7 — deploy SalySD (if not in manifest)"
    local salysd
    salysd="$(jq -r '.assets.SalySD // empty' "${MANIFEST_FILE}" 2>/dev/null || true)"
    if [ -z "${salysd}" ] || [ "${salysd}" = "0x0000000000000000000000000000000000000000" ]; then
      (cd "${ROOT}" && pnpm l3:testnet:deploy:salysd) || warn "SalySD deploy skipped/failed"
    else
      ok "SalySD already in manifest: ${salysd}"
    fi

    log "Step 5/7 — E0–E2 governance apply"
    bash "${TESTNET_SCRIPT_DIR}/e-governance-apply.sh"

    log "Step 6/7 — E3 agent contracts on L3"
    bash "${ROOT}/infra/l3/shared/scripts/deploy-agents.sh"
  else
    warn "Skipping on-chain deploy (set L3_DEPLOYER_PRIVATE_KEY + SALYSD_ADMIN in ${ENV_FILE})"
    export MILESTONE_E_ON_CHAIN=0
  fi

  log "Step 7/7 — sync contract-registry env + milestone verify"
  bash "${ROOT}/scripts/sync-contract-registry-env.sh"
  (cd "${ROOT}" && pnpm milestone-e:verify)
}

main "$@"
