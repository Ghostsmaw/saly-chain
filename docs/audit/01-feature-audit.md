# Phase 1 — Full Feature Audit

> **Prepared by:** Principal Blockchain / Data / DevOps Architecture + QA review
> **Scope:** Entire SalyChain monorepo as it exists in source today.
> **Method:** Code-grounded audit of all 16 services, 5 workers, 3 apps, 14 packages, 2 contract suites, and infra. Every claim below is traceable to source. Where the marketing/product surface promises something the code does not yet implement, it is marked **MISSING** or **PARTIAL** — not glossed over.

This document is deliberately blunt about maturity. A "✅ Real" rating means the logic is implemented and wired; it does **not** certify production-readiness (security review, load, HA). Those gaps are captured in **Risks** and Phase 5.

---

## 1. Maturity legend

| Symbol | Meaning |
|--------|---------|
| ✅ **Real** | Implemented and wired end-to-end in code |
| 🟡 **Partial** | Core path exists but with stub default, missing sub-features, or dev-only shortcuts |
| 🟦 **Scaffold** | Interface/registry/UI exists; backing implementation is external/manual/mock |
| ❌ **Missing** | Referenced in product/marketing/types but no implementation |

---

## 2. What SalyChain actually is (grounded)

SalyChain is an **intent-based, multi-rail financial execution network** with a custodial wallet model and a double-entry ledger as the source of truth. A user or AI agent expresses a financial *intent*; the platform screens (compliance/risk), routes (rail evaluator), quotes (FX/DEX), reserves (ledger), executes (wallet→signer→chain/PSP), and settles (chain listeners → confirmations), recording everything in an append-only ledger.

**Rails implemented:** Internal ledger, Base (USDC/ETH), XRPL (XRP + IOU), Saly L3 (USDC), Fiat (Paystack/Flutterwave), On-chain Escrow, On-chain DEX (Uniswap V3 on Base).

