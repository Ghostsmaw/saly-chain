'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { SpendApprovalListItem } from '@/lib/api';
import { SalyDataTable } from '@/components/saly/data/SalyDataTable';
import { truncateAddress, truncateId } from '@/lib/saly-format';
import { SalyBadge, SalyCard, SalyEmptyState, SalyStat } from '@/components/saly/ui';
import { ApproveSpendButton } from '@/components/ApproveSpendButton';

export function ApprovalsHero({
  live,
  pending,
  agents,
  approverConfigured,
}: {
  live: boolean;
  pending: number;
  agents: number;
  approverConfigured: boolean;
}) {
  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="p-6">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <SalyBadge variant={live ? (pending > 0 ? 'warning' : 'success') : 'danger'} dot>
            {live ? (pending > 0 ? `${pending} pending` : 'Queue clear') : 'Agents offline'}
          </SalyBadge>
          <SalyBadge variant={approverConfigured ? 'neutral' : 'warning'}>
            {approverConfigured ? 'Approver configured' : 'Set ADMIN_APPROVER_USER_ID'}
          </SalyBadge>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          <SalyStat label="Pending" value={live ? pending.toLocaleString() : '—'} />
          <SalyStat label="Agents" value={live ? agents.toLocaleString() : '—'} hint="Unique agents" />
          <SalyStat label="Policy" value="High-value" hint="Manual approver votes" />
        </div>
      </div>
    </SalyCard>
  );
}

export function ApprovalsExplorer({
  approvals,
  source,
  approverConfigured,
}: {
  approvals: SpendApprovalListItem[];
  source: 'live' | 'unavailable';
  approverConfigured: boolean;
}) {
  const columns = useMemo<ColumnDef<SpendApprovalListItem, unknown>[]>(
    () => [
      {
        accessorKey: 'agent_id',
        header: 'Agent',
        cell: ({ row }) => (
          <span className="font-mono text-[11px] text-saly-text-primary">
            {truncateId(row.original.agent_id)}
          </span>
        ),
      },
      {
        accessorKey: 'intent_id',
        header: 'Intent',
        cell: ({ row }) => (
          <span className="font-mono text-[11px] text-saly-text-muted">
            {row.original.intent_id ? truncateId(row.original.intent_id) : '—'}
          </span>
        ),
      },
      {
        accessorKey: 'amount_minor',
        header: 'Amount',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-saly-text-primary">{row.original.amount_minor}</span>
        ),
      },
      {
        accessorKey: 'destination',
        header: 'Destination',
        cell: ({ row }) => (
          <span className="font-mono text-[11px] text-saly-text-muted">
            {truncateAddress(row.original.destination, 10, 6)}
          </span>
        ),
      },
      {
        id: 'votes',
        header: 'Votes',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-saly-text-secondary">
            {row.original.approval_count}/{row.original.required_approvers}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <SalyBadge variant="warning" dot>
            {row.original.status}
          </SalyBadge>
        ),
      },
      {
        id: 'action',
        header: '',
        cell: ({ row }) =>
          approverConfigured ? (
            <ApproveSpendButton agentId={row.original.agent_id} requestId={row.original.id} />
          ) : (
            <span className="text-[11px] text-saly-text-faint">Configure approver</span>
          ),
      },
    ],
    [approverConfigured],
  );

  if (source === 'unavailable') {
    return (
      <SalyCard>
        <SalyEmptyState
          title="Agents service unreachable"
          description="Start the agents service to review pending spend approvals."
        />
      </SalyCard>
    );
  }

  if (approvals.length === 0) {
    return (
      <SalyCard>
        <SalyEmptyState
          title="No pending approvals"
          description="High-value agent intents appear here when policy requires approvers."
        />
      </SalyCard>
    );
  }

  return (
    <SalyDataTable
      data={approvals}
      columns={columns}
      searchPlaceholder="Search agent, intent, or destination…"
      searchColumn="agent_id"
      emptyTitle="No pending approvals"
      getRowId={(a) => a.id}
    />
  );
}

export function ApprovalsFlash({ ok, error }: { ok?: string; error?: string }) {
  if (!ok && !error) return null;
  return (
    <SalyCard
      className={
        ok
          ? 'border-emerald-500/20 bg-emerald-500/[0.04]'
          : 'border-red-500/20 bg-red-500/[0.04]'
      }
    >
      <p className={`text-sm ${ok ? 'text-emerald-400' : 'text-red-400'}`}>{ok ?? error}</p>
    </SalyCard>
  );
}

export function ApproverConfigHint() {
  return (
    <SalyCard className="border-amber-500/20 bg-amber-500/[0.04]">
      <p className="text-sm text-amber-200/90">
        Set <code className="text-amber-100/90">ADMIN_APPROVER_USER_ID=usr_…</code> before using Approve. See{' '}
        <code className="text-amber-100/90">docs/runbooks/s4-agent-high-value-spend-approval.md</code>.
      </p>
    </SalyCard>
  );
}
