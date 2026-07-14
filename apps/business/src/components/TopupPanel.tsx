import { Card, CardHeader, Chip } from '@salychain/ui';
import type { TransactionDto } from '@salychain/sdk-internal';
import { formatMinor, toneForTxState } from '@/lib/format';
import { ArrowDownToLine } from 'lucide-react';

export function TopupPanel({ tx }: { tx: TransactionDto }) {
  if (tx.kind !== 'TOPUP') return null;

  const topup = tx.topup;

  return (
    <Card>
      <CardHeader
        title="Inbound top-up"
        subtitle="Ledger credit from clearing pool"
        right={<Chip tone={toneForTxState(tx.state)}>{tx.state}</Chip>}
      />
      <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <Field label="Amount" value={formatMinor(tx.source.amount_minor, tx.source.currency)} />
        {topup?.external_reference ? (
          <Field label="External reference" value={topup.external_reference} mono />
        ) : null}
        {topup?.clearing_account_id ? (
          <Field label="Clearing account" value={topup.clearing_account_id} mono />
        ) : null}
        {topup?.destination_account_id ? (
          <Field label="Credited account" value={topup.destination_account_id} mono />
        ) : null}
        {topup?.ledger_transaction_id ? (
          <Field label="Ledger tx" value={topup.ledger_transaction_id} mono />
        ) : null}
      </dl>
      <p className="mt-4 flex items-center gap-2 text-xs text-text-muted">
        <ArrowDownToLine className="h-3.5 w-3.5" />
        Tier 2 — no real pay-in rail; ops prefunds clearing separately.
      </p>
    </Card>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-text-tertiary">{label}</dt>
      <dd className={['mt-0.5 text-text-primary', mono ? 'font-mono text-xs break-all' : ''].join(' ')}>
        {value}
      </dd>
    </div>
  );
}

export function TopupRailBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
      <ArrowDownToLine className="h-3 w-3" />
      Clearing credit
    </span>
  );
}
