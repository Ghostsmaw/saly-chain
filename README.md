# SalyChain

> **The intelligent financial execution layer for the AI economy.**
> Users (and AI agents) express financial intent. SalyChain decides how to execute it — across blockchains, fiat rails, and internal ledgers — invisibly.

[![status](https://img.shields.io/badge/status-S4%20ai%20native-blueviolet)]()
[![license](https://img.shields.io/badge/license-UNLICENSED-lightgrey)]()
[![node](https://img.shields.io/badge/node-%3E%3D20.11-success)]()

---

## 1. What this is

SalyChain is **not** another L1, another DeFi protocol, or another wallet app. It is an **intent-based financial execution network** designed to operate at the level of Stripe, Circle, and Coinbase combined.

A user says:

> "Send ₦50,000 to John in Ghana."

SalyChain:

1. Receives the intent (from Saly AI, an API call, or an AI agent).
2. Screens it through compliance + risk.
3. Routes it across the best rail (Base USDC, XRPL, fiat, internal ledger).
4. Executes the transfer.
5. Settles, reconciles, and confirms — recording everything in a double-entry ledger.

The user never sees a chain, a gas fee, a bridge, or a liquidity venue.

Architecture details live in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Key decisions are captured as ADRs in [`docs/adr/`](docs/adr/).

## 2. Repository shape

```
SalyChain/
├── apps/
│   ├── admin/                       # Super Admin Dashboard (Next.js 15, internal — every org, every transaction)
│   ├── business/                    # Business Dashboard (Next.js 15, treasury, payouts, team)
│   └── portal/                      # Developer Portal (Next.js 15, partner — keys, webhooks, logs, docs)
├── services/
│   ├── gateway/                     # Public B2B API termination (auth, scopes, rate limit, idempotency, request log)
│   ├── apikeys/                     # Organizations, members, API keys (sk_test_… / sk_live_…), scopes, rotation
│   ├── webhooks/                    # Subscription registry + HMAC-signed delivery worker + retry/DLQ + replay
│   ├── agents/                      # AI agent registry, spending policies, reasoning logs, wallet provisioning
│   ├── identity/                    # Consumer users, JWT auth, agent delegations (Saly AI surface)
│   ├── ledger/                      # Double-entry accounting (Postgres triggers enforce balance)
│   ├── wallet/                      # Custodial wallet metadata + transfer queue (BullMQ) — Base + XRPL
│   ├── signer/                      # Isolated KMS-backed signing (local AES-GCM for dev, AWS KMS for prod) — EVM + XRPL
│   ├── execution/                   # Transaction orchestrator + state machine + intent pipeline
│   ├── intent/                      # Canonical intent ingestion (validates @salychain/intent-schema)
│   ├── compliance/                  # Sanctions screening, KYC tier engine, case management
│   ├── risk/                        # Velocity / behavioral / counterparty scoring
│   ├── liquidity/                   # FX rate providers + signed quotes with TTL
│   ├── routing/                     # Rail evaluator engine → which rail per intent
│   └── workers/
│       ├── chain-listener-base/     # Polls Base, decodes Transfer logs, emits settlement events
│       ├── chain-listener-xrpl/     # Polls validated XRPL ledgers, decodes Payments, emits settlement events
│       └── l3-rollup-monitor/       # Observes L2OutputOracle posts on Base (Saly L3 settlement)
├── packages/
│   ├── money/                       # BIGINT-safe monetary primitives
│   ├── types/                       # Branded IDs + domain enums
│   ├── errors/                      # Typed domain errors with stable codes
│   ├── logger/                      # Pino + OTEL bridge
│   ├── config/                      # Zod-validated env loader
│   ├── intent-schema/               # Zod intent schema (shared with Saly AI)
│   ├── events/                      # NATS JetStream bus + typed event schemas
│   ├── sdk-internal/                # Typed inter-service RPC clients (private; used by all NestJS services)
│   ├── sdk/                         # Public @salychain/sdk for partners (intents / transactions / webhooks)
│   ├── chain-base/                  # Base / EVM chain adapter (viem)
│   ├── chain-l3/                    # Saly L3 (OP-Stack) network registry + settlement monitor (S5)
│   ├── chain-xrpl/                  # XRPL chain adapter (xrpl.js) — native XRP + IOU (TrustSet + issued Payment)
│   ├── chain-fiat/                  # Fiat rail adapter contract + in-memory stub (PSP integrations land per-region)
│   └── ui/                          # Design system: tokens + components + Tailwind preset
├── contracts/
│   ├── escrow/                      # SalyEscrow.sol (Foundry) — conditional ERC-20 escrow with deadline-refund
│   └── l3-usdc/                     # SalyTestUSDC.sol (Foundry) — 6-decimal devnet USDC for the L3 money rail
├── infra/
│   └── docker/                      # Local infra: Postgres, Redis, NATS, OTEL, Prometheus, Grafana, Loki, MinIO
└── docs/                            # Architecture, ADRs, runbooks
```

## 3. Roadmap

Sliced into vertical milestones, each individually shippable:

| Slice                  | Status         | Outcome                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **S0 — Foundation**    | ✅             | Monorepo, infra compose, shared packages, design system, dashboard shell, ledger + wallet skeletons                                                                                                                                                                                                                                                                                                             |
| **S1 — Money core**    | ✅             | KMS-backed signer, Base adapter (USDC), execution state machine, chain listener, admin live data, internal transfer + Base USDC transfer end-to-end                                                                                                                                                                                                                                                             |
| **S2 — Multi-rail**    | ✅             | XRPL adapter (xrpl.js), routing engine (rail-evaluator), liquidity v1 (signed quotes + TTL), compliance + risk skeletons, intent service, full intent pipeline (`screen→route→quote→reserve→execute→settle`), live admin views                                                                                                                                                                                  |
| **S3 — B2B surface**   | ✅             | Public API gateway (auth/scopes/rate limit/idempotency), `services/apikeys` (orgs + scoped keys + rotation), `services/webhooks` (HMAC-signed delivery with retry/DLQ/replay), `@salychain/sdk` public TypeScript SDK, `apps/portal` developer portal, `contracts/escrow` SalyEscrow.sol with Foundry tests, XRPL IOU support (TrustSet + issued Payment), fiat rail adapter contract + stub wired into routing |
| **S4 — AI native**     | ✅             | `services/agents` (registry, spending policies, reasoning logs, wallet sync), `services/identity` (users, JWT, delegations), wallet→signer policy enforcement, `INVOICE` intent execution, gateway dual auth (API key + JWT), `@salychain/sdk` agents resource, admin AI Insights                                                                                                                               |
| **S5 — L3**            | ⏳ in progress | Reproducible in-repo OP-Stack devnet (op-geth/op-node/op-batcher/op-proposer, one-command `pnpm l3:up`) + settlement monitor — [runbook](docs/runbooks/s5-l3-devnet-rollup.md)                                                                                                                                                                                                                                  |
| **S6 — L3 money rail** | ⏳ in progress | Custodial USDC on L3 — wallets, execution, listener (fail-closed chain-id guard), routing, `SalyTestUSDC` devnet token — [runbook](docs/runbooks/s6-l3-money-rail.md)                                                                                                                                                                                                                                           |
| **S9 — Token**         | ✅             | `contracts/token` — `$SALY` ERC-20 (capped, permit, burnable) with a **one-way launch switch**, Synthetix-style `SalyStaking`, Foundry tests (30/30) — [runbook](docs/runbooks/s9-token-launch.md) · [ADR-0018](docs/adr/0018-saly-token-and-launch-switch.md)                                                                                                                                                  |

## 4. Quickstart

### Prerequisites

- Node.js ≥ 20.11 (`.nvmrc` is provided)
- pnpm ≥ 9
- Docker (for local infra)

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Start local infra (Postgres / Redis / NATS / OTEL stack)
pnpm infra:up

# 3. Generate Prisma clients and apply committed migrations
pnpm db:generate
pnpm db:migrate

# Dev-only: create new migrations after schema changes (interactive)
# pnpm --filter @salychain/service-compliance prisma:migrate

# 4. Run everything in dev mode
pnpm dev
```

**Going to production?** See the [Production Go-Live Guide](docs/runbooks/production-go-live.md) — a phased, end-to-end setup checklist (databases, secrets, KMS custody, contracts, chain rails, deploy, observability, canary).

**Architecture review & roadmap:** See the [SalyChain Architecture Review](docs/audit/README.md) — a five-phase, code-grounded audit covering the full feature matrix, smoke-test strategy, the Saly Analytics Cloud data platform, industry-vertical expansion, and the technical implementation roadmap.

Runbooks:

- [S1 — Base Sepolia USDC payout](docs/runbooks/s1-base-testnet-payout.md)
- [S2 — XRPL testnet payment + full intent pipeline](docs/runbooks/s2-xrpl-testnet-payment.md)
- [S3 — Partner onboarding (org → key → webhook → settled payment)](docs/runbooks/s3-partner-onboarding.md)
- [S4 — Agent autonomously settles an invoice](docs/runbooks/s4-agent-invoice-settlement.md)
- [S4+ — High-value agent spend approval](docs/runbooks/s4-agent-high-value-spend-approval.md)
- [S4 — On-chain DEX swap (Base Sepolia)](docs/runbooks/s4-dex-swap-base-sepolia.md)
- [S5 — Fiat bank payout (NGN / Paystack)](docs/runbooks/s5-fiat-payout-ngn.md)
- [S5 — Treasury FX swap (ledger SWAP)](docs/runbooks/s5-treasury-fx-swap.md)
- [S3 — On-chain escrow fundDeal](docs/runbooks/s3-escrow-fund-deal.md)
- [S5 — Escrow release/refund + audit](docs/runbooks/s5-escrow-release-refund.md)
- [S6 — L3 money rail (USDC payouts)](docs/runbooks/s6-l3-money-rail.md)
- [S5 — L3 OP-Stack devnet rollup (Base Sepolia)](docs/runbooks/s5-l3-devnet-rollup.md)

Services and apps:

| Surface                 | URL                                               |
| ----------------------- | ------------------------------------------------- |
| Public API Gateway      | http://localhost:4000/docs                        |
| Super Admin Dashboard   | http://localhost:3001                             |
| Business Dashboard      | http://localhost:3002                             |
| Developer Portal        | http://localhost:3003                             |
| Agents Service docs     | http://localhost:4011/docs                        |
| Identity Service docs   | http://localhost:4012/docs                        |
| API Keys Service docs   | http://localhost:4009/docs                        |
| Webhooks Service docs   | http://localhost:4010/docs                        |
| Ledger Service docs     | http://localhost:4001/docs                        |
| Wallet Service docs     | http://localhost:4002/docs                        |
| Execution Service docs  | http://localhost:4003/docs                        |
| Compliance Service docs | http://localhost:4004/docs                        |
| Risk Service docs       | http://localhost:4005/docs                        |
| Liquidity Service docs  | http://localhost:4006/docs                        |
| Routing Service docs    | http://localhost:4007/docs                        |
| Intent Service docs     | http://localhost:4008/docs                        |
| Signer Service docs     | http://localhost:4099/docs                        |
| Grafana                 | http://localhost:3000 (admin/admin)               |
| Prometheus              | http://localhost:9090                             |
| MinIO console           | http://localhost:9001 (salychain / salychain-dev) |
| MailHog (dev SMTP)      | http://localhost:8025                             |
| NATS monitoring         | http://localhost:8222                             |

## 5. Engineering principles

These are non-negotiable — they're why we won't ship a "demo" pretending to be a payment system.

| #   | Principle                                                                                                                                      |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Money is always integer minor units.** No floats, no decimals at the boundary. See [ADR-0004](docs/adr/0004-money-as-bigint-minor-units.md). |
| 2   | **Idempotency everywhere.** Every mutating endpoint requires a caller-supplied key.                                                            |
| 3   | **Custody isolation.** Private keys live behind a network boundary in the signer service. See [ADR-0005](docs/adr/0005-custody-isolation.md).  |
| 4   | **Append-only ledger.** Reversals are new entries; postings are immutable.                                                                     |
| 5   | **Double-entry, always.** Defended in code, then again at the DB by a CONSTRAINT TRIGGER.                                                      |
| 6   | **Tracing is mandatory.** Every request carries `trace_id` and `correlation_id` end-to-end.                                                    |
| 7   | **No mocks in production paths.** Adapters either fully implement an interface or fail loudly.                                                 |
| 8   | **Typed errors.** Stable, namespaced error codes — never `throw new Error()` from a domain service.                                            |

## 6. Contributing inside this repo

- **Branches:** trunk-based — short-lived branches off `main`, squash-merge.
- **Conventional commits.** (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`).
- **PRs require:** passing `pnpm typecheck`, `pnpm lint`, `pnpm test`; an updated ADR if the change touches a shared boundary.
- **Adding a service?** Copy the structure of `services/ledger`. Each service owns its own database, no cross-service joins.
- **Adding a shared type?** It goes in `packages/types` (compile-time) or `packages/intent-schema` (runtime contract with Saly AI).

## 7. Where to read next

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — full system architecture, diagrams, service catalog, deployment topology
- [`docs/adr/`](docs/adr/) — Architecture Decision Records
- [`docs/runbooks/s1-base-testnet-payout.md`](docs/runbooks/s1-base-testnet-payout.md) — end-to-end Base Sepolia payout walkthrough
- [`docs/runbooks/s2-xrpl-testnet-payment.md`](docs/runbooks/s2-xrpl-testnet-payment.md) — XRPL testnet payment + full intent pipeline
- [`docs/runbooks/s4-agent-invoice-settlement.md`](docs/runbooks/s4-agent-invoice-settlement.md) — agent + policy + INVOICE intent → settled
- [`services/agents/README.md`](services/agents/README.md) — agent registry and spending controls
- [`services/identity/README.md`](services/identity/README.md) — consumer JWT + delegations
- [`services/ledger/README.md`](services/ledger/README.md) — the heart of the system
- [`services/signer/README.md`](services/signer/README.md) — custody / KMS architecture (the highest-stakes service)
- [`services/execution/README.md`](services/execution/README.md) — transaction state machine and event model
- [`services/gateway/README.md`](services/gateway/README.md) — public B2B surface, auth, scopes, idempotency
- [`services/apikeys/README.md`](services/apikeys/README.md) — orgs, members, key issuance / rotation / verify
- [`services/webhooks/README.md`](services/webhooks/README.md) — subscriptions, signed delivery, retry / DLQ / replay
- [`services/analytics-datastreams/README.md`](services/analytics-datastreams/README.md) — Saly Datastreams (B6): filtered realtime push to webhook + Kafka + WebSocket sinks
- [`services/analytics-datashares/README.md`](services/analytics-datashares/README.md) — Saly Datashares (B7): governed, scheduled dataset delivery with PII redaction
- [`services/analytics-intelligence/README.md`](services/analytics-intelligence/README.md) — Saly Intelligence (B8): entity resolution, point-in-time features, embeddings + NL analytics
- [`services/merchant/README.md`](services/merchant/README.md) — Merchant product (C3): payment links, hosted checkout, settlement reports
- [`packages/sdk/README.md`](packages/sdk/README.md) — public `@salychain/sdk` reference
- [`apps/admin/README.md`](apps/admin/README.md) — Super Admin Dashboard
- [`apps/business/README.md`](apps/business/README.md) — Business Dashboard
- [`apps/portal/README.md`](apps/portal/README.md) — Developer Portal
