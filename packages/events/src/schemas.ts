import { z } from 'zod';

/**
 * Canonical domain event schemas. Subjects are versioned by including the
 * version in the schema; the on-wire subject is unversioned (consumers route
 * on subject and validate on schema version).
 *
 * Subjects follow `salychain.<aggregate>.<event_type>`.
 */

export const EVENT_SCHEMA_VERSION = '1' as const;

const envelope = z.object({
  schema_version: z.literal(EVENT_SCHEMA_VERSION),
  event_id: z.string(),
  occurred_at: z.string().datetime({ offset: true }),
  correlation_id: z.string().optional(),
  trace_id: z.string().optional(),
});

// ───────────────────────── Transaction lifecycle ─────────────────────────

const txBase = envelope.extend({
  transaction_id: z.string(),
  kind: z.enum([
    'INTERNAL_TRANSFER',
    'BASE_PAYOUT',
    'XRPL_PAYOUT',
    'L3_PAYOUT',
    'ESCROW_PAYOUT',
    'PAYROLL_BATCH',
    'FIAT_PAYOUT',
    'FIAT_PAYIN',
    'SWAP',
    'TOPUP',
    'DEX_SWAP',
    'BRIDGE_DEPOSIT',
    'BRIDGE_WITHDRAW',
    'SALYSD_MINT',
    'SALYSD_REDEEM',
  ]),
});

export const txCreatedSchema = txBase.extend({
  source: z.object({
    wallet_id: z.string().optional(),
    account_id: z.string().optional(),
    amount_minor: z.string(),
    currency: z.string(),
  }),
  destination: z.object({
    wallet_id: z.string().optional(),
    account_id: z.string().optional(),
    address: z.string().optional(),
    chain: z.string().optional(),
  }),
  intent_id: z.string().optional(),
});

export const txReservedSchema = txBase.extend({
  ledger_entry_id: z.string(),
});

export const txExecutingSchema = txBase.extend({
  broadcast_id: z.string().optional(),
});

export const txAwaitingConfirmationSchema = txBase.extend({
  tx_hash: z.string(),
  rail: z.enum(['BASE', 'XRPL', 'L3', 'INTERNAL', 'FIAT', 'ESCROW']),
});

export const txSettledSchema = txBase.extend({
  tx_hash: z.string().optional(),
  ledger_entry_id: z.string().optional(),
  block_number: z.number().int().optional(),
  settled_at: z.string().datetime({ offset: true }),
});

export const txFailedSchema = txBase.extend({
  reason_code: z.string(),
  reason_message: z.string(),
  retryable: z.boolean(),
});

export const txReversedSchema = txBase.extend({
  original_ledger_entry_id: z.string(),
  reversal_ledger_entry_id: z.string(),
});

// ───────────────────────── Intent lifecycle ─────────────────────────

const intentBase = envelope.extend({
  intent_id: z.string(),
  kind: z.string(),
});

export const intentReceivedSchema = intentBase.extend({
  actor_id: z.string().optional(),
  source: z.string(),
});

export const intentScreenedSchema = intentBase.extend({
  compliance_decision: z.enum(['ALLOW', 'REVIEW', 'BLOCK']),
  risk_decision: z.enum(['ALLOW', 'REVIEW', 'BLOCK']),
  risk_score: z.number().min(0).max(100),
  flags: z.array(z.string()).default([]),
});

export const intentRoutedSchema = intentBase.extend({
  rail: z.enum(['INTERNAL', 'BASE', 'XRPL', 'L3', 'FIAT']),
  decision_id: z.string(),
  expected_cost_minor: z.string(),
  expected_seconds: z.number().int().nonnegative(),
});

export const intentRejectedSchema = intentBase.extend({
  reason_code: z.string(),
  reason_message: z.string(),
});

// ───────────────────────── Agent lifecycle (S4) ─────────────────────────

const agentBase = envelope.extend({
  agent_id: z.string(),
});

