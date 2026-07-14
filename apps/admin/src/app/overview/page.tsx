import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { SalyAreaChart } from '@/components/saly/charts/SalyAreaChart';
import { SalyDonutChart } from '@/components/saly/charts/SalyBarChart';
import { SalyFadeIn } from '@/components/saly/motion';
import {
  SalyBadge,
  SalyCard,
  SalyEmptyState,
  SalyMetricStrip,
  SalySection,
  SalySkeleton,
} from '@/components/saly/ui';
import {
  fetchAnalytics,
  fetchPlatformUsers,
  fetchRecentRiskEvents,
  fetchRiskSummary,
  fetchServiceIntegrations,
  fetchWalletStats,
} from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function OverviewPage() {
  return (
    <AdminShell title="Overview" subtitle="Cross-cutting platform health and money movement">
      <SalyFadeIn>
        <Suspense fallback={<StripSkeleton />}>
          <HeadlineStrip />
        </Suspense>

        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <Suspense fallback={<PanelSkeleton />}>
              <ThroughputCard />
            </Suspense>
          </div>
          <div className="xl:col-span-4">
            <Suspense fallback={<PanelSkeleton />}>
              <RailMixCard />
            </Suspense>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Suspense fallback={<PanelSkeleton />}>
            <ServiceHealth />
          </Suspense>
          <Suspense fallback={<PanelSkeleton />}>
            <PlatformActivity />
          </Suspense>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

async function HeadlineStrip() {
  const [analytics, biz, walletRes, riskRes] = await Promise.all([
    fetchAnalytics(500),
    fetchPlatformUsers({ role: 'BUSINESS', limit: 1 }),
    fetchWalletStats(),
    fetchRiskSummary(),
  ]);
  const wallets = walletRes.source === 'live' ? walletRes.data.total : null;
  const pending = walletRes.source === 'live' ? walletRes.data.pending_broadcasts : null;
  const developers = biz.data.by_role['DEVELOPER'] ?? 0;

  return (
    <SalyMetricStrip
      items={[
        {
          label: 'Transactions',
          value: analytics.source === 'live' ? analytics.data.totalTransactions.toLocaleString() : '—',
        },
        {
          label: 'Business accounts',
          value: biz.source === 'live' ? biz.data.total.toLocaleString() : '—',
        },
        {
          label: 'Developers',
          value: biz.source === 'live' ? developers.toLocaleString() : '—',
        },
        {
          label: 'Custodial wallets',
          value: wallets !== null ? wallets.toLocaleString() : '—',
          hint: pending !== null ? `${pending} pending broadcasts` : undefined,
        },
        {
          label: 'Review queue (24h)',
          value: riskRes.source === 'live' ? riskRes.data.pending_review_24h.toLocaleString() : '—',
        },
      ]}
    />
  );
}

async function ThroughputCard() {
  const { data, source } = await fetchAnalytics(500);
  return (
    <SalySection
      title="Network throughput"
      description="Daily transaction count across all rails"
      action={
        <Link href="/analytics" className="inline-flex items-center gap-1 text-xs text-saly-text-muted hover:text-saly-text-primary">
          Analytics <ArrowUpRight className="h-3 w-3" />
        </Link>
      }
    >
      <SalyCard padding={false} className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-saly-border px-5 py-4">
          <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
            {source === 'live' ? 'Live' : 'Offline'}
          </SalyBadge>
        </div>
        <div className="p-4">
          {source === 'live' && data.dailyVolume.length > 0 ? (
            <SalyAreaChart data={data.dailyVolume} height={260} />
          ) : (
            <SalyEmptyState
              title="No throughput data"
              description={source === 'live' ? 'No transactions recorded yet.' : 'Execution service offline.'}
            />
          )}
        </div>
      </SalyCard>
    </SalySection>
  );
}

async function RailMixCard() {
  const { data, source } = await fetchAnalytics(500);
  const entries = Object.entries(data.byKind).sort(([, a], [, b]) => b - a);
  const colors = ['#7C3AED', '#a1a1aa', '#71717a', '#52525b', '#3f3f46'];

  return (
    <SalySection title="Transaction mix" description="Share by payment kind">
      <SalyCard>
        {source === 'live' && entries.length > 0 ? (
          <>
            <div className="flex justify-center py-2">
              <SalyDonutChart
                data={entries.map(([kind, count], i) => ({
                  label: kind,
                  value: count,
                  color: colors[i % colors.length],
                }))}
                centerLabel="total"
                centerValue={data.totalTransactions.toLocaleString()}
                size={160}
              />
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {entries.slice(0, 5).map(([kind, count], i) => (
                <li key={kind} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-saly-text-secondary">
                    <span className="h-2 w-2 rounded-full" style={{ background: colors[i % colors.length] }} />
                    {kind.replace(/_/g, ' ').toLowerCase()}
                  </span>
                  <span className="font-mono text-xs text-saly-text-muted">{count.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <SalyEmptyState title="No mix data" />
        )}
      </SalyCard>
    </SalySection>
  );
}

async function ServiceHealth() {
  const services = await fetchServiceIntegrations();
  const operational = services.filter((s) => s.status === 'operational').length;

  return (
    <SalySection
      title="Service health"
      description="Core microservice liveness"
      action={<SalyBadge variant={operational === services.length ? 'success' : 'warning'}>{operational}/{services.length} up</SalyBadge>}
    >
      <SalyCard>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {services.map((node) => (
            <div
              key={node.key}
              className="rounded-saly border border-saly-border bg-saly-bg-secondary/50 p-3 transition hover:border-saly-border-strong"
            >
              <SalyBadge
                variant={node.status === 'operational' ? 'success' : node.status === 'degraded' ? 'warning' : 'danger'}
                dot
              >
                {node.status}
              </SalyBadge>
              <p className="mt-2 text-sm text-saly-text-primary">{node.name}</p>
              <p className="mt-0.5 text-[11px] text-saly-text-faint">{node.detail}</p>
            </div>
          ))}
        </div>
      </SalyCard>
    </SalySection>
  );
}

async function PlatformActivity() {
  const { data, source } = await fetchRecentRiskEvents(8);
  return (
    <SalySection
      title="Platform activity"
      description="Recent risk and compliance events"
      action={
        <Link href="/risk" className="text-xs text-saly-text-muted hover:text-saly-text-primary">
          View all
        </Link>
      }
    >
      <SalyCard>
        {source === 'live' && data.length > 0 ? (
          <ul className="space-y-3">
            {data.map((e) => (
              <li key={e.id} className="rounded-saly border border-saly-border px-3 py-3 hover:bg-saly-bg-hover">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-saly-text-primary">{e.title}</p>
                  <SalyBadge
                    variant={
                      e.severity === 'critical' || e.severity === 'high'
                        ? 'danger'
                        : e.severity === 'medium'
                          ? 'warning'
                          : 'neutral'
                    }
                  >
                    {e.severity}
                  </SalyBadge>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-saly-text-muted">{e.detail}</p>
              </li>
            ))}
          </ul>
        ) : (
          <SalyEmptyState title="No recent events" />
        )}
      </SalyCard>
    </SalySection>
  );
}

function StripSkeleton() {
  return <SalySkeleton className="h-24 w-full rounded-saly-lg" />;
}
function PanelSkeleton() {
  return <SalySkeleton className="h-72 w-full rounded-saly-lg" />;
}
