import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

/**
 * Webhook delivery signing.
 *
 * Wire shape:
 *   X-Saly-Signature: t=<unix_ms>,v1=<hex(hmac_sha256(secret, `${t}.${body}`))>,kid=<key_id>
 *
 * Verification (subscriber side):
 *   1. parse t, v1, kid
 *   2. reject if abs(now - t) > 5 min  (replay window)
 *   3. recompute hmac and compare with timing-safe equal
 *
 * We include `kid` so a subscriber can keep both an old and new secret active
 * during a rotation window without rejecting in-flight deliveries.
 */

export interface SignedDelivery {
  /** value to set as the `X-Saly-Signature` header */
  header: string;
  /** unix ms used in the signature */
  timestamp: number;
}

export function signPayload(secretHex: string, keyId: string, bodyText: string, now = Date.now()): SignedDelivery {
  const secret = Buffer.from(secretHex, 'hex');
  const mac = createHmac('sha256', secret).update(`${now}.${bodyText}`).digest('hex');
  return { header: `t=${now},v1=${mac},kid=${keyId}`, timestamp: now };
}

export function verifySignature(secretHex: string, header: string, bodyText: string, opts: { toleranceMs?: number; now?: number } = {}): boolean {
  const tolerance = opts.toleranceMs ?? 5 * 60_000;
  const now = opts.now ?? Date.now();
  const parts = Object.fromEntries(header.split(',').map((p) => p.split('=') as [string, string]));
  const t = Number(parts.t);
  const v1 = parts.v1;
  if (!Number.isFinite(t) || !v1) return false;
  if (Math.abs(now - t) > tolerance) return false;
  const secret = Buffer.from(secretHex, 'hex');
  const expected = createHmac('sha256', secret).update(`${t}.${bodyText}`).digest();
  const presented = Buffer.from(v1, 'hex');
  if (expected.length !== presented.length) return false;
  return timingSafeEqual(expected, presented);
}

export function generateSigningSecret(bytes: number): { secretHex: string; keyId: string } {
  return {
    secretHex: randomBytes(bytes).toString('hex'),
    keyId: `whsec_${randomBytes(6).toString('hex')}`,
  };
}
