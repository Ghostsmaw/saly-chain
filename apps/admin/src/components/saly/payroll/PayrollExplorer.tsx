'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { TransactionDto } from '@salychain/sdk-internal';
import { SalyDataTable } from '@/components/saly/data/SalyDataTable';
import {
  PAYROLL_STATE_FILTERS,
  type PayrollStateFilter,
  formatPayrollAmount,
  payrollStateVariant,
} from '@/lib/saly-payroll';
import { formatDateTime, truncateId } from '@/lib/saly-format';
import { SalyBadge, SalyCard, SalyEmptyState, SalyTabs } from '@/components/saly/ui';

export function PayrollExplorer({
  batches,
  source,
}: {
  batches: TransactionDto[];
  source: 'live' | 'unavailable';
}) {
  const [stateFilter, setStateFilter] = useState<PayrollStateFilter>('All');

  const filtered = useMemo(() => {
    if (stateFilter === 'All') return batches;
    if (stateFilter === 'EXECUTING') {
      return batches.filter(
        (b) => b.state === 'EXECUTING' || b.state === 'AWAITING_CONFIRMATION',
      );
    }
    if (stateFilter === 'FAILED') {
      return batches.filter((b) => b.state === 'FAILED' || b.state === 'REJECTED');
    }
    return batches.filter((b) => b.state === stateFilter);
  }, [batches, stateFilter]);

  const columns = useMemo<ColumnDef<TransactionDto, unknown>[]>(
    () => [
      {
        id: 'batch',
        header: 'Batch',
        cell: ({ row }) => (
          <Link
            href={`/transactions/${row.original.id}`}
            className="font-medium text-saly-text-primary hover:text-violet-300"
          >
            {row.original.payroll?.name ?? truncateId(row.original.id)}
          </Link>
        ),
      },
      {
        id: 'amount',
        header: 'Amount',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-saly-text-primary">
            {formatPayrollAmount(row.original.source.amount_minor, row.original.source.currency)}
          </span>
        ),
      },
      {
        id: 'lines',
        header: 'Lines',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-saly-text-muted">
            {row.original.payroll?.lines_settled ?? 0}/{row.original.payroll?.total_lines ?? '—'}
          </span>
        ),
      },
      {
        accessorKey: 'state',
        header: 'State',
        cell: ({ row }) => (
          <SalyBadge variant={payrollStateVariant(row.original.state)} dot>
            {row.original.state}
          </SalyBadge>
        ),
      },
      {
        accessorKey: 'created_at',
        header: 'Created',
        cell: ({ row }) => (
          <span className="text-xs text-saly-text-faint">{formatDateTime(row.original.created_at)}</span>
        ),
      },
    ],
    [],
  );

  if (source === 'unavailable') {
    return (
      <SalyCard>
        <SalyEmptyState title="Execution offline" description="Boot services/execution to monitor payroll batches." />
      </SalyCard>
    );
  }

  return (
    <div className="space-y-4">
      <SalyTabs
        tabs={PAYROLL_STATE_FILTERS.map((s) => ({
          key: s,
          label: s === 'All' ? 'All batches' : s.toLowerCase(),
          count:
            s === 'All'
              ? batches.length
              : s === 'EXECUTING'
                ? batches.filter(
                    (b) => b.state === 'EXECUTING' || b.state === 'AWAITING_CONFIRMATION',
                  ).length
                : s === 'FAILED'
                  ? batches.filter((b) => b.state === 'FAILED' || b.state === 'REJECTED').length
                  : batches.filter((b) => b.state === s).length,
        }))}
        active={stateFilter}
        onChange={setStateFilter}
      />

      <SalyDataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search batch name or ID…"
        searchColumn="id"
        emptyTitle="No payroll batches"
        emptyDescription="Submit a PAYROLL_BATCH via execution to populate this view."
        getRowId={(b) => b.id}
      />
    </div>
  );
}
