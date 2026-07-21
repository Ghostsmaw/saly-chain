import 'dotenv/config';
import { z, type ZodError, type ZodObject, type ZodRawShape } from 'zod';

/**
 * Schema-validated environment loader.
 *
 * Usage:
 *   const env = loadEnv(myServiceSchema);
 *
 * Fails fast at process start if any required env var is missing or invalid —
 * we never want a service to boot in a half-configured state and silently
 * accept traffic.
 */

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

export const commonEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
    .default('info'),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),
  SENTRY_DSN: z.string().url().optional(),
});
export type CommonEnv = z.infer<typeof commonEnvSchema>;

export function loadEnv<S extends ZodRawShape>(
  schema: ZodObject<S>,
): z.infer<typeof commonEnvSchema> & z.infer<ZodObject<S>> {
  const merged = commonEnvSchema.merge(schema);
  const result = merged.safeParse(process.env);
  if (!result.success) {
    throw new ConfigError(formatZodError(result.error));
  }
  return result.data as z.infer<typeof commonEnvSchema> & z.infer<ZodObject<S>>;
}

export { isIpAllowed } from './ip-match.js';
export { assertProductionPosture, type ProdGuardRule } from './prod-guard.js';
export {
  INTERNAL_AUTH_HEADER,
  constantTimeEquals,
  internalAuthMiddleware,
  type InternalAuthOptions,
} from './internal-auth.js';

function formatZodError(error: ZodError): string {
  const lines = error.errors.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join('.') : '(root)';
    return `  - ${path}: ${issue.message}`;
  });
  return `Invalid environment configuration:\n${lines.join('\n')}`;
}