export const agentCreatedSchema = agentBase.extend({
  owner_id: z.string(),
  owner_kind: z.enum(['USER', 'BUSINESS']),
  wallet_ids: z.array(z.string()),
});

export const agentPolicyUpdatedSchema = agentBase.extend({
  policy_version: z.number().int().positive(),
});

export const agentSpendDeniedSchema = agentBase.extend({
  intent_id: z.string().optional(),
  reason_code: z.string(),
});

export const agentServicePublishedSchema = agentBase.extend({
  service_id: z.string(),
  name: z.string(),
});

export const agentSubscriptionCreatedSchema = envelope.extend({
  service_id: z.string(),
  subscriber_agent_id: z.string(),
  subscription_id: z.string(),
});

export const agentUsageRecordedSchema = agentBase.extend({
  meter_id: z.string(),
  amount_minor: z.string(),
});

// ───────────────────────── Chain events ─────────────────────────

export const baseBlockObservedSchema = envelope.extend({
  chain: z.literal('BASE'),
  block_number: z.number().int().positive(),
  block_hash: z.string(),
  timestamp: z.number().int().positive(),
});

export const baseTransferObservedSchema = envelope.extend({
  chain: z.literal('BASE'),
  block_number: z.number().int().positive(),
  block_hash: z.string(),
  tx_hash: z.string(),
  log_index: z.number().int().nonnegative(),
  contract_address: z.string(),
  from: z.string(),
  to: z.string(),
  amount_minor: z.string(),
  asset: z.string(),
  /** Trailing depth behind chain head when this observation was emitted. */
  confirmations_depth: z.number().int().nonnegative().optional(),
});

export const baseDealFundedSchema = envelope.extend({
  chain: z.literal('BASE'),
  block_number: z.number().int().positive(),
  block_hash: z.string(),
  tx_hash: z.string(),
  log_index: z.number().int().nonnegative(),
  escrow_contract: z.string(),
  deal_id: z.string(),
  payer: z.string(),
  payee: z.string(),
  token: z.string(),
  amount_minor: z.string(),
  deadline: z.string(),
});

export const baseDealRefundedSchema = envelope.extend({
  chain: z.literal('BASE'),
  block_number: z.number().int().positive(),
  block_hash: z.string(),
  tx_hash: z.string(),
  log_index: z.number().int().nonnegative(),
  escrow_contract: z.string(),
  deal_id: z.string(),
  payer: z.string(),
  amount_minor: z.string(),
});

export const baseDealReleasedSchema = envelope.extend({
  chain: z.literal('BASE'),
  block_number: z.number().int().positive(),
  block_hash: z.string(),
  tx_hash: z.string(),
  log_index: z.number().int().nonnegative(),
  escrow_contract: z.string(),
  deal_id: z.string(),
  payee: z.string(),
  amount_minor: z.string(),
});

export const xrplLedgerObservedSchema = envelope.extend({
  chain: z.literal('XRPL'),
  ledger_index: z.number().int().positive(),
  close_time: z.number().int().nonnegative(),
});

export const xrplPaymentObservedSchema = envelope
  .extend({
    chain: z.literal('XRPL'),
    ledger_index: z.number().int().positive(),
    close_time: z.number().int().nonnegative(),
    tx_hash: z.string(),
    from: z.string(),
    to: z.string(),
    amount_drops: z.string().optional(),
    iou: z
      .object({
        currency: z.string(),
        issuer: z.string(),
        value: z.string(),
      })
      .optional(),
    destination_tag: z.number().int().nonnegative().optional(),
    fee_drops: z.string(),
    confirmations_depth: z.number().int().nonnegative().optional(),
  })
  .refine((v) => v.amount_drops !== undefined || v.iou !== undefined, {
    message: 'amount_drops or iou required',
  });

// ───────────────────────── L3 rollup (S5) ─────────────────────────

