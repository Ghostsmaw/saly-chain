import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import { fetchTransactions } from '@/lib/api';
import { formatMinor, toneForTxState, truncateMiddle } from '@/lib/format';

export async function RecentActivity({ limit = 6 }: { limit?: number }) {
  const { data, source } = await fetchTransactions(limit);

  return (
    <Card>
      <CardHeader
        title="Recent activity"
        right={
          <Link href="/transactions" className="flex items-center gap-1 text-xs text-brand-300 hover:text-brand-200">
            View all <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
      />
      {data.length === 0 ? (
        <p className="py-10 text-center text-sm text-text-tertiary">
          {source === 'live' ? 'No transactions yet.' : 'Start the execution service to see activity.'}
        </p>
      ) : (
        <ul className="flex flex-col">
          {data.map((tx) => (
            <li
              key={tx.id}
              className="flex items-center justify-between gap-4 border-b border-surface-divider py-3 last:border-b-0"
            >
              <div className="min-w-0">
                <Link
                  href={`/transactions/${tx.id}`}
                  className="text-sm font-medium text-text-primary hover:text-brand-200"
                >
                  {tx.kind.replace(/_/g, ' ')}
                </Link>
                <p className="truncate font-mono text-[11px] text-text-muted">
                  {truncateMiddle(tx.id, 10, 6)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">
                  {formatMinor(tx.source.amount_minor, tx.source.currency)}
                </p>
                <Chip tone={toneForTxState(tx.state)}>{tx.state}</Chip>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
