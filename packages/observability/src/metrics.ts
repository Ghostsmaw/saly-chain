import { Registry, collectDefaultMetrics, Counter, Gauge, Histogram } from 'prom-client';

/**
 * A single, shared Prometheus registry for the process.
 *
 * Every service and worker exposes this registry at `/metrics`. We use a
 * dedicated registry (not the global default) so tests and embedders don't get
 * cross-talk, and we attach a `service` default label at bootstrap so every
 * series is attributable to a source.
 */
export const register = new Registry();

let defaultsCollected = false;

/**
 * Idempotently initialise the registry for a given service. Safe to call more
 * than once (workers + Nest bootstrap may both call it).
 */
export function initMetrics(serviceName: string): Registry {
  register.setDefaultLabels({ service: serviceName });
  if (!defaultsCollected) {
    collectDefaultMetrics({ register, prefix: 'salychain_' });
    defaultsCollected = true;
  }
  return register;
}

// Standard duration buckets (seconds) tuned for sub-second API calls.
const DURATION_BUCKETS = [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10];

// ---------------------------------------------------------------------------
// HTTP RED metrics (Rate / Errors / Duration)
// ---------------------------------------------------------------------------

export const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests handled.',
  labelNames: ['method', 'route', 'status'] as const,
  registers: [register],
});

export const httpRequestDurationSeconds = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request latency in seconds.',
  labelNames: ['method', 'route', 'status'] as const,
  buckets: DURATION_BUCKETS,
  registers: [register],
});

export const httpRequestsInFlight = new Gauge({
  name: 'http_requests_in_flight',
  help: 'In-flight HTTP requests.',
  labelNames: ['method'] as const,
  registers: [register],
});

// ---------------------------------------------------------------------------
// Domain metrics — the money-platform signals worth paging on.
// Defined centrally so every service emits consistent series names.
// Importing services just call `.inc()` / `.set()` where the event happens.
// ---------------------------------------------------------------------------

/** Ledger: a posting that failed the double-entry balance invariant. PAGE. */
export const ledgerImbalanceDetectedTotal = new Counter({
  name: 'salychain_ledger_imbalance_detected_total',
  help: 'Journal entries rejected because debits != credits.',
  registers: [register],
});

/** Ledger: successful journal postings. */
export const ledgerPostingsTotal = new Counter({
  name: 'salychain_ledger_postings_total',
  help: 'Journal entries successfully posted.',
  labelNames: ['kind'] as const,
  registers: [register],
});

/** Execution: transaction state-machine transitions. */
export const txStateTransitionsTotal = new Counter({
  name: 'salychain_tx_state_transitions_total',
  help: 'Execution transaction state transitions.',
  labelNames: ['state', 'kind'] as const,
  registers: [register],
});

/** Signer: outcome of sign operations (granted / denied / error). */
export const signerSignTotal = new Counter({
  name: 'salychain_signer_sign_total',
  help: 'Signer sign operations by outcome.',
  labelNames: ['outcome', 'chain'] as const,
  registers: [register],
});

/** Chain listeners: how many blocks behind the (confirmed) head we are. */
export const chainListenerLagBlocks = new Gauge({
  name: 'salychain_chain_listener_lag_blocks',
  help: 'Blocks between listener checkpoint and confirmed head.',
  labelNames: ['chain'] as const,
  registers: [register],
});

/** Chain listeners: processed batches by outcome. */
export const chainListenerBatchesTotal = new Counter({
  name: 'salychain_chain_listener_batches_total',
  help: 'Chain listener batches processed.',
  labelNames: ['chain', 'outcome'] as const,
  registers: [register],
});

/** Chain listeners: reorgs detected via checkpoint hash mismatch. */
export const chainReorgsDetectedTotal = new Counter({
  name: 'salychain_chain_reorgs_detected_total',
  help: 'Chain reorgs detected by listeners.',
  labelNames: ['chain'] as const,
  registers: [register],
});

/** Webhooks: failed deliveries (pre-DLQ). */
export const webhookDeliveryFailuresTotal = new Counter({
  name: 'salychain_webhook_delivery_failures_total',
  help: 'Webhook delivery attempts that failed.',
  registers: [register],
});

/** Liquidity: a quote that fell back to a stub provider (should be 0 in prod). */
export const quoteStubFallbackTotal = new Counter({
  name: 'salychain_quote_stub_fallback_total',
  help: 'FX/DEX quotes served by a stub provider.',
  labelNames: ['kind'] as const,
  registers: [register],
});

