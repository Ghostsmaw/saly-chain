import { describe, expect, it } from 'vitest';
import { PaystackFiatAdapter } from './paystack.adapter.js';
import type { FiatDestination } from './types.js';

const dest: FiatDestination = {
  currency: 'NGN',
  rail: 'NIP',
  accountIdentifier: '0123456789',
  bankCode: '058',
  holderName: 'Jane Doe',
  countryCode: 'NG',
};

describe('PaystackFiatAdapter', () => {
  it('supports NGN Nigeria bank accounts', () => {
    const a = new PaystackFiatAdapter('sk_test_x');
    expect(a.supports(dest)).toBe(true);
    expect(a.supports({ ...dest, currency: 'USD' })).toBe(false);
    expect(a.supports({ ...dest, bankCode: '' })).toBe(false);
  });

  it('requires secret key', () => {
    expect(() => new PaystackFiatAdapter('')).toThrow(/PAYSTACK_SECRET_KEY/);
  });
});