export const l3OutputProposedSchema = envelope.extend({
  l3_network: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']),
  settlement_network: z.enum(['base-sepolia', 'base-mainnet']),
  output_root: z.string(),
  output_index: z.string(),
  l2_block_number: z.string(),
  l1_timestamp: z.string(),
  l1_block_number: z.number().int().nonnegative(),
  l1_tx_hash: z.string(),
  l2_output_oracle: z.string(),
});

export const l3BlockObservedSchema = envelope.extend({
  chain: z.literal('SALY_L3'),
  l3_network: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']),
  block_number: z.number().int().positive(),
  block_hash: z.string(),
  timestamp: z.number().int().nonnegative(),
});

export const l3TransferObservedSchema = envelope.extend({
  chain: z.literal('SALY_L3'),
  l3_network: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']),
  block_number: z.number().int().positive(),
  block_hash: z.string(),
  tx_hash: z.string(),
  log_index: z.number().int().nonnegative(),
  contract_address: z.string(),
  from: z.string(),
  to: z.string(),
  amount_minor: z.string(),
  asset: z.string(),
  confirmations_depth: z.number().int().nonnegative().optional(),
});

const chainReorgBase = envelope.extend({
  from_block: z.number().int().nonnegative(),
  to_block: z.number().int().positive(),
  orphaned_block_hash: z.string().optional(),
  detected_at_block: z.number().int().positive().optional(),
});

export const baseReorgDetectedSchema = chainReorgBase.extend({
  chain: z.literal('BASE'),
});

export const l3ReorgDetectedSchema = chainReorgBase.extend({
  chain: z.literal('SALY_L3'),
  l3_network: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']),
});

// ───────────────────────── Stablecoin (Milestone D) ─────────────────────────

const stablecoinBase = envelope.extend({
  org_id: z.string(),
  chain: z.enum(['SALY_L3', 'BASE']),
  currency: z.literal('SALYSD'),
});

export const stablecoinMintRequestedSchema = stablecoinBase.extend({
  mint_request_id: z.string(),
  amount_minor: z.string(),
  destination_wallet_id: z.string().optional(),
  destination_address: z.string().optional(),
  reserve_account_id: z.string(),
});

export const stablecoinMintCompletedSchema = stablecoinBase.extend({
  mint_request_id: z.string(),
  amount_minor: z.string(),
  tx_hash: z.string().optional(),
  ledger_entry_id: z.string().optional(),
});

export const stablecoinRedeemRequestedSchema = stablecoinBase.extend({
  redeem_request_id: z.string(),
  amount_minor: z.string(),
  source_wallet_id: z.string(),
  payout_rail: z.enum(['FIAT', 'INTERNAL']),
});

export const stablecoinRedeemCompletedSchema = stablecoinBase.extend({
  redeem_request_id: z.string(),
  amount_minor: z.string(),
  tx_hash: z.string().optional(),
  ledger_entry_id: z.string().optional(),
});

export const stablecoinReserveAttestedSchema = envelope.extend({
  reserve_account_id: z.string(),
  attestation_hash: z.string(),
  balance_minor: z.string(),
  authorized_mint_ceiling_minor: z.string(),
  attestation_url: z.string().url().optional(),
  as_of: z.string().datetime({ offset: true }),
});

export const stablecoinSupplySnapshotSchema = envelope.extend({
  chain: z.enum(['SALY_L3', 'BASE']),
  on_chain_supply_minor: z.string(),
  reserve_total_minor: z.string(),
  reserve_ratio_bps: z.number().int().nonnegative(),
});

// ───────────────────────── L3 ↔ Base bridge (Milestone D2) ─────────────────────────

