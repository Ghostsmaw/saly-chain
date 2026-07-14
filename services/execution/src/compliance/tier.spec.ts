import { describe, expect, it } from 'vitest';
import { complianceTierRank, meetsRequiredComplianceTier } from './tier.js';

describe('complianceTierRank', () => {
  it('orders tiers ascending', () => {
    expect(complianceTierRank('TIER_0')).toBeLessThan(complianceTierRank('TIER_1'));
    expect(complianceTierRank('TIER_2')).toBeLessThan(complianceTierRank('TIER_3'));
  });
});

describe('meetsRequiredComplianceTier', () => {
  it('accepts equal or higher tiers', () => {
    expect(meetsRequiredComplianceTier('TIER_2', 'TIER_1')).toBe(true);
    expect(meetsRequiredComplianceTier('TIER_2', 'TIER_2')).toBe(true);
  });

  it('rejects lower tiers and rejected subjects', () => {
    expect(meetsRequiredComplianceTier('TIER_1', 'TIER_2')).toBe(false);
    expect(meetsRequiredComplianceTier('TIER_REJECTED', 'TIER_1')).toBe(false);
  });
});
