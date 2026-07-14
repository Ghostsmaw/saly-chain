import { describe, expect, it } from 'vitest';
import { StubFiatAdapter } from './stub.adapter.js';
import { parsePaystackPayinWebhook } from './webhooks/paystack.js';
import { parseFlutterwavePayinWebhook } from './webhooks/flutterwave.js';

describe('StubFiatAdapter pay-in', () => {
  it('issues a virtual account instruction', async () => {
    const stub = new StubFiatAdapter({ settlementLatencyMs: 10_000 });
    const ins = await stub.createPayin({
      correlationId: 'tx_payin_1',
      amountMinor: '500000',
      currency: 'NGN',
      customer: { name: 'Acme Ltd', countryCode: 'NG' },
    });
    expect(ins.method).toBe('VIRTUAL_ACCOUNT');
    expect(ins.status).toBe('PENDING');
    expect(ins.accountNumber).toMatch(/^\d{10}$/);
    expect(ins.currency).toBe('NGN');
  });

  it('is idempotent on correlationId', async () => {
    const stub = new StubFiatAdapter({ settlementLatencyMs: 10_000 });
    const a = await stub.createPayin({
      correlationId: 'tx_payin_dup',
      amountMinor: '1000',
      currency: 'NGN',
      customer: { name: 'Acme', countryCode: 'NG' },
    });
    const b = await stub.createPayin({
      correlationId: 'tx_payin_dup',
      amountMinor: '1000',
      currency: 'NGN',
      customer: { name: 'Acme', countryCode: 'NG' },
    });
    expect(b.pspReference).toBe(a.pspReference);
  });

  it('settles via getPayinStatus once funded', async () => {
    const stub = new StubFiatAdapter({ settlementLatencyMs: 10_000 });
    const ins = await stub.createPayin({
      correlationId: 'tx_payin_2',
      amountMinor: '2500',
      currency: 'NGN',
      customer: { name: 'Acme', countryCode: 'NG' },
    });
    expect((await stub.getPayinStatus(ins.pspReference))?.status).toBe('PENDING');
    stub._settlePayin(ins.pspReference);
    const settled = await stub.getPayinStatus(ins.pspReference);
    expect(settled?.status).toBe('SETTLED');
    expect(settled?.settledAt).toBeTruthy();
  });

  it('supports a checkout method when requested', async () => {
    const stub = new StubFiatAdapter();
    const ins = await stub.createPayin({
      correlationId: 'tx_payin_3',
      amountMinor: '1000',
      currency: 'USD',
      method: 'CHECKOUT',
      customer: { name: 'Acme', countryCode: 'US' },
    });
    expect(ins.method).toBe('CHECKOUT');
    expect(ins.checkoutUrl).toContain(ins.pspReference);
  });
});

describe('pay-in webhook parsers', () => {
  it('parses a Paystack charge.success into a settled pay-in', () => {
    const parsed = parsePaystackPayinWebhook({
      event: 'charge.success',
      data: {
        id: 99,
        reference: 'tx_abc',
        status: 'success',
        amount: 500000,
        currency: 'NGN',
        paid_at: '2026-06-29T22:00:00Z',
      },
    });
    expect(parsed).not.toBeNull();
    expect(parsed!.outcome).toBe('SETTLED');
    expect(parsed!.reference).toBe('tx_abc');
    expect(parsed!.amountMinor).toBe('500000');
  });

  it('ignores Paystack transfer events on the pay-in parser', () => {
    expect(
      parsePaystackPayinWebhook({
        event: 'transfer.success',
        data: { reference: 'x', transfer_code: 'trf_1' },
      }),
    ).toBeNull();
  });

  it('parses a Flutterwave charge.completed using tx_ref', () => {
    const parsed = parseFlutterwavePayinWebhook({
      event: 'charge.completed',
      data: { id: 7, tx_ref: 'tx_xyz', status: 'successful', amount: 5000, currency: 'NGN' },
    });
    expect(parsed).not.toBeNull();
    expect(parsed!.outcome).toBe('SETTLED');
    expect(parsed!.reference).toBe('tx_xyz');
    expect(parsed!.amountMinor).toBe('500000');
  });

  it('returns FAILED for a failed Flutterwave charge', () => {
    const parsed = parseFlutterwavePayinWebhook({
      event: 'charge.completed',
      data: { id: 8, tx_ref: 'tx_fail', status: 'failed', amount: 100, currency: 'NGN' },
    });
    expect(parsed!.outcome).toBe('FAILED');
  });
});
