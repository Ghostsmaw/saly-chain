# Phase 2 — Smoke Test Generation & Test Strategy

> Comprehensive test specifications for every feature audited in [Phase 1](01-feature-audit.md), plus the full test pyramid (unit, integration, e2e, security, load, chaos) and runnable automation scaffolds.

This is written so a QA engineer can execute the smoke suite against a running stack today, and so the team can grow it into the full pyramid. It also calls out the **prerequisite fixes** that block testing (the same blockers Phase 1 found).

---

## 1. Test taxonomy & where it runs

| Layer | Tooling (existing → target) | Scope | Gate |
|-------|------------------------------|-------|------|
| **Unit** | Vitest (in use) | Pure functions, schema, money, evaluators, policy | Pre-merge |
| **Integration** | Vitest + Testcontainers (Postgres/NATS/Redis) | Service ↔ DB/bus; cross-service via sdk-internal | Pre-merge |
| **E2E** | Playwright (apps) + a `smoke` runner (API) | Full intent→settle across services | Pre-deploy |
| **Contract (chain)** | Foundry `forge test` (in use) | Solidity invariants | Pre-merge |
| **Security** | OWASP ZAP, `pnpm audit`, semgrep, custom authz tests | Authn/z, idempotency, signing, injection | Nightly + pre-release |
| **Load** | k6 (target) | Throughput/latency SLOs | Nightly + pre-release |
| **Chaos** | Toxiproxy + pod-kill (target) | Resilience to dep failure | Weekly staging |

**Prerequisite fixes before smoke can pass cleanly** (from Phase 1):
1. `pnpm db:generate` so Prisma clients exist (compliance boot blocker).
2. Health path is `/v1/health` (global prefix) — probes/scripts must use it.
3. Provide a `.env` with at least Postgres/Redis/NATS + dev KMS; rails default to stub.
4. `services/ledger` `test:e2e` references a missing `vitest.e2e.config.ts` — add it or remove the script.

---

## 2. Smoke test spec format

Every feature below uses this structure:

```
ID            unique id
Objective     what we're proving
Preconditions environment + data needed
Steps         exact actions (API/UI)
Expected      success assertion
Failure       what indicates a failure (alert-worthy)
Automation    pointer to script/spec
```

---

## 3. Smoke tests by feature

### 3.1 Platform / infra

**SMK-INFRA-01 — Service health**
- **Objective:** All 16 services + 5 workers are up and report healthy.
- **Preconditions:** Stack running (`pnpm dev` or compose), infra up.
- **Steps:** `GET /v1/health` on 4000–4014, 4099; worker health (l3-monitor `:4098/health`, fiat-listener `:4020/health`).
- **Expected:** HTTP 200, `{status:'ok'}` for each.
- **Failure:** Any non-200 / connection refused.
- **Automation:** `scripts/smoke/health.sh` (below).

**SMK-INFRA-02 — Datastore connectivity**
- **Objective:** Postgres (18 DBs), Redis, NATS reachable.
- **Steps:** `pg_isready`; `redis-cli ping`; NATS `:8222/healthz`.
- **Expected:** All OK; `salychain_*` DBs exist.
- **Failure:** Missing DB / refused connection.

### 3.2 Identity & Auth (Security/Developers)

**SMK-AUTH-01 — Register + login + JWT verify**
- **Objective:** User can register, log in, and the token verifies.
- **Steps:** `POST /v1/auth/register` → `POST /v1/auth/login` → `POST /v1/auth/verify` with returned token; `GET /v1/.well-known/jwks.json`.
- **Expected:** 201/200; token verifies; JWKS returns a key.
- **Failure:** Token rejected; JWKS empty.
- **Automation:** `smoke/api/auth.smoke.ts`.

**SMK-AUTH-02 — Beneficiary alias resolution**
- **Steps:** `POST /v1/users/:id/aliases` (EMAIL) → `GET /v1/users/resolve?kind=EMAIL&value=…`.
- **Expected:** Resolves to user id.

**SMK-AUTH-03 — Delegation grant lifecycle**
- **Steps:** create → list → delete delegation.
- **Expected:** Grant visible then revoked.

