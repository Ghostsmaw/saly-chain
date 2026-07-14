'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { UserDto } from '@salychain/sdk-internal';
import { SalyBadge, SalyCard, SalyTabs } from '@/components/saly/ui';
import { formatDate, truncateId } from '@/lib/saly-format';

const ROLES = ['All', 'CONSUMER', 'BUSINESS', 'DEVELOPER', 'SUPER_ADMIN'] as const;
const STATUSES = ['All', 'ACTIVE', 'SUSPENDED'] as const;

type RoleFilter = (typeof ROLES)[number];
type StatusFilter = (typeof STATUSES)[number];

function roleVariant(role: string): 'accent' | 'success' | 'info' | 'neutral' {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'accent';
    case 'BUSINESS':
      return 'success';
    case 'DEVELOPER':
      return 'info';
    default:
      return 'neutral';
  }
}

function roleLabel(role: string): string {
  return role.charAt(0) + role.slice(1).toLowerCase().replace('_', ' ');
}

function initials(user: UserDto): string {
  const base = user.display_name?.trim() || user.email;
  return base
    .split(/[\s@.]+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function UsersExplorer({ users, consumers }: { users: UserDto[]; consumers: number }) {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState<RoleFilter>('All');
  const [status, setStatus] = useState<StatusFilter>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      if (role !== 'All' && u.role !== role) return false;
      if (status !== 'All' && u.status !== status) return false;
      if (!q) return true;
      return (
        (u.display_name?.toLowerCase().includes(q) ?? false) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
      );
    });
  }, [query, role, status, users]);

  return (
    <SalyCard padding={false} className="overflow-hidden">
      <div className="space-y-4 p-5">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-saly-text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, or ID…"
            className="h-9 w-full rounded-saly border border-saly-border bg-saly-bg-secondary pl-9 pr-3 text-sm text-saly-text-primary placeholder:text-saly-text-faint focus:border-saly-accent/50 focus:outline-none focus:ring-2 focus:ring-saly-accent/20"
          />
        </div>

        <SalyTabs
          tabs={ROLES.map((r) => ({
            key: r,
            label: r === 'All' ? 'All roles' : roleLabel(r),
            count: r === 'All' ? users.length : users.filter((u) => u.role === r).length,
          }))}
          active={role}
          onChange={setRole}
        />

        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={[
                'rounded-full border px-3 py-1 text-xs transition',
                status === s
                  ? 'border-white/20 bg-white/[0.08] text-saly-text-primary'
                  : 'border-saly-border text-saly-text-muted hover:text-saly-text-secondary',
              ].join(' ')}
            >
              {s === 'All' ? 'All statuses' : roleLabel(s)}
            </button>
          ))}
          <span className="ml-auto self-center text-xs text-saly-text-faint">
            {filtered.length} of {users.length} · {consumers.toLocaleString()} consumers
          </span>
        </div>
      </div>

      <div className="overflow-x-auto border-t border-saly-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-saly-border bg-saly-bg-secondary/80 text-xs text-saly-text-muted">
              <th className="px-4 py-2.5 font-medium">User</th>
              <th className="px-4 py-2.5 font-medium">Role</th>
              <th className="px-4 py-2.5 font-medium">User ID</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium">Joined</th>
              <th className="px-4 py-2.5 font-medium" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-saly-border/60 transition hover:bg-saly-bg-hover">
                <td className="px-4 py-3">
                  <Link href={`/users/${u.id}`} className="flex items-center gap-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-saly bg-white text-[10px] font-semibold text-black">
                      {initials(u)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-saly-text-primary hover:text-violet-300">
                        {u.display_name || u.email}
                      </p>
                      <p className="truncate text-[11px] text-saly-text-faint">{u.email}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <SalyBadge variant={roleVariant(u.role)}>{roleLabel(u.role)}</SalyBadge>
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-saly-text-muted">{truncateId(u.id)}</td>
                <td className="px-4 py-3">
                  <SalyBadge variant={u.status === 'ACTIVE' ? 'success' : 'danger'}>{u.status}</SalyBadge>
                </td>
                <td className="px-4 py-3 text-[11px] text-saly-text-muted">{formatDate(u.created_at)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/users/${u.id}`} className="text-xs text-saly-text-muted hover:text-saly-text-primary">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-saly-text-muted">
                  No users match your filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </SalyCard>
  );
}
