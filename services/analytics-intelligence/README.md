# Saly Intelligence (B8)

The AI layer of the Saly Analytics Cloud (Product #5). It turns the analytics
datasets into **AI-ready intelligence**:

- **Entity resolution** — clusters addresses that are likely controlled by the
  same actor, labels/scores the clusters, and exposes them for lookup.
- **Point-in-time feature store** — leakage-free address feature vectors used by
  `services/risk` and downstream ML.
- **Embeddings + vector search** — activity-profile embeddings with cosine
  nearest-neighbour search.
- **Semantic layer + natural-language analytics** — ask questions in English;
  they compile to safe, parameterized ClickHouse queries over an allowlisted
  metric/dimension registry.

- **Port:** `4019`
- **Database:** `salychain_intelligence` (Postgres — derived intelligence)
- **Source data:** `salychain_analytics` (ClickHouse — read-only)
- **Jobs:** Redis/BullMQ (`intelligence-jobs`)

> Production-grade risk/fraud ML and anomaly detection at scale continue in
> **Milestone F**. This service is the MVP that establishes the seams.

---

## Entity resolution

Account-based chains don't have UTXO co-spend signals, so the MVP uses the
**common-counterparty** heuristic: two addresses are linked once they share at
least `RESOLUTION_MIN_SHARED` (default 2) **distinct** counterparties. Connected
components (via union-find) become entities.

Two safety valves prevent the graph from collapsing into one blob:

- **Hub suppression** — counterparties used by more than
  `maxCounterpartyDegree` (default 50) addresses (exchange hot wallets, routers)
  carry no signal of common control and are ignored for linking.
- Links require co-occurrence across **multiple different** counterparties, so a
  single shared hub never links anyone.

Clusters are labeled/scored from the `address_labels` mart (best-effort — runs
fine without it). The risk policy is **fail-safe**: a single sanctioned member
taints the whole cluster (`sanctioned = true`, `risk_score = 100`).

Resolution is a full re-materialization per chain, run inline or enqueued:

```http
POST /v1/entities/resolve        { "chain": "base", "async": true }
GET  /v1/entities?chain=base&sanctioned=true&limit=50
GET  /v1/entities/by-address?chain=base&address=0x…
GET  /v1/entities/:id
GET  /v1/entities/runs
```

The engine is pure and deterministic (`src/entities/resolution.ts`,
`labeling.ts`) and exhaustively unit-tested.

## Point-in-time feature store

`GET /v1/features/address?chain=&address=&as_of=` returns a feature vector
(inbound/outbound counts, volumes, distinct counterparties/tokens, recency,
age, etc.) plus the resolved entity and a single `entity_risk_score`.

The **no-leakage** invariant — only transfers with `ts <= as_of` contribute — is
enforced in `computeAddressFeatures` (`src/features/features.ts`), not left to
SQL, and is unit-tested. This is the contract `services/risk` consumes.

## Embeddings + vector search

A dependency-free, deterministic **feature-hashing** embedder encodes an
address's activity profile into a unit vector; search is brute-force **cosine**
top-K. Embeddings live in Postgres (`address_embeddings`) — no pgvector
dependency in the MVP. A learned embedding provider can be swapped in behind the
same `embedText` contract.

```http
POST /v1/embeddings/upsert        { "chain": "base", "address": "0x…" }
POST /v1/embeddings/materialize   { "chain": "base" }        # enqueue batch
GET  /v1/embeddings/search?chain=base&address=0x…&k=10
GET  /v1/embeddings/search?chain=base&q=exchange%20hot%20wallet&k=10
```

## Semantic layer + NL analytics

The semantic layer (`src/semantic/semantic.ts`) is a registry of allowlisted
**metrics** (`transfer_count`, `transfer_volume`, `routed_intents`),
**dimensions** (`chain`, `token`, `rail`, `day`) and **filters**. Queries compile
to **parameterized** ClickHouse SQL — values are always bound as `{name:Type}`
params, never interpolated, and unknown metric/dimension/filter is rejected
(fail-closed).

The NL planner (`src/semantic/nl-planner.ts`) maps an English question onto a
`SemanticQuery`. It is deterministic and rule-based by default; the pluggable
`NlProvider` contract leaves room for an LLM planner later — but even an LLM
would be constrained to emit a `SemanticQuery`, which the semantic layer then
validates and compiles. An LLM can never reach raw SQL.

```http
POST /v1/nl/query        { "question": "transfer volume by chain in the last 7 days" }
GET  /v1/semantic/metrics
```

## Risk integration

When `RISK_INTELLIGENCE_ENABLED=true`, `services/risk` parses the counterparty
ref for a trailing `<chain>:<address>` and pulls the entity signal via
`GET /v1/features/address`. The lookup is **fail-open**: any error or timeout is
ignored and scoring falls back to the rule-only engine. The scoring engine's
**entity overlay** forces a BLOCK-level score for sanctioned counterparties and
raises (never lowers) the rule score toward a high entity risk.

## Local development

```bash
# from the monorepo root
pnpm --filter @salychain/service-analytics-intelligence prisma:generate
pnpm --filter @salychain/service-analytics-intelligence prisma:deploy   # needs DATABASE_URL
pnpm --filter @salychain/service-analytics-intelligence dev

pnpm --filter @salychain/service-analytics-intelligence test            # pure-core unit tests
```

See `.env.example` for configuration. The pure cores (resolution, features,
semantic layer, embeddings) are tested without any external services.

## Observability

- `GET /v1/health` — Postgres + ClickHouse checks.
- Prometheus metrics: `salychain_intelligence_resolution_runs_total`,
  `salychain_intelligence_entities_total`,
  `salychain_intelligence_nl_queries_total`,
  `salychain_intelligence_feature_lookups_total`, plus the shared HTTP RED
  metrics.
