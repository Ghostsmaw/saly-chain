import Link from 'next/link';
import { Card, CardHeader, Chip } from '@salychain/ui';
import { resolveBridgeContracts, isBridgeConfigured } from '@salychain/chain-l3';
import { shortHash } from '@/lib/format';

export const dynamic = 'force-dynamic';

const EXECUTION_URL = process.env.EXECUTION_BASE_URL ?? 'http://localhost:4003';

type BridgeTx = {
  id: string;
  kind: string;
  state: string;
  amount_minor: string;
  currency: string;
  tx_hash?: string | null;
  created_at: string;
};

async function fetchBridgeData(): Promise<{ status: Record<string, string | boolean>; txs: BridgeTx[] }> {
  const contracts = resolveBridgeContracts(process.cwd());
  // Scoped explorer credential only — never INTERNAL_SERVICE_TOKEN.
  const readToken = process.env.EXPLORER_READ_TOKEN;
  const headers = readToken ? { 'x-internal-token': readToken } : undefined;
  try {
    const [statusRes, txRes] = await Promise.all([
      fetch(`${EXECUTION_URL}/v1/bridge/status`, { next: { revalidate: 0 }, headers }),
      fetch(`${EXECUTION_URL}/v1/bridge/transactions`, { next: { revalidate: 0 }, headers }),
    ]);
    const status = statusRes.ok ? ((await statusRes.json()) as Record<string, string | boolean>) : {};
    const txs = txRes.ok ? ((await txRes.json()) as { data: BridgeTx[] }).data : [];
    return { status: { ...status, configured: isBridgeConfigured(contracts) }, txs };
  } catch {
    return { status: { configured: isBridgeConfigured(contracts), network: contracts.network }, txs: [] };
  }
}

export default async function L3BridgePage() {
  const { status, txs } = await fetchBridgeData();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/l3/settlements" className="text-xs text-brand-400 hover:underline">
          ← L3 settlements
        </Link>
        <h1 className="mt-2 text-xl font-semibold text-text-primary">L3 ↔ Base bridge</h1>
        <p className="mt-1 text-sm text-text-tertiary">
          Canonical OP-Stack bridge deposits and withdrawals indexed from Base settlement layer.
        </p>
      </div>

      <Card>
        <CardHeader
          title="Bridge contracts"
          subtitle={String(status.network ?? 'saly-devnet')}
          right={
            <Chip tone={status.configured ? 'success' : 'warning'}>
              {status.configured ? 'Live' : 'Unconfigured'}
            </Chip>
          }
        />
        <dl className="grid gap-3 px-4 pb-4 text-sm md:grid-cols-2">
          {status.optimism_portal ? (
            <div>
              <dt className="text-xs text-text-muted">OptimismPortal</dt>
              <dd className="font-mono text-xs">{String(status.optimism_portal)}</dd>
            </div>
          ) : null}
          {status.l1_standard_bridge ? (
            <div>
              <dt className="text-xs text-text-muted">L1StandardBridge</dt>
              <dd className="font-mono text-xs">{String(status.l1_standard_bridge)}</dd>
            </div>
          ) : null}
          {status.l2_standard_bridge ? (
            <div>
              <dt className="text-xs text-text-muted">L2StandardBridge</dt>
              <dd className="font-mono text-xs">{String(status.l2_standard_bridge)}</dd>
            </div>
          ) : null}
        </dl>
      </Card>

      <Card>
        <CardHeader title="Recent bridge transactions" subtitle="Execution service" />
        {txs.length === 0 ? (
          <p className="py-8 text-center text-sm text-text-muted">No bridge transactions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-left text-xs uppercase tracking-wide text-text-muted">
                  <th className="px-3 py-2 font-medium">Kind</th>
                  <th className="px-3 py-2 font-medium">State</th>
                  <th className="px-3 py-2 font-medium">Amount</th>
                  <th className="px-3 py-2 font-medium">Tx</th>
                  <th className="px-3 py-2 text-right font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {txs.map((tx) => (
                  <tr key={tx.id} className="border-b border-surface-border/50">
                    <td className="px-3 py-2">{tx.kind}</td>
                    <td className="px-3 py-2">{tx.state}</td>
                    <td className="px-3 py-2 font-mono text-xs">
                      {tx.amount_minor} {tx.currency}
                    </td>
                    <td className="px-3 py-2 font-mono text-xs">{tx.tx_hash ? shortHash(tx.tx_hash) : '—'}</td>
                    <td className="px-3 py-2 text-right text-text-muted">{tx.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