export const baseBridgeDepositObservedSchema = envelope.extend({
  chain: z.literal('BASE'),
  l3_network: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']),
  block_number: z.number().int().positive(),
  block_hash: z.string(),
  tx_hash: z.string(),
  log_index: z.number().int().nonnegative(),
  portal_address: z.string(),
  depositor: z.string(),
  l2_recipient: z.string(),
  deposit_version: z.string(),
  opaque_data_hash: z.string(),
  confirmations_depth: z.number().int().nonnegative().optional(),
});

export const baseBridgeErc20DepositObservedSchema = envelope.extend({
  chain: z.literal('BASE'),
  l3_network: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']),
  block_number: z.number().int().positive(),
  block_hash: z.string(),
  tx_hash: z.string(),
  log_index: z.number().int().nonnegative(),
  bridge_address: z.string(),
  l1_token: z.string(),
  l2_token: z.string(),
  from: z.string(),
  to: z.string(),
  amount_minor: z.string(),
  confirmations_depth: z.number().int().nonnegative().optional(),
});

export const l3BridgeWithdrawalInitiatedSchema = envelope.extend({
  chain: z.literal('SALY_L3'),
  l3_network: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']),
  block_number: z.number().int().positive(),
  block_hash: z.string(),
  tx_hash: z.string(),
  initiator: z.string(),
  l1_recipient: z.string(),
  amount_minor: z.string(),
  l1_token: z.string().optional(),
});

// ───────────────────────── Subject registry ─────────────────────────

export const SUBJECTS = {
  TX_CREATED: 'salychain.tx.created',
  TX_RESERVED: 'salychain.tx.reserved',
  TX_EXECUTING: 'salychain.tx.executing',
  TX_AWAITING_CONFIRMATION: 'salychain.tx.awaiting_confirmation',
  TX_SETTLED: 'salychain.tx.settled',
  TX_FAILED: 'salychain.tx.failed',
  TX_REVERSED: 'salychain.tx.reversed',
  CHAIN_BASE_BLOCK_OBSERVED: 'salychain.chain.base.block_observed',
  CHAIN_BASE_TRANSFER_OBSERVED: 'salychain.chain.base.transfer_observed',
  CHAIN_BASE_DEAL_FUNDED: 'salychain.chain.base.deal_funded',
  CHAIN_BASE_DEAL_RELEASED: 'salychain.chain.base.deal_released',
  CHAIN_BASE_DEAL_REFUNDED: 'salychain.chain.base.deal_refunded',
  CHAIN_XRPL_LEDGER_OBSERVED: 'salychain.chain.xrpl.ledger_observed',
  CHAIN_XRPL_PAYMENT_OBSERVED: 'salychain.chain.xrpl.payment_observed',
  CHAIN_L3_OUTPUT_PROPOSED: 'salychain.chain.l3.output_proposed',
  CHAIN_L3_BLOCK_OBSERVED: 'salychain.chain.l3.block_observed',
  CHAIN_L3_TRANSFER_OBSERVED: 'salychain.chain.l3.transfer_observed',
  CHAIN_BASE_REORG_DETECTED: 'salychain.chain.base.reorg_detected',
  CHAIN_L3_REORG_DETECTED: 'salychain.chain.l3.reorg_detected',
  // Intent + screening + routing surface (S2)
  INTENT_RECEIVED: 'salychain.intent.received',
  INTENT_SCREENED: 'salychain.intent.screened',
  INTENT_ROUTED: 'salychain.intent.routed',
  INTENT_REJECTED: 'salychain.intent.rejected',
  AGENT_CREATED: 'salychain.agent.created',
  AGENT_POLICY_UPDATED: 'salychain.agent.policy_updated',
  AGENT_SPEND_DENIED: 'salychain.agent.spend_denied',
  AGENT_SERVICE_PUBLISHED: 'salychain.agent.service_published',
  AGENT_SUBSCRIPTION_CREATED: 'salychain.agent.subscription_created',
  AGENT_USAGE_RECORDED: 'salychain.agent.usage_recorded',
  STABLECOIN_MINT_REQUESTED: 'salychain.stablecoin.mint_requested',
  STABLECOIN_MINT_COMPLETED: 'salychain.stablecoin.mint_completed',
  STABLECOIN_REDEEM_REQUESTED: 'salychain.stablecoin.redeem_requested',
  STABLECOIN_REDEEM_COMPLETED: 'salychain.stablecoin.redeem_completed',
  STABLECOIN_RESERVE_ATTESTED: 'salychain.stablecoin.reserve_attested',
  STABLECOIN_SUPPLY_SNAPSHOT: 'salychain.stablecoin.supply_snapshot',
  CHAIN_BASE_BRIDGE_DEPOSIT_OBSERVED: 'salychain.chain.base.bridge_deposit_observed',
  CHAIN_BASE_BRIDGE_ERC20_DEPOSIT_OBSERVED: 'salychain.chain.base.bridge_erc20_deposit_observed',
  CHAIN_L3_BRIDGE_WITHDRAWAL_INITIATED: 'salychain.chain.l3.bridge_withdrawal_initiated',
} as const;
export type Subject = (typeof SUBJECTS)[keyof typeof SUBJECTS];

