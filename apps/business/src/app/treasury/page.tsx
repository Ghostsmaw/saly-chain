import Link from 'next/link';
import { Plus, Vault } from 'lucide-react';
import { Card, CardHeader } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { EmptyState } from '@/components/EmptyState';
import { LiveBadge } from '@/components/LiveBadge';
import { WalletCard } from '@/components/WalletCard';
import { FxRatesPanel } from '@/components/FxRatesPanel';
import { fetchFxRates, fetchTreasurySummary } from '@/lib/api';
import { formatMinor } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TreasuryPage() {
  const [treasury, fx] = await Promise.all([fetchTreasurySummary(), fetchFxRates()]);
  const summary = treasury.data;
  const orgName = treasury.org?.name ?? 'Your Business';

  return (
    <BusinessShell
      title="Treasury"
      subtitle="Multi-currency balances and wallet allocation"
      orgName={orgName}
      topRight={
        <div className="flex items-center gap-3">
          <LiveBadge live={treasury.source === 'live'} />
          <Link
            href="/swap"
            className="inline-flex items-center gap-2 rounded-lg border border-brand-500/30 bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-200"
          >
            Swap FX
          </Link>
          <Link
            href="/transfers"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-3 py-1.5 text-xs font-medium text-white"
          >
            <Plus className="h-3.5 w-3.5" /> New payout
          </Link>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {summary.by_currency.length === 0 ? (
          <Card className="md:col-span-3">
            <EmptyState
              title="No treasury balances yet"
              message="Provision BUSINESS_CUSTODIAL or TREASURY wallets for your organization, then link them to ledger accounts."
              action={
                <Link href="/wallets" className="text-sm text-brand-300 hover:text-brand-200">
                  View wallets →
                </Link>
              }
            />
          </Card>
        ) : (
          summary.by_currency.map((c) => (
            <Card key={c.currency} className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent" />
              <div className="relative">
                <p className="text-xs uppercase tracking-wider text-text-tertiary">{c.currency}</p>
                <p className="mt-2 text-3xl font-semibold text-text-primary">
                  {formatMinor(c.total_minor.toString(), c.currency)}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  {c.wallet_count} wallet{c.wallet_count === 1 ? '' : 's'}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card>
          <CardHeader
            title="Wallet allocation"
            subtitle={`${summary.wallets.length} custodial wallet${summary.wallets.length === 1 ? '' : 's'}`}
            right={
              <span className="flex items-center gap-1 text-xs text-text-tertiary">
                <Vault className="h-3.5 w-3.5" /> Org-scoped
              </span>
            }
          />
          {summary.wallets.length === 0 ? (
            <EmptyState
              message={
                treasury.source === 'live'
                  ? 'Wallets with owner_id matching your org will appear here.'
                  : 'Start the wallet and ledger services to view treasury wallets.'
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {summary.wallets.map((w) => (
                <WalletCard key={w.id} wallet={w} />
              ))}
            </div>
          )}
        </Card>
        </div>
        <FxRatesPanel rates={fx.data} live={fx.source === 'live'} />
      </section>
    </BusinessShell>
  );
}
