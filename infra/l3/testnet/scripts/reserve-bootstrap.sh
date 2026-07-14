#!/usr/bin/env bash
# Seed a reserve account + fresh attestation for stablecoin mint headroom checks.
set -euo pipefail
export L3_STACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
. "${L3_STACK_DIR}/../devnet/scripts/lib.sh"
. "${L3_STACK_DIR}/../shared/scripts/ops-http.sh"

main() {
  load_env
  : "${STABLECOIN_BASE_URL:=http://localhost:4022}"
  : "${RESERVE_CUSTODIAN:=primary-custodian}"
  : "${RESERVE_BALANCE_MINOR:=1000000000000}"
  : "${RESERVE_CEILING_MINOR:=1000000000000}"
  : "${RESERVE_ATTESTATION_HASH:=0x$(openssl rand -hex 32)}"
  : "${OPS_ORG_ID:=treasury-ops}"

  require_http "${STABLECOIN_BASE_URL}/v1/health"

  if [ -z "${STABLECOIN_DEFAULT_RESERVE_ACCOUNT_ID:-}" ]; then
    log "Creating reserve account via SQL (requires DATABASE_URL for salychain_stablecoin)"
    : "${STABLECOIN_DATABASE_URL:?Set STABLECOIN_DATABASE_URL or STABLECOIN_DEFAULT_RESERVE_ACCOUNT_ID}"
    local reserve_id
    reserve_id="$(psql "${STABLECOIN_DATABASE_URL}" -tAc \
      "INSERT INTO reserve_accounts (custodian, balance_minor, authorized_ceiling_minor, attestation_hash, as_of, chain)
       VALUES ('${RESERVE_CUSTODIAN}', ${RESERVE_BALANCE_MINOR}, ${RESERVE_CEILING_MINOR}, '${RESERVE_ATTESTATION_HASH}', NOW(), 'SALY_L3')
       RETURNING id;" | tr -d '[:space:]')"
    export STABLECOIN_DEFAULT_RESERVE_ACCOUNT_ID="${reserve_id}"
    ok "Created reserve account ${reserve_id}"
  else
    ok "Using existing reserve ${STABLECOIN_DEFAULT_RESERVE_ACCOUNT_ID}"
  fi

  log "Recording attestation"
  post_json "${STABLECOIN_BASE_URL}/v1/reserves/attestations" "$(jq -n \
    --arg id "${STABLECOIN_DEFAULT_RESERVE_ACCOUNT_ID}" \
    --arg hash "${RESERVE_ATTESTATION_HASH}" \
    --arg bal "${RESERVE_BALANCE_MINOR}" \
    --arg ceil "${RESERVE_CEILING_MINOR}" \
    --arg as_of "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
    '{ reserve_account_id: $id, attestation_hash: $hash, balance_minor: $bal, authorized_ceiling_minor: $ceil, as_of: $as_of }')" \
    -H "X-Org-Id: ${OPS_ORG_ID}" >/dev/null

  ok "Attestation recorded"

  cat <<EOF

# Add to stablecoin .env:
STABLECOIN_DEFAULT_RESERVE_ACCOUNT_ID=${STABLECOIN_DEFAULT_RESERVE_ACCOUNT_ID}

EOF
}

main "$@"
