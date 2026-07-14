import type { TransactionDto } from '@salychain/sdk-internal';

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'accent';

export function txStateVariant(state: TransactionDto['state']): BadgeVariant {
  switch (state) {
    case 'SETTLED':
      return 'success';
    case 'FAILED':
    case 'REJECTED':
      return 'danger';
    case 'REVERSING':
    case 'REVERSED':
      return 'warning';
    case 'AWAITING_CONFIRMATION':
    case 'EXECUTING':
      return 'info';
    default:
      return 'neutral';
  }
}

export function txKindLabel(kind: TransactionDto['kind']): string {
  switch (kind) {
    case 'INTERNAL_TRANSFER':
      return 'Internal transfer';
    case 'BASE_PAYOUT':
      return 'Base payout';
    case 'XRPL_PAYOUT':
      return 'XRPL payout';
    case 'L3_PAYOUT':
      return 'L3 payout';
    default:
      return kind.replace(/_/g, ' ').toLowerCase();
  }
}

export function broadcastStatusVariant(status: string): BadgeVariant {
  switch (status) {
    case 'CONFIRMED':
      return 'success';
    case 'SUBMITTED':
      return 'info';
    case 'PENDING':
      return 'warning';
    case 'FAILED':
      return 'danger';
    default:
      return 'neutral';
  }
}
