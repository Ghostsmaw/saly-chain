import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import type { IntelligenceClient } from '@salychain/sdk-internal';
import { Prisma, RiskDecision } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ScoringEngine, type ScoringResult } from './scoring.engine.js';
import { RISK_ENV, INTELLIGENCE_CLIENT, type RiskEnv } from '../config/env.js';

/** Chains whose addresses we can resolve to an entity via the counterparty ref. */
const KNOWN_CHAINS = ['base', 'xrpl', 'ethereum', 'polygon', 'l3', 'saly-mainnet'];

/**
 * Counterparty refs are opaque strings like `base:0x…`, `escrow:base:0x…`,
 * `swap:USD:NGN`, or `internal:…`. We extract a trailing `<chain>:<address>`
 * pair when present so it can be looked up in the Intelligence entity index.
 */
export function parseCounterpartyAddress(
  ref: string | undefined,
): { chain: string; address: string } | null {
  if (!ref) return null;
  const parts = ref.split(':');
  if (parts.length < 2) return null;
  const address = parts[parts.length - 1]!;
  const chain = parts[parts.length - 2]!.toLowerCase();
  if (!KNOWN_CHAINS.includes(chain)) return null;
  if (!/^0x[a-fA-F0-9]{6,}$/.test(address) && !/^r[a-zA-Z0-9]{20,}$/.test(address)) return null;
  return { chain, address };
}

export interface AssessInput {
  intentId?: string;
  transactionId?: string;
  actorExternalRef: string;
  counterpartyRef?: string;
  amountUsdMinor: bigint;
}

export interface AssessResult {
  assessmentId: string;
  decision: RiskDecision;
  finalScore: number;
  components: Record<string, number>;
  reasons: string[];
}

/**
 * Assesses risk for a proposed money movement.
 *
 *   * Loads or initializes the actor's `ActorProfile` and the per-counterparty
 *     edge, then asks the `ScoringEngine` for a final score + reasons.
 *   * Maps the score to a decision using configured thresholds.
 *   * Persists the assessment immutably (regulatory + ML-feedback audit trail).
 *
 * The profile *only* advances when `commit()` is later called (which the
 * execution service does on settlement). This keeps proposed-but-aborted
 * transactions out of the rolling windows.
 */
@Injectable()
export class RiskService {
  private readonly logger = new Logger(RiskService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly engine: ScoringEngine,
    @Inject(RISK_ENV) private readonly env: RiskEnv,
    @Optional()
    @Inject(INTELLIGENCE_CLIENT)
    private readonly intelligence: IntelligenceClient | null,
  ) {}

  /**
   * Best-effort counterparty entity lookup. Fail-open: any error/timeout returns
   * `undefined` and scoring proceeds on the rule engine alone.
   */
  private async fetchEntitySignal(
    counterpartyRef?: string,
  ): Promise<{ riskScore?: number; sanctioned?: boolean } | undefined> {
    if (!this.intelligence) return undefined;
    const parsed = parseCounterpartyAddress(counterpartyRef);
    if (!parsed) return undefined;
    try {
      const features = await this.intelligence.addressFeatures(parsed.chain, parsed.address);
      return { riskScore: features.entity_risk_score, sanctioned: features.sanctioned };
    } catch (err) {
      this.logger.warn(`intelligence lookup failed (fail-open): ${(err as Error).message}`);
      return undefined;
    }
  }

  async assess(input: AssessInput): Promise<AssessResult> {
    const profile = await this.loadOrInitProfile(input.actorExternalRef);
    const edge = input.counterpartyRef
      ? await this.prisma.counterpartyEdge.findUnique({
          where: {
            actorExternalRef_counterpartyRef: {
              actorExternalRef: input.actorExternalRef,
              counterpartyRef: input.counterpartyRef,
            },
          },
        })
      : null;

    const entity = await this.fetchEntitySignal(input.counterpartyRef);

    const scoring: ScoringResult = this.engine.score({
      amountUsdMinor: input.amountUsdMinor,
      profile: {
        rolling24hUsdMinor: profile.rolling24hUsdMinor,
        rolling24hCount: profile.rolling24hCount,
        lifetimeCount: profile.lifetimeCount,
        meanTicketUsdMinor: profile.meanTicketUsdMinor,
        stddevTicketUsdMinor: profile.stddevTicketUsdMinor,
      },
      counterparty: { txCount: edge?.txCount ?? 0 },
      ...(entity ? { entity } : {}),
    });

    const decision = this.decide(scoring.finalScore);

    const created = await this.prisma.riskAssessment.create({
      data: {
        intentId: input.intentId ?? null,
        transactionId: input.transactionId ?? null,
        actorExternalRef: input.actorExternalRef,
        counterpartyRef: input.counterpartyRef ?? null,
        amountUsdMinor: input.amountUsdMinor,
        components: scoring.components as unknown as Prisma.InputJsonValue,
        finalScore: scoring.finalScore,
        decision,
        reasons: scoring.reasons,
      },
    });
    this.logger.log(
      `assessed actor=${input.actorExternalRef} score=${scoring.finalScore} → ${decision}`,
    );

    return {
      assessmentId: created.id,
      decision,
      finalScore: scoring.finalScore,
      components: { ...scoring.components },
      reasons: scoring.reasons,
    };
  }

