import { Card, CardHeader } from '@salychain/ui';
import { data, safe } from '@/lib/api';
import { TransfersTable, type TransferRow } from '@/components/TransfersTable';

export const dynamic = 'force-dynamic';

interface SearchParams {
  chain?: string;
  token?: string;
  address?: string;
}

export default async function TransfersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const res = await safe(
    data().transfers({
      chain: params.chain,
      token: params.token,
      address: params.address,
      limit: 100,
    }),
    { data: [], paging: { limit: 100, offset: 0, next_offset: null } },
  );

  const filters = [
    params.chain && `chain=${params.chain}`,
    params.token && `token=${params.token}`,
    params.address && `address=${params.address}`,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Card>
      <CardHeader
        title="Transfers"
        subtitle={filters || 'All chains and tokens'}
      />
      <TransfersTable rows={res.data as TransferRow[]} />
    </Card>
  );
}
