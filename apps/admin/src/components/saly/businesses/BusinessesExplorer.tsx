'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { UserDto } from '@salychain/sdk-internal';
import {
  BUSINESS_STATUS_FILTERS,
  type BusinessStatusFilter,
  businessInitials,
  businessStatusVariant,
} from '@/lib/saly-businesses';
import { formatDate, truncateId } from '@/lib/saly-format';
import { SalyBadge, SalyCard } from '@/components/saly/ui';

function statusLabel(status: BusinessStatusFilter): string {
  if (status === 'All') return 'All statuses';
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function BusinessesExplorer({ businesses }: { businesses: UserDto[] }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<BusinessStatusFilter>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return businesses.filter((b) => {
      if (status !== 'All' && b.status !== status) return false;
      if (!q) return true;
      return (
        (b.display_name?.toLowerCase().includes(q) ?? false) ||
        b.email.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    });
  }, [businesses, query, status]);

  return (
    <SalyCard padding={false} className="overflow-hidden">
      <div className="space-y-4 p-5">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-saly-text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search organization, email, or ID…"
            className="h-9 w-full rounded-saly border border-saly-border bg-saly-bg-secondary pl-9 pr-3 text-sm text-saly-text-primary placeholder:text-saly-text-faint focus:border-saly-accent/50 focus:outline-none focus:ring-2 focus:ring-saly-accent/20"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {BUSINESS_STATUS_FILTERS.map((s) => (
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
              {statusLabel(s)}
              {s !== 'All' ? (
                <span className="ml-1.5 text-saly-text-faint">
                  {businesses.filter((b) => b.status === s).length}
                </span>
              ) : null}
            </button>
          ))}
          <span className="ml-auto self-center text-xs text-saly-text-faint">
            {filtered.length} of {businesses.length} organizations
          </span>
        </div>
      </div>

      <div className="overflow-x-auto border-t border-saly-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-saly-border bg-saly-bg-secondary/80 text-xs text-saly-text-muted">
              <th className="px-4 py-2.5 font-medium">Organization</th>
              <th className="px-4 py-2.5 font-medium">Account ID</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium">Joined</th>
              <th className="px-4 py-2.5 font-medium" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b border-saly-border/60 transition hover:bg-saly-bg-hover">
                <td className="px-4 py-3">
                  <Link href={`/users/${b.id}`} className="flex items-center gap-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-saly bg-white text-[10px] font-semibold text-black">
                      {businessInitials(b)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-saly-text-primary hover:text-violet-300">
                        {b.display_name || b.email}
                      </p>
                      <p className="truncate text-[11px] text-saly-text-faint">{b.email}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-saly-text-muted">{truncateId(b.id)}</td>
                <td className="px-4 py-3">
                  <SalyBadge variant={businessStatusVariant(b.status)} dot>
                    {b.status}
                  </SalyBadge>
                </td>
                <td className="px-4 py-3 text-[11px] text-saly-text-muted">{formatDate(b.created_at)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/users/${b.id}`} className="text-xs text-saly-text-muted hover:text-saly-text-primary">
                    View profile
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-saly-text-muted">
                  No organizations match your filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </SalyCard>
  );
}