/** Event bus: domain events published / consumed. */
export const eventsPublishedTotal = new Counter({
  name: 'salychain_events_published_total',
  help: 'Domain events published to NATS.',
  labelNames: ['subject'] as const,
  registers: [register],
});

export const eventsConsumedTotal = new Counter({
  name: 'salychain_events_consumed_total',
  help: 'Domain events consumed from NATS.',
  labelNames: ['subject', 'outcome'] as const,
  registers: [register],
});

/** Datastreams: events matched by an active stream filter (one per stream hit). */
export const datastreamsMatchedTotal = new Counter({
  name: 'salychain_datastreams_matched_total',
  help: 'Events that matched an active stream filter, by sink.',
  labelNames: ['sink'] as const,
  registers: [register],
});

/** Datastreams: terminal delivery outcomes to a sink (succeeded/failed/dead). */
export const datastreamsDeliveriesTotal = new Counter({
  name: 'salychain_datastreams_deliveries_total',
  help: 'Datastreams sink deliveries by sink and outcome.',
  labelNames: ['sink', 'outcome'] as const,
  registers: [register],
});

/** Datastreams: number of streams currently in the ACTIVE state. */
export const datastreamsActiveStreams = new Gauge({
  name: 'salychain_datastreams_active_streams',
  help: 'Streams currently ACTIVE and eligible to receive events.',
  registers: [register],
});

/** Datastreams: live WebSocket dashboard connections across all streams. */
export const datastreamsWebsocketConnections = new Gauge({
  name: 'salychain_datastreams_websocket_connections',
  help: 'Open WebSocket dashboard connections to the datastreams service.',
  registers: [register],
});

/** Datashares: terminal outcomes of a share run, by destination + outcome. */
export const datasharesRunsTotal = new Counter({
  name: 'salychain_datashares_runs_total',
  help: 'Datashare runs by destination and outcome (succeeded/failed).',
  labelNames: ['destination', 'outcome'] as const,
  registers: [register],
});

/** Datashares: rows exported (post-redaction), by destination. */
export const datasharesRowsExportedTotal = new Counter({
  name: 'salychain_datashares_rows_exported_total',
  help: 'Rows written to a destination across all share runs, by destination.',
  labelNames: ['destination'] as const,
  registers: [register],
});

/** Datashares: number of datashares currently ACTIVE. */
export const datasharesActiveShares = new Gauge({
  name: 'salychain_datashares_active_shares',
  help: 'Datashares currently ACTIVE (eligible for scheduled/manual runs).',
  registers: [register],
});

/** Intelligence: entity-resolution runs by outcome (succeeded/failed). */
export const intelligenceResolutionRunsTotal = new Counter({
  name: 'salychain_intelligence_resolution_runs_total',
  help: 'Entity-resolution runs by outcome.',
  labelNames: ['outcome'] as const,
  registers: [register],
});

/** Intelligence: entities currently materialized (ACTIVE clusters). */
export const intelligenceEntitiesTotal = new Gauge({
  name: 'salychain_intelligence_entities_total',
  help: 'Resolved entities currently materialized.',
  registers: [register],
});

/** Intelligence: natural-language analytics questions by outcome. */
export const intelligenceNlQueriesTotal = new Counter({
  name: 'salychain_intelligence_nl_queries_total',
  help: 'Natural-language analytics questions by outcome (executed/unsupported/failed).',
  labelNames: ['outcome'] as const,
  registers: [register],
});

/** Intelligence: address feature lookups served (e.g. to services/risk). */
export const intelligenceFeatureLookupsTotal = new Counter({
  name: 'salychain_intelligence_feature_lookups_total',
  help: 'Point-in-time address feature lookups served.',
  registers: [register],
});

/** Execution: fiat pay-in lifecycle outcomes (opened / settled / failed). */
export const fiatPayinsTotal = new Counter({
  name: 'salychain_fiat_payins_total',
  help: 'Fiat pay-ins by outcome.',
  labelNames: ['outcome', 'provider'] as const,
  registers: [register],
});

/** Execution: ledger↔rail reconciliation sweeps by outcome. */
export const reconciliationRunsTotal = new Counter({
  name: 'salychain_reconciliation_runs_total',
  help: 'Reconciliation sweeps by scope and status.',
  labelNames: ['scope', 'status'] as const,
  registers: [register],
});

