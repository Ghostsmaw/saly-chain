/**
 * Canonical + proprietary ClickHouse schema, applied idempotently on boot.
 * Mirrors infra/docker/clickhouse/init/01-analytics-schema.sql — keep in sync.
 * The service owns this at runtime so a fresh ClickHouse (or a schema drift)
 * self-heals without a manual migration step.
 */
export const ANALYTICS_DATABASE = 'salychain_analytics';

export const SCHEMA_STATEMENTS: readonly string[] = [
  `CREATE DATABASE IF NOT EXISTS ${ANALYTICS_DATABASE}`,

  `CREATE TABLE IF NOT EXISTS ${ANALYTICS_DATABASE}.raw_events
   (
     event_id     String,
     subject      LowCardinality(String),
     occurred_at  DateTime64(3),
     ingested_at  DateTime64(3) DEFAULT now64(3),
     payload      String
   )
   ENGINE = ReplacingMergeTree(ingested_at)
   ORDER BY (subject, event_id)`,

  `CREATE TABLE IF NOT EXISTS ${ANALYTICS_DATABASE}.blocks
   (
     chain_id     LowCardinality(String),
     block_number UInt64,
     block_hash   String,
     ts           DateTime64(3),
     event_id     String,
     ingested_at  DateTime64(3) DEFAULT now64(3)
   )
   ENGINE = ReplacingMergeTree(ingested_at)
   ORDER BY (chain_id, block_number)`,

  `CREATE TABLE IF NOT EXISTS ${ANALYTICS_DATABASE}.token_transfers
   (
     chain_id      LowCardinality(String),
     tx_hash       String,
     log_index     UInt32,
     ts            DateTime64(3),
     block_number  UInt64,
     token_address String,
     token_symbol  LowCardinality(String),
     from_address  String,
     to_address    String,
     amount_raw    String,
     transfer_type LowCardinality(String),
     event_id      String,
     ingested_at   DateTime64(3) DEFAULT now64(3)
   )
   ENGINE = ReplacingMergeTree(ingested_at)
   ORDER BY (chain_id, tx_hash, log_index)`,

  `CREATE TABLE IF NOT EXISTS ${ANALYTICS_DATABASE}.decoded_events
   (
     chain_id         LowCardinality(String),
     tx_hash          String,
     log_index        UInt32,
     ts               DateTime64(3),
     contract_address String,
     event_name       LowCardinality(String),
     args             String,
     event_id         String,
     ingested_at      DateTime64(3) DEFAULT now64(3)
   )
   ENGINE = ReplacingMergeTree(ingested_at)
   ORDER BY (chain_id, tx_hash, log_index, event_name)`,

  `CREATE TABLE IF NOT EXISTS ${ANALYTICS_DATABASE}.tx_lifecycle
   (
     transaction_id String,
     state          LowCardinality(String),
     kind           LowCardinality(String),
     ts             DateTime64(3),
     intent_id      String,
     rail           LowCardinality(String),
     tx_hash        String,
     amount_minor   String,
     currency       LowCardinality(String),
     reason_code    String,
     event_id       String,
     ingested_at    DateTime64(3) DEFAULT now64(3)
   )
   ENGINE = ReplacingMergeTree(ingested_at)
   ORDER BY (transaction_id, state, event_id)`,

  `CREATE TABLE IF NOT EXISTS ${ANALYTICS_DATABASE}.intent_events
   (
     intent_id           String,
     event_type          LowCardinality(String),
     kind                LowCardinality(String),
     ts                  DateTime64(3),
     actor_id            String,
     source              LowCardinality(String),
     compliance_decision LowCardinality(String),
     risk_decision       LowCardinality(String),
     risk_score          Float64,
     rail                LowCardinality(String),
     expected_cost_minor String,
     expected_seconds    UInt32,
     reason_code         String,
     event_id            String,
     ingested_at         DateTime64(3) DEFAULT now64(3)
   )
   ENGINE = ReplacingMergeTree(ingested_at)
   ORDER BY (intent_id, event_type, event_id)`,

  `CREATE TABLE IF NOT EXISTS ${ANALYTICS_DATABASE}.agent_events
   (
     agent_id    String,
     event_type  LowCardinality(String),
     ts          DateTime64(3),
     owner_id    String,
     owner_kind  LowCardinality(String),
     wallet_ids  String,
     policy_version UInt32,
     intent_id   String,
     reason_code String,
     event_id    String,
     ingested_at DateTime64(3) DEFAULT now64(3)
   )
   ENGINE = ReplacingMergeTree(ingested_at)
   ORDER BY (agent_id, event_type, event_id)`,
];
