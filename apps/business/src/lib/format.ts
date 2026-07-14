import { Money, type CurrencyCode } from '@salychain/money';
import type { TransactionDto } from '@salychain/sdk-internal';
import { chainDefinition } from '@salychain/types';

const DECIMALS: Record<string, number> = {
  USD: 2,
  USDC: 2,
  USDT: 2,
  NGN: 2,
  GHS: 2,
  KES: 2,
  XRP: 6,
  ETH: 18,
  WETH: 18,
  DAI: 18,
};

export function currencyDecimals(currency: string): number {
  return DECIMALS[currency] ?? 2;
}

export function formatMinor(minor: string, currency: string): string {
  try {
    return Money.ofMinor(minor, currency as CurrencyCode).format();
  } catch {
    const decimals = currencyDecimals(currency);
    const value = Number(BigInt(minor)) / 10 ** decimals;
    return `${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: decimals })} ${currency}`;
  }
}

export function formatMinorCompact(minor: string, currency: string): string {
  const decimals = currencyDecimals(currency);
  const value = Number(BigInt(minor)) / 10 ** decimals;
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
}

export function toneForTxState(
  state: TransactionDto['state'],
): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  switch (state) {
    case 'SETTLED':
      return 'success';
    case 'FAILED':
    case 'REJECTED':
      return 'danger';
    case 'REVERSING':
    case 'REVERSED':
      return 'warning';
    case 'AWAITING_CONFIRMATION':
    case 'EXECUTING':
    case 'AWAITING_APPROVAL':
      return 'info';
    default:
      return 'neutral';
  }
}

export function chainLabel(chain: string): string {
  return chainDefinition(chain)?.label ?? chain;
}

export function chainAsset(chain: string): string {
  return chainDefinition(chain)?.nativeAsset ?? 'USD';
}

export function chainExplorerUrl(chain: string, hash: string): string | undefined {
  if (chain === 'BASE') return baseExplorerUrl(hash);
  return chainDefinition(chain)?.explorerTxUrl?.(hash);
}

export function baseExplorerUrl(hash: string): string {
  const network = process.env.NEXT_PUBLIC_BASE_NETWORK ?? 'base-sepolia';
  const root = network === 'base-mainnet' ? 'https://basescan.org' : 'https://sepolia.basescan.org';
  return `${root}/tx/${hash}`;
}

export function truncateMiddle(value: string, head = 6, tail = 4): string {
  if (value.length <= head + tail + 1) return value;
  return `${value.slice(0, head)}…${value.slice(-tail)}`;
}

export function usdLike(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
