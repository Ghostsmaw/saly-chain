import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  parseFlutterwaveTransferWebhook,
  verifyFlutterwaveWebhookBodyHmac,
  verifyFlutterwaveWebhookSignature,
} from './flutterwave.js';

describe('verifyFlutterwaveWebhookSignature', () => {
  it('compares verif-hash to the dashboard secret hash', () => {
    expect(verifyFlutterwaveWebhookSignature('my-secret-hash', 'my-secret-hash')).toBe(true);
    expect(verifyFlutterwaveWebhookSignature('wrong', 'my-secret-hash')).toBe(false);
  });
});

describe('verifyFlutterwaveWebhookBodyHmac', () => {
  it('binds the raw body under the secret', () => {
    const secret = 'my-secret-hash';
    const body = '{"event":"transfer.completed"}';
    const hmac = createHmac('sha256', secret).update(body).digest('hex');
    expect(verifyFlutterwaveWebhookBodyHmac(body, secret, hmac)).toBe(true);
    expect(verifyFlutterwaveWebhookBodyHmac(body, secret, 'deadbeef')).toBe(false);
  });
});

describe('parseFlutterwaveTransferWebhook', () => {
  it('parses successful transfer.completed', () => {
    const parsed = parseFlutterwaveTransferWebhook({
      event: 'transfer.completed',
      data: {
        id: 424242,
        reference: '550e8400-e29b-41d4-a716-446655440000',
        status: 'SUCCESSFUL',
        created_at: '2026-05-28T12:00:00.000Z',
      },
    });
    expect(parsed).toMatchObject({
      provider: 'flutterwave',
      txId: '550e8400-e29b-41d4-a716-446655440000',
      pspId: '424242',
      outcome: 'SETTLED',
    });
  });

  it('parses failed transfers', () => {
    const parsed = parseFlutterwaveTransferWebhook({
      'event.type': 'Transfer',
      data: {
        id: 1,
        reference: 'ref-1',
        status: 'FAILED',
        complete_message: 'Invalid account',
      },
    });
    expect(parsed?.outcome).toBe('FAILED');
  });
});
