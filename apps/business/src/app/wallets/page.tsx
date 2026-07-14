import { Card, CardHeader, Chip } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { ChainRailOverview, ChainStatusChip } from '@/components/ChainRailOverview';
import { EmptyState } from '@/components/EmptyState';
import { LiveBadge } from '@/components/LiveBadge';
import { WalletCard } from '@/components/WalletCard';
import { fetchOrganization, fetchTreasuryWallets } from '@/lib/api';
import { truncateMiddle, chainLabel } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WalletsPage() {
  const [walletsResult, orgResult] = await Promise.all([
    fetchTreasuryWallets(),
    fetchOrganization(),
  ]);

  const wallets = walletsResult.data;
  const orgName = orgResult.data?.name;
  const byChain = wallets.reduce<Record<string, number>>((acc, w) => {
    acc[w.chain] = (acc[w.chain] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <BusinessShell
      title="Wallets"
      subtitle="Custodial treasury across Base and XRPL — Ethereum/Polygon reserved in schema"
      orgName={orgName}
      topRight={<LiveBadge live={walletsResult.source === 'live'} />}
    >
      <section className="mb-6">
        <ChainRailOverview walletCounts={byChain} />
      </section>

      {wallets.length === 0 ? (
        <Card>
          <EmptyState
            title="No wallets found"
            message="Business wallets are provisioned with owner_id set to your organization. Use the wallet API to provision BUSINESS_CUSTODIAL or TREASURY wallets."
          />
        </Card>
      ) : (
        <>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {wallets.map((w) => (
              <WalletCard key={w.id} wallet={w} />
            ))}
          </div>

          <Card>
            <CardHeader title="Wallet registry" subtitle="Detailed view" />
            <div className="overflow-hidden rounded-lg border border-surface-border">
              <table className="w-full text-sm">
                <thead className="bg-surface-cardHover/50 text-left text-xs uppercase tracking-wider text-text-tertiary">
                  <tr>
                    <th className="px-3 py-2">Wallet</th>
                    <th className="px-3 py-2">Chain</th>
                    <th className="px-3 py-2">Kind</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Address</th>
                    <th className="px-3 py-2">Ledger account</th>
                  </tr>
                </thead>
                <tbody>
                  {wallets.map((w) => (
                    <tr
                      key={w.id}
                      className="border-t border-surface-divider hover:bg-surface-cardHover/40"
                    >
                      <td className="px-3 py-2 font-mono text-xs">{truncateMiddle(w.id, 8, 4)}</td>
                      <td className="px-3 py-2">
                        <ChainStatusChip chain={w.chain} />
                        <span className="ml-2 text-xs text-text-muted">{chainLabel(w.chain)}</span>
                      </td>
                      <td className="px-3 py-2 text-text-secondary">{w.kind}</td>
                      <td className="px-3 py-2">
                        <Chip tone={w.status === 'ACTIVE' ? 'success' : 'neutral'}>{w.status}</Chip>
                      </td>
                      <td className="px-3 py-2 font-mono text-xs text-text-tertiary">
                        {truncateMiddle(w.address, 10, 6)}
                      </td>
                      <td className="px-3 py-2 font-mono text-xs text-text-muted">
                        {w.ledger_account_id ? truncateMiddle(w.ledger_account_id, 8, 4) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </BusinessShell>
  );
}
