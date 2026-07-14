import { z } from 'zod';

export const analyticsApiEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4016),
  CLICKHOUSE_URL: z.string().url().default('http://localhost:8123'),
  CLICKHOUSE_USER: z.string().default('salychain'),
  CLICKHOUSE_PASSWORD: z.string().default('salychain'),
  CLICKHOUSE_DATABASE: z.string().default('salychain_analytics'),
  // Hard guardrails for the read path (defense in depth on top of SQL LIMITs).
  QUERY_MAX_ROWS: z.coerce.number().int().positive().default(10_000),
  QUERY_TIMEOUT_SECONDS: z.coerce.number().int().positive().default(10),
  QUERY_DEFAULT_LIMIT: z.coerce.number().int().positive().default(50),
  QUERY_MAX_LIMIT: z.coerce.number().int().positive().default(1_000),
});

export type AnalyticsApiEnv = z.infer<typeof analyticsApiEnvSchema>;
