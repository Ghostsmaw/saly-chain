import { describe, expect, it } from 'vitest';
import { generateSigningSecret, signPayload, verifySignature } from './signing.js';

describe('datastreams signing', () => {
  it('round-trips a signature', () => {
    const { secretHex, keyId } = generateSigningSecret(32);
    const body = JSON.stringify({ hello: 'world' });
    const { header } = signPayload(secretHex, keyId, body);
    expect(verifySignature(secretHex, header, body)).toBe(true);
  });

  it('rejects a tampered body', () => {
    const { secretHex, keyId } = generateSigningSecret(32);
    const { header } = signPayload(secretHex, keyId, '{"a":1}');
    expect(verifySignature(secretHex, header, '{"a":2}')).toBe(false);
  });

  it('rejects a stale timestamp outside the replay window', () => {
    const { secretHex, keyId } = generateSigningSecret(32);
    const tenMinAgo = Date.now() - 10 * 60_000;
    const { header } = signPayload(secretHex, keyId, 'x', tenMinAgo);
    expect(verifySignature(secretHex, header, 'x')).toBe(false);
    // ...but accepts it within a wide tolerance
    expect(verifySignature(secretHex, header, 'x', { toleranceMs: 60 * 60_000 })).toBe(true);
  });

  it('issues a datastreams-prefixed key id', () => {
    expect(generateSigningSecret(32).keyId).toMatch(/^dssec_/);
  });
});
