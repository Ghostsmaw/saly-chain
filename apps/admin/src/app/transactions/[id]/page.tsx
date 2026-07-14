import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Circle, XCircle, AlertTriangle, Hourglass } from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import { AdminShell } from '@/components/AdminShell';
import { fetchTransaction } from '@/lib/api';
import type { TransactionDto } from '@salychain/sdk-internal';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tx = await fetchTransaction(id);
  if (!tx) notFound();

  return (
    <AdminShell
      title="Transaction Detail"
      subtitle={tx.id}
    >
      <Link
        href="/transactions"
        className="mb-4 inline-flex items-center gap-1 text-xs text-brand-300 hover:text-brand-200"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All transactions
      </Link>
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader title="Overview" right={<Chip tone={toneForState(tx.state)}>{tx.state}</Chip>} />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <Field label="Kind" value={tx.kind} />
            <Field label="Currency" value={tx.source.currency} />
            <Field label="Amount" value={formatAmount(tx.source.amount_minor, tx.source.currency)} />
            <Field label="Created" value={new Date(tx.created_at).toLocaleString()} />
            {tx.settled_at && <Field label="Settled" value={new Date(tx.settled_at).toLocaleString()} />}
            {tx.intent_id && <Field label="Intent" value={tx.intent_id} mono />}
            {tx.ledger_entry_id && <Field label="Ledger entry" value={tx.ledger_entry_id} mono />}
            {tx.broadcast_id && <Field label="Broadcast job" value={tx.broadcast_id} mono />}
            {tx.tx_hash && <Field label="Tx hash" value={tx.tx_hash} mono link={baseExplorerUrl(tx.tx_hash)} />}
            {tx.error && <Field label="Error" value={tx.error} tone="danger" />}
          </dl>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            <EndpointBox title="Source">
              {tx.source.wallet_id && <Row label="Wallet" value={tx.source.wallet_id} mono />}
              {tx.source.account_id && <Row label="Account" value={tx.source.account_id} mono />}
            </EndpointBox>
            <EndpointBox title="Destination">
              {tx.destination.wallet_id && <Row label="Wallet" value={tx.destination.wallet_id} mono />}
              {tx.destination.account_id && <Row label="Account" value={tx.destination.account_id} mono />}
              {tx.destination.address && <Row label="Address" value={tx.destination.address} mono />}
              {tx.destination.chain && <Row label="Chain" value={tx.destination.chain} />}
            </EndpointBox>
          </div>
        </Card>

        <Card>
          <CardHeader title="State machine" subtitle={`${tx.events.length} transitions`} />
          <ol className="flex flex-col gap-3">
            {tx.events.map((event) => (
              <li key={event.at + event.state} className="flex items-start gap-3">
                <div className="mt-0.5">{iconForState(event.state)}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{event.state}</p>
                  <p className="text-[11px] text-text-muted">{new Date(event.at).toLocaleString()}</p>
                  {event.detail?.reason ? (
                    <p className="text-[11px] text-text-tertiary">{String(event.detail.reason)}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </section>
    </AdminShell>
  );
}

// ─────────────────────────── small primitives ───────────────────────────

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
  const valueClass = [
    mono ? 'font-mono text-xs' : 'text-sm',
    tone === 'danger' ? 'text-danger-300' : 'text-text-primary',
  ].join(' ');
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs uppercase tracking-wider text-text-tertiary">{label}</dt>
      <dd className={valueClass}>
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

function EndpointBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-surface-border bg-surface-cardHover/50 p-3">
      <p className="text-xs uppercase tracking-wider text-text-tertiary">{title}</p>
      <div className="mt-2 flex flex-col gap-1">{children}</div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-text-tertiary">{label}</span>
      <span className={mono ? 'font-mono text-text-primary' : 'text-text-primary'}>{value}</span>
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
      return <Hourglass className="h-4 w-4 text-info-300" />;
    default:
      return <Circle className="h-4 w-4 text-text-muted" />;
  }
}

function formatAmount(minor: string, currency: string): string {
  const decimals = currency === 'USDC' || currency === 'USD' ? 2 : currency === 'NGN' ? 2 : 6;
  const value = Number(BigInt(minor)) / 10 ** decimals;
  return `${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

function toneForState(state: TransactionDto['state']): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  switch (state) {
    case 'SETTLED': return 'success';
    case 'FAILED':
    case 'REJECTED': return 'danger';
    case 'REVERSING':
    case 'REVERSED': return 'warning';
    case 'AWAITING_CONFIRMATION':
    case 'EXECUTING': return 'info';
    default: return 'neutral';
  }
}

function baseExplorerUrl(hash: string): string {
  // Default to Sepolia; flip via env if you point the admin at mainnet.
  const network = process.env.NEXT_PUBLIC_BASE_NETWORK ?? 'base-sepolia';
  const root = network === 'base-mainnet' ? 'https://basescan.org' : 'https://sepolia.basescan.org';
  return `${root}/tx/${hash}`;
}
