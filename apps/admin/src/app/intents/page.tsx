import { Suspense } from 'react';
import { AdminShell } from '@/components/AdminShell';
import { IntentsExplorer, IntentsHero } from '@/components/saly/intents/IntentsExplorer';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalyBadge, SalySection, SalySkeleton } from '@/components/saly/ui';
import { fetchRecentIntents } from '@/lib/api';
import { computeIntentStats } from '@/lib/saly-intents';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function IntentsPage() {
  return (
    <AdminShell
      title="Intents"
      subtitle="Canonical payloads, lifecycle state, and execution outcomes"
    >
      <SalyFadeIn>
        <Suspense fallback={<HeroSkeleton />}>
          <IntentInsights />
        </Suspense>

        <div className="mt-10">
          <Suspense fallback={<TableSkeleton />}>
            <IntentSection />
          </Suspense>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

async function IntentInsights() {
  const { data, source } = await fetchRecentIntents(50);
  const stats = computeIntentStats(data);

  return (
    <IntentsHero
      live={source === 'live'}
      total={stats.total}
      completed={stats.completed}
      inFlight={stats.inFlight}
      rejected={stats.rejected}
      distribution={stats.distribution}
    />
  );
}

async function IntentSection() {
  const { data, source } = await fetchRecentIntents(50);

  return (
    <SalySection
      title="Recent intents"
      description="Every intent received by the intent service"
      action={
        <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
          {source === 'live' ? `${data.length} loaded` : 'Offline'}
        </SalyBadge>
      }
    >
      <IntentsExplorer intents={data} source={source} />
    </SalySection>
  );
}

function HeroSkeleton() {
  return <SalySkeleton className="h-48 w-full rounded-saly-lg" />;
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      <SalySkeleton className="h-10 w-full max-w-md rounded-saly" />
      {Array.from({ length: 5 }).map((_, i) => (
        <SalySkeleton key={i} className="h-11 w-full rounded-saly" />
      ))}
    </div>
  );
}
