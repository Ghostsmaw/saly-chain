# Milestone C — Harden money + multi-tenancy: phased plan

> **Goal:** take the money-movement core from "works for one demo org on a simulated rail" to a **production-grade, tenant-isolated, reconcilable payments platform**, and ship the merchant product surface on top of it.
>
> **Milestone exit (from [roadmap](05-technical-implementation.md)):** true multi-tenant org scoping end-to-end; a merchant product (checkout, payment links, settlement reports); a real fiat pay-in rail with reconciliation; e2e + load + chaos suites green; documented reorg/finality policies per chain.

This plan is **reuse-first and security-first**. It builds on the existing intent → execution → ledger pipeline, the gateway's API-key auth/scopes, the typed event bus + outbox, the fiat-listener (today outbound-only), and the analytics/observability stack. It hardens the layers the audit flagged: tenant isolation on money paths, real pay-in, reconciliation, and resilience testing.

See the current-state map that grounds this plan in [the Milestone C state report](#appendix-current-state-grounding). This document sequences the work into independently shippable phases.

---

## Phase overview

| Phase  | Name                               | Headline outcome                                                                                            | Status |
| ------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------ |
| **C1** | Tenant isolation (money core)      | Org identity propagates gateway→services; intent/execution are org-scoped; demo-org hardcoding fails closed | ✅     |
| **C2** | Real fiat pay-in rail + recon      | Inbound PSP pay-in (virtual accounts / charges) replaces clearing-seed; ledger ↔ rail reconciliation        | ✅     |
| **C3** | Merchant product                   | Payment links, hosted checkout, and settlement reports as a first-class org product                         | ✅     |
| **C4** | Resilience: finality + test suites | Per-chain reorg/finality policies; e2e + load + chaos suites wired into CI                                  | ✅     |

Phases are ordered so each yields value on its own and the riskier money changes (C2) sit on top of a hardened tenancy foundation (C1). C3 (merchant) consumes C1 isolation + C2 settlement. C4 raises the confidence bar across all of it.

---

## C1 — Tenant isolation for the money core ✅

**Problem (pre-C1):** Org was real only at the API-key / webhook / analytics layer. The money core (intent, execution, ledger, wallet) had **no org column** and most list endpoints were **globally scoped**; org was never on the wire between services. Portal/business apps silently defaulted to `org_demo_acme`.

**What shipped:**

### Tenant-context propagation (the backbone)

- `packages/sdk-internal/src/tenant-context.ts` — an `AsyncLocalStorage`-based `TenantContext` (`orgId`, `environment`, `correlationId`) with `runWithTenant()` / `getTenant()` / `getTenantOrgId()`, the wire-header constants (`x-saly-org-id`, `x-saly-environment`), and a framework-agnostic `tenantContextMiddleware`.
- `HttpClient` now auto-attaches `x-saly-org-id` / `x-saly-environment` from an explicit `RequestOptions.orgId` **or** the ambient context — so org propagates across service hops without threading it through every call site. (Mirrors how `x-correlation-id` already flows.)
- **Trust model:** the gateway is the only public ingress and overwrites these headers from the authenticated principal; downstream services trust them because they are not publicly reachable.

### Enforcement

- **Gateway** (`TenantContextMiddleware`, applied after auth): runs each authenticated request inside `runWithTenant({ orgId, environment })`, so all downstream client calls within the request carry the tenant.
- **Intent service**: `IntentRecord.orgId` column (+ migration + index); stamped on create from the propagated context; `list` filtered by org; `getById` returns _not-found_ (never _forbidden_ — no existence leak) for another tenant's record.
- **Execution service**: `ExecutionTransaction.orgId` column (+ migration + index); stamped at every create site (internal transfer, base/L3/XRPL payout, intent ingest, approval-pending, payroll batch + lines); `list` filtered by org; `getById` not-found-isolates cross-tenant reads.
- **Fail-closed safety property:** a record whose org isn't stamped is simply invisible to an org-scoped caller (under-inclusion), so a missed stamp can never become a cross-tenant _leak_.

### De-hardcoding `org_demo_acme`

- **Portal** (`resolveOrgId()`) and **business** (`requireTenantEnv()`): org/actor are taken from env (`PORTAL_ORG_ID`, `BUSINESS_ORG_ID`, `BUSINESS_ACTOR_ID`) and **throw in production** when unset — no silent demo fallback. Dev/test keep the frictionless default. Business intent submissions now stamp `orgId` for forward-compatible reporting/reconciliation.

### Verification

- `sdk-internal` (tenant-context: 5), intent (tenant isolation: 5), execution (tenant isolation: 4) — all green; full suites for intent/execution/gateway pass; portal + business typecheck clean; no lint errors.

**Deferred to later C phases (noted, not gaps):**

- Per-session SSO→org derivation in the portal/business apps (currently env-bound).
- Ledger/wallet org columns (their isolation today is `ownerId`/`ownerKind`-based; revisit when merchant settlement accounts land in C3).
- A backfill job to stamp `orgId` on pre-C1 rows (deployment migration concern).

---

## C2 — Real fiat pay-in rail + reconciliation ✅

**Problem (pre-C2):** Pay-in was simulated — `createTopup` credited from a clearing pool seeded by an ops `/admin/clearing/seed` call offset against `equity.inbound.*` ("no real pay-in rail in Tier 2"). The fiat-listener confirmed **outbound payouts** only; the default PSP was an in-memory `stub`.

**What shipped:**

### PSP pay-in capability (`packages/chain-fiat`)

- The `FiatAdapter` contract gained an inbound surface: `supportsPayin()`, `createPayin()` (issues a **virtual account** or **hosted checkout**), and `getPayinStatus()` (webhook-miss recovery). Implemented for **stub** (deterministic virtual account, fully E2E for dev/tests), **Paystack** (`/transaction/initialize` checkout + `/transaction/verify`), **Flutterwave** (`/virtual-account-numbers` + verify-by-reference), and **composite** (delegates by currency/country).
- New inbound webhook parsers — `parsePaystackPayinWebhook` (`charge.success`) and `parseFlutterwavePayinWebhook` (`charge.completed`, correlated via `tx_ref`) — reusing the existing HMAC verifiers. The correlation key is our execution transaction id.

### Real pay-in lifecycle (execution)

- New `FIAT_PAYIN` transaction kind (+ migration). `POST /v1/payins` → `createFiatPayin`: org-stamped (C1), AML-screened, then asks the PSP to open a pay-in and parks the tx in `AWAITING_CONFIRMATION` with the PSP reference on `broadcastJobId` and the instruction in metadata. The ledger is **only credited on confirmation**.
- `confirmFiatPayinFromWebhook` posts the real settlement: **DR `asset.bank.<psp>.<ccy>`** (settled cash actually received) / **CR** the destination treasury — replacing the synthetic `equity.inbound` offset (`buildPayinPostings`, `bankSettlementAccountCode`). Idempotent (already-terminal / not-found), credits the PSP-confirmed amount, and flags any requested-vs-confirmed divergence for reconciliation.
- Confirmation arrives two ways: the **fiat-listener** (`POST /v1/internal/fiat/payins`, internal bearer token) on a verified webhook, and a **poller** (`FiatPayinConfirmationsService`) that recovers missed webhooks and drives the stub end-to-end.

### Inbound webhook intake (fiat-listener)

- The existing `/webhooks/paystack` and `/webhooks/flutterwave` endpoints now route **both** payout (`transfer.*`) and pay-in (`charge.*`) events from the single PSP URL, deduped on `(provider, externalEventId)` in the same `fiat_webhook_events` table, and call `execution.confirmPayin`.

### Ledger ↔ rail reconciliation

- `ReconciliationService` (opt-in via `EXECUTION_RECONCILIATION_ENABLED`, default off) sweeps the fiat-pay-in rail: it compares the **execution record** against **authoritative ledger balances** and records every discrepancy as a durable break — `LEDGER_DRIFT`, `MISSING_LEDGER_ENTRY`, `AMOUNT_MISMATCH`, `STALE_PENDING` (stale pending pay-ins are expired). Pure diff logic (`reconciliation.diff.ts`) is unit-tested. Runs + breaks persist in `reconciliation_runs` / `reconciliation_breaks` (+ migration); ops surface at `POST /v1/admin/reconciliation/run` and `GET /v1/admin/reconciliation/runs` (admin token). Metrics: `salychain_fiat_payins_total`, `salychain_reconciliation_runs_total`, `salychain_reconciliation_breaks_total`.

### Surface + SDK

- Gateway `POST /v1/payins` (scope `payins:write`, idempotency-keyed, org propagated via C1). `sdk-internal` `ExecutionClient.createPayin` / `listReconciliationRuns` / `runReconciliation`; `FIAT_PAYIN` added to the transaction-kind unions and event schema.

### Verification

- chain-fiat (25), execution (81, incl. pay-in posting builders, reconciliation diff, pay-in integration shape) — all green; events/sdk-internal/gateway/fiat-listener build + typecheck clean; no lint errors.

**Deferred (noted, not gaps):** live-PSP sandbox E2E (structural adapters + parser tests cover the contract; `stub` is the working default); reconciliation against the PSP's own settlement-report API (today reconciles execution↔ledger, the two independent systems we own); per-org dedicated virtual accounts (currently per-pay-in dynamic accounts).

---

## C3 — Merchant product ✅

**Problem (pre-C2):** Greenfield. "Merchant" today = the `apps/business` treasury console. No checkout, payment links, invoicing, or settlement reports.

**What shipped:**

### Merchant service (`services/merchant`, port **4021**, db `salychain_merchant`)

- **Payment links** — org-scoped, shareable slugs with fixed amount/currency/destination; archive support.
- **Hosted checkout sessions** — payer opens checkout → canonical **TOPUP** intent → real **FIAT_PAYIN** (C2); session tracks PSP instruction and syncs to `COMPLETED`/`FAILED`/`EXPIRED` via poller.
- **Settlement reports** — per-org rollups over settled `FIAT_PAYIN` execution rows (enriched with checkout-session metadata), exportable CSV.
- **Public payer endpoints** — `GET /v1/public/payment-links/:slug`, `POST /v1/public/checkout/:slug/sessions`, `GET /v1/public/checkout/sessions/:id` (no org header; org resolved from link).

### Surface + SDK

- Gateway routes under `/v1/merchant/*` with scopes `merchant:read` / `merchant:write`; idempotency on link/create + checkout open.
- `sdk-internal` `MerchantClient`; metrics: `salychain_merchant_payment_links_total`, `salychain_merchant_checkout_sessions_total`, `salychain_merchant_settlement_reports_total`.
- **Business app** — Payment links + Settlements pages; payer-hosted checkout at `/pay/{slug}`.

### Registration

- Postgres init (`salychain_merchant`), CI migrate matrix, Helm service entry (4021), Prometheus scrape, build-images workflow.

**Exit:** an org can create a payment link, a payer completes hosted checkout, funds settle to the org's ledger via FIAT_PAYIN, and the org pulls a settlement report — end-to-end, tenant-isolated.

---

## C4 — Resilience: finality policies + e2e/load/chaos ✅

**Problem (pre-C4):** Reorg handling existed in the analytics indexer/listeners but there was no documented per-chain finality policy enforced on the money path, and CI had **no** e2e / load / chaos coverage.

**What shipped:**

### Finality policy package (`packages/finality`)

- Canonical confirmation depths: **BASE=2**, **XRPL=0**, **SALY_L3=2**.
- `assertFinalityMet`, `chainFromTxKind`, `detectReorg`, `extractSettlementFinality`.

### Money-path enforcement (execution)

- `markSettledByTxHash` validates `confirmations_depth` before SETTLED; stamps `finality` metadata on settlement events.
- `handleChainReorg` sweeps orphaned block ranges and transitions `SETTLED → REVERSING → REVERSED` with ledger reversal (`reverseChainSettlement`).
- State machine allows reorg-only `SETTLED → REVERSING`.

### Events + listeners

- Observation events carry optional `confirmations_depth`.
- New subjects: `salychain.chain.base.reorg_detected`, `salychain.chain.l3.reorg_detected`.
- Base + L3 listeners detect checkpoint hash mismatch, emit reorg events, rewind checkpoint.
- Metric: `salychain_chain_reorgs_detected_total`.

### Resilience test suites (`tests/resilience`)

- **E2E** — policy contract, tenant wire headers, optional live gateway health.
- **Chaos** — fail-closed finality violations, reorg reversal prerequisites.
- **Load** — k6 scripts (`intent-submit`, `health-smoke`) + CI script contract tests.
- CI workflow: `.github/workflows/resilience.yml`.

### Runbook

- [c4-finality-resilience.md](../runbooks/c4-finality-resilience.md)

**Exit:** finality policies documented + enforced; e2e/chaos/load-script jobs green in CI.

---

## Appendix: current-state grounding

C1 was implemented against a code-grounded audit of the repo: org existed only at the apikeys/webhooks/analytics layer; intent/execution/ledger/wallet had no org columns; pay-in was clearing-seed simulated; merchant was greenfield; tests were Vitest unit/integration + Foundry with no e2e/load/chaos in CI. Service template = `services/analytics-intelligence`; next free HTTP port = 4021.
