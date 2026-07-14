import type { Rail } from '../generated/prisma/index.js';

export const RAIL_EVALUATORS = Symbol('RAIL_EVALUATORS');

export interface RoutingInput {
  /** Sending side (an existing custodial wallet or ledger account ref). */
  source: {
    type: 'WALLET' | 'LEDGER_ACCOUNT';
    chain?: string;
    address?: string;
    currency: string;
  };
  /** Receiving side — could be an internal account, an external chain address, or a fiat rail. */
  destination: {
    type: 'WALLET' | 'LEDGER_ACCOUNT' | 'EXTERNAL_ADDRESS' | 'BANK_ACCOUNT';
    chain?: string;
    address?: string;
    currency: string;
    country_code?: string;
  };
  amountMinor: bigint;
  /** From the risk service — used to penalize rails with weak claw-back capability for high risk txs. */
  riskScore?: number;
  /** Optional preference hints (e.g. user opts for "cheapest" or "fastest"). */
  preference?: 'cheapest' | 'fastest' | 'most_private' | 'balanced';
  /** When set, the ESCROW rail becomes eligible (ADR-0014). */
  escrowCondition?: {
    type: 'DELIVERY' | 'MILESTONE' | 'TIMELOCK' | 'CUSTOM';
    deadline_at?: string;
    description?: string;
  };
  /** Intent kind — enables cross-currency ledger swap routing when SWAP. */
  intentKind?: 'TRANSFER' | 'SWAP' | 'PAYOUT' | 'INVOICE' | 'PAYROLL' | 'AGENT_PAY' | 'TOPUP';
  /** SWAP execution path — ledger FX (default) or on-chain DEX on Base. */
  swapExecution?: 'ledger' | 'onchain';
}

export interface RailEvaluation {
  rail: Rail;
  available: boolean;
  /** All-in cost in USD-cents (network + provider fees). */
  expectedCostUsdMinor: bigint;
  /** Time to settle in seconds (median estimate). */
  expectedSeconds: number;
  /** Reliability score 0..100 (higher = better historical success rate). */
  reliability: number;
  /** Privacy score 0..100 (higher = stronger privacy properties). */
  privacy: number;
  /** Free-form notes returned for audit + admin UI. */
  notes: string[];
}

/**
 * A rail evaluator answers: "If we routed this intent through me, what would it cost,
 * how long would it take, and what is my historical reliability + privacy?".
 *
 * Evaluators are stateless and cheap to construct. The decider runs all
 * registered evaluators in parallel and combines the scores using configured
 * weights.
 */
export interface RailEvaluator {
  readonly rail: Rail;
  evaluate(input: RoutingInput): Promise<RailEvaluation>;
}