export type EventBySubject = {
  [SUBJECTS.TX_CREATED]: z.infer<typeof txCreatedSchema>;
  [SUBJECTS.TX_RESERVED]: z.infer<typeof txReservedSchema>;
  [SUBJECTS.TX_EXECUTING]: z.infer<typeof txExecutingSchema>;
  [SUBJECTS.TX_AWAITING_CONFIRMATION]: z.infer<typeof txAwaitingConfirmationSchema>;
  [SUBJECTS.TX_SETTLED]: z.infer<typeof txSettledSchema>;
  [SUBJECTS.TX_FAILED]: z.infer<typeof txFailedSchema>;
  [SUBJECTS.TX_REVERSED]: z.infer<typeof txReversedSchema>;
  [SUBJECTS.CHAIN_BASE_BLOCK_OBSERVED]: z.infer<typeof baseBlockObservedSchema>;
  [SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED]: z.infer<typeof baseTransferObservedSchema>;
  [SUBJECTS.CHAIN_BASE_DEAL_FUNDED]: z.infer<typeof baseDealFundedSchema>;
  [SUBJECTS.CHAIN_BASE_DEAL_RELEASED]: z.infer<typeof baseDealReleasedSchema>;
  [SUBJECTS.CHAIN_BASE_DEAL_REFUNDED]: z.infer<typeof baseDealRefundedSchema>;
  [SUBJECTS.CHAIN_XRPL_LEDGER_OBSERVED]: z.infer<typeof xrplLedgerObservedSchema>;
  [SUBJECTS.CHAIN_XRPL_PAYMENT_OBSERVED]: z.infer<typeof xrplPaymentObservedSchema>;
  [SUBJECTS.CHAIN_L3_OUTPUT_PROPOSED]: z.infer<typeof l3OutputProposedSchema>;
  [SUBJECTS.CHAIN_L3_BLOCK_OBSERVED]: z.infer<typeof l3BlockObservedSchema>;
  [SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED]: z.infer<typeof l3TransferObservedSchema>;
  [SUBJECTS.CHAIN_BASE_REORG_DETECTED]: z.infer<typeof baseReorgDetectedSchema>;
  [SUBJECTS.CHAIN_L3_REORG_DETECTED]: z.infer<typeof l3ReorgDetectedSchema>;
  [SUBJECTS.INTENT_RECEIVED]: z.infer<typeof intentReceivedSchema>;
  [SUBJECTS.INTENT_SCREENED]: z.infer<typeof intentScreenedSchema>;
  [SUBJECTS.INTENT_ROUTED]: z.infer<typeof intentRoutedSchema>;
  [SUBJECTS.INTENT_REJECTED]: z.infer<typeof intentRejectedSchema>;
  [SUBJECTS.AGENT_CREATED]: z.infer<typeof agentCreatedSchema>;
  [SUBJECTS.AGENT_POLICY_UPDATED]: z.infer<typeof agentPolicyUpdatedSchema>;
  [SUBJECTS.AGENT_SPEND_DENIED]: z.infer<typeof agentSpendDeniedSchema>;
  [SUBJECTS.AGENT_SERVICE_PUBLISHED]: z.infer<typeof agentServicePublishedSchema>;
  [SUBJECTS.AGENT_SUBSCRIPTION_CREATED]: z.infer<typeof agentSubscriptionCreatedSchema>;
  [SUBJECTS.AGENT_USAGE_RECORDED]: z.infer<typeof agentUsageRecordedSchema>;
  [SUBJECTS.STABLECOIN_MINT_REQUESTED]: z.infer<typeof stablecoinMintRequestedSchema>;
  [SUBJECTS.STABLECOIN_MINT_COMPLETED]: z.infer<typeof stablecoinMintCompletedSchema>;
  [SUBJECTS.STABLECOIN_REDEEM_REQUESTED]: z.infer<typeof stablecoinRedeemRequestedSchema>;
  [SUBJECTS.STABLECOIN_REDEEM_COMPLETED]: z.infer<typeof stablecoinRedeemCompletedSchema>;
  [SUBJECTS.STABLECOIN_RESERVE_ATTESTED]: z.infer<typeof stablecoinReserveAttestedSchema>;
  [SUBJECTS.STABLECOIN_SUPPLY_SNAPSHOT]: z.infer<typeof stablecoinSupplySnapshotSchema>;
  [SUBJECTS.CHAIN_BASE_BRIDGE_DEPOSIT_OBSERVED]: z.infer<typeof baseBridgeDepositObservedSchema>;
  [SUBJECTS.CHAIN_BASE_BRIDGE_ERC20_DEPOSIT_OBSERVED]: z.infer<typeof baseBridgeErc20DepositObservedSchema>;
  [SUBJECTS.CHAIN_L3_BRIDGE_WITHDRAWAL_INITIATED]: z.infer<typeof l3BridgeWithdrawalInitiatedSchema>;
};

