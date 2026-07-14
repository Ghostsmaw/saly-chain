import { Suspense } from 'react';
import { AdminShell } from '@/components/AdminShell';
import { SalyFadeIn } from '@/components/saly/motion';
import {
  SalyBadge,
  SalyCard,
  SalySection,
  SalyStat,
} from '@/components/saly/ui';
import {
  fetchComplianceProviderStatus,
  fetchServiceIntegrations,
  type ServiceHealthRow,
} from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function serviceStatusVariant(status: ServiceHealthRow['status']): 'success' | 'warning' | 'danger' {
  switch (status) {
    case 'operational':
      return 'success';
    case 'degraded':
      return 'warning';
    default:
      return 'danger';
  }
}

export default async function IntegrationsPage() {
  const services = await fetchServiceIntegrations();
  const operational = services.filter((s) => s.status === 'operational').length;
  const categories = [...new Set(services.map((s) => s.category))];

  return (
    <AdminShell
      title="Integrations"
      subtitle="Live status of backend services and partner providers"
      topRight={
        <SalyBadge variant={operational === services.length ? 'success' : 'warning'} dot>
          {`${operational}/${services.length} operational`}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
          <div className="p-6">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <SalyBadge variant="neutral" dot>
                Polled per request
              </SalyBadge>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <SalyStat
                label="Services operational"
                value={`${operational}/${services.length}`}
                mono={false}
              />
              <SalyStat label="Categories monitored" value={categories.length.toString()} mono={false} />
              <SalyStat label="Health source" value="Live probes" hint="Backend dependencies" mono={false} />
            </div>
          </div>
        </SalyCard>

        <div className="mt-10">
          <Suspense fallback={null}>
            <ScreeningProviders />
          </Suspense>
        </div>

        {categories.map((cat) => {
          const items = services.filter((s) => s.category === cat);
          return (
            <div key={cat} className="mt-10">
              <SalySection title={cat} description={`${items.filter((s) => s.status === 'operational').length} of ${items.length} operational`}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((s) => (
                    <SalyCard key={s.key} hover>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-medium text-saly-text-primary">{s.name}</p>
                          <p className="mt-0.5 text-xs text-saly-text-muted">{s.detail}</p>
                        </div>
                        <SalyBadge variant={serviceStatusVariant(s.status)} dot>
                          {s.status}
                        </SalyBadge>
                      </div>
                      <code className="mt-3 inline-block rounded-saly bg-saly-bg-secondary px-2 py-1 font-mono text-[11px] text-saly-text-secondary">
                        {s.envKey}
                      </code>
                    </SalyCard>
                  ))}
                </div>
              </SalySection>
            </div>
          );
        })}
      </SalyFadeIn>
    </AdminShell>
  );
}

async function ScreeningProviders() {
  const { data, source } = await fetchComplianceProviderStatus();

  return (
    <SalySection
      title="Compliance screening providers"
      description="Live configuration from the compliance service"
      action={
        <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
          {source === 'live' ? `Active: ${data.active}` : 'Service offline'}
        </SalyBadge>
      }
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {data.vendors.map((v) => (
          <SalyCard key={v.name} className={v.enabled ? 'border-emerald-500/20 bg-emerald-500/[0.04]' : undefined}>
            <div className="flex items-center justify-between">
              <p className="font-medium capitalize text-saly-text-primary">{v.name}</p>
              <SalyBadge variant={v.enabled ? 'success' : 'neutral'} dot>
                {v.enabled ? 'On' : 'Off'}
              </SalyBadge>
            </div>
            <p className="mt-1 text-[11px] text-saly-text-muted">{v.role}</p>
          </SalyCard>
        ))}
      </div>
    </SalySection>
  );
}
