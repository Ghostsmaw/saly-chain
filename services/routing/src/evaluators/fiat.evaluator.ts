import { StubFiatAdapter, inferFiatRail, type FiatAdapter, type FiatDestination, type FiatRail } from '@salychain/chain-fiat';
import type { RailEvaluation, RailEvaluator, RoutingInput } from './rail.evaluator.js';

/**
 * Fiat rail evaluator.
 *
 * Wired to a pluggable `FiatAdapter` (defaults to the in-memory stub for dev /
 * tests). When a partner PSP is integrated in the next slice we drop in a real
 * implementation behind the same interface — the evaluator's cost/eta/privacy
 * table doesn't change.
 *
 * For S3 we ship with `enabled: false` by default so production routing keeps
 * settling on internal/Base/XRPL. Operators can flip `ROUTING_FIAT_ENABLED=true`
 * once a PSP credential is in the vault.
 */
export interface FiatEvaluatorOptions {
  enabled?: boolean;
  adapter?: FiatAdapter;
}

const RAIL_PROFILES: Record<FiatRail, { etaSec: number; costUsdMinor: bigint; reliability: number }> = {
  SEPA_INSTANT: { etaSec: 10, costUsdMinor: 20n, reliability: 96 },
  SEPA:         { etaSec: 60 * 60 * 24, costUsdMinor: 10n, reliability: 99 },
  ACH:          { etaSec: 60 * 60 * 24 * 2, costUsdMinor: 25n, reliability: 99 },
  WIRE:         { etaSec: 60 * 60 * 6, costUsdMinor: 1_500n, reliability: 99 },
  FASTER:       { etaSec: 20, costUsdMinor: 5n, reliability: 99 },
  PIX:          { etaSec: 10, costUsdMinor: 5n, reliability: 99 },
  NIP:          { etaSec: 30, costUsdMinor: 30n, reliability: 95 },
  MPESA:        { etaSec: 30, costUsdMinor: 50n, reliability: 95 },
};

export class FiatRailEvaluator implements RailEvaluator {
  readonly rail = 'FIAT' as const;
  private readonly adapter: FiatAdapter;
  private readonly enabled: boolean;

  constructor(opts: FiatEvaluatorOptions = {}) {
    this.adapter = opts.adapter ?? new StubFiatAdapter();
    this.enabled = opts.enabled ?? false;
  }

  async evaluate(input: RoutingInput): Promise<RailEvaluation> {
    if (!this.enabled) {
      return unavailable('fiat rail disabled in this environment');
    }
    if (input.destination.type !== 'BANK_ACCOUNT') {
      return unavailable('destination is not a bank account');
    }
    const rail = inferFiatRail(input.destination.currency, input.destination.country_code);
    if (!rail) {
      return unavailable(`no fiat rail matches currency=${input.destination.currency} country=${input.destination.country_code ?? '??'}`);
    }
    // Pre-flight against the adapter so we don't quote a rail that would
    // reject the destination's account shape (IBAN vs SWIFT, etc).
    const candidate: FiatDestination = {
      currency: input.destination.currency,
      rail,
      accountIdentifier: input.destination.address ?? '',
      holderName: 'Recipient',
      countryCode: input.destination.country_code ?? '',
    };
    if (!this.adapter.supports(candidate)) {
      return unavailable(`adapter rejects destination shape for ${rail}`);
    }
    const profile = RAIL_PROFILES[rail];
    return {
      rail: 'FIAT',
      available: true,
      expectedCostUsdMinor: profile.costUsdMinor,
      expectedSeconds: profile.etaSec,
      reliability: profile.reliability,
      privacy: 75,
      notes: [`fiat rail: ${rail}`, `adapter: ${this.adapter.constructor.name}`],
    };
  }
}

function unavailable(reason: string): RailEvaluation {
  return {
    rail: 'FIAT',
    available: false,
    expectedCostUsdMinor: 0n,
    expectedSeconds: 0,
    reliability: 0,
    privacy: 80,
    notes: [reason],
  };
}
