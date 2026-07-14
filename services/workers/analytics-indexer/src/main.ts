import { AbiRegistry, baseRegistryEntries, l3RegistryEntries } from '@salychain/analytics-decoder';
import {
  ClickHouseBatchWriter,
  CompositeBatchWriter,
  EvmChainDriver,
  LakeBatchWriter,
  reconcileCounts,
  runBackfill,
  runTip,
  XrplChainDriver,
  type ChainDriver,
} from '@salychain/analytics-indexer';
import { BaseChainAdapter } from '@salychain/chain-base';
import { L3ChainAdapter, resolveUsdcAddress } from '@salychain/chain-l3';
import { createLogger } from '@salychain/logger';
import { initTelemetry, startWorkerObservabilityServer } from '@salychain/observability';
import { PrismaClient } from './generated/prisma/index.js';
import { PrismaCheckpointStore } from './checkpoint.js';
import { env } from './config.js';

const logger = createLogger({ service: 'analytics-indexer' });
let shuttingDown = false;
process.on('SIGTERM', () => (shuttingDown = true));
process.on('SIGINT', () => (shuttingDown = true));

initTelemetry({
  serviceName: 'analytics-indexer',
  otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  env: env.NODE_ENV,
});

const telemetryServer = startWorkerObservabilityServer({
  serviceName: 'analytics-indexer',
  port: env.METRICS_PORT,
  healthCheck: () => !shuttingDown,
});

function buildDriver(): ChainDriver {
  const registry = new AbiRegistry();
  if (env.INDEXER_CHAIN === 'base') {
    registry.registerMany(baseRegistryEntries(env.BASE_NETWORK, env.ESCROW_CONTRACT_ADDRESS));
    const adapter = new BaseChainAdapter({
      network: env.BASE_NETWORK,
      rpcUrl: env.BASE_RPC_URL,
      logger,
    });
    return new EvmChainDriver({
      chainKey: `BASE:${env.BASE_NETWORK}`,
      chainId: 'base',
      adapter,
      registry,
    });
  }
  if (env.INDEXER_CHAIN === 'l3') {
    const usdc = resolveUsdcAddress(env.L3_NETWORK);
    if (usdc) registry.registerMany(l3RegistryEntries(env.L3_NETWORK, usdc));
    const adapter = new L3ChainAdapter({
      l3Network: env.L3_NETWORK,
      ...(env.L3_RPC_URL ? { rpcUrl: env.L3_RPC_URL } : {}),
      logger,
    });
    return new EvmChainDriver({
      chainKey: `L3:${env.L3_NETWORK}`,
      chainId: env.L3_NETWORK,
      adapter,
      registry,
    });
  }
  return new XrplChainDriver({ wsUrl: env.XRPL_WS_URL, chainKey: 'XRPL:testnet' });
}

async function main(): Promise<void> {
  const prisma = new PrismaClient();
  const checkpoint = new PrismaCheckpointStore(prisma);
  const chWriter = new ClickHouseBatchWriter({
    url: env.CLICKHOUSE_URL,
    username: env.CLICKHOUSE_USER,
    password: env.CLICKHOUSE_PASSWORD,
    database: env.CLICKHOUSE_DATABASE,
  });

  const writers: import('@salychain/analytics-indexer').BatchWriter[] = [chWriter];
  if (env.LAKE_ENABLED) {
    writers.push(
      new LakeBatchWriter({
        endpoint: env.S3_ENDPOINT,
        accessKey: env.S3_ACCESS_KEY,
        secretKey: env.S3_SECRET_KEY,
        bucket: env.S3_BUCKET,
        region: env.S3_REGION,
      }),
    );
  }
  const writer = new CompositeBatchWriter(writers);
  const driver = buildDriver();
  const confirmations = BigInt(env.INDEXER_CONFIRMATIONS);

  logger.info(
    `analytics-indexer starting chain=${env.INDEXER_CHAIN} mode=${env.INDEXER_MODE} metrics :${env.METRICS_PORT}`,
  );

  const progress = (info: { from: bigint; to: bigint; head: bigint }) => {
    logger.info(`indexed ${driver.chainKey} ${info.from}-${info.to} (head ${info.head})`);
  };

  if (env.INDEXER_MODE === 'backfill') {
    await runBackfill({
      driver,
      checkpoint,
      writer,
      floor: env.BACKFILL_FLOOR,
      batchSize: env.INDEXER_BATCH_SIZE,
      concurrency: env.INDEXER_CONCURRENCY,
      confirmations,
      onProgress: progress,
    });
    const head = await driver.getHeadPosition();
    const blocks = await chWriter.countBlocks(driver.chainId);
    const transfers = await chWriter.countTransfers(driver.chainId);
    const recon = reconcileCounts({
      chainKey: driver.chainKey,
      nodeHead: head,
      indexedBlockCount: blocks,
      indexedTransferCount: transfers,
    });
    logger.info('backfill reconcile', { ...recon });
  }

  await runTip({
    driver,
    checkpoint,
    writer,
    batchSize: env.INDEXER_BATCH_SIZE,
    confirmations,
    pollIntervalMs: env.INDEXER_POLL_INTERVAL_MS,
    shouldStop: () => shuttingDown,
    onProgress: progress,
  });

  await chWriter.close();
  if ('close' in driver && typeof driver.close === 'function') {
    await (driver as XrplChainDriver).close();
  }
  await prisma.$disconnect();
  await telemetryServer.close();
}

main().catch((err) => {
  logger.error('analytics-indexer fatal', { err: (err as Error).message });
  process.exit(1);
});
