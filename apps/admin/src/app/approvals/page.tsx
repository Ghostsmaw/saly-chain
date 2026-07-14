import { AdminShell } from '@/components/AdminShell';
import {
  ApprovalsExplorer,
  ApprovalsFlash,
  ApproverConfigHint,
  ApprovalsHero,
} from '@/components/saly/approvals/ApprovalsExplorer';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalySection, SalyBadge } from '@/components/saly/ui';
import { listPendingSpendApprovals } from '@/lib/api';
import { computeApprovalStats } from '@/lib/saly-approvals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const APPROVER_ID = process.env.ADMIN_APPROVER_USER_ID;

export default async function SpendApprovalsPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const { data: approvals, source } = await listPendingSpendApprovals();
  const resolvedSearchParams = await searchParams;
  const stats = computeApprovalStats(approvals);
  const approverConfigured = Boolean(APPROVER_ID?.startsWith('usr_'));

  return (
    <AdminShell
      title="Spend approvals"
      subtitle="Agent transactions awaiting manual approver votes"
    >
      <SalyFadeIn>
        <ApprovalsHero
          live={source === 'live'}
          pending={stats.pending}
          agents={stats.agents}
          approverConfigured={approverConfigured}
        />

        <div className="mt-6 space-y-4">
          <ApprovalsFlash ok={resolvedSearchParams?.ok} error={resolvedSearchParams?.error} />
          {!approverConfigured ? <ApproverConfigHint /> : null}
        </div>

        <div className="mt-10">
          <SalySection
            title="Pending requests"
            description="High-value agent intents requiring policy approvers"
            action={
              <SalyBadge variant={source === 'live' ? 'warning' : 'danger'} dot>
                {source === 'live' ? `${approvals.length} pending` : 'Offline'}
              </SalyBadge>
            }
          >
            <ApprovalsExplorer
              approvals={approvals}
              source={source}
              approverConfigured={approverConfigured}
            />
          </SalySection>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}
