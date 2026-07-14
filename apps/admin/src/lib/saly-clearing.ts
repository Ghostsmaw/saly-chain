import type { TransactionDto } from '@salychain/sdk-internal';

export function formatTopupAmount(minor: string, currency: string): string {
  const decimals = currency === 'NGN' || currency === 'USD' || currency === 'GHS' ? 2 : 6;
  const value = Number(BigInt(minor)) / 10 ** decimals;
  return `${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

export function topupStateVariant(state: TransactionDto['state']): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  switch (state) {
    case 'SETTLED':
      return 'success';
    case 'FAILED':
    case 'REJECTED':
      return 'danger';
    case 'EXECUTING':
    case 'AWAITING_CONFIRMATION':
    case 'AWAITING_APPROVAL':
    case 'REVERSING':
      return 'info';
    case 'CREATED':
    case 'SCREENED':
    case 'ROUTED':
    case 'QUOTED':
    case 'RESERVED':
      return 'warning';
    default:
      return 'neutral';
  }
}

export function computeTopupStats(topups: TransactionDto[]) {
  let settled = 0;
  let pending = 0;
  let failed = 0;
  const byCurrency: Record<string, number> = {};

  for (const tx of topups) {
    if (tx.state === 'SETTLED') settled += 1;
    else if (tx.state === 'FAILED' || tx.state === 'REJECTED' || tx.state === 'REVERSED') failed += 1;
    else pending += 1;

    const ccy = tx.source.currency;
    byCurrency[ccy] = (byCurrency[ccy] ?? 0) + Number(BigInt(tx.source.amount_minor));
  }

  const volumeByCurrency = Object.entries(byCurrency)
    .sort(([, a], [, b]) => b - a)
    .map(([label, minor]) => ({
      label,
      value: Math.round(minor / 100),
    }));

  return {
    total: topups.length,
    settled,
    pending,
    failed,
    volumeByCurrency,
  };
}

export const TOPUP_STATE_FILTERS = ['All', 'SETTLED', 'EXECUTING', 'AWAITING_CONFIRMATION', 'FAILED'] as const;
export type TopupStateFilter = (typeof TOPUP_STATE_FILTERS)[number];

export const COA_ROWS = [
  {
    code: 'asset.clearing.{CCY}',
    type: 'ASSET',
    role: 'Inbound staging — debited on TOPUP',
  },
  {
    code: 'equity.inbound.{ccy}',
    type: 'EQUITY',
    role: 'Ops seed offset (no real rail yet)',
  },
  {
    code: 'liability.business.*',
    type: 'LIABILITY',
    role: 'Customer treasury — credited on TOPUP',
  },
] as const;
