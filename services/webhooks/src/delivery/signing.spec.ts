import { describe, expect, it } from 'vitest';
import { generateSigningSecret, signPayload, verifySignature } from './signing.js';

describe('webhook signing', () => {
  it('signs and verifies round-trip', () => {
    const { secretHex, keyId } = generateSigningSecret(32);
    const body = JSON.stringify({ hello: 'world' });
    const signed = signPayload(secretHex, keyId, body);
    expect(verifySignature(secretHex, signed.header, body, { now: signed.timestamp })).toBe(true);
  });

  it('rejects a tampered body', () => {
    const { secretHex, keyId } = generateSigningSecret(32);
    const body = JSON.stringify({ hello: 'world' });
    const signed = signPayload(secretHex, keyId, body);
    const tampered = body.replace('world', 'evil!');
    expect(verifySignature(secretHex, signed.header, tampered, { now: signed.timestamp })).toBe(false);
  });

  it('rejects a stale signature outside the tolerance window', () => {
    const { secretHex, keyId } = generateSigningSecret(32);
    const body = 'x';
    const signed = signPayload(secretHex, keyId, body, 1_000_000);
    expect(verifySignature(secretHex, signed.header, body, { now: 1_000_000 + 10 * 60_000 })).toBe(false);
  });

  it('rejects with a different secret', () => {
    const { secretHex: sa, keyId } = generateSigningSecret(32);
    const { secretHex: sb } = generateSigningSecret(32);
    const body = 'x';
    const signed = signPayload(sa, keyId, body);
    expect(verifySignature(sb, signed.header, body, { now: signed.timestamp })).toBe(false);
  });
});
