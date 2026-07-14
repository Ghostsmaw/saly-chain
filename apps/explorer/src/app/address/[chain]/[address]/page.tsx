import { Card, CardHeader, Chip } from '@salychain/ui';
import { data, safe } from '@/lib/api';
import { Field } from '@/components/Field';
import { TransfersTable, type TransferRow } from '@/components/TransfersTable';
import { chainLabel, chainTone, formatTokenAmount, shortHash } from '@/lib/format';

export const dynamic = 'force-dynamic';

interface Balance {
  token_symbol: string;
  net_amount: number;
  transfers_in: number;
  transfers_out: number;
}

export default async function AddressPage({
  params,
}: {
  params: Promise<{ chain: string; address: string }>;
}) {
  const { chain, address } = await params;
  const [balancesRes, transfersRes] = await Promise.all([
    safe(data().addressBalances(chain, address), { chain, address, balances: [] as Balance[] }),
    safe(data().transfers({ chain, address, limit: 50 }), {
      data: [],
      paging: { limit: 50, offset: 0, next_offset: null },
    }),
  ]);

  const balances = balancesRes.balances as Balance[];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Chip tone={chainTone(chain)}>{chainLabel(chain)}</Chip>
        <h1 className="font-mono text-lg text-text-primary">{shortHash(address, 14, 10)}</h1>
      </div>

      <Card>
        <CardHeader title="Address" />
        <Field label="Address" mono>
          {address}
        </Field>
        <Field label="Chain">{chainLabel(chain)}</Field>
      </Card>

      <Card>
        <CardHeader title="Balances" subtitle="Net of observed transfers (received − sent)" />
        {balances.length === 0 ? (
          <p className="py-4 text-sm text-text-muted">No balances found for this address.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-left text-xs uppercase tracking-wide text-text-muted">
                  <th className="px-3 py-2 font-medium">Token</th>
                  <th className="px-3 py-2 text-right font-medium">Net amount</th>
                  <th className="px-3 py-2 text-right font-medium">In</th>
                  <th className="px-3 py-2 text-right font-medium">Out</th>
                </tr>
              </thead>
              <tbody>
                {balances.map((b) => (
                  <tr key={b.token_symbol} className="border-b border-surface-border/50">
                    <td className="px-3 py-2 text-text-secondary">{b.token_symbol}</td>
                    <td className="px-3 py-2 text-right font-medium text-text-primary">
                      {formatTokenAmount(String(Math.round(b.net_amount)), b.token_symbol)} {b.token_symbol}
                    </td>
                    <td className="px-3 py-2 text-right text-success-300">{b.transfers_in}</td>
                    <td className="px-3 py-2 text-right text-danger-300">{b.transfers_out}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card>
        <CardHeader title="Recent transfers" />
        <TransfersTable rows={transfersRes.data as TransferRow[]} />
      </Card>
    </div>
  );
}
