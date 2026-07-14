import { z } from 'zod';
import { loadEnv } from '@salychain/config';

export const listenerEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NATS_URL: z.string().default('nats://localhost:4222'),
  XRPL_NETWORK: z.enum(['xrpl-mainnet', 'xrpl-testnet', 'xrpl-devnet']).default('xrpl-testnet'),
  XRPL_WS_URL: z.string().default('wss://s.altnet.rippletest.net:51233'),
  LISTENER_BATCH_SIZE: z.coerce.number().int().positive().default(20),
  LISTENER_POLL_INTERVAL_MS: z.coerce.number().int().positive().default(4_000),
  LISTENER_CONFIRMATIONS: z.coerce.number().int().nonnegative().default(0),
  /** Port for the worker telemetry server (/metrics + /health). */
  METRICS_PORT: z.coerce.number().int().positive().default(9110),
});

export type ListenerEnv = z.infer<typeof listenerEnvSchema>;
// Note: loadEnv merges commonEnvSchema (NODE_ENV, LOG_LEVEL, OTEL_*), so the
// inferred type is broader than ListenerEnv — keep the inference, don't narrow.
export const env = loadEnv(listenerEnvSchema);
