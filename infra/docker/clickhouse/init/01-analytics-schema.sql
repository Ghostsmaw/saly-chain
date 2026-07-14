-- =============================================================================
-- Saly Analytics Cloud — canonical + proprietary realtime schema (ClickHouse).
--
-- This is the B0 schema. It is applied automatically by the ClickHouse container
-- on first boot, AND idempotently re-applied by services/analytics-ingest on
-- startup (CREATE ... IF NOT EXISTS), so the two never drift.
--
-- Dedup model: every table is a ReplacingMergeTree versioned by ingested_at and
-- ordered by the event's natural key (including event_id where needed), so an
-- at-least-once redelivery collapses to a single row at merge time.
-- =============================================================================

CREATE DATABASE IF NOT EXISTS salychain_analytics;

-- Raw landing zone — full event envelope for replay/debug and as the spine.
CREATE TABLE IF NOT EXISTS salychain_analytics.raw_events
(
  event_id     String,
  subject      LowCardinality(String),
  occurred_at  DateTime64(3),
  ingested_at  DateTime64(3) DEFAULT now64(3),
  payload      String
)
ENGINE = ReplacingMergeTree(ingested_at)
ORDER BY (subject, event_id);

-- blocks: one row per observed block/ledger per chain.
CREATE TABLE IF NOT EXISTS salychain_analytics.blocks
(
  chain_id     LowCardinality(String),
  block_number UInt64,
  block_hash   String,
  ts           DateTime64(3),
  event_id     String,
  ingested_at  DateTime64(3) DEFAULT now64(3)
)
ENGINE = ReplacingMergeTree(ingested_at)
ORDER BY (chain_id, block_number);

-- token_transfers: unified ERC-20 / native / XRPL IOU / XRPL native.
CREATE TABLE IF NOT EXISTS salychain_analytics.token_transfers
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
ORDER BY (chain_id, tx_hash, log_index);

-- decoded_events: any decoded log (escrow deals, L3 output proposals, ...).
CREATE TABLE IF NOT EXISTS salychain_analytics.decoded_events
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
ORDER BY (chain_id, tx_hash, log_index, event_name);

-- tx_lifecycle: SalyChain transaction state transitions (proprietary).
CREATE TABLE IF NOT EXISTS salychain_analytics.tx_lifecycle
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
ORDER BY (transaction_id, state, event_id);

-- intent_events: intent lifecycle incl. screening + routing (proprietary).
CREATE TABLE IF NOT EXISTS salychain_analytics.intent_events
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
ORDER BY (intent_id, event_type, event_id);

-- agent_events: agent lifecycle + spend decisions (proprietary).
CREATE TABLE IF NOT EXISTS salychain_analytics.agent_events
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
ORDER BY (agent_id, event_type, event_id);
