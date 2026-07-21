import { z } from 'zod';

export const intentEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4008),
  DATABASE_URL: z.string().url(),
  NATS_URL: z.string().default('nats://localhost:4222'),
  EXECUTION_BASE_URL: z.string().url().default('http://localhost:4003'),
  AGENTS_BASE_URL: z.string().url().default('http://localhost:4011'),
  /** Shared secret for internal service-to-service calls. Required in production. */
  INTERNAL_SERVICE_TOKEN: z.string().min(16).optional(),
});

export type IntentEnv = z.infer<typeof intentEnvSchema>;
