import { z } from 'zod';

export const agentsEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4011),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  DATABASE_URL: z.string().url(),
  NATS_URL: z.string().default('nats://localhost:4222'),
  WALLET_BASE_URL: z.string().url().default('http://localhost:4002'),
  EXECUTION_BASE_URL: z.string().url().default('http://localhost:4003'),
  DEFAULT_PER_TX_CAP_MINOR: z.coerce.bigint().default(100_000_000n),
  DEFAULT_DAILY_CAP_MINOR: z.coerce.bigint().default(500_000_000n),
});

export type AgentsEnv = z.infer<typeof agentsEnvSchema>;
