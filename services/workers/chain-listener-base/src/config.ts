import { z } from 'zod';
import { loadEnv } from '@salychain/config';

export const listenerEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NATS_URL: z.string().default('nats://localhost:4222'),
  BASE_NETWORK: z.enum(['base-mainnet', 'base-sepolia']).default('base-sepolia'),
  BASE_RPC_URL: z.string().url().default('https://sepolia.base.org'),
  LISTENER_BATCH_SIZE: z.coerce.number().int().positive().default(50),
  LISTENER_POLL_INTERVAL_MS: z.coerce.number().int().positive().default(4_000),
  LISTENER_CONFIRMATIONS: z.coerce.number().int().nonnegative().default(2),
  /** Port for the worker telemetry server (/metrics + /health). */
  METRICS_PORT: z.coerce.number().int().positive().default(9101),
  /** Deployed SalyEscrow contract — when set, DealFunded logs are indexed. */
  ESCROW_CONTRACT_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
});

export type ListenerEnv = z.infer<typeof listenerEnvSchema>;
// Note: loadEnv merges commonEnvSchema (NODE_ENV, LOG_LEVEL, OTEL_*), so the
// inferred type is broader than ListenerEnv — keep the inference, don't narrow.
export const env = loadEnv(listenerEnvSchema);
