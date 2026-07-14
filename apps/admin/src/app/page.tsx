import Link from 'next/link';
import { Suspense } from 'react';
import {
  Activity,
  ArrowUpRight,
  Blocks,
  Cpu,
  Fuel,
  Globe,
  Layers,
  Radio,
  Shield,
  Zap,
} from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { RecentTransactions } from '@/components/RecentTransactions';
import { SalyAreaChart } from '@/components/saly/charts/SalyAreaChart';
import { SalyFadeIn, SalyStagger, SalyStaggerItem } from '@/components/saly/motion';
import {
  SalyBadge,
  SalyCard,
  SalyDivider,
  SalyEmptyState,
  SalySection,
  SalySkeleton,
  SalyStat,
} from '@/components/saly/ui';
import {
  fetchAnalytics,
  fetchDashboardKpis,
  fetchRecentRiskEvents,
} from '@/lib/api';
import { fetchL3Dashboard } from '@/lib/l3';
import { isBridgeConfigured, isMonitorHealthy } from '@/lib/saly-l3';
import { fetchServiceHealth } from '@/lib/monitoring';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function DashboardPage() {
  const now = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

  return (
    <AdminShell title="Network Operations" subtitle={`Live infrastructure · ${now}`}>
      <SalyFadeIn>
        <Suspense fallback={<HeroSkeleton />}>
          <NetworkHealthHero />
        </Suspense>

        <div className="mt-8">
          <Suspense fallback={<MetricsSkeleton />}>
            <InfrastructureMetrics />
          </Suspense>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <Suspense fallback={<ChartSkeleton />}>
              <ThroughputPanel />
            </Suspense>
          </div>
          <div className="xl:col-span-4">
            <Suspense fallback={<ActivitySkeleton />}>
              <LatestSignals />
            </Suspense>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Suspense fallback={<PanelSkeleton />}>
            <RecentTransactions limit={6} />
          </Suspense>
          <Suspense fallback={<PanelSkeleton />}>
            <DeveloperActivity />
          </Suspense>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

async function NetworkHealthHero() {
  const services = await fetchServiceHealth();
  const healthy = services.filter((s) => s.status === 'healthy').length;
  const total = services.length;
  const pct = total > 0 ? Math.round((healthy / total) * 100) : 0;
  const degraded = services.filter((s) => s.status !== 'healthy');

  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <SalyBadge variant={pct >= 95 ? 'success' : pct >= 80 ? 'warning' : 'danger'} dot>
            Network {pct >= 95 ? 'Operational' : pct >= 80 ? 'Degraded' : 'Critical'}
          </SalyBadge>
          <div>
            <p className="text-3xl font-semibold tracking-tight text-saly-text-primary">{pct}%</p>
            <p className="mt-1 text-sm text-saly-text-muted">
              {healthy} of {total} services healthy
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {degraded.slice(0, 4).map((s) => (
            <SalyBadge key={s.name} variant={s.status === 'offline' ? 'danger' : 'warning'}>
              {s.name}
            </SalyBadge>
          ))}
          {degraded.length === 0 ? (
            <SalyBadge variant="success">No incidents</SalyBadge>
          ) : degraded.length > 4 ? (
            <Link href="/monitoring" className="text-xs text-saly-text-muted hover:text-saly-text-primary">
              +{degraded.length - 4} more
            </Link>
          ) : null}
        </div>
      </div>
      <SalyDivider />
      <div className="grid grid-cols-2 gap-px bg-saly-border sm:grid-cols-4">
        {services.slice(0, 8).map((svc) => (
          <div key={svc.name} className="bg-saly-bg-secondary px-4 py-3">
            <p className="truncate text-xs text-saly-text-muted">{svc.name}</p>
            <div className="mt-1 flex items-center gap-2">
              <SalyBadge
                variant={svc.status === 'healthy' ? 'success' : svc.status === 'degraded' ? 'warning' : 'danger'}
                dot
              >
                {svc.status}
              </SalyBadge>
              {svc.latencyMs ? (
                <span className="font-mono text-[11px] text-saly-text-faint">{svc.latencyMs}ms</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </SalyCard>
  );
}

async function InfrastructureMetrics() {
  const [kpis, analytics, l3] = await Promise.all([
    fetchDashboardKpis(),
    fetchAnalytics(500),
    fetchL3Dashboard().catch(() => null),
  ]);

  const tps =
    analytics.data.dailyVolume.length > 0
      ? Math.round(
          analytics.data.dailyVolume.slice(-1)[0]!.value / 86400,
        )
      : 0;

  const metrics = [
    {
      icon: Globe,
      label: 'Chain status',
      value: l3?.source === 'live' ? l3.network.label : 'Base + L3',
      hint: l3 && isMonitorHealthy(l3.exitCriteria) ? 'Monitor online' : l3?.monitor.configured ? 'Configured' : 'Configure L3 monitor',
    },
    {
      icon: Zap,
      label: 'Throughput',
      value: analytics.source === 'live' ? `~${Math.max(tps, 0)}/s` : '—',
      hint: `${analytics.data.totalTransactions.toLocaleString()} tx recent`,
    },
    {
      icon: Blocks,
      label: 'Settlement',
      value: l3?.monitor.latestProposal?.l2BlockNumber?.toString() ?? l3?.monitor.latestL2BlockNumber?.toString() ?? '—',
      hint: 'Latest output proposal',
    },
    {
      icon: Fuel,
      label: 'FX pairs',
      value: kpis.fx.pairsLive > 0 ? kpis.fx.pairsLive.toString() : '—',
      hint: kpis.fx.provider,
    },
    {
      icon: Shield,
      label: 'Signing / KMS',
      value: kpis.signer.ok ? 'Secure' : 'Offline',
      hint: kpis.signer.kms_provider,
    },
    {
      icon: Layers,
      label: 'Bridge',
      value: l3 && isBridgeConfigured(l3.exitCriteria) ? 'Active' : 'Pending',
      hint: 'Cross-chain settlement',
    },
  ];

  return (
    <SalyStagger className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <SalyStaggerItem key={m.label}>
            <SalyCard hover className="p-4">
              <Icon className="mb-3 h-4 w-4 text-saly-text-faint" />
              <SalyStat label={m.label} value={m.value} hint={m.hint} />
            </SalyCard>
          </SalyStaggerItem>
        );
      })}
    </SalyStagger>
  );
}

async function ThroughputPanel() {
  const { data, source } = await fetchAnalytics(500);
  const total = data.dailyVolume.reduce((s, p) => s + p.value, 0);

  return (
    <SalySection
      title="Transaction volume"
      description="Execution throughput across all payment rails"
      action={
        <Link href="/analytics" className="inline-flex items-center gap-1 text-xs text-saly-text-muted hover:text-saly-text-primary">
          Full analytics <ArrowUpRight className="h-3 w-3" />
        </Link>
      }
    >
      <SalyCard padding={false} className="overflow-hidden">
        <div className="flex items-end justify-between border-b border-saly-border px-5 py-4">
          <div>
            <p className="font-mono text-2xl font-medium tracking-tight text-saly-text-primary">
              {source === 'live' ? total.toLocaleString() : '—'}
            </p>
            <p className="text-xs text-saly-text-muted">Transactions in range</p>
          </div>
          <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
            {source === 'live' ? 'Live' : 'Offline'}
          </SalyBadge>
        </div>
        <div className="p-4">
          {source === 'live' && data.dailyVolume.length > 0 ? (
            <SalyAreaChart data={data.dailyVolume} height={260} />
          ) : (
            <SalyEmptyState title="No throughput data" description="Start the execution service to populate charts." />
          )}
        </div>
      </SalyCard>
    </SalySection>
  );
}

async function LatestSignals() {
  const { data: events, source } = await fetchRecentRiskEvents(6);

  return (
    <SalySection
      title="Latest signals"
      description="Risk, compliance, and operational events"
      action={
        <Link href="/risk" className="text-xs text-saly-text-muted hover:text-saly-text-primary">
          View all
        </Link>
      }
    >
      <SalyCard className="min-h-[360px]">
        {source === 'unavailable' || events.length === 0 ? (
          <SalyEmptyState title="No active signals" description="Risk and compliance feeds are clear." />
        ) : (
          <ul className="space-y-3">
            {events.map((e) => (
              <li key={e.id} className="rounded-saly border border-saly-border px-3 py-3 transition-colors hover:bg-saly-bg-hover">
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
                <p className="mt-2 font-mono text-[11px] text-saly-text-faint">{relTime(e.when)}</p>
              </li>
            ))}
          </ul>
        )}
      </SalyCard>
    </SalySection>
  );
}

async function DeveloperActivity() {
  const kpis = await fetchDashboardKpis();

  return (
    <SalySection title="Platform activity" description="Custody, compliance, and liquidity posture">
      <SalyCard>
        <div className="grid gap-6 sm:grid-cols-2">
          <SalyStat
            label="Custodial wallets"
            value={kpis.wallets.total > 0 ? kpis.wallets.total.toLocaleString() : '—'}
            hint={`${kpis.wallets.pending_broadcasts} pending broadcasts`}
          />
          <SalyStat
            label="Compliance queue"
            value={kpis.compliance.open.toLocaleString()}
            hint={`${kpis.compliance.critical} critical`}
          />
          <SalyStat label="Risk (24h)" value={kpis.risk.last_24h.total.toLocaleString()} hint="Decisions" />
          <SalyStat
            label="Contracts"
            value={
              <Link href="/contracts" className="inline-flex items-center gap-1 hover:text-violet-300">
                Manage <ArrowUpRight className="h-3 w-3" />
              </Link>
            }
            hint="Registry & emergency controls"
            mono={false}
          />
        </div>
      </SalyCard>
    </SalySection>
  );
}

function relTime(iso: string): string {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  return `${Math.floor(sec / 86400)}d ago`;
}

function HeroSkeleton() {
  return <SalySkeleton className="h-40 w-full rounded-saly-lg" />;
}
function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SalySkeleton key={i} className="h-28 rounded-saly-lg" />
      ))}
    </div>
  );
}
function ChartSkeleton() {
  return <SalySkeleton className="h-[360px] w-full rounded-saly-lg" />;
}
function ActivitySkeleton() {
  return <SalySkeleton className="h-[360px] w-full rounded-saly-lg" />;
}
function PanelSkeleton() {
  return <SalySkeleton className="h-64 w-full rounded-saly-lg" />;
}
