import { Crown, Mail, Shield, User } from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { EmptyState } from '@/components/EmptyState';
import { LiveBadge } from '@/components/LiveBadge';
import { fetchMembers, fetchOrganization } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ROLE_ICON: Record<string, typeof User> = {
  owner: Crown,
  admin: Shield,
  member: User,
  viewer: User,
};

const ROLE_TONE: Record<string, 'brand' | 'info' | 'neutral' | 'success'> = {
  owner: 'brand',
  admin: 'info',
  member: 'neutral',
  viewer: 'success',
};

export default async function TeamPage() {
  const [orgResult, membersResult] = await Promise.all([fetchOrganization(), fetchMembers()]);
  const org = orgResult.data;
  const members = membersResult.data;

  return (
    <BusinessShell
      title="Team"
      subtitle="Organization members and roles"
      orgName={org?.name}
      topRight={<LiveBadge live={membersResult.source === 'live'} />}
    >
      {org ? (
        <Card className="mb-6">
          <CardHeader title={org.name} subtitle={`Organization · ${org.status}`} />
          <dl className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div>
              <dt className="text-xs text-text-tertiary">Org ID</dt>
              <dd className="mt-1 font-mono text-xs text-text-primary">{org.id}</dd>
            </div>
            <div>
              <dt className="text-xs text-text-tertiary">Status</dt>
              <dd className="mt-1">
                <Chip tone={org.status === 'ACTIVE' ? 'success' : 'warning'}>{org.status}</Chip>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-text-tertiary">Rate limit</dt>
              <dd className="mt-1 text-text-primary">{org.default_rate_limit_per_min}/min</dd>
            </div>
            <div>
              <dt className="text-xs text-text-tertiary">Members</dt>
              <dd className="mt-1 text-text-primary">{members.length}</dd>
            </div>
          </dl>
        </Card>
      ) : null}

      <Card>
        <CardHeader title="Members" subtitle={`${members.length} team member${members.length === 1 ? '' : 's'}`} />
        {members.length === 0 ? (
          <EmptyState
            message={
              membersResult.source === 'live'
                ? 'Add members via the API keys service or partner onboarding runbook.'
                : 'API keys service unavailable.'
            }
          />
        ) : (
          <ul className="flex flex-col gap-3">
            {members.map((m) => {
              const Icon = ROLE_ICON[m.role] ?? User;
              return (
                <li
                  key={m.id}
                  className="flex items-center gap-4 rounded-xl border border-surface-border bg-surface-cardHover/40 p-4 transition hover:border-brand-500/20"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-medium text-text-primary">
                      <Mail className="h-3.5 w-3.5 text-text-tertiary" />
                      {m.email}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-text-muted">{m.id}</p>
                  </div>
                  <Chip tone={ROLE_TONE[m.role] ?? 'neutral'}>{m.role}</Chip>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </BusinessShell>
  );
}
