'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { TransactionDto } from '@salychain/sdk-internal';
import { SalyDataTable } from '@/components/saly/data/SalyDataTable';
import {
  TOPUP_STATE_FILTERS,
  type TopupStateFilter,
  formatTopupAmount,
  topupStateVariant,
} from '@/lib/saly-clearing';
import { formatDateTime, truncateId } from '@/lib/saly-format';
import { SalyBadge, SalyCard, SalyEmptyState, SalyTabs } from '@/components/saly/ui';

export function TopupsExplorer({
  topups,
  source,
}: {
  topups: TransactionDto[];
  source: 'live' | 'unavailable';
}) {
  const [stateFilter, setStateFilter] = useState<TopupStateFilter>('All');

  const filtered = useMemo(() => {
    if (stateFilter === 'All') return topups;
        if (stateFilter === 'FAILED') {
      return topups.filter((t) => t.state === 'FAILED' || t.state === 'REJECTED' || t.state === 'REVERSED');
    }
    return topups.filter((t) => t.state === stateFilter);
  }, [topups, stateFilter]);

  const columns = useMemo<ColumnDef<TransactionDto, unknown>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Transaction',
        cell: ({ row }) => (
          <Link
            href={`/transactions/${row.original.id}`}
            className="font-mono text-xs text-saly-text-primary hover:text-violet-300"
          >
            {truncateId(row.original.id)}
          </Link>
        ),
      },
      {
        id: 'amount',
        header: 'Amount',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-saly-text-primary">
            {formatTopupAmount(row.original.source.amount_minor, row.original.source.currency)}
          </span>
        ),
      },
      {
        id: 'reference',
        header: 'Reference',
        cell: ({ row }) => (
          <span className="font-mono text-[11px] text-saly-text-muted">
            {row.original.topup?.external_reference ?? '—'}
          </span>
        ),
      },
      {
        accessorKey: 'state',
        header: 'State',
        cell: ({ row }) => (
          <SalyBadge variant={topupStateVariant(row.original.state)} dot>
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
        <SalyEmptyState
          title="Execution service offline"
          description="Boot services/execution to monitor TOPUP ledger credits."
        />
      </SalyCard>
    );
  }

  return (
    <div className="space-y-4">
      <SalyTabs
        tabs={TOPUP_STATE_FILTERS.map((s) => ({
          key: s,
          label: s === 'All' ? 'All' : s.toLowerCase(),
          count:
            s === 'All'
              ? topups.length
              : s === 'FAILED'
                ? topups.filter((t) => t.state === 'FAILED' || t.state === 'REJECTED' || t.state === 'REVERSED').length
                : topups.filter((t) => t.state === s).length,
        }))}
        active={stateFilter}
        onChange={setStateFilter}
      />

      <SalyDataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search by ID or reference…"
        searchColumn="id"
        emptyTitle="No TOPUP transactions"
        emptyDescription="Seed the clearing pool or submit a TOPUP via the execution API."
        getRowId={(tx) => tx.id}
      />
    </div>
  );
}
