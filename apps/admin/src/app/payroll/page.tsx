import { Suspense } from 'react';
import { AdminShell } from '@/components/AdminShell';
import { PayrollExplorer } from '@/components/saly/payroll/PayrollExplorer';
import { PayrollHero } from '@/components/saly/payroll/PayrollHero';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalyBadge, SalySection, SalySkeleton } from '@/components/saly/ui';
import { fetchTransactions } from '@/lib/api';
import { computePayrollStats } from '@/lib/saly-payroll';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminPayrollPage() {
  return (
    <AdminShell
      title="Payroll batches"
      subtitle="PAYROLL_BATCH orchestration — monitor stuck runs and line settlement"
    >
      <SalyFadeIn>
        <Suspense fallback={<HeroSkeleton />}>
          <PayrollInsights />
        </Suspense>

        <div className="mt-10">
          <Suspense fallback={<TableSkeleton />}>
            <PayrollSection />
          </Suspense>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

async function PayrollInsights() {
  const { data: batches, source } = await fetchTransactions({ kind: 'PAYROLL_BATCH', limit: 50 });
  const stats = computePayrollStats(batches);

  return (
    <PayrollHero
      live={source === 'live'}
      total={stats.total}
      inProgress={stats.inProgress}
      settled={stats.settled}
      failed={stats.failed}
      linesSettled={stats.settledLines}
      totalLines={stats.totalLines}
    />
  );
}

async function PayrollSection() {
  const { data: batches, source } = await fetchTransactions({ kind: 'PAYROLL_BATCH', limit: 50 });
  const stats = computePayrollStats(batches);

  return (
    <SalySection
      title="Payroll batches"
      description="Batches stay EXECUTING until all FIAT_PAYOUT lines confirm via PSP webhook"
      action={
        <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
          {source === 'live'
            ? stats.inProgress > 0
              ? `${stats.inProgress} in progress`
              : `${stats.total} loaded`
            : 'Offline'}
        </SalyBadge>
      }
    >
      <PayrollExplorer batches={batches} source={source} />
    </SalySection>
  );
}

function HeroSkeleton() {
  return <SalySkeleton className="h-36 w-full rounded-saly-lg" />;
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
