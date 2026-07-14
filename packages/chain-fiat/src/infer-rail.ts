import type { FiatRail } from './types.js';

/** Infer the most likely fiat rail from currency + country (routing-time heuristic). */
export function inferFiatRail(currency: string, countryCode?: string): FiatRail | null {
  const cc = countryCode?.toUpperCase();
  const cur = currency.toUpperCase();
  if (cur === 'EUR') return 'SEPA_INSTANT';
  if (cur === 'GBP') return 'FASTER';
  if (cur === 'BRL') return 'PIX';
  if (cur === 'NGN') return 'NIP';
  if (cur === 'KES') return 'MPESA';
  if (cur === 'GHS') return 'WIRE';
  if (cur === 'USD') {
    if (cc === 'US') return 'ACH';
    return 'WIRE';
  }
  return null;
}
