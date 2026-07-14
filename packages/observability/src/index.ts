/**
 * @salychain/observability
 *
 * Shared observability primitives for every SalyChain service and worker:
 *   - Prometheus metrics on `/metrics` (RED + domain signals)
 *   - OpenTelemetry distributed tracing (OTLP)
 *   - A worker telemetry HTTP server (metrics + health)
 *
 * Service usage (NestJS):
 *   import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
 *   initTelemetry({ serviceName: 'ledger', otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT, env: env.NODE_ENV });
 *   const app = await NestFactory.create(AppModule);
 *   bootstrapHttpObservability(app, { serviceName: 'ledger' });
 *
 * Worker usage:
 *   import { initTelemetry, startWorkerObservabilityServer } from '@salychain/observability';
 *   initTelemetry({ serviceName: 'chain-listener-base', otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT });
 *   startWorkerObservabilityServer({ serviceName: 'chain-listener-base', port: env.METRICS_PORT });
 */

export { initTelemetry, shutdownTelemetry } from './telemetry.js';
export type { TelemetryOptions } from './telemetry.js';

export { bootstrapHttpObservability, metricsMiddleware, metricsHandler } from './http.js';
export type { HttpObservabilityOptions } from './http.js';

export { startWorkerObservabilityServer } from './worker.js';
export type { WorkerObservabilityOptions } from './worker.js';

export {
  register,
  initMetrics,
  renderMetrics,
  // HTTP RED
  httpRequestsTotal,
  httpRequestDurationSeconds,
  httpRequestsInFlight,
  // Domain signals
  ledgerImbalanceDetectedTotal,
  ledgerPostingsTotal,
  txStateTransitionsTotal,
  signerSignTotal,
  chainListenerLagBlocks,
  chainListenerBatchesTotal,
  chainReorgsDetectedTotal,
  webhookDeliveryFailuresTotal,
  quoteStubFallbackTotal,
  eventsPublishedTotal,
  eventsConsumedTotal,
  datastreamsMatchedTotal,
  datastreamsDeliveriesTotal,
  datastreamsActiveStreams,
  datastreamsWebsocketConnections,
  datasharesRunsTotal,
  datasharesRowsExportedTotal,
  datasharesActiveShares,
  intelligenceResolutionRunsTotal,
  intelligenceEntitiesTotal,
  intelligenceNlQueriesTotal,
  intelligenceFeatureLookupsTotal,
  fiatPayinsTotal,
  reconciliationRunsTotal,
  reconciliationBreaksTotal,
  merchantPaymentLinksTotal,
  merchantCheckoutSessionsTotal,
  merchantSettlementReportsTotal,
  l3RpcGatewayRequestsTotal,
  l3RpcUpstreamHealthy,
  l3RpcPoolLagBlocks,
  l3SequencerLagBlocks,
  l3SettlementProposalAgeSeconds,
  l3ConductorHasLeader,
  stablecoinSupplyDriftMinor,
  stablecoinReserveRatioBps,
  stablecoinAttestationAgeSeconds,
  stablecoinPorRunsTotal,
} from './metrics.js';
