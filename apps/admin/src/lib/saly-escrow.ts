import type { EscrowDealRow } from '@/app/escrow/actions';

export function formatEscrowUsdc(minor: string): string {
  const v = Number(BigInt(minor)) / 1_000_000;
  return `${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} USDC`;
}

export function escrowStatusVariant(status: string): 'success' | 'warning' | 'info' | 'neutral' {
  switch (status) {
    case 'FUNDED':
      return 'info';
    case 'RELEASED':
      return 'success';
    case 'REFUNDED':
      return 'warning';
    default:
      return 'neutral';
  }
}

export function computeEscrowStats(deals: EscrowDealRow[]) {
  const funded = deals.filter((d) => d.status === 'FUNDED').length;
  const released = deals.filter((d) => d.status === 'RELEASED').length;
  const refunded = deals.filter((d) => d.status === 'REFUNDED').length;
  return { total: deals.length, funded, released, refunded };
}

export const ESCROW_STATUS_FILTERS = ['All', 'FUNDED', 'RELEASED', 'REFUNDED'] as const;
export type EscrowStatusFilter = (typeof ESCROW_STATUS_FILTERS)[number];
