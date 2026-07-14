import { Card, CardHeader, Chip } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { ApproveSpendButton } from '@/components/ApproveSpendButton';
import { EmptyState } from '@/components/EmptyState';
import { LiveBadge } from '@/components/LiveBadge';
import { fetchOrganization, listPendingSpendApprovals } from '@/lib/api';
import { approveSpend } from '@/app/transfers/actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const APPROVER_CONFIGURED = Boolean(process.env.BUSINESS_APPROVER_USER_ID?.startsWith('usr_'));

export default async function ApprovalsPage() {
  const [{ data: approvals, source }, orgResult] = await Promise.all([
    listPendingSpendApprovals(),
    fetchOrganization(),
  ]);

  return (
    <BusinessShell
      title="Approvals"
      subtitle="High-value agent spend requests awaiting your vote"
      orgName={orgResult.data?.name}
      topRight={<LiveBadge live={source === 'live'} />}
    >
      {!APPROVER_CONFIGURED && (
        <div className="mb-4 rounded-lg border border-warning-500/30 bg-warning-500/10 px-4 py-3 text-sm text-warning-200">
          Set <code className="font-mono text-xs">BUSINESS_APPROVER_USER_ID=usr_…</code> to enable
          one-click approvals.
        </div>
      )}

      <Card>
        <CardHeader
          title="Pending requests"
          subtitle={
            source === 'unavailable'
              ? 'Agents service unreachable'
              : `${approvals.length} pending`
          }
        />
        {source === 'unavailable' ? (
          <EmptyState message="Start the agents service to review pending spend approvals." />
        ) : approvals.length === 0 ? (
          <EmptyState message="No pending approvals. High-value agent payments appear here when policy requires manual sign-off." />
        ) : (
          <div className="overflow-hidden rounded-lg border border-surface-border">
            <table className="w-full text-sm">
              <thead className="bg-surface-cardHover/50 text-left text-xs uppercase tracking-wider text-text-tertiary">
                <tr>
                  <th className="px-3 py-2">Agent</th>
                  <th className="px-3 py-2">Intent</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Destination</th>
                  <th className="px-3 py-2">Votes</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {approvals.map((a) => (
                  <tr key={a.id} className="border-t border-surface-divider">
                    <td className="px-3 py-3 font-mono text-xs">{a.agent_id}</td>
                    <td className="px-3 py-3 font-mono text-xs text-text-secondary">
                      {a.intent_id ?? '—'}
                    </td>
                    <td className="px-3 py-3">{a.amount_minor}</td>
                    <td className="px-3 py-3 font-mono text-xs text-text-tertiary">{a.destination}</td>
                    <td className="px-3 py-3">
                      {a.approval_count}/{a.required_approvers}
                    </td>
                    <td className="px-3 py-3">
                      <Chip tone="warning">{a.status}</Chip>
                    </td>
                    <td className="px-3 py-3 text-right">
                      {APPROVER_CONFIGURED ? (
                        <ApproveSpendButton
                          agentId={a.agent_id}
                          requestId={a.id}
                          action={approveSpend}
                        />
                      ) : (
                        <span className="text-xs text-text-tertiary">Configure approver</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </BusinessShell>
  );
}
