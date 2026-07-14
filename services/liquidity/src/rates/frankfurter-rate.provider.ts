import { ExternalError, NotFoundError } from '@salychain/errors';
import type { RateProvider, RateQuote } from './rate.provider.js';
import { decimalRateToMidRate1e8, invertMidRate1e8, sameCurrencyQuote } from './rate-utils.js';

interface FrankfurterResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

/**
 * Frankfurter — free ECB reference rates for major fiat pairs.
 * https://www.frankfurter.app/docs/
 */
export class FrankfurterRateProvider implements RateProvider {
  readonly name = 'frankfurter';

  constructor(
    private readonly opts: {
      baseUrl?: string;
      fetchFn?: typeof fetch;
      timeoutMs?: number;
    } = {},
  ) {}

  async getMidRate(base: string, quote: string): Promise<RateQuote> {
    const b = base.toUpperCase();
    const q = quote.toUpperCase();
    if (b === q) return sameCurrencyQuote(b, q, this.name);

    const fetchFn = this.opts.fetchFn ?? fetch;
    const root = this.opts.baseUrl ?? 'https://api.frankfurter.app';
    const url = `${root}/latest?from=${encodeURIComponent(b)}&to=${encodeURIComponent(q)}`;
    const res = await fetchFn(url, { signal: AbortSignal.timeout(this.opts.timeoutMs ?? 8_000) });
    if (!res.ok) {
      throw ExternalError('liquidity.rate_provider_error', `Frankfurter rates HTTP ${res.status}`);
    }
    const body = (await res.json()) as FrankfurterResponse;
    const direct = body.rates[q];
    if (direct !== undefined) {
      return {
        midRate1e8: decimalRateToMidRate1e8(String(direct)),
        provider: this.name,
        capturedAt: new Date(),
      };
    }

    const inverseUrl = `${root}/latest?from=${encodeURIComponent(q)}&to=${encodeURIComponent(b)}`;
    const invRes = await fetchFn(inverseUrl, { signal: AbortSignal.timeout(this.opts.timeoutMs ?? 8_000) });
    if (invRes.ok) {
      const invBody = (await invRes.json()) as FrankfurterResponse;
      const inv = invBody.rates[b];
      if (inv !== undefined) {
        return {
          midRate1e8: invertMidRate1e8(decimalRateToMidRate1e8(String(inv))),
          provider: this.name,
          capturedAt: new Date(),
        };
      }
    }

    throw NotFoundError('liquidity.pair_unsupported', `Frankfurter does not list ${b}/${q}`);
  }
}
