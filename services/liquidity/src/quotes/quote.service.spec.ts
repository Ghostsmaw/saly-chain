import { describe, expect, it, vi, beforeEach } from 'vitest';
import { QuoteService } from './quote.service.js';
import type { RateProvider } from '../rates/rate.provider.js';
import type { LiquidityEnv } from '../config/env.js';

describe('QuoteService mid vs quoted rate', () => {
  let service: QuoteService;

  beforeEach(() => {
    const rates: RateProvider = {
      name: 'test',
      async getMidRate() {
        return {
          midRate1e8: 150_000_000n, // 1.5
          provider: 'coinbase',
          capturedAt: new Date(),
        };
      },
    };
    const env = { LIQUIDITY_QUOTE_TTL_SECONDS: 30, LIQUIDITY_QUOTE_SIGNING_SECRET: 'test-secret-32-chars-minimum!!' } as LiquidityEnv;
    const prisma = {
      fxRateSnapshot: { create: vi.fn() },
      quote: {
        create: vi.fn(async ({ data }) => ({ ...data, id: 'q1' })),
        update: vi.fn(async ({ data }) => ({ ...data, id: 'q1' })),
      },
    };
    service = new QuoteService(prisma as never, env, rates);
  });

  it('stores distinct mid and quoted rates', async () => {
    const res = await service.quote({
      fromCurrency: 'USD',
      toCurrency: 'NGN',
      fromAmountMinor: 1_000_000n,
    });
    expect(res.mid_rate_1e8).toBe('150000000');
    expect(BigInt(res.quoted_rate_1e8)).toBeLessThan(BigInt(res.mid_rate_1e8));
    expect(res.spread_bps).toBe(50);
  });

  it('previewQuote returns rates without persisting', async () => {
    const preview = await service.previewQuote({
      fromCurrency: 'USD',
      toCurrency: 'NGN',
      fromAmountMinor: 100_000n,
    });
    expect(preview.preview).toBe(true);
    expect(preview.mid_rate_1e8).toBe('150000000');
    expect(BigInt(preview.to_amount_minor)).toBeGreaterThan(0n);
  });
});
