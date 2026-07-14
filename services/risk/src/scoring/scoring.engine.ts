import { Injectable } from '@nestjs/common';

/**
 * Pure scoring engine. No DB, no I/O. Takes a snapshot of the actor's
 * profile + the proposed transaction and returns a final score (0..100) plus
 * the component scores that contributed to it.
 *
 * Each component is bounded [0, 100]; the final score is a weighted average
 * with weights summing to 100. Reasons explain the dominant signals.
 *
 * This engine will be replaced or augmented by a trained model in S4; the
 * abstraction here is to keep the contract narrow so the swap is mechanical.
 */

export interface ScoringInput {
  amountUsdMinor: bigint;
  profile: {
    rolling24hUsdMinor: bigint;
    rolling24hCount: number;
    lifetimeCount: number;
    meanTicketUsdMinor: bigint;
    stddevTicketUsdMinor: bigint;
  };
  counterparty: {
    /** Number of prior transfers to this counterparty (0 → first time). */
    txCount: number;
  };
  /** Optional per-actor velocity policy. */
  policy?: {
    perTxCapUsdMinor?: bigint;
    daily24hCapUsdMinor?: bigint;
  };
  /**
   * Optional counterparty entity signal sourced from the Intelligence service
   * (B8). Applied *after* the weighted base score: a sanctioned counterparty
   * forces a BLOCK-level score, and a high entity risk raises (never lowers) the
   * base score. Absent ⇒ behaviour is identical to the rule-only engine.
   */
  entity?: {
    riskScore?: number;
    sanctioned?: boolean;
  };
}

export interface ScoringComponents {
  amount: number;
  velocity24h: number;
  newCounterparty: number;
  newActor: number;
  deviation: number;
}

export interface ScoringResult {
  finalScore: number;
  components: ScoringComponents;
  reasons: string[];
}

const WEIGHTS: ScoringComponents = {
  amount: 25,
  velocity24h: 30,
  newCounterparty: 15,
  newActor: 10,
  deviation: 20,
};

@Injectable()
export class ScoringEngine {
  score(input: ScoringInput): ScoringResult {
    const reasons: string[] = [];
    const amountUsdMinor = input.amountUsdMinor;

    // 1) Amount component — scales toward 100 as the amount approaches the
    //    actor's per-tx cap (or $50k absent a policy).
    const cap = input.policy?.perTxCapUsdMinor ?? 5_000_000n; // $50k
    const amount = pct(amountUsdMinor, cap);
    if (amount > 70) reasons.push(`large amount vs cap (${amount}%)`);

    // 2) 24h velocity — scales toward 100 as the rolling total approaches the daily cap.
    const dailyCap = input.policy?.daily24hCapUsdMinor ?? 25_000_000n; // $250k
    const projected24h = input.profile.rolling24hUsdMinor + amountUsdMinor;
    const velocity24h = pct(projected24h, dailyCap);
    if (velocity24h > 70) reasons.push(`24h volume approaches daily cap (${velocity24h}%)`);

    // 3) New counterparty — boost if first time, decay over first ~5 txs.
    const newCounterparty =
      input.counterparty.txCount === 0
        ? 80
        : input.counterparty.txCount < 5
          ? Math.max(0, 60 - input.counterparty.txCount * 12)
          : 0;
    if (input.counterparty.txCount === 0) reasons.push('first-time counterparty');

    // 4) New actor — boost during onboarding (first 10 lifetime txs).
    const newActor =
      input.profile.lifetimeCount === 0
        ? 90
        : input.profile.lifetimeCount < 10
          ? Math.max(0, 70 - input.profile.lifetimeCount * 7)
          : 0;
    if (input.profile.lifetimeCount === 0) reasons.push('new actor (first transaction)');

    // 5) Deviation from baseline — z-score-style, clipped to [0, 100]. If we
    //    have no stddev (early days), use a flat 20 to avoid divide-by-zero
    //    overconfidence.
    let deviation = 20;
    if (input.profile.stddevTicketUsdMinor > 0n && input.profile.meanTicketUsdMinor > 0n) {
      const diff = abs(amountUsdMinor - input.profile.meanTicketUsdMinor);
      const z = Number((diff * 1000n) / input.profile.stddevTicketUsdMinor) / 1000;
      deviation = Math.min(100, Math.round(z * 20));
      if (z >= 3) reasons.push(`amount deviates ${z.toFixed(1)}σ from baseline`);
    }

    const components: ScoringComponents = {
      amount,
      velocity24h,
      newCounterparty,
      newActor,
      deviation,
    };
    let finalScore = clip(
      Math.round(
        (components.amount * WEIGHTS.amount +
          components.velocity24h * WEIGHTS.velocity24h +
          components.newCounterparty * WEIGHTS.newCounterparty +
          components.newActor * WEIGHTS.newActor +
          components.deviation * WEIGHTS.deviation) /
          100,
      ),
    );

    // 6) Entity overlay (Intelligence-sourced) — applied on top of the base.
    if (input.entity?.sanctioned) {
      finalScore = 100;
      reasons.push('counterparty linked to a sanctioned entity');
    } else if (typeof input.entity?.riskScore === 'number' && input.entity.riskScore > 0) {
      if (input.entity.riskScore > finalScore) finalScore = clip(input.entity.riskScore);
      if (input.entity.riskScore >= 70) {
        reasons.push(`counterparty entity risk ${Math.round(input.entity.riskScore)}`);
      }
    }

    return { finalScore, components, reasons };
  }
}

function pct(value: bigint, cap: bigint): number {
  if (cap <= 0n) return 0;
  const ratio = Number((value * 1000n) / cap) / 10;
  return clip(Math.round(ratio));
}

function abs(b: bigint): bigint {
  return b < 0n ? -b : b;
}

function clip(n: number): number {
  return Math.max(0, Math.min(100, n));
}
