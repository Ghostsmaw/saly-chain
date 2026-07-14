import { Suspense } from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { SalyFadeIn } from '@/components/saly/motion';
import {
  SalyBadge,
  SalyCard,
  SalyEmptyState,
  SalySection,
  SalySkeleton,
  SalyStat,
} from '@/components/saly/ui';
import { fetchComplianceCases, fetchComplianceProviderStatus } from '@/lib/api';
import { compliancePriorityVariant, complianceStatusVariant } from '@/lib/saly-compliance';
import { formatDateTime, truncateId } from '@/lib/saly-format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CompliancePage() {
  return (
    <AdminShell
      title="Compliance"
      subtitle="Production sanctions vendors, KYC tiers, and the human review queue"
      topRight={
        <Suspense fallback={null}>
          <ComplianceLiveBadge />
        </Suspense>
      }
    >
      <SalyFadeIn>
        <Suspense fallback={<HeroSkeleton />}>
          <ProviderHero />
        </Suspense>

        <div className="mt-10">
          <Suspense fallback={<CasesSkeleton />}>
            <CasesSection />
          </Suspense>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

async function ComplianceLiveBadge() {
  const { source } = await fetchComplianceProviderStatus();
  return (
    <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
      {source === 'live' ? 'Connected' : 'Offline'}
    </SalyBadge>
  );
}

async function ProviderHero() {
  const { data, source } = await fetchComplianceProviderStatus();
  const live = source === 'live';
  const enabledCount = data.vendors.filter((v) => v.enabled).length;

  return (
    <>
      <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
        <div className="p-6">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <SalyBadge variant={live ? 'success' : 'warning'} dot>
              {live ? `Active: ${data.active}` : 'Service offline'}
            </SalyBadge>
            <SalyBadge variant={enabledCount > 1 ? 'success' : 'warning'}>
              {enabledCount}/{data.vendors.length} vendors on
            </SalyBadge>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <SalyStat label="Active provider" value={live ? data.active : '—'} mono={false} />
            <SalyStat
              label="Vendors configured"
              value={live ? `${enabledCount} / ${data.vendors.length}` : '—'}
              mono={false}
            />
            <SalyStat label="Feed status" value={live ? 'Connected' : 'Offline'} mono={false} />
          </div>
        </div>
      </SalyCard>

      <div className="mt-8">
        <SalySection
          title="Sanctions vendor stack"
          description="Chainalysis · ComplyAdvantage · Refinitiv World-Check"
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {data.vendors.map((v) => (
              <SalyCard
                key={v.name}
                className={v.enabled ? 'border-emerald-500/20 bg-emerald-500/[0.04]' : undefined}
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium capitalize text-saly-text-primary">{v.name}</p>
                  <SalyBadge variant={v.enabled ? 'success' : 'neutral'} dot>
                    {v.enabled ? 'On' : 'Off'}
                  </SalyBadge>
                </div>
                <p className="mt-2 text-xs text-saly-text-muted">{v.role}</p>
              </SalyCard>
            ))}
          </div>
        </SalySection>
      </div>
    </>
  );
}

async function CasesSection() {
  const { data, source } = await fetchComplianceCases(50);

  return (
    <SalySection
      title="Review queue"
      description="Human review for screened intents that exceed thresholds"
      action={
        source === 'live' && data.length > 0 ? (
          <SalyBadge variant="warning">{`${data.length} open`}</SalyBadge>
        ) : undefined
      }
    >
      <SalyCard padding={false} className="overflow-hidden">
        {source !== 'live' ? (
          <div className="p-6">
            <SalyEmptyState
              title="Compliance service unreachable"
              description="Boot services/compliance with COMPLIANCE_SANCTIONS_PROVIDER=composite."
            />
          </div>
        ) : data.length === 0 ? (
          <div className="p-6">
            <SalyEmptyState
              title="No open compliance cases"
              description="All screened intents have passed thresholds."
            />
          </div>
        ) : (
          <ul className="divide-y divide-saly-border">
            {data.map((c) => (
              <li key={c.id} className="px-4 py-3 transition hover:bg-saly-bg-hover">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-saly bg-amber-500/10 text-amber-400">
                      <ShieldAlert className="h-4 w-4" />
                    </div>
                    <div>
                      <Link
                        href={`/compliance/${c.id}`}
                        className="font-mono text-xs text-violet-300 hover:text-violet-200"
                      >
                        {truncateId(c.id)}
                      </Link>
                      <p className="text-sm text-saly-text-primary">{c.summary}</p>
                      <p className="text-[11px] text-saly-text-muted">
                        {c.subject?.external_ref ? `subject ${c.subject.external_ref}` : 'no subject'}
                        {c.subject?.country_code ? ` · ${c.subject.country_code}` : ''}
                        {c.subject?.tier ? ` · ${c.subject.tier}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <SalyBadge variant={compliancePriorityVariant(c.priority)}>{c.priority}</SalyBadge>
                    <SalyBadge variant={complianceStatusVariant(c.status)} dot>
                      {c.status}
                    </SalyBadge>
                    <p className="text-[11px] text-saly-text-faint">{formatDateTime(c.created_at)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SalyCard>
    </SalySection>
  );
}

function HeroSkeleton() {
  return <SalySkeleton className="h-36 w-full rounded-saly-lg" />;
}

function CasesSkeleton() {
  return (
    <SalySection title="Review queue">
      <SalySkeleton className="h-64 w-full rounded-saly-lg" />
    </SalySection>
  );
}
