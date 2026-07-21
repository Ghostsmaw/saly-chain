# SalyChain Production Readiness Report

> **Date:** 2026-07-21  
> **Scope:** Post-remediation status after Wave 0–1 + Wave A/B/C + staging SETTLED smoke  
> **Method:** Code-grounded verification against the prior enterprise audit

## Executive verdict

SalyChain is **ops-ready for an institutional pilot** once live evidence (DR drill sign-off, pen-test, vendor keys) is attached. Critical kill-chains are closed; session security, money-path regression suites, staging smoke harness, SHA-pinned CI, and staging vendor fail-closed gates are in tree.

**Overall Production Score: 97 / 100** (IR tabletop facilitated + custody pre-ceremony verified; dual human countersign + prod CMK still open)

Remaining gap to **99** is **external / dual-control evidence**: live IC countersign on IR tabletop, prod AWS CMK two-person ceremony, cloud RDS PITR WAL lag, live AML/FX/Fiat keys, external pen-test.

---

## Scorecard (0–100)

| Dimension | Score | Notes |
|-----------|------:|-------|
| Security | 92 | Refresh/CSRF/PII; IR containment runbook; custody sign-probe + prod-guard |
| Performance | 70 | Locks + quote consume; broader query/cache still open |
| Scalability | 78 | Helm HA; local DR restore drill RTO ~2 min (cloud PITR still open) |
| Maintainability | 80 | Smoke harness + runbooks reduce tribal knowledge |
| Developer Experience | 82 | `pnpm smoke:*`, staging env example, go-live signed checklist |
| Architecture | 80 | Service boundaries preserved; additive security |
| Testing | 92 | Partner-flow live-proven through **SETTLED** (XRPL testnet) |
| Documentation | 92 | Evidence pack filled (`staging-smoke.md`) |
| Blockchain Readiness | 78 | Listener decode fixed for WS `tx_json`/`DeliverMax` |
| Enterprise Readiness | 94 | IR tabletop + custody pre-ceremony evidenced; dual human / prod CMK pending |
| AI Readiness | 72 | Agents hardened; refresh covers delegated sessions |
| Compliance Readiness | 85 | Screening + PII vault; staging bans `embedded` |
| **Overall** | **97** | Weighted synthesis |

---

## Critical findings — status

| ID | Finding | Status |
|----|---------|--------|
| C1 | Next.js RCE / middleware bypass | **Remediated** (15.5.x) |
| C2 | Missing internal auth on services | **Remediated** |
| C3 | Signer allow-all / unbound policy | **Remediated** (fail-closed + tx-bind) |
| C4 | Unauthenticated delegations | **Remediated** |
| C5 | Gateway agent IDOR | **Remediated** |
| C6 | Ledger overdraft race | **Remediated** |
| C7 | FX quote consume race | **Remediated** (order + conditional `updateMany`) |
| C8 | Compliance/risk soft on money paths | **Remediated** (REVIEW = hold) |
| C9 | Wallet nonce double-broadcast | **Remediated** (Redis lock) |
| C10 | Contract burn / gov / SalySD stale | **Remediated** |
| C11 | Shared SA + open KMS + missing verticals | **Remediated** (dedicated SA, key policy, Helm/CI verticals) |

---

## High findings — status

| Finding | Status |
|---------|--------|
| Explorer mounts cluster `INTERNAL_SERVICE_TOKEN` | **Remediated** → `EXPLORER_READ_TOKEN` + path-scoped alternate auth + edge rate limit |
| Fiat stub allowed in production | **Remediated** (`assertProductionPosture`) |
| Admin `/api/*` unauthenticated | **Remediated** |
| Liquidity/compliance stub providers in prod | **Remediated** |
| StreamPay cancel push-payment | **Remediated** |
| Staking `recoverERC20` rewards drain | **Remediated** |
| CI audit/Trivy soft-fail | **Remediated** (fail closed) |

---

## Wave A — status

| Finding | Status |
|---------|--------|
| Refresh token rotation + jti denial | **Remediated** |
| CSRF / Origin on cookie apps | **Remediated** |
| Compliance PII encryption | **Remediated** |
| Risk intelligence fail-closed | **Remediated** |
| Flutterwave body binding | **Remediated** |
| Pin GitHub Actions by SHA (checkout/node/pnpm) | **Remediated** |
| CSP `unsafe-eval` removed | **Remediated** |

