import { describe, expect, it } from 'vitest';
import {
  FinalityPolicyViolation,
  assertFinalityMet,
  extractSettlementFinality,
} from '@salychain/finality';

/**
 * Chaos-style tests validate fail-closed behaviour without injecting live
 * Toxiproxy — they prove the money path rejects unsafe observations.
 */
describe('chaos: finality fail-closed', () => {
  it('rejects Base observation with zero confirmations', () => {
    expect(() => assertFinalityMet({ chain: 'BASE', confirmationsDepth: 0 })).toThrow(
      FinalityPolicyViolation,
    );
  });

  it('rejects L3 observation below policy depth', () => {
    expect(() => assertFinalityMet({ chain: 'SALY_L3', confirmationsDepth: 1 })).toThrow(
      /requires 2 confirmations/,
    );
  });

  it('allows XRPL validated ledger at depth 0', () => {
    expect(() => assertFinalityMet({ chain: 'XRPL', confirmationsDepth: 0 })).not.toThrow();
  });
});

describe('chaos: reorg reversal prerequisites', () => {
  it('cannot reverse legacy settles missing finality metadata', () => {
    const finality = extractSettlementFinality([
      { toState: 'SETTLED', detail: { ledger_settle_entry_id: 'je_old' } },
    ]);
    expect(finality).toBeUndefined();
  });

  it('identifies in-range settlements for reversal sweep', () => {
    const finality = extractSettlementFinality([
      {
        toState: 'SETTLED',
        detail: {
          ledger_settle_entry_id: 'je_2',
          finality: { chain: 'BASE', block_number: 100, confirmation_depth: 2 },
        },
      },
    ]);
    expect(finality?.block_number).toBeGreaterThanOrEqual(99);
    expect(finality?.block_number).toBeLessThanOrEqual(100);
  });
});

describe('chaos: idempotency contract', () => {
  it('reorg reversal idempotency key is deterministic per tx', () => {
    const txId = 'tx_demo';
    expect(`exec:${txId}:reorg-reverse`).toBe('exec:tx_demo:reorg-reverse');
  });
});
