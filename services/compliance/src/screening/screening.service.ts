import { Inject, Injectable, Logger } from '@nestjs/common';
import { ulid } from 'ulid';
import { ScreeningDecision } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  type SanctionsProvider,
  type ScreeningTarget,
} from './screening.provider.js';

export const SANCTIONS_PROVIDER = Symbol('SANCTIONS_PROVIDER');

export interface ScreenSubjectInput {
  intentId?: string;
  transactionId?: string;
  subjectRef: string;
  subjectKind: 'USER' | 'BUSINESS' | 'COUNTERPARTY' | 'AGENT';
  displayName?: string;
  countryCode?: string;
  chainAddress?: { chain: string; address: string };
}

export interface ScreenSubjectOutcome {
  decision: ScreeningDecision;
  /** Highest score across all results — drives policy thresholds. */
  maxScore: number;
  /** Stable correlation id for this screening run (returned to caller for audit). */
  runId: string;
  results: Array<{
    category: string;
    decision: ScreeningDecision;
    score: number;
    matchedListIds: string[];
  }>;
  caseId?: string;
}

/**
 * The single ingress to compliance screening.
 *
 * Lifecycle of `screen()`:
 *
 *   1. Upsert the `ComplianceSubject` (so we have a stable handle).
 *   2. Run all configured providers against the target.
 *   3. Persist every result row (immutable audit).
 *   4. Collapse the per-result decisions into an aggregate decision using the
 *      strictest-wins rule (BLOCK > REVIEW > ALLOW).
 *   5. If REVIEW or BLOCK, open a `ComplianceCase` for human review.
 */
@Injectable()
export class ScreeningService {
  private readonly logger = new Logger(ScreeningService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(SANCTIONS_PROVIDER) private readonly provider: SanctionsProvider,
  ) {}

  async screen(input: ScreenSubjectInput): Promise<ScreenSubjectOutcome> {
    const runId = ulid();

    const subject = await this.prisma.complianceSubject.upsert({
      where: { externalRef: input.subjectRef },
      update: {
        displayName: input.displayName ?? undefined,
        countryCode: input.countryCode ?? undefined,
      },
      create: {
        externalRef: input.subjectRef,
        kind: input.subjectKind,
        displayName: input.displayName ?? null,
        countryCode: input.countryCode ?? null,
      },
    });

    const target: ScreeningTarget = {
      identifier: input.subjectRef,
      displayName: input.displayName,
      countryCode: input.countryCode,
      chainAddress: input.chainAddress,
    };
    const providerResults = await this.provider.screen(target);

    const persisted = await this.prisma.$transaction(
      providerResults.map((r) =>
        this.prisma.screeningResult.create({
          data: {
            subjectId: subject.id,
            targetIdentifier: input.subjectRef,
            category: r.category,
            decision: r.decision,
            provider: r.provider,
            score: r.score,
            matchedListIds: r.matchedListIds,
            details: { ...r.details, run_id: runId },
          },
        }),
      ),
    );

    const decision: ScreeningDecision = aggregateDecision(persisted.map((r) => r.decision));
    const maxScore = persisted.reduce((m, r) => Math.max(m, r.score), 0);

    let caseId: string | undefined;
    if (decision !== 'ALLOW') {
      const created = await this.prisma.complianceCase.create({
        data: {
          subjectId: subject.id,
          intentId: input.intentId ?? null,
          transactionId: input.transactionId ?? null,
          status: 'OPEN',
          priority: decision === 'BLOCK' ? 'CRITICAL' : maxScore >= 70 ? 'HIGH' : 'MEDIUM',
          summary: `Screening flagged with decision ${decision} (max score ${maxScore})`,
        },
      });
      caseId = created.id;
    }

    this.logger.log(
      `screened ${input.subjectRef} → ${decision} (score ${maxScore}, ${persisted.length} results)`,
    );

    return {
      decision,
      maxScore,
      runId,
      results: persisted.map((r) => ({
        category: r.category,
        decision: r.decision,
        score: r.score,
        matchedListIds: r.matchedListIds,
      })),
      caseId,
    };
  }
}

function aggregateDecision(decisions: ScreeningDecision[]): ScreeningDecision {
  if (decisions.includes('BLOCK')) return 'BLOCK';
  if (decisions.includes('REVIEW')) return 'REVIEW';
  return 'ALLOW';
}
