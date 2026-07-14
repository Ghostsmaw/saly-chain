import { describe, expect, it } from 'vitest';
import { StubFiatAdapter } from './stub.adapter.js';
import type { FiatDestination } from './types.js';

const dest: FiatDestination = {
  currency: 'USD',
  rail: 'ACH',
  accountIdentifier: '021000021/000123456789',
  holderName: 'Acme LLC',
  countryCode: 'US',
};

describe('StubFiatAdapter', () => {
  it('accepts a well-formed destination', () => {
    const adapter = new StubFiatAdapter();
    expect(adapter.supports(dest)).toBe(true);
  });

  it('rejects malformed currency / country', () => {
    const adapter = new StubFiatAdapter();
    expect(adapter.supports({ ...dest, currency: 'USDC' })).toBe(false);
    expect(adapter.supports({ ...dest, countryCode: 'USA' })).toBe(false);
  });

  it('returns same transfer for same correlationId (idempotent)', async () => {
    const adapter = new StubFiatAdapter();
    const a = await adapter.send({ correlationId: 'corr-1', amountMinor: '1000', currency: 'USD', destination: dest });
    const b = await adapter.send({ correlationId: 'corr-1', amountMinor: '1000', currency: 'USD', destination: dest });
    expect(a.pspId).toBe(b.pspId);
  });

  it('settles after the configured latency', async () => {
    const adapter = new StubFiatAdapter({ settlementLatencyMs: 5 });
    const t = await adapter.send({ correlationId: 'corr-2', amountMinor: '1000', currency: 'USD', destination: dest });
    expect(t.status).toBe('PROCESSING');
    await new Promise((res) => setTimeout(res, 50));
    const fetched = await adapter.getStatus(t.pspId);
    expect(fetched?.status).toBe('SETTLED');
  });

  it('cancels only while pending', async () => {
    const adapter = new StubFiatAdapter({ settlementLatencyMs: 10_000 });
    const t = await adapter.send({ correlationId: 'corr-3', amountMinor: '1000', currency: 'USD', destination: dest });
    const r = await adapter.cancel(t.pspId);
    expect(r.canceled).toBe(true);
    expect((await adapter.getStatus(t.pspId))?.status).toBe('CANCELED');
  });
});