### 3.3 Developer surface (Developers)

**SMK-DEV-01 — Org + API key issue/verify**
- **Steps:** `POST /v1/orgs` → `POST /v1/api-keys` → `POST /v1/api-keys/verify` (with secret).
- **Expected:** Key issued (`sk_test_…`), verify returns scopes/org.
- **Failure:** Verify fails for valid key, or succeeds for revoked key.

**SMK-DEV-02 — API key rotate/revoke**
- **Steps:** rotate → old secret fails verify, new passes; revoke → fails verify.
- **Expected:** Old secret invalid post-rotate; revoked invalid.

**SMK-DEV-03 — Gateway auth + rate limit + idempotency**
- **Steps:** Call `POST /v1/intents` via gateway with `Authorization: Bearer sk_…` + `Idempotency-Key`; repeat same key; exceed rate limit.
- **Expected:** First creates; duplicate returns cached response; rate-limit returns 429.
- **Failure:** Duplicate double-executes (idempotency broken) — **critical**.

**SMK-DEV-04 — Webhook subscribe + signed delivery + replay**
- **Steps:** `POST /v1/webhooks` (URL to test sink) → trigger an event (submit intent) → inspect `GET /v1/webhooks/:id/deliveries` → verify HMAC with `@salychain/sdk/webhooks` → `POST /deliveries/:id/replay`.
- **Expected:** Delivery POSTed with valid `X-Saly-Signature`; replay re-delivers.
- **Failure:** Signature invalid; no delivery; replay no-op.

### 3.4 Compliance & Risk (Security)

**SMK-CMP-01 — Sanctions screen (clear + hit)**
- **Steps:** `POST /v1/screening/screen` for a benign subject; then a known embedded-list hit.
- **Expected:** Clear→`decision=CLEAR`; hit→`decision=HIT`/case opened.
- **Failure:** Hit not flagged — **critical**.

**SMK-CMP-02 — KYB/KYC onboarding flow**
- **Steps:** `POST /v1/onboarding/start` → submit steps → fetch status.
- **Expected:** Progresses through required steps (from admin requirements).

**SMK-RISK-01 — Risk assess + velocity**
- **Steps:** `POST /v1/risk/assess` baseline; simulate rapid repeats; `POST /v1/risk/commit` on settle.
- **Expected:** Score rises with velocity; commit advances profile.

### 3.5 Ledger (Payments core)

**SMK-LED-01 — Double-entry balance enforced**
- **Objective:** Unbalanced entry rejected by DB trigger.
- **Steps:** `POST /v1/journal/entries` with debits≠credits.
- **Expected:** Rejected (`ledger.entry.unbalanced`).
- **Failure:** Accepted — **critical** (money integrity).

**SMK-LED-02 — Idempotent posting**
- **Steps:** Post same `idempotencyKey` twice.
- **Expected:** One entry; second returns existing.

**SMK-LED-03 — Reversal creates compensating entry**
- **Steps:** post → reverse.
- **Expected:** New REVERSED-linked entry; balances restored; original immutable.

### 3.6 Wallets & Signer (Wallets/Security)

**SMK-WAL-01 — Provision wallet (Base/XRPL/L3)**
- **Steps:** `POST /v1/wallets` per chain.
- **Expected:** ACTIVE wallet with address; `signerKeyRef` set; ETHEREUM/POLYGON rejected.

**SMK-WAL-02 — Policy cap enforcement**
- **Steps:** set per-tx cap; attempt transfer above cap.
- **Expected:** Denied (`wallet.policy.denied`).
- **Failure:** Over-cap transfer allowed — **critical**.

**SMK-SGN-01 — Key gen + sign + idempotency**
- **Steps:** `POST /v1/keys` → `POST /v1/sign` (same idempotencyKey twice).
- **Expected:** Deterministic signature; second returns same; private key never in response.
- **Failure:** Private key leaks in any payload/log — **critical**.

### 3.7 Routing & Liquidity (Payments)

