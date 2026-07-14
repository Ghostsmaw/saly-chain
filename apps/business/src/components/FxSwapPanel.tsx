import { TrendingUp, ArrowRightLeft } from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import type { TransactionDto } from '@salychain/sdk-internal';
import { formatMinor } from '@/lib/format';

export function FxSwapPanel({ tx }: { tx: TransactionDto }) {
  const swap = findSwapDetail(tx.events);
  if (tx.kind !== 'SWAP' && !swap) return null;
  if (swap?.dex) return null;

  const providerLabel = formatProvider(swap?.provider);
  const isStub = swap?.provider?.includes('stub') ?? false;

  return (
    <Card className="border-sky-500/20 bg-gradient-to-br from-sky-500/5 to-transparent">
      <CardHeader
        title="Treasury FX swap"
        subtitle="4-leg ledger journal via FX pool"
        right={
          <Chip tone={isStub ? 'warning' : 'success'}>
            {isStub ? 'Stub rate' : 'Live FX'}
          </Chip>
        }
      />
      <dl className="grid grid-cols-1 gap-3 px-4 pb-4 text-sm md:grid-cols-2">
        {swap?.from && swap?.to ? (
          <>
            <Field label="Debited" value={swap.from} />
            <Field label="Credited" value={swap.to} />
          </>
        ) : (
          <>
            <Field label="From" value={formatMinor(tx.source.amount_minor, tx.source.currency)} />
            <Field label="Currency pair" value={`${tx.source.currency} → destination`} />
          </>
        )}
        {swap?.provider ? <Field label="Rate feed" value={providerLabel} /> : null}
        {swap?.spread_bps != null ? <Field label="Spread" value={`${swap.spread_bps} bps`} /> : null}
        {swap?.quoted_rate_1e8 ? (
          <Field label="All-in rate" value={formatRate1e8(swap.quoted_rate_1e8)} mono />
        ) : null}
        {swap?.mid_rate_1e8 ? (
          <Field label="Mid-market" value={formatRate1e8(swap.mid_rate_1e8)} mono />
        ) : null}
        {swap?.quote_id ? <Field label="Quote" value={swap.quote_id} mono /> : null}
        {tx.ledger_entry_id ? <Field label="Journal" value={tx.ledger_entry_id} mono /> : null}
      </dl>
      {!swap ? (
        <p className="px-4 pb-4 text-xs text-text-muted">
          <ArrowRightLeft className="mr-1 inline h-3.5 w-3.5" />
          FX settlement details appear once the swap is quoted and posted.
        </p>
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

interface SwapDetail {
  from?: string;
  to?: string;
  provider?: string;
  spread_bps?: number;
  quoted_rate_1e8?: string;
  mid_rate_1e8?: string;
  quote_id?: string;
  dex?: unknown;
}

function findSwapDetail(events: TransactionDto['events']): SwapDetail | null {
  for (const event of events) {
    const root = event.detail as { swap?: SwapDetail; dex?: unknown } | undefined;
    if (root?.swap && typeof root.swap === 'object') return root.swap;
  }
  return null;
}

function formatProvider(provider?: string): string {
  if (!provider) return '—';
  if (provider.startsWith('composite:')) return provider.replace('composite:', '');
  return provider;
}

function formatRate1e8(rate: string): string {
  const n = Number(rate) / 1e8;
  if (n >= 100) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return n.toFixed(6);
}

export function FxProviderBadge({ provider }: { provider: string }) {
  const stub = provider.includes('stub');
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${
        stub
          ? 'bg-amber-500/15 text-amber-200 ring-amber-500/30'
          : 'bg-sky-500/15 text-sky-200 ring-sky-500/30'
      }`}
    >
      <TrendingUp className="h-3 w-3" />
      {stub ? 'Stub FX' : 'Live FX'}
    </span>
  );
}
