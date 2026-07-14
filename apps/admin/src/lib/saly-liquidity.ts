import type { QuoteListItem, RatePairRow } from '@salychain/sdk-internal';

export function formatFxRate(rate1e8: string): string {
  const n = Number(rate1e8) / 1e8;
  if (Number.isNaN(n)) return '—';
  if (n >= 100) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (n >= 1) return n.toFixed(4);
  return n.toFixed(6);
}

export function formatSpreadBps(bps: number): string {
  return `${bps} bps`;
}

export function pairLabel(base: string, quote: string): string {
  return `${base}/${quote}`;
}

export function quoteStatusVariant(status: string): 'success' | 'warning' | 'danger' | 'neutral' {
  switch (status) {
    case 'CONSUMED':
      return 'success';
    case 'ISSUED':
      return 'warning';
    case 'EXPIRED':
    case 'CANCELLED':
      return 'danger';
    default:
      return 'neutral';
  }
}

export function computeFxStats(pairs: RatePairRow[]) {
  const live = pairs.filter((p) => p.available).length;
  const providers = new Set(pairs.map((p) => p.provider).filter(Boolean));
  return {
    total: pairs.length,
    live,
    offline: pairs.length - live,
    providerCount: providers.size,
  };
}

export function computeQuoteStats(quotes: QuoteListItem[]) {
  const issued = quotes.filter((q) => q.status === 'ISSUED').length;
  const consumed = quotes.filter((q) => q.status === 'CONSUMED').length;
  const expired = quotes.filter((q) => q.status === 'EXPIRED' || q.status === 'CANCELLED').length;
  return { total: quotes.length, issued, consumed, expired };
}

export const QUOTE_STATUS_FILTERS = ['All', 'ISSUED', 'CONSUMED', 'EXPIRED', 'CANCELLED'] as const;
export type QuoteStatusFilter = (typeof QUOTE_STATUS_FILTERS)[number];

export const FX_PAIR_FILTERS = ['All', 'Live', 'Unavailable'] as const;
export type FxPairFilter = (typeof FX_PAIR_FILTERS)[number];
