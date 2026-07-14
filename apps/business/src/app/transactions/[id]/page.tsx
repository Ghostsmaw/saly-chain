import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Hourglass,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { DexSwapPanel } from '@/components/DexSwapPanel';
import { FiatPayoutPanel } from '@/components/FiatPayoutPanel';
import { FxSwapPanel } from '@/components/FxSwapPanel';
import { PayrollBatchPanel, PayrollFailureBanner } from '@/components/PayrollBatchPanel';
import { TopupPanel } from '@/components/TopupPanel';
import { fetchOrganization, fetchPayrollBatchLines, fetchTransaction } from '@/lib/api';
import {
  baseExplorerUrl,
  formatMinor,
  toneForTxState,
} from '@/lib/format';
import type { TransactionDto } from '@salychain/sdk-internal';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tx = await fetchTransaction(id);
  if (!tx) notFound();

  const [orgResult, lines] = await Promise.all([
    fetchOrganization(),
    tx.kind === 'PAYROLL_BATCH' ? fetchPayrollBatchLines(id) : Promise.resolve([]),
  ]);

  return (
    <BusinessShell
      title="Transaction detail"
      subtitle={tx.id}
      orgName={orgResult.data?.name}
    >
      <Link
        href="/transactions"
        className="mb-4 inline-flex items-center gap-1 text-xs text-brand-300 hover:text-brand-200"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All transactions
      </Link>
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader title="Overview" right={<Chip tone={toneForTxState(tx.state)}>{tx.state}</Chip>} />
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <Field label="Kind" value={tx.kind.replace(/_/g, ' ')} />
              <Field label="Currency" value={tx.source.currency} />
              <Field label="Amount" value={formatMinor(tx.source.amount_minor, tx.source.currency)} />
              <Field label="Created" value={new Date(tx.created_at).toLocaleString()} />
              {tx.settled_at && <Field label="Settled" value={new Date(tx.settled_at).toLocaleString()} />}
              {tx.intent_id && <Field label="Intent" value={tx.intent_id} mono />}
              {tx.tx_hash && (
                <Field label="Tx hash" value={tx.tx_hash} mono link={baseExplorerUrl(tx.tx_hash)} />
              )}
              {tx.error && <Field label="Error" value={tx.error} tone="danger" />}
            </dl>
          </Card>
          <DexSwapPanel tx={tx} />
          <FxSwapPanel tx={tx} />
          <PayrollFailureBanner tx={tx} />
          <PayrollBatchPanel tx={tx} lines={lines} />
          <TopupPanel tx={tx} />
          <FiatPayoutPanel tx={tx} />
        </div>

        <Card>
          <CardHeader title="State machine" subtitle={`${tx.events.length} transitions`} />
          <ol className="flex flex-col gap-3">
            {tx.events.map((event) => (
              <li key={event.at + event.state} className="flex items-start gap-3">
                <div className="mt-0.5">{iconForState(event.state)}</div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{event.state}</p>
                  <p className="text-[11px] text-text-muted">{new Date(event.at).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </section>
    </BusinessShell>
  );
}

function Field({
  label,
  value,
  mono,
  tone,
  link,
}: {
  label: string;
  value: string;
  mono?: boolean;
  tone?: 'danger';
  link?: string;
}) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-text-tertiary">{label}</dt>
      <dd
        className={[
          mono ? 'font-mono text-xs' : 'text-sm',
          tone === 'danger' ? 'text-danger-300' : 'text-text-primary',
        ].join(' ')}
      >
        {link ? (
          <a href={link} target="_blank" rel="noreferrer" className="text-brand-200 hover:text-brand-100">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function iconForState(state: TransactionDto['state']) {
  switch (state) {
    case 'SETTLED':
      return <CheckCircle2 className="h-4 w-4 text-success-300" />;
    case 'FAILED':
    case 'REJECTED':
      return <XCircle className="h-4 w-4 text-danger-300" />;
    case 'REVERSING':
    case 'REVERSED':
      return <AlertTriangle className="h-4 w-4 text-warning-300" />;
    case 'AWAITING_CONFIRMATION':
    case 'EXECUTING':
    case 'AWAITING_APPROVAL':
      return <Hourglass className="h-4 w-4 text-info-300" />;
    default:
      return <Circle className="h-4 w-4 text-text-muted" />;
  }
}
