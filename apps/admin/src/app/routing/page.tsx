import { Suspense } from 'react';
import { AdminShell } from '@/components/AdminShell';
import { RoutingExplorer } from '@/components/saly/routing/RoutingExplorer';
import { RoutingHero } from '@/components/saly/routing/RoutingHero';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalyBadge, SalySection, SalySkeleton } from '@/components/saly/ui';
import { fetchRouteDecisions } from '@/lib/api';
import { computeRoutingStats, parseRouteDecision } from '@/lib/saly-routing';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RoutingPage() {
  return (
    <AdminShell
      title="Routing"
      subtitle="Auditable rail selection — which corridor won, why, and what alternatives existed"
    >
      <RoutingPageContent />
    </AdminShell>
  );
}

function RoutingPageContent() {
  return (
    <SalyFadeIn>
      <Suspense fallback={<HeroSkeleton />}>
        <RoutingInsights />
      </Suspense>

      <div className="mt-10">
        <Suspense fallback={<TableSkeleton />}>
          <DecisionExplorer />
        </Suspense>
      </div>
    </SalyFadeIn>
  );
}

async function RoutingInsights() {
  const { data, source } = await fetchRouteDecisions(100);
  const parsed = data.map(parseRouteDecision);
  const stats = computeRoutingStats(parsed);
  const live = source === 'live';

  return (
    <RoutingHero
      live={live}
      total={stats.total}
      topRail={stats.topRail}
      avgScore={stats.avgScore}
      railsUsed={stats.railsUsed}
      distribution={stats.distribution}
    />
  );
}

async function DecisionExplorer() {
  const { data, source } = await fetchRouteDecisions(50);
  const parsed = data.map(parseRouteDecision);

  return (
    <SalySection
      title="Recent routing decisions"
      description="Full audit trail with candidate scoring and rationale"
      action={
        <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
          {source === 'live' ? `${parsed.length} loaded` : 'Offline'}
        </SalyBadge>
      }
    >
      <RoutingExplorer decisions={parsed} source={source} />
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
      {Array.from({ length: 6 }).map((_, i) => (
        <SalySkeleton key={i} className="h-11 w-full rounded-saly" />
      ))}
    </div>
  );
}
