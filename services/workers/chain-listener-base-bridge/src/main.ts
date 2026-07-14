import { PrismaClient } from './generated/prisma/index.js';
import { BaseChainAdapter } from '@salychain/chain-base';
import {
  applyManifestToEnv,
  fetchErc20BridgeDepositsForSettlement,
  fetchPortalDepositsForSettlement,
  isBridgeConfigured,
  loadDeploymentManifest,
  resolveBridgeContracts,
  type L3Network,
} from '@salychain/chain-l3';
import { EventBus, SUBJECTS } from '@salychain/events';
import { detectReorg } from '@salychain/finality';
import { createLogger } from '@salychain/logger';
import {
  initTelemetry,
  startWorkerObservabilityServer,
  chainListenerLagBlocks,
  chainListenerBatchesTotal,
  chainReorgsDetectedTotal,
} from '@salychain/observability';
import { ulid } from 'ulid';
import { env } from './config.js';

/**
 * Polls Base for OP-Stack bridge deposit events (OptimismPortal + L1StandardBridge)
 * and emits canonical bridge observation events for execution/ledger settlement.
 */

const logger = createLogger({ service: 'chain-listener-base-bridge' });
const l3NetworkId = env.L3_NETWORK as L3Network;
const chainKey = `BASE:bridge:${env.BASE_NETWORK}:${l3NetworkId}`;
const prisma = new PrismaClient();

const manifest = loadDeploymentManifest(process.cwd());
if (manifest) applyManifestToEnv(manifest);

const bridge = resolveBridgeContracts(process.cwd());
const adapter = new BaseChainAdapter({ network: env.BASE_NETWORK, rpcUrl: env.BASE_RPC_URL, logger });
const bus = new EventBus({
  servers: env.NATS_URL,
  serviceName: 'chain-listener-base-bridge',
  logger,
});

let shuttingDown = false;
let busConnected = false;
process.on('SIGTERM', () => (shuttingDown = true));
process.on('SIGINT', () => (shuttingDown = true));

initTelemetry({
  serviceName: 'chain-listener-base-bridge',
  otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  env: env.NODE_ENV,
});
const telemetryServer = startWorkerObservabilityServer({
  serviceName: 'chain-listener-base-bridge',
  port: env.METRICS_PORT,
  healthCheck: () => busConnected && !shuttingDown && isBridgeConfigured(bridge),
});

async function main(): Promise<void> {
  if (!isBridgeConfigured(bridge)) {
    logger.fatal('bridge not configured — set L3_OPTIMISM_PORTAL via manifest or env');
    process.exit(1);
  }

  await bus.start();
  busConnected = true;
  logger.info(
    `listening on ${chainKey} portal=${bridge.optimismPortal} bridge=${bridge.l1StandardBridge ?? 'n/a'} (metrics :${env.METRICS_PORT})`,
  );

  const head = await adapter.getCurrentBlockNumber();
  await ensureCheckpoint(head);

  while (!shuttingDown) {
    try {
      await processBatch();
      chainListenerBatchesTotal.inc({ chain: 'BASE', outcome: 'success' });
    } catch (err) {
      chainListenerBatchesTotal.inc({ chain: 'BASE', outcome: 'error' });
      logger.error(`batch failed: ${(err as Error).message}`);
    }
    await sleep(env.LISTENER_POLL_INTERVAL_MS);
  }

  logger.info('shutting down');
  busConnected = false;
  await bus.stop();
  await prisma.$disconnect();
  telemetryServer.close();
}

