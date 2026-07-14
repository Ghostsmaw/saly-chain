import { Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma, Rail } from '../generated/prisma/index.js';
import { ConflictError, ValidationError } from '@salychain/errors';
import { PrismaService } from '../prisma/prisma.service.js';
import { ROUTING_ENV, type RoutingEnv } from '../config/env.js';
import {
  RAIL_EVALUATORS,
  type RailEvaluation,
  type RailEvaluator,
  type RoutingInput,
} from '../evaluators/rail.evaluator.js';

export interface DecideInput extends RoutingInput {
  intentId?: string;
  correlationKey?: string;
}

export interface DecideOutput {
  decision_id: string;
  selected_rail: Rail;
  selected_score: number;
  rationale: string;
  candidates: Array<{
    rail: Rail;
    available: boolean;
    score: number;
    expected_cost_usd_minor: string;
    expected_seconds: number;
    reliability: number;
    privacy: number;
    notes: string[];
  }>;
}

/**
 * The decider runs every registered evaluator in parallel, normalizes their
 * outputs into 0..100 sub-scores per dimension, weights them, and picks the
 * highest-scoring available rail.
 *
 * Scoring is deterministic, fully auditable, and the entire decision (input +
 * candidates + pick) is persisted to `RouteDecision`.
 */
@Injectable()
export class RoutingDecider {
  private readonly logger = new Logger(RoutingDecider.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(RAIL_EVALUATORS) private readonly evaluators: RailEvaluator[],
    @Inject(ROUTING_ENV) private readonly env: RoutingEnv,
  ) {
    const total =
      env.ROUTING_WEIGHT_COST + env.ROUTING_WEIGHT_SPEED + env.ROUTING_WEIGHT_RELIABILITY + env.ROUTING_WEIGHT_PRIVACY;
    if (total !== 100) {
      throw new Error(`Routing weights must sum to 100 (got ${total})`);
    }
  }

  async decide(input: DecideInput): Promise<DecideOutput> {
    if (input.amountMinor <= 0n) {
      throw ValidationError('routing.bad_amount', 'amountMinor must be positive');
    }

    const enabledByRail: Record<Rail, boolean> = {
      INTERNAL: this.env.ROUTING_INTERNAL_ENABLED,
      BASE: this.env.ROUTING_BASE_ENABLED,
      XRPL: this.env.ROUTING_XRPL_ENABLED,
      L3: this.env.ROUTING_L3_ENABLED,
      FIAT: this.env.ROUTING_FIAT_ENABLED,
      ESCROW: this.env.ROUTING_ESCROW_ENABLED,
    };

    const evaluations = await Promise.all(this.evaluators.map((e) => e.evaluate(input)));
    const candidates = evaluations.map((evaluation) => {
      const operationallyDisabled = !enabledByRail[evaluation.rail];
      const available = evaluation.available && !operationallyDisabled;
      if (operationallyDisabled) evaluation.notes.push('rail is operationally disabled');
      const score = available ? this.scoreRail(evaluation, input) : 0;
      return { evaluation, available, score };
    });

    const availableCandidates = candidates.filter((c) => c.available);
    if (availableCandidates.length === 0) {
      throw ConflictError(
        'routing.no_rail_available',
        `No rail can serve this intent (currencies: ${input.source.currency}→${input.destination.currency})`,
      );
    }

    availableCandidates.sort((a, b) => b.score - a.score);
    const winner = availableCandidates[0];

    const rationale = this.buildRationale(winner.evaluation, winner.score, availableCandidates.length);

    const candidatesJson = candidates.map((c) => ({
      rail: c.evaluation.rail,
      available: c.available,
      score: c.score,
      expected_cost_usd_minor: c.evaluation.expectedCostUsdMinor.toString(),
      expected_seconds: c.evaluation.expectedSeconds,
      reliability: c.evaluation.reliability,
      privacy: c.evaluation.privacy,
      notes: c.evaluation.notes,
    }));

    const persisted = await this.prisma.routeDecision.create({
      data: {
        intentId: input.intentId ?? null,
        correlationKey: input.correlationKey ?? null,
        input: this.snapshotInput(input) as Prisma.InputJsonValue,
        candidates: candidatesJson as unknown as Prisma.InputJsonValue,
        selectedRail: winner.evaluation.rail,
        selectedScore: winner.score,
        rationale,
      },
    });

    this.logger.log(
      `routed → ${winner.evaluation.rail} (score=${winner.score}) for ${input.amountMinor} ${input.source.currency}`,
    );

    return {
      decision_id: persisted.id,
      selected_rail: winner.evaluation.rail,
      selected_score: winner.score,
      rationale,
      candidates: candidatesJson,
    };
  }

  // ──────────────────────── Scoring ────────────────────────

  private scoreRail(evaluation: RailEvaluation, input: RoutingInput): number {
    // Cost score: cheaper = higher. We normalize against an anchor of $1.00 (100 USD-cents).
    const costAnchor = 100n;
    const cost = evaluation.expectedCostUsdMinor;
    const costScore = cost === 0n ? 100 : Math.max(0, 100 - Number((cost * 100n) / costAnchor));

    // Speed score: faster = higher. Anchor at 60s for full credit, scale linearly to 0 at 6h.
    const speedScore =
      evaluation.expectedSeconds <= 60
        ? 100
        : Math.max(0, Math.round(100 - ((evaluation.expectedSeconds - 60) / (60 * 60 * 6)) * 100));

    let score =
      (costScore * this.env.ROUTING_WEIGHT_COST +
        speedScore * this.env.ROUTING_WEIGHT_SPEED +
        evaluation.reliability * this.env.ROUTING_WEIGHT_RELIABILITY +
        evaluation.privacy * this.env.ROUTING_WEIGHT_PRIVACY) /
      100;

    // Preference nudge: if user opted for a dimension, add a 5-point bonus to its leader.
    switch (input.preference) {
      case 'cheapest':
        score += costScore >= 80 ? 5 : 0;
        break;
      case 'fastest':
        score += speedScore >= 80 ? 5 : 0;
        break;
      case 'most_private':
        score += evaluation.privacy >= 80 ? 5 : 0;
        break;
      default:
        break;
    }

    // Risk penalty: high-risk intents prefer rails with claw-back (INTERNAL > FIAT > BASE/XRPL).
    if ((input.riskScore ?? 0) >= 70 && (evaluation.rail === 'BASE' || evaluation.rail === 'XRPL')) {
      score -= 10;
    }
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private buildRationale(winner: RailEvaluation, score: number, candidateCount: number): string {
    return [
      `Selected ${winner.rail} with score ${score}.`,
      `Considered ${candidateCount} available rail${candidateCount === 1 ? '' : 's'}.`,
      `Expected cost ≈ $${(Number(winner.expectedCostUsdMinor) / 100).toFixed(2)},`,
      `expected settlement ≈ ${winner.expectedSeconds}s,`,
      `reliability ${winner.reliability}/100, privacy ${winner.privacy}/100.`,
    ].join(' ');
  }

  private snapshotInput(input: DecideInput): Record<string, unknown> {
    return {
      source: input.source,
      destination: input.destination,
      amount_minor: input.amountMinor.toString(),
      risk_score: input.riskScore ?? null,
      preference: input.preference ?? 'balanced',
      intent_kind: input.intentKind ?? null,
      swap_execution: input.swapExecution ?? null,
    };
  }
}