**Critical framing correction (vs the request's framing):** several items in the prompt are **product aspirations, not shipped infrastructure**:
- There is **no in-repo L3 sequencer, RPC node, or block explorer** — L3 is a documented OP-Stack devnet spike plus a settlement monitor and a thin USDC execution adapter. The explorer (`explorer.saly-l3.dev`) is a URL string only.
- There is **no bridge** — L3↔Base deposits/withdrawals are explicitly out of scope; a "L3 Bridge" appears only as a mock registry seed row.
- There is **no native stablecoin** — the platform uses Circle USDC (Base), externally deployed/bridged USDC (L3), and third-party XRPL IOUs. `$SALY` is a capped utility/governance token, not a stablecoin.
- There is **no merchant/checkout/POS product** — "merchant" functionality today = the business dashboard's treasury + payouts.
- There is **no analytics data platform** — "analytics" today = transaction-derived charts in the admin/business dashboards. (Building the real one is Phase 3.)

These are not criticisms of intent; they define the true baseline for Phases 2–5.

---

## 3. Feature inventory by category

### 3.1 Blockchain

| Feature | Status | Where |
|---------|--------|-------|
| Base/EVM adapter (build/sign/broadcast, EIP-1559) | ✅ | `packages/chain-base` |
| Base USDC + native ETH transfers | ✅ | `chain-base/adapter.ts`, `assets.ts` |
| Uniswap V3 DEX swap (SwapRouter02) + quotes (QuoterV2) | ✅ | `chain-base/dex*.ts` |
| Base transfer-log scanning + block polling | ✅ | `chain-base/adapter.ts` |
| EVM balance read helper | 🟡 (ABI present, no public wrapper) | `chain-base/abi.ts` |
| XRPL adapter (native XRP) | ✅ | `packages/chain-xrpl` |
| XRPL IOU (TrustSet + issued Payment + trust lines) | ✅ | `chain-xrpl/iou.ts` |
| XRPL ledger scan / keygen (ed25519) | ✅ | `chain-xrpl/adapter.ts` |
| L3 execution adapter (USDC/ETH transfer, log scan) | ✅ | `packages/chain-l3/adapter.ts` |
| L3 settlement monitor (Base `L2OutputOracle` `OutputProposed`) | ✅ | `chain-l3/rollup-monitor.ts` |
| L3 network registry + spike exit-criteria CLI | ✅ | `chain-l3/network.ts`, `cli/verify-spike.ts` |
| L3 sequencer / op-geth / op-node / batcher / proposer | 🟦 (manual, external OP-Stack) | `infra/l3`, runbook s5 |
| L3 RPC node infra | ❌ (expects external `:9545`) | — |
| L3 block explorer | ❌ (URL string only) | `packages/types/src/chains.ts` |
| L3↔Base bridge | ❌ (mock registry row) | `services/contract-registry/seed` |
| Chain listeners (Base, XRPL, L3) | ✅ | `services/workers/chain-listener-*` |
| L3 rollup monitor worker (+health server) | ✅ | `services/workers/l3-rollup-monitor` |
| `SalyEscrow.sol` (fund/release/refund, deadline) | ✅ (9 Foundry tests) | `contracts/escrow` |
| `$SALY` token (capped, permit, burnable, launch switch) | ✅ (19 tests) | `contracts/token/SalyToken.sol` |
| `SalyStaking` (Synthetix-style rewards) | ✅ (12 tests) | `contracts/token/SalyStaking.sol` |
| Contract registry (deployed contracts, upgrades, status proposals) | 🟡 (DB-only; no real multisig/on-chain) | `services/contract-registry` |
| ETHEREUM / POLYGON chains | 🟦 (schema-only, provisioning blocked) | `packages/types/src/chains.ts` |

### 3.2 Payments

| Feature | Status | Where |
|---------|--------|-------|
| Canonical intent ingestion + validation | ✅ | `services/intent`, `packages/intent-schema` |
| Execution state machine (screen→route→quote→reserve→execute→settle) | ✅ | `services/execution/transactions.service.ts` |
| Internal ledger transfer | ✅ | execution + ledger |
| Base USDC payout | ✅ | execution `/payouts/base` |
| XRPL payout | ✅ | execution `/payouts/xrpl` |
| L3 USDC payout | ✅ | execution `/payouts/l3` |
| Fiat payout (Paystack NGN; Flutterwave multi-ccy) | ✅ (real HTTP; **stub by default**) | `packages/chain-fiat` |
| Fiat settlement via PSP webhooks | ✅ | `services/workers/fiat-listener` |
| Payroll batch (1–500 lines, per-line payout expansion) | ✅ | intent-schema + execution |
| Top-up (inbound, clearing-seed model) | 🟡 (no real pay-in rail) | execution `/topups`, admin clearing |
| Treasury FX swap (ledger) | ✅ | execution SWAP path |
| On-chain DEX swap | ✅ | execution + liquidity + chain-base |
| Escrow deals (fund/release/refund + on-chain tracking) | ✅ | execution `escrow/*` |
| Chain confirmation pipeline (NATS chain events → settle) | ✅ | execution `confirmations.service.ts` |
| Routing engine (weighted rail scoring) | ✅ | `services/routing` |
| Signed FX quotes (TTL, HMAC) | ✅ | `services/liquidity` |
| FX rate providers (Coinbase, Frankfurter, composite) | ✅ (stub fallback flag) | liquidity |
| `INTENT_SCREENED` / `INTENT_ROUTED` event emission | ❌ (schema+subscriber exist; never published) | execution gap |

### 3.3 Stablecoins

| Feature | Status | Where |
|---------|--------|-------|
| Circle USDC on Base (mainnet + sepolia) | ✅ | `chain-base/assets.ts` |
| USDC on L3 (external/bridged by address) | 🟡 (env/manifest-resolved, not minted) | `chain-l3/assets.ts` |
| XRPL IOU stable (3rd-party issuer, e.g. USD) | ✅ | `chain-xrpl/iou.ts` |
| Native Saly-issued stablecoin (mint/redeem/reserves/attestation) | ❌ | — |
| Stablecoin reserve management / proof-of-reserves | ❌ | — |

### 3.4 Wallets

| Feature | Status | Where |
|---------|--------|-------|
| Custodial wallet provisioning (Base, XRPL, L3) | ✅ | `services/wallet` |
| Wallet ↔ ledger account linking | ✅ | wallet `ensure-ledger-account` |
| Spend policy engine (per-tx/daily caps, allowlists) | ✅ | wallet policy controller |
| Rolling-spend tracking (24h / 30d) | ✅ | wallet policy |
| Async broadcast worker (BullMQ) | ✅ | wallet `broadcast.worker.ts` |
| High-value spend approval gating (→ agents) | ✅ | wallet `SpendApprovalService` |
| KMS-backed key gen + signing (EVM + XRPL) | ✅ | `services/signer` |
| AWS KMS provider (prod) / local AES-GCM (dev) | ✅ | signer providers |
| Sign-request audit + idempotency | ✅ | signer `SignRequest` |
| DEX/IOU policy presets | ✅ | wallet `ensure-dex`, `ensure-iou` |
| Non-custodial / user-held key wallets | ❌ | — |

### 3.5 Merchants

| Feature | Status | Where |
|---------|--------|-------|
| Business treasury dashboard (balances, wallets, activity) | ✅ | `apps/business` |
| Business payouts (crypto/fiat/mobile/L3) | ✅ | business `/transfers`, `/l3` |
| Payroll runner UI | ✅ | business `/payroll` |
| Top-up UI | ✅ | business `/topups` |
| Swap UI (ledger + DEX) | ✅ | business `/swap` |
| Spend approvals UI | ✅ | business `/approvals` |
| Dedicated merchant product (checkout, hosted pay page, POS, invoicing UI, settlement reports) | ❌ | — |
| Payment links / QR / plugins (Shopify/Woo) | ❌ | — |
| Merchant org multi-tenancy (beyond demo org) | 🟡 (hardcoded `org_demo_acme`) | business/portal constants |

### 3.6 AI

| Feature | Status | Where |
|---------|--------|-------|
| AI agent registry (create/list/status) | ✅ | `services/agents` |
| Agent spending policy (caps, allowlist, approval threshold) | ✅ | agents |
| Multi-approver spend approval workflow + voting | ✅ | agents spend-approvals |
| Agent reasoning logs | ✅ | agents reasoning-logs |
| Agent wallet auto-provisioning (Base/XRPL) | ✅ | agents → wallet |
| Agent delegations (user→agent scopes) | ✅ | `services/identity` delegations |
| `AGENT_PAY` intent kind | ✅ | intent-schema |
| Canonical intent schema (the Saly AI contract) | ✅ | `packages/intent-schema` |
| Admin AI Insights view | ✅ | `apps/admin/ai-insights` |
| LLM/agent runtime (actual model, NL→intent extraction) | ❌ (contract only; extraction is external) | — |
| AI fraud/risk ML models | ❌ (rule-based only) | `services/risk` |

### 3.7 Analytics

| Feature | Status | Where |
|---------|--------|-------|
| Admin analytics (tx counts by kind/state, daily volume, success rate) | ✅ (derived from tx history) | `apps/admin/analytics` |
| Business analytics charts | ✅ | `apps/business/analytics` |
| Risk summary / actor profiles / assessments | ✅ | `services/risk`, admin `/risk` |
| Route decision audit log | ✅ | routing |
| Service health / monitoring dashboard | ✅ (localhost probes) | admin `/monitoring` |
| Blockchain data platform (indexers, decoders, warehouse, datashares, realtime APIs) | ❌ | — (Phase 3) |
| Cross-chain aggregated datasets | ❌ | — |
| GMV / revenue / cohort / financial BI | ❌ (only tx-count derivations) | — |

### 3.8 Developers

| Feature | Status | Where |
|---------|--------|-------|
| Public B2B API gateway (auth, scopes, rate limit, idempotency, request log) | ✅ | `services/gateway` |
| Organizations + members | ✅ | `services/apikeys` |
| API key lifecycle (issue/verify/rotate/revoke, scopes, IP allowlist) | ✅ | apikeys |
| Webhook subscriptions + HMAC-signed delivery + retry/DLQ/replay | ✅ | `services/webhooks` |
| Public TypeScript SDK (intents/transactions/webhooks/agents) | 🟡 (narrower than platform; stale JSDoc example) | `packages/sdk` |
| Webhook signature verification helper | ✅ | `sdk/webhooks/verify.ts` |
| Developer portal (keys, webhooks, intents, txs, KYC, docs) | ✅ | `apps/portal` |
| Portal request-logs page | 🟡 (API wired, **page missing**; broken nav link) | portal `/logs` |
| Inline API docs | ✅ (static) | portal `/docs` |
| OpenAPI/Swagger published spec | 🟡 (Nest `/docs` per service; no unified published spec) | service `main.ts` |

### 3.9 Security

| Feature | Status | Where |
|---------|--------|-------|
| Custody isolation (keys only in signer behind network boundary) | ✅ | ADR-0005, signer |
| KMS wrapping (AWS prod / local dev) | ✅ | signer providers |
| Policy-gated signing | ✅ | signer policy engine |
| Sanctions screening (Chainalysis/ComplyAdvantage/Refinitiv when keyed) | ✅ (embedded list **default**) | `services/compliance` |
| KYC/KYB onboarding (progressive, dynamic requirements) | 🟡 (manual tiering; OCR stub; metadata-only uploads) | compliance + apps |
| Risk scoring (velocity/behavioral/counterparty) | ✅ (heuristic) | `services/risk` |
| RBAC (roles, members, feature flags) | ✅ | `services/admin` |
| JWT auth + JWKS + delegations | ✅ | `services/identity` |
| Idempotency everywhere (mutating endpoints) | ✅ | gateway + clients |
| HMAC-signed webhooks | ✅ | webhooks |
| Audit logs (admin actions, ledger, sign requests) | ✅ | admin/ledger/signer |
| Typed error codes (no raw throws at boundary) | ✅ | `packages/errors` |
| Secrets management (vault/SSM) | 🟡 (env-based; terraform KMS only) | infra |
| App `/metrics` + tracing wiring | ❌ (Prometheus scrapes 404) | observability gap |
| mTLS / WAF / network policies | ❌ | — |
| Per-request token validation in app middleware | 🟡 (cookie presence only) | apps middleware |

### 3.10 Governance

| Feature | Status | Where |
|---------|--------|-------|
| `$SALY` one-way launch switch | ✅ | token contract |
| Token ownership (`Ownable2Step`) | ✅ | token contract |
| Contract status proposals (pause/resume) | 🟡 (DB-only, simulated multisig) | contract-registry |
| Platform RBAC + audit | ✅ | admin |
| On-chain governance (DAO, voting, timelock, treasury) | ❌ | — |
| Staking-based governance rights | ❌ (staking = rewards only) | — |

---

## 4. Consolidated feature matrix (Feature · Status · Dependencies · Risks · Missing components)

> Grouped by category. "Dependencies" = runtime prerequisites. "Risks" = what threatens correctness/safety/scale. "Missing" = gap to production/feature-complete.

### Blockchain

| Feature | Status | Dependencies | Risks | Missing components |
|---------|--------|--------------|-------|--------------------|
| Base adapter + USDC/ETH | ✅ | Base RPC, signer | RPC rate limits/outage; no balance wrapper; gas spikes | Balance API, multi-provider failover |
| Base DEX (Uniswap V3) | ✅ | Base RPC, pools, signer | Slippage/MEV; pool liquidity; stub fallback masks failures | MEV protection, multi-DEX |
| XRPL native + IOU | ✅ | XRPL WSS, signer | WSS reconnect; issuer trust; no live tests in CI | Live integration tests, issuer mgmt |
| L3 adapter + monitor | ✅ | External L3 RPC, Base oracle | L3 stack is manual; no HA; monitor idle w/o oracle | Sequencer infra, RPC HA, explorer, bridge |
| Escrow contract | ✅ | Deployed contract, resolver key | Resolver key compromise; no upgradeability | Multisig resolver, audit |
| $SALY token + staking | ✅ | Deployer/treasury keys | `activate()` irreversible; reward funding | External audit, governance |
| Contract registry | 🟡 | DB | Status changes not enforced on-chain | Real multisig + RPC execution |

### Payments

| Feature | Status | Dependencies | Risks | Missing components |
|---------|--------|--------------|-------|--------------------|
| Intent pipeline | ✅ | intent, execution, ledger, +5 services | Orchestration complexity; partial-failure recovery | Saga/compensation hardening |
| Multi-rail payouts (Base/XRPL/L3) | ✅ | wallet, signer, listeners | Confirmation lag; reorg handling | Reorg/finality policy per chain |
| Fiat payout | ✅ (stub default) | PSP keys, fiat-listener | PSP downtime; webhook spoofing; default stub in prod | Prod PSP enablement, reconciliation |
| Payroll | ✅ | execution, rails | Large-batch partial failures | Batch retry/rollback UX |
| Top-up | 🟡 | clearing seed | No real pay-in rail (simulated) | Bank/PSP pay-in integration |
| FX/DEX quotes | ✅ | Coinbase/Frankfurter/RPC | Rate staleness; stub fallback | Rate redundancy, alerting |
| Settlement confirmations | ✅ | NATS, listeners | Listener lag stalls settlement | Lag alerts, dead-letter reconcile |

### Stablecoins

| Feature | Status | Dependencies | Risks | Missing components |
|---------|--------|--------------|-------|--------------------|
| USDC (Base) | ✅ | Circle USDC contract | External issuer dependency | — |
| USDC (L3) | 🟡 | Manual deploy/bridge | Unbacked if misconfigured | Canonical bridge, attestation |
| XRPL IOU | ✅ | 3rd-party issuer | Issuer solvency/trust | Issuer due diligence |
| Native stablecoin | ❌ | — | N/A | Mint/redeem, reserves, PoR, attestation, compliance |

### Wallets

| Feature | Status | Dependencies | Risks | Missing components |
|---------|--------|--------------|-------|--------------------|
| Custodial wallets | ✅ | signer, ledger | Custody concentration | HSM hardening, key ceremony |
| Policy engine | ✅ | wallet DB | Policy bypass if misconfigured | Policy test harness |
| Signer/KMS | ✅ | AWS KMS (prod) | Single custody service; local key in dev | HA signer, key rotation runbook |
| Spend approvals | ✅ | agents | Approver availability | SLA/escalation |

### Merchants

| Feature | Status | Dependencies | Risks | Missing components |
|---------|--------|--------------|-------|--------------------|
| Business dashboard payouts | ✅ | core services | Demo-org hardcoding | True multi-tenant org scoping |
| Merchant product | ❌ | — | N/A | Checkout, payment links, POS, invoicing, settlement reports, plugins |

### AI

| Feature | Status | Dependencies | Risks | Missing components |
|---------|--------|--------------|-------|--------------------|
| Agent registry + policy | ✅ | agents, wallet | Policy sync drift | Policy reconciliation tests |
| Spend approvals/voting | ✅ | agents | Collusion/threshold misconfig | Audit + anomaly detection |
| Intent schema (AI contract) | ✅ | — | Versioning discipline | Conformance test suite |
| LLM intent extraction | ❌ | — | N/A | Saly AI model + NL→intent service |
| ML risk/fraud | ❌ | — | N/A | Feature store, model serving |

### Analytics

| Feature | Status | Dependencies | Risks | Missing components |
|---------|--------|--------------|-------|--------------------|
| Dashboard analytics | ✅ | execution/risk | Per-request compute; no warehouse | Aggregation layer |
| Blockchain data platform | ❌ | — | N/A | Indexers, decoders, warehouse, datashares, realtime APIs, datastreams, intelligence (Phase 3) |

### Developers

| Feature | Status | Dependencies | Risks | Missing components |
|---------|--------|--------------|-------|--------------------|
| Gateway API | ✅ | apikeys, identity, Redis | Rate-limit tuning; no published OpenAPI | Unified spec, sandbox |
| API keys | ✅ | apikeys DB | Pepper rotation | Key scoping UI maturity |
| Webhooks | ✅ | Redis, NATS | Delivery backpressure | Subscriber SLA, replay UX |
| Public SDK | 🟡 | gateway | Surface lag vs platform; stale docs | Wallets/ledger, full agents, OpenAPI-gen |
| Portal | ✅ | core services | Missing `/logs` page | Logs page, multi-tenant |

### Security

| Feature | Status | Dependencies | Risks | Missing components |
|---------|--------|--------------|-------|--------------------|
| Custody isolation | ✅ | signer/KMS | Dev local key | Prod KMS enforcement, HSM |
| Sanctions/KYC | 🟡 | vendor keys | Embedded list + manual KYC default | Vendor enablement, OCR, doc storage |
| Risk scoring | ✅ | risk DB | Heuristic only | ML, tuning, backtesting |
| RBAC/JWT/idempotency/HMAC | ✅ | identity/admin | Cookie-presence middleware | Edge token validation |
| Observability/secrets | ❌/🟡 | OTEL/Prom | No app metrics/traces; env secrets | `/metrics`, tracing, vault, WAF/mTLS |

### Governance

| Feature | Status | Dependencies | Risks | Missing components |
|---------|--------|--------------|-------|--------------------|
| Token launch switch | ✅ | token owner | Irreversible | Ceremony + audit |
| Contract status proposals | 🟡 | registry DB | Not on-chain enforced | Multisig + on-chain exec |
| Platform RBAC/audit | ✅ | admin | — | — |
| On-chain governance | ❌ | — | N/A | DAO, voting, timelock, treasury |

---

## 5. Top cross-cutting risks (ranked)

1. **Custody** — single signer service; prod must enforce AWS KMS + HSM, key rotation, and HA. Dev local master key must never reach prod.
2. **Observability blind spot** — no `/metrics`, no traces exported, no dashboards/alerts. You cannot safely operate money movement without this. (Prometheus already 404s.)
3. **Default-stub posture** — fiat PSP, sanctions list, FX/DEX can silently fall back to stubs. Production config must fail-closed, not stub.
4. **Settlement reliability** — chain-listener lag or NATS consumer stall silently halts settlement; no alerting.
5. **Test coverage gaps** — 5 services + 5 workers + 3 apps have zero tests; no e2e; no load/chaos. Money paths (execution) are well-tested; the edges are not.
6. **No production deploy artifacts** — only 5/19 Dockerfiles; only fiat-listener in k8s; terraform is KMS-only.
7. **Multi-tenancy** — demo org hardcoding blocks real multi-customer operation.
8. **L3 reality gap** — sequencer/RPC/explorer/bridge are manual or absent; product surface implies more than exists.

---

## 6. "Missing components" master list (feeds Phases 3–5)

- **Analytics/data platform** (Phase 3): indexers, decoders, event processors, normalization, cross-chain aggregation, warehouse connectors, realtime APIs, datastreams, intelligence, **block explorer**.
- **Native stablecoin stack**: mint/redeem, reserve mgmt, proof-of-reserves, attestation.
- **Merchant product**: checkout, payment links, POS, invoicing, settlement reports, e-commerce plugins.
- **L3 production infra**: sequencer HA (Conductor), RPC nodes, bridge contracts, explorer.
- **AI runtime**: NL→intent extraction service, ML risk/fraud models, feature store.
- **Observability**: `/metrics` (prom-client/Nest), OTEL tracing SDK, dashboards, alert rules.
- **Deploy**: Dockerfiles for all services/apps, full k8s manifests, prod terraform (VPC/RDS/EKS/IAM/secrets), CI deploy + forge tests + e2e + lint.
- **Governance**: on-chain DAO/voting/timelock/treasury; real multisig contract control.
- **Testing**: e2e framework + specs, load (k6), chaos (Toxiproxy/Litmus), contract tests in CI.
- **Industry verticals** (Phase 4): finance, healthcare, education, government, agriculture, aviation, supply chain, AI agents.

---

## 7. Inventory totals

| Layer | Count | Tested |
|-------|-------|--------|
| Backend services | 16 | 11 have specs (execution heavily) |
| Workers | 5 | 0 |
| Frontend apps | 3 | 0 |
| Shared packages | 14 | 8 |
| Contract suites | 2 (escrow, token) | 40 Foundry tests total |
| HTTP endpoints (services) | ~110 | — |
| App routes | 55 pages + 7 API | — |
| NATS event subjects | 24 (2 never published) | — |
| Intent kinds | 7 | partial validation on 4 |
| Money rails | 7 | — |

Proceed to [Phase 2 — Smoke Test Plan](02-smoke-test-plan.md).
