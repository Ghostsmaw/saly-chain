import { z } from 'zod';

export const ledgerEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4001),
  DATABASE_URL: z.string().url(),
});

export type LedgerEnv = z.infer<typeof ledgerEnvSchema>;
