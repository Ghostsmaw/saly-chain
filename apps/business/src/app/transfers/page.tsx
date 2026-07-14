import { BusinessShell } from '@/components/BusinessShell';
import { TransferForm } from '@/components/TransferForm';
import { fetchOrganization, fetchTreasuryWallets } from '@/lib/api';
import { BUSINESS_FIAT_NGN_LEDGER_ACCOUNT } from '@/lib/constants';
import { submitTransfer } from './actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TransfersPage() {
  const [walletsResult, orgResult] = await Promise.all([
    fetchTreasuryWallets(),
    fetchOrganization(),
  ]);

  return (
    <BusinessShell
      title="Send Money"
      subtitle="Submit a transfer intent — routing, compliance, and settlement happen automatically"
      orgName={orgResult.data?.name}
    >
      <div className="mx-auto max-w-2xl">
        <TransferForm
          wallets={walletsResult.data}
          action={submitTransfer}
          fiatTreasuryAccountId={BUSINESS_FIAT_NGN_LEDGER_ACCOUNT}
        />
      </div>
    </BusinessShell>
  );
}
