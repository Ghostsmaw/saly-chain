import { Card, CardHeader, Chip } from '@salychain/ui';
import { PortalShell } from '@/components/PortalShell';
import { listIntents } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function IntentsPage() {
  const { data: intents, source } = await listIntents(50);
  return (
    <PortalShell title="Intents" subtitle="Every intent submitted by your organization.">
      <Card>
        <CardHeader title="Recent intents" subtitle={source === 'live' ? `${intents.length} shown` : 'Intent service unavailable'} />
        {source === 'unavailable' ? (
          <EmptyState message="Start the intent service (pnpm --filter @salychain/service-intent dev)." />
        ) : intents.length === 0 ? (
          <EmptyState message="No intents yet. Submit one with the SDK." />
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-text-tertiary">
              <tr>
                <th className="pb-2 font-medium">Intent</th>
                <th className="pb-2 font-medium">Kind</th>
                <th className="pb-2 font-medium">State</th>
                <th className="pb-2 font-medium">Transaction</th>
                <th className="pb-2 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {intents.map((i) => (
                <tr key={i.intent_id} className="border-t border-surface-divider">
                  <td className="py-3 font-mono text-text-primary">{i.intent_id}</td>
                  <td className="py-3 text-text-secondary">{i.kind}</td>
                  <td className="py-3">
                    <Chip tone={chipToneForIntentState(i.state)}>{i.state}</Chip>
                  </td>
                  <td className="py-3 font-mono text-xs text-text-tertiary">{i.execution_transaction_id ?? '—'}</td>
                  <td className="py-3 text-text-tertiary">{new Date(i.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </PortalShell>
  );
}

function chipToneForIntentState(state: string): 'success' | 'warning' | 'danger' | 'info' {
  if (state === 'COMPLETED') return 'success';
  if (state === 'REJECTED' || state === 'FAILED') return 'danger';
  if (state === 'ACCEPTED') return 'info';
  return 'warning';
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-surface-border bg-surface-cardHover/40 p-12 text-center">
      <p className="text-sm text-text-tertiary">{message}</p>
    </div>
  );
}
