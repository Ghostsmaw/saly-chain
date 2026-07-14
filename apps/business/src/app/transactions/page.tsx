import Link from 'next/link';
import { Card, CardHeader, Chip } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { EmptyState } from '@/components/EmptyState';
import { LiveBadge } from '@/components/LiveBadge';
import { fetchOrganization, fetchTransactions } from '@/lib/api';
import { formatMinor, toneForTxState, truncateMiddle } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TransactionsPage() {
  const [{ data, source }, orgResult] = await Promise.all([
    fetchTransactions(100),
    fetchOrganization(),
  ]);

  return (
    <BusinessShell
      title="Transactions"
      subtitle="Execution history across all rails"
      orgName={orgResult.data?.name}
      topRight={<LiveBadge live={source === 'live'} />}
    >
      <Card>
        <CardHeader
          title="All transactions"
          subtitle={source === 'live' ? `${data.length} most recent` : 'Execution service unavailable'}
        />
        {data.length === 0 ? (
          <EmptyState
            message={
              source === 'live'
                ? 'No transactions yet. Send a transfer from the Send Money page.'
                : 'Boot services/execution to see transactions here.'
            }
          />
        ) : (
          <div className="overflow-hidden rounded-lg border border-surface-border">
            <table className="w-full text-sm">
              <thead className="bg-surface-cardHover/50 text-left text-xs uppercase tracking-wider text-text-tertiary">
                <tr>
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Kind</th>
                  <th className="px-3 py-2">State</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Destination</th>
                  <th className="px-3 py-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {data.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-t border-surface-divider transition-colors hover:bg-surface-cardHover/40"
                  >
                    <td className="px-3 py-2">
                      <Link
                        href={`/transactions/${tx.id}`}
                        className="font-mono text-xs text-brand-200 hover:text-brand-100"
                      >
                        {truncateMiddle(tx.id, 10, 4)}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-text-secondary">{tx.kind.replace(/_/g, ' ')}</td>
                    <td className="px-3 py-2">
                      <Chip tone={toneForTxState(tx.state)}>{tx.state}</Chip>
                    </td>
                    <td className="px-3 py-2 text-text-primary">
                      {formatMinor(tx.source.amount_minor, tx.source.currency)}
                    </td>
                    <td className="px-3 py-2 font-mono text-xs text-text-tertiary">
                      {tx.destination.address
                        ? truncateMiddle(tx.destination.address, 8, 4)
                        : tx.destination.account_id
                          ? truncateMiddle(tx.destination.account_id, 8, 4)
                          : '—'}
                    </td>
                    <td className="px-3 py-2 text-xs text-text-muted">
                      {new Date(tx.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </BusinessShell>
  );
}
