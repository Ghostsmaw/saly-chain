import { AdminShell } from '@/components/AdminShell';
import { TransactionsExplorer } from '@/components/saly/transactions/TransactionsExplorer';
import { SalyBadge } from '@/components/saly/ui';
import { fetchRecentTransactions } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TransactionsPage() {
  const { data, source } = await fetchRecentTransactions(100);

  return (
    <AdminShell
      title="Transactions"
      subtitle="Search, filter, and inspect execution across all rails"
      topRight={
        <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
          {source === 'live' ? `${data.length} loaded` : 'Offline'}
        </SalyBadge>
      }
    >
      <TransactionsExplorer transactions={data} source={source} />
    </AdminShell>
  );
}
