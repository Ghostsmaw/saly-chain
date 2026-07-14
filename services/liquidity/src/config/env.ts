import { z } from 'zod';

export const LIQUIDITY_ENV = Symbol('LIQUIDITY_ENV');

export const liquidityEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4006),
  DATABASE_URL: z.string().url(),
  /** stub | coinbase | frankfurter | composite (coinbase → frankfurter [→ stub if fallback]) */
  LIQUIDITY_RATE_PROVIDER: z.enum(['stub', 'coinbase', 'frankfurter', 'composite']).default('composite'),
  /** When true, composite chain may fall back to stub rates (dev only). */
  LIQUIDITY_RATE_STUB_FALLBACK: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
  LIQUIDITY_QUOTE_TTL_SECONDS: z.coerce.number().int().positive().default(30),
  LIQUIDITY_QUOTE_SIGNING_SECRET: z.string().min(8),
  /** In-memory FX cache TTL. Set 0 to disable. */
  LIQUIDITY_RATE_CACHE_TTL_MS: z.coerce.number().int().min(0).default(60_000),
  COINBASE_API_URL: z.string().url().default('https://api.coinbase.com'),
  FRANKFURTER_API_URL: z.string().url().default('https://api.frankfurter.app'),
  /** Base network for on-chain DEX quotes (Uniswap V3 QuoterV2). */
  BASE_NETWORK: z.enum(['base-mainnet', 'base-sepolia']).default('base-sepolia'),
  BASE_RPC_URL: z.string().url().default('https://sepolia.base.org'),
  /** When true, fall back to stub pricing if on-chain quoter fails (dev only). */
  DEX_QUOTE_STUB_FALLBACK: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
});

export type LiquidityEnv = z.infer<typeof liquidityEnvSchema>;