**SMK-RT-01 — Rail decision**
- **Steps:** `POST /v1/routing/decide` for USDC→USDC same-ledger; for cross-currency; for fiat NGN.
- **Expected:** Selects INTERNAL / SWAP / FIAT respectively with rationale; decision persisted.

**SMK-LQ-01 — Signed FX quote + TTL**
- **Steps:** `POST /v1/quotes` → verify signature → consume → consume again after TTL.
- **Expected:** Valid signed quote; consume once; expired/again rejected.

**SMK-LQ-02 — DEX quote (or graceful stub)**
- **Steps:** `POST /v1/quotes/dex` USDC↔WETH on Base.
- **Expected:** `quote_source:'onchain'` when RPC/pool available; `'stub'` flagged otherwise.

### 3.8 Execution & rails (Payments) — the money paths

**SMK-EXE-01 — Internal transfer end-to-end**
- **Objective:** Intent → screen → route(INTERNAL) → reserve → settle, ledger balanced.
- **Steps:** `POST /v1/intents` TRANSFER between two internal accounts.
- **Expected:** Tx reaches SETTLED; ledger debits/credits match; `tx.settled` event emitted.
- **Failure:** Stuck state; imbalance — **critical**.

**SMK-EXE-02 — Base USDC payout (testnet)**
- **Preconditions:** Funded Base Sepolia custodial wallet; chain-listener-base running.
- **Steps:** `POST /v1/payouts/base`.
- **Expected:** AWAITING_CONFIRMATION → (listener observes Transfer) → SETTLED with txHash.
- **Failure:** No confirmation within SLA; wrong amount.

**SMK-EXE-03 — XRPL payout (testnet)** — analogous, IOU + native.

**SMK-EXE-04 — L3 USDC payout** — requires L3 RPC + `L3_USDC_ADDRESS` + chain-listener-l3.

**SMK-EXE-05 — Fiat payout (sandbox)**
- **Preconditions:** `FIAT_PSP_PROVIDER=paystack` sandbox; fiat-listener; `EXECUTION_INTERNAL_WEBHOOK_TOKEN`.
- **Steps:** `POST` fiat payout intent → PSP sandbox → webhook → `POST /v1/internal/fiat/confirmations`.
- **Expected:** Settles on PSP `transfer.success`; idempotent on retry.

**SMK-EXE-06 — Swap (ledger FX)** and **SMK-EXE-07 — DEX swap (on-chain)**.

**SMK-EXE-08 — Payroll batch** — N lines, all settle or fail atomically per line; batch detail correct.

**SMK-EXE-09 — Top-up** — clearing-seed credit appears in ledger.

**SMK-EXE-10 — Escrow fund/release/refund** — on-chain deal tracked; release pays payee; refund after deadline.

### 3.9 AI Agents (AI)

**SMK-AGT-01 — Create agent + auto wallet**
- **Steps:** `POST /v1/agents` → check provisioned Base/XRPL wallets + default policy.

**SMK-AGT-02 — Authorize spend within policy** → allowed; **above threshold** → approval request created.

**SMK-AGT-03 — Spend approval vote → resume**
- **Steps:** vote to approve → `POST /v1/transactions/resume-approval`.
- **Expected:** Tx proceeds after quorum; denied path emits `agent.spend_denied`.

**SMK-AGT-04 — Reasoning log capture** on agent intent.

### 3.10 Admin & Governance

**SMK-ADM-01 — RBAC role + team invite** (`/v1/settings/roles`, `/team`).
**SMK-ADM-02 — Feature flag toggle** reflects in dependent app gate.
**SMK-ADM-03 — Verification requirements CRUD** drives onboarding wizard.
**SMK-ADM-04 — Audit export CSV** non-empty, well-formed.
**SMK-GOV-01 — Contract status proposal** pause→resume recorded.

### 3.11 Contracts (Blockchain)

**SMK-SC-01 — Escrow Foundry suite** `forge test` in `contracts/escrow` → 9 pass.
**SMK-SC-02 — Token+staking Foundry suite** `forge test` in `contracts/token` → 31 pass.
**SMK-SC-03 — Launch switch one-way** — pre-launch transfer blocked except allowlist; post-`activate()` open; cannot re-lock.

