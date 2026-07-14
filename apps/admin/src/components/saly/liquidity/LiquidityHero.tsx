'use client';

import { SalyBarChart } from '@/components/saly/charts/SalyBarChart';
import { SalyBadge, SalyCard, SalyStat } from '@/components/saly/ui';

export function LiquidityHero({
  live,
  provider,
  pairsLive,
  pairsTotal,
  openQuotes,
  consumedQuotes,
  providerMix,
}: {
  live: boolean;
  provider: string;
  pairsLive: number;
  pairsTotal: number;
  openQuotes: number;
  consumedQuotes: number;
  providerMix: { label: string; value: number }[];
}) {
  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.1fr]">
        <div className="border-b border-saly-border p-6 lg:border-b-0 lg:border-r">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <SalyBadge variant={live ? 'success' : 'warning'} dot>
              {live ? 'FX feed connected' : 'Service offline'}
            </SalyBadge>
            <SalyBadge variant="neutral">{provider}</SalyBadge>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <SalyStat
              label="Pairs live"
              value={live ? `${pairsLive}/${pairsTotal}` : '—'}
              hint="Mid-market board"
            />
            <SalyStat label="Rate provider" value={live ? provider : '—'} hint="Composite feed" />
            <SalyStat label="Open quotes" value={live ? openQuotes.toString() : '—'} hint="Awaiting draw-down" />
            <SalyStat label="Consumed" value={live ? consumedQuotes.toString() : '—'} hint="Executed conversions" />
          </div>
        </div>

        <div className="p-6">
          <p className="mb-3 text-xs font-medium text-saly-text-muted">Pairs by source</p>
          {live && providerMix.length > 0 ? (
            <SalyBarChart data={providerMix} height={180} horizontal />
          ) : (
            <div className="flex h-[180px] items-center justify-center rounded-saly border border-dashed border-saly-border text-xs text-saly-text-faint">
              Start services/liquidity to load rates
            </div>
          )}
        </div>
      </div>
    </SalyCard>
  );
}
