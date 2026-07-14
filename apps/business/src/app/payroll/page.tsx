import Link from 'next/link';
import { Banknote, CheckCircle2, Clock, Users } from 'lucide-react';
import { Card, CardHeader, StatCard } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { PayrollRunForm } from '@/components/PayrollRunForm';
import { fetchOrganization, fetchTransactions } from '@/lib/api';
import { businessNgnTreasuryAccountRef } from '@/lib/constants';
import { formatMinor } from '@/lib/format';
import { runPayroll } from './actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PayrollPage() {
  const [orgResult, { data: transactions }] = await Promise.all([
    fetchOrganization(),
    fetchTransactions(50),
  ]);

  const payrollRuns = transactions.filter((t) => t.kind === 'PAYROLL_BATCH');
  const settled = payrollRuns.filter((t) => t.state === 'SETTLED').length;
  const pending = payrollRuns.filter(
    (t) => t.state === 'EXECUTING' || t.state === 'AWAITING_CONFIRMATION',
  ).length;

  return (
    <BusinessShell
      title="Payroll"
      subtitle="Batch employee payouts with per-line routing and settlement tracking"
      orgName={orgResult.data?.name}
    >
      <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          label="Payroll runs"
          value={payrollRuns.length}
          icon={<Banknote className="h-4 w-4" />}
          iconTone="brand"
        />
        <StatCard
          label="Settled batches"
          value={settled}
          icon={<CheckCircle2 className="h-4 w-4" />}
          iconTone="success"
        />
        <StatCard
          label="In progress"
          value={pending}
          icon={<Clock className="h-4 w-4" />}
          iconTone="warning"
        />
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
        <PayrollRunForm
          currency="NGN"
          treasuryLabel={businessNgnTreasuryAccountRef()}
          action={runPayroll}
        />

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader title="How it works" />
            <ol className="space-y-3 text-sm text-text-secondary">
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-xs font-semibold text-brand-200">
                  1
                </span>
                Submit a PAYROLL intent with employee line items and validated totals.
              </li>
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-xs font-semibold text-brand-200">
                  2
                </span>
                Compliance and risk screen the batch once at aggregate level.
              </li>
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-xs font-semibold text-brand-200">
                  3
                </span>
                Each employee line fans out as an independent payout with inherited screening.
              </li>
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-xs font-semibold text-brand-200">
                  4
                </span>
                Track the parent PAYROLL_BATCH transaction until all lines settle.
              </li>
            </ol>
          </Card>

          <Card>
            <CardHeader
              title="Recent payroll runs"
              subtitle={`${payrollRuns.length} batch${payrollRuns.length === 1 ? '' : 'es'}`}
            />
            {payrollRuns.length === 0 ? (
              <p className="py-8 text-center text-sm text-text-tertiary">
                No payroll batches yet. Run your first batch using the form.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {payrollRuns.slice(0, 6).map((run) => (
                  <li key={run.id}>
                    <Link
                      href={`/payroll/${run.id}`}
                      className="flex items-center justify-between rounded-lg border border-surface-border bg-surface-cardHover/40 px-3 py-2.5 transition hover:border-brand-500/30 hover:bg-surface-cardHover/70"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-text-tertiary" />
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {run.payroll?.name ??
                              formatMinor(run.source.amount_minor, run.source.currency)}
                          </p>
                          <p className="font-mono text-[11px] text-text-muted">
                            {run.payroll?.lines_settled ?? 0}/
                            {run.payroll?.total_lines ?? '?'} settled ·{' '}
                            {new Date(run.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={[
                          'rounded-full px-2 py-0.5 text-[11px] font-medium',
                          run.state === 'SETTLED'
                            ? 'bg-success-500/15 text-success-300'
                            : run.state === 'FAILED'
                              ? 'bg-danger-500/15 text-danger-300'
                              : 'bg-warning-500/15 text-warning-300',
                        ].join(' ')}
                      >
                        {run.state}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </BusinessShell>
  );
}
