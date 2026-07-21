import { z } from 'zod';

export const ledgerEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4001),
  DATABASE_URL: z.string().url(),
  /** Shared secret for internal service-to-service calls. Required in production. */
  INTERNAL_SERVICE_TOKEN: z.string().min(16).optional(),
});

export type LedgerEnv = z.infer<typeof ledgerEnvSchema>;
