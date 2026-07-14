-- Per-service logical databases. Each service owns its own schema; cross-service joins are forbidden.
-- Keeping them in one Postgres instance for local dev simplicity; production uses separate RDS clusters per blast-radius group.

CREATE DATABASE salychain_ledger;
CREATE DATABASE salychain_wallet;
CREATE DATABASE salychain_signer;
CREATE DATABASE salychain_execution;
CREATE DATABASE salychain_intent;
CREATE DATABASE salychain_routing;
CREATE DATABASE salychain_liquidity;
CREATE DATABASE salychain_compliance;
CREATE DATABASE salychain_risk;
CREATE DATABASE salychain_webhook;
CREATE DATABASE salychain_notification;
CREATE DATABASE salychain_gateway;
CREATE DATABASE salychain_apikeys;
CREATE DATABASE salychain_agents;
CREATE DATABASE salychain_identity;
CREATE DATABASE salychain_contract_registry;
CREATE DATABASE salychain_admin;
CREATE DATABASE salychain_fiat_listener;
CREATE DATABASE salychain_analytics_indexer;
CREATE DATABASE salychain_datastreams;
CREATE DATABASE salychain_datashares;
CREATE DATABASE salychain_intelligence;
CREATE DATABASE salychain_merchant;
CREATE DATABASE salychain_stablecoin;
