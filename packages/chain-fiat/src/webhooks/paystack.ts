import { createHmac, timingSafeEqual } from 'node:crypto';

export type FiatWebhookOutcome = 'SETTLED' | 'FAILED';

export interface ParsedFiatWebhook {
  provider: 'paystack' | 'flutterwave';
  externalEventId: string;
  txId: string;
  pspId: string;
  outcome: FiatWebhookOutcome;
  settledAt?: string;
  failureReason?: string;
}

interface PaystackWebhookEnvelope {
  event?: string;
  data?: {
    id?: number;
    reference?: string;
    transfer_code?: string;
    status?: string;
    updated_at?: string;
    paid_at?: string;
    amount?: number;
    currency?: string;
    gateway_response?: string;
    reason?: string;
  };
}

const SETTLED_EVENTS = new Set(['transfer.success']);
const FAILED_EVENTS = new Set(['transfer.failed', 'transfer.reversed']);

/** Normalized inbound pay-in event (charge / virtual-account credit). */
export interface ParsedFiatPayin {
  provider: 'paystack' | 'flutterwave';
  externalEventId: string;
  /** PSP reference we stored at createPayin time. */
  pspReference: string;
  /** Our correlation id (the execution transaction id). */
  reference: string;
  outcome: FiatWebhookOutcome;
  amountMinor?: string;
  currency?: string;
  settledAt?: string;
  failureReason?: string;
}

const PAYIN_SETTLED_EVENTS = new Set(['charge.success']);
const PAYIN_FAILED_EVENTS = new Set(['charge.failed']);

/**
 * Verify Paystack webhook signature (HMAC SHA512 of raw body).
 * @see https://paystack.com/docs/payments/webhooks/#verify-event-origin
 */
export function verifyPaystackWebhookSignature(
  rawBody: Buffer,
  signature: string | undefined,
  secretKey: string,
): boolean {
  if (!signature || !secretKey) return false;
  const digest = createHmac('sha512', secretKey).update(rawBody).digest('hex');
  try {
    const a = Buffer.from(digest, 'utf8');
    const b = Buffer.from(signature, 'utf8');
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Parse Paystack transfer webhook events into a normalized settlement payload. */
export function parsePaystackTransferWebhook(payload: unknown): ParsedFiatWebhook | null {
  const body = payload as PaystackWebhookEnvelope;
  const event = body.event?.toLowerCase();
  const data = body.data;
  if (!event || !data?.reference || !data.transfer_code) return null;

  let outcome: FiatWebhookOutcome | null = null;
  if (SETTLED_EVENTS.has(event)) outcome = 'SETTLED';
  if (FAILED_EVENTS.has(event)) outcome = 'FAILED';
  if (!outcome) return null;

  const status = data.status?.toLowerCase();
  if (outcome === 'SETTLED' && status && status !== 'success') return null;
  if (outcome === 'FAILED' && status && status !== 'failed' && status !== 'reversed') return null;

  return {
    provider: 'paystack',
    externalEventId: `${event}:${data.id ?? data.transfer_code}:${data.reference}`,
    txId: data.reference,
    pspId: data.transfer_code,
    outcome,
    ...(data.updated_at ? { settledAt: data.updated_at } : {}),
    ...(data.reason ? { failureReason: data.reason } : {}),
  };
}

/**
 * Parse Paystack inbound pay-in webhooks (`charge.success` / `charge.failed`).
 * The `reference` carries our correlation id (the execution transaction id).
 */
export function parsePaystackPayinWebhook(payload: unknown): ParsedFiatPayin | null {
  const body = payload as PaystackWebhookEnvelope;
  const event = body.event?.toLowerCase();
  const data = body.data;
  if (!event || !data?.reference) return null;

  let outcome: FiatWebhookOutcome | null = null;
  if (PAYIN_SETTLED_EVENTS.has(event)) outcome = 'SETTLED';
  if (PAYIN_FAILED_EVENTS.has(event)) outcome = 'FAILED';
  if (!outcome) return null;

  const status = data.status?.toLowerCase();
  if (outcome === 'SETTLED' && status && status !== 'success') return null;

  return {
    provider: 'paystack',
    externalEventId: `${event}:${data.id ?? data.reference}:${data.reference}`,
    pspReference: data.reference,
    reference: data.reference,
    outcome,
    ...(data.amount != null ? { amountMinor: String(data.amount) } : {}),
    ...(data.currency ? { currency: data.currency } : {}),
    ...(data.paid_at ? { settledAt: data.paid_at } : {}),
    ...(data.gateway_response ? { failureReason: data.gateway_response } : {}),
  };
}
