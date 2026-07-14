import type { SpendApprovalListItem } from '@/lib/api';

export function computeApprovalStats(approvals: SpendApprovalListItem[]) {
  const totalAmount = approvals.reduce((s, a) => s + Number(BigInt(a.amount_minor || '0')), 0);
  const agents = new Set(approvals.map((a) => a.agent_id)).size;
  return {
    pending: approvals.length,
    agents,
    totalAmountMinor: totalAmount,
  };
}
