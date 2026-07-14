import type { Address } from 'viem';
import {
  applyManifestToEnv,
  createSettlementMonitor,
  getSettlementStatus,
  loadDeploymentManifest,
  resolveSettlementMode,
  withSettlementContracts,
  l3Network,
  settlementRpcDefault,
  type L3Network,
} from '@salychain/chain-l3';
import { EventBus, SUBJECTS } from '@salychain/events';
import { createLogger } from '@salychain/logger';
import { initTelemetry, startWorkerObservabilityServer } from '@salychain/observability';
import { ulid } from 'ulid';
import { loadL3MonitorEnv } from './config.js';
import {
  defaultStateDir,
  loadMonitorState,
  saveMonitorState,
  startHealthServer,
  type MonitorState,
} from './state.js';

const env = loadL3MonitorEnv();
const logger = createLogger({ service: 'l3-rollup-monitor' });

const manifest = loadDeploymentManifest(process.cwd());
if (manifest) {
  applyManifestToEnv(manifest);
  logger.info(`loaded deployment manifest (${manifest.deployed_at ?? 'undated'})`);
}

const l3NetworkId = (manifest?.network ?? env.L3_NETWORK) as L3Network;
const settlementMode = env.L3_SETTLEMENT_MODE ?? resolveSettlementMode();
const oracle = (env.L3_L2_OUTPUT_ORACLE ?? manifest?.contracts.l2OutputOracle) as Address | undefined;
const factory = (env.L3_DISPUTE_GAME_FACTORY ?? manifest?.contracts.disputeGameFactory) as
  | Address
  | undefined;

if (oracle) {
  withSettlementContracts(l3NetworkId, { l2OutputOracle: oracle });
}

const monitor = createSettlementMonitor({
  l3Network: l3NetworkId,
  settlementMode,
  settlementRpcUrl:
    env.L3_SETTLEMENT_RPC_URL ?? settlementRpcDefault(l3Network(l3NetworkId).settlement),
  ...(settlementMode === 'fault_proofs' && factory ? { disputeGameFactory: factory } : {}),
  ...(settlementMode === 'legacy' && oracle ? { l2OutputOracle: oracle } : {}),
  logger,
});

const bus = new EventBus({ servers: env.NATS_URL, serviceName: 'l3-rollup-monitor', logger });
const stateDir = defaultStateDir();
let state: MonitorState = loadMonitorState(stateDir);
let lastSeenIndex = BigInt(state.last_seen_output_index);
let shuttingDown = false;

process.on('SIGTERM', () => (shuttingDown = true));
process.on('SIGINT', () => (shuttingDown = true));

const healthServer = startHealthServer(env.L3_MONITOR_HEALTH_PORT, () => ({
  ok: monitor.isConfigured(),
  configured: monitor.isConfigured(),
  settlement_mode: settlementMode,
  spike_complete: state.spike_complete,
  last_seen_output_index: state.last_seen_output_index,
  events_emitted: state.events_emitted,
}));

initTelemetry({
  serviceName: 'l3-rollup-monitor',
  otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  env: env.NODE_ENV,
});
const telemetryServer = startWorkerObservabilityServer({
  serviceName: 'l3-rollup-monitor',
  port: env.METRICS_PORT,
  healthCheck: () => !shuttingDown,
});

async function main(): Promise<void> {
  await bus.start();

  if (!monitor.isConfigured()) {
    logger.warn(
      `settlement not configured (${settlementMode}) — monitor idle. See docs/runbooks/d3-l3-production.md`,
    );
  } else {
    logger.info(
      `monitoring ${l3NetworkId} mode=${settlementMode} health=:${env.L3_MONITOR_HEALTH_PORT}`,
    );
  }

  while (!shuttingDown) {
    try {
      await poll();
    } catch (err) {
      logger.error(`poll failed: ${(err as Error).message}`);
    }
    await sleep(env.L3_POLL_INTERVAL_MS);
  }

  healthServer.close();
  telemetryServer.close();
  await bus.stop();
  logger.info('shut down');
}

async function poll(): Promise<void> {
  if (!monitor.isConfigured()) return;

  const status = await getSettlementStatus(monitor);
  const oracleAddr =
    status.l2OutputOracle ??
    status.disputeGameFactory ??
    ('' as Address);
  if (!status.configured || status.latestOutputIndex === undefined || !oracleAddr) {
    return;
  }

  if (status.latestOutputIndex <= lastSeenIndex) return;

  const proposal = status.latestProposal;
  if (!proposal) return;

  lastSeenIndex = status.latestOutputIndex;

  logger.info(
    `settlement proposal index=${proposal.outputIndex} l2Block=${proposal.l2BlockNumber} root=${proposal.outputRoot.slice(0, 10)}…`,
  );

  await bus.publish(
    SUBJECTS.CHAIN_L3_OUTPUT_PROPOSED,
    {
      l3_network: l3NetworkId,
      settlement_network: proposal.settlementNetwork,
      output_root: proposal.outputRoot,
      output_index: proposal.outputIndex.toString(),
      l2_block_number: proposal.l2BlockNumber.toString(),
      l1_timestamp: proposal.l1Timestamp.toString(),
      l1_block_number: Number(proposal.l1BlockNumber),
      l1_tx_hash: proposal.l1TxHash,
      l2_output_oracle: oracleAddr,
    },
    { eventId: ulid() },
  );

  state = {
    last_seen_output_index: lastSeenIndex.toString(),
    last_emit_at: new Date().toISOString(),
    spike_complete: true,
    events_emitted: state.events_emitted + 1,
  };
  saveMonitorState(stateDir, state);
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
