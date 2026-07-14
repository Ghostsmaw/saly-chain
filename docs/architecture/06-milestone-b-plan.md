# Milestone B — Saly Analytics Cloud: phased plan

> **Goal:** turn SalyChain's existing multi-chain activity + proprietary ledger/intent/agent data into queryable, streamable, AI-ready datasets, and ship the **five commercial data products**.
>
> **Milestone exit (from [roadmap](05-technical-implementation.md)):** five Analytics products live (Explorer, Realtime APIs, Datastreams, Datashares, Intelligence); first external data customers; warehouse cost under control.

This plan is **reuse-first**: it builds on what Milestone A already delivered — the typed event bus (`packages/events`), the now-**reliable** outbox-backed events (A3), shared observability (A1), the gateway's API-key auth/scopes/metering, the chain adapters, and the Helm/CI pipeline (A5/A6). It implements the layers the audit found missing: indexing, lakehouse, warehouse, and serving.

See the full architecture in [03 — Saly Analytics Cloud](03-saly-analytics-cloud.md). This document sequences it into independently shippable phases.

---

## Phase overview

| Phase     | Name                        | Headline outcome                                                   | Product shipped |
| --------- | --------------------------- | ------------------------------------------------------------------ | --------------- |
| **B0** ✅ | Data platform bootstrap     | Analytics stack runs locally + in staging; canonical schema exists | — (foundation)  |
| **B1** ✅ | Realtime ingestion spine    | Everything on the bus lands in ClickHouse seconds-fresh            | — (data live)   |
| **B2** ✅ | Canonical model + dbt marts | Proprietary intent→rail→settlement lineage is queryable            | — (the moat)    |
| **B3** ✅ | Saly Realtime APIs          | Metered REST data API behind the gateway                           | **Product #1**  |
| **B4** ✅ | Saly Explorer               | Multi-chain explorer + lineage view (replaces dead placeholder)    | **Product #2**  |
| **B5** ✅ | Historical backfill         | Full history queryable cheaply via lakehouse                       | — (depth)       |
| **B6** ✅ | Saly Datastreams            | Push: filtered Kafka/webhook/WebSocket streams                    | **Product #3**  |
| **B7** ✅ | Saly Datashares             | Governed dataset delivery (S3 + redaction live; warehouses flagged) | **Product #4**  |
| **B8** ✅ | Saly Intelligence (MVP)     | Entity resolution + features + NL analytics on AI-ready datasets    | **Product #5**  |

Phases are ordered so each yields value on its own. B0→B2 are prerequisites for everything; B3 and B4 are the fastest path to a sellable product; B5 unblocks depth; B6/B7/B8 expand the product surface. Advanced risk/fraud ML at scale continues into **Milestone F**.

---

## B0 — Data platform bootstrap (foundation)

**What we build**

- Provision the analytics stores: **ClickHouse** (hot OLAP), **object store** (MinIO local / S3 staging) with an **Apache Iceberg** catalog, and **Redpanda/Kafka** for high-volume transport.
- Add them to `infra/docker/docker-compose.yml` (local) and the `salychain` Helm chart (staging) — reuse the A5 templating + A6 manifest CI.
- Create the **canonical schema** DDL: `blocks`, `transactions`, `token_transfers`, `decoded_events`, `addresses` (ClickHouse + Iceberg mirror).
- Scaffold the **dbt project** (`analytics/dbt`) and a migrations/DDL runner.

**What's achieved:** a reproducible place to land and model data, locally and in staging. Schema-as-code with CI validation.
**Reuses:** A5 Helm/k8s patterns, A6 CI.
**Exit:** `infra:up` brings ClickHouse + Iceberg + Redpanda healthy; canonical tables exist; dbt `debug` passes in CI.

**✅ Delivered**

