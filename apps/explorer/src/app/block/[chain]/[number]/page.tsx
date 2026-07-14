import Link from 'next/link';
import { Card, CardHeader, Chip } from '@salychain/ui';
import { data, safe } from '@/lib/api';
import { Field } from '@/components/Field';
import { TransfersTable, type TransferRow } from '@/components/TransfersTable';
import { chainLabel, chainTone, formatTimestamp } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function BlockPage({
  params,
}: {
  params: Promise<{ chain: string; number: string }>;
}) {
  const { chain, number } = await params;
  const blockNum = Number(number);
  const res = await safe(data().block(chain, blockNum), {
    chain,
    block_number: blockNum,
    found: false,
    block: null,
    transfers: [],
  });

  const block = res.block as { block_hash: string; ts: string } | null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Chip tone={chainTone(chain)}>{chainLabel(chain)}</Chip>
        <h1 className="text-lg font-semibold text-text-primary">Block {number}</h1>
        {!res.found && <Chip tone="neutral">Not indexed</Chip>}
      </div>

      <Card>
        <CardHeader title="Block" />
        <Field label="Chain">{chainLabel(chain)}</Field>
        <Field label="Number">{number}</Field>
        {block && (
          <>
            <Field label="Hash" mono>
              {block.block_hash || '—'}
            </Field>
            <Field label="Timestamp">{formatTimestamp(block.ts)}</Field>
          </>
        )}
        <Field label="Transfers in block">{res.transfers.length}</Field>
      </Card>

      <Card>
        <CardHeader title="Token transfers" />
        <TransfersTable rows={res.transfers as TransferRow[]} />
      </Card>
    </div>
  );
}
