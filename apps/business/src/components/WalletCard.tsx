import { ArrowUpRight, Shield } from 'lucide-react';
import { Card, Chip } from '@salychain/ui';
import type { WalletWithBalance } from '@/lib/api';
import { chainAsset, chainLabel, formatMinor, truncateMiddle } from '@/lib/format';
import { ChainStatusChip } from '@/components/ChainRailOverview';

const CHAIN_GRADIENT: Record<string, string> = {
  BASE: 'from-[#0052FF]/20 to-brand-500/10',
  SALY_L3: 'from-violet-500/20 to-brand-500/10',
  XRPL: 'from-accent-500/20 to-brand-500/5',
  INTERNAL: 'from-success-500/15 to-brand-500/5',
  ETHEREUM: 'from-info-500/15 to-brand-500/5',
  POLYGON: 'from-purple-500/15 to-brand-500/5',
};

export function WalletCard({ wallet }: { wallet: WalletWithBalance }) {
  const gradient = CHAIN_GRADIENT[wallet.chain] ?? 'from-brand-500/15 to-brand-500/5';

  return (
    <Card className="group relative overflow-hidden transition-all hover:border-brand-500/30 hover:shadow-glow">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient} opacity-80`}
      />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-text-tertiary">{wallet.kind.replace(/_/g, ' ')}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="text-lg font-semibold text-text-primary">{chainLabel(wallet.chain)}</p>
              <ChainStatusChip chain={wallet.chain} />
            </div>
          </div>
          <Chip tone={wallet.status === 'ACTIVE' ? 'success' : 'neutral'}>{wallet.status}</Chip>
        </div>

        <div>
          <p className="text-2xl font-semibold tracking-tight text-text-primary">
            {wallet.balance_minor
              ? formatMinor(wallet.balance_minor, wallet.balance_currency ?? chainAsset(wallet.chain))
              : '—'}
          </p>
          {wallet.balance_error ? (
            <p className="mt-1 text-xs text-warning-300">{wallet.balance_error}</p>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-surface-border/60 pt-3 text-xs">
          <span className="font-mono text-text-tertiary">{truncateMiddle(wallet.address, 8, 6)}</span>
          <span className="flex items-center gap-1 text-text-muted">
            <Shield className="h-3 w-3" /> Custodial
          </span>
        </div>
      </div>
    </Card>
  );
}

export function TreasuryHero({
  orgName,
  primaryBalance,
  currency,
  walletCount,
  pendingApprovals,
}: {
  orgName: string;
  primaryBalance: string | null;
  currency: string;
  walletCount: number;
  pendingApprovals: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-[radial-gradient(ellipse_at_top_left,rgba(106,53,240,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(43,201,240,0.12),transparent_50%)] p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm text-text-secondary">{orgName} · Treasury</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
            {primaryBalance ?? '—'}
          </p>
          <p className="mt-2 text-sm text-text-tertiary">
            Primary balance · {currency} across {walletCount} wallet{walletCount === 1 ? '' : 's'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <QuickStat label="Wallets" value={String(walletCount)} />
          <QuickStat
            label="Pending approvals"
            value={String(pendingApprovals)}
            highlight={pendingApprovals > 0}
          />
          <a
            href="/transfers"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:opacity-95"
          >
            Send money <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function QuickStat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        'rounded-xl border px-4 py-3 backdrop-blur',
        highlight
          ? 'border-warning-500/40 bg-warning-500/10'
          : 'border-surface-border/80 bg-surface-card/40',
      ].join(' ')}
    >
      <p className="text-[11px] uppercase tracking-wider text-text-tertiary">{label}</p>
      <p className="mt-1 text-xl font-semibold text-text-primary">{value}</p>
    </div>
  );
}