### 3.12 Frontend apps (Merchants/Developers)

**SMK-UI-01 — Admin loads all 27 routes authenticated** (no "Element type invalid"/500).
**SMK-UI-02 — Business: submit transfer / swap / payroll / topup / L3** via forms → tx appears.
**SMK-UI-03 — Portal: create API key + webhook**, secret revealed once.
**SMK-UI-04 — Onboarding wizard** completes for business + developer.
**SMK-UI-05 — Portal `/logs`** — currently **expected fail** (page missing) — tracked bug.

---

## 4. The test pyramid — generation plan per type

### 4.1 Unit tests (extend existing Vitest)
Target the untested units first:
- `packages/money` (has script, **no specs**) → arithmetic, rounding, currency mismatch.
- `packages/events` schemas → every subject parses/round-trips.
- `services/identity` auth → password hash, JWT issue/verify/expiry, JWKS.
- `services/agents` policy → cap/allowlist/threshold matrix.
- `services/intent` validation + idempotency.
- routing evaluators edge cases; risk engine thresholds.

Example (money):
```ts
// packages/money/src/money.test.ts
import { describe, it, expect } from 'vitest';
import { Money } from './money.js';
describe('Money', () => {
  it('rejects cross-currency add', () => {
    expect(() => Money.ofMinor(100n,'USD').add(Money.ofMinor(100n,'NGN'))).toThrow();
  });
  it('mulRatio HALF_UP rounds correctly', () => {
    expect(Money.ofMinor(101n,'USD').mulRatio(1n,2n,'HALF_UP').toJSON().amountMinor).toBe('51');
  });
});
```

### 4.2 Integration tests (Vitest + Testcontainers)
Spin ephemeral Postgres/NATS/Redis; assert service↔DB and cross-service flows. Extend the existing `services/execution/*.integration.spec.ts` pattern to ledger, wallet, signer, webhooks.

```ts
// template: services/<svc>/test/<flow>.integration.spec.ts
import { PostgreSqlContainer } from '@testcontainers/postgresql';
// boot container → run prisma deploy → instantiate service → assert
```

### 4.3 End-to-end (API smoke runner + Playwright)
- **API E2E:** a `smoke` package that drives gateway with a real API key through intent→settle on the internal rail (deterministic, no chain).
- **UI E2E:** Playwright specs per app for the SMK-UI cases, using seeded sessions.

```ts
// smoke/e2e/internal-transfer.e2e.ts (pseudocode)
const saly = new SalyChain({ apiKey, baseUrl });
const intent = buildInternalTransfer();
const { id } = await saly.intents.submit(intent);
await pollUntil(() => saly.transactions.get(id), t => t.state === 'SETTLED', { timeoutMs: 30_000 });
```

### 4.4 Security tests
- **Authz matrix:** every endpoint × {no key, wrong scope, revoked key, expired JWT, wrong role} → expect 401/403.
- **Idempotency abuse:** concurrent duplicate keys must not double-spend.
- **Signer isolation:** assert no endpoint returns private key; log redaction works (`packages/logger` redact paths).
- **Webhook spoofing:** tampered body/signature rejected; replay-tolerance window enforced.
- **Injection/headers:** ZAP baseline scan against gateway; semgrep ruleset in CI.
- **Dependency:** `pnpm audit --prod` gate; `forge` slither (optional) on contracts.

```yaml
# .github/workflows/security.yml (target)
- run: pnpm audit --prod --audit-level=high
- uses: zaproxy/action-baseline@v0.12.0
  with: { target: 'http://localhost:4000/v1' }
```

### 4.5 Load tests (k6)
SLO targets (proposed): gateway intent submit p95 < 300ms at 200 RPS; internal settle p95 < 2s; signer sign p95 < 150ms.

