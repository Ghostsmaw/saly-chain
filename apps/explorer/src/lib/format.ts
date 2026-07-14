import type { ChipTone } from '@salychain/ui';

export function shortHash(value: string | undefined, lead = 8, tail = 6): string {
  if (!value) return '—';
  if (value.length <= lead + tail + 1) return value;
  return `${value.slice(0, lead)}…${value.slice(-tail)}`;
}

const CHAIN_LABELS: Record<string, string> = {
  base: 'Base',
  xrpl: 'XRPL',
  'saly-mainnet': 'Saly L3',
  'saly-testnet': 'Saly L3 (testnet)',
  'saly-devnet': 'Saly L3 (devnet)',
};

export function chainLabel(chainId: string): string {
  return CHAIN_LABELS[chainId] ?? chainId;
}

export function chainTone(chainId: string): ChipTone {
  if (chainId === 'base') return 'info';
  if (chainId === 'xrpl') return 'brand';
  if (chainId.startsWith('saly')) return 'success';
  return 'neutral';
}

const TOKEN_DECIMALS: Record<string, number> = {
  USDC: 6,
  USDT: 6,
  EURC: 6,
  XRP: 6,
};

function groupDigits(intStr: string): string {
  return intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** Format a minor-unit amount string using the token's decimals (best effort). */
export function formatTokenAmount(raw: string | undefined, symbol: string): string {
  if (!raw) return '0';
  const decimals = TOKEN_DECIMALS[symbol] ?? 0;
  try {
    const bi = BigInt(raw);
    if (decimals === 0) return groupDigits(bi.toString());
    const base = 10n ** BigInt(decimals);
    const whole = bi / base;
    const frac = (bi % base).toString().padStart(decimals, '0').slice(0, 2);
    return `${groupDigits(whole.toString())}.${frac}`;
  } catch {
    return raw;
  }
}

export function formatNumber(value: number | string | undefined, maxFractionDigits = 2): string {
  const n = typeof value === 'string' ? Number(value) : value;
  if (n === undefined || Number.isNaN(n)) return '0';
  return n.toLocaleString('en-US', { maximumFractionDigits: maxFractionDigits });
}

/** ClickHouse returns DateTime64 as 'YYYY-MM-DD HH:MM:SS.fff' (UTC). */
function parseTs(ts: string | undefined): Date | null {
  if (!ts) return null;
  const iso = ts.includes('T') ? ts : `${ts.replace(' ', 'T')}Z`;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function timeAgo(ts: string | undefined): string {
  const d = parseTs(ts);
  if (!d) return '—';
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return `${Math.max(seconds, 0)}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function formatTimestamp(ts: string | undefined): string {
  const d = parseTs(ts);
  return d ? d.toISOString().replace('T', ' ').replace('.000Z', ' UTC') : '—';
}

export function statusTone(status: string | undefined): ChipTone {
  switch ((status ?? '').toLowerCase()) {
    case 'settled':
      return 'success';
    case 'failed':
    case 'rejected':
      return 'danger';
    case 'in_flight':
    case 'awaiting_confirmation':
    case 'executing':
    case 'routed':
      return 'warning';
    default:
      return 'neutral';
  }
}
