import { Globe2 } from 'lucide-react';
import { Chip } from '@salychain/ui';

const NETWORK_LABELS: Record<string, { label: string; tone: 'brand' | 'warning' | 'success' }> = {
  'base-mainnet': { label: 'Base Mainnet', tone: 'success' },
  'base-sepolia': { label: 'Base Sepolia', tone: 'warning' },
};

export function DexNetworkBadge({ network }: { network?: string }) {
  const key = network ?? process.env.NEXT_PUBLIC_BASE_NETWORK ?? 'base-sepolia';
  const meta = NETWORK_LABELS[key] ?? { label: key, tone: 'brand' as const };

  return (
    <span className="inline-flex items-center gap-1.5">
      <Globe2 className="h-3.5 w-3.5 text-text-muted" aria-hidden />
      <Chip tone={meta.tone}>{meta.label}</Chip>
    </span>
  );
}

export function dexPairSet(pairs: Array<{ from: string; to: string }>): Set<string> {
  return new Set(pairs.map((p) => `${p.from}:${p.to}`));
}

export function dexTokenSymbols(tokens: Array<{ symbol: string }>): string[] {
  return tokens.map((t) => t.symbol);
}
