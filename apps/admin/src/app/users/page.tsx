import { Code2, UserX, Users } from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { UsersExplorer } from './UsersExplorer';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalyBadge, SalyEmptyState, SalyMetricStrip, SalyCard } from '@/components/saly/ui';
import { fetchPlatformUsers } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function UsersPage() {
  const { data, source } = await fetchPlatformUsers({ limit: 200 });
  const byRole = data.by_role;
  const consumers = byRole['CONSUMER'] ?? 0;
  const businesses = byRole['BUSINESS'] ?? 0;
  const developers = byRole['DEVELOPER'] ?? 0;
  const suspended = data.data.filter((u) => u.status !== 'ACTIVE').length;

  return (
    <AdminShell
      title="Identity"
      subtitle="Decentralized IDs, credentials, permissions, and organizations"
      topRight={
        <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
          {source === 'live' ? `${data.total.toLocaleString()} accounts` : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <SalyMetricStrip
          items={[
            { label: 'Total accounts', value: source === 'live' ? data.total.toLocaleString() : '—' },
            { label: 'Business', value: source === 'live' ? businesses.toLocaleString() : '—' },
            { label: 'Developers', value: source === 'live' ? developers.toLocaleString() : '—' },
            { label: 'Suspended', value: source === 'live' ? suspended.toLocaleString() : '—' },
          ]}
        />

        <div className="mt-10">
          {source === 'live' ? (
            <UsersExplorer users={data.data} consumers={consumers} />
          ) : (
            <SalyCard>
              <SalyEmptyState
                title="Identity service unavailable"
                description="Start the local stack (pnpm dev) to load account data."
              />
            </SalyCard>
          )}
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}
