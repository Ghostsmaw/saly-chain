import Link from 'next/link';
import { Card, CardHeader, Chip } from '@salychain/ui';
import { data, safe } from '@/lib/api';
import { chainLabel, chainTone, formatTimestamp, shortHash } from '@/lib/format';

export const dynamic = 'force-dynamic';

type OutputRow = {
  chain_id: string;
  tx_hash: string;
  ts: string;
  contract_address: string;
  args: string;
};

function parseOutputArgs(raw: string): Record<string, unknown> {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export default async function L3SettlementsPage() {
  const res = await safe(data().l3Settlements({ limit: 50 }), { chain: null, data: [] as OutputRow[] });
  const rows = res.data as OutputRow[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">L3 settlement outputs</h1>
        <p className="mt-1 text-sm text-text-tertiary">
          OutputProposed events — when Saly L3 rollups post state roots to Base for final settlement.
        </p>
      </div>

      <Card>
        <CardHeader title="Recent OutputProposed" subtitle="Newest first" />
        {rows.length === 0 ? (
          <p className="py-8 text-center text-sm text-text-muted">No L3 settlement outputs indexed yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-left text-xs uppercase tracking-wide text-text-muted">
                  <th className="px-3 py-2 font-medium">Network</th>
                  <th className="px-3 py-2 font-medium">L1 tx</th>
                  <th className="px-3 py-2 font-medium">L2 block</th>
                  <th className="px-3 py-2 font-medium">Output root</th>
                  <th className="px-3 py-2 font-medium">Settlement</th>
                  <th className="px-3 py-2 text-right font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const args = parseOutputArgs(r.args);
                  const l2Block = String(args.l2_block_number ?? '—');
                  const outputRoot = String(args.output_root ?? '—');
                  const settlement = String(args.settlement_network ?? '—');
                  return (
                    <tr key={`${r.tx_hash}-${i}`} className="border-b border-surface-border/50 hover:bg-surface-raised/40">
                      <td className="px-3 py-2">
                        <Chip tone={chainTone(r.chain_id)}>{chainLabel(r.chain_id)}</Chip>
                      </td>
                      <td className="px-3 py-2 font-mono text-xs">
                        <Link href={`/tx/base/${r.tx_hash}`} className="text-brand-300 hover:underline">
                          {shortHash(r.tx_hash)}
                        </Link>
                      </td>
                      <td className="px-3 py-2 font-mono text-xs text-text-secondary">{l2Block}</td>
                      <td className="px-3 py-2 font-mono text-xs text-text-muted">{shortHash(outputRoot, 10, 8)}</td>
                      <td className="px-3 py-2 text-text-secondary">{settlement}</td>
                      <td className="px-3 py-2 text-right text-text-muted">{formatTimestamp(r.ts)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
