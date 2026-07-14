import { PrismaClient } from './generated/prisma/index.js';
import type { Address } from 'viem';
import {
  L3ChainAdapter,
  applyManifestToEnv,
  assertL3Connection,
  fetchL2BridgeWithdrawalsForSettlement,
  loadDeploymentManifest,
  resolveBridgeContracts,
  resolveUsdcAddress,
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

const logger = createLogger({ service: 'chain-listener-l3' });
const l3NetworkId = env.L3_NETWORK as L3Network;
const chainKey = `SALY_L3:${l3NetworkId}`;
const prisma = new PrismaClient();

const manifest = loadDeploymentManifest(process.cwd());
if (manifest) applyManifestToEnv(manifest);
const bridgeContracts = resolveBridgeContracts(process.cwd());
const l2StandardBridge = bridgeContracts.l2StandardBridge;

const adapter = new L3ChainAdapter({
  l3Network: l3NetworkId,
  rpcUrl: env.L3_L3_RPC_URL,
  logger,
});
const bus = new EventBus({ servers: env.NATS_URL, serviceName: 'chain-listener-l3', logger });

let shuttingDown = false;
let busConnected = false;
process.on('SIGTERM', () => (shuttingDown = true));
process.on('SIGINT', () => (shuttingDown = true));

initTelemetry({
  serviceName: 'chain-listener-l3',
  otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  env: env.NODE_ENV,
});
const telemetryServer = startWorkerObservabilityServer({
  serviceName: 'chain-listener-l3',
  port: env.METRICS_PORT,
  healthCheck: () => busConnected && !shuttingDown,
});

async function main(): Promise<void> {
  await bus.start();
  busConnected = true;

  // Fail closed: never run a custodial money rail against the wrong chain. When a
  // USDC address is configured we also require its bytecode to exist on-chain.
  const usdcAddress = (env.L3_USDC_ADDRESS ?? resolveUsdcAddress(l3NetworkId)) as
    | Address
    | undefined;
  await assertL3Connection({
    network: l3NetworkId,
    rpcUrl: env.L3_L3_RPC_URL,
    requireUsdc: Boolean(usdcAddress),
    ...(usdcAddress ? { usdcAddress } : {}),
    logger,
  });
  if (!usdcAddress) {
    logger.warn(
      'L3_USDC_ADDRESS not set — listener will watch no token contracts until configured',
    );
  }

  logger.info(`listening on ${chainKey} (metrics :${env.METRICS_PORT})`);

  const head = await adapter.getCurrentBlockNumber();
  await ensureCheckpoint(head);

  const watchedContracts = usdcAddress ? [usdcAddress] : [];

  while (!shuttingDown) {
    try {
      await processBatch(watchedContracts);
      chainListenerBatchesTotal.inc({ chain: 'SALY_L3', outcome: 'success' });
    } catch (err) {
      chainListenerBatchesTotal.inc({ chain: 'SALY_L3', outcome: 'error' });
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

async function processBatch(watchedContracts: Address[]): Promise<void> {
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
    chainReorgsDetectedTotal.inc({ chain: 'SALY_L3' });
    await bus.publish(SUBJECTS.CHAIN_L3_REORG_DETECTED, {
      event_id: ulid(),
      occurred_at: new Date().toISOString(),
      chain: 'SALY_L3',
      l3_network: l3NetworkId,
      from_block: reorg.fromBlock,
      to_block: reorg.toBlock,
      orphaned_block_hash: reorg.orphanedBlockHash,
      detected_at_block: Number(checkpoint.lastBlockNumber),
    } as never);
    await prisma.chainListenerCheckpoint.update({
      where: { chainKey },
      data: { lastBlockNumber: reorg.rewindTo, lastBlockHash: '' },
    });
    logger.warn(
      `reorg detected at block ${checkpoint.lastBlockNumber}; rewinding to ${reorg.rewindTo}`,
    );
    return;
  }

  const head = await adapter.getCurrentBlockNumber();
  const targetHead = head - BigInt(env.LISTENER_CONFIRMATIONS);
  const fromBlock = checkpoint.lastBlockNumber + 1n;
  const lag = targetHead - checkpoint.lastBlockNumber;
  chainListenerLagBlocks.set({ chain: 'SALY_L3' }, lag > 0n ? Number(lag) : 0);
  if (fromBlock > targetHead) return;

  const toBlock = bigintMin(fromBlock + BigInt(env.LISTENER_BATCH_SIZE - 1), targetHead);

  const logs = watchedContracts.length
    ? await adapter.getTransferLogs({ fromBlock, toBlock, contractAddresses: watchedContracts })
    : [];

  const involved = await prisma.$queryRaw<{ address: string }[]>`
    SELECT address FROM wallets WHERE chain = 'SALY_L3'
  `;
  const ourAddresses = new Set(involved.map((r: { address: string }) => r.address.toLowerCase()));

  const relevant = logs.filter(
    (log) => ourAddresses.has(log.from.toLowerCase()) || ourAddresses.has(log.to.toLowerCase()),
  );

  for (const log of relevant) {
    await bus.publish(SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED, {
      event_id: ulid(),
      occurred_at: new Date().toISOString(),
      chain: 'SALY_L3',
      l3_network: l3NetworkId,
      block_number: Number(log.blockNumber),
      block_hash: log.blockHash,
      tx_hash: log.txHash,
      log_index: log.logIndex,
      contract_address: log.contractAddress,
      from: log.from,
      to: log.to,
      amount_minor: log.amountMinor.toString(),
      asset: 'USDC',
      confirmations_depth: env.LISTENER_CONFIRMATIONS,
    } as never);
    logger.info(`transfer ${log.txHash} ${log.from} → ${log.to} (${log.amountMinor})`);
  }

  if (l2StandardBridge) {
    const withdrawals = await fetchL2BridgeWithdrawalsForSettlement({
      l3Network: l3NetworkId,
      rpcUrl: env.L3_L3_RPC_URL,
      bridgeAddress: l2StandardBridge,
      fromBlock,
      toBlock,
    });
    const custodialWithdrawals = withdrawals.filter((w) =>
      ourAddresses.has(w.from.toLowerCase()),
    );
    for (const w of custodialWithdrawals) {
      await bus.publish(SUBJECTS.CHAIN_L3_BRIDGE_WITHDRAWAL_INITIATED, {
        event_id: ulid(),
        occurred_at: new Date().toISOString(),
        chain: 'SALY_L3',
        l3_network: l3NetworkId,
        block_number: Number(w.blockNumber),
        block_hash: w.blockHash,
        tx_hash: w.txHash,
        initiator: w.from,
        l1_recipient: w.to,
        amount_minor: w.amountMinor.toString(),
        l1_token: w.l1Token,
      } as never);
      logger.info(
        `bridge withdrawal ${w.txHash} ${w.from} → Base ${w.to} (${w.amountMinor})`,
      );
    }
  }

  const tipBlock = await adapter.getBlock(toBlock);
  await bus.publish(SUBJECTS.CHAIN_L3_BLOCK_OBSERVED, {
    event_id: ulid(),
    occurred_at: new Date().toISOString(),
    chain: 'SALY_L3',
    l3_network: l3NetworkId,
    block_number: Number(tipBlock.number),
    block_hash: tipBlock.hash!,
    timestamp: Number(tipBlock.timestamp),
  } as never);

  await prisma.chainListenerCheckpoint.update({
    where: { chainKey },
    data: { lastBlockNumber: toBlock, lastBlockHash: tipBlock.hash ?? '' },
  });
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