export const SUBJECT_SCHEMAS = {
  [SUBJECTS.TX_CREATED]: txCreatedSchema,
  [SUBJECTS.TX_RESERVED]: txReservedSchema,
  [SUBJECTS.TX_EXECUTING]: txExecutingSchema,
  [SUBJECTS.TX_AWAITING_CONFIRMATION]: txAwaitingConfirmationSchema,
  [SUBJECTS.TX_SETTLED]: txSettledSchema,
  [SUBJECTS.TX_FAILED]: txFailedSchema,
  [SUBJECTS.TX_REVERSED]: txReversedSchema,
  [SUBJECTS.CHAIN_BASE_BLOCK_OBSERVED]: baseBlockObservedSchema,
  [SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED]: baseTransferObservedSchema,
  [SUBJECTS.CHAIN_BASE_DEAL_FUNDED]: baseDealFundedSchema,
  [SUBJECTS.CHAIN_BASE_DEAL_RELEASED]: baseDealReleasedSchema,
  [SUBJECTS.CHAIN_BASE_DEAL_REFUNDED]: baseDealRefundedSchema,
  [SUBJECTS.CHAIN_XRPL_LEDGER_OBSERVED]: xrplLedgerObservedSchema,
  [SUBJECTS.CHAIN_XRPL_PAYMENT_OBSERVED]: xrplPaymentObservedSchema,
  [SUBJECTS.CHAIN_L3_OUTPUT_PROPOSED]: l3OutputProposedSchema,
  [SUBJECTS.CHAIN_L3_BLOCK_OBSERVED]: l3BlockObservedSchema,
  [SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED]: l3TransferObservedSchema,
  [SUBJECTS.CHAIN_BASE_REORG_DETECTED]: baseReorgDetectedSchema,
  [SUBJECTS.CHAIN_L3_REORG_DETECTED]: l3ReorgDetectedSchema,
  [SUBJECTS.INTENT_RECEIVED]: intentReceivedSchema,
  [SUBJECTS.INTENT_SCREENED]: intentScreenedSchema,
  [SUBJECTS.INTENT_ROUTED]: intentRoutedSchema,
  [SUBJECTS.INTENT_REJECTED]: intentRejectedSchema,
  [SUBJECTS.AGENT_CREATED]: agentCreatedSchema,
  [SUBJECTS.AGENT_POLICY_UPDATED]: agentPolicyUpdatedSchema,
  [SUBJECTS.AGENT_SPEND_DENIED]: agentSpendDeniedSchema,
  [SUBJECTS.AGENT_SERVICE_PUBLISHED]: agentServicePublishedSchema,
  [SUBJECTS.AGENT_SUBSCRIPTION_CREATED]: agentSubscriptionCreatedSchema,
  [SUBJECTS.AGENT_USAGE_RECORDED]: agentUsageRecordedSchema,
  [SUBJECTS.STABLECOIN_MINT_REQUESTED]: stablecoinMintRequestedSchema,
  [SUBJECTS.STABLECOIN_MINT_COMPLETED]: stablecoinMintCompletedSchema,
  [SUBJECTS.STABLECOIN_REDEEM_REQUESTED]: stablecoinRedeemRequestedSchema,
  [SUBJECTS.STABLECOIN_REDEEM_COMPLETED]: stablecoinRedeemCompletedSchema,
  [SUBJECTS.STABLECOIN_RESERVE_ATTESTED]: stablecoinReserveAttestedSchema,
  [SUBJECTS.STABLECOIN_SUPPLY_SNAPSHOT]: stablecoinSupplySnapshotSchema,
  [SUBJECTS.CHAIN_BASE_BRIDGE_DEPOSIT_OBSERVED]: baseBridgeDepositObservedSchema,
  [SUBJECTS.CHAIN_BASE_BRIDGE_ERC20_DEPOSIT_OBSERVED]: baseBridgeErc20DepositObservedSchema,
  [SUBJECTS.CHAIN_L3_BRIDGE_WITHDRAWAL_INITIATED]: l3BridgeWithdrawalInitiatedSchema,
} as const;

