import { describe, expect, it } from 'vitest';
import { ScoringEngine } from './scoring.engine.js';

const cleanProfile = {
  rolling24hUsdMinor: 0n,
  rolling24hCount: 0,
  lifetimeCount: 50, // seasoned actor
  meanTicketUsdMinor: 50_000n,
  stddevTicketUsdMinor: 10_000n,
};

describe('ScoringEngine', () => {
  const engine = new ScoringEngine();

  it('returns a low score for a typical, small transaction by a known actor', () => {
    const out = engine.score({
      amountUsdMinor: 30_000n, // $300
      profile: cleanProfile,
      counterparty: { txCount: 20 },
    });
    expect(out.finalScore).toBeLessThan(40);
  });

  it('boosts score when the actor is new', () => {
    // Same transaction by a seasoned actor + known counterparty = baseline.
    const baseline = engine.score({
      amountUsdMinor: 30_000n,
      profile: cleanProfile,
      counterparty: { txCount: 20 },
    });
    const out = engine.score({
      amountUsdMinor: 30_000n,
      profile: { ...cleanProfile, lifetimeCount: 0 },
      counterparty: { txCount: 0 },
    });
    // New actor + first-time counterparty must materially raise the score
    // relative to the seasoned baseline (robust to heuristic weight tuning).
    expect(out.finalScore).toBeGreaterThan(baseline.finalScore);
    expect(out.reasons).toContain('new actor (first transaction)');
    expect(out.reasons).toContain('first-time counterparty');
  });

  it('boosts score when amount approaches the per-tx cap', () => {
    const small = engine.score({
      amountUsdMinor: 100_000n,
      profile: cleanProfile,
      counterparty: { txCount: 10 },
      policy: { perTxCapUsdMinor: 1_000_000n }, // $10k
    });
    const big = engine.score({
      amountUsdMinor: 950_000n,
      profile: cleanProfile,
      counterparty: { txCount: 10 },
      policy: { perTxCapUsdMinor: 1_000_000n },
    });
    expect(big.finalScore).toBeGreaterThan(small.finalScore);
  });

  it('flags deviation from baseline when amount is wildly different', () => {
    const out = engine.score({
      amountUsdMinor: 100_000_000n, // $1M
      profile: cleanProfile,
      counterparty: { txCount: 10 },
    });
    expect(out.finalScore).toBeGreaterThan(60);
  });

  it('all component scores stay within [0,100]', () => {
    const out = engine.score({
      amountUsdMinor: 10_000_000_000n,
      profile: cleanProfile,
      counterparty: { txCount: 0 },
    });
    for (const v of Object.values(out.components)) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(100);
    }
    expect(out.finalScore).toBeLessThanOrEqual(100);
  });

  it('does not change the score when no entity signal is supplied', () => {
    const base = {
      amountUsdMinor: 30_000n,
      profile: cleanProfile,
      counterparty: { txCount: 20 },
    };
    const withoutEntity = engine.score(base);
    const withEmptyEntity = engine.score({ ...base, entity: {} });
    expect(withEmptyEntity.finalScore).toBe(withoutEntity.finalScore);
    expect(withEmptyEntity.reasons).toEqual(withoutEntity.reasons);
  });

  it('forces a max score when the counterparty entity is sanctioned', () => {
    const out = engine.score({
      amountUsdMinor: 30_000n,
      profile: cleanProfile,
      counterparty: { txCount: 20 },
      entity: { sanctioned: true },
    });
    expect(out.finalScore).toBe(100);
    expect(out.reasons).toContain('counterparty linked to a sanctioned entity');
  });

  it('raises (never lowers) the base score toward a high entity risk', () => {
    const base = {
      amountUsdMinor: 30_000n,
      profile: cleanProfile,
      counterparty: { txCount: 20 },
    };
    const baseline = engine.score(base);
    const raised = engine.score({ ...base, entity: { riskScore: 90 } });
    expect(raised.finalScore).toBe(90);
    expect(raised.finalScore).toBeGreaterThan(baseline.finalScore);
    expect(raised.reasons).toContain('counterparty entity risk 90');

    // A low entity risk must not pull a higher base score down.
    const lowered = engine.score({
      amountUsdMinor: 10_000_000_000n,
      profile: cleanProfile,
      counterparty: { txCount: 0 },
      entity: { riskScore: 5 },
    });
    const highBase = engine.score({
      amountUsdMinor: 10_000_000_000n,
      profile: cleanProfile,
      counterparty: { txCount: 0 },
    });
    expect(lowered.finalScore).toBe(highBase.finalScore);
  });
});
