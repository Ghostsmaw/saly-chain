'use client';

import { TrendingUp } from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import type { RatePairsResponse } from '@salychain/sdk-internal';

export function FxRatesPanel({
  rates,
  live,
}: {
  rates: RatePairsResponse;
  live: boolean;
}) {
  const available = rates.pairs.filter((p) => p.available);

  const stubPairs = rates.pairs.filter((p) => p.provider?.includes('stub'));
  const hasStub = stubPairs.length > 0;

  return (
    <Card className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl" />
      <CardHeader
        title="FX reference rates"
        subtitle={`Provider: ${rates.provider}`}
        right={
          live ? (
            hasStub ? (
              <Chip tone="warning">Partial stub</Chip>
            ) : (
              <Chip tone="success">Live</Chip>
            )
          ) : (
            <Chip tone="neutral">Cached</Chip>
          )
        }
      />
      {hasStub ? (
        <p className="px-4 pb-2 text-[11px] text-amber-200">
          Some pairs use stub fallback — set LIQUIDITY_RATE_PROVIDER=composite without stub for production.
        </p>
      ) : null}
      {available.length === 0 ? (
        <p className="px-4 pb-4 text-sm text-text-muted">FX rates unavailable — start the liquidity service.</p>
      ) : (
        <ul className="divide-y divide-surface-divider">
          {available.slice(0, 6).map((row) => (
            <li key={`${row.base}-${row.quote}`} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/10 text-brand-300">
                  <TrendingUp className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {row.base} → {row.quote}
                  </p>
                  <p className="text-[11px] text-text-muted">{row.provider}</p>
                </div>
              </div>
              <p className="font-mono text-sm text-text-primary">
                {row.mid_rate_1e8 ? formatRate(row.mid_rate_1e8) : '—'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function formatRate(rate1e8: string): string {
  const n = Number(rate1e8) / 1e8;
  if (n >= 100) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return n.toFixed(4);
}
