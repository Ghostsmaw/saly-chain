import type { UserDto } from '@salychain/sdk-internal';

export const BUSINESS_STATUS_FILTERS = ['All', 'ACTIVE', 'SUSPENDED'] as const;
export type BusinessStatusFilter = (typeof BUSINESS_STATUS_FILTERS)[number];

export function businessStatusVariant(status: string): 'success' | 'danger' | 'neutral' {
  switch (status) {
    case 'ACTIVE':
      return 'success';
    case 'SUSPENDED':
      return 'danger';
    default:
      return 'neutral';
  }
}

export function businessInitials(user: UserDto): string {
  const base = user.display_name?.trim() || user.email;
  return base
    .split(/[\s@.]+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function computeBusinessStats(businesses: UserDto[]) {
  const active = businesses.filter((b) => b.status === 'ACTIVE').length;
  const suspended = businesses.filter((b) => b.status === 'SUSPENDED').length;
  return {
    loaded: businesses.length,
    active,
    suspended,
    other: businesses.length - active - suspended,
  };
}

export function filterBusinesses(
  businesses: UserDto[],
  query: string,
  status: BusinessStatusFilter,
): UserDto[] {
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
}
