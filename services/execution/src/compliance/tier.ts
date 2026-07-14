/** Rank compliance tiers for minimum-tier constraint checks. */
export function complianceTierRank(tier: string): number {
  switch (tier) {
    case 'TIER_REJECTED':
      return -1;
    case 'TIER_0':
      return 0;
    case 'TIER_1':
      return 1;
    case 'TIER_2':
      return 2;
    case 'TIER_3':
      return 3;
    default:
      return 0;
  }
}

export type RequiredComplianceTier = 'TIER_1' | 'TIER_2' | 'TIER_3';

export function meetsRequiredComplianceTier(
  actualTier: string,
  required: RequiredComplianceTier,
): boolean {
  if (actualTier === 'TIER_REJECTED') return false;
  return complianceTierRank(actualTier) >= complianceTierRank(required);
}
