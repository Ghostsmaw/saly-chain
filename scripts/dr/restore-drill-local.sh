#!/usr/bin/env bash
# Local / docker-compose staging analog of the monthly DR restore drill.
#
# Scope: logical Postgres backup → restore into parallel *_dr_restore DBs →
# integrity checks → live stack canary (wait-healthy + partner-flow).
# Does NOT replace AWS RDS PITR / Aurora promotion for cloud staging —
# use this when core infra is docker compose; attach cloud PITR evidence separately.
#
# Env:
#   POSTGRES_CONTAINER (default salychain-postgres)
#   POSTGRES_USER      (default salychain)
#   DR_KEEP_RESTORE=1  keep *_dr_restore databases after drill
#   DR_SKIP_SMOKE=1    skip partner-flow canary
#   DR_SMOKE_SKIP_SETTLE=1 (default) partner-flow without waiting SETTLED
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
# shellcheck disable=SC1091
source "$ROOT/scripts/smoke/lib.sh"

POSTGRES_CONTAINER="${POSTGRES_CONTAINER:-salychain-postgres}"
POSTGRES_USER="${POSTGRES_USER:-salychain}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
ARTIFACT_DIR="${DR_ARTIFACT_DIR:-$ROOT/.dr-artifacts/$STAMP}"
mkdir -p "$ARTIFACT_DIR"

# Money-path + supporting DBs (restore order mirrors runbook §1).
DBS=(
  salychain_ledger
  salychain_wallet
  salychain_signer
  salychain_execution
  salychain_intent
  salychain_compliance
  salychain_risk
  salychain_liquidity
  salychain_routing
  salychain_apikeys
  salychain_gateway
  salychain_webhook
)

psql_exec() {
  docker exec -i "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -v ON_ERROR_STOP=1 "$@"
}

pg_dump_db() {
  local db="$1" out="$2"
  docker exec "$POSTGRES_CONTAINER" pg_dump -U "$POSTGRES_USER" -Fc --no-owner --no-acl "$db" >"$out"
}

pg_restore_db() {
  local dump="$1" target_db="$2"
  docker exec -i "$POSTGRES_CONTAINER" pg_restore -U "$POSTGRES_USER" -d "$target_db" --no-owner --no-acl <"$dump"
}

echo "==> DR restore drill (local) stamp=$STAMP"
echo "    artifacts: $ARTIFACT_DIR"
T0=$SECONDS

# ── 1. Snapshot ──────────────────────────────────────────────────────────────
echo "==> [1/5] Snapshot money-path databases"
for db in "${DBS[@]}"; do
  exists="$(psql_exec -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$db'" | tr -d '[:space:]')"
  if [[ "$exists" != "1" ]]; then
    echo "    skip missing $db"
    continue
  fi
  out="$ARTIFACT_DIR/${db}.dump"
  echo "    dump $db → $(basename "$out")"
  pg_dump_db "$db" "$out"
done
T_SNAPSHOT=$SECONDS
echo "    snapshot wall-clock: $((T_SNAPSHOT - T0))s"

# ── 2. Restore into parallel DBs ─────────────────────────────────────────────
echo "==> [2/5] Restore into *_dr_restore databases"
for db in "${DBS[@]}"; do
  dump="$ARTIFACT_DIR/${db}.dump"
  [[ -f "$dump" ]] || continue
  target="${db}_dr_restore"
  echo "    restore $db → $target"
  psql_exec -d postgres -c "DROP DATABASE IF EXISTS ${target};" >/dev/null
  psql_exec -d postgres -c "CREATE DATABASE ${target} OWNER ${POSTGRES_USER};" >/dev/null
  pg_restore_db "$dump" "$target" || {
    # pg_restore returns 1 on some non-fatal warnings; verify tables exist
    tables="$(psql_exec -d "$target" -tAc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public'" | tr -d '[:space:]')"
    if [[ "${tables:-0}" -lt 1 ]]; then
      echo "FAIL restore produced empty database $target" >&2
      exit 1
    fi
    echo "    warn: pg_restore exited non-zero but $tables public tables present"
  }
done
T_RESTORE=$SECONDS
echo "    restore wall-clock: $((T_RESTORE - T_SNAPSHOT))s"

# ── 3. Integrity checks on restored copies ───────────────────────────────────
echo "==> [3/5] Integrity checks on restored DBs"

