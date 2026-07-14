import { z } from 'zod';

export const gatewayEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  APIKEYS_BASE_URL: z.string().url().default('http://localhost:4009'),
  INTENT_BASE_URL: z.string().url().default('http://localhost:4008'),
  EXECUTION_BASE_URL: z.string().url().default('http://localhost:4003'),
  WEBHOOKS_BASE_URL: z.string().url().default('http://localhost:4010'),
  AGENTS_BASE_URL: z.string().url().default('http://localhost:4011'),
  IDENTITY_BASE_URL: z.string().url().default('http://localhost:4012'),
  WALLET_BASE_URL: z.string().url().default('http://localhost:4002'),
  DATA_BASE_URL: z.string().url().default('http://localhost:4016'),
  DATASTREAMS_BASE_URL: z.string().url().default('http://localhost:4017'),
  DATASHARES_BASE_URL: z.string().url().default('http://localhost:4018'),
  INTELLIGENCE_BASE_URL: z.string().url().default('http://localhost:4019'),
  MERCHANT_BASE_URL: z.string().url().default('http://localhost:4021'),
  STABLECOIN_BASE_URL: z.string().url().default('http://localhost:4022'),
  CONTRACT_REGISTRY_BASE_URL: z.string().url().default('http://localhost:4013'),
  FINANCE_BASE_URL: z.string().url().default('http://localhost:4023'),
  GOV_BASE_URL: z.string().url().default('http://localhost:4024'),
  AGRI_BASE_URL: z.string().url().default('http://localhost:4025'),
  SCM_BASE_URL: z.string().url().default('http://localhost:4026'),
  AVIATION_BASE_URL: z.string().url().default('http://localhost:4027'),
  HEALTH_BASE_URL: z.string().url().default('http://localhost:4028'),
  EDU_BASE_URL: z.string().url().default('http://localhost:4029'),
  APIKEY_CACHE_TTL_SEC: z.coerce.number().int().positive().default(15),
  IDEMPOTENCY_WINDOW_SECONDS: z.coerce.number().int().positive().default(86_400),
  /** Shared secret for portal server-side log reads (development / internal). */
  PORTAL_INTERNAL_SECRET: z.string().min(8).optional(),
});

export type GatewayEnv = z.infer<typeof gatewayEnvSchema>;
export const GATEWAY_ENV = Symbol('GATEWAY_ENV');
