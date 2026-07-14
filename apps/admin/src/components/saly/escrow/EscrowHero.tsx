'use client';

import { SalyBadge, SalyCard, SalyStat } from '@/components/saly/ui';

export function EscrowHero({
  total,
  funded,
  released,
  refunded,
  tokenConfigured,
}: {
  total: number;
  funded: number;
  released: number;
  refunded: number;
  tokenConfigured: boolean;
}) {
  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="p-6">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <SalyBadge variant={funded > 0 ? 'info' : 'neutral'} dot>
            {funded > 0 ? `${funded} awaiting resolution` : 'No funded deals'}
          </SalyBadge>
          <SalyBadge variant={tokenConfigured ? 'neutral' : 'warning'}>
            {tokenConfigured ? 'Actions enabled' : 'No admin token'}
          </SalyBadge>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <SalyStat label="Total deals" value={total.toLocaleString()} />
          <SalyStat label="Funded" value={funded.toLocaleString()} hint="Release or refund" />
          <SalyStat label="Released" value={released.toLocaleString()} />
          <SalyStat label="Refunded" value={refunded.toLocaleString()} />
        </div>
      </div>
    </SalyCard>
  );
}
