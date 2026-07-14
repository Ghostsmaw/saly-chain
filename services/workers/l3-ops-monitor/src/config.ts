import { z } from 'zod';
import { loadEnv } from '@salychain/config';

export const opsMonitorEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.string().default('info'),
  L3_NETWORK: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']).default('saly-mainnet'),
  L3_L3_RPC_URL: z.string().url().default('http://127.0.0.1:9545'),
  L3_SETTLEMENT_RPC_URL: z.string().url().optional(),
  L3_SETTLEMENT_MODE: z.enum(['legacy', 'fault_proofs']).default('legacy'),
  L3_L2_OUTPUT_ORACLE: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  L3_DISPUTE_GAME_FACTORY: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  L3_CONDUCTOR_URLS: z.string().optional(),
  L3_RPC_UPSTREAM_URLS: z.string().optional(),
  L3_POLL_INTERVAL_MS: z.coerce.number().int().positive().default(30_000),
  L3_OPS_HEALTH_PORT: z.coerce.number().int().positive().default(9109),
  METRICS_PORT: z.coerce.number().int().positive().default(9107),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),
});

export type OpsMonitorEnv = z.infer<typeof opsMonitorEnvSchema>;
export const env = loadEnv(opsMonitorEnvSchema);

export function splitCsv(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}
