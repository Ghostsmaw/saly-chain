import { AdminShell } from '@/components/AdminShell';
import { SettingsTabs } from './SettingsTabs';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalyBadge, SalyCard, SalyEmptyState, SalyMetricStrip } from '@/components/saly/ui';
import { fetchAdminSettings } from '@/lib/api';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SettingsPage() {
  const [session, { data, source }] = await Promise.all([getSession(), fetchAdminSettings()]);
  const live = source === 'live';
  const mfaOn = data.team.filter((m) => m.mfa).length;
  const mfaPct = data.team.length > 0 ? ((mfaOn / data.team.length) * 100).toFixed(0) : '0';
  const flagsOn = data.flags.filter((f) => f.enabled).length;

  return (
    <AdminShell
      title="Settings"
      subtitle="Enterprise security, teams, billing, and audit"
      topRight={
        <SalyBadge variant={live ? 'success' : 'warning'} dot>
          {live ? 'Live' : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <SalyMetricStrip
          items={[
            { label: 'Admins', value: live ? data.team.length.toString() : '—' },
            { label: 'Roles', value: live ? data.roles.length.toString() : '—' },
            { label: 'Flags on', value: live ? `${flagsOn}/${data.flags.length}` : '—' },
            {
              label: 'MFA coverage',
              value: live ? `${mfaPct}%` : '—',
              hint: Number(mfaPct) === 100 ? 'Fully enrolled' : 'Enroll remaining admins',
            },
          ]}
        />

        <div className="mt-10">
          {live ? (
            <SettingsTabs data={data} currentUserEmail={session?.email ?? null} />
          ) : (
            <SalyCard>
              <SalyEmptyState
                title="Admin service unavailable"
                description="Start the local stack (pnpm dev) to load platform settings, RBAC, and audit data."
              />
            </SalyCard>
          )}
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}