  /**
   * Called once the transaction is actually settled — moves the actor's
   * rolling profile + counterparty edge forward.
   */
  async commit(input: AssessInput): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.actorProfile.upsert({
        where: { externalRef: input.actorExternalRef },
        update: {
          rolling24hUsdMinor: { increment: input.amountUsdMinor },
          rolling24hCount: { increment: 1 },
          lifetimeCount: { increment: 1 },
          lastSeenAt: new Date(),
        },
        create: {
          externalRef: input.actorExternalRef,
          rolling24hUsdMinor: input.amountUsdMinor,
          rolling24hCount: 1,
          lifetimeCount: 1,
          meanTicketUsdMinor: input.amountUsdMinor,
          stddevTicketUsdMinor: 0n,
          lastSeenAt: new Date(),
        },
      }),
      ...(input.counterpartyRef
        ? [
            this.prisma.counterpartyEdge.upsert({
              where: {
                actorExternalRef_counterpartyRef: {
                  actorExternalRef: input.actorExternalRef,
                  counterpartyRef: input.counterpartyRef,
                },
              },
              update: {
                txCount: { increment: 1 },
                totalUsdMinor: { increment: input.amountUsdMinor },
              },
              create: {
                actorExternalRef: input.actorExternalRef,
                counterpartyRef: input.counterpartyRef,
                txCount: 1,
                totalUsdMinor: input.amountUsdMinor,
              },
            }),
          ]
        : []),
    ]);

    // Update EMA baseline outside the transaction (cheap, independent).
    await this.recomputeBaseline(input.actorExternalRef, input.amountUsdMinor);
  }

  private async loadOrInitProfile(externalRef: string) {
    return this.prisma.actorProfile.upsert({
      where: { externalRef },
      update: {},
      create: { externalRef },
    });
  }

  private async recomputeBaseline(externalRef: string, sample: bigint): Promise<void> {
    const profile = await this.prisma.actorProfile.findUnique({ where: { externalRef } });
    if (!profile) return;
    const alpha = 0.2; // EMA smoothing
    const meanPrev = Number(profile.meanTicketUsdMinor);
    const samplenum = Number(sample);
    const meanNext = Math.round(meanPrev * (1 - alpha) + samplenum * alpha);
    const stddevPrev = Number(profile.stddevTicketUsdMinor);
    const variance =
      stddevPrev * stddevPrev * (1 - alpha) + Math.pow(samplenum - meanPrev, 2) * alpha;
    const stddevNext = Math.round(Math.sqrt(Math.max(0, variance)));
    await this.prisma.actorProfile.update({
      where: { externalRef },
      data: {
        meanTicketUsdMinor: BigInt(meanNext),
        stddevTicketUsdMinor: BigInt(stddevNext),
      },
    });
  }

  private decide(score: number): RiskDecision {
    if (score >= this.env.RISK_BLOCK_THRESHOLD) return 'BLOCK';
    if (score >= this.env.RISK_REVIEW_THRESHOLD) return 'REVIEW';
    return 'ALLOW';
  }

  async listAssessments(opts: { limit: number; decision?: RiskDecision }) {
    const rows = await this.prisma.riskAssessment.findMany({
      where: opts.decision ? { decision: opts.decision } : undefined,
      orderBy: { createdAt: 'desc' },
      take: opts.limit,
    });
    return rows.map((row) => this.toAssessmentResponse(row));
  }

  async getSummary() {
    const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [total24h, grouped, actorCount, pendingReview] = await Promise.all([
      this.prisma.riskAssessment.count({ where: { createdAt: { gte: since24h } } }),
      this.prisma.riskAssessment.groupBy({
        by: ['decision'],
        _count: { _all: true },
        where: { createdAt: { gte: since24h } },
      }),
      this.prisma.actorProfile.count(),
      this.prisma.riskAssessment.count({
        where: { decision: 'REVIEW', createdAt: { gte: since24h } },
      }),
    ]);

    const counts = { ALLOW: 0, REVIEW: 0, BLOCK: 0 };
    for (const row of grouped) counts[row.decision] = row._count._all;

    return {
      thresholds: {
        review: this.env.RISK_REVIEW_THRESHOLD,
        block: this.env.RISK_BLOCK_THRESHOLD,
      },
      last_24h: { total: total24h, ...counts },
      pending_review_24h: pendingReview,
      actor_profiles: actorCount,
    };
  }

  async listHighVelocityActors(limit: number) {
    const rows = await this.prisma.actorProfile.findMany({
      orderBy: [{ rolling24hUsdMinor: 'desc' }, { rolling24hCount: 'desc' }],
      take: limit,
    });
    return rows.map((row) => ({
      external_ref: row.externalRef,
      rolling_24h_usd_minor: row.rolling24hUsdMinor.toString(),
      rolling_24h_count: row.rolling24hCount,
      lifetime_count: row.lifetimeCount,
      mean_ticket_usd_minor: row.meanTicketUsdMinor.toString(),
      last_seen_at: row.lastSeenAt?.toISOString() ?? null,
    }));
  }

  private toAssessmentResponse(row: {
    id: string;
    intentId: string | null;
    transactionId: string | null;
    actorExternalRef: string;
    counterpartyRef: string | null;
    amountUsdMinor: bigint;
    components: unknown;
    finalScore: number;
    decision: RiskDecision;
    reasons: string[];
    createdAt: Date;
  }) {
    return {
      id: row.id,
      intent_id: row.intentId,
      transaction_id: row.transactionId,
      actor_external_ref: row.actorExternalRef,
      counterparty_ref: row.counterpartyRef,
      amount_usd_minor: row.amountUsdMinor.toString(),
      components: row.components as Record<string, number>,
      final_score: row.finalScore,
      decision: row.decision,
      reasons: row.reasons,
      created_at: row.createdAt.toISOString(),
    };
  }
}
