'use client';

import { useMemo, useState } from 'react';
import type { RatePairRow } from '@salychain/sdk-internal';
import {
  FX_PAIR_FILTERS,
  type FxPairFilter,
  formatFxRate,
  pairLabel,
} from '@/lib/saly-liquidity';
import { formatDateTime } from '@/lib/saly-format';
import { SalyBadge, SalyCard, SalyEmptyState, SalyTabs } from '@/components/saly/ui';

export function FxRateBoard({
  pairs,
  source,
}: {
  pairs: RatePairRow[];
  source: 'live' | 'unavailable';
}) {
  const [filter, setFilter] = useState<FxPairFilter>('All');

  const filtered = useMemo(() => {
    if (filter === 'Live') return pairs.filter((p) => p.available);
    if (filter === 'Unavailable') return pairs.filter((p) => !p.available);
    return pairs;
  }, [filter, pairs]);

  if (source === 'unavailable') {
    return (
      <SalyCard>
        <SalyEmptyState
          title="Liquidity service unreachable"
          description="Start services/liquidity with LIQUIDITY_RATE_PROVIDER=composite."
        />
      </SalyCard>
    );
  }

  return (
    <SalyCard padding={false} className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-saly-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-saly-text-primary">FX mid-market board</p>
          <p className="text-xs text-saly-text-muted">Rates scaled 1e8 — spread applied at quote time</p>
        </div>
        <SalyBadge variant="success" dot>
          {pairs.filter((p) => p.available).length} live
        </SalyBadge>
      </div>

      <div className="border-b border-saly-border px-5 py-3">
        <SalyTabs
          tabs={FX_PAIR_FILTERS.map((f) => ({
            key: f,
            label: f === 'All' ? 'All pairs' : f,
            count:
              f === 'All'
                ? pairs.length
                : f === 'Live'
                  ? pairs.filter((p) => p.available).length
                  : pairs.filter((p) => !p.available).length,
          }))}
          active={filter}
          onChange={setFilter}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="p-6">
          <SalyEmptyState title="No pairs match filter" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-saly-border bg-saly-bg-secondary/80 text-xs text-saly-text-muted">
                <th className="px-4 py-2.5 font-medium">Pair</th>
                <th className="px-4 py-2.5 font-medium">Mid rate</th>
                <th className="px-4 py-2.5 font-medium">Source</th>
                <th className="px-4 py-2.5 font-medium">Updated</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={`${row.base}-${row.quote}`}
                  className="border-b border-saly-border/60 transition hover:bg-saly-bg-hover"
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-saly-text-primary">{pairLabel(row.base, row.quote)}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-saly-text-primary">
                    {row.available && row.mid_rate_1e8 ? formatFxRate(row.mid_rate_1e8) : '—'}
                  </td>
                  <td className="px-4 py-3 text-xs text-saly-text-muted">{row.provider ?? '—'}</td>
                  <td className="px-4 py-3 text-xs text-saly-text-faint">
                    {row.captured_at ? formatDateTime(row.captured_at) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {row.available ? (
                      <SalyBadge variant="success" dot>
                        OK
                      </SalyBadge>
                    ) : (
                      <span title={row.error}>
                        <SalyBadge variant="danger">Unavailable</SalyBadge>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SalyCard>
  );
}
