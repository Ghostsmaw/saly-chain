'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronRight, GitBranch, Shield } from 'lucide-react';
import { SalyDataTable } from '@/components/saly/data/SalyDataTable';
import {
  ROUTING_RAILS,
  type ParsedRouteDecision,
  type RoutingRailFilter,
  formatRouteAmount,
  formatRouteCorridor,
  railVariant,
} from '@/lib/saly-routing';
import { formatDateTime, truncateId } from '@/lib/saly-format';
import { SalyBadge, SalyButton, SalyCard, SalyEmptyState, SalyTabs } from '@/components/saly/ui';

export function RoutingExplorer({
  decisions,
  source,
}: {
  decisions: ParsedRouteDecision[];
  source: 'live' | 'unavailable';
}) {
  const [railFilter, setRailFilter] = useState<RoutingRailFilter>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (railFilter === 'All') return decisions;
    return decisions.filter((d) => d.selected_rail === railFilter);
  }, [decisions, railFilter]);

  const columns = useMemo<ColumnDef<ParsedRouteDecision, unknown>[]>(
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
      },
      {
        accessorKey: 'id',
        header: 'Decision',
        cell: ({ row }) => {
          const d = row.original;
          return (
            <div>
              <p className="font-mono text-xs text-saly-text-primary">{truncateId(d.id)}</p>
              <p className="mt-0.5 line-clamp-1 text-[11px] text-saly-text-muted">{d.rationale}</p>
            </div>
          );
        },
      },
      {
        id: 'corridor',
        header: 'Corridor',
        cell: ({ row }) => (
          <div>
            <p className="text-xs text-saly-text-primary">{formatRouteCorridor(row.original.parsedInput)}</p>
            <p className="mt-0.5 font-mono text-[11px] text-saly-text-faint">
              {formatRouteAmount(row.original.parsedInput)}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'selected_rail',
        header: 'Selected rail',
        cell: ({ row }) => (
          <SalyBadge variant="accent" dot>
            {row.original.selected_rail}
          </SalyBadge>
        ),
      },
      {
        accessorKey: 'selected_score',
        header: 'Score',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-saly-text-primary">{row.original.selected_score}</span>
        ),
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
        <SalyEmptyState
          title="Routing service unreachable"
          description="Boot services/routing on port 4007 to see live decisions."
        />
      </SalyCard>
    );
  }

  return (
    <div className="space-y-4">
      <SalyTabs
        tabs={ROUTING_RAILS.map((rail) => ({
          key: rail,
          label: rail === 'All' ? 'All rails' : rail,
          count:
            rail === 'All'
              ? decisions.length
              : decisions.filter((d) => d.selected_rail === rail).length,
        }))}
        active={railFilter}
        onChange={setRailFilter}
      />

      <SalyDataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search by ID, rationale, or rail…"
        searchColumn="id"
        emptyTitle="No routing decisions"
        emptyDescription="Submit an intent through execution to populate the audit trail."
        getRowId={(d) => d.id}
        onRowClick={(d) => setExpandedId((prev) => (prev === d.id ? null : d.id))}
      />

      <AnimatePresence>
        {expandedId ? (
          <ExpandedDecision
            decision={decisions.find((d) => d.id === expandedId)}
            onClose={() => setExpandedId(null)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ExpandedDecision({
  decision,
  onClose,
}: {
  decision: ParsedRouteDecision | undefined;
  onClose: () => void;
}) {
  if (!decision) return null;

  const maxScore = Math.max(...decision.parsedCandidates.map((c) => c.score), decision.selected_score, 1);
  const risk = decision.parsedInput.risk_score;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
    >
      <SalyCard className="border-saly-border-strong">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-saly-text-primary">Candidate evaluation</p>
            <p className="mt-1 text-xs text-saly-text-muted">{decision.rationale}</p>
          </div>
          <SalyButton variant="ghost" size="sm" onClick={onClose}>
            Close
          </SalyButton>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          <SalyBadge variant="accent">{decision.selected_rail} selected</SalyBadge>
          <SalyBadge variant="neutral">Score {decision.selected_score}</SalyBadge>
          {typeof risk === 'number' ? (
            <SalyBadge variant={risk >= 70 ? 'danger' : risk >= 40 ? 'warning' : 'success'}>
              Risk {risk}
            </SalyBadge>
          ) : null}
          {decision.intent_id ? (
            <Link href={`/intents`} className="text-xs text-saly-text-muted hover:text-violet-300">
              Intent {truncateId(decision.intent_id)}
            </Link>
          ) : null}
        </div>

        <ul className="space-y-3">
          {decision.parsedCandidates.map((c) => {
            const pct = Math.round((c.score / maxScore) * 100);
            const selected = c.rail === decision.selected_rail;

            return (
              <li
                key={c.rail}
                className={[
                  'rounded-saly border px-4 py-3 transition-colors',
                  selected ? 'border-violet-500/30 bg-saly-accent-muted' : 'border-saly-border hover:bg-saly-bg-hover',
                ].join(' ')}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-3.5 w-3.5 text-saly-text-faint" />
                    <span className="text-sm font-medium text-saly-text-primary">{c.rail}</span>
                    <SalyBadge variant={railVariant(c.rail, decision.selected_rail, c.available)}>
                      {c.available ? 'available' : 'blocked'}
                    </SalyBadge>
                  </div>
                  <span className="font-mono text-sm text-saly-text-primary">{c.score}</span>
                </div>

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className={['h-full rounded-full transition-all', selected ? 'bg-violet-400' : 'bg-white/40'].join(' ')}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-saly-text-faint">
                  {c.expected_seconds != null ? <span>ETA {c.expected_seconds}s</span> : null}
                  {c.expected_cost_usd_minor != null ? (
                    <span>Cost {c.expected_cost_usd_minor} minor USD</span>
                  ) : null}
                  {c.reliability != null ? <span>Reliability {c.reliability}</span> : null}
                  {c.privacy != null ? <span>Privacy {c.privacy}</span> : null}
                </div>

                {c.notes && c.notes.length > 0 ? (
                  <ul className="mt-2 space-y-0.5 text-[11px] text-saly-text-muted">
                    {c.notes.map((note, i) => (
                      <li key={i}>· {note}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex items-start gap-2 rounded-saly border border-saly-border bg-saly-bg-secondary px-3 py-2.5">
          <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-saly-text-faint" />
          <p className="text-[11px] leading-relaxed text-saly-text-muted">
            Every decision is persisted with input snapshot, candidate scores, and rationale for regulator-grade audit.
          </p>
        </div>
      </SalyCard>
    </motion.div>
  );
}