```js
// load/k6/intent-submit.js
import http from 'k6/http'; import { check } from 'k6';
export const options = { stages: [
  { duration: '1m', target: 50 }, { duration: '3m', target: 200 }, { duration: '1m', target: 0 },
], thresholds: { http_req_duration: ['p(95)<300'] } };
export default function () {
  const res = http.post(`${__ENV.GW}/v1/intents`, __ENV.BODY, {
    headers: { Authorization: `Bearer ${__ENV.KEY}`, 'Idempotency-Key': `${__VU}-${__ITER}`, 'Content-Type':'application/json' },
  });
  check(res, { 'status 2xx': r => r.status >= 200 && r.status < 300 });
}
```

### 4.6 Chaos tests (Toxiproxy + pod-kill)
Inject failure into each critical dependency and assert graceful behavior:

| Experiment | Inject | Expected |
|-----------|--------|----------|
| DB latency/partition (ledger) | Toxiproxy latency 5s / cut | Execution retries, no double-post, surfaces typed error |
| NATS down | stop broker | Events buffer/retry; no lost settlement on recovery |
| Signer unavailable | kill signer | Broadcast job retries; no stuck "EXECUTING" beyond SLA |
| RPC flaky (Base) | Toxiproxy 50% error | Listener backs off; resumes from checkpoint, no missed Transfer |
| PSP webhook duplicate/out-of-order | replay | Idempotent settlement; no double-credit |
| Redis eviction | flush | BullMQ recovers; no duplicate broadcast |

```bash
# chaos/toxiproxy-ledger-latency.sh
toxiproxy-cli create ledger_db -l 127.0.0.1:5444 -u 127.0.0.1:5433
toxiproxy-cli toxic add ledger_db -t latency -a latency=5000
# run SMK-EXE-01; assert no imbalance, then remove toxic
```

---

## 5. Automation scaffolds (ready to drop in)

### 5.1 Health smoke (`scripts/smoke/health.sh`) — **implemented**
```bash
pnpm smoke:health
# or: ./scripts/smoke/health.sh
```

Also: `pnpm smoke:wait` (`wait-healthy.sh`), `pnpm smoke:partner` (`partner-flow.sh` — org→key→webhook→intent→SETTLED).

### 5.2 API smoke runner (`tests/smoke` — **implemented**)
- Package: `@salychain/smoke-tests` (`pnpm smoke:test`).
- Contract tests always run; live partner-flow runs when `SMOKE_GATEWAY_URL` is set (`pnpm -F @salychain/smoke-tests test:live`).

### 5.3 CI wiring (extend `.github/workflows/ci.yml`)
```yaml
  contracts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: foundry-rs/foundry-toolchain@v1
      - run: forge test --root contracts/escrow
      - run: forge test --root contracts/token
  smoke:
    needs: quality
    services: { postgres: {...}, nats: {...}, redis: {...} }
    steps:
      - run: pnpm db:generate && pnpm db:migrate
      - run: pnpm -F '@salychain/service-*' build
      - run: ./scripts/start-stack.sh & ./scripts/wait-healthy.sh
      - run: ./scripts/smoke/health.sh
      - run: pnpm -F @salychain/smoke test --grep '@infra|@payments'
```
Also add the **missing** steps Phase 1 flagged: `pnpm lint`, full `prisma-deploy-all.sh`, `pnpm test:e2e`.

---

## 6. Coverage targets & exit criteria

| Area | Now | Target (GA) |
|------|-----|-------------|
| Unit (services/packages) | 11/16 svc, 8/14 pkg | 100% of money paths; 80% line on core |
| Integration | execution only | ledger, wallet, signer, execution, webhooks, routing |
| E2E | none | internal transfer + 1 per rail + agent approval + onboarding |
| Contract | 40 tests | + invariant/fuzz; slither clean |
| Security | none in CI | authz matrix + ZAP baseline + audit gate |
| Load | none | SLOs defined + nightly k6 |
| Chaos | none | 6 experiments green in staging |

**Smoke exit criteria for a release:** all `@infra`, `@auth`, `@payments(internal)`, `@security(authz, idempotency, signer-isolation)` green; contract suites green; no `@critical` failure.

Proceed to [Phase 3 — Saly Analytics Cloud](../architecture/03-saly-analytics-cloud.md).
