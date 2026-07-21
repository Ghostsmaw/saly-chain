import { z } from 'zod';
import { loadEnv } from '@salychain/config';

export const fiatListenerEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4020),
  /** Port for the worker telemetry server (/metrics + /health). */
  METRICS_PORT: z.coerce.number().int().positive().default(9105),
  DATABASE_URL: z.string().url(),
  EXECUTION_BASE_URL: z.string().url().default('http://localhost:4003'),
  EXECUTION_INTERNAL_WEBHOOK_TOKEN: z.string().min(16),
  /** Shared secret for internal service-to-service calls (execution enforces it). */
  INTERNAL_SERVICE_TOKEN: z.string().min(16).optional(),
  PAYSTACK_SECRET_KEY: z.string().optional(),
  FLUTTERWAVE_WEBHOOK_SECRET: z.string().optional(),
  /**
   * When true, Flutterwave webhooks must also present a valid
   * `x-saly-flw-body-hmac` (HMAC-SHA256 of raw body). Enable behind a proxy
   * that stamps the header — Flutterwave's native verif-hash is not body-bound.
   */
  FLUTTERWAVE_REQUIRE_BODY_HMAC: z
    .enum(['true', 'false', '1', '0'])
    .default('false')
    .transform((v) => v === 'true' || v === '1'),
  /**
   * Number of trusted reverse proxies in front of this listener. Client IPs
   * for WEBHOOK_ALLOWED_IPS are counted from the RIGHT of X-Forwarded-For
   * (attacker-prepended entries sit on the left). 0 = trust only the socket.
   */
  TRUSTED_PROXY_HOPS: z.coerce.number().int().min(0).default(0),
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
