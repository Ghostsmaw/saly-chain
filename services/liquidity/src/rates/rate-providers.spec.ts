import { describe, expect, it } from 'vitest';
import { CoinbaseRateProvider } from './coinbase-rate.provider.js';
import { CompositeRateProvider } from './composite-rate.provider.js';
import { CachedRateProvider } from './cached-rate.provider.js';
import { StubRateProvider } from './stub-rate.provider.js';
import { decimalRateToMidRate1e8 } from './rate-utils.js';

describe('decimalRateToMidRate1e8', () => {
  it('parses decimal rates', () => {
    expect(decimalRateToMidRate1e8('1502.45')).toBe(150_245_000_000n);
    expect(decimalRateToMidRate1e8('1')).toBe(100_000_000n);
  });
});

describe('CoinbaseRateProvider', () => {
  it('maps API response to midRate1e8', async () => {
    const fetchFn = async () =>
      new Response(
        JSON.stringify({ data: { currency: 'USD', rates: { NGN: '1500.25', EUR: '0.92' } } }),
        { status: 200 },
      );

    const p = new CoinbaseRateProvider({ fetchFn });
    const r = await p.getMidRate('USD', 'NGN');
    expect(r.midRate1e8).toBe(150_025_000_000n);
    expect(r.provider).toBe('coinbase');
  });
});

describe('CompositeRateProvider', () => {
  it('falls back to second provider', async () => {
    const failing = {
      name: 'fail',
      getMidRate: async () => {
        throw new Error('down');
      },
    };
    const p = new CompositeRateProvider([failing, new StubRateProvider()]);
    const r = await p.getMidRate('USD', 'NGN');
    expect(r.midRate1e8).toBe(150_200_000_000n);
    expect(r.provider).toContain('stub');
  });
});

describe('CachedRateProvider', () => {
  it('returns cached quote within TTL', async () => {
    let calls = 0;
    const inner = {
      name: 'inner',
      getMidRate: async () => {
        calls += 1;
        return { midRate1e8: 100n, provider: 'inner', capturedAt: new Date() };
      },
    };
    const cached = new CachedRateProvider(inner, 60_000);
    await cached.getMidRate('USD', 'EUR');
    await cached.getMidRate('USD', 'EUR');
    expect(calls).toBe(1);
  });
});
