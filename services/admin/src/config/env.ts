import { z } from 'zod';
import { commonEnvSchema } from '@salychain/config';

/**
 * Admin service env. Uses ADMIN_SERVICE_PORT / ADMIN_DATABASE_URL so a shared
 * process PORT (e.g. 4012 from identity in turbo dev) cannot hijack this service.
 */
export const adminEnvSchema = commonEnvSchema.extend({
  ADMIN_SERVICE_PORT: z.coerce.number().int().positive().default(4014),
  ADMIN_DATABASE_URL: z
    .string()
    .url()
    .default('postgresql://salychain:salychain@localhost:5433/salychain_admin?schema=public'),
  IDENTITY_BASE_URL: z.string().url().default('http://localhost:4012'),
  IDENTITY_INTERNAL_ADMIN_TOKEN: z.string().min(16).optional(),
  ADMIN_CONSOLE_URL: z.string().url().default('http://localhost:3001'),
  RESEND_API_KEY: z.string().min(8).optional(),
  RESEND_FROM_EMAIL: z.string().min(3).default('onboarding@resend.dev'),
});

export type AdminEnv = z.infer<typeof adminEnvSchema> & {
  /** Resolved listen port — always ADMIN_SERVICE_PORT. */
  listenPort: number;
  /** Resolved DB URL for Prisma — always ADMIN_DATABASE_URL. */
  databaseUrl: string;
};

export const ADMIN_ENV = Symbol('ADMIN_ENV');

export function resolveAdminEnv(raw: z.infer<typeof adminEnvSchema>): AdminEnv {
  return {
    ...raw,
    listenPort: raw.ADMIN_SERVICE_PORT,
    databaseUrl: raw.ADMIN_DATABASE_URL,
  };
}
