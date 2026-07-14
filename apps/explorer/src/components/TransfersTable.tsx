import Link from 'next/link';
import { Chip } from '@salychain/ui';
import { chainLabel, chainTone, formatTokenAmount, shortHash, timeAgo } from '@/lib/format';

export type TransferRow = {
  chain_id: string;
  tx_hash: string;
  ts: string;
  token_symbol: string;
  from_address: string;
  to_address: string;
  amount_raw: string;
  transfer_type: string;
};

export function TransfersTable({ rows }: { rows: TransferRow[] }) {
  if (rows.length === 0) {
    return <p className="py-8 text-center text-sm text-text-muted">No transfers found.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-border text-left text-xs uppercase tracking-wide text-text-muted">
            <th className="px-3 py-2 font-medium">Chain</th>
            <th className="px-3 py-2 font-medium">Tx</th>
            <th className="px-3 py-2 font-medium">Token</th>
            <th className="px-3 py-2 font-medium">From</th>
            <th className="px-3 py-2 font-medium">To</th>
            <th className="px-3 py-2 text-right font-medium">Amount</th>
            <th className="px-3 py-2 text-right font-medium">Age</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t, i) => (
            <tr key={`${t.tx_hash}-${i}`} className="border-b border-surface-border/50 hover:bg-surface-raised/40">
              <td className="px-3 py-2">
                <Chip tone={chainTone(t.chain_id)}>{chainLabel(t.chain_id)}</Chip>
              </td>
              <td className="px-3 py-2 font-mono text-xs">
                <Link href={`/tx/${t.chain_id}/${t.tx_hash}`} className="text-brand-300 hover:underline">
                  {shortHash(t.tx_hash)}
                </Link>
              </td>
              <td className="px-3 py-2 text-text-secondary">{t.token_symbol}</td>
              <td className="px-3 py-2 font-mono text-xs">
                <Link href={`/address/${t.chain_id}/${t.from_address}`} className="text-text-secondary hover:text-text-primary">
                  {shortHash(t.from_address)}
                </Link>
              </td>
              <td className="px-3 py-2 font-mono text-xs">
                <Link href={`/address/${t.chain_id}/${t.to_address}`} className="text-text-secondary hover:text-text-primary">
                  {shortHash(t.to_address)}
                </Link>
              </td>
              <td className="px-3 py-2 text-right font-medium text-text-primary">
                {formatTokenAmount(t.amount_raw, t.token_symbol)} {t.token_symbol}
              </td>
              <td className="px-3 py-2 text-right text-text-muted">{timeAgo(t.ts)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
