'use client';

import { SalyBarChart } from '@/components/saly/charts/SalyBarChart';
import { SalyBadge, SalyCard, SalyStat } from '@/components/saly/ui';

export function RoutingHero({
  live,
  total,
  topRail,
  avgScore,
  railsUsed,
  distribution,
}: {
  live: boolean;
  total: number;
  topRail: string;
  avgScore: number;
  railsUsed: number;
  distribution: { label: string; value: number }[];
}) {
  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.1fr]">
        <div className="border-b border-saly-border p-6 lg:border-b-0 lg:border-r">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <SalyBadge variant={live ? 'success' : 'warning'} dot>
              {live ? 'Routing engine live' : 'Service offline'}
            </SalyBadge>
            <SalyBadge variant="neutral">Deterministic scoring</SalyBadge>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <SalyStat label="Decisions" value={live ? total.toLocaleString() : '—'} hint="Recent audit trail" />
            <SalyStat label="Top rail" value={live ? topRail : '—'} hint="Most selected" />
            <SalyStat label="Avg score" value={live ? avgScore.toString() : '—'} hint="Weighted 0–100" />
            <SalyStat label="Rails used" value={live ? railsUsed.toString() : '—'} hint="Active corridors" />
          </div>
        </div>

        <div className="p-6">
          <p className="mb-3 text-xs font-medium text-saly-text-muted">Rail selection mix</p>
          {live && distribution.length > 0 ? (
            <SalyBarChart data={distribution} height={180} horizontal />
          ) : (
            <div className="flex h-[180px] items-center justify-center rounded-saly border border-dashed border-saly-border text-xs text-saly-text-faint">
              No routing data yet
            </div>
          )}
        </div>
      </div>
    </SalyCard>
  );
}
