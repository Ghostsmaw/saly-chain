import { z } from 'zod';

export const stablecoinEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.string().default('info'),
  PORT: z.coerce.number().int().positive().default(4022),
  DATABASE_URL: z.string().url(),
  NATS_URL: z.string().default('nats://localhost:4222'),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().optional(),
  /** Stale attestation threshold — mint requests rejected when reserve asOf is older. */
  STABLECOIN_ATTESTATION_MAX_AGE_MS: z.coerce.number().int().positive().default(86_400_000),
  /** Default reserve account id for mint requests (dev bootstrap). */
  STABLECOIN_DEFAULT_RESERVE_ACCOUNT_ID: z.string().uuid().optional(),
  EXECUTION_BASE_URL: z.string().url().default('http://localhost:4003'),
  L3_NETWORK: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']).default('saly-testnet'),
  L3_L3_RPC_URL: z.string().url().optional(),
  L3_SALYSD_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  L3_RESERVE_ORACLE_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
});

export type StablecoinEnv = z.infer<typeof stablecoinEnvSchema>;
export const STABLECOIN_ENV = Symbol('STABLECOIN_ENV');
