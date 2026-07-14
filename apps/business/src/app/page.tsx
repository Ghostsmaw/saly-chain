import { Suspense } from 'react';
import { ChevronDown, Vault, Wallet, Users } from 'lucide-react';
import {
  AreaChart,
  Card,
  CardHeader,
  DonutChart,
  StatCard,
} from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { LiveBadge } from '@/components/LiveBadge';
import { RecentActivity } from '@/components/RecentActivity';
import { TreasuryHero, WalletCard } from '@/components/WalletCard';
import {
  buildVolumeSeries,
  fetchTreasurySummary,
  fetchTransactions,
  listPendingSpendApprovals,
} from '@/lib/api';
import { formatMinor, usdLike } from '@/lib/format';
import { iconForTreasury } from '@/lib/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const [treasury, { data: transactions, source }, { data: approvals }] = await Promise.all([
    fetchTreasurySummary(),
    fetchTransactions(50),
    listPendingSpendApprovals(),
  ]);

  const summary = treasury.data;
  const primary = summary.by_currency[0];
  const volume = buildVolumeSeries(transactions);
  const totalVolume = volume.reduce((s, p) => s + p.value, 0);
  const orgName = treasury.org?.name ?? 'Your Business';

  const distribution = summary.by_currency.map((c, i) => ({
    label: c.currency,
    value: Number(c.total_minor) / (c.currency === 'XRP' ? 1e6 : 100),
    color: ['#8159FF', '#2BC9F0', '#16C784', '#F0A92B'][i % 4]!,
  }));

  return (
    <BusinessShell
      title="Business Dashboard"
      subtitle="Treasury overview and operational visibility"
      orgName={orgName}
      topRight={<LiveBadge live={treasury.source === 'live'} />}
    >
      <TreasuryHero
        orgName={orgName}
        primaryBalance={
          primary ? formatMinor(primary.total_minor.toString(), primary.currency) : null
        }
        currency={primary?.currency ?? 'USD'}
        walletCount={summary.total_wallets}
        pendingApprovals={approvals.length}
      />

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Treasury wallets"
          value={summary.total_wallets}
          icon={<iconForTreasury.wallets className="h-4 w-4" />}
          iconTone="brand"
        />
        <StatCard
          label="Active wallets"
          value={summary.active_wallets}
          icon={<Vault className="h-4 w-4" />}
          iconTone="cyan"
        />
        <StatCard
          label="Currencies"
          value={summary.by_currency.length}
          icon={<Wallet className="h-4 w-4" />}
          iconTone="success"
        />
        <StatCard
          label="Pending approvals"
          value={approvals.length}
          icon={<Users className="h-4 w-4" />}
          iconTone={approvals.length > 0 ? 'warning' : 'brand'}
        />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader
            title="Outbound volume"
            subtitle={
              <span className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-text-primary">{usdLike(totalVolume)}</span>
                <span className="text-xs text-text-tertiary">last 7 days (approx.)</span>
              </span>
            }
            right={
              <button
                type="button"
                className="flex items-center gap-1 rounded-md border border-surface-border bg-surface-card/60 px-2 py-1 text-xs text-text-secondary"
              >
                7D <ChevronDown className="h-3 w-3" />
              </button>
            }
          />
          <AreaChart
            data={volume}
            height={260}
            valueFormat="compact-usd"
            stroke="#2BC9F0"
            fillGradient={['rgba(43, 201, 240, 0.4)', 'rgba(43, 201, 240, 0)']}
          />
        </Card>

        <Card>
          <CardHeader title="Balance by currency" subtitle="Treasury allocation" />
          {distribution.length === 0 ? (
            <p className="py-12 text-center text-sm text-text-tertiary">
              Provision treasury wallets to see allocation.
            </p>
          ) : (
            <div className="flex items-center gap-4">
              <DonutChart
                data={distribution.map((d) => ({ label: d.label, value: d.value, color: d.color }))}
                centerLabel="Total"
                centerValue={String(summary.by_currency.length)}
                size={160}
              />
              <ul className="flex flex-1 flex-col gap-2 text-sm">
                {summary.by_currency.map((c, i) => (
                  <li key={c.currency} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-text-secondary">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ background: distribution[i]?.color }}
                      />
                      {c.currency}
                    </span>
                    <span className="font-medium text-text-primary">
                      {formatMinor(c.total_minor.toString(), c.currency)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card>
            <CardHeader
              title="Treasury wallets"
              right={
                <a href="/wallets" className="text-xs text-brand-300 hover:text-brand-200">
                  Manage wallets
                </a>
              }
            />
            {summary.wallets.length === 0 ? (
              <p className="py-10 text-center text-sm text-text-tertiary">
                {treasury.source === 'live'
                  ? 'No wallets linked to this organization yet.'
                  : 'Wallet service unavailable.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {summary.wallets.slice(0, 4).map((w) => (
                  <WalletCard key={w.id} wallet={w} />
                ))}
              </div>
            )}
          </Card>
        </div>

        <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-surface-card" />}>
          <RecentActivity limit={6} />
        </Suspense>
      </section>

      {source === 'unavailable' ? (
        <p className="mt-6 text-center text-xs text-text-muted">
          Some services are offline — dashboard shows available data only.
        </p>
      ) : null}
    </BusinessShell>
  );
}
