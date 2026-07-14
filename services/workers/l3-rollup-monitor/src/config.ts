import { z } from 'zod';

export const l3MonitorEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.string().default('info'),
  NATS_URL: z.string().default('nats://localhost:4222'),
  L3_NETWORK: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']).default('saly-devnet'),
  L3_SETTLEMENT_MODE: z.enum(['legacy', 'fault_proofs']).default('legacy'),
  L3_SETTLEMENT_RPC_URL: z.string().url().optional(),
  /** Deployed L2OutputOracle on Base — legacy settlement path */
  L3_L2_OUTPUT_ORACLE: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .optional(),
  /** DisputeGameFactory on Base — fault-proof settlement path (D3 production) */
  L3_DISPUTE_GAME_FACTORY: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .optional(),
  L3_POLL_INTERVAL_MS: z.coerce.number().int().positive().default(15_000),
  L3_LOOKBACK_BLOCKS: z.coerce.number().int().positive().default(10_000),
  L3_MONITOR_HEALTH_PORT: z.coerce.number().int().positive().default(4098),
  L3_DEPLOYMENTS_FILE: z.string().optional(),
  /** Port for the Prometheus telemetry server (/metrics + /health). */
  METRICS_PORT: z.coerce.number().int().positive().default(9104),
  /** OTLP endpoint for trace export (optional; tracing is disabled when unset). */
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),
});

export type L3MonitorEnv = z.infer<typeof l3MonitorEnvSchema>;

export function loadL3MonitorEnv(): L3MonitorEnv {
  return l3MonitorEnvSchema.parse(process.env);
}