// ───────────────────────── Streams ─────────────────────────

/**
 * Stream definitions. The bus creates streams idempotently on startup. We
 * keep two streams: one for the transaction lifecycle (high importance, long
 * retention) and one for chain observations (higher volume, shorter retention).
 */
export const STREAMS = [
  {
    name: 'SALYCHAIN_TX',
    subjects: ['salychain.tx.>'],
    maxAgeSeconds: 60 * 60 * 24 * 14, // 14 days
    maxBytes: 8 * 1024 * 1024 * 1024, // 8 GB
  },
  {
    name: 'SALYCHAIN_CHAIN',
    subjects: ['salychain.chain.>'],
    maxAgeSeconds: 60 * 60 * 24 * 3, // 3 days
    maxBytes: 16 * 1024 * 1024 * 1024,
  },
  {
    name: 'SALYCHAIN_INTENT',
    subjects: ['salychain.intent.>'],
    maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days — intents are higher-value audit trail
    maxBytes: 8 * 1024 * 1024 * 1024,
  },
  {
    name: 'SALYCHAIN_AGENT',
    subjects: ['salychain.agent.>'],
    maxAgeSeconds: 60 * 60 * 24 * 30,
    maxBytes: 2 * 1024 * 1024 * 1024,
  },
  {
    name: 'SALYCHAIN_STABLECOIN',
    subjects: ['salychain.stablecoin.>'],
    maxAgeSeconds: 60 * 60 * 24 * 30,
    maxBytes: 2 * 1024 * 1024 * 1024,
  },
] as const;
