import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Chip } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { PayrollBatchPanel, PayrollFailureBanner } from '@/components/PayrollBatchPanel';
import { fetchOrganization, fetchPayrollBatchLines, fetchTransaction } from '@/lib/api';
import { formatMinor, toneForTxState } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PayrollBatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [tx, orgResult, lines] = await Promise.all([
    fetchTransaction(id),
    fetchOrganization(),
    fetchPayrollBatchLines(id),
  ]);

  if (!tx || tx.kind !== 'PAYROLL_BATCH') notFound();

  const batchName = tx.payroll?.name ?? 'Payroll batch';

  return (
    <BusinessShell
      title={batchName}
      subtitle={`Batch ${tx.id.slice(0, 8)}…`}
      orgName={orgResult.data?.name}
    >
      <Link
        href="/payroll"
        className="mb-4 inline-flex items-center gap-1 text-xs text-brand-300 hover:text-brand-200"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to payroll
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Chip tone={toneForTxState(tx.state)}>{tx.state}</Chip>
        <span className="text-sm text-text-secondary">
          {formatMinor(tx.source.amount_minor, tx.source.currency)} total
        </span>
        {tx.payroll?.pay_period ? (
          <span className="text-sm text-text-muted">Period {tx.payroll.pay_period}</span>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        <PayrollFailureBanner tx={tx} />
        <PayrollBatchPanel tx={tx} lines={lines} />
      </div>
    </BusinessShell>
  );
}
