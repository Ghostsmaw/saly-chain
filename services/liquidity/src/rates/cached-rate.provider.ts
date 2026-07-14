import type { RateProvider, RateQuote } from './rate.provider.js';

interface CacheEntry {
  quote: RateQuote;
  expiresAt: number;
}

/**
 * In-memory TTL cache wrapper — reduces upstream API load and quote latency.
 */
export class CachedRateProvider implements RateProvider {
  readonly name: string;
  private readonly cache = new Map<string, CacheEntry>();

  constructor(
    private readonly inner: RateProvider,
    private readonly ttlMs: number,
  ) {
    this.name = `cached:${inner.name}`;
  }

  async getMidRate(base: string, quote: string): Promise<RateQuote> {
    const key = `${base.toUpperCase()}_${quote.toUpperCase()}`;
    const hit = this.cache.get(key);
    if (hit && hit.expiresAt > Date.now()) return hit.quote;

    const quoteResult = await this.inner.getMidRate(base, quote);
    this.cache.set(key, { quote: quoteResult, expiresAt: Date.now() + this.ttlMs });
    return quoteResult;
  }

  /** Test helper — clear cached entries. */
  _clearCache(): void {
    this.cache.clear();
  }
}
