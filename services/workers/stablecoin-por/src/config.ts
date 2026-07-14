import { z } from 'zod';
import { loadEnv } from '@salychain/config';

export const porWorkerEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.string().default('info'),
  METRICS_PORT: z.coerce.number().int().positive().default(9108),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),
  POR_POLL_INTERVAL_MS: z.coerce.number().int().positive().default(300_000),
  STABLECOIN_BASE_URL: z.string().url().default('http://localhost:4022'),
  /** Reserve account to attest (defaults to first from stablecoin if unset). */
  POR_RESERVE_ACCOUNT_ID: z.string().uuid().optional(),
  POR_CUSTODIAN_NAME: z.string().default('primary-custodian'),
  /** Static custodian balance when POR_CUSTODIAN_URL is unset (dev). */
  POR_CUSTODIAN_BALANCE_MINOR: z.coerce.bigint().nonnegative().optional(),
  POR_CUSTODIAN_CEILING_MINOR: z.coerce.bigint().positive().optional(),
  /** HTTP custodian balance feed returning { balance_minor, authorized_ceiling_minor }. */
  POR_CUSTODIAN_URL: z.string().url().optional(),
  POR_ATTESTATION_URL: z.string().url().optional(),
  /** Drift alert threshold in minor units (default 0 = any under-collateralization). */
  POR_SUPPLY_DRIFT_ALERT_MINOR: z.coerce.bigint().nonnegative().default(0n),
  /** Submit ReserveOracle.updateAttestation on L3 after DB attestation. */
  POR_ORACLE_UPDATE_ENABLED: z.coerce.boolean().default(false),
  POR_ORACLE_OWNER_WALLET_ID: z.string().uuid().optional(),
  WALLET_BASE_URL: z.string().url().default('http://localhost:4002'),
  L3_NETWORK: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']).default('saly-testnet'),
  L3_L3_RPC_URL: z.string().url().default('http://127.0.0.1:9545'),
  L3_SALYSD_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  L3_RESERVE_ORACLE_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
});

export type PorWorkerEnv = z.infer<typeof porWorkerEnvSchema>;
export const env = loadEnv(porWorkerEnvSchema);
