# Saly Analytics Lakehouse (B5)

Cold historical storage on MinIO (Parquet) queryable via Trino.

## Layout

Indexer worker writes Hive-partitioned Parquet:

```
s3://salychain-lake/raw/token_transfers/chain_id=base/dt=2026-06-24/part-{ulid}.parquet
s3://salychain-lake/raw/blocks/chain_id=base/dt=2026-06-24/part-{ulid}.parquet
```

Hot path remains ClickHouse (realtime). Lake is for deep history and ad-hoc SQL.

## Local stack

```bash
docker compose -f infra/docker/docker-compose.yml up -d minio nessie trino clickhouse
# Run backfill indexer (Base example):
pnpm --filter @salychain/worker-analytics-indexer prisma:deploy
INDEXER_CHAIN=base INDEXER_MODE=backfill DATABASE_URL=postgresql://salychain:salychain@localhost:5433/salychain_analytics_indexer \
  pnpm --filter @salychain/worker-analytics-indexer dev
```

Trino UI: http://localhost:8088

## Example Trino queries (raw Parquet via Hive)

After backfill populates MinIO:

```sql
-- Register external table (run once in Trino CLI)
CREATE SCHEMA IF NOT EXISTS hive.raw WITH (location = 's3://salychain-lake/raw/');

CREATE TABLE IF NOT EXISTS hive.raw.token_transfers (
  chain_id varchar,
  tx_hash varchar,
  log_index integer,
  ts varchar,
  block_number bigint,
  token_address varchar,
  token_symbol varchar,
  from_address varchar,
  to_address varchar,
  amount_raw varchar,
  transfer_type varchar
)
WITH (
  external_location = 's3://salychain-lake/raw/token_transfers/',
  format = 'PARQUET',
  partitioned_by = ARRAY['chain_id']
);

SELECT chain_id, count(*) FROM hive.raw.token_transfers GROUP BY 1;
```

Iceberg curated tables (Nessie catalog `iceberg.analytics.*`) are created in B2 dbt marts
or via `CREATE TABLE ... WITH (format='PARQUET')` pointing at the warehouse path.
