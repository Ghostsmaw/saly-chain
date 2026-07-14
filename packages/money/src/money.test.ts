import { describe, expect, it } from 'vitest';
import { Money, MoneyError } from './money.js';

describe('Money.ofMajor', () => {
  it('parses two-decimal fiat', () => {
    expect(Money.ofMajor('50.00', 'USD').amountMinor).toBe(5000n);
    expect(Money.ofMajor('50', 'USD').amountMinor).toBe(5000n);
    expect(Money.ofMajor('0.01', 'USD').amountMinor).toBe(1n);
  });

  it('parses zero-decimal fiat (JPY)', () => {
    expect(Money.ofMajor('50', 'JPY').amountMinor).toBe(50n);
  });

  it('parses 6-decimal crypto (USDC)', () => {
    expect(Money.ofMajor('1', 'USDC').amountMinor).toBe(1_000_000n);
    expect(Money.ofMajor('0.000001', 'USDC').amountMinor).toBe(1n);
  });

  it('rejects extra precision rather than silently rounding', () => {
    expect(() => Money.ofMajor('0.001', 'USD')).toThrow(MoneyError);
  });

  it('rejects garbage input', () => {
    expect(() => Money.ofMajor('abc', 'USD')).toThrow(MoneyError);
    expect(() => Money.ofMajor('', 'USD')).toThrow(MoneyError);
  });

  it('handles negative amounts', () => {
    expect(Money.ofMajor('-50.00', 'USD').amountMinor).toBe(-5000n);
  });
});

describe('Money arithmetic', () => {
  it('adds and subtracts same-currency amounts', () => {
    const a = Money.ofMajor('10.00', 'USD');
    const b = Money.ofMajor('2.50', 'USD');
    expect(a.add(b).toMajorString()).toBe('12.50');
    expect(a.subtract(b).toMajorString()).toBe('7.50');
  });

  it('refuses to add across currencies', () => {
    const usd = Money.ofMajor('10.00', 'USD');
    const eur = Money.ofMajor('10.00', 'EUR');
    expect(() => usd.add(eur)).toThrow(/Currency mismatch/);
  });

  it('multiplies by integer factor', () => {
    expect(Money.ofMajor('1.50', 'USD').mulInt(3).toMajorString()).toBe('4.50');
  });

  it('applies rational multiplication with HALF_EVEN rounding', () => {
    // 100 cents * 1/3 → 33 (HALF_EVEN banks 33.333... down to 33)
    expect(Money.ofMinor(100n, 'USD').mulRatio(1n, 3n).amountMinor).toBe(33n);
    // 100 cents * 1/2 → exactly 50
    expect(Money.ofMinor(100n, 'USD').mulRatio(1n, 2n).amountMinor).toBe(50n);
    // 5 cents * 1/2 → HALF_EVEN rounds to nearest even: 2 (not 3)
    expect(Money.ofMinor(5n, 'USD').mulRatio(1n, 2n).amountMinor).toBe(2n);
    // 7 cents * 1/2 → HALF_EVEN rounds to nearest even: 4 (not 3)
    expect(Money.ofMinor(7n, 'USD').mulRatio(1n, 2n).amountMinor).toBe(4n);
  });
});

describe('Money comparison & predicates', () => {
  it('compares amounts in the same currency', () => {
    const a = Money.ofMinor(100n, 'USD');
    const b = Money.ofMinor(200n, 'USD');
    expect(a.lessThan(b)).toBe(true);
    expect(b.greaterThan(a)).toBe(true);
    expect(a.equals(Money.ofMinor(100n, 'USD'))).toBe(true);
  });

  it('detects sign', () => {
    expect(Money.zero('USD').isZero()).toBe(true);
    expect(Money.ofMinor(1n, 'USD').isPositive()).toBe(true);
    expect(Money.ofMinor(-1n, 'USD').isNegative()).toBe(true);
  });
});

describe('Money formatting & wire', () => {
  it('formats with symbol', () => {
    expect(Money.ofMajor('1234.56', 'USD').format('en-US')).toBe('$1,234.56');
    expect(Money.ofMajor('50000.00', 'NGN').format('en-US')).toBe('₦50,000.00');
  });

  it('round-trips via JSON', () => {
    const m = Money.ofMajor('1234.56', 'USD');
    const json = m.toJSON();
    expect(json).toEqual({ amount_minor: '123456', currency: 'USD' });
    expect(Money.fromJSON(json).equals(m)).toBe(true);
  });
});
