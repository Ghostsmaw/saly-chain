import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Verifies a webhook signature in your handler.
 *
 * Header shape: `t=<unix_ms>,v1=<hex_hmac_sha256>,kid=<key_id>`.
 *
 * Throws on any mismatch. You should:
 *   1. Read the raw body from the request (do NOT JSON.parse first — verify
 *      against the exact bytes you received, otherwise key-ordering or
 *      whitespace differences can fail the check).
 *   2. Read `X-Saly-Signature` and call `verifyWebhookSignature`.
 *   3. ACK with 2xx within ~3 seconds. Don't do business logic synchronously;
 *      enqueue and ack.
 */
export function verifyWebhookSignature(opts: {
  /** The exact bytes you received in the request body. */
  rawBody: string;
  /** The `X-Saly-Signature` header value. */
  signatureHeader: string;
  /** The secret you stored when creating / rotating the subscription. */
  secret: string;
  /** Tolerance window for replay protection. Defaults to 5 minutes. */
  toleranceMs?: number;
  /** Override the current time for testing. */
  now?: number;
}): void {
  const tolerance = opts.toleranceMs ?? 5 * 60_000;
  const now = opts.now ?? Date.now();

  const parts = Object.fromEntries(opts.signatureHeader.split(',').map((p) => p.split('=') as [string, string]));
  const t = Number(parts.t);
  const v1 = parts.v1;
  if (!Number.isFinite(t) || !v1) {
    throw new WebhookSignatureError('saly.webhooks.malformed_header', 'X-Saly-Signature is missing or malformed');
  }
  if (Math.abs(now - t) > tolerance) {
    throw new WebhookSignatureError('saly.webhooks.stale_signature', `Webhook timestamp ${t} outside ${tolerance}ms tolerance`);
  }
  const secretBytes = Buffer.from(opts.secret, 'hex');
  const expected = createHmac('sha256', secretBytes).update(`${t}.${opts.rawBody}`).digest();
  const presented = Buffer.from(v1, 'hex');
  if (presented.length !== expected.length || !timingSafeEqual(expected, presented)) {
    throw new WebhookSignatureError('saly.webhooks.bad_signature', 'X-Saly-Signature does not match the expected HMAC');
  }
}

export class WebhookSignatureError extends Error {
  constructor(readonly code: string, message: string) {
    super(message);
    this.name = 'WebhookSignatureError';
  }
}
