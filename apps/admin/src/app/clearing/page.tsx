import { Suspense } from 'react';
import { AdminShell } from '@/components/AdminShell';
import { ClearingCoaCard, ClearingFlowPanel, ClearingSeedForm } from './ClearingPanel';
import { ClearingHero } from '@/components/saly/clearing/ClearingHero';
import { TopupsExplorer } from '@/components/saly/clearing/TopupsExplorer';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalyBadge, SalyCard, SalySection, SalySkeleton } from '@/components/saly/ui';
import { fetchTransactions } from '@/lib/api';
import { computeTopupStats } from '@/lib/saly-clearing';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminClearingPage() {
  const showTokenHint = !process.env.EXECUTION_ADMIN_TOKEN;

  return (
    <AdminShell
      title="Inbound clearing"
      subtitle="Prefund clearing pool and monitor TOPUP ledger credits"
    >
      <ClearingPageContent showTokenHint={showTokenHint} />
    </AdminShell>
  );
}

function ClearingPageContent({ showTokenHint }: { showTokenHint: boolean }) {
  return (
    <SalyFadeIn>
      <Suspense fallback={<HeroSkeleton />}>
        <ClearingInsights />
      </Suspense>

      {showTokenHint ? (
        <SalyCard className="mt-6 border-amber-500/20 bg-amber-500/[0.04]">
          <p className="text-sm text-amber-200/90">
            Set <code className="text-amber-100/90">EXECUTION_ADMIN_TOKEN</code> in admin env to enable the
            clearing seed API.
          </p>
        </SalyCard>
      ) : null}

      <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="flex flex-col gap-6 xl:col-span-5">
          <ClearingSeedForm />
          <ClearingFlowPanel />
          <ClearingCoaCard />
        </div>

        <div className="xl:col-span-7">
          <Suspense fallback={<TableSkeleton />}>
            <TopupsSection />
          </Suspense>
        </div>
      </div>
    </SalyFadeIn>
  );
}

async function ClearingInsights() {
  const { data: topups, source } = await fetchTransactions({ kind: 'TOPUP', limit: 50 });
  const stats = computeTopupStats(topups);
  const live = source === 'live';

  return (
    <ClearingHero
      live={live}
      total={stats.total}
      settled={stats.settled}
      pending={stats.pending}
      failed={stats.failed}
      volumeByCurrency={stats.volumeByCurrency}
      tokenConfigured={Boolean(process.env.EXECUTION_ADMIN_TOKEN)}
    />
  );
}

async function TopupsSection() {
  const { data: topups, source } = await fetchTransactions({ kind: 'TOPUP', limit: 50 });
  const stats = computeTopupStats(topups);

  return (
    <SalySection
      title="Recent TOPUP transactions"
      description="Ledger credits from inbound clearing — full audit trail"
      action={
        <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
          {source === 'live' ? `${stats.settled} settled` : 'Offline'}
        </SalyBadge>
      }
    >
      <TopupsExplorer topups={topups} source={source} />
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
