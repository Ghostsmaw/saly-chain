import { z } from 'zod';

export const apiKeysEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4009),
  DATABASE_URL: z.string().url(),
  APIKEY_HASH_PEPPER: z.string().min(16, 'pepper must be at least 16 chars'),
  DEFAULT_RATE_LIMIT_PER_MIN: z.coerce.number().int().positive().default(600),
  /** Shared secret for internal service-to-service calls. Required in production. */
  INTERNAL_SERVICE_TOKEN: z.string().min(16).optional(),
  /**
   * Shared platform Redis (same instance the gateway uses). When set, key
   * revocation immediately evicts the gateway's verify cache instead of
   * waiting out its TTL.
   */
  REDIS_URL: z.string().url().optional(),
});

export type ApiKeysEnv = z.infer<typeof apiKeysEnvSchema>;