LEDGER_IMBALANCE=""
if [[ -f "$ARTIFACT_DIR/salychain_ledger.dump" ]]; then
  # Trial balance: ASSET+EXPENSE balances should equal LIABILITY+EQUITY+REVENUE.
  LEDGER_IMBALANCE="$(psql_exec -d salychain_ledger_dr_restore -tAc "
    SELECT COALESCE(SUM(
      CASE
        WHEN type IN ('ASSET','EXPENSE') THEN balance_minor
        WHEN type IN ('LIABILITY','EQUITY','REVENUE') THEN -balance_minor
        ELSE 0
      END
    ), 0)
    FROM accounts
    WHERE status = 'ACTIVE';
  " | tr -d '[:space:]')"
  echo "    ledger trial-balance residual (expect 0): ${LEDGER_IMBALANCE:-?}"
  if [[ "${LEDGER_IMBALANCE:-}" != "0" ]]; then
    echo "WARN: ledger residual non-zero — investigate before prod drill sign-off" >&2
  fi
fi

DUP_SETTLED=""
if [[ -f "$ARTIFACT_DIR/salychain_execution.dump" ]]; then
  DUP_SETTLED="$(psql_exec -d salychain_execution_dr_restore -tAc "
    SELECT count(*) FROM (
      SELECT idempotency_key
      FROM execution_transactions
      WHERE state = 'SETTLED'
      GROUP BY idempotency_key
      HAVING count(*) > 1
    ) d;
  " | tr -d '[:space:]')"
  echo "    duplicate SETTLED idempotency keys (expect 0): ${DUP_SETTLED:-?}"
  SETTLED_COUNT="$(psql_exec -d salychain_execution_dr_restore -tAc "
    SELECT count(*) FROM execution_transactions WHERE state = 'SETTLED';
  " | tr -d '[:space:]')"
  echo "    SETTLED rows in restore: ${SETTLED_COUNT:-0}"
fi

WALLET_COUNT=""
if [[ -f "$ARTIFACT_DIR/salychain_wallet.dump" ]]; then
  WALLET_COUNT="$(psql_exec -d salychain_wallet_dr_restore -tAc "SELECT count(*) FROM wallets;" | tr -d '[:space:]')"
  echo "    wallets in restore: ${WALLET_COUNT:-0}"
fi

T_VERIFY=$SECONDS

# ── 4. Live stack canary ─────────────────────────────────────────────────────
echo "==> [4/5] Live stack canary"
bash "$ROOT/scripts/smoke/wait-healthy.sh"
CANARY_RESULT="wait-healthy OK"
if [[ "${DR_SKIP_SMOKE:-0}" != "1" ]]; then
  export SMOKE_SKIP_SETTLE="${DR_SMOKE_SKIP_SETTLE:-1}"
  export SMOKE_SETTLE_TIMEOUT_SEC="${SMOKE_SETTLE_TIMEOUT_SEC:-120}"
  if bash "$ROOT/scripts/smoke/partner-flow.sh"; then
    CANARY_RESULT="partner-flow OK (SMOKE_SKIP_SETTLE=${SMOKE_SKIP_SETTLE})"
  else
    CANARY_RESULT="partner-flow FAIL"
    echo "WARN: partner-flow canary failed — record in evidence" >&2
  fi
else
  CANARY_RESULT="smoke skipped (DR_SKIP_SMOKE=1); wait-healthy OK"
fi
T_CANARY=$SECONDS

# ── 5. Cleanup ───────────────────────────────────────────────────────────────
echo "==> [5/5] Cleanup"
if [[ "${DR_KEEP_RESTORE:-0}" == "1" ]]; then
  echo "    keeping *_dr_restore databases (DR_KEEP_RESTORE=1)"
else
  for db in "${DBS[@]}"; do
    target="${db}_dr_restore"
    psql_exec -d postgres -c "DROP DATABASE IF EXISTS ${target};" >/dev/null 2>&1 || true
  done
  echo "    dropped *_dr_restore databases"
fi

T_END=$SECONDS
RTO_SEC=$((T_END - T0))
RPO_SEC=0  # dump taken at T0 of this drill; cloud PITR lag is separate

SUMMARY="$ARTIFACT_DIR/summary.txt"
{
  echo "stamp=$STAMP"
  echo "rpo_achieved_minutes=0 (logical dump at drill start; cloud PITR lag N/A for local)"
  echo "rto_wall_clock_seconds=$RTO_SEC"
  echo "rto_wall_clock_minutes=$(( (RTO_SEC + 59) / 60 ))"
  echo "snapshot_seconds=$((T_SNAPSHOT - T0))"
  echo "restore_seconds=$((T_RESTORE - T_SNAPSHOT))"
  echo "verify_seconds=$((T_VERIFY - T_RESTORE))"
  echo "canary_seconds=$((T_CANARY - T_VERIFY))"
  echo "ledger_imbalance_residual=${LEDGER_IMBALANCE:-n/a}"
  echo "duplicate_settled_keys=${DUP_SETTLED:-n/a}"
  echo "canary=$CANARY_RESULT"
  echo "artifact_dir=$ARTIFACT_DIR"
} | tee "$SUMMARY"

echo "==> DR restore drill complete (RTO ${RTO_SEC}s)"
echo "    Fill docs/runbooks/evidence/dr-restore-drill.md from $SUMMARY"
