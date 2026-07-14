/** Shared formatters for the Saly admin design system. */

export function truncateAddress(addr: string, start = 8, end = 6): string {
  if (addr.length <= start + end + 1) return addr;
  return `${addr.slice(0, start)}…${addr.slice(-end)}`;
}

export function truncateId(id: string): string {
  return truncateAddress(id, 6, 4);
}

export function formatAmount(minor: string, currency: string): string {
  const decimals = currency === 'USDC' || currency === 'USD' || currency === 'NGN' ? 2 : 6;
  const value = Number(BigInt(minor)) / 10 ** decimals;
  return `${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

export function formatCompactUsd(n: number): string {
  return `$${Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(n)}`;
}

export function relativeTime(iso: string): string {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  return `${Math.floor(sec / 86400)}d ago`;
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso.slice(0, 10);
  }
}

export function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}
