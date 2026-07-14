import { describe, expect, it } from 'vitest';
import { buildIouPayment, buildTrustSet, iouValueFromMinor, isTrustedIssuer, trustLineKey } from './iou.js';

const issuer = 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq'; // Bitstamp USD issuer (example)
const acct1 = 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe';
const acct2 = 'rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh';

describe('xrpl IOU helpers', () => {
  it('builds a TrustSet for a 3-char currency code', () => {
    const t = buildTrustSet({ account: acct1, currency: 'USD', issuer, limit: '1000000' });
    expect(t.transaction.TransactionType).toBe('TrustSet');
    expect(t.transaction.LimitAmount).toEqual({ currency: 'USD', issuer, value: '1000000' });
    expect(t.signingPayload.length).toBeGreaterThan(0);
    expect(t.unsignedBlob.length).toBeGreaterThan(0);
  });

  it('rejects an invalid currency code', () => {
    expect(() => buildTrustSet({ account: acct1, currency: 'USDC1', issuer, limit: '1' })).toThrow();
  });

  it('rejects a non-numeric limit', () => {
    expect(() => buildTrustSet({ account: acct1, currency: 'USD', issuer, limit: 'abc' })).toThrow();
  });

  it('rejects bad addresses', () => {
    expect(() => buildTrustSet({ account: 'nope', currency: 'USD', issuer, limit: '1' })).toThrow();
    expect(() => buildTrustSet({ account: acct1, currency: 'USD', issuer: 'nope', limit: '1' })).toThrow();
  });

  it('builds an IOU Payment', () => {
    const p = buildIouPayment({
      from: acct1,
      to: acct2,
      currency: { currency: 'USD', issuer },
      value: '12.34',
      memo: 'invoice-1',
    });
    expect(p.transaction.TransactionType).toBe('Payment');
    expect(p.transaction.Amount).toEqual({ currency: 'USD', issuer, value: '12.34' });
    expect(p.transaction.Memos?.[0]?.Memo?.MemoData).toBeDefined();
  });

  it('rejects non-numeric IOU values', () => {
    expect(() =>
      buildIouPayment({ from: acct1, to: acct2, currency: { currency: 'USD', issuer }, value: 'NaN' }),
    ).toThrow();
  });

  it('formats minor units to IOU decimal values', () => {
    expect(iouValueFromMinor(12_34n, 2)).toBe('12.34');
    expect(iouValueFromMinor(100n, 2)).toBe('1');
    expect(iouValueFromMinor(0n, 2)).toBe('0');
  });

  it('builds trust-line policy keys and validates allowlist entries', () => {
    expect(trustLineKey('usd', issuer)).toBe(`USD:${issuer}`);
    expect(isTrustedIssuer(['*'], 'USD', issuer)).toBe(true);
    expect(isTrustedIssuer([trustLineKey('USD', issuer)], 'USD', issuer)).toBe(true);
    expect(isTrustedIssuer([trustLineKey('EUR', issuer)], 'USD', issuer)).toBe(false);
  });
});
