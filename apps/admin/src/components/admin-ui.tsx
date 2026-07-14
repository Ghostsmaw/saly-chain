'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card, Sparkline } from '@salychain/ui';

export type Tone = 'brand' | 'cyan' | 'success' | 'warning' | 'danger' | 'neutral';

const toneRing: Record<Tone, string> = {
  brand: 'from-brand-500/25 to-brand-500/5 text-brand-300',
  cyan: 'from-accent-500/25 to-accent-500/5 text-accent-300',
  success: 'from-emerald-500/25 to-emerald-500/5 text-emerald-300',
  warning: 'from-amber-500/25 to-amber-500/5 text-amber-300',
  danger: 'from-rose-500/25 to-rose-500/5 text-rose-300',
  neutral: 'from-surface-borderStrong/40 to-transparent text-text-secondary',
};

const toneSpark: Record<Tone, string> = {
  brand: '#8159FF',
  cyan: '#2BC9F0',
  success: '#16C784',
  warning: '#F0A92B',
  danger: '#F0444F',
  neutral: '#7A75A8',
};

/** Compact metric tile with an icon, value, optional delta and sparkline. */
export function MetricTile({
  icon,
  label,
  value,
  delta,
  deltaLabel = 'vs prev period',
  spark,
  tone = 'brand',
  hint,
}: {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
  delta?: number;
  deltaLabel?: string;
  spark?: readonly number[];
  tone?: Tone;
  hint?: string;
}) {
  const isUp = delta !== undefined && delta >= 0;
  return (
    <Card className="relative overflow-hidden">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${toneRing[tone]} opacity-25`} />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-text-muted">{label}</p>
          <p className="mt-2 truncate text-2xl font-semibold tracking-tight text-text-primary">{value}</p>
          {delta !== undefined ? (
            <p
              className={[
                'mt-2 flex items-center gap-1 text-xs font-medium',
                isUp ? 'text-success-300' : 'text-danger-300',
              ].join(' ')}
            >
              {isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {isUp ? '+' : ''}
              {delta.toFixed(1)}% <span className="font-normal text-text-muted">{deltaLabel}</span>
            </p>
          ) : hint ? (
            <p className="mt-2 text-xs text-text-muted">{hint}</p>
          ) : null}
        </div>
        {icon ? (
          <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${toneRing[tone]}`}>
            {icon}
          </div>
        ) : null}
      </div>
      {spark ? (
        <div className="pointer-events-none relative mt-3 -mb-2">
          <Sparkline data={spark} width={320} height={40} stroke={toneSpark[tone]} />
        </div>
      ) : null}
    </Card>
  );
}

/** Horizontal labelled progress bar (e.g. take-rate / share breakdowns). */
export function BarRow({
  label,
  value,
  max,
  color,
  right,
}: {
  label: ReactNode;
  value: number;
  max: number;
  color: string;
  right?: ReactNode;
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-secondary">{label}</span>
        {right ? <span className="text-text-tertiary">{right}</span> : null}
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-cardHover">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export interface StackedBarSegment {
  key: string;
  value: number;
  color: string;
}

export type StackedBarsFormat = 'number' | 'usd-millions';

function formatStacked(format: StackedBarsFormat, v: number): string {
  return format === 'usd-millions' ? `$${v.toFixed(0)}M` : `${v}`;
}

/** Vertical stacked-bar group used for the analytics rail-mix-over-time chart. */
export function StackedBars({
  groups,
  height = 200,
  yFormat,
  valueFormat = 'number',
}: {
  groups: { label: string; segments: StackedBarSegment[] }[];
  height?: number;
  /** Function formatter (client components only). */
  yFormat?: (v: number) => string;
  /** Serializable format preset (safe to pass from server components). */
  valueFormat?: StackedBarsFormat;
}) {
  const format = yFormat ?? ((v: number) => formatStacked(valueFormat, v));
  const totals = groups.map((g) => g.segments.reduce((s, seg) => s + seg.value, 0));
  const max = Math.max(...totals, 1);
  return (
    <div className="flex items-end gap-4" style={{ height }}>
      {groups.map((g) => {
        const total = g.segments.reduce((s, seg) => s + seg.value, 0);
        return (
          <div key={g.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <span className="text-[11px] text-text-tertiary">{format(total)}</span>
            <div
              className="flex w-full max-w-[44px] flex-col-reverse overflow-hidden rounded-lg"
              style={{ height: `${(total / max) * 100}%` }}
              title={`${g.label}: ${format(total)}`}
            >
              {g.segments.map((seg) => (
                <div
                  key={seg.key}
                  style={{ background: seg.color, height: `${(seg.value / total) * 100}%` }}
                />
              ))}
            </div>
            <span className="text-xs text-text-muted">{g.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Pill-style legend used beneath charts. */
export function Legend({ items }: { items: readonly { label: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  );
}

/** Interactive period selector with internal state. */
export function PeriodToggle({
  periods,
  active: initialActive = 1,
  onChange,
}: {
  periods: string[];
  active?: number;
  onChange?: (period: string, index: number) => void;
}) {
  const [active, setActive] = useState(initialActive);

  return (
    <div className="flex items-center gap-1 rounded-lg border border-surface-border bg-surface-card/60 p-0.5">
      {periods.map((p, i) => (
        <button
          key={p}
          type="button"
          onClick={() => {
            setActive(i);
            onChange?.(p, i);
          }}
          className={[
            'rounded-md px-2.5 py-1 text-xs transition',
            i === active
              ? 'bg-brand-500/20 text-brand-200'
              : 'text-text-tertiary hover:bg-surface-cardHover hover:text-text-primary',
          ].join(' ')}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
