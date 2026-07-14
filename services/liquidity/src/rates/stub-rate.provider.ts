import { NotFoundError } from '@salychain/errors';
import type { RateProvider, RateQuote } from './rate.provider.js';

/**
 * Hardcoded mid-market rates for development.
 *
 * The numbers below are illustrative anchors (rounded to 8 decimals). In
 * production we swap to a real provider (Coinbase Advanced Trade, Wise, OANDA)
 * keyed off `LIQUIDITY_RATE_PROVIDER` and the broker contract.
 *
 * Rates are stored as the cross from `base` to `quote`:
 *   1 base = midRate * 1e-8 quote
 * Inverse pairs are derived by inversion to keep the table small.
 */
export class StubRateProvider implements RateProvider {
  readonly name = 'stub';

  // 1 BASE = QUOTE  (e.g. USD → NGN ≈ 1502)
  private static readonly DIRECT: Record<string, bigint> = {
    USD_NGN: 150_200_000_000n,    // 1 USD = 1,502 NGN  (rate × 1e8 = 150200000000)
    USD_EUR: 92_500_000n,         // 1 USD = 0.925 EUR
    USD_GBP: 78_900_000n,
    USD_GHS: 14_650_000_000n,     // 1 USD = 146.5 GHS
    USD_KES: 12_900_000_000n,
    USD_ZAR: 18_600_000_000n,
    USDC_USD: 100_000_000n,       // assumed peg
    USD_USDC: 100_000_000n,
    USD_XRP: 158_730_158n,         // 1 USD = ~1.5873 XRP (1 / $0.63)
  };

  async getMidRate(base: string, quote: string): Promise<RateQuote> {
    if (base === quote) {
      return { midRate1e8: 100_000_000n, provider: this.name, capturedAt: new Date() };
    }
    const direct = StubRateProvider.DIRECT[`${base}_${quote}`];
    if (direct !== undefined) {
      return { midRate1e8: direct, provider: this.name, capturedAt: new Date() };
    }
    const inverse = StubRateProvider.DIRECT[`${quote}_${base}`];
    if (inverse !== undefined && inverse > 0n) {
      // mid * inverseMid = 1e16 → mid = 1e16 / inverseMid
      const midRate1e8 = (10n ** 16n) / inverse;
      return { midRate1e8, provider: this.name, capturedAt: new Date() };
    }
    throw NotFoundError(
      'liquidity.pair_unsupported',
      `Stub provider does not know the ${base}/${quote} pair`,
    );
  }
}
