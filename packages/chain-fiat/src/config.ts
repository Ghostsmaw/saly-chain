import { z } from 'zod';

export const fiatEnvSchema = z.object({
  FIAT_PSP_PROVIDER: z.enum(['stub', 'flutterwave', 'paystack', 'composite']).default('stub'),
  FLUTTERWAVE_SECRET_KEY: z.string().optional(),
  FLUTTERWAVE_BASE_URL: z.string().url().default('https://api.flutterwave.com/v3'),
  PAYSTACK_SECRET_KEY: z.string().optional(),
  PAYSTACK_BASE_URL: z.string().url().default('https://api.paystack.co'),
  /** Stub auto-settlement latency (ms) when provider=stub. */
  FIAT_STUB_SETTLEMENT_MS: z.coerce.number().int().positive().default(1_500),
});

export type FiatEnv = z.infer<typeof fiatEnvSchema>;

export function pickFiatEnv(raw: Record<string, string | undefined> = process.env as Record<string, string>): FiatEnv {
  return fiatEnvSchema.parse(raw);
}
