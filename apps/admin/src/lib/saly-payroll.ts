import type { TransactionDto } from '@salychain/sdk-internal';
import { txStateVariant } from '@/lib/saly-tx';

export function formatPayrollAmount(minor: string, currency: string): string {
  const decimals = currency === 'NGN' || currency === 'USD' || currency === 'GHS' ? 2 : 6;
  const value = Number(BigInt(minor)) / 10 ** decimals;
  return `${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

export { txStateVariant as payrollStateVariant };

export function computePayrollStats(batches: TransactionDto[]) {
  let settled = 0;
  let inProgress = 0;
  let failed = 0;
  let totalLines = 0;
  let settledLines = 0;

  for (const b of batches) {
    if (b.state === 'SETTLED') settled += 1;
    else if (b.state === 'FAILED' || b.state === 'REJECTED') failed += 1;
    else if (b.state === 'EXECUTING' || b.state === 'AWAITING_CONFIRMATION') inProgress += 1;

    totalLines += b.payroll?.total_lines ?? 0;
    settledLines += b.payroll?.lines_settled ?? 0;
  }

  return { total: batches.length, settled, inProgress, failed, totalLines, settledLines };
}

export const PAYROLL_STATE_FILTERS = ['All', 'EXECUTING', 'SETTLED', 'FAILED'] as const;
export type PayrollStateFilter = (typeof PAYROLL_STATE_FILTERS)[number];
