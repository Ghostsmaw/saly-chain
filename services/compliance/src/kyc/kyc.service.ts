import { Injectable, Logger } from '@nestjs/common';
import { ConflictError, NotFoundError } from '@salychain/errors';
import { VerificationTier } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';

/**
 * KYC tier orchestration.
 *
 * Tiers are an explicit ladder; each `setTier` writes the new tier with an
 * audit timestamp. Tier transitions follow:
 *
 *   TIER_0 ─► TIER_1 ─► TIER_2 ─► TIER_3
 *           │       │       │
 *           └───────┴───────┴──► TIER_REJECTED   (regression allowed for risk events)
 *
 * Skipping forward (e.g. TIER_0 → TIER_3) is allowed when a vendor returns
 * full KYC on first contact. Regressing on tier (e.g. TIER_2 → TIER_1) is
 * forbidden except by transitioning to TIER_REJECTED.
 */
@Injectable()
export class KycService {
  private readonly logger = new Logger(KycService.name);

  constructor(private readonly prisma: PrismaService) {}

  async setTier(externalRef: string, newTier: VerificationTier, reason?: string): Promise<void> {
    const subject = await this.prisma.complianceSubject.findUnique({ where: { externalRef } });
    if (!subject) throw NotFoundError('compliance.subject_not_found', `Subject ${externalRef} not found`);

    const current = subject.tier;
    if (current === newTier) return;
    if (newTier !== 'TIER_REJECTED' && tierRank(newTier) < tierRank(current)) {
      throw ConflictError(
        'compliance.kyc_regression_forbidden',
        `Cannot regress KYC tier from ${current} to ${newTier} (only TIER_REJECTED allowed)`,
      );
    }

    await this.prisma.complianceSubject.update({
      where: { externalRef },
      data: { tier: newTier, tierUpdatedAt: new Date() },
    });
    this.logger.log(`KYC: ${externalRef} ${current} → ${newTier} ${reason ? `(${reason})` : ''}`);
  }

  async getTier(externalRef: string): Promise<{ tier: VerificationTier; updated_at: string | null }> {
    const subject = await this.prisma.complianceSubject.findUnique({ where: { externalRef } });
    if (!subject) return { tier: 'TIER_0', updated_at: null };
    return { tier: subject.tier, updated_at: subject.tierUpdatedAt?.toISOString() ?? null };
  }

  /** Convenience for routing / risk: turn a tier into a per-tx cap in USD-cents. */
  static perTxLimitUsdMinor(tier: VerificationTier): bigint {
    switch (tier) {
      case 'TIER_0':        return 0n;             // can't transact
      case 'TIER_1':        return 50_000n;        // $500
      case 'TIER_2':        return 5_000_000n;     // $50,000
      case 'TIER_3':        return 100_000_000n;   // $1,000,000
      case 'TIER_REJECTED': return 0n;
    }
  }
}

function tierRank(tier: VerificationTier): number {
  const ranks: Record<VerificationTier, number> = {
    TIER_0: 0,
    TIER_1: 1,
    TIER_2: 2,
    TIER_3: 3,
    TIER_REJECTED: -1,
  };
  return ranks[tier];
}
