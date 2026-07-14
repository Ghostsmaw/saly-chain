# SalyChain Architecture Review & Roadmap

> A code-grounded, five-phase review of the entire SalyChain platform — from "what's actually built today" to "what a billion-dollar blockchain infrastructure company needs next." Authored as a Principal Blockchain / Data / DevOps / QA review.

Every claim in Phase 1 is traceable to source. Phases 3–5 build only on what exists, and explicitly close the gaps the audit found.

## The five phases

| Phase                            | Document                                                                                           | What it delivers                                                                                                                                                                                                  |
| -------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1 — Feature Audit**            | [`01-feature-audit.md`](01-feature-audit.md)                                                       | Every implemented feature, categorized (Blockchain, Payments, Stablecoins, Wallets, Merchants, AI, Analytics, Developers, Security, Governance), with a Feature · Status · Dependencies · Risks · Missing matrix. |
| **2 — Smoke Test Plan**          | [`02-smoke-test-plan.md`](02-smoke-test-plan.md)                                                   | Per-feature smoke specs (objective/preconditions/steps/expected/failure/automation) + full test pyramid (unit, integration, e2e, security, load, chaos) + runnable scaffolds.                                     |
| **3 — Saly Analytics Cloud**     | [`../architecture/03-saly-analytics-cloud.md`](../architecture/03-saly-analytics-cloud.md)         | Allium-class data platform: indexers, decoders, event processors, normalization, cross-chain aggregation, warehouse + the 5 products (Explorer, Datashares, Realtime APIs, Datastreams, Intelligence).            |
| **4 — Industry Expansion**       | [`../architecture/04-industry-expansion.md`](../architecture/04-industry-expansion.md)             | 8 vertical modules (Finance, Healthcare, Education, Government, Agriculture, Aviation, Supply Chain, AI Agents) — each with data model, contracts, APIs, dashboards, monetization.                                |
| **5 — Technical Implementation** | [`../architecture/05-technical-implementation.md`](../architecture/05-technical-implementation.md) | System & microservices architecture, DB & event design, k8s/Helm/GitOps, CI/CD, monitoring, security, governance, and a sequenced gap-closing roadmap.                                                            |

## Headline findings

**What's genuinely real (impressive):** a multi-rail intent-based execution network — Base (USDC/ETH + Uniswap V3 DEX), XRPL (native + IOU), Saly L3 (USDC) + settlement monitor, fiat (Paystack/Flutterwave), on-chain escrow, double-entry ledger, KMS-isolated custody, agent registry with spending policies/approvals/reasoning logs, B2B gateway + API keys + signed webhooks + public SDK, and three working dashboards. Contracts (`SalyEscrow`, `$SALY` + staking) have 40 Foundry tests.

**What's aspirational vs shipped (the honest gaps):**

- **No in-repo L3 sequencer / RPC / block explorer / bridge** — L3 is a documented OP-Stack devnet spike + settlement monitor + thin USDC adapter.
- **No native stablecoin** — uses Circle USDC / external L3 USDC / 3rd-party XRPL IOUs; `$SALY` is a utility token.
- **No merchant product, no analytics data platform, no on-chain governance.**
- **Observability not wired** — Prometheus scrapes `/metrics` that no service exposes (404s); no traces.
- **Default-stub posture** (fiat, sanctions, FX/DEX) can mask failures — must fail-closed in prod.
- **Deploy artifacts partial** — 5/19 Dockerfiles, only fiat-listener in k8s, terraform is KMS-only.
- **Test gaps** — 5 services + 5 workers + 3 apps untested; no e2e/load/chaos.

The roadmap in Phase 5 closes these in sequenced, shippable milestones (Operate safely → Analytics Cloud → Harden money/multi-tenancy → Stablecoin + L3 infra → Governance + verticals → Intelligence + scale).

## Delivery plans (per milestone)

- **Milestone A — Operate Safely:** delivered (observability across all 21 processes, transactional outbox, fail-closed config, Dockerfiles/Helm/k8s/ArgoCD, expanded CI).
- **Milestone B — Saly Analytics Cloud:** [`../architecture/06-milestone-b-plan.md`](../architecture/06-milestone-b-plan.md) — phased breakdown (B0–B8) of the five data products.
- **Milestone C — Harden money + multi-tenancy:** [`../architecture/07-milestone-c-plan.md`](../architecture/07-milestone-c-plan.md) — phased breakdown (C1–C4): tenant isolation, real fiat pay-in + reconciliation, merchant product, resilience suites.
- **Milestone D — Stablecoin + L3 production:** [`../architecture/08-milestone-d-plan.md`](../architecture/08-milestone-d-plan.md) — phased breakdown (D1–D6): L3 testnet, bridge, SalySD, stablecoin service, PoR exit.

## Related operational docs

- [Production Go-Live Guide](../runbooks/production-go-live.md)
- [Architecture overview](../ARCHITECTURE.md)
- [ADRs](../adr/)
