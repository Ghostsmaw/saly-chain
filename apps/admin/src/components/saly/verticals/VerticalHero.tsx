import { SalyBadge, SalyCard, SalyStat } from '@/components/saly/ui';
import { ADMIN_VERTICAL_ORG_ID } from '@/lib/verticals';

export type VerticalStat = {
  label: string;
  value: string;
  hint?: string;
};

export function VerticalHero({
  live,
  title,
  stats,
  badges,
}: {
  live: boolean;
  title?: string;
  stats: VerticalStat[];
  badges?: { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'accent' }[];
}) {
  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="p-6">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <SalyBadge variant={live ? 'success' : 'warning'} dot>
            {live ? 'Service live' : 'Offline'}
          </SalyBadge>
          <SalyBadge variant="neutral">{ADMIN_VERTICAL_ORG_ID}</SalyBadge>
          {title ? <SalyBadge variant="accent">{title}</SalyBadge> : null}
          {badges?.map((b) => (
            <SalyBadge key={b.label} variant={b.variant}>
              {b.label}
            </SalyBadge>
          ))}
        </div>
        <div
          className={[
            'grid gap-6',
            stats.length >= 4 ? 'grid-cols-2 sm:grid-cols-4' : stats.length === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2',
          ].join(' ')}
        >
          {stats.map((s) => (
            <SalyStat key={s.label} label={s.label} value={s.value} hint={s.hint} mono={false} />
          ))}
        </div>
      </div>
    </SalyCard>
  );
}
