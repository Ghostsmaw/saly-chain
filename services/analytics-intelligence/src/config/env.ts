import { z } from 'zod';

const bool = (def: 'true' | 'false') =>
  z
    .enum(['true', 'false'])
    .default(def)
    .transform((v) => v === 'true');

export const intelligenceEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4019),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().default('redis://localhost:6379'),

  // ── Analytics source (read-only ClickHouse) ───────────────────────────────
  CLICKHOUSE_URL: z.string().url().default('http://localhost:8123'),
  CLICKHOUSE_USER: z.string().default('salychain'),
  CLICKHOUSE_PASSWORD: z.string().default('salychain'),
  CLICKHOUSE_DATABASE: z.string().default('salychain_analytics'),
  QUERY_MAX_ROWS: z.coerce.number().int().positive().default(500_000),
  QUERY_TIMEOUT_SECONDS: z.coerce.number().int().positive().default(60),

  // ── Entity resolution ─────────────────────────────────────────────────────
  /// Lookback window (days) of transfers fed into a resolution run.
  RESOLUTION_LOOKBACK_DAYS: z.coerce.number().int().min(1).max(365).default(90),
  /// Minimum shared-counterparty co-occurrences before two addresses are linked.
  RESOLUTION_MIN_SHARED: z.coerce.number().int().min(1).max(100).default(2),
  /// Safety cap on addresses considered in a single run.
  RESOLUTION_MAX_ADDRESSES: z.coerce.number().int().positive().default(100_000),

  // ── Embeddings / vector search ─────────────────────────────────────────────
  /// Dimensionality of the deterministic local embedder (no external model).
  EMBEDDING_DIM: z.coerce.number().int().min(8).max(1024).default(64),

  // ── Natural-language analytics ─────────────────────────────────────────────
  // The NL planner uses a deterministic rule-based planner by default. An LLM
  // provider can be enabled later; until then LLM-only questions fall back to
  // the rule planner (and return a clear "unsupported" plan if it can't map).
  INTELLIGENCE_LLM_ENABLED: bool('false'),
});

export type IntelligenceEnv = z.infer<typeof intelligenceEnvSchema>;

export const INTELLIGENCE_ENV = Symbol('INTELLIGENCE_ENV');