/** Execution: individual reconciliation breaks detected. */
export const reconciliationBreaksTotal = new Counter({
  name: 'salychain_reconciliation_breaks_total',
  help: 'Reconciliation breaks detected by scope and kind.',
  labelNames: ['scope', 'kind'] as const,
  registers: [register],
});

/** Merchant: payment link lifecycle outcomes. */
export const merchantPaymentLinksTotal = new Counter({
  name: 'salychain_merchant_payment_links_total',
  help: 'Payment links by outcome (created/archived).',
  labelNames: ['outcome'] as const,
  registers: [register],
});

/** Merchant: hosted checkout session outcomes. */
export const merchantCheckoutSessionsTotal = new Counter({
  name: 'salychain_merchant_checkout_sessions_total',
  help: 'Checkout sessions by outcome.',
  labelNames: ['outcome'] as const,
  registers: [register],
});

/** Merchant: settlement report generation outcomes. */
export const merchantSettlementReportsTotal = new Counter({
  name: 'salychain_merchant_settlement_reports_total',
  help: 'Settlement reports by outcome.',
  labelNames: ['outcome'] as const,
  registers: [register],
});

// ---------------------------------------------------------------------------
// L3 production infra (D3)
// ---------------------------------------------------------------------------

/** L3 RPC gateway: proxied JSON-RPC requests by outcome. */
export const l3RpcGatewayRequestsTotal = new Counter({
  name: 'salychain_l3_rpc_gateway_requests_total',
  help: 'L3 RPC gateway JSON-RPC requests.',
  labelNames: ['method', 'outcome'] as const,
  registers: [register],
});

/** L3 RPC pool: healthy upstream count. */
export const l3RpcUpstreamHealthy = new Gauge({
  name: 'salychain_l3_rpc_upstream_healthy',
  help: 'Number of healthy L3 JSON-RPC upstream endpoints.',
  registers: [register],
});

/** L3 RPC pool: max block lag between replicas. */
export const l3RpcPoolLagBlocks = new Gauge({
  name: 'salychain_l3_rpc_pool_lag_blocks',
  help: 'Max block lag across L3 RPC upstream pool.',
  registers: [register],
});

/** L3 ops: execution block lag vs settlement head proxy. */
export const l3SequencerLagBlocks = new Gauge({
  name: 'salychain_l3_sequencer_lag_blocks',
  help: 'Blocks between L3 execution head and expected sequencer progress.',
  registers: [register],
});

/** L3 ops: seconds since last settlement proposal (oracle or fault proof). */
export const l3SettlementProposalAgeSeconds = new Gauge({
  name: 'salychain_l3_settlement_proposal_age_seconds',
  help: 'Age of the latest L3 settlement proposal in seconds.',
  registers: [register],
});

/** L3 ops: conductor cluster has elected leader. */
export const l3ConductorHasLeader = new Gauge({
  name: 'salychain_l3_conductor_has_leader',
  help: '1 when Conductor HA cluster reports a leader, else 0.',
  registers: [register],
});

/** Stablecoin PoR: reserve total minus on-chain supply (negative = under-collateralized). */
export const stablecoinSupplyDriftMinor = new Gauge({
  name: 'salychain_stablecoin_supply_drift_minor',
  help: 'Reserve total minus on-chain SalySD supply in minor units.',
  registers: [register],
});

/** Stablecoin PoR: reserve ratio in basis points (10000 = 100%). */
export const stablecoinReserveRatioBps = new Gauge({
  name: 'salychain_stablecoin_reserve_ratio_bps',
  help: 'Reserve backing ratio for SalySD in basis points.',
  registers: [register],
});

/** Stablecoin PoR: seconds since last attestation was recorded. */
export const stablecoinAttestationAgeSeconds = new Gauge({
  name: 'salychain_stablecoin_attestation_age_seconds',
  help: 'Age of the latest reserve attestation in seconds.',
  registers: [register],
});

/** Stablecoin PoR worker cycle outcomes. */
export const stablecoinPorRunsTotal = new Counter({
  name: 'salychain_stablecoin_por_runs_total',
  help: 'Proof-of-reserves worker cycles by outcome.',
  labelNames: ['outcome'] as const,
  registers: [register],
});

/**
 * Render the current metrics in Prometheus text exposition format.
 */
export async function renderMetrics(): Promise<{ contentType: string; body: string }> {
  return { contentType: register.contentType, body: await register.metrics() };
}