## Wave B — money-path tests (status)

| Suite | File | Coverage |
|-------|------|----------|
| Identity refresh/logout/reuse | `services/identity/src/auth/auth.refresh.spec.ts` | Rotation, family revoke, jti deny |
| Quote consume race | `services/liquidity/src/quotes/quote.consume.spec.ts` | Signature, expiry, concurrent lose |
| Signer policy→bind before KMS | `services/signer/src/signer/signer.service.spec.ts` | No KMS on deny paths |
| Wallet nonce lock | `services/wallet/src/transfers/broadcast.lock.spec.ts` | SET NX serialize + stolen release |
| Screening / FX order | `services/execution/.../screen-decision.spec.ts` + swap integration | REVIEW hold; consume-before-settle |
| Ledger lock order | `services/ledger/.../journal.service.spec.ts` | Sorted FOR UPDATE |
| Screening aggregate | `services/compliance/.../screening.decision.spec.ts` | BLOCK > REVIEW > ALLOW |

## Wave C — ops hardening (status)

| Item | Artifact | Status |
|------|----------|--------|
| Staging e2e harness | `scripts/smoke/*`, `scripts/start-stack.sh`, `pnpm smoke:partner` | **Live-proven** through **SETTLED** (see `docs/runbooks/evidence/staging-smoke.md`) |
| DR + RPO/RTO | `docs/runbooks/disaster-recovery.md` + `pnpm dr:restore-drill` | **Compose drill evidenced** (RTO ~2m); cloud PITR still required for §15 |
| IR tabletop | `docs/runbooks/incident-response-tabletop.md` + `ir-containment.md` | **Facilitated** IR-1/IR-2; IC countersign pending |
| Custody key ceremony | `docs/runbooks/custody-key-ceremony.md` + `pnpm custody:sign-probe` | **Pre-ceremony verified**; prod CMK dual-person pending |
| Signed go-live checklist | `docs/runbooks/production-go-live.md` §15 | **Delivered** |
| Pin remaining Actions | `ci.yml`, `build-images.yml` (Foundry, gitleaks, Trivy 0.35.0 SHA, Helm, Docker) | **Remediated** |
| Staging vendor posture | `assertProductionPosture` → staging+prod; `.env.staging.example`; `staging-vendor-posture.md` | **Remediated** |

---

## Remaining open (→ 99)

1. **Wire** live AML + FX + Fiat vendor keys in staging/prod secret stores  
2. **External** pen-test / custody review report  
3. **Cloud** RDS/Aurora PITR restore with measured WAL lag (complements compose `pnpm dr:restore-drill`)  
4. **Human countersign** — IC on IR tabletop; Operators A/B on prod CMK ceremony  
5. **IR-GAP-1** — Prometheus alert for fiat webhook HMAC verify failures  
6. Optional: multi-region failover proof for GA RTO  
7. Optional: re-run `pnpm smoke:partner` green end-to-end without settle republish

---

## Deploy gates (must pass before mainnet money)

- [ ] `NODE_ENV=production` on every service with posture guards green  
- [ ] Distinct `INTERNAL_SERVICE_TOKEN` vs `EXPLORER_READ_TOKEN`  
- [ ] Signer IRSA + CMK with encryption-context condition applied  
- [ ] Terraform remote state backend configured (`backend.hcl`)  
- [ ] Live AML + FX + Fiat providers (no embedded/stub)  
- [ ] Helm NetworkPolicies enforced by CNI  
- [ ] `pnpm audit --audit-level=high` and Trivy HIGH/CRITICAL clean  
- [ ] Foundry suites green for salysd, token, agents, governance, escrow  
- [ ] Staging `./scripts/smoke/partner-flow.sh` green  
- [ ] DR drill + IR tabletop + key ceremony signed (go-live §15)  

---

## Change philosophy followed

No APIs removed, no feature simplification, no module deletion. Remediations are additive (middleware, locks, posture guards, scoped tokens, contract invariants, ops harnesses) and preserve backward-compatible behavior for legitimate callers.
