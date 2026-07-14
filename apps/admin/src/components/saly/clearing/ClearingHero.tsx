'use client';

import { SalyBarChart } from '@/components/saly/charts/SalyBarChart';
import { SalyBadge, SalyCard, SalyStat } from '@/components/saly/ui';

export function ClearingHero({
  live,
  total,
  settled,
  pending,
  failed,
  volumeByCurrency,
  tokenConfigured,
}: {
  live: boolean;
  total: number;
  settled: number;
  pending: number;
  failed: number;
  volumeByCurrency: { label: string; value: number }[];
  tokenConfigured: boolean;
}) {
  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.1fr]">
        <div className="border-b border-saly-border p-6 lg:border-b-0 lg:border-r">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <SalyBadge variant={live ? 'success' : 'warning'} dot>
              {live ? 'Execution connected' : 'Service offline'}
            </SalyBadge>
            <SalyBadge variant={tokenConfigured ? 'neutral' : 'warning'}>
              {tokenConfigured ? 'Seed API enabled' : 'No admin token'}
            </SalyBadge>
            <SalyBadge variant="neutral">Tier 2 simulated</SalyBadge>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <SalyStat label="TOPUP txns" value={live ? total.toLocaleString() : '—'} hint="Recent inbound credits" />
            <SalyStat label="Settled" value={live ? settled.toLocaleString() : '—'} hint="Posted to ledger" />
            <SalyStat label="In flight" value={live ? pending.toLocaleString() : '—'} hint="Pending / executing" />
            <SalyStat label="Failed" value={live ? failed.toLocaleString() : '—'} hint="Rejected or reversed" />
          </div>
        </div>

        <div className="p-6">
          <p className="mb-3 text-xs font-medium text-saly-text-muted">Inbound volume by currency</p>
          {live && volumeByCurrency.length > 0 ? (
            <SalyBarChart data={volumeByCurrency} height={180} horizontal />
          ) : (
            <div className="flex h-[180px] items-center justify-center rounded-saly border border-dashed border-saly-border text-xs text-saly-text-faint">
              Seed clearing pool or wait for TOPUP activity
            </div>
          )}
        </div>
      </div>
    </SalyCard>
  );
}
