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
  /** Access JWT lifetime. Prefer ≤15m in production when refresh cookies are used. */
  JWT_ACCESS_TTL_SEC: z.coerce.number().int().positive().default(900),
  /** Opaque refresh token lifetime (rotation on every use). */
  JWT_REFRESH_TTL_SEC: z.coerce.number().int().positive().default(2_592_000),
  DEFAULT_RATE_LIMIT_PER_MIN: z.coerce.number().int().positive().default(600),
  /** Consecutive failed logins before the account is temporarily locked. */
  LOGIN_MAX_FAILURES: z.coerce.number().int().min(3).default(5),
  /** Account lockout duration after too many failed logins. */
  LOGIN_LOCKOUT_MINUTES: z.coerce.number().int().positive().default(15),
  /** Per-email login attempts allowed per minute (pre-hash throttle). */
  LOGIN_ATTEMPTS_PER_MINUTE: z.coerce.number().int().positive().default(10),
  // Optional super-admin bootstrap. Seeded once at startup ONLY when both are
  // explicitly set (see AuthService.onApplicationBootstrap) — no built-in default.
  SUPER_ADMIN_EMAIL: z.string().email().optional(),
  SUPER_ADMIN_PASSWORD: z.string().min(12).optional(),
  /** Shared secret for service-to-service super-admin provisioning (admin service). */
  IDENTITY_INTERNAL_ADMIN_TOKEN: z.string().min(16).optional(),
  /** Shared secret for internal service-to-service calls. Required in production. */
  INTERNAL_SERVICE_TOKEN: z.string().min(16).optional(),
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
