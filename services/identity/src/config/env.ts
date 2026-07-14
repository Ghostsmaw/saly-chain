import { z } from 'zod';

export const identityEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4012),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  DATABASE_URL: z.string().url(),
  JWT_ALG: z.enum(['HS256', 'RS256']).default('HS256'),
  JWT_SECRET: z.string().min(16).optional(),
  JWT_PRIVATE_KEY_PEM: z.string().optional(),
  JWT_PUBLIC_KEY_PEM: z.string().optional(),
  JWT_KEY_ID: z.string().default('salychain-identity-1'),
  JWT_ISSUER: z.string().default('salychain'),
  JWT_AUDIENCE: z.string().default('salychain.consumer'),
  JWT_ACCESS_TTL_SEC: z.coerce.number().int().positive().default(3600),
  DEFAULT_RATE_LIMIT_PER_MIN: z.coerce.number().int().positive().default(600),
  // Optional super-admin bootstrap. In development a default account is seeded
  // when these are unset (see AuthService.onApplicationBootstrap).
  SUPER_ADMIN_EMAIL: z.string().email().optional(),
  SUPER_ADMIN_PASSWORD: z.string().min(8).optional(),
  /** Shared secret for service-to-service super-admin provisioning (admin service). */
  IDENTITY_INTERNAL_ADMIN_TOKEN: z.string().min(16).optional(),
});

export type IdentityEnv = z.infer<typeof identityEnvSchema>;

export function assertIdentityJwtConfig(env: IdentityEnv): void {
  if (env.JWT_ALG === 'HS256' && !env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required when JWT_ALG=HS256');
  }
  if (env.JWT_ALG === 'RS256' && (!env.JWT_PRIVATE_KEY_PEM || !env.JWT_PUBLIC_KEY_PEM)) {
    throw new Error('JWT_PRIVATE_KEY_PEM and JWT_PUBLIC_KEY_PEM are required when JWT_ALG=RS256');
  }
}
