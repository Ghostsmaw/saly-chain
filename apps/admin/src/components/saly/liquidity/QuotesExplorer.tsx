'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { QuoteListItem } from '@salychain/sdk-internal';
import { SalyDataTable } from '@/components/saly/data/SalyDataTable';
import {
  QUOTE_STATUS_FILTERS,
  type QuoteStatusFilter,
  formatSpreadBps,
  pairLabel,
  quoteStatusVariant,
} from '@/lib/saly-liquidity';
import { formatDateTime, truncateId } from '@/lib/saly-format';
import { SalyBadge, SalyCard, SalyEmptyState, SalyTabs } from '@/components/saly/ui';

export function QuotesExplorer({
  quotes,
  source,
}: {
  quotes: QuoteListItem[];
  source: 'live' | 'unavailable';
}) {
  const [statusFilter, setStatusFilter] = useState<QuoteStatusFilter>('All');

  const filtered = useMemo(() => {
    if (statusFilter === 'All') return quotes;
    return quotes.filter((q) => q.status === statusFilter);
  }, [quotes, statusFilter]);

  const columns = useMemo<ColumnDef<QuoteListItem, unknown>[]>(
    () => [
      {
        id: 'pair',
        header: 'Pair',
        cell: ({ row }) => (
          <span className="font-medium text-saly-text-primary">
            {pairLabel(row.original.from_currency, row.original.to_currency)}
          </span>
        ),
      },
      {
        id: 'from',
        header: 'From',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-saly-text-muted">{row.original.from_amount_minor}</span>
        ),
      },
      {
        id: 'to',
        header: 'To',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-saly-text-primary">{row.original.to_amount_minor}</span>
        ),
      },
      {
        id: 'spread',
        header: 'Spread',
        cell: ({ row }) => (
          <span className="text-xs text-saly-text-muted">{formatSpreadBps(row.original.spread_bps)}</span>
        ),
      },
      {
        accessorKey: 'provider',
        header: 'Provider',
        cell: ({ row }) => <span className="text-xs text-saly-text-muted">{row.original.provider}</span>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <SalyBadge variant={quoteStatusVariant(row.original.status)} dot>
            {row.original.status}
          </SalyBadge>
        ),
      },
      {
        accessorKey: 'created_at',
        header: 'Issued',
        cell: ({ row }) => (
          <span className="text-xs text-saly-text-faint">{formatDateTime(row.original.created_at)}</span>
        ),
      },
      {
        accessorKey: 'quote_id',
        header: 'Quote ID',
        cell: ({ row }) => (
          <span className="font-mono text-[11px] text-saly-text-faint">{truncateId(row.original.quote_id)}</span>
        ),
      },
    ],
    [],
  );

  if (source === 'unavailable') {
    return (
      <SalyCard>
        <SalyEmptyState title="Quote history unavailable" description="Liquidity service offline." />
      </SalyCard>
    );
  }

  return (
    <div className="space-y-4">
      <SalyTabs
        tabs={QUOTE_STATUS_FILTERS.map((s) => ({
          key: s,
          label: s === 'All' ? 'All quotes' : s.toLowerCase(),
          count: s === 'All' ? quotes.length : quotes.filter((q) => q.status === s).length,
        }))}
        active={statusFilter}
        onChange={setStatusFilter}
      />

      <SalyDataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search by pair, provider, or quote ID…"
        searchColumn="quote_id"
        emptyTitle="No signed quotes"
        emptyDescription="POST /v1/quotes from routing or execution to issue HMAC-sealed conversions."
        getRowId={(q) => q.quote_id}
      />
    </div>
  );
}
