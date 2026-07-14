import { describe, expect, it } from 'vitest';
import { CompositeFiatAdapter } from './composite.adapter.js';
import { StubFiatAdapter } from './stub.adapter.js';
import type { FiatDestination } from './types.js';

const ngnDest: FiatDestination = {
  currency: 'NGN',
  rail: 'NIP',
  accountIdentifier: '0123456789',
  bankCode: '058',
  holderName: 'Jane',
  countryCode: 'NG',
};

describe('CompositeFiatAdapter', () => {
  it('routes to supporting adapter', async () => {
    const stub = new StubFiatAdapter({ settlementLatencyMs: 1 });
    const composite = new CompositeFiatAdapter([stub]);
    const t = await composite.send({
      correlationId: 'c1',
      amountMinor: '10000',
      currency: 'NGN',
      destination: ngnDest,
    });
    expect(t.correlationId).toBe('c1');
    expect(t.status).toBe('PROCESSING');
  });
});

describe('createFiatAdapter factory', () => {
  it('defaults to stub provider', async () => {
    const { createFiatAdapter } = await import('./factory.js');
    const a = createFiatAdapter({
      FIAT_PSP_PROVIDER: 'stub',
      FLUTTERWAVE_BASE_URL: 'https://api.flutterwave.com/v3',
      PAYSTACK_BASE_URL: 'https://api.paystack.co',
      FIAT_STUB_SETTLEMENT_MS: 5,
    });
    expect(a.supports(ngnDest)).toBe(true);
  });
});
