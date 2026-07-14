import { Building2, Landmark } from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import type { TransactionDto } from '@salychain/sdk-internal';
import { formatMinor } from '@/lib/format';

const PSP_LABELS: Record<string, string> = {
  PaystackFiatAdapter: 'Paystack',
  FlutterwaveFiatAdapter: 'Flutterwave',
  CompositeFiatAdapter: 'Paystack / Flutterwave',
  StubFiatAdapter: 'Stub (dev)',
};

export function FiatPayoutPanel({ tx }: { tx: TransactionDto }) {
  const fiat = findFiatDetail(tx.events);
  if (tx.kind !== 'FIAT_PAYOUT' && !fiat) return null;

  const pspLabel = fiat?.adapter ? (PSP_LABELS[fiat.adapter] ?? fiat.adapter) : 'PSP';
  const tone =
    tx.state === 'SETTLED'
      ? 'success'
      : tx.state === 'FAILED' || tx.state === 'REJECTED'
        ? 'danger'
        : 'warning';

  return (
    <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
      <CardHeader
        title="Fiat bank payout"
        subtitle={fiat?.rail ? `${fiat.rail} via ${pspLabel}` : 'Bank transfer rail'}
        right={<Chip tone={tone as 'success' | 'danger' | 'warning'}>FIAT</Chip>}
      />
      <dl className="grid grid-cols-1 gap-3 px-4 pb-4 text-sm md:grid-cols-2">
        {fiat?.status ? <Field label="PSP status" value={fiat.status} /> : null}
        {fiat?.psp_id ? <Field label="PSP reference" value={fiat.psp_id} mono /> : null}
        {fiat?.confirmed_via ? (
          <Field label="Confirmed via" value={fiat.confirmed_via === 'webhook' ? 'Webhook' : 'Poll'} />
        ) : null}
        {fiat?.bank_country && fiat?.bank_code ? (
          <Field label="Bank" value={`${fiat.bank_country} · ${fiat.bank_code}`} />
        ) : null}
        {fiat?.account_number ? <Field label="Account" value={fiat.account_number} mono /> : null}
        {fiat?.account_name ? <Field label="Account name" value={fiat.account_name} /> : null}
        <Field label="Amount" value={formatMinor(tx.source.amount_minor, tx.source.currency)} />
        {tx.broadcast_id ? <Field label="Broadcast ID" value={tx.broadcast_id} mono /> : null}
      </dl>
      {!fiat?.psp_id && tx.state !== 'SETTLED' ? (
        <p className="px-4 pb-4 text-xs text-text-muted">
          <Landmark className="mr-1 inline h-3.5 w-3.5" />
          PSP details appear once the transfer is submitted to Paystack or Flutterwave.
        </p>
      ) : null}
      {tx.state === 'AWAITING_CONFIRMATION' ? (
        <div className="mx-4 mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
          Waiting for PSP settlement confirmation (webhook or poll).
        </div>
      ) : null}
    </Card>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-text-muted">{label}</dt>
      <dd className={`mt-0.5 text-text-primary ${mono ? 'font-mono text-xs break-all' : ''}`}>{value}</dd>
    </div>
  );
}

function findFiatDetail(events: TransactionDto['events']) {
  for (const event of events) {
    const root = event.detail as { fiat?: Record<string, string> } | undefined;
    const fiat = root?.fiat;
    if (fiat && typeof fiat === 'object') return fiat;
  }
  return null;
}

export function FiatRailBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-200 ring-1 ring-emerald-500/30">
      <Building2 className="h-3 w-3" />
      FIAT · NIP
    </span>
  );
}
