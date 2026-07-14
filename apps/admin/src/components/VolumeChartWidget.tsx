'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AreaChart, Card, CardHeader } from '@salychain/ui';

export interface VolumePoint {
  label: string;
  value: number;
}

const PERIODS = [
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: 'All', days: Infinity },
] as const;

/**
 * Live transaction-throughput chart. `series` is the daily transaction count
 * derived from the execution service. Period toggles slice the live series —
 * no synthetic data.
 */
export function VolumeChartWidget({ series }: { series: VolumePoint[] }) {
  const [periodIdx, setPeriodIdx] = useState(1);

  const data = useMemo(() => {
    const days = PERIODS[periodIdx]?.days ?? 30;
    if (!Number.isFinite(days)) return series;
    return series.slice(-Number(days));
  }, [series, periodIdx]);

  const total = data.reduce((s, p) => s + p.value, 0);
  const hasData = series.length > 0;

  return (
    <Card className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
      <CardHeader
        title="Transaction throughput"
        subtitle={
          <span className="flex items-baseline gap-3">
            <span className="text-2xl font-bold tracking-tight text-text-primary">
              {total.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-xs text-text-tertiary">
              <ArrowUpRight className="h-3.5 w-3.5" />
              transactions in range
            </span>
          </span>
        }
        right={
          <div className="flex items-center gap-1 rounded-lg border border-surface-border bg-surface-card/60 p-1">
            {PERIODS.map((p, i) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setPeriodIdx(i)}
                className={[
                  'rounded-md px-2.5 py-1 text-xs transition',
                  i === periodIdx
                    ? 'bg-brand-500/20 text-brand-200'
                    : 'text-text-tertiary hover:bg-surface-cardHover hover:text-text-primary',
                ].join(' ')}
              >
                {p.label}
              </button>
            ))}
          </div>
        }
      />
      {hasData ? (
        <AreaChart
          data={data}
          height={260}
          valueFormat="number"
          stroke="#8159FF"
          fillGradient={['rgba(129, 89, 255, 0.5)', 'rgba(129, 89, 255, 0)']}
        />
      ) : (
        <div className="py-20 text-center text-sm text-text-muted">
          No transaction history yet.
        </div>
      )}
    </Card>
  );
}
