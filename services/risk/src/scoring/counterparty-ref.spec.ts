import { describe, expect, it } from 'vitest';
import { parseCounterpartyAddress } from './risk.service.js';

describe('parseCounterpartyAddress', () => {
  it('extracts chain + address from a simple ref', () => {
    expect(parseCounterpartyAddress('base:0xabc123def456')).toEqual({
      chain: 'base',
      address: '0xabc123def456',
    });
  });

  it('extracts the trailing chain:address from a prefixed ref', () => {
    expect(parseCounterpartyAddress('escrow:base:0xdeadbeef00')).toEqual({
      chain: 'base',
      address: '0xdeadbeef00',
    });
  });

  it('handles XRPL classic addresses', () => {
    const r = parseCounterpartyAddress('xrpl:rPdvC6ccq8hCdPKSPJkPmyZ4Mi1oG2FFkT');
    expect(r?.chain).toBe('xrpl');
  });

  it('returns null for non-address refs', () => {
    expect(parseCounterpartyAddress('swap:USD:NGN')).toBeNull();
    expect(parseCounterpartyAddress('internal:treasury')).toBeNull();
    expect(parseCounterpartyAddress('payroll:batch_123')).toBeNull();
  });

  it('returns null for unknown chains', () => {
    expect(parseCounterpartyAddress('solana:0xabc123def456')).toBeNull();
  });

  it('returns null for empty / malformed input', () => {
    expect(parseCounterpartyAddress(undefined)).toBeNull();
    expect(parseCounterpartyAddress('')).toBeNull();
    expect(parseCounterpartyAddress('justastring')).toBeNull();
  });
});
