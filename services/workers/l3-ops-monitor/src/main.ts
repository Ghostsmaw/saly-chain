import http from 'node:http';
import type { Address } from 'viem';
import {
  applyManifestToEnv,
  createSettlementMonitor,
  getSettlementStatus,
  loadDeploymentManifest,
  l3Network,
  probeConductorCluster,
  probeL3RpcPool,
  rpcPoolMaxLag,
  settlementRpcDefault,
  type L3Network,
} from '@salychain/chain-l3';
import { createLogger } from '@salychain/logger';
import {
  initTelemetry,
  l3ConductorHasLeader,
  l3RpcPoolLagBlocks,
  l3RpcUpstreamHealthy,
  l3SequencerLagBlocks,
  l3SettlementProposalAgeSeconds,
  startWorkerObservabilityServer,
} from '@salychain/observability';
import { env, splitCsv } from './config.js';

const logger = createLogger({ service: 'l3-ops-monitor' });
const manifest = loadDeploymentManifest(process.cwd());
if (manifest) applyManifestToEnv(manifest);

const l3NetworkId = (manifest?.network ?? env.L3_NETWORK) as L3Network;
const settlementMode = env.L3_SETTLEMENT_MODE;
const oracle = (env.L3_L2_OUTPUT_ORACLE ?? manifest?.contracts.l2OutputOracle) as Address | undefined;
const factory = (env.L3_DISPUTE_GAME_FACTORY ?? manifest?.contracts.disputeGameFactory) as
  | Address
  | undefined;

const monitor = createSettlementMonitor({
  l3Network: l3NetworkId,
  settlementMode,
  settlementRpcUrl:
    env.L3_SETTLEMENT_RPC_URL ?? settlementRpcDefault(l3Network(l3NetworkId).settlement),
  ...(settlementMode === 'fault_proofs' && factory ? { disputeGameFactory: factory } : {}),
  ...(settlementMode === 'legacy' && oracle ? { l2OutputOracle: oracle } : {}),
  logger,
});

const rpcUrls = splitCsv(env.L3_RPC_UPSTREAM_URLS).length
  ? splitCsv(env.L3_RPC_UPSTREAM_URLS)
  : [env.L3_L3_RPC_URL];
const conductorUrls = splitCsv(env.L3_CONDUCTOR_URLS);

let shuttingDown = false;
let lastProposalAt: number | undefined;
let opsOk = true;

process.on('SIGTERM', () => (shuttingDown = true));
process.on('SIGINT', () => (shuttingDown = true));

initTelemetry({
  serviceName: 'l3-ops-monitor',
  otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  env: env.NODE_ENV,
});

const healthServer = http.createServer((_req, res) => {
  res.statusCode = opsOk ? 200 : 503;
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ ok: opsOk, service: 'l3-ops-monitor' }));
});
healthServer.listen(env.L3_OPS_HEALTH_PORT);

startWorkerObservabilityServer({
  serviceName: 'l3-ops-monitor',
  port: env.METRICS_PORT,
  healthCheck: () => !shuttingDown && opsOk,
});

async function poll(): Promise<void> {
  const probes = await probeL3RpcPool({ urls: rpcUrls, network: l3NetworkId });
  const healthy = probes.filter((p) => p.ok).length;
  l3RpcUpstreamHealthy.set(healthy);
  l3RpcPoolLagBlocks.set(rpcPoolMaxLag(probes));
  l3SequencerLagBlocks.set(rpcPoolMaxLag(probes));

  if (conductorUrls.length > 0) {
    const cluster = await probeConductorCluster(conductorUrls);
    l3ConductorHasLeader.set(cluster.hasLeader ? 1 : 0);
    if (conductorUrls.length >= 2 && !cluster.hasLeader) opsOk = false;
  }

  if (monitor.isConfigured()) {
    const status = await getSettlementStatus(monitor);
    if (status.latestProposal?.l1Timestamp && status.latestProposal.l1Timestamp > 0n) {
      lastProposalAt = Number(status.latestProposal.l1Timestamp) * 1000;
    } else if (status.latestProposal) {
      lastProposalAt = Date.now();
    }
  }

  if (lastProposalAt) {
    l3SettlementProposalAgeSeconds.set((Date.now() - lastProposalAt) / 1000);
  }

  opsOk = healthy > 0;
}

async function main(): Promise<void> {
  logger.info(`L3 ops monitor for ${l3NetworkId} (${settlementMode}) health=:${env.L3_OPS_HEALTH_PORT}`);

  while (!shuttingDown) {
    try {
      await poll();
    } catch (err) {
      opsOk = false;
      logger.error(`poll failed: ${(err as Error).message}`);
    }
    await new Promise((r) => setTimeout(r, env.L3_POLL_INTERVAL_MS));
  }

  healthServer.close();
}

main().catch((err) => {
  logger.fatal(`ops monitor crashed: ${(err as Error).message}`);
  process.exit(1);
});
