import { z } from 'zod';
import { loadEnv } from '@salychain/config';

export const listenerEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NATS_URL: z.string().default('nats://localhost:4222'),
  BASE_NETWORK: z.enum(['base-mainnet', 'base-sepolia']).default('base-sepolia'),
  BASE_RPC_URL: z.string().url().default('https://sepolia.base.org'),
  L3_NETWORK: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']).default('saly-devnet'),
  LISTENER_BATCH_SIZE: z.coerce.number().int().positive().default(50),
  LISTENER_POLL_INTERVAL_MS: z.coerce.number().int().positive().default(4_000),
  LISTENER_CONFIRMATIONS: z.coerce.number().int().nonnegative().default(2),
  METRICS_PORT: z.coerce.number().int().positive().default(9102),
});

export type ListenerEnv = z.infer<typeof listenerEnvSchema>;
export const env = loadEnv(listenerEnvSchema);
