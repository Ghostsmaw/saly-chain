/**
 * Currency registry. Each currency declares its exponent (number of decimal
 * places between the major and minor unit) so all arithmetic can be performed
 * on integers without loss of precision.
 *
 * Fiat exponents follow ISO 4217. Crypto exponents follow the on-chain native
 * smallest unit (e.g. wei for ETH, drops for XRP, base units for USDC).
 */

export type CurrencyKind = 'FIAT' | 'CRYPTO';

export interface CurrencyDefinition {
  readonly code: string;
  readonly kind: CurrencyKind;
  readonly exponent: number;
  readonly symbol?: string;
  /** Optional human label used by display utilities. */
  readonly label?: string;
}

export const CURRENCIES = {
  // ───── Fiat ─────
  USD: { code: 'USD', kind: 'FIAT', exponent: 2, symbol: '$', label: 'US Dollar' },
  EUR: { code: 'EUR', kind: 'FIAT', exponent: 2, symbol: '€', label: 'Euro' },
  GBP: { code: 'GBP', kind: 'FIAT', exponent: 2, symbol: '£', label: 'Pound Sterling' },
  NGN: { code: 'NGN', kind: 'FIAT', exponent: 2, symbol: '₦', label: 'Nigerian Naira' },
  GHS: { code: 'GHS', kind: 'FIAT', exponent: 2, symbol: 'GH₵', label: 'Ghanaian Cedi' },
  KES: { code: 'KES', kind: 'FIAT', exponent: 2, symbol: 'KSh', label: 'Kenyan Shilling' },
  ZAR: { code: 'ZAR', kind: 'FIAT', exponent: 2, symbol: 'R', label: 'South African Rand' },
  JPY: { code: 'JPY', kind: 'FIAT', exponent: 0, symbol: '¥', label: 'Japanese Yen' },

  // ───── Crypto / Stablecoins ─────
  USDC: { code: 'USDC', kind: 'CRYPTO', exponent: 6, label: 'USD Coin' },
  USDT: { code: 'USDT', kind: 'CRYPTO', exponent: 6, label: 'Tether' },
  WETH: { code: 'WETH', kind: 'CRYPTO', exponent: 18, label: 'Wrapped Ether' },
  DAI: { code: 'DAI', kind: 'CRYPTO', exponent: 18, label: 'Dai Stablecoin' },
  ETH: { code: 'ETH', kind: 'CRYPTO', exponent: 18, label: 'Ether' },
  XRP: { code: 'XRP', kind: 'CRYPTO', exponent: 6, label: 'Ripple' },
  BTC: { code: 'BTC', kind: 'CRYPTO', exponent: 8, label: 'Bitcoin' },
} as const satisfies Record<string, CurrencyDefinition>;

export type CurrencyCode = keyof typeof CURRENCIES;

export function isCurrencyCode(value: string): value is CurrencyCode {
  return Object.prototype.hasOwnProperty.call(CURRENCIES, value);
}

export function getCurrency(code: CurrencyCode): CurrencyDefinition {
  return CURRENCIES[code];
}
