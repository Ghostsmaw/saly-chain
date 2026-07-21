import { z } from 'zod';
import { parseXrplIouIssuers } from './xrpl-iou.js';

export const walletEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4002),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  NATS_URL: z.string().default('nats://localhost:4222'),
  SIGNER_BASE_URL: z.string().url().default('http://localhost:4099'),
  LEDGER_BASE_URL: z.string().url().default('http://localhost:4001'),
  AGENTS_BASE_URL: z.string().url().default('http://localhost:4011'),
  BASE_NETWORK: z.enum(['base-mainnet', 'base-sepolia']).default('base-sepolia'),
  BASE_RPC_URL: z.string().url().default('https://sepolia.base.org'),
  /** Default per-tx cap for new BASE wallets (minor units, USDC = 6 decimals). */
  WALLET_BASE_DEFAULT_PER_TX_CAP_MINOR: z.coerce.bigint().default(10_000_000_000n),
  /** Default daily cap for new BASE wallets. */
  WALLET_BASE_DEFAULT_DAILY_CAP_MINOR: z.coerce.bigint().default(100_000_000_000n),
  /** Deployed SalyEscrow contract on Base (required for ESCROW_FUND transfers). */
  ESCROW_CONTRACT_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  /** Bearer token for internal admin calls (execution → wallet escrow resolve). */
  WALLET_INTERNAL_ADMIN_TOKEN: z.string().min(16).optional(),
  /** Shared secret for internal service-to-service calls. Required in production. */
  INTERNAL_SERVICE_TOKEN: z.string().min(16).optional(),
  XRPL_NETWORK: z.enum(['xrpl-mainnet', 'xrpl-testnet', 'xrpl-devnet']).default('xrpl-testnet'),
  XRPL_WS_URL: z.string().default('wss://s.altnet.rippletest.net:51233'),
  /** JSON map of IOU currency → issuer address, e.g. `{"USD":"rhub8…"}`. */
  XRPL_IOU_ISSUERS: z
    .string()
    .default('{}')
    .transform((raw) => parseXrplIouIssuers(raw)),
  /** Default TrustSet limit when establishing a new IOU line on custodial wallets. */
  XRPL_DEFAULT_TRUST_LIMIT: z.string().regex(/^[0-9]+(\.[0-9]+)?$/).default('1000000'),
  /** Default per-tx cap for XRPL wallets (minor units of the payout asset). */
  WALLET_XRPL_DEFAULT_PER_TX_CAP_MINOR: z.coerce.bigint().default(1_000_000_000n),
  /** Default daily cap for XRPL wallets. */
  WALLET_XRPL_DEFAULT_DAILY_CAP_MINOR: z.coerce.bigint().default(10_000_000_000n),
  L3_NETWORK: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']).default('saly-devnet'),
  L3_L3_RPC_URL: z.string().url().default('http://127.0.0.1:9545'),
  L3_USDC_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  L3_SALYSD_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  WALLET_L3_DEFAULT_PER_TX_CAP_MINOR: z.coerce.bigint().default(10_000_000_000n),
  WALLET_L3_DEFAULT_DAILY_CAP_MINOR: z.coerce.bigint().default(100_000_000_000n),
});

export type WalletEnv = z.infer<typeof walletEnvSchema>;