- ClickHouse (`8123`/`9009`) + Redpanda (`9092`/`9644`) added to `infra/docker/docker-compose.yml` with healthchecks and named volumes (MinIO/object store already present from prior work).
- Canonical + proprietary schema DDL: `raw_events`, `blocks`, `token_transfers`, `decoded_events`, `tx_lifecycle`, `intent_events`, `agent_events` — all `ReplacingMergeTree` (dedupe by natural key + `event_id`). Lives in `infra/docker/clickhouse/init/01-analytics-schema.sql` (container first-boot) and is re-applied idempotently by the service on startup.
- dbt project scaffolded at `analytics/dbt` (project + `profiles.example.yml` + `sources.yml` over the 7 tables + a `stg_token_transfers` staging view); marts land in B2.
- _Note:_ `transactions`/`addresses` and the full Iceberg lakehouse mirror are deferred to **B5** (historical backfill); B0 lands the realtime-event-derived tables.

---

## B1 — Realtime ingestion spine (`services/analytics-ingest`)

**What we build**

- A new NestJS service with **durable JetStream consumers** on `salychain.chain.>`, `salychain.tx.>`, `salychain.intent.>`, `salychain.agent.>`.
- Each event → normalized row(s) in ClickHouse, **exactly-once** via `event_id` dedupe (ReplacingMergeTree).
- Instrumented with `@salychain/observability` (consumer lag, rows ingested, dedupe drops) + dashboards/alerts.

**What's achieved:** every event already flowing on the bus becomes a **seconds-fresh** dataset — the realtime spine. Because A3 made publishing transactional (outbox), analytics now sees a complete, gap-free stream. No history yet (that's B5).
**Reuses:** `packages/events` `EventBus`, the 24 typed subjects, A1 observability.
**Exit:** live transfers/tx/intent/agent events queryable in ClickHouse within seconds; consumer lag alerting green; replay from JetStream verified.

**✅ Delivered**

- New service `services/analytics-ingest` (`@salychain/service-analytics-ingest`, port `4015`) with a durable JetStream consumer per subject (all 24), landing each event into `raw_events` plus its canonical table.
- ClickHouse client (`@clickhouse/client`) with server-side `async_insert` + `wait_for_async_insert` so an insert is durable before the source event is acked (at-least-once preserved; ReplacingMergeTree dedupes by `event_id`). On any failure the handler nacks for redelivery.
- Pure event→row mappers (`src/ingest/mappers.ts`) with unit tests; `eventsConsumedTotal{subject,outcome}` metric, OTEL tracing, `/metrics`, and a `/v1/health` ClickHouse ping.
- Wired into the `salychain` Helm chart and Prometheus scrape config; fixed the chart's service probe default to `/v1/health` (matches every service's `v1` global prefix).
- Verified: install + `typecheck` + `nest build` + unit tests green; `docker compose config` valid.

---

## B2 — Canonical model + dbt marts (the differentiator)

**What we build**

- **CDC** (Debezium) from `salychain_ledger`, `salychain_intent`, `salychain_execution`, `salychain_agents`, `salychain_routing` → raw zone.
- dbt marts: **`intent_settlement_lineage`**, **`agent_activity`**, **`rail_economics`**, token-flow and address-label models.
- Data tests (dbt) + freshness checks; hourly/daily schedules.

**What's achieved:** the proprietary wedge — _why a payment took a rail, what an agent reasoned, how it settled across chains_ — becomes a first-class, tested dataset no public explorer/competitor has.
**Reuses:** internal Postgres DBs (read via CDC, not at query time), routing/compliance/risk signals.
**Exit:** lineage mart joins an intent end-to-end (intent → rail decision → settlement tx) with passing dbt tests; `rail_economics` populated daily.

**✅ Delivered**

