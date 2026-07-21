import { createHmac, timingSafeEqual } from 'node:crypto';

import type { FiatWebhookOutcome, ParsedFiatPayin, ParsedFiatWebhook } from './paystack.js';

interface FlutterwaveWebhookEnvelope {
  event?: string;
  'event.type'?: string;
  data?: {
    id?: number;
    reference?: string;
    tx_ref?: string;
    flw_ref?: string;
    status?: string;
    amount?: number;
    currency?: string;
    complete_message?: string;
    created_at?: string;
  };
}

const SETTLED_STATUSES = new Set(['SUCCESSFUL', 'SUCCESS']);
const FAILED_STATUSES = new Set(['FAILED', 'CANCELLED']);

/**
 * Verify Flutterwave webhook via the dashboard secret hash (`verif-hash` header).
 * Note: Flutterwave's native scheme is shared-secret equality, not body HMAC.
 * Prefer {@link verifyFlutterwaveWebhookBodyHmac} as a defense-in-depth layer
 * when a reverse proxy or FLW sidecar can stamp `x-saly-flw-body-hmac`.
 *
 * @see https://developer.flutterwave.com/docs/integration-guides/webhooks/
 */
export function verifyFlutterwaveWebhookSignature(
  verifHash: string | undefined,
  secretHash: string,
): boolean {
  if (!verifHash || !secretHash) return false;
  try {
    const a = Buffer.from(verifHash, 'utf8');
    const b = Buffer.from(secretHash, 'utf8');
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Body-bound HMAC (HMAC-SHA256 hex of the raw request body under the secret).
 * Used when an edge proxy stamps `x-saly-flw-body-hmac`, binding the payload
 * so a stolen `verif-hash` alone cannot forge arbitrary settlement events.
 */
export function verifyFlutterwaveWebhookBodyHmac(
  rawBody: string | Buffer,
  secretHash: string,
  bodyHmacHeader: string | undefined,
): boolean {
  if (!bodyHmacHeader || !secretHash) return false;
  const expected = createHmac('sha256', secretHash).update(rawBody).digest('hex');
  try {
    const a = Buffer.from(bodyHmacHeader, 'utf8');
    const b = Buffer.from(expected, 'utf8');
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Parse Flutterwave transfer webhook events into a normalized settlement payload. */
export function parseFlutterwaveTransferWebhook(payload: unknown): ParsedFiatWebhook | null {
  const body = payload as FlutterwaveWebhookEnvelope;
  const event = (body.event ?? body['event.type'] ?? '').toLowerCase();
  const data = body.data;
  if (!data?.reference || data.id == null) return null;
  if (!event.includes('transfer')) return null;

  const status = (data.status ?? '').toUpperCase();
  let outcome: FiatWebhookOutcome | null = null;
  if (SETTLED_STATUSES.has(status)) outcome = 'SETTLED';
  if (FAILED_STATUSES.has(status)) outcome = 'FAILED';
  if (!outcome) return null;

  return {
    provider: 'flutterwave',
    externalEventId: `${event}:${data.id}:${data.reference}`,
    txId: data.reference,
    pspId: String(data.id),
    outcome,
    ...(data.created_at ? { settledAt: data.created_at } : {}),
    ...(data.complete_message ? { failureReason: data.complete_message } : {}),
  };
}

/**
 * Parse Flutterwave inbound pay-in webhooks (`charge.completed`). The credit is
 * correlated via `tx_ref`, which carries our execution transaction id.
 */
export function parseFlutterwavePayinWebhook(payload: unknown): ParsedFiatPayin | null {
  const body = payload as FlutterwaveWebhookEnvelope;
  const event = (body.event ?? body['event.type'] ?? '').toLowerCase();
  const data = body.data;
  const reference = data?.tx_ref ?? data?.reference;
  if (!data || !reference || data.id == null) return null;
  if (!event.includes('charge')) return null;

  const status = (data.status ?? '').toUpperCase();
  let outcome: FiatWebhookOutcome | null = null;
  if (SETTLED_STATUSES.has(status)) outcome = 'SETTLED';
  if (FAILED_STATUSES.has(status)) outcome = 'FAILED';
  if (!outcome) return null;

  return {
    provider: 'flutterwave',
    externalEventId: `${event}:${data.id}:${reference}`,
    pspReference: reference,
    reference,
    outcome,
    ...(data.amount != null ? { amountMinor: String(Math.round(data.amount * 100)) } : {}),
    ...(data.currency ? { currency: data.currency } : {}),
    ...(data.created_at ? { settledAt: data.created_at } : {}),
    ...(data.complete_message ? { failureReason: data.complete_message } : {}),
  };
}
