import { z } from 'zod';

export const datastreamsEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4017),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  NATS_URL: z.string().default('nats://localhost:4222'),

  // Webhook sink delivery tuning (mirrors the webhooks service).
  DELIVERY_TIMEOUT_MS: z.coerce.number().int().positive().default(10_000),
  MAX_DELIVERY_ATTEMPTS: z.coerce.number().int().positive().default(8),
  DELIVERY_BASE_BACKOFF_MS: z.coerce.number().int().positive().default(2_000),
  SIGNING_SECRET_BYTES: z.coerce.number().int().min(16).max(64).default(32),
  /// Auto-disable a stream after this many consecutive delivery failures.
  AUTO_DISABLE_THRESHOLD: z.coerce.number().int().positive().default(50),

  // Kafka / Redpanda sink. Disabled by default so the service boots without a
  // broker; KAFKA streams are rejected at create-time unless this is enabled.
  DATASTREAMS_KAFKA_ENABLED: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
  DATASTREAMS_KAFKA_BROKERS: z.string().default('localhost:9092'),
  DATASTREAMS_KAFKA_CLIENT_ID: z.string().default('salychain-datastreams'),
  /// Optional prefix enforced on every Kafka topic a stream may target. Keeps a
  /// tenant from producing onto arbitrary internal topics. Empty = no prefix.
  DATASTREAMS_KAFKA_TOPIC_PREFIX: z.string().default('salychain.datastreams.'),
  /** Shared secret for internal service-to-service calls. Required in production. */
  INTERNAL_SERVICE_TOKEN: z.string().min(16).optional(),
});

export type DatastreamsEnv = z.infer<typeof datastreamsEnvSchema>;

export const DATASTREAMS_ENV = Symbol('DATASTREAMS_ENV');
