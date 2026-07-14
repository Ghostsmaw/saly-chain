import { ExternalLink, Zap } from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import type { TransactionDto } from '@salychain/sdk-internal';
import { DexNetworkBadge } from '@/components/DexNetworkBadge';
import { baseExplorerUrl, formatMinor, truncateMiddle } from '@/lib/format';

export function DexSwapPanel({ tx }: { tx: TransactionDto }) {
  const dex = findDexDetail(tx.events);
  if (tx.kind !== 'DEX_SWAP' && !dex) return null;

  return (
    <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent">
      <CardHeader
        title="On-chain DEX"
        subtitle="Uniswap V3 swap on Base"
        right={
          <span className="flex items-center gap-2">
            <DexNetworkBadge />
            <Chip tone="brand">DEX</Chip>
          </span>
        }
      />
      <dl className="grid grid-cols-1 gap-3 px-4 pb-4 text-sm md:grid-cols-2">
        {dex?.token_in && dex?.token_out ? (
          <Field label="Pair" value={`${dex.token_in} → ${dex.token_out}`} />
        ) : null}
        {dex?.expected_out && dex?.token_out ? (
          <Field
            label="Expected output"
            value={formatMinor(dex.expected_out, dex.token_out)}
            mono
          />
        ) : null}
        {dex?.min_amount_out && dex?.token_out ? (
          <Field label="Min output" value={formatMinor(dex.min_amount_out, dex.token_out)} mono />
        ) : null}
        {dex?.router ? (
          <Field label="Router" value={truncateMiddle(dex.router, 8, 6)} mono />
        ) : null}
        {dex?.quote_id ? <Field label="Quote" value={dex.quote_id} mono /> : null}
        {dex?.quote_source ? (
          <Field
            label="Quote source"
            value={dex.quote_source === 'onchain' ? 'QuoterV2 (on-chain)' : 'Stub (dev)'}
          />
        ) : null}
        {tx.tx_hash ? (
          <div className="md:col-span-2">
            <dt className="text-xs uppercase tracking-wider text-text-muted">Transaction</dt>
            <dd className="mt-1">
              <a
                href={baseExplorerUrl(tx.tx_hash)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-brand-200 hover:text-brand-100"
              >
                {truncateMiddle(tx.tx_hash, 10, 8)}
                <ExternalLink className="h-3 w-3" />
              </a>
            </dd>
          </div>
        ) : null}
      </dl>
      {!dex ? (
        <p className="px-4 pb-4 text-xs text-text-muted">
          <Zap className="mr-1 inline h-3.5 w-3.5" />
          DEX execution details will appear once the swap is quoted and broadcast.
        </p>
      ) : null}
    </Card>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-text-muted">{label}</dt>
      <dd className={`mt-0.5 text-text-primary ${mono ? 'font-mono text-xs' : ''}`}>{value}</dd>
    </div>
  );
}

function findDexDetail(events: TransactionDto['events']) {
  for (const event of events) {
    const root = event.detail as { dex?: Record<string, string> } | undefined;
    const dex = root?.dex;
    if (dex && typeof dex === 'object') return dex;
  }
  return null;
}
