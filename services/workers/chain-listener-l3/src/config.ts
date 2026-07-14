import { z } from 'zod';
import { loadEnv } from '@salychain/config';

export const l3ListenerEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NATS_URL: z.string().default('nats://localhost:4222'),
  L3_NETWORK: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']).default('saly-devnet'),
  L3_L3_RPC_URL: z.string().url().default('http://127.0.0.1:9545'),
  L3_USDC_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  LISTENER_BATCH_SIZE: z.coerce.number().int().positive().default(50),
  LISTENER_POLL_INTERVAL_MS: z.coerce.number().int().positive().default(4_000),
  LISTENER_CONFIRMATIONS: z.coerce.number().int().nonnegative().default(2),
  /** Port for the worker telemetry server (/metrics + /health). */
  METRICS_PORT: z.coerce.number().int().positive().default(9103),
});

export type L3ListenerEnv = z.infer<typeof l3ListenerEnvSchema>;
// Note: loadEnv merges commonEnvSchema (NODE_ENV, LOG_LEVEL, OTEL_*), so the
// inferred type is broader than L3ListenerEnv — keep the inference, don't narrow.
export const env = loadEnv(l3ListenerEnvSchema);
