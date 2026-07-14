import { z } from 'zod';

export const RISK_ENV = Symbol('RISK_ENV');

/** DI token for the optional Intelligence client (null when disabled). */
export const INTELLIGENCE_CLIENT = Symbol('INTELLIGENCE_CLIENT');

export const riskEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4005),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  RISK_REVIEW_THRESHOLD: z.coerce.number().int().min(0).max(100).default(60),
  RISK_BLOCK_THRESHOLD: z.coerce.number().int().min(0).max(100).default(85),

  // ── Intelligence (B8) feature enrichment ───────────────────────────────────
  // When enabled, risk pulls a counterparty entity signal (risk score +
  // sanctioned flag) from the Intelligence service. Fail-open: any error or
  // timeout is ignored and scoring falls back to the rule-only engine.
  RISK_INTELLIGENCE_ENABLED: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
  INTELLIGENCE_BASE_URL: z.string().url().default('http://localhost:4019'),
});

export type RiskEnv = z.infer<typeof riskEnvSchema>;
