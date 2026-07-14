import { AdminShell } from '@/components/AdminShell';
import { fetchEscrowDeals } from './actions';
import { EscrowExplorer, EscrowTokenHint } from '@/components/saly/escrow/EscrowExplorer';
import { EscrowHero } from '@/components/saly/escrow/EscrowHero';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalySection, SalySkeleton } from '@/components/saly/ui';
import { computeEscrowStats } from '@/lib/saly-escrow';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EscrowPage() {
  const all = await fetchEscrowDeals();
  const deals = all.ok ? all.data : [];
  const stats = computeEscrowStats(deals);
  const showTokenHint = !process.env.EXECUTION_ADMIN_TOKEN;

  return (
    <AdminShell
      title="Escrow"
      subtitle="On-chain SalyEscrow deals — fund, release, refund with audit trail"
    >
      <SalyFadeIn>
        <EscrowHero
          total={stats.total}
          funded={stats.funded}
          released={stats.released}
          refunded={stats.refunded}
          tokenConfigured={Boolean(process.env.EXECUTION_ADMIN_TOKEN)}
        />

        {showTokenHint ? (
          <div className="mt-6">
            <EscrowTokenHint />
          </div>
        ) : null}

        <div className="mt-10">
          <SalySection
            title="Escrow deals"
            description="Release pays beneficiary; refund returns funds to payer via resolver wallet"
          >
            <EscrowExplorer deals={deals} />
          </SalySection>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}
