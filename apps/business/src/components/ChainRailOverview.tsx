'use client';

import { CheckCircle2, Clock, Layers } from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import { CHAIN_DEFINITIONS, type ChainDefinition } from '@salychain/types';

const STATUS_TONE: Record<
  ChainDefinition['status'],
  'success' | 'warning' | 'neutral' | 'info'
> = {
  live: 'success',
  schema_only: 'warning',
  internal: 'info',
};

const STATUS_LABEL: Record<ChainDefinition['status'], string> = {
  live: 'Live',
  schema_only: 'Schema only',
  internal: 'Internal',
};

export function ChainRailOverview({ walletCounts }: { walletCounts?: Record<string, number> }) {
  return (
    <Card className="overflow-hidden border-brand-500/20 bg-gradient-to-br from-brand-500/5 to-transparent">
      <CardHeader
        title="Multi-chain rails"
        subtitle="Operational rails — Base, XRPL, Saly L3; Ethereum/Polygon schema-only"
        right={
          <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
            <Layers className="h-3.5 w-3.5" /> {CHAIN_DEFINITIONS.length} chains
          </span>
        }
      />
      <div className="grid grid-cols-1 gap-3 px-4 pb-4 sm:grid-cols-2 xl:grid-cols-3">
        {CHAIN_DEFINITIONS.map((chain) => (
          <ChainRailCard
            key={chain.id}
            chain={chain}
            walletCount={walletCounts?.[chain.id] ?? 0}
          />
        ))}
      </div>
    </Card>
  );
}

function ChainRailCard({ chain, walletCount }: { chain: ChainDefinition; walletCount: number }) {
  const Icon = chain.status === 'live' ? CheckCircle2 : Clock;

  return (
    <div
      className={[
        'rounded-xl border p-4 transition',
        chain.status === 'live'
          ? 'border-brand-500/25 bg-surface-card/60 hover:border-brand-500/40'
          : chain.status === 'schema_only'
            ? 'border-surface-border bg-surface-card/30 opacity-90'
            : 'border-surface-border bg-surface-card/40',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-text-primary">{chain.label}</p>
          <p className="mt-0.5 text-xs text-text-muted">{chain.nativeAsset}</p>
        </div>
        <Chip tone={STATUS_TONE[chain.status]}>{STATUS_LABEL[chain.status]}</Chip>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-text-secondary">{chain.summary}</p>
      <div className="mt-3 flex items-center justify-between text-[11px] text-text-muted">
        <span className="inline-flex items-center gap-1">
          <Icon className="h-3 w-3" />
          {walletCount > 0 ? `${walletCount} wallet${walletCount === 1 ? '' : 's'}` : 'No wallets'}
        </span>
        <span className="font-mono">{chain.id}</span>
      </div>
    </div>
  );
}

export function ChainStatusChip({ chain }: { chain: string }) {
  const def = CHAIN_DEFINITIONS.find((c) => c.id === chain);
  if (!def) return <Chip tone="neutral">{chain}</Chip>;
  return <Chip tone={STATUS_TONE[def.status]}>{def.label}</Chip>;
}
