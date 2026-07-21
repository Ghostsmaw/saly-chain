import { z } from 'zod';

const bool = (def: 'true' | 'false') =>
  z
    .enum(['true', 'false'])
    .default(def)
    .transform((v) => v === 'true');

export const datasharesEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4018),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().default('redis://localhost:6379'),

  // ── Curated dataset source (read-only ClickHouse) ─────────────────────────
  CLICKHOUSE_URL: z.string().url().default('http://localhost:8123'),
  CLICKHOUSE_USER: z.string().default('salychain'),
  CLICKHOUSE_PASSWORD: z.string().default('salychain'),
  CLICKHOUSE_DATABASE: z.string().default('salychain_analytics'),
  /// Hard ceiling on rows a single share run may export (defense vs runaway scans).
  SHARE_RUN_MAX_ROWS: z.coerce.number().int().positive().default(1_000_000),
  QUERY_TIMEOUT_SECONDS: z.coerce.number().int().positive().default(60),

  /// HMAC key used to pseudonymize (hash) PII columns deterministically. MUST be
  /// set to a stable, secret value in production so hashes are consistent across
  /// runs (and unguessable). Defaulted only for local dev.
  DATASHARES_REDACTION_SECRET: z.string().min(16).default('dev-redaction-secret-change-me'),

  // ── Object-store (S3 / MinIO) export destination ──────────────────────────
  S3_ENDPOINT: z.string().url().default('http://localhost:9000'),
  S3_ACCESS_KEY: z.string().default('salychain'),
  S3_SECRET_KEY: z.string().default('salychain-dev'),
  S3_BUCKET: z.string().default('salychain-lake'),
  S3_REGION: z.string().default('us-east-1'),
  /// Key prefix under which all share exports are written.
  DATASHARES_EXPORT_PREFIX: z.string().default('exports'),

  // ── Warehouse-native destinations (config-validated, disabled by default) ──
  // Snowflake Secure Share / BigQuery Analytics Hub / Databricks Delta Share
  // require vendor drivers + credentials. Until enabled (and the driver wired),
  // shares targeting them are rejected at create-time. See README.
  DATASHARES_SNOWFLAKE_ENABLED: bool('false'),
  DATASHARES_BIGQUERY_ENABLED: bool('false'),
  DATASHARES_DATABRICKS_ENABLED: bool('false'),
  /** Shared secret for internal service-to-service calls. Required in production. */
  INTERNAL_SERVICE_TOKEN: z.string().min(16).optional(),
});

export type DatasharesEnv = z.infer<typeof datasharesEnvSchema>;

export const DATASHARES_ENV = Symbol('DATASHARES_ENV');
