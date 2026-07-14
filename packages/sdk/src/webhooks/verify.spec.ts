import { createHmac, randomBytes } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { verifyWebhookSignature, WebhookSignatureError } from './verify.js';

function sign(secret: string, body: string, t: number, kid = 'whsec_test'): string {
  const mac = createHmac('sha256', Buffer.from(secret, 'hex')).update(`${t}.${body}`).digest('hex');
  return `t=${t},v1=${mac},kid=${kid}`;
}

const secret = randomBytes(32).toString('hex');

describe('verifyWebhookSignature', () => {
  it('accepts a valid signature', () => {
    const body = JSON.stringify({ hello: 'world' });
    const t = Date.now();
    const header = sign(secret, body, t);
    expect(() => verifyWebhookSignature({ rawBody: body, signatureHeader: header, secret, now: t })).not.toThrow();
  });

  it('rejects tampered body', () => {
    const body = JSON.stringify({ hello: 'world' });
    const t = Date.now();
    const header = sign(secret, body, t);
    expect(() =>
      verifyWebhookSignature({ rawBody: body.replace('world', 'evil!'), signatureHeader: header, secret, now: t }),
    ).toThrow(WebhookSignatureError);
  });

  it('rejects stale signature', () => {
    const body = 'x';
    const t = 1_000_000;
    const header = sign(secret, body, t);
    const err = captureError(() =>
      verifyWebhookSignature({ rawBody: body, signatureHeader: header, secret, now: t + 10 * 60_000 }),
    );
    expect(err).toBeInstanceOf(WebhookSignatureError);
    expect((err as WebhookSignatureError).code).toBe('saly.webhooks.stale_signature');
  });

  it('rejects bad header', () => {
    const err = captureError(() =>
      verifyWebhookSignature({ rawBody: 'x', signatureHeader: 'garbage', secret }),
    );
    expect(err).toBeInstanceOf(WebhookSignatureError);
    expect((err as WebhookSignatureError).code).toBe('saly.webhooks.malformed_header');
  });
});

function captureError(fn: () => void): unknown {
  try {
    fn();
  } catch (err) {
    return err;
  }
  throw new Error('expected function to throw, but it did not');
}
