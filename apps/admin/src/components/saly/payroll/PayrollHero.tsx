'use client';

import { SalyBadge, SalyCard, SalyStat } from '@/components/saly/ui';

export function PayrollHero({
  live,
  total,
  inProgress,
  settled,
  linesSettled,
  totalLines,
}: {
  live: boolean;
  total: number;
  inProgress: number;
  settled: number;
  failed: number;
  linesSettled: number;
  totalLines: number;
}) {
  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="p-6">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <SalyBadge variant={live ? 'success' : 'warning'} dot>
            {live ? 'Orchestration live' : 'Offline'}
          </SalyBadge>
          {inProgress > 0 ? (
            <SalyBadge variant="warning">{inProgress} in progress</SalyBadge>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <SalyStat label="Batches" value={live ? total.toLocaleString() : '—'} />
          <SalyStat label="Settled" value={live ? settled.toLocaleString() : '—'} />
          <SalyStat label="In progress" value={live ? inProgress.toLocaleString() : '—'} hint="Awaiting PSP" />
          <SalyStat
            label="Lines"
            value={live && totalLines > 0 ? `${linesSettled}/${totalLines}` : '—'}
            hint="FIAT_PAYOUT confirmed"
          />
        </div>
      </div>
    </SalyCard>
  );
}
