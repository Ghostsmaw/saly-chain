import { z } from 'zod';

export const executionEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4003),
  DATABASE_URL: z.string().url(),
  NATS_URL: z.string().default('nats://localhost:4222'),
  LEDGER_BASE_URL: z.string().url().default('http://localhost:4001'),
  WALLET_BASE_URL: z.string().url().default('http://localhost:4002'),
  COMPLIANCE_BASE_URL: z.string().url().default('http://localhost:4004'),
  RISK_BASE_URL: z.string().url().default('http://localhost:4005'),
  LIQUIDITY_BASE_URL: z.string().url().default('http://localhost:4006'),
  ROUTING_BASE_URL: z.string().url().default('http://localhost:4007'),
  AGENTS_BASE_URL: z.string().url().default('http://localhost:4011'),
  IDENTITY_BASE_URL: z.string().url().default('http://localhost:4012'),
  /** Deployed SalyEscrow on Base — required when routing selects the ESCROW rail. */
  ESCROW_CONTRACT_ADDRESS_BASE: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .optional(),
  /** Custodial resolver wallet id — signs release/refund on SalyEscrow. */
  ESCROW_RESOLVER_WALLET_ID: z.string().uuid().optional(),
  /** Bearer token for admin escrow API (release/refund/list). */
  EXECUTION_ADMIN_TOKEN: z.string().min(16).optional(),
  BASE_NETWORK: z.enum(['base-mainnet', 'base-sepolia']).default('base-sepolia'),
  BASE_RPC_URL: z.string().url().default('https://sepolia.base.org'),
  /** Post ledger reserve/settle journals for chain payouts (disable for legacy dev stacks). */
  LEDGER_CHAIN_RESERVATION_ENABLED: z
    .enum(['true', 'false', '1', '0'])
    .default('true')
    .transform((v) => v === 'true' || v === '1'),
  /** Fiat PSP provider — stub | flutterwave | paystack | composite */
  FIAT_PSP_PROVIDER: z.enum(['stub', 'flutterwave', 'paystack', 'composite']).default('stub'),
  FLUTTERWAVE_SECRET_KEY: z.string().optional(),
  FLUTTERWAVE_BASE_URL: z.string().url().default('https://api.flutterwave.com/v3'),
  PAYSTACK_SECRET_KEY: z.string().optional(),
  PAYSTACK_BASE_URL: z.string().url().default('https://api.paystack.co'),
  FIAT_STUB_SETTLEMENT_MS: z.coerce.number().int().positive().default(1_500),
  /** Poll interval for fiat PSP settlement confirmations (ms). */
  FIAT_CONFIRMATION_POLL_MS: z.coerce.number().int().positive().default(10_000),
  /** Treasury hot wallet with SalySD MINTER_ROLE on L3. */
  SALYSD_MINTER_WALLET_ID: z.string().uuid().optional(),
  /** Treasury hot wallet with SalySD BURNER_ROLE on L3. */
  SALYSD_BURNER_WALLET_ID: z.string().uuid().optional(),
  /** L3 network for SalySD contract resolution. */
  L3_NETWORK: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']).default('saly-devnet'),
  /** Ledger account code prefix for FX pool asset accounts (e.g. asset.fx.USDC). */
  EXECUTION_FX_POOL_ACCOUNT_PREFIX: z.string().min(1).default('asset.fx'),
  /** Ledger account code prefix for business fiat source accounts (liability.business.{actor}.{ccy}). */
  EXECUTION_FIAT_SOURCE_ACCOUNT_PREFIX: z.string().min(1).default('liability.business'),
  /** Ledger account code prefix for PSP settled-cash assets (asset.bank.{provider}.{CCY}). */
  EXECUTION_PAYIN_BANK_ACCOUNT_PREFIX: z.string().min(1).default('asset.bank'),
  /** Enable the ledger↔rail reconciliation poller. */
  EXECUTION_RECONCILIATION_ENABLED: z
    .enum(['true', 'false', '1', '0'])
    .default('false')
    .transform((v) => v === 'true' || v === '1'),
  /** Reconciliation sweep interval (ms). */
  EXECUTION_RECONCILIATION_INTERVAL_MS: z.coerce.number().int().positive().default(300_000),
  /** Mark pay-ins still unfunded after this many minutes as EXPIRED during reconciliation. */
  EXECUTION_PAYIN_EXPIRY_MINUTES: z.coerce.number().int().positive().default(1_440),
  /** Bearer token for internal webhook callbacks (fiat-listener → execution). */
  EXECUTION_INTERNAL_WEBHOOK_TOKEN: z.string().min(16).optional(),
  /** Default fiat currency for SalySD redeem payouts (1:1 minor units). */
  SALYSD_REDEEM_FIAT_CURRENCY: z.string().min(3).max(3).default('USD'),
  /** ISO-3166-1 alpha-2 country for default redeem payout destination. */
  SALYSD_REDEEM_FIAT_COUNTRY: z.string().length(2).default('US'),
  /** Optional explicit fiat rail when not inferrable from currency/country. */
  SALYSD_REDEEM_FIAT_RAIL: z
    .enum(['SEPA', 'SEPA_INSTANT', 'ACH', 'WIRE', 'FASTER', 'PIX', 'NIP', 'MPESA'])
    .optional(),
  /** Dev/test default bank account for redeem fiat payouts. */
  SALYSD_REDEEM_FIAT_ACCOUNT: z.string().optional(),
  SALYSD_REDEEM_FIAT_BANK_CODE: z.string().optional(),
  SALYSD_REDEEM_FIAT_HOLDER: z.string().optional(),
  /** Override ledger source account (UUID) for redeem fiat payouts. */
  SALYSD_REDEEM_FIAT_SOURCE_ACCOUNT_ID: z.string().uuid().optional(),
  /** Transactional outbox relay tuning. */
  OUTBOX_BATCH_SIZE: z.coerce.number().int().positive().default(100),
  OUTBOX_POLL_INTERVAL_MS: z.coerce.number().int().positive().default(1_000),
  OUTBOX_MAX_ATTEMPTS: z.coerce.number().int().positive().default(10),
});
export type ExecutionEnv = z.infer<typeof executionEnvSchema>;
