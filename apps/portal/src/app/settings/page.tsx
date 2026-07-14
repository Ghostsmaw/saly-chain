import Link from 'next/link';
import { Card, CardHeader, VerificationProfileView } from '@salychain/ui';
import { PortalShell } from '@/components/PortalShell';
import { getSession } from '@/lib/auth';
import { getDeveloperOnboarding, isOnboardingEnabledForProfile } from '@/lib/onboarding';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SettingsPage() {
  const session = await getSession();

  const onboardingEnabled = session ? await isOnboardingEnabledForProfile('developer') : false;
  const onboarding =
    session && onboardingEnabled ? await getDeveloperOnboarding(session.userId).catch(() => null) : null;

  const requirementLabels =
    onboarding?.requirements?.map((r) => ({ field_key: r.field_key, label: r.label })) ?? undefined;

  return (
    <PortalShell title="Settings" subtitle="Your account and verification information">
      <div className="mx-auto max-w-3xl space-y-6">
        <Card>
          <CardHeader title="Account" subtitle="Signed-in developer" />
          <dl className="grid grid-cols-1 gap-4 px-4 pb-4 text-sm md:grid-cols-2">
            <SettingRow label="Display name" value={session?.displayName ?? '—'} />
            <SettingRow label="Email" value={session?.email ?? '—'} />
            <SettingRow label="User ID" value={session?.userId ?? '—'} mono />
          </dl>
        </Card>

        {onboardingEnabled && onboarding ? (
          <VerificationProfileView
            title="KYC verification"
            subtitle={
              onboarding.status === 'not_started'
                ? 'Complete onboarding to submit your identity details'
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
              Continue KYC onboarding
            </Link>
          </p>
        ) : null}
      </div>
    </PortalShell>
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
