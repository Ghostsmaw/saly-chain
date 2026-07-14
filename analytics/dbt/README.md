# Saly Analytics — dbt project

Transforms the realtime canonical tables (populated by `services/analytics-ingest`)
into staging views and curated marts (`rail_economics`, `intent_settlement_lineage`,
… added in Milestone B2).

## Setup

```bash
pip install dbt-clickhouse
cp profiles.example.yml ~/.dbt/profiles.yml   # or: export DBT_PROFILES_DIR=$(pwd)
dbt debug      # verify the ClickHouse connection
dbt deps
dbt build      # run + test models
```

ClickHouse must be running (`pnpm infra:up`) and the schema present — it is created
by the ClickHouse container on first boot and idempotently by `analytics-ingest`.

## Layout

- `models/staging/` — thin, deduplicated (`FINAL`) views over the 6 raw tables (`+materialized: view`).
- `models/marts/` — curated, materialized tables (`+materialized: table`):
  - `intent_settlement_lineage` — intent → screening → rail decision → settlement, end to end (the moat).
  - `rail_economics` — daily per-rail volume, success rate, latency, cost.
  - `agent_activity` — per-agent lifecycle + behavior summary.
  - `token_flows_daily` — daily transfer volume + unique participants per chain+token.
  - `dim_addresses` — observed addresses + activity, labeled from the `address_labels` seed.
- `models/staging/sources.yml` — declares the `salychain_analytics` sources + freshness.
- `models/marts/schema.yml` — model docs + data tests (`not_null`, `unique`, `accepted_values`).
- `seeds/address_labels.csv` — human labels for known addresses.

## Validate without a database

`dbt parse` and `dbt list` resolve the full graph (refs/sources/Jinja) without
connecting. A live `dbt build` requires ClickHouse running and populated by
`services/analytics-ingest`.
