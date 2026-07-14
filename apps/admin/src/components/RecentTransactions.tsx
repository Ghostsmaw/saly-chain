import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { TransactionDto } from '@salychain/sdk-internal';
import { fetchRecentTransactions } from '@/lib/api';
import { formatAmount, relativeTime, truncateId } from '@/lib/saly-format';
import { txKindLabel, txStateVariant } from '@/lib/saly-tx';
import {
  SalyBadge,
  SalyCard,
  SalyEmptyState,
  SalySection,
} from '@/components/saly/ui';

export async function RecentTransactions({ limit = 8 }: { limit?: number }) {
  const { data, source } = await fetchRecentTransactions(limit);

  return (
    <SalySection
      title="Latest activity"
      description="Recent execution across all payment rails"
      action={
        <Link href="/transactions" className="inline-flex items-center gap-1 text-xs text-saly-text-muted hover:text-saly-text-primary">
          Explorer <ArrowUpRight className="h-3 w-3" />
        </Link>
      }
    >
      <SalyCard padding={false} className="overflow-hidden">
        {source === 'unavailable' ? (
          <SalyEmptyState
            title="Execution offline"
            description="Boot services/execution to see live transactions."
          />
        ) : data.length === 0 ? (
          <SalyEmptyState title="No transactions yet" description="Initiate a transfer via the execution API." />
        ) : (
          <ul>
            {data.map((tx) => (
              <RecentTxRow key={tx.id} tx={tx} />
            ))}
          </ul>
        )}
      </SalyCard>
    </SalySection>
  );
}

function RecentTxRow({ tx }: { tx: TransactionDto }) {
  return (
    <Link
      href={`/transactions/${tx.id}`}
      className="flex items-center justify-between border-b border-saly-border px-5 py-3.5 transition-colors last:border-b-0 hover:bg-saly-bg-hover"
    >
      <div className="min-w-0">
        <p className="font-mono text-xs text-saly-text-primary">{truncateId(tx.id)}</p>
        <p className="mt-0.5 text-[11px] text-saly-text-muted">{txKindLabel(tx.kind)}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-mono text-xs text-saly-text-primary">
            {formatAmount(tx.source.amount_minor, tx.source.currency)}
          </p>
          <p className="text-[11px] text-saly-text-faint">{relativeTime(tx.created_at)}</p>
        </div>
        <SalyBadge variant={txStateVariant(tx.state)}>{tx.state}</SalyBadge>
      </div>
    </Link>
  );
}
