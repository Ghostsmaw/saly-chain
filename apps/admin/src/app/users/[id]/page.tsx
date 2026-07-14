import { AdminShell } from '@/components/AdminShell';
import { AccountDetailView } from '@/components/AccountDetailView';
import { Card, CardHeader } from '@salychain/ui';
import { fetchAccountDetail } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function backLinkForRole(role: string): { href: string; label: string } {
  switch (role) {
    case 'BUSINESS':
      return { href: '/businesses', label: 'Back to businesses' };
    case 'DEVELOPER':
      return { href: '/developers', label: 'Back to developers' };
    default:
      return { href: '/users', label: 'Back to users' };
  }
}

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await fetchAccountDetail(id);

  if (result.source !== 'live' || !result.data) {
    return (
      <AdminShell title="Account details" subtitle="Platform user profile">
        <Card>
          <CardHeader title="Account not found" />
          <p className="px-4 pb-4 text-sm text-text-muted">
            Could not load account <span className="font-mono">{id}</span>. The identity service may be offline or this ID does not exist.
          </p>
        </Card>
      </AdminShell>
    );
  }

  const { user } = result.data;
  const back = backLinkForRole(user.role);
  const subtitle =
    user.role === 'BUSINESS'
      ? 'Business account · KYB and treasury profile'
      : user.role === 'DEVELOPER'
        ? 'Developer account · KYC and API access'
        : 'Platform user profile';

  return (
    <AdminShell title="Account details" subtitle={subtitle}>
      <AccountDetailView detail={result.data} backHref={back.href} backLabel={back.label} />
    </AdminShell>
  );
}
