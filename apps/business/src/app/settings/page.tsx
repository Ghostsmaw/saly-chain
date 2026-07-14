import Link from 'next/link';
import { Card, CardHeader, VerificationProfileView } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { getSession } from '@/lib/auth';
import { fetchOrganization } from '@/lib/api';
import { getBusinessOnboarding, isOnboardingEnabledForProfile } from '@/lib/onboarding';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SettingsPage() {
  const session = await getSession();
  const orgResult = await fetchOrganization();
  const org = orgResult.data;

  const onboardingEnabled = session ? await isOnboardingEnabledForProfile('business') : false;
  const onboarding =
    session && onboardingEnabled ? await getBusinessOnboarding(session.userId).catch(() => null) : null;

  const requirementLabels =
    onboarding?.requirements?.map((r) => ({ field_key: r.field_key, label: r.label })) ?? undefined;

  return (
    <BusinessShell
      title="Settings"
      subtitle="Your account and verification information"
      orgName={org?.name}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <Card>
          <CardHeader title="Account" subtitle="Signed-in business user" />
          <dl className="grid grid-cols-1 gap-4 px-4 pb-4 text-sm md:grid-cols-2">
            <SettingRow label="Display name" value={session?.displayName ?? '—'} />
            <SettingRow label="Email" value={session?.email ?? '—'} />
            <SettingRow label="User ID" value={session?.userId ?? '—'} mono />
            <SettingRow label="Organization" value={org?.name ?? '—'} />
          </dl>
        </Card>

        {onboardingEnabled && onboarding ? (
          <VerificationProfileView
            title="KYB verification"
            subtitle={
              onboarding.status === 'not_started'
                ? 'Complete onboarding to submit your business details'
                : `${onboarding.steps.filter((s) => s.status === 'done').length}/${onboarding.steps.length} steps submitted`
            }
            status={onboarding.status}
            profile={onboarding.profile}
            submittedAt={onboarding.submitted_at}
            approvedAt={onboarding.approved_at}
            rejectedAt={onboarding.rejected_at}
            tier={onboarding.tier}
            steps={onboarding.steps}
            requirements={requirementLabels}
            editHref="/onboarding"
          />
        ) : null}

        {onboardingEnabled && onboarding?.status === 'in_progress' ? (
          <p className="text-center text-sm text-text-secondary">
            Need to finish or update your submission?{' '}
            <Link href="/onboarding" className="text-brand-300 hover:text-brand-200">
              Continue KYB onboarding
            </Link>
          </p>
        ) : null}
      </div>
    </BusinessShell>
  );
}

function SettingRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-text-muted">{label}</dt>
      <dd className={`mt-1 ${mono ? 'font-mono text-xs text-text-primary' : 'text-text-primary'}`}>{value}</dd>
    </div>
  );
}
