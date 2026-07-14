import { Card, CardHeader, Chip } from '@salychain/ui';
import { PortalShell } from '@/components/PortalShell';
import { listTransactions } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TransactionsPage() {
  const { data: txs, source } = await listTransactions(50);
  return (
    <PortalShell title="Transactions" subtitle="Every execution attempt and its rail.">
      <Card>
        <CardHeader title="Recent transactions" subtitle={source === 'live' ? `${txs.length} shown` : 'Execution service unavailable'} />
        {source === 'unavailable' ? (
          <EmptyState message="Start the execution service (pnpm --filter @salychain/service-execution dev)." />
        ) : txs.length === 0 ? (
          <EmptyState message="No transactions yet." />
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-text-tertiary">
              <tr>
                <th className="pb-2 font-medium">Transaction</th>
                <th className="pb-2 font-medium">Kind</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">State</th>
                <th className="pb-2 font-medium">Tx hash</th>
                <th className="pb-2 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {txs.map((t) => (
                <tr key={t.id} className="border-t border-surface-divider">
                  <td className="py-3 font-mono text-text-primary">{t.id}</td>
                  <td className="py-3 text-text-secondary">{t.kind.replace('_', ' ').toLowerCase()}</td>
                  <td className="py-3 text-text-secondary">{t.source.amount_minor} <span className="text-text-tertiary">{t.source.currency}</span></td>
                  <td className="py-3">
                    <Chip tone={chipToneForState(t.state)}>{t.state}</Chip>
                  </td>
                  <td className="py-3 font-mono text-xs text-text-tertiary">{t.tx_hash ? `${t.tx_hash.slice(0, 10)}…${t.tx_hash.slice(-6)}` : '—'}</td>
                  <td className="py-3 text-text-tertiary">{new Date(t.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </PortalShell>
  );
}

function chipToneForState(state: string): 'success' | 'warning' | 'danger' | 'info' {
  if (state === 'SETTLED') return 'success';
  if (state === 'FAILED' || state === 'REJECTED' || state === 'REVERSED') return 'danger';
  if (state === 'EXECUTING' || state === 'AWAITING_CONFIRMATION') return 'warning';
  return 'info';
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-surface-border bg-surface-cardHover/40 p-12 text-center">
      <p className="text-sm text-text-tertiary">{message}</p>
    </div>
  );
}
