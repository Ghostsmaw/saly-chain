import { z } from 'zod';
import { loadEnv } from '@salychain/config';

export const rpcGatewayEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.string().default('info'),
  L3_NETWORK: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']).default('saly-mainnet'),
  /** Comma-separated op-geth read replica / sequencer RPC URLs (internal). */
  L3_RPC_UPSTREAM_URLS: z.string().min(1),
  /** Public listen port for JSON-RPC. */
  L3_RPC_GATEWAY_PORT: z.coerce.number().int().positive().default(9520),
  /** Max requests per client IP per minute (fail-closed on exceed). */
  L3_RPC_RATE_LIMIT_PER_MIN: z.coerce.number().int().positive().default(600),
  METRICS_PORT: z.coerce.number().int().positive().default(9111),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),
});

export type RpcGatewayEnv = z.infer<typeof rpcGatewayEnvSchema>;
export const env = loadEnv(rpcGatewayEnvSchema);

export function parseUpstreamUrls(raw: string): string[] {
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}
