import { Activity, Coins, Layers, Route } from 'lucide-react';
import { Card, CardHeader, Chip, StatCard } from '@salychain/ui';
import { data, safe } from '@/lib/api';
import { TransfersTable, type TransferRow } from '@/components/TransfersTable';
import { chainLabel, chainTone, formatNumber } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const client = data();
  const [supply, transfers, daily, rails] = await Promise.all([
    safe(client.usdcSupply(), { asset: 'USDC', by_chain: [], total_net_supply: 0 }),
    safe(client.transfers({ limit: 12 }), { data: [], paging: { limit: 12, offset: 0, next_offset: null } }),
    safe(client.runQuery({ query: 'daily_transfer_counts', params: { days: 1 } }), { query: '', data: [] }),
    safe(client.runQuery({ query: 'rail_settlement_summary', params: { days: 7 } }), { query: '', data: [] }),
  ]);

  const transfersToday = Number((daily.data[0] as { transfers?: number })?.transfers ?? 0);
  const railRows = rails.data as Array<{ rail: string; routed_intents: number }>;
  const railsRouted = railRows.reduce((s, r) => s + Number(r.routed_intents ?? 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">Network overview</h1>
        <p className="mt-1 text-sm text-text-tertiary">
          Live activity across Base, Saly L3 and XRPL — including SalyChain settlement lineage.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="USDC net supply"
          value={formatNumber(supply.total_net_supply)}
          icon={<Coins className="h-4 w-4" />}
          iconTone="brand"
        />
        <StatCard
          label="Active chains"
          value={supply.by_chain.length || 3}
          icon={<Layers className="h-4 w-4" />}
          iconTone="cyan"
        />
        <StatCard
          label="Transfers (24h)"
          value={formatNumber(transfersToday, 0)}
          icon={<Activity className="h-4 w-4" />}
          iconTone="success"
        />
        <StatCard
          label="Intents routed (7d)"
          value={formatNumber(railsRouted, 0)}
          icon={<Route className="h-4 w-4" />}
          iconTone="warning"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Latest transfers" subtitle="Most recent token movements across chains" />
          <TransfersTable rows={transfers.data as TransferRow[]} />
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader title="USDC supply by chain" />
            {supply.by_chain.length === 0 ? (
              <p className="py-4 text-sm text-text-muted">No supply data yet.</p>
            ) : (
              <ul className="space-y-2">
                {supply.by_chain.map((c) => (
                  <li key={c.chain_id} className="flex items-center justify-between text-sm">
                    <Chip tone={chainTone(c.chain_id)}>{chainLabel(c.chain_id)}</Chip>
                    <span className="font-medium text-text-primary">{formatNumber(c.net_supply)}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <CardHeader title="Rail routing (7d)" subtitle="Intents routed per settlement rail" />
            {railRows.length === 0 ? (
              <p className="py-4 text-sm text-text-muted">No routing data yet.</p>
            ) : (
              <ul className="space-y-2">
                {railRows.map((r) => (
                  <li key={r.rail} className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{r.rail || '—'}</span>
                    <span className="font-medium text-text-primary">{formatNumber(r.routed_intents, 0)}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
