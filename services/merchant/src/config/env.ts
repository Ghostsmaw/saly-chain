import { z } from 'zod';

export const merchantEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4021),
  DATABASE_URL: z.string().url(),
  EXECUTION_BASE_URL: z.string().url().default('http://localhost:4003'),
  INTENT_BASE_URL: z.string().url().default('http://localhost:4008'),
  /** Shown to merchants when creating payment links (hosted checkout URL prefix). */
  MERCHANT_CHECKOUT_BASE_URL: z.string().url().default('http://localhost:3002/pay'),
  MERCHANT_CHECKOUT_POLL_MS: z.coerce.number().int().positive().default(15_000),
});

export type MerchantEnv = z.infer<typeof merchantEnvSchema>;
export const MERCHANT_ENV = Symbol('MERCHANT_ENV');
