import { describe, expect, it } from 'vitest';
import {
  FINALITY_POLICIES,
  assertFinalityMet,
  chainFromTxKind,
  requiredConfirmations,
  FinalityPolicyViolation,
  txKindsForChain,
} from './policy.js';

describe('finality policies', () => {
  it('defines depth per chain', () => {
    expect(FINALITY_POLICIES.BASE.confirmationDepth).toBe(2);
    expect(FINALITY_POLICIES.XRPL.confirmationDepth).toBe(0);
    expect(FINALITY_POLICIES.SALY_L3.confirmationDepth).toBe(2);
  });

  it('maps execution kinds to chains', () => {
    expect(chainFromTxKind('BASE_PAYOUT')).toBe('BASE');
    expect(chainFromTxKind('DEX_SWAP')).toBe('BASE');
    expect(chainFromTxKind('XRPL_PAYOUT')).toBe('XRPL');
    expect(chainFromTxKind('L3_PAYOUT')).toBe('SALY_L3');
    expect(chainFromTxKind('INTERNAL_TRANSFER')).toBeUndefined();
  });

  it('lists chain payout kinds for reorg sweeps', () => {
    expect(txKindsForChain('BASE')).toEqual(['BASE_PAYOUT', 'DEX_SWAP', 'ESCROW_PAYOUT']);
    expect(txKindsForChain('SALY_L3')).toEqual(['L3_PAYOUT']);
  });

  it('accepts sufficient confirmations', () => {
    expect(() =>
      assertFinalityMet({ chain: 'BASE', confirmationsDepth: requiredConfirmations('BASE') }),
    ).not.toThrow();
    expect(() => assertFinalityMet({ chain: 'XRPL', confirmationsDepth: 0 })).not.toThrow();
  });

  it('rejects insufficient confirmations (fail closed)', () => {
    expect(() => assertFinalityMet({ chain: 'BASE', confirmationsDepth: 0 })).toThrow(
      FinalityPolicyViolation,
    );
    expect(() => assertFinalityMet({ chain: 'SALY_L3', confirmationsDepth: 1 })).toThrow(
      /requires 2 confirmations/,
    );
  });
});
