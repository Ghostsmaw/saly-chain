import { describe, expect, it } from 'vitest';
import { StubRateProvider } from './stub-rate.provider.js';

describe('StubRateProvider', () => {
  const p = new StubRateProvider();

  it('returns 1.0 for same-currency pairs', async () => {
    const r = await p.getMidRate('USD', 'USD');
    expect(r.midRate1e8).toBe(100_000_000n);
  });

  it('returns direct mid for known pairs', async () => {
    const r = await p.getMidRate('USD', 'NGN');
    expect(r.midRate1e8).toBe(150_200_000_000n);
  });

  it('derives inverse pairs', async () => {
    const r = await p.getMidRate('NGN', 'USD');
    // 1e16 / 150200000000 = 66577.89... rounded down → 66577
    expect(r.midRate1e8).toBe(10n ** 16n / 150_200_000_000n);
  });

  it('throws for unknown pairs', async () => {
    await expect(p.getMidRate('XXX', 'YYY')).rejects.toMatchObject({ code: 'liquidity.pair_unsupported' });
  });
});
