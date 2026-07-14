import { CURRENCIES, type CurrencyCode, getCurrency, isCurrencyCode } from './currencies.js';

/**
 * `Money` is the only sanctioned monetary primitive across SalyChain. It is
 * intentionally minimal:
 *
 *  - amounts are integer `bigint` values in the currency's smallest unit
 *  - every operation is currency-checked and integer-safe
 *  - construction validates inputs and refuses ambiguous values
 *  - arithmetic returns new instances; instances are immutable
 *
 * Direct arithmetic on raw `bigint` values is prohibited by lint rules
 * across the monorepo.
 */
export class Money {
  readonly amountMinor: bigint;
  readonly currency: CurrencyCode;

  private constructor(amountMinor: bigint, currency: CurrencyCode) {
    this.amountMinor = amountMinor;
    this.currency = currency;
  }

  // ───────────────────────────── Construction ─────────────────────────────

  /** Create from an integer minor unit. Negative values are allowed (e.g. debits). */
  static ofMinor(amountMinor: bigint | number | string, currency: CurrencyCode): Money {
    if (!isCurrencyCode(currency)) {
      throw new MoneyError(`Unknown currency: ${currency}`);
    }
    const value = toBigInt(amountMinor);
    return new Money(value, currency);
  }

  /**
   * Create from a decimal string (e.g. "50.00"). Rejects values whose decimal
   * portion exceeds the currency's exponent — silent rounding here would be a
   * fintech bug.
   */
  static ofMajor(amountMajor: string, currency: CurrencyCode): Money {
    if (!isCurrencyCode(currency)) {
      throw new MoneyError(`Unknown currency: ${currency}`);
    }
    const def = CURRENCIES[currency];
    const trimmed = amountMajor.trim();
    const match = /^(-?)(\d+)(?:\.(\d+))?$/.exec(trimmed);
    if (!match) {
      throw new MoneyError(`Invalid decimal amount: ${amountMajor}`);
    }
    const [, sign, whole, fraction = ''] = match;
    if (fraction.length > def.exponent) {
      throw new MoneyError(
        `Amount ${amountMajor} has more decimals (${fraction.length}) than ${currency} allows (${def.exponent})`,
      );
    }
    const padded = fraction.padEnd(def.exponent, '0');
    const minor = BigInt(`${sign}${whole}${padded}`);
    return new Money(minor, currency);
  }

  /** Zero amount in the given currency. */
  static zero(currency: CurrencyCode): Money {
    return Money.ofMinor(0n, currency);
  }

  // ───────────────────────────── Arithmetic ─────────────────────────────

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amountMinor + other.amountMinor, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amountMinor - other.amountMinor, this.currency);
  }

  negate(): Money {
    return new Money(-this.amountMinor, this.currency);
  }

  /**
   * Multiply by an integer factor. For percentage / FX rate operations use
   * `mulRatio` to keep precision explicit.
   */
  mulInt(factor: bigint | number): Money {
    const f = toBigInt(factor);
    return new Money(this.amountMinor * f, this.currency);
  }

  /**
   * Multiply by a rational number expressed as `numerator / denominator`
   * with explicit `RoundingMode`. Used for FX, fees, slippage.
   */
  mulRatio(numerator: bigint, denominator: bigint, rounding: RoundingMode = 'HALF_EVEN'): Money {
    if (denominator === 0n) throw new MoneyError('Division by zero in mulRatio');
    const product = this.amountMinor * numerator;
    const quotient = divideWithRounding(product, denominator, rounding);
    return new Money(quotient, this.currency);
  }

  // ───────────────────────────── Comparison ─────────────────────────────

  equals(other: Money): boolean {
    return this.currency === other.currency && this.amountMinor === other.amountMinor;
  }

  greaterThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amountMinor > other.amountMinor;
  }

  greaterThanOrEqual(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amountMinor >= other.amountMinor;
  }

  lessThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amountMinor < other.amountMinor;
  }

  lessThanOrEqual(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amountMinor <= other.amountMinor;
  }

  isZero(): boolean {
    return this.amountMinor === 0n;
  }

  isPositive(): boolean {
    return this.amountMinor > 0n;
  }

  isNegative(): boolean {
    return this.amountMinor < 0n;
  }

  // ───────────────────────────── Formatting ─────────────────────────────

  /** Decimal string suitable for display (e.g. "50.00"). */
  toMajorString(): string {
    const def = getCurrency(this.currency);
    if (def.exponent === 0) return this.amountMinor.toString();

    const negative = this.amountMinor < 0n;
    const abs = negative ? -this.amountMinor : this.amountMinor;
    const str = abs.toString().padStart(def.exponent + 1, '0');
    const whole = str.slice(0, -def.exponent);
    const fraction = str.slice(-def.exponent);
    return `${negative ? '-' : ''}${whole}.${fraction}`;
  }

  /** Pretty format with locale-aware grouping and currency symbol. */
  format(locale = 'en-US'): string {
    const def = getCurrency(this.currency);
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: def.exponent,
      maximumFractionDigits: def.exponent,
    });
    const value = formatter.format(Number(this.toMajorString()));
    return def.symbol ? `${def.symbol}${value}` : `${value} ${def.code}`;
  }

  /** Wire format. Amounts are encoded as strings to survive JSON precision loss. */
  toJSON(): MoneyJson {
    return {
      amount_minor: this.amountMinor.toString(),
      currency: this.currency,
    };
  }

  static fromJSON(value: MoneyJson): Money {
    return Money.ofMinor(value.amount_minor, value.currency as CurrencyCode);
  }

  // ───────────────────────────── Internals ─────────────────────────────

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new MoneyError(
        `Currency mismatch: ${this.currency} vs ${other.currency} (use the FX engine, not arithmetic)`,
      );
    }
  }
}

export interface MoneyJson {
  readonly amount_minor: string;
  readonly currency: string;
}

export type RoundingMode = 'HALF_UP' | 'HALF_EVEN' | 'DOWN' | 'UP';

export class MoneyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MoneyError';
  }
}

function toBigInt(input: bigint | number | string): bigint {
  if (typeof input === 'bigint') return input;
  if (typeof input === 'number') {
    if (!Number.isInteger(input)) {
      throw new MoneyError(`Non-integer number passed to Money: ${input}`);
    }
    return BigInt(input);
  }
  if (!/^-?\d+$/.test(input)) {
    throw new MoneyError(`Invalid integer string: ${input}`);
  }
  return BigInt(input);
}

function divideWithRounding(numerator: bigint, denominator: bigint, mode: RoundingMode): bigint {
  const negative = numerator < 0n !== denominator < 0n;
  const absN = numerator < 0n ? -numerator : numerator;
  const absD = denominator < 0n ? -denominator : denominator;

  const quotient = absN / absD;
  const remainder = absN % absD;
  if (remainder === 0n) return negative ? -quotient : quotient;

  let bumped = quotient;
  switch (mode) {
    case 'DOWN':
      break;
    case 'UP':
      bumped = quotient + 1n;
      break;
    case 'HALF_UP':
      bumped = remainder * 2n >= absD ? quotient + 1n : quotient;
      break;
    case 'HALF_EVEN': {
      const doubled = remainder * 2n;
      if (doubled > absD) bumped = quotient + 1n;
      else if (doubled < absD) bumped = quotient;
      else bumped = quotient % 2n === 0n ? quotient : quotient + 1n;
      break;
    }
  }
  return negative ? -bumped : bumped;
}
