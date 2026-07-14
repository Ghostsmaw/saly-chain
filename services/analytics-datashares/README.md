# Saly Datashares (B7)

> Analytics Cloud **Product #4** — governed, scheduled delivery of _curated_
> datasets, with built-in PII redaction, into destinations the customer controls.

Where **Datastreams** (B6) pushes individual events in real time, **Datashares**
delivers periodic, governed _extracts_ of curated datasets. A datashare binds:

1. a **curated dataset** (allowlisted SQL over the ClickHouse analytics store);
2. a set of validated **parameters** (e.g. chain, lookback window);
3. an **access/redaction policy** (per-column mask/drop/hash + row filters);
4. a **destination** (object store today; warehouse-native shares when enabled);
5. an output **format** (CSV / JSONL / Parquet);
6. an optional **cron schedule**.

Each materialization is a `ShareRun`: `query → policy → serialize → export`,
recorded with row/byte counts, the resulting object location, and timing/errors.

```
ClickHouse (curated dataset)
   → access/redaction policy  (mask / drop / hash columns, row filters; fail-closed)
   → serialize                (CSV | JSONL | Parquet)
   → destination provider     (S3/MinIO now; Snowflake/BigQuery/Databricks flagged)
   → ShareRun (audit: rows, bytes, location, duration)
```

## Curated datasets (the governance contract)

Customers never send SQL. They pick a dataset id and supply validated params;
the service binds them as ClickHouse query params. Each dataset declares its
columns **and their PII classification**, which drives redaction defaults:

| Dataset                  | Description                                                | Sensitive columns                      |
| ------------------------ | ---------------------------------------------------------- | -------------------------------------- |
| `token_transfers_daily`  | Daily transfer count + volume per chain/token (aggregated) | none                                   |
| `token_transfers_detail` | Row-level transfers incl. counterparties                   | `from_address`, `to_address` (ADDRESS) |
| `rail_settlement_daily`  | Routed-intent counts per rail per day (aggregated)         | none                                   |

`GET /v1/datasets` returns the catalog with column schemas.

## Access / redaction policy (fail-closed)

The policy decides how each declared column is emitted and which rows survive.
**Only declared columns are ever emitted** (allowlist), and any `PII`/`ADDRESS`
column is redacted unless explicitly allowed.

Per-column actions: `allow`, `drop`, `null`, `mask` (keep last N), `hash`
(deterministic HMAC-SHA256 pseudonym — joinable but unlinkable without the
secret). Class defaults: `PII → drop`, `ADDRESS → hash`, `NONE → allow`.

```jsonc
{
  "defaults": { "address": "hash" },
  "columns": {
    "to_address": { "action": "mask", "keepLast": 6 },
    "tx_hash": { "action": "allow" },
  },
  "rowFilters": [{ "column": "chain_id", "op": "in", "value": ["base", "xrpl"] }],
  "maxRows": 500000,
}
```

Row filters are evaluated against the **raw** values (so you can filter on a
column you then drop) before any masking/hashing. The engine is pure and is the
most heavily tested part of the service (`src/policy/policy.spec.ts`).

## Destinations

- **S3 / MinIO** (implemented): writes to
  `{prefix}/org={org}/share={share}/run={run}/data.{ext}` and records the
  `s3://…` location on the run.
- **Snowflake / BigQuery / Databricks** (config-validated, disabled by default):
  their config shape is validated at create-time, but delivery requires vendor
  drivers + credentials that are **not bundled** in this build. Until the
  corresponding `DATASHARES_<VENDOR>_ENABLED` flag is set (and a driver wired),
  shares targeting them are rejected at create-time. This mirrors the deliberate
  feature-flag approach used for the Datastreams Kafka sink.

## Scheduling

Datashares with a cron `schedule` register a BullMQ **job scheduler** keyed by
the share id (created/removed as the share is activated/paused/deleted). The
`RunWorker` consumes both scheduled and manual (`POST /datashares/:id/run`) jobs,
with exponential-backoff retries; every attempt is reflected in a `ShareRun`.

## HTTP API (internal; fronted by the gateway under `datashares:*` scopes)

| Method   | Path                        | Description                             |
| -------- | --------------------------- | --------------------------------------- |
| `GET`    | `/v1/datasets`              | Curated dataset catalog + column schema |
| `POST`   | `/v1/datashares`            | Create a datashare                      |
| `GET`    | `/v1/datashares?org_id=`    | List an org's datashares                |
| `GET`    | `/v1/datashares/:id`        | Get one                                 |
| `POST`   | `/v1/datashares/:id/status` | Pause / resume                          |
| `POST`   | `/v1/datashares/:id/run`    | Trigger a one-off run                   |
| `GET`    | `/v1/datashares/:id/runs`   | List recent runs                        |
| `DELETE` | `/v1/datashares/:id`        | Delete (and unschedule)                 |

## Local development

```bash
cp .env.example .env
pnpm --filter @salychain/service-analytics-datashares prisma:generate
DATABASE_URL=… pnpm --filter @salychain/service-analytics-datashares prisma:deploy
pnpm --filter @salychain/service-analytics-datashares dev   # :4018
```

Requires Postgres (`salychain_datashares`), Redis, ClickHouse (the analytics
store), and an S3-compatible store (the local MinIO `salychain-lake` bucket).

## Observability

Prometheus series (in addition to HTTP RED):

- `salychain_datashares_active_shares` — gauge of ACTIVE datashares
- `salychain_datashares_runs_total{destination,outcome}` — run outcomes
- `salychain_datashares_rows_exported_total{destination}` — rows delivered
