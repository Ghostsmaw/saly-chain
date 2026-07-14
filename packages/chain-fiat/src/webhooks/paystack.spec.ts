import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { parsePaystackTransferWebhook, verifyPaystackWebhookSignature } from './paystack.js';

const SECRET = 'sk_test_paystack_secret';

describe('verifyPaystackWebhookSignature', () => {
  it('accepts a valid HMAC SHA512 signature', () => {
    const body = Buffer.from(JSON.stringify({ event: 'transfer.success' }));
    const sig = createHmac('sha512', SECRET).update(body).digest('hex');
    expect(verifyPaystackWebhookSignature(body, sig, SECRET)).toBe(true);
  });

  it('rejects tampered payloads', () => {
    const body = Buffer.from('{"event":"transfer.success"}');
    expect(verifyPaystackWebhookSignature(body, 'bad-signature', SECRET)).toBe(false);
  });
});

describe('parsePaystackTransferWebhook', () => {
  it('parses transfer.success', () => {
    const parsed = parsePaystackTransferWebhook({
      event: 'transfer.success',
      data: {
        id: 99,
        reference: '550e8400-e29b-41d4-a716-446655440000',
        transfer_code: 'TRF_abc',
        status: 'success',
        updated_at: '2026-05-28T12:00:00.000Z',
      },
    });
    expect(parsed).toMatchObject({
      provider: 'paystack',
      txId: '550e8400-e29b-41d4-a716-446655440000',
      pspId: 'TRF_abc',
      outcome: 'SETTLED',
    });
  });

  it('parses transfer.failed', () => {
    const parsed = parsePaystackTransferWebhook({
      event: 'transfer.failed',
      data: {
        id: 100,
        reference: 'tx-ref',
        transfer_code: 'TRF_fail',
        status: 'failed',
        reason: 'Insufficient balance',
      },
    });
    expect(parsed?.outcome).toBe('FAILED');
    expect(parsed?.failureReason).toBe('Insufficient balance');
  });

  it('ignores unrelated events', () => {
    expect(parsePaystackTransferWebhook({ event: 'charge.success', data: {} })).toBeNull();
  });
});
