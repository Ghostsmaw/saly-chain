import { z } from 'zod';
import { loadEnv } from '@salychain/config';

export const indexerEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  /** base | l3 | xrpl */
  INDEXER_CHAIN: z.enum(['base', 'l3', 'xrpl']).default('base'),
  /** backfill runs to head once, then switches to tip unless INDEXER_MODE=tip only */
  INDEXER_MODE: z.enum(['backfill', 'tip']).default('backfill'),
  BACKFILL_FLOOR: z.coerce.bigint().nonnegative().default(0n),
  INDEXER_BATCH_SIZE: z.coerce.number().int().positive().default(100),
  INDEXER_CONCURRENCY: z.coerce.number().int().positive().default(2),
  INDEXER_CONFIRMATIONS: z.coerce.number().int().nonnegative().default(2),
  INDEXER_POLL_INTERVAL_MS: z.coerce.number().int().positive().default(5_000),
  METRICS_PORT: z.coerce.number().int().positive().default(9106),
  // EVM (Base)
  BASE_NETWORK: z.enum(['base-mainnet', 'base-sepolia']).default('base-sepolia'),
  BASE_RPC_URL: z.string().url().default('https://sepolia.base.org'),
  ESCROW_CONTRACT_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  // L3
  L3_NETWORK: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']).default('saly-devnet'),
  L3_RPC_URL: z.string().url().optional(),
  // XRPL
  XRPL_WS_URL: z.string().default('wss://s.altnet.rippletest.net:51233'),
  // ClickHouse
  CLICKHOUSE_URL: z.string().url().default('http://localhost:8123'),
  CLICKHOUSE_USER: z.string().default('salychain'),
  CLICKHOUSE_PASSWORD: z.string().default('salychain'),
  CLICKHOUSE_DATABASE: z.string().default('salychain_analytics'),
  // Lake (MinIO / S3)
  LAKE_ENABLED: z.coerce.boolean().default(true),
  S3_ENDPOINT: z.string().url().default('http://localhost:9000'),
  S3_ACCESS_KEY: z.string().default('salychain'),
  S3_SECRET_KEY: z.string().default('salychain-dev'),
  S3_BUCKET: z.string().default('salychain-lake'),
  S3_REGION: z.string().default('us-east-1'),
});

export const env = loadEnv(indexerEnvSchema);
