import { PrismaClient } from './generated/prisma/index.js';
import { XrplChainAdapter } from '@salychain/chain-xrpl';
import { EventBus, SUBJECTS } from '@salychain/events';
import { createLogger } from '@salychain/logger';
import {
  initTelemetry,
  startWorkerObservabilityServer,
  chainListenerLagBlocks,
  chainListenerBatchesTotal,
} from '@salychain/observability';
import { ulid } from 'ulid';
import { env } from './config.js';

/**
 * Polls validated XRPL ledgers for Payment transactions touching any of our
 * custodial wallet addresses and emits:
 *   - salychain.chain.xrpl.ledger_observed   (one per batch tip — liveness)
 *   - salychain.chain.xrpl.payment_observed  (one per matched Payment)
 *
 * XRPL has no reorg semantics for validated ledgers (LISTENER_CONFIRMATIONS
 * defaults to 0). We always operate on `validated` ledger results.
 */

const logger = createLogger({ service: 'chain-listener-xrpl' });
const chainKey = `XRPL:${env.XRPL_NETWORK}`;
const prisma = new PrismaClient();
const adapter = new XrplChainAdapter({ network: env.XRPL_NETWORK, wsUrl: env.XRPL_WS_URL, logger });
const bus = new EventBus({ servers: env.NATS_URL, serviceName: 'chain-listener-xrpl', logger });

let shuttingDown = false;
let busConnected = false;
process.on('SIGTERM', () => (shuttingDown = true));
process.on('SIGINT', () => (shuttingDown = true));

initTelemetry({
  serviceName: 'chain-listener-xrpl',
  otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  env: env.NODE_ENV,
});
const telemetryServer = startWorkerObservabilityServer({
  serviceName: 'chain-listener-xrpl',
  port: env.METRICS_PORT,
  healthCheck: () => busConnected && !shuttingDown,
});

async function main(): Promise<void> {
  await bus.start();
  busConnected = true;
  await adapter.connect();
  logger.info(`listening on ${chainKey} (metrics :${env.METRICS_PORT})`);

  const head = await adapter.getLedgerIndex();
  await ensureCheckpoint(head);

  while (!shuttingDown) {
    try {
      await processBatch();
      chainListenerBatchesTotal.inc({ chain: 'XRPL', outcome: 'success' });
    } catch (err) {
      chainListenerBatchesTotal.inc({ chain: 'XRPL', outcome: 'error' });
      logger.error(`batch failed: ${(err as Error).message}`);
    }
    await sleep(env.LISTENER_POLL_INTERVAL_MS);
  }

  logger.info('shutting down');
  busConnected = false;
  await adapter.disconnect();
  await bus.stop();
  await prisma.$disconnect();
  telemetryServer.close();
}

async function processBatch(): Promise<void> {
  const checkpoint = await prisma.xrplListenerCheckpoint.findUnique({ where: { chainKey } });
  if (!checkpoint) throw new Error(`missing checkpoint for ${chainKey}`);

  const head = await adapter.getLedgerIndex();
  const targetHead = head - env.LISTENER_CONFIRMATIONS;
  const fromLedger = checkpoint.lastLedgerIndex + 1;
  const lag = targetHead - checkpoint.lastLedgerIndex;
  chainListenerLagBlocks.set({ chain: 'XRPL' }, lag > 0 ? lag : 0);
  if (fromLedger > targetHead) return;

  const toLedger = Math.min(fromLedger + env.LISTENER_BATCH_SIZE - 1, targetHead);
  logger.debug?.(`processing XRPL ledgers ${fromLedger}..${toLedger}`);

  const involved = await prisma.$queryRaw<{ address: string }[]>`
    SELECT address FROM wallets WHERE chain = 'XRPL'
  `;
  const addresses = involved.map((r) => r.address);

  const payments = await adapter.getPayments({ fromLedger, toLedger, addresses });

  for (const payment of payments) {
    await bus.publish(SUBJECTS.CHAIN_XRPL_PAYMENT_OBSERVED, {
      event_id: ulid(),
      occurred_at: new Date().toISOString(),
      chain: 'XRPL',
      ledger_index: payment.ledgerIndex,
      close_time: payment.closeTime,
      tx_hash: payment.txHash,
      from: payment.from,
      to: payment.to,
      amount_drops: payment.amountDrops,
      iou: payment.iou,
      destination_tag: payment.destinationTag,
      fee_drops: payment.fee,
      confirmations_depth: env.LISTENER_CONFIRMATIONS,
    } as never);
    const amountLabel = payment.iou
      ? `${payment.iou.value} ${payment.iou.currency}`
      : `${payment.amountDrops} drops`;
    logger.info(`xrpl payment ${payment.txHash} ${payment.from} → ${payment.to} (${amountLabel})`);
  }

  await bus.publish(SUBJECTS.CHAIN_XRPL_LEDGER_OBSERVED, {
    event_id: ulid(),
    occurred_at: new Date().toISOString(),
    chain: 'XRPL',
    ledger_index: toLedger,
    close_time: Math.floor(Date.now() / 1000),
  } as never);

  await prisma.xrplListenerCheckpoint.update({
    where: { chainKey },
    data: { lastLedgerIndex: toLedger },
  });
}

async function ensureCheckpoint(head: number): Promise<void> {
  const existing = await prisma.xrplListenerCheckpoint.findUnique({ where: { chainKey } });
  if (existing) return;
  await prisma.xrplListenerCheckpoint.create({
    data: { chainKey, lastLedgerIndex: head - 1 },
  });
  logger.info(`bootstrapped checkpoint at ledger ${head - 1}`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

main().catch((err) => {
  logger.fatal(`listener crashed: ${(err as Error).message}`);
  process.exit(1);
});
