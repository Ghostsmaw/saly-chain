import { z } from 'zod';

export const complianceEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4004),
  DATABASE_URL: z.string().url(),
  /** embedded | chainalysis | comply | refinitiv | composite */
  COMPLIANCE_SANCTIONS_PROVIDER: z
    .enum(['embedded', 'chainalysis', 'refinitiv', 'comply', 'composite'])
    .default('embedded'),
  COMPLIANCE_KYC_PROVIDER: z.enum(['manual', 'sumsub', 'onfido', 'persona']).default('manual'),
  COMPLIANCE_SANCTIONS_TIMEOUT_MS: z.coerce.number().int().positive().default(15_000),
  CHAINALYSIS_API_KEY: z.string().optional(),
  CHAINALYSIS_API_URL: z.string().url().default('https://api.chainalysis.com'),
  COMPLYADVANTAGE_API_KEY: z.string().optional(),
  COMPLYADVANTAGE_API_URL: z.string().url().default('https://api.complyadvantage.com'),
  REFINITIV_API_KEY: z.string().optional(),
  REFINITIV_API_SECRET: z.string().optional(),
  REFINITIV_GROUP_ID: z.string().optional(),
  REFINITIV_API_URL: z.string().url().default('https://api-worldcheck.refinitiv.com'),
});

export type ComplianceEnv = z.infer<typeof complianceEnvSchema>;
