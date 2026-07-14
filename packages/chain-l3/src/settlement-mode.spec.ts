import { describe, expect, it } from 'vitest';
import { resolveSettlementMode, settlementModeLabel } from './settlement-mode.js';

describe('resolveSettlementMode', () => {
  it('defaults to legacy', () => {
    expect(resolveSettlementMode({})).toBe('legacy');
  });

  it('accepts fault_proofs aliases', () => {
    expect(resolveSettlementMode({ L3_SETTLEMENT_MODE: 'fault_proofs' })).toBe('fault_proofs');
    expect(resolveSettlementMode({ L3_SETTLEMENT_MODE: 'fault-proofs' })).toBe('fault_proofs');
  });

  it('labels modes for ops UI', () => {
    expect(settlementModeLabel('legacy')).toContain('L2OutputOracle');
    expect(settlementModeLabel('fault_proofs')).toContain('DisputeGameFactory');
  });
});
