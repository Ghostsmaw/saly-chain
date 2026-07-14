import { z } from 'zod';

export const webhooksEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4010),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  NATS_URL: z.string().default('nats://localhost:4222'),
  DELIVERY_TIMEOUT_MS: z.coerce.number().int().positive().default(10_000),
  MAX_DELIVERY_ATTEMPTS: z.coerce.number().int().positive().default(8),
  DELIVERY_BASE_BACKOFF_MS: z.coerce.number().int().positive().default(2_000),
  SIGNING_SECRET_BYTES: z.coerce.number().int().min(16).max(64).default(32),
});

export type WebhooksEnv = z.infer<typeof webhooksEnvSchema>;

export const WEBHOOKS_ENV = Symbol('WEBHOOKS_ENV');