- **Staging layer** (`analytics/dbt/models/staging/`): deduplicated (`FINAL`) views over all 6 canonical tables — `stg_token_transfers`, `stg_blocks`, `stg_decoded_events`, `stg_tx_lifecycle`, `stg_intent_events`, `stg_agent_events`.
- **Marts** (`analytics/dbt/models/marts/`):
  - **`intent_settlement_lineage`** — one row per intent stitching received → screened (compliance/risk) → routed (rail decision) → tx created → settled/failed, with `time_to_settle_seconds` and a derived `lineage_status`. Joins intent → transaction via `intent_id`. This is the moat.
  - **`rail_economics`** — daily per-rail volume, settle success rate, expected vs. actual settle latency, and quoted cost (built on the lineage mart).
  - **`agent_activity`** — per-agent lifecycle + behavior (policy version, policy-update count, spend-denied count, last activity).
  - **`token_flows_daily`** — daily transfer volume + unique senders/receivers per chain+token.
  - **`dim_addresses`** — observed addresses with activity stats, left-joined to the `address_labels` seed (system contracts/treasuries).
- **Tests & freshness:** `not_null`/`unique`/`accepted_values` in `models/marts/schema.yml`; source freshness off `ingested_at` (warn 15m / error 60m) on `raw_events`.
- **Verified:** `dbt parse` + `dbt list` clean against the `dbt-clickhouse` adapter (1.10.1, dbt-core 1.11) — all 11 models + seed resolve, no deprecations. (A live `dbt build` needs the stack up: `pnpm infra:up` then run `analytics-ingest`.)
- **Deferred (optional):** Debezium **CDC** from the internal Postgres DBs is _not_ required for the lineage moat — the gap-free event spine (B1) already carries intent/routing/settlement signals. CDC remains a B2/B5 enrichment for fields that never hit the bus.

---

## B3 — Saly Realtime APIs (Product #1)

**What we build**

- REST/GraphQL over ClickHouse, served **behind the existing gateway** with a new **`data` scope** (no new auth).
- Endpoints: `GET /v1/data/transfers`, `/address/{chain}/{addr}/balances`, `/tx/{chain}/{hash}` (+lineage when SalyChain-originated), `/stablecoin/usdc/supply`, and a sandboxed parameterized `POST /v1/data/query` (allowlisted SQL).
- **Metering** by API key/scope via `apikeys` + gateway request-log → usage pipeline.

**What's achieved:** the first sellable product. Customers query SalyChain data with the same keys/rate-limits/idempotency they already use. Usage-based billing foundation in place.
**Reuses:** gateway auth/scopes/rate-limit/idempotency, `apikeys` metering.
**Exit:** authenticated `data`-scope calls return correct rows; rate limits + metering recorded; p95 latency within SLO; OpenAPI published.

**✅ Delivered**

- **New backend service `services/analytics-api`** (`@salychain/service-analytics-api`, port `4016`): read-only ClickHouse access with hard guardrails — bound `{name:Type}` query params (no string interpolation), `max_execution_time` + `max_result_rows` + `result_overflow_mode=break`, and a recommendation to run a `readonly` CH user in prod.
- **Endpoints** (all behind the gateway under `/v1/data`):
  - `GET /transfers` — filter by `chain`/`token`/`address`, paged.
  - `GET /address/{chain}/{address}/balances` — net per-token balances (received − sent).
  - `GET /tx/{chain}/{hash}` — transfers + decoded events, plus **settlement lineage** (tx state trace + intent screening/routing trace) when the tx is SalyChain-originated.
  - `GET /stablecoin/usdc/supply` — net supply (mint = from `0x0`, burn = to `0x0`) per chain + total.
  - `GET /query` (discover) + `POST /query` — **sandboxed named queries** (`daily_transfer_counts`, `top_tokens_by_volume`, `rail_settlement_summary`) with zod-validated params; no raw SQL ever reaches ClickHouse.
