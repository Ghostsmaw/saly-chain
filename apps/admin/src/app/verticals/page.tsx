import { Layers3 } from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { VerticalFlash } from '@/components/saly/verticals/VerticalFlash';
import { VerticalHubGrid } from '@/components/saly/verticals/VerticalHubGrid';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalyBadge, SalyCard, SalySection, SalyStat } from '@/components/saly/ui';
import { seedVerticalsDemoAction } from '@/app/verticals/actions';
import { VERTICAL_DEMO_SERVICES, VERTICAL_MODULES } from '@/lib/saly-verticals';
import { VerticalSubmitButton } from '@/components/saly/verticals/VerticalForms';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function VerticalsHubPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;

  return (
    <AdminShell
      title="Vertical modules"
      subtitle="Milestone E industry modules — finance, government, healthcare, agents, agri, SCM, aviation, and education"
      topRight={
        <SalyBadge variant="accent">{`${VERTICAL_MODULES.length} modules`}</SalyBadge>
      }
    >
      <SalyFadeIn>
        <VerticalFlash ok={resolved?.ok} error={resolved?.error} />

        <SalyCard className="border-saly-border-strong bg-saly-bg-secondary">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <SalyStat label="Modules" value={VERTICAL_MODULES.length.toString()} mono={false} />
              <SalyStat label="Milestone" value="E3–E7" mono={false} />
              <SalyStat label="Surface" value="Industry ops" mono={false} />
            </div>
            <SalyBadge variant="neutral" dot>
              <Layers3 className="mr-1 inline h-3 w-3" />
              Milestone E
            </SalyBadge>
          </div>
        </SalyCard>

        <div className="mt-8">
          <SalySection
            title="Demo data"
            description="Seed sample records across all vertical services (idempotent per org)"
          >
            <SalyCard>
              <p className="text-sm text-saly-text-muted">
                Requires {VERTICAL_DEMO_SERVICES}. CLI alternative:{' '}
                <code className="rounded bg-saly-bg-secondary px-1.5 py-0.5 font-mono text-xs text-saly-text-secondary">
                  pnpm verticals:seed
                </code>
              </p>
              <form action={seedVerticalsDemoAction} className="mt-4">
                <VerticalSubmitButton label="Seed demo data" pendingLabel="Seeding…" />
              </form>
            </SalyCard>
          </SalySection>
        </div>

        <div className="mt-10">
          <SalySection title="Industry modules" description="Select a vertical to manage records and settlement flows">
            <VerticalHubGrid />
          </SalySection>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}
