'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { IntentRecordDto } from '@salychain/sdk-internal';
import { SalyDataTable } from '@/components/saly/data/SalyDataTable';
import { SalyBarChart } from '@/components/saly/charts/SalyBarChart';
import {
  INTENT_STATE_FILTERS,
  type IntentStateFilter,
  intentStateVariant,
  parseIntentPayload,
} from '@/lib/saly-intents';
import { formatDateTime, truncateId } from '@/lib/saly-format';
import { SalyBadge, SalyCard, SalyEmptyState, SalyStat, SalyTabs } from '@/components/saly/ui';

export function IntentsHero({
  live,
  total,
  completed,
  inFlight,
  rejected,
  distribution,
}: {
  live: boolean;
  total: number;
  completed: number;
  inFlight: number;
  rejected: number;
  distribution: { label: string; value: number }[];
}) {
  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.1fr]">
        <div className="border-b border-saly-border p-6 lg:border-b-0 lg:border-r">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <SalyBadge variant={live ? 'success' : 'warning'} dot>
              {live ? 'Intent service live' : 'Offline'}
            </SalyBadge>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <SalyStat label="Intents" value={live ? total.toLocaleString() : '—'} />
            <SalyStat label="Completed" value={live ? completed.toLocaleString() : '—'} />
            <SalyStat label="In flight" value={live ? inFlight.toLocaleString() : '—'} />
            <SalyStat label="Rejected / failed" value={live ? rejected.toLocaleString() : '—'} />
          </div>
        </div>
        <div className="p-6">
          <p className="mb-3 text-xs font-medium text-saly-text-muted">Intents by kind</p>
          {live && distribution.length > 0 ? (
            <SalyBarChart data={distribution} height={180} horizontal />
          ) : (
            <div className="flex h-[180px] items-center justify-center rounded-saly border border-dashed border-saly-border text-xs text-saly-text-faint">
              Submit intents to populate analytics
            </div>
          )}
        </div>
      </div>
    </SalyCard>
  );
}

export function IntentsExplorer({
  intents,
  source,
}: {
  intents: IntentRecordDto[];
  source: 'live' | 'unavailable';
}) {
  const [stateFilter, setStateFilter] = useState<IntentStateFilter>('All');

  const filtered = useMemo(() => {
    if (stateFilter === 'All') return intents;
    return intents.filter((i) => i.state === stateFilter);
  }, [intents, stateFilter]);

  const columns = useMemo<ColumnDef<IntentRecordDto, unknown>[]>(
    () => [
      {
        accessorKey: 'intent_id',
        header: 'Intent',
        cell: ({ row }) => {
          const view = parseIntentPayload(row.original);
          return (
            <div>
              <p className="font-mono text-xs text-saly-text-primary">
                {truncateId(row.original.intent_id)}
              </p>
              <p className="mt-0.5 text-[11px] text-saly-text-muted">
                {row.original.kind} · {view.amount}
              </p>
            </div>
          );
        },
      },
      {
        id: 'corridor',
        header: 'Corridor',
        cell: ({ row }) => {
          const view = parseIntentPayload(row.original);
          return (
            <span className="text-xs text-saly-text-secondary">
              → {view.destCurrency} ({view.benefitKind})
            </span>
          );
        },
      },
      {
        id: 'actor',
        header: 'Actor',
        cell: ({ row }) => (
          <span className="text-xs text-saly-text-muted">
            {row.original.actor_ref} · {row.original.channel.toLowerCase()}
          </span>
        ),
      },
      {
        accessorKey: 'state',
        header: 'State',
        cell: ({ row }) => (
          <SalyBadge variant={intentStateVariant(row.original.state)} dot>
            {row.original.state}
          </SalyBadge>
        ),
      },
      {
        id: 'tx',
        header: 'Execution',
        cell: ({ row }) =>
          row.original.execution_transaction_id ? (
            <Link
              href={`/transactions/${row.original.execution_transaction_id}`}
              className="font-mono text-[11px] text-violet-300 hover:text-violet-200"
            >
              {truncateId(row.original.execution_transaction_id)}
            </Link>
          ) : row.original.rejection ? (
            <span className="text-[11px] text-red-400" title={row.original.rejection.message}>
              {row.original.rejection.code}
            </span>
          ) : (
            <span className="text-saly-text-faint">—</span>
          ),
      },
      {
        accessorKey: 'created_at',
        header: 'Received',
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
          title="Intent service unreachable"
          description="Boot services/intent to see live intents."
        />
      </SalyCard>
    );
  }

  return (
    <div className="space-y-4">
      <SalyTabs
        tabs={INTENT_STATE_FILTERS.map((s) => ({
          key: s,
          label: s === 'All' ? 'All states' : s.toLowerCase(),
          count: s === 'All' ? intents.length : intents.filter((i) => i.state === s).length,
        }))}
        active={stateFilter}
        onChange={setStateFilter}
      />

      <SalyDataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search intent ID, kind, or actor…"
        searchColumn="intent_id"
        emptyTitle="No intents received"
        emptyDescription="Submit an intent to the intent service to populate this view."
        getRowId={(i) => i.intent_id}
      />
    </div>
  );
}
