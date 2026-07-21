import { z } from 'zod';

export const analyticsIngestEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4015),
  NATS_URL: z.string().default('nats://localhost:4222'),
  CLICKHOUSE_URL: z.string().url().default('http://localhost:8123'),
  CLICKHOUSE_USER: z.string().default('salychain'),
  CLICKHOUSE_PASSWORD: z.string().default('salychain'),
  CLICKHOUSE_DATABASE: z.string().default('salychain_analytics'),
  /** Shared secret for internal service-to-service calls. Required in production. */
  INTERNAL_SERVICE_TOKEN: z.string().min(16).optional(),
});

export type AnalyticsIngestEnv = z.infer<typeof analyticsIngestEnvSchema>;