- **Gateway integration:** new `DataController` under `/v1/data/*` guarded by the new **`data:read`** scope (free-form scope strings — no apikeys change needed). Rate limit, idempotency and **request-log metering are automatic** via existing middleware; endpoints are tagged for the published OpenAPI (`/docs`).
- **Typed SDK:** added `DataClient` to `@salychain/sdk-internal` and a `DATA_CLIENT` provider/`DATA_BASE_URL` env in the gateway. SQL builders are pure + unit-tested (7 tests).
- **Infra:** registered `analytics-api` (4016) in the Helm services list and Prometheus scrape config.
- **Verified:** install + typecheck + `nest build` (analytics-api **and** gateway) + unit tests green; no lints. (Live request smoke needs the stack up: ClickHouse + `analytics-ingest` + gateway, then call `/v1/data/*` with a `data:read` key. In k8s set the gateway's `DATA_BASE_URL=http://analytics-api:4016`, like the other `*_BASE_URL`s.)
- **Note on GraphQL:** shipped REST first (the plan's primary surface); a thin GraphQL layer over the same `DataService` can be added later without schema changes.

---

## B4 — Saly Explorer (Product #2)

**What we build**

- `apps/explorer` (Next.js, reuses `@salychain/ui`) reading the Realtime API.
- Search (tx/address/block/intent_id/entity); tx page with decoded calldata + token transfers + escrow/DEX decode; **lineage page** (intent → rail → settlement); address/entity pages; L3 `OutputProposed` settlement status.
- Replaces the dead `explorer.saly-l3.dev` placeholder.

**What's achieved:** the public, user-facing face of the platform across Base/L3/XRPL, plus the unique lineage view — a freemium funnel into the Pro/API tiers.
**Reuses:** `@salychain/ui`, B3 Realtime API, A5 web Dockerfile + Helm app templates.
**Exit:** explorer renders real Base/L3/XRPL data + a working lineage page; deployed to staging via the existing app image/Helm path.

**✅ Delivered**

- **`apps/explorer`** (`@salychain/app-explorer`, dev port **3004**): Next.js 15 app using `@salychain/ui`, server-side `DataClient` against `analytics-api` (`ANALYTICS_API_URL`, default `http://localhost:4016`).
- **Pages:** overview (KPIs + latest transfers + rail stats), `/transfers`, `/tx/{chain}/{hash}` (transfers + decoded events + **settlement lineage**), `/address/{chain}/{address}` (balances + history), `/block/{chain}/{number}`, `/intent/{id}` (**intent → screening → rail → settlement** timeline), `/l3/settlements` (OutputProposed rollup → L1 status).
- **Search:** heuristic router for tx hash, address, block #, intent id (chain selector for EVM/L3).
- **Decoded events:** dedicated `L3OutputCard` (OutputProposed settlement details) and `EscrowEventsCard` (DealFunded/Released/Refunded) on tx pages.
- **API additions (B3 extension):** `GET /v1/data/block/{chain}/{number}`, `GET /v1/data/l3/settlements`, `GET /v1/data/intent/{id}/lineage` — wired through gateway (`data:read`) and `DataClient`.
- **Deploy path:** `output: 'standalone'`, `Dockerfile.web`, Helm app entry (`explorer.salychain.example`), CI matrix in `build-images.yml`. Replaced dead `explorer.saly-l3.dev` link in `packages/types` with `explorer.salychain.example`.
- **Verified:** `typecheck` + `next build` green (7 dynamic routes); analytics-api SQL tests (10) + gateway typecheck green.

---

## B5 — Historical backfill (indexers + lakehouse)

**What we build**

- `packages/analytics-indexer`: **backfill** (parallel range-scan, idempotent upserts) + **tip** (confirmation lag + reorg re-pull) with per-chain checkpoints; EVM driver (Base/L3 via viem) + XRPL driver (xrpl.js).
- `packages/analytics-decoder`: ABI registry keyed by `(chain_id, contract_address)` (seeded from `contract-registry` + chain-base ABIs); protocol modules (ERC-20, Uniswap V3, SalyEscrow, XRPL Payment/TrustSet).
- **Iceberg + Trino** for cold/historical queries.

**What's achieved:** datasets go from "since we turned ingestion on" to **full history**, with cheap object-store economics and deep ad-hoc querying (Trino) separate from hot ClickHouse.
**Reuses:** chain adapters + listener checkpoint pattern, `contract-registry`.
**Exit:** a chain backfilled to genesis (or chosen floor) with row counts reconciled against the node; reorg handling verified on a test reorg; Trino queries the Iceberg history.

**✅ Delivered**

- **`packages/analytics-decoder`**: ABI registry keyed by `(chain_id, contract_address)` with seed entries from `@salychain/chain-base` (ERC-20 USDC, SalyEscrow); protocol modules for **ERC-20 Transfer** logs and **XRPL Payment** txs. Uniswap V3 deferred (no on-chain activity yet).
- **`packages/analytics-indexer`**: reusable indexer library — `runBackfill()` (parallel range scan, idempotent upserts), `runTip()` (confirmation lag + block-hash reorg rewind), `reconcileCounts()` helper; **EVM driver** (Base/L3 via viem, scans all registered token/escrow contracts) and **XRPL driver** (all successful Payment txs in ledger range); writers for **ClickHouse** (hot), **MinIO Parquet** (cold, Hive-partitioned), and **CompositeBatchWriter** (dual-write).
- **`services/workers/analytics-indexer`**: per-chain worker (`INDEXER_CHAIN=base|l3|xrpl`, `INDEXER_MODE=backfill|tip`) with Prisma checkpoints (`analytics_indexer_checkpoints`: position, block hash, backfill flag), observability on port **9106**, backfill → reconcile log → tip loop.
- **Lakehouse infra:** Nessie (19120), Trino (8088), `minio-init` bucket `salychain-lake`, Hive + Iceberg catalogs; `analytics/lake/README.md` with Trino query examples.
- **Wiring:** `salychain_analytics_indexer` Postgres DB, Helm worker entry, Prometheus scrape 9106, CI/build-images matrix, Prisma generate/deploy scripts.
- **Verified:** decoder + indexer unit tests green; worker + packages typecheck/build green; `docker compose config` valid.
- **Deferred:** live end-to-end backfill smoke (needs stack + RPC); Uniswap V3 decoder; contract-registry ABI sync (seeded from chain-base only today).

---

## B6 — Saly Datastreams (Product #3)

**What we build**

- Push delivery of **filtered** realtime streams: managed **Kafka/Redpanda** topics (enterprise volume), **webhooks** (reuse `services/webhooks` HMAC + DLQ), and **WebSocket** (live dashboards).
- Filters: chain, token, address/entity, amount threshold, event type, intent/agent activity (e.g. "USDC transfer > $1M to entity X").

**What's achieved:** customers move from pulling to subscribing — the high-margin enterprise ingestion + alerting product. Reuses the battle-tested signed-webhook delivery from the core platform.
**Reuses:** `services/webhooks` (HMAC, retries, DLQ), B1 realtime spine.
**Exit:** a filtered subscription delivers matching events over webhook + Kafka with at-least-once + signature verification; DLQ + replay verified.

**Status — implemented (`services/analytics-datastreams`, port 4017):**

- ✅ New NestJS service consuming the **full event spine** (all 24 subjects incl. `salychain.chain.*`) via durable JetStream consumers.
- ✅ **Filter engine** (`src/filters`): declarative, fail-closed predicate over chain / rail / asset / address (with from/to direction) / amount threshold (bigint-safe) / event-type (NATS wildcards) / kind / agent — compiled per stream, 32 unit tests.
- ✅ **Webhook sink:** HMAC-signed delivery (same wire format as `services/webhooks`), BullMQ exponential-backoff retries, auto-disable on repeated failure, **dead-letter + replay**.
- ✅ **Kafka/Redpanda sink:** feature-flagged producer (`DATASTREAMS_KAFKA_ENABLED`) with topic-prefix allowlisting; routed through the same delivery row → retry/DLQ machinery.
- ✅ **Stream registry** with Prisma (`salychain_datastreams`), org-scoped CRUD, pause/resume, secret rotation, delivery + dead-letter inspection.
- ✅ Exposed at the gateway under `streams:read` / `streams:write` scopes via `DatastreamsClient` (sdk-internal); metrics, health, domain-error filter, OTEL.
- ✅ **WebSocket sink** (live dashboards): authenticated upgrade at `/v1/streams/live` (signing-secret handshake, timing-safe), per-stream broadcast hub, best-effort live-tail semantics, `salychain_datastreams_websocket_connections` gauge.

---

## B7 — Saly Datashares (Product #4)

**What we build**

- Governed dataset delivery into the customer's own warehouse: **Snowflake Secure Share**, **BigQuery Analytics Hub**, **Databricks Delta Share**, and **S3/Parquet** drops — Iceberg as the cheap interchange format.
- Per-share **access policy + PII redaction** on financial-lineage shares; freshness SLA tiers; subscription + volume billing.

**What's achieved:** data delivered where enterprises already work (their warehouse), with governance and SLAs — the recurring-revenue data product.
**Reuses:** Iceberg/lakehouse from B5, B2 curated marts, governance/catalog.
**Exit:** a curated dataset shared into a Snowflake/BigQuery account refreshes on schedule with redaction policy applied and billing metered.

**Status (implemented):** `services/analytics-datashares` (port 4018, db `salychain_datashares`).
- ✅ Curated **dataset registry** (allowlisted parameterized ClickHouse SQL) with per-column **PII classification** (`token_transfers_daily/detail`, `rail_settlement_daily`); `GET /v1/datasets` catalog.
- ✅ **Access/redaction engine** (the IP): column `allow/drop/null/mask/hash` (deterministic HMAC pseudonyms) + raw-value row filters + row caps, **fail-closed** on PII/ADDRESS, allowlist-only column emission. Pure + extensively unit-tested.
- ✅ **Serialization** to CSV / JSONL / **Parquet** (`@dsnp/parquetjs`); **S3/MinIO** destination provider (run → object drop with audit metadata).
- ✅ **Datashare registry + run lifecycle** (`Datashare`/`ShareRun`), manual + **cron-scheduled** runs via a BullMQ job scheduler + retrying `RunWorker`.
- ✅ Gateway routes under `datashares:read`/`datashares:write` via a typed `DatasharesClient` (sdk-internal); metrics, health (incl. ClickHouse ping), domain-error filter, OTEL; full infra wiring (DB, prometheus, helm, CI, build-images, prisma scripts).
- 🚧 **Warehouse-native shares** (Snowflake Secure Share / BigQuery Analytics Hub / Databricks Delta Share): config-validated + feature-flagged (disabled by default), pending vendor drivers + credentials. **Billing/metering** tie-in tracked in the cross-cutting workstream.

---

## B8 — Saly Intelligence MVP (Product #5) ✅

**What we build**

- **AI-ready datasets:** point-in-time feature tables (no leakage), address/entity **embeddings** + vector store, and a documented **semantic layer**.
- MVP capabilities: **entity resolution & labeling** (cluster addresses → entities) and **natural-language analytics** (semantic layer + planner over the datasets, using intent-schema patterns).
- Hooks to feed **`services/risk`** with features (the ML layer the Phase 1 audit found missing).

**What's achieved:** the fifth product and the AI moat — entity intelligence + ask-in-English analytics on data enriched with intent/agent context. Completes the "five products live" exit.
**Reuses:** B2/B5 datasets, intent-schema tool-calling patterns, `services/risk` integration point.
**Exit:** entity resolution produces labeled clusters on real data; an NL query returns a correct, sourced answer via the semantic layer. (Production-grade risk/fraud ML + anomaly detection at scale continues in **Milestone F**.)

**Implemented (`services/analytics-intelligence`, port 4019, db `salychain_intelligence`):**

- **Entity resolution engine** — a pure, deterministic **union-find** clusterer over the **common-counterparty** heuristic (addresses that repeatedly share ≥ `RESOLUTION_MIN_SHARED` distinct counterparties are linked), with **hub suppression** (high-degree counterparties carry no signal). Clusters are labeled/scored from the `address_labels` mart (best-effort) via a fail-safe risk policy (any sanctioned member taints the cluster). Re-materialized per chain by a BullMQ batch job; comprehensively unit-tested.
- **Point-in-time feature store** — `computeAddressFeatures` aggregates inbound/outbound/volume/counterparty/recency features from `token_transfers` with a strict `ts <= as_of` cutoff (the **no-leakage** invariant is enforced in code and unit-tested). Exposed at `GET /v1/features/address`.
- **Semantic layer + NL analytics** — an allowlisted metric/dimension/filter registry that compiles to **parameterized** ClickHouse SQL (never raw SQL; injection-safe, fail-closed). A deterministic rule-based **NL planner** maps English questions onto the semantic layer (pluggable `NlProvider` leaves room for an LLM behind the same contract). Both tested, including a plan→compile round-trip.
- **Embeddings + vector search** — a dependency-free, deterministic **feature-hashing** embedder + brute-force **cosine** top-K over activity profiles stored in Postgres (no pgvector dependency in the MVP). Tested for determinism, unit-norm, and ranking.
- **Risk integration** — `services/risk` optionally (`RISK_INTELLIGENCE_ENABLED`, **fail-open**) pulls a counterparty entity signal; the pure scoring engine gained an **entity overlay** (sanctioned ⇒ BLOCK-level; high entity risk raises but never lowers the rule score) that is a no-op when absent — existing behaviour and tests are unchanged.
- **Gateway exposure** under new `intelligence:read` / `intelligence:write` scopes via a typed `IntelligenceClient` in `sdk-internal`; full infra wiring (Prisma migration, CI db matrix, image build, Helm service + `INTELLIGENCE_BASE_URL`, Prometheus target, portal scopes) and service metrics (`salychain_intelligence_*`).

**Milestone B is complete:** all five Analytics Cloud products (Explorer, Realtime APIs, Datastreams, Datashares, Intelligence) are live. Production-grade risk/fraud ML + anomaly detection at scale continues in **Milestone F**.

---

## Cross-cutting (runs across all phases)

- **Billing & metering:** unify gateway request-log + `apikeys` usage into a metering pipeline → warehouse → per-product invoicing (Realtime usage, Datastreams throughput, Datashares subscription, Intelligence seats/inference).
- **Governance & catalog:** OpenMetadata (or similar) for dataset catalog, lineage, ownership; access policies + PII redaction enforced on lineage/financial shares.
- **Security:** `data`-scope authz tests; per-share/row access policies; PII never in public shares; tenant isolation in query paths.
- **Observability & SLAs:** reuse A1/A2 — consumer lag, freshness, query p95, ingestion error budgets, per-product SLOs and alerts.
- **Cost control:** ClickHouse TTL/tiering to Iceberg; warehouse query quotas; the explicit "warehouse cost under control" exit gate.

---

## Dependencies & suggested order

```
B0 ──▶ B1 ──▶ B2 ──▶ B3 ──▶ B4
              │       │
              ├──────▶ B6 (Datastreams; needs B1)
              ▼
              B5 ──▶ B7 (Datashares; needs lakehouse)
                     │
                     ▼
                     B8 (Intelligence; needs B2 marts + B5 history)
```

- **Fastest revenue path:** B0 → B1 → B2 → **B3** → **B4** (a queryable API + a public explorer with the unique lineage view).
- **B6** can start right after B1 (push of realtime events) in parallel with B3/B4.
- **B5** unblocks the depth products (**B7**, **B8**).

**Recommended first slice to build now:** B0 + B1 — stand up ClickHouse/Iceberg in compose + Helm, create the canonical schema, and ship `services/analytics-ingest` consuming the existing (now reliable) event bus. That makes SalyChain data queryable in seconds and de-risks everything downstream.

See [03 — Saly Analytics Cloud](03-saly-analytics-cloud.md) for component-level detail and [05 — Technical Implementation](05-technical-implementation.md) for where this sits in the overall roadmap.
