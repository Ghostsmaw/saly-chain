'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { TransactionDto } from '@salychain/sdk-internal';
import { ChevronDown, ChevronRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SalyDataTable } from '@/components/saly/data/SalyDataTable';
import { SalyBadge, SalyButton, SalyCard, SalyTabs } from '@/components/saly/ui';
import { formatAmount, formatDateTime, truncateId } from '@/lib/saly-format';
import { txKindLabel, txStateVariant } from '@/lib/saly-tx';

const STATE_FILTERS = ['All', 'SETTLED', 'EXECUTING', 'PENDING', 'FAILED', 'REJECTED'] as const;
type StateFilter = (typeof STATE_FILTERS)[number];

export function TransactionsExplorer({
  transactions,
  source,
}: {
  transactions: TransactionDto[];
  source: 'live' | 'unavailable';
}) {
  const router = useRouter();
  const [stateFilter, setStateFilter] = useState<StateFilter>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (stateFilter === 'All') return transactions;
    return transactions.filter((tx) => tx.state === stateFilter);
  }, [stateFilter, transactions]);

  const columns = useMemo<ColumnDef<TransactionDto, unknown>[]>(
    () => [
      {
        id: 'expand',
        header: '',
        cell: ({ row }) => {
          const open = expandedId === row.original.id;
          return (
            <button
              type="button"
              className="text-saly-text-faint hover:text-saly-text-primary"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedId(open ? null : row.original.id);
              }}
            >
              {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          );
        },
        size: 32,
      },
      {
        accessorKey: 'id',
        header: 'Transaction',
        cell: ({ row }) => (
          <div>
            <Link
              href={`/transactions/${row.original.id}`}
              className="font-mono text-xs text-saly-text-primary hover:text-violet-300"
              onClick={(e) => e.stopPropagation()}
            >
              {truncateId(row.original.id)}
            </Link>
            <p className="mt-0.5 text-[11px] text-saly-text-faint">{txKindLabel(row.original.kind)}</p>
          </div>
        ),
      },
      {
        accessorKey: 'state',
        header: 'Status',
        cell: ({ row }) => (
          <SalyBadge variant={txStateVariant(row.original.state)} dot>
            {row.original.state}
          </SalyBadge>
        ),
      },
      {
        id: 'amount',
        header: 'Amount',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-saly-text-primary">
            {formatAmount(row.original.source.amount_minor, row.original.source.currency)}
          </span>
        ),
      },
      {
        id: 'destination',
        header: 'Destination',
        cell: ({ row }) => {
          const dest = row.original.destination;
          const label = dest.address ?? dest.account_id ?? '—';
          return <span className="font-mono text-[11px] text-saly-text-muted">{truncateId(String(label))}</span>;
        },
      },
      {
        accessorKey: 'created_at',
        header: 'Time',
        cell: ({ row }) => (
          <span className="text-xs text-saly-text-muted">{formatDateTime(row.original.created_at)}</span>
        ),
      },
    ],
    [expandedId],
  );

  if (source === 'unavailable') {
    return (
      <SalyCard>
        <p className="text-sm text-saly-text-muted">
          Execution service unreachable. Boot <code className="rounded bg-white/[0.06] px-1">services/execution</code> to
          stream transactions.
        </p>
      </SalyCard>
    );
  }

  return (
    <div className="space-y-4">
      <SalyTabs
        tabs={STATE_FILTERS.map((s) => ({
          key: s,
          label: s === 'All' ? 'All' : s.replace(/_/g, ' ').toLowerCase(),
          count: s === 'All' ? transactions.length : transactions.filter((t) => t.state === s).length,
        }))}
        active={stateFilter}
        onChange={setStateFilter}
      />

      <SalyDataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search by ID, kind, or destination…"
        searchColumn="id"
        emptyTitle="No transactions"
        emptyDescription="Initiate a transfer via the execution API to populate this view."
        onRowClick={(tx) => router.push(`/transactions/${tx.id}`)}
        getRowId={(tx) => tx.id}
        toolbar={
          <SalyButton variant="secondary" size="sm">
            <Filter className="h-3.5 w-3.5" />
            Filters
          </SalyButton>
        }
      />

      <AnimatePresence>
        {expandedId ? (
          <ExpandedTxDetail
            tx={transactions.find((t) => t.id === expandedId)!}
            onClose={() => setExpandedId(null)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ExpandedTxDetail({ tx, onClose }: { tx: TransactionDto | undefined; onClose: () => void }) {
  if (!tx) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
    >
      <SalyCard className="border-saly-border-strong">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-saly-text-primary">Transaction timeline</p>
          <SalyButton variant="ghost" size="sm" onClick={onClose}>
            Close
          </SalyButton>
        </div>
        <ol className="relative ml-2 border-l border-saly-border pl-6">
          {tx.events.map((ev, i) => (
            <li key={i} className="mb-4 last:mb-0">
              <span className="absolute -left-[5px] mt-1.5 h-2 w-2 rounded-full bg-saly-accent" />
              <p className="text-sm text-saly-text-primary">{ev.state}</p>
              <p className="text-[11px] text-saly-text-faint">{formatDateTime(ev.at)}</p>
              {ev.detail ? (
                <p className="mt-1 text-xs text-saly-text-muted">{JSON.stringify(ev.detail)}</p>
              ) : null}
            </li>
          ))}
        </ol>
        {tx.tx_hash ? (
          <p className="mt-4 font-mono text-[11px] text-saly-text-muted">
            Hash · {truncateId(tx.tx_hash)}
          </p>
        ) : null}
      </SalyCard>
    </motion.div>
  );
}
