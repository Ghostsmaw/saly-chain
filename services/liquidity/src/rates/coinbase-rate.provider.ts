import { ExternalError, NotFoundError } from '@salychain/errors';
import type { RateProvider, RateQuote } from './rate.provider.js';
import { decimalRateToMidRate1e8, invertMidRate1e8, sameCurrencyQuote } from './rate-utils.js';

interface CoinbaseRatesResponse {
  data: { currency: string; rates: Record<string, string> };
}

/**
 * Coinbase public exchange-rates API (no API key required).
 * https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-exchange-rates
 */
export class CoinbaseRateProvider implements RateProvider {
  readonly name = 'coinbase';

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
    const url = `${this.opts.baseUrl ?? 'https://api.coinbase.com'}/v2/exchange-rates?currency=${encodeURIComponent(b)}`;
    const res = await fetchFn(url, { signal: AbortSignal.timeout(this.opts.timeoutMs ?? 8_000) });
    if (!res.ok) {
      throw ExternalError('liquidity.rate_provider_error', `Coinbase rates HTTP ${res.status}`);
    }
    const body = (await res.json()) as CoinbaseRatesResponse;
    const direct = body.data.rates[q];
    if (direct) {
      return {
        midRate1e8: decimalRateToMidRate1e8(direct),
        provider: this.name,
        capturedAt: new Date(),
      };
    }
    const inverse = body.data.rates[b];
    if (inverse && q === body.data.currency.toUpperCase()) {
      const inv = decimalRateToMidRate1e8(inverse);
      return { midRate1e8: invertMidRate1e8(inv), provider: this.name, capturedAt: new Date() };
    }
    throw NotFoundError('liquidity.pair_unsupported', `Coinbase does not list ${b}/${q}`);
  }
}
