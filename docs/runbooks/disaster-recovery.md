# Disaster Recovery & Backup Restore

> Wave C ops runbook. Defines **RPO/RTO** targets, backup ownership, and a restore drill that must pass in staging before production go-live.

## 1. Objectives

| Metric | Target (pilot) | Target (GA) | Notes |
|--------|----------------:|------------:|-------|
| **RPO** (max data loss) | **15 min** | **5 min** | Postgres PITR + JetStream file store |
| **RTO** (time to restore money paths) | **4 h** | **1 h** | Gateway + execution + ledger + signer + wallet |
| Backup retention | 35 days | 90 days | Hot + cold (S3) |
| Drill cadence | Monthly staging | Monthly staging + quarterly prod tabletop | Evidence in IR ticket |

Money-path services (restore order): **Postgres (ledger → wallet → signer → execution → intent → …) → Redis → NATS → secrets → services → canary intent**.

## 2. What must be backed up

| System | Mechanism | RPO driver |
|--------|-----------|------------|
| Postgres (18 logical DBs) | RDS/Aurora automated snapshots + continuous PITR | WAL lag |
| Redis (BullMQ) | AOF + daily snapshot; queues are rebuildable from ledger/execution state | Queue depth |
| NATS JetStream | Persistent file store on 3-node cluster; volume snapshots | Consumer lag |
| Object storage (KYC docs) | S3 versioning + cross-region replication | Replication lag |
| KMS / secrets | AWS Secrets Manager replicas; CMK multi-region optional | Key material never exported |
| Helm/Terraform state | Remote state bucket with versioning + MFA delete | Config drift |

Do **not** back up local `KMS_PROVIDER=local` master keys — production forbids them.

## 3. Restore drill (staging) — monthly

### 3.1 Preconditions
- Staging cluster healthy; last known-good snapshot ID recorded.
- On-call engineer + secondary observer.
- Change ticket open with start/end timestamps.

### 3.2 Steps
1. **Freeze writes** — scale gateway/intent replicas to 0 (or flip ingress to maintenance).
2. **Restore Postgres** to a new instance from PITR timestamp `T-RPO` (or latest snapshot).
3. **Point services** at restored DB URLs via temporary Helm values / Secrets.
4. **Restore Redis** if transfer queues were mid-flight; otherwise flush and let workers rebuild.
5. **Restore NATS** volumes or redeploy empty JetStream and replay from durable sources if lag is acceptable.
6. **Boot order:** signer → ledger → wallet → execution → compliance/risk/liquidity/routing → intent → apikeys/webhooks → gateway.
7. **Canary:** `./scripts/smoke/wait-healthy.sh` then `./scripts/smoke/partner-flow.sh` (or `SMOKE_SKIP_SETTLE=1` if chain rails intentionally offline).
8. **Reconcile:** admin ledger imbalance check = 0; no duplicate SETTLED for same idempotency key.
9. **Record evidence:** RPO achieved (minutes of loss), RTO wall-clock, anomalies, sign-off.

### 3.3 Pass criteria
- [ ] RPO ≤ target for the environment
- [ ] RTO ≤ target
- [ ] Smoke partner-flow green (or documented rail skip)
- [ ] No ledger imbalance
- [ ] Secrets/KMS still bound (signer sign-test OK)

### 3.4 Local / docker-compose staging (dev laptop)

When money-path Postgres runs in `salychain-postgres` (compose), run the logical restore drill:

```bash
pnpm infra:up:core
# money-path Nest services healthy
pnpm dr:restore-drill
# optional: DR_SKIP_SMOKE=1  |  DR_KEEP_RESTORE=1  |  DR_ARTIFACT_DIR=...
```

This dumps money-path DBs → restores into `*_dr_restore` → trial-balance + duplicate-SETTLED checks → `wait-healthy` + partner-flow canary (`SMOKE_SKIP_SETTLE=1` by default). Artifacts land in `.dr-artifacts/<stamp>/` (gitignored). Fill [evidence/dr-restore-drill.md](evidence/dr-restore-drill.md).

**Note:** this proves dump/restore + canary RTO on compose. Cloud staging still needs a real RDS/Aurora PITR (or snapshot restore) with measured WAL lag for production go-live §15.

## 4. Regional failure (multi-region — GA track)

Pilot may be single-region. Before GA:
1. Aurora global / cross-region read replica promotion runbook.
2. Secrets Manager replica + KMS MRK (or documented re-encrypt procedure).
3. DNS/ingress failover (Route53 health checks).
4. Tabletop: “eu-west-1 unavailable for 2h” — see [incident-response-tabletop.md](incident-response-tabletop.md).

## 5. Ownership

| Role | Responsibility |
|------|----------------|
| Platform on-call | Execute drill; page custody if signer impacted |
| Custody owner | Validate KMS/IRSA after restore |
| Compliance | Confirm PII vault key available post-restore |
| Eng manager | Sign monthly evidence; track misses |

Evidence folder (suggested): `ops/dr/<YYYY-MM>/restore-drill.md` (private ops repo or ticket attachment — do not commit secrets).
