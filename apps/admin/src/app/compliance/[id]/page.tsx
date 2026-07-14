import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { CaseStatusActions } from '@/components/CaseStatusActions';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalyBadge, SalyCard, SalyEmptyState, SalySection } from '@/components/saly/ui';
import { fetchComplianceCase } from '@/lib/api';
import { compliancePriorityVariant, complianceStatusVariant } from '@/lib/saly-compliance';
import { formatDateTime } from '@/lib/saly-format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ComplianceCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await fetchComplianceCase(id);

  if (!result.data) {
    return (
      <AdminShell title="Compliance case" subtitle="Sanctions / KYC review">
        <SalyCard>
          <SalyEmptyState title="Case not found" description={`Could not load case ${id}.`} />
        </SalyCard>
      </AdminShell>
    );
  }

  const c = result.data;

  return (
    <AdminShell title="Compliance case" subtitle="Sanctions / KYC review">
      <SalyFadeIn>
        <Link
          href="/compliance"
          className="inline-flex items-center gap-1 text-xs text-saly-text-muted hover:text-saly-text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to queue
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SalySection title={c.summary}>
              <SalyCard>
                <div className="mb-4 flex flex-wrap gap-2">
                  <SalyBadge variant={compliancePriorityVariant(c.priority)}>{c.priority}</SalyBadge>
                  <SalyBadge variant={complianceStatusVariant(c.status)} dot>
                    {c.status}
                  </SalyBadge>
                </div>
                <p className="mb-4 font-mono text-xs text-saly-text-faint">{c.id}</p>
                <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium text-saly-text-muted">Subject</dt>
                    <dd className="mt-1">
                      {c.subject?.external_ref ? (
                        <Link
                          href={`/users/${c.subject.external_ref}`}
                          className="font-mono text-xs text-violet-300 hover:text-violet-200"
                        >
                          {c.subject.external_ref}
                        </Link>
                      ) : (
                        <span className="text-saly-text-primary">—</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-saly-text-muted">Display name</dt>
                    <dd className="mt-1 text-saly-text-primary">{c.subject?.display_name ?? '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-saly-text-muted">Country</dt>
                    <dd className="mt-1 text-saly-text-primary">{c.subject?.country_code ?? '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-saly-text-muted">KYC tier</dt>
                    <dd className="mt-1 text-saly-text-primary">{c.subject?.tier ?? '—'}</dd>
                  </div>
                  {c.intent_id ? (
                    <div>
                      <dt className="text-xs font-medium text-saly-text-muted">Intent</dt>
                      <dd className="mt-1 font-mono text-xs text-violet-300">{c.intent_id}</dd>
                    </div>
                  ) : null}
                  {c.transaction_id ? (
                    <div>
                      <dt className="text-xs font-medium text-saly-text-muted">Transaction</dt>
                      <dd className="mt-1">
                        <Link
                          href={`/transactions/${c.transaction_id}`}
                          className="font-mono text-xs text-violet-300 hover:text-violet-200"
                        >
                          {c.transaction_id}
                        </Link>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </SalyCard>
            </SalySection>
          </div>

          <SalySection title="Analyst actions">
            <SalyCard>
              <CaseStatusActions caseId={c.id} currentStatus={c.status} />
              <p className="mt-4 text-xs text-saly-text-muted">
                Approving unlocks full platform access for the account. Rejecting blocks access until they resubmit.
              </p>
              <p className="mt-2 text-xs text-saly-text-faint">
                Created {formatDateTime(c.created_at)}
                {c.resolved_at ? ` · Resolved ${formatDateTime(c.resolved_at)}` : ''}
              </p>
            </SalyCard>
          </SalySection>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}
