/**
 * Canonical per-chain finality policies for the money path.
 *
 * Listeners must trail chain head by at least `confirmationDepth` before
 * emitting observation events; execution re-validates before SETTLED.
 */
export type FinalityChain = 'BASE' | 'XRPL' | 'SALY_L3';

export interface FinalityPolicy {
  chain: FinalityChain;
  /** Minimum confirmations behind head before a settlement event is actionable. */
  confirmationDepth: number;
  /** Human-readable rationale for ops/runbooks. */
  rationale: string;
}

export const FINALITY_POLICIES: Record<FinalityChain, FinalityPolicy> = {
  BASE: {
    chain: 'BASE',
    confirmationDepth: 2,
    rationale: 'Base L2 reorgs are rare but possible; 2 blocks matches listener default.',
  },
  XRPL: {
    chain: 'XRPL',
    confirmationDepth: 0,
    rationale: 'Validated XRPL ledgers are final; no trailing depth required.',
  },
  SALY_L3: {
    chain: 'SALY_L3',
    confirmationDepth: 2,
    rationale: 'L3 inherits L2 finality risk; trail by 2 blocks before settlement.',
  },
};

const KIND_TO_CHAIN: Record<string, FinalityChain> = {
  BASE_PAYOUT: 'BASE',
  DEX_SWAP: 'BASE',
  ESCROW_PAYOUT: 'BASE',
  XRPL_PAYOUT: 'XRPL',
  L3_PAYOUT: 'SALY_L3',
  SALYSD_MINT: 'SALY_L3',
  SALYSD_REDEEM: 'SALY_L3',
};

export function requiredConfirmations(chain: FinalityChain): number {
  return FINALITY_POLICIES[chain].confirmationDepth;
}

export function chainFromTxKind(kind: string): FinalityChain | undefined {
  return KIND_TO_CHAIN[kind];
}

export function txKindsForChain(chain: FinalityChain): readonly string[] {
  return Object.entries(KIND_TO_CHAIN)
    .filter(([, c]) => c === chain)
    .map(([kind]) => kind);
}

export class FinalityPolicyViolation extends Error {
  readonly code = 'execution.finality.insufficient_confirmations';

  constructor(
    readonly chain: FinalityChain,
    readonly required: number,
    readonly actual: number,
  ) {
    super(`Chain ${chain} requires ${required} confirmations; observed ${actual}`);
    this.name = 'FinalityPolicyViolation';
  }
}

/** Fail closed when an observation event reports insufficient trailing depth. */
export function assertFinalityMet(input: {
  chain: FinalityChain;
  confirmationsDepth: number;
}): void {
  const required = requiredConfirmations(input.chain);
  if (input.confirmationsDepth < required) {
    throw new FinalityPolicyViolation(input.chain, required, input.confirmationsDepth);
  }
}
