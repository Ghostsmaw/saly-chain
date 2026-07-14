import { z } from 'zod';
import { loadEnv } from '@salychain/config';

export const fiatListenerEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4020),
  /** Port for the worker telemetry server (/metrics + /health). */
  METRICS_PORT: z.coerce.number().int().positive().default(9105),
  DATABASE_URL: z.string().url(),
  EXECUTION_BASE_URL: z.string().url().default('http://localhost:4003'),
  EXECUTION_INTERNAL_WEBHOOK_TOKEN: z.string().min(16),
  PAYSTACK_SECRET_KEY: z.string().optional(),
  FLUTTERWAVE_WEBHOOK_SECRET: z.string().optional(),
  /** Comma-separated allowed IPs (optional). Empty = allow all (use reverse proxy auth in prod). */
  WEBHOOK_ALLOWED_IPS: z
    .string()
    .optional()
    .transform((v) =>
      v
        ? v
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    ),
});

export type FiatListenerEnv = z.infer<typeof fiatListenerEnvSchema>;
// Note: loadEnv merges commonEnvSchema (NODE_ENV, LOG_LEVEL, OTEL_*), so the
// inferred type is broader than FiatListenerEnv — keep the inference, don't narrow.
export const env = loadEnv(fiatListenerEnvSchema);
