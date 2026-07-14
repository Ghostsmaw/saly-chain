import { Suspense } from 'react';
import { Activity, Cpu, Database, HardDrive, Server } from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { SalyFadeIn, SalyStagger, SalyStaggerItem } from '@/components/saly/motion';
import {
  SalyBadge,
  SalyCard,
  SalyCodeBlock,
  SalyMetricStrip,
  SalySection,
  SalySkeleton,
  SalyStat,
} from '@/components/saly/ui';
import { PRISMA_SERVICES, fetchServiceHealth } from '@/lib/monitoring';
import {
  fetchBroadcastJobs,
  fetchComplianceCases,
  fetchRiskSummary,
  fetchWalletStats,
} from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function MonitoringPage() {
  return (
    <AdminShell title="Nodes" subtitle="Infrastructure health, latency, and service fleet status">
      <SalyFadeIn>
        <Suspense fallback={<StripSkeleton />}>
          <FleetHero />
        </Suspense>

        <div className="mt-8">
          <Suspense fallback={<StripSkeleton />}>
            <OpsPulse />
          </Suspense>
        </div>

        <div className="mt-10">
          <Suspense fallback={<GridSkeleton />}>
            <HealthGrid />
          </Suspense>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SalySection title="Apply migrations" description="Production / CI — non-interactive">
            <SalyCard>
              <SalyCodeBlock>{`pnpm db:generate\npnpm db:migrate`}</SalyCodeBlock>
              <p className="mt-3 text-xs text-saly-text-muted">
                Runs prisma migrate deploy on every service. Requires per-service DATABASE_URL.
              </p>
            </SalyCard>
          </SalySection>
          <SalySection title="Create migration" description="Dev only — after schema changes">
            <SalyCard>
              <SalyCodeBlock>{`pnpm --filter @salychain/service-compliance prisma:migrate`}</SalyCodeBlock>
              <p className="mt-3 text-xs text-saly-text-muted">
                Interactive migrate dev — commit SQL under prisma/migrations/.
              </p>
            </SalyCard>
          </SalySection>
        </div>

        <div className="mt-10">
          <SalySection title="Database inventory" description="19 migrations across 16 Prisma services">
            <SalyCard padding={false} className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-saly-border bg-saly-bg-secondary/80 text-xs text-saly-text-muted">
                      <th className="px-4 py-2.5 font-medium">Service</th>
                      <th className="px-4 py-2.5 font-medium">Package</th>
                      <th className="px-4 py-2.5 font-medium">Migrations</th>
                      <th className="px-4 py-2.5 font-medium">Port</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRISMA_SERVICES.map((svc) => (
                      <tr key={svc.filter} className="border-b border-saly-border/60 hover:bg-saly-bg-hover">
                        <td className="px-4 py-3 font-medium text-saly-text-primary">{svc.name}</td>
                        <td className="px-4 py-3 font-mono text-xs text-saly-text-muted">@{svc.filter}</td>
                        <td className="px-4 py-3">
                          <SalyBadge variant="neutral">{svc.migrations}</SalyBadge>
                        </td>
                        <td className="px-4 py-3 text-saly-text-muted">{svc.port ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SalyCard>
          </SalySection>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

async function FleetHero() {
  const health = await fetchServiceHealth();
  const healthy = health.filter((h) => h.status === 'healthy').length;
  const pct = health.length > 0 ? Math.round((healthy / health.length) * 100) : 0;

  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <SalyBadge variant={pct >= 95 ? 'success' : pct >= 80 ? 'warning' : 'danger'} dot>
            Fleet {pct >= 95 ? 'healthy' : pct >= 80 ? 'degraded' : 'critical'}
          </SalyBadge>
          <div>
            <p className="text-3xl font-semibold tracking-tight text-saly-text-primary">
              {healthy}/{health.length}
            </p>
            <p className="mt-1 text-sm text-saly-text-muted">Services passing health checks</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <SalyBadge variant="neutral">{PRISMA_SERVICES.length} Prisma services</SalyBadge>
          <SalyBadge variant="neutral">19 migrations</SalyBadge>
        </div>
      </div>
    </SalyCard>
  );
}

async function OpsPulse() {
  const [risk, wallets, compliance, broadcasts] = await Promise.all([
    fetchRiskSummary(),
    fetchWalletStats(),
    fetchComplianceCases(100),
    fetchBroadcastJobs(100),
  ]);

  const openCases = compliance.data.filter((c) => c.status === 'OPEN' || c.status === 'IN_REVIEW').length;
  const pendingBroadcasts = broadcasts.data.filter((j) => j.status === 'PENDING' || j.status === 'SUBMITTED').length;
  const failedBroadcasts = broadcasts.data.filter((j) => j.status === 'FAILED').length;

  return (
    <SalyMetricStrip
      items={[
        {
          label: 'Risk reviews (24h)',
          value: risk.source === 'live' ? String(risk.data.last_24h.REVIEW) : '—',
          hint: `Block ≥ ${risk.data.thresholds.block}`,
        },
        {
          label: 'Pending broadcasts',
          value: wallets.source === 'live' ? String(wallets.data.pending_broadcasts) : '—',
          hint: `${wallets.data.total} wallets`,
        },
        {
          label: 'Compliance queue',
          value: compliance.source === 'live' ? String(openCases) : '—',
          hint: 'Open + in review',
        },
        {
          label: 'Failed broadcasts',
          value: broadcasts.source === 'live' ? String(failedBroadcasts) : '—',
          hint: pendingBroadcasts > 0 ? `${pendingBroadcasts} in flight` : 'Idle',
        },
      ]}
    />
  );
}

async function HealthGrid() {
  const health = await fetchServiceHealth();

  return (
    <SalySection title="Service health" description="Live probes against /v1/health">
      <SalyStagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {health.map((h) => (
          <SalyStaggerItem key={h.name}>
            <SalyCard hover className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <ServiceIcon name={h.name} />
                  <div>
                    <p className="text-sm font-medium text-saly-text-primary">{h.name}</p>
                    {h.latencyMs != null ? (
                      <p className="mt-1 font-mono text-[11px] text-saly-text-faint">{h.latencyMs}ms latency</p>
                    ) : (
                      <p className="mt-1 text-[11px] text-saly-text-faint">No latency sample</p>
                    )}
                  </div>
                </div>
                <SalyBadge
                  variant={h.status === 'healthy' ? 'success' : h.status === 'degraded' ? 'warning' : 'danger'}
                  dot
                >
                  {h.status}
                </SalyBadge>
              </div>
            </SalyCard>
          </SalyStaggerItem>
        ))}
      </SalyStagger>
    </SalySection>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  const Icon =
    lower.includes('wallet') || lower.includes('signer')
      ? HardDrive
      : lower.includes('execution') || lower.includes('routing')
        ? Cpu
        : lower.includes('risk') || lower.includes('compliance')
          ? Activity
          : lower.includes('ledger')
            ? Database
            : Server;
  return <Icon className="h-4 w-4 text-saly-text-faint" />;
}

function StripSkeleton() {
  return <SalySkeleton className="h-28 w-full rounded-saly-lg" />;
}
function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <SalySkeleton key={i} className="h-24 rounded-saly-lg" />
      ))}
    </div>
  );
}
