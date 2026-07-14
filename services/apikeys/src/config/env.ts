import { z } from 'zod';

export const apiKeysEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4009),
  DATABASE_URL: z.string().url(),
  APIKEY_HASH_PEPPER: z.string().min(16, 'pepper must be at least 16 chars'),
  DEFAULT_RATE_LIMIT_PER_MIN: z.coerce.number().int().positive().default(600),
});

export type ApiKeysEnv = z.infer<typeof apiKeysEnvSchema>;
