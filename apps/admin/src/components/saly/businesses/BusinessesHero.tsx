'use client';

import { SalyBadge, SalyCard, SalyStat } from '@/components/saly/ui';

export function BusinessesHero({
  live,
  total,
  active,
  suspended,
  custodialWallets,
  developerAccounts,
  walletLive,
}: {
  live: boolean;
  total: number;
  active: number;
  suspended: number;
  custodialWallets: number | null;
  developerAccounts: number;
  walletLive: boolean;
}) {
  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="p-6">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <SalyBadge variant={live ? 'success' : 'warning'} dot>
            {live ? `${total.toLocaleString()} organizations` : 'Identity offline'}
          </SalyBadge>
          {live && suspended > 0 ? (
            <SalyBadge variant="danger">{suspended} suspended</SalyBadge>
          ) : null}
          <SalyBadge variant={walletLive ? 'neutral' : 'warning'}>
            {walletLive ? 'Treasury service live' : 'Wallet stats offline'}
          </SalyBadge>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <SalyStat label="Business accounts" value={live ? total.toLocaleString() : '—'} />
          <SalyStat label="Active" value={live ? active.toLocaleString() : '—'} hint="KYB cleared" />
          <SalyStat
            label="Custodial wallets"
            value={custodialWallets !== null ? custodialWallets.toLocaleString() : '—'}
            hint="Platform custody"
          />
          <SalyStat
            label="Developer seats"
            value={live ? developerAccounts.toLocaleString() : '—'}
            hint="API portal accounts"
          />
        </div>
      </div>
    </SalyCard>
  );
}
