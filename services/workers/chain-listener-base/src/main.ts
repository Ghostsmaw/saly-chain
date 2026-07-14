import { PrismaClient } from './generated/prisma/index.js';
import type { Address } from 'viem';
import { isAddress } from 'viem';
import { BaseChainAdapter, BASE_ASSETS } from '@salychain/chain-base';
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
 * Polls Base for ERC-20 Transfer logs against our custodial wallet addresses,
 * filters for events we care about, and emits:
 *   - salychain.chain.base.block_observed   (one per block batch)
 *   - salychain.chain.base.transfer_observed (one per matched Transfer log)
 *
 * Checkpoints to Postgres after each successful batch so a restart resumes
 * exactly where we left off — no double-emissions, no missed events.
 *
 * Confirmations: we trail the head by `LISTENER_CONFIRMATIONS` blocks before
 * emitting; this avoids settling on a reorged tip.
 */

const logger = createLogger({ service: 'chain-listener-base' });
const chainKey = `BASE:${env.BASE_NETWORK}`;
const prisma = new PrismaClient();
const adapter = new BaseChainAdapter({ network: env.BASE_NETWORK, rpcUrl: env.BASE_RPC_URL, logger });
const bus = new EventBus({ servers: env.NATS_URL, serviceName: 'chain-listener-base', logger });

let shuttingDown = false;
let busConnected = false;
process.on('SIGTERM', () => (shuttingDown = true));
process.on('SIGINT', () => (shuttingDown = true));

initTelemetry({
  serviceName: 'chain-listener-base',
  otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  env: env.NODE_ENV,
});
const telemetryServer = startWorkerObservabilityServer({
  serviceName: 'chain-listener-base',
  port: env.METRICS_PORT,
  healthCheck: () => busConnected && !shuttingDown,
});

async function main(): Promise<void> {
  await bus.start();
  busConnected = true;
  logger.info(`listening on ${chainKey} (metrics :${env.METRICS_PORT})`);

  // Bootstrap the checkpoint to "current head - 1" on first run.
  const head = await adapter.getCurrentBlockNumber();
  await ensureCheckpoint(head);

  // The set of contracts we care about — USDC on this network.
  const usdcAddress = BASE_ASSETS[env.BASE_NETWORK].USDC.address as Address | undefined;
  const watchedContracts = usdcAddress ? [usdcAddress] : [];
  const escrowAddress =
    env.ESCROW_CONTRACT_ADDRESS && isAddress(env.ESCROW_CONTRACT_ADDRESS)
      ? (env.ESCROW_CONTRACT_ADDRESS as Address)
      : undefined;

  while (!shuttingDown) {
    try {
      await processBatch(watchedContracts, escrowAddress);
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

async function processBatch(watchedContracts: Address[], escrowAddress?: Address): Promise<void> {
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
    logger.warn(
      `reorg detected at block ${checkpoint.lastBlockNumber}; rewinding to ${reorg.rewindTo}`,
    );
    return;
  }

  const head = await adapter.getCurrentBlockNumber();
  const targetHead = head - BigInt(env.LISTENER_CONFIRMATIONS);
  const fromBlock = checkpoint.lastBlockNumber + 1n;
  const lag = targetHead - checkpoint.lastBlockNumber;
  chainListenerLagBlocks.set({ chain: 'BASE' }, lag > 0n ? Number(lag) : 0);
  if (fromBlock > targetHead) return;

  const toBlock = bigintMin(fromBlock + BigInt(env.LISTENER_BATCH_SIZE - 1), targetHead);
  logger.debug?.(`processing blocks ${fromBlock}..${toBlock}`);

  const logs = watchedContracts.length
    ? await adapter.getTransferLogs({ fromBlock, toBlock, contractAddresses: watchedContracts })
    : [];

  // Address lookup: only emit transfer_observed for logs that touch one of our
  // custodial wallets (either side). Lives in the wallet DB (shared in dev).
  const involved = await prisma.$queryRaw<{ address: string }[]>`
    SELECT address FROM wallets WHERE chain = 'BASE'
  `;
  const ourAddresses = new Set(involved.map((r) => r.address.toLowerCase()));

  const relevant = logs.filter(
    (log) => ourAddresses.has(log.from.toLowerCase()) || ourAddresses.has(log.to.toLowerCase()),
  );

  for (const log of relevant) {
    await bus.publish(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, {
      event_id: ulid(),
      occurred_at: new Date().toISOString(),
      chain: 'BASE',
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

  if (escrowAddress) {
    const dealLogs = await adapter.getDealFundedLogs({ fromBlock, toBlock, escrowAddress });
    const relevantDeals = dealLogs.filter((log) => ourAddresses.has(log.payer.toLowerCase()));

    for (const log of relevantDeals) {
      await bus.publish(SUBJECTS.CHAIN_BASE_DEAL_FUNDED, {
        event_id: ulid(),
        occurred_at: new Date().toISOString(),
        chain: 'BASE',
        block_number: Number(log.blockNumber),
        block_hash: log.blockHash,
        tx_hash: log.txHash,
        log_index: log.logIndex,
        escrow_contract: escrowAddress,
        deal_id: log.dealId,
        payer: log.payer,
        payee: log.payee,
        token: log.token,
        amount_minor: log.amountMinor.toString(),
        deadline: log.deadline.toString(),
      } as never);
      logger.info(`DealFunded ${log.dealId} payer=${log.payer} payee=${log.payee} tx=${log.txHash}`);
    }

    const releasedLogs = await adapter.getDealReleasedLogs({ fromBlock, toBlock, escrowAddress });
    for (const log of releasedLogs) {
      await bus.publish(SUBJECTS.CHAIN_BASE_DEAL_RELEASED, {
        event_id: ulid(),
        occurred_at: new Date().toISOString(),
        chain: 'BASE',
        block_number: Number(log.blockNumber),
        block_hash: log.blockHash,
        tx_hash: log.txHash,
        log_index: log.logIndex,
        escrow_contract: escrowAddress,
        deal_id: log.dealId,
        payee: log.payee,
        amount_minor: log.amountMinor.toString(),
      } as never);
      logger.info(`DealReleased ${log.dealId} payee=${log.payee} tx=${log.txHash}`);
    }

    const refundedLogs = await adapter.getDealRefundedLogs({ fromBlock, toBlock, escrowAddress });
    for (const log of refundedLogs) {
      await bus.publish(SUBJECTS.CHAIN_BASE_DEAL_REFUNDED, {
        event_id: ulid(),
        occurred_at: new Date().toISOString(),
        chain: 'BASE',
        block_number: Number(log.blockNumber),
        block_hash: log.blockHash,
        tx_hash: log.txHash,
        log_index: log.logIndex,
        escrow_contract: escrowAddress,
        deal_id: log.dealId,
        payer: log.payer,
        amount_minor: log.amountMinor.toString(),
      } as never);
      logger.info(`DealRefunded ${log.dealId} payer=${log.payer} tx=${log.txHash}`);
    }
  }

  // Always emit at least one block_observed so monitoring can see liveness.
  const tipBlock = await adapter.getBlock(toBlock);
  await bus.publish(SUBJECTS.CHAIN_BASE_BLOCK_OBSERVED, {
    event_id: ulid(),
    occurred_at: new Date().toISOString(),
    chain: 'BASE',
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
