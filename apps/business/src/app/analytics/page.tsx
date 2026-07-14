import { Card, CardHeader, DonutChart, StatCard, AreaChart } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { LiveBadge } from '@/components/LiveBadge';
import {
  buildVolumeSeries,
  computeAnalytics,
  fetchOrganization,
  fetchTransactions,
} from '@/lib/api';
import { usdLike } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AnalyticsPage() {
  const [{ data: transactions, source }, orgResult] = await Promise.all([
    fetchTransactions(100),
    fetchOrganization(),
  ]);

  const analytics = computeAnalytics(transactions);
  const volume = buildVolumeSeries(transactions, 14);
  const totalVolume = volume.reduce((s, p) => s + p.value, 0);

  const kindDistribution = analytics.byKind.map((k, i) => ({
    label: k.kind.replace(/_/g, ' '),
    value: k.count,
    color: ['#8159FF', '#2BC9F0', '#16C784', '#F0A92B', '#F0444F'][i % 5]!,
  }));

  const outcomeDistribution = [
    { label: 'Settled', value: analytics.settled, color: '#16C784' },
    { label: 'Pending', value: analytics.pending, color: '#2BC9F0' },
    { label: 'Failed', value: analytics.failed, color: '#F0444F' },
  ].filter((d) => d.value > 0);

  return (
    <BusinessShell
      title="Analytics"
      subtitle="Transaction performance and volume trends"
      orgName={orgResult.data?.name}
      topRight={<LiveBadge live={source === 'live'} />}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total transactions" value={analytics.total} iconTone="brand" />
        <StatCard
          label="Success rate"
          value={`${analytics.successRate.toFixed(1)}%`}
          iconTone="success"
        />
        <StatCard label="Settled" value={analytics.settled} iconTone="cyan" />
        <StatCard
          label="Failed / rejected"
          value={analytics.failed}
          iconTone={analytics.failed > 0 ? 'danger' : 'brand'}
        />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader
            title="Volume trend"
            subtitle={`${usdLike(totalVolume)} over 14 days (approx.)`}
          />
          <AreaChart
            data={volume}
            height={280}
            valueFormat="compact-usd"
            stroke="#8159FF"
            fillGradient={['rgba(129, 89, 255, 0.45)', 'rgba(129, 89, 255, 0)']}
          />
        </Card>

        <Card>
          <CardHeader title="Outcome mix" />
          {outcomeDistribution.length === 0 ? (
            <p className="py-16 text-center text-sm text-text-tertiary">No transaction data yet.</p>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <DonutChart
                data={outcomeDistribution}
                centerLabel="Total"
                centerValue={String(analytics.total)}
                size={180}
              />
              <ul className="w-full space-y-2 text-sm">
                {outcomeDistribution.map((d) => (
                  <li key={d.label} className="flex justify-between">
                    <span className="text-text-secondary">{d.label}</span>
                    <span className="font-medium text-text-primary">{d.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </section>

      {kindDistribution.length > 0 ? (
        <section className="mt-6">
          <Card>
            <CardHeader title="By transaction kind" />
            <div className="flex flex-wrap gap-3">
              {kindDistribution.map((k) => (
                <div
                  key={k.label}
                  className="rounded-lg border border-surface-border bg-surface-cardHover/50 px-4 py-3"
                >
                  <p className="text-xs text-text-tertiary">{k.label}</p>
                  <p className="mt-1 text-xl font-semibold text-text-primary">{k.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      ) : null}
    </BusinessShell>
  );
}