async function processBatch(): Promise<void> {
  const checkpoint = await prisma.chainListenerCheckpoint.findUnique({ where: { chainKey } });
  if (!checkpoint) throw new Error(`missing checkpoint for ${chainKey}`);

  const reorg = await detectReorg({
    checkpointBlock: checkpoint.lastBlockNumber,
    checkpointHash: checkpoint.lastBlockHash,
    confirmations: env.LISTENER_CONFIRMATIONS,
    getHashAt: async (block) => {
      const b = await adapter.getBlock(block);
      return b.hash ?? undefined;
    },
  });
  if (reorg) {
    chainReorgsDetectedTotal.inc({ chain: 'BASE' });
    await bus.publish(SUBJECTS.CHAIN_BASE_REORG_DETECTED, {
      event_id: ulid(),
      occurred_at: new Date().toISOString(),
      chain: 'BASE',
      from_block: reorg.fromBlock,
      to_block: reorg.toBlock,
      orphaned_block_hash: reorg.orphanedBlockHash,
      detected_at_block: Number(checkpoint.lastBlockNumber),
    } as never);
    await prisma.chainListenerCheckpoint.update({
      where: { chainKey },
      data: { lastBlockNumber: reorg.rewindTo, lastBlockHash: '' },
    });
    logger.warn(`reorg detected; rewinding to ${reorg.rewindTo}`);
    return;
  }

  const head = await adapter.getCurrentBlockNumber();
  const targetHead = head - BigInt(env.LISTENER_CONFIRMATIONS);
  const fromBlock = checkpoint.lastBlockNumber + 1n;
  const lag = targetHead - checkpoint.lastBlockNumber;
  chainListenerLagBlocks.set({ chain: 'BASE' }, lag > 0n ? Number(lag) : 0);
  if (fromBlock > targetHead) return;

  const toBlock = bigintMin(fromBlock + BigInt(env.LISTENER_BATCH_SIZE - 1), targetHead);

  const ourAddresses = await loadCustodialBaseAddresses();

  if (bridge.optimismPortal) {
    const portalDeposits = await fetchPortalDepositsForSettlement({
      rpcUrl: env.BASE_RPC_URL,
      settlement: bridge.settlement,
      portalAddress: bridge.optimismPortal,
      fromBlock,
      toBlock,
    });
    for (const log of portalDeposits) {
      if (!ourAddresses.has(log.depositor.toLowerCase())) continue;
      await bus.publish(SUBJECTS.CHAIN_BASE_BRIDGE_DEPOSIT_OBSERVED, {
        event_id: ulid(),
        occurred_at: new Date().toISOString(),
        chain: 'BASE',
        l3_network: l3NetworkId,
        block_number: Number(log.blockNumber),
        block_hash: log.blockHash,
        tx_hash: log.txHash,
        log_index: log.logIndex,
        portal_address: log.portalAddress,
        depositor: log.depositor,
        l2_recipient: log.l2Recipient,
        deposit_version: log.depositVersion.toString(),
        opaque_data_hash: log.opaqueDataHash,
        confirmations_depth: env.LISTENER_CONFIRMATIONS,
      } as never);
      logger.info(`portal deposit ${log.txHash} from=${log.depositor} l2=${log.l2Recipient}`);
    }
  }

  if (bridge.l1StandardBridge) {
    const erc20Deposits = await fetchErc20BridgeDepositsForSettlement({
      rpcUrl: env.BASE_RPC_URL,
      settlement: bridge.settlement,
      bridgeAddress: bridge.l1StandardBridge,
      fromBlock,
      toBlock,
    });
    for (const log of erc20Deposits) {
      if (!ourAddresses.has(log.from.toLowerCase())) continue;
      await bus.publish(SUBJECTS.CHAIN_BASE_BRIDGE_ERC20_DEPOSIT_OBSERVED, {
        event_id: ulid(),
        occurred_at: new Date().toISOString(),
        chain: 'BASE',
        l3_network: l3NetworkId,
        block_number: Number(log.blockNumber),
        block_hash: log.blockHash,
        tx_hash: log.txHash,
        log_index: log.logIndex,
        bridge_address: log.bridgeAddress,
        l1_token: log.l1Token,
        l2_token: log.l2Token,
        from: log.from,
        to: log.to,
        amount_minor: log.amountMinor.toString(),
        confirmations_depth: env.LISTENER_CONFIRMATIONS,
      } as never);
      logger.info(`erc20 bridge deposit ${log.txHash} ${log.from} → L3 ${log.to} (${log.amountMinor})`);
    }
  }

  const tipBlock = await adapter.getBlock(toBlock);
  await prisma.chainListenerCheckpoint.update({
    where: { chainKey },
    data: { lastBlockNumber: toBlock, lastBlockHash: tipBlock.hash ?? '' },
  });
}

async function loadCustodialBaseAddresses(): Promise<Set<string>> {
  const involved = await prisma.$queryRaw<{ address: string }[]>`
    SELECT address FROM wallets WHERE chain = 'BASE'
  `;
  return new Set(involved.map((r) => r.address.toLowerCase()));
}

async function ensureCheckpoint(head: bigint): Promise<void> {
  const existing = await prisma.chainListenerCheckpoint.findUnique({ where: { chainKey } });
  if (existing) return;
  const block = await adapter.getBlock(head - 1n);
  await prisma.chainListenerCheckpoint.create({
    data: {
      chainKey,
      lastBlockNumber: block.number ?? head - 1n,
      lastBlockHash: block.hash ?? '',
    },
  });
  logger.info(`bootstrapped checkpoint at block ${block.number}`);
}

function bigintMin(a: bigint, b: bigint): bigint {
  return a < b ? a : b;
}

function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

main().catch((err) => {
  logger.fatal(`listener crashed: ${(err as Error).message}`);
  process.exit(1);
});
