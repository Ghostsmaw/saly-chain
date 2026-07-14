import type { Address } from 'viem';
import type { BaseNetwork } from './assets.js';
import { BASE_ASSETS } from './assets.js';

/** On-chain DEX token symbols (distinct from ledger fiat codes). */
export type DexTokenSymbol = 'USDC' | 'WETH' | 'DAI';

export interface DexTokenDefinition {
  symbol: DexTokenSymbol;
  decimals: number;
  address: Address;
  label: string;
}

/** WETH9 — canonical on Base (native ETH wraps to this for Uniswap). */
export const WETH_ADDRESS: Record<BaseNetwork, Address> = {
  'base-mainnet': '0x4200000000000000000000000000000000000006',
  'base-sepolia': '0x4200000000000000000000000000000000000006',
};

/** Circle / MakerDAO deployments on Base. */
const DAI_ADDRESS: Partial<Record<BaseNetwork, Address>> = {
  'base-mainnet': '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
};

export const DEX_TOKEN_REGISTRY: Record<BaseNetwork, DexTokenDefinition[]> = {
  'base-mainnet': [
    {
      symbol: 'USDC',
      decimals: 6,
      address: BASE_ASSETS['base-mainnet'].USDC.address!,
      label: 'USD Coin',
    },
    {
      symbol: 'WETH',
      decimals: 18,
      address: WETH_ADDRESS['base-mainnet'],
      label: 'Wrapped Ether',
    },
    {
      symbol: 'DAI',
      decimals: 18,
      address: DAI_ADDRESS['base-mainnet']!,
      label: 'Dai Stablecoin',
    },
  ],
  'base-sepolia': [
    {
      symbol: 'USDC',
      decimals: 6,
      address: BASE_ASSETS['base-sepolia'].USDC.address!,
      label: 'USD Coin (testnet)',
    },
    {
      symbol: 'WETH',
      decimals: 18,
      address: WETH_ADDRESS['base-sepolia'],
      label: 'Wrapped Ether',
    },
  ],
};

export interface DexPairDefinition {
  tokenIn: DexTokenSymbol;
  tokenOut: DexTokenSymbol;
  /** Uniswap V3 fee tier (e.g. 100 = 0.01%, 3000 = 0.3%). */
  poolFee: number;
  networks: BaseNetwork[];
}

/** Curated pairs with verified Uniswap V3 pools on Base. */
export const DEX_PAIR_DEFINITIONS: DexPairDefinition[] = [
  { tokenIn: 'USDC', tokenOut: 'WETH', poolFee: 3000, networks: ['base-mainnet', 'base-sepolia'] },
  { tokenIn: 'WETH', tokenOut: 'USDC', poolFee: 3000, networks: ['base-mainnet', 'base-sepolia'] },
  { tokenIn: 'USDC', tokenOut: 'DAI', poolFee: 100, networks: ['base-mainnet'] },
  { tokenIn: 'DAI', tokenOut: 'USDC', poolFee: 100, networks: ['base-mainnet'] },
  { tokenIn: 'WETH', tokenOut: 'DAI', poolFee: 3000, networks: ['base-mainnet'] },
  { tokenIn: 'DAI', tokenOut: 'WETH', poolFee: 3000, networks: ['base-mainnet'] },
];

export function dexTokenDefinition(
  network: BaseNetwork,
  symbol: DexTokenSymbol,
): DexTokenDefinition | undefined {
  return DEX_TOKEN_REGISTRY[network].find((t) => t.symbol === symbol);
}

export function getDexTokenAddress(network: BaseNetwork, symbol: DexTokenSymbol): Address {
  const token = dexTokenDefinition(network, symbol);
  if (!token) {
    throw new Error(`DEX token ${symbol} is not configured on ${network}`);
  }
  return token.address;
}

export function dexTokenDecimals(symbol: DexTokenSymbol, network?: BaseNetwork): number {
  if (network) {
    const token = dexTokenDefinition(network, symbol);
    if (token) return token.decimals;
  }
  if (symbol === 'USDC') return 6;
  return 18;
}

export function listDexTokens(network: BaseNetwork): DexTokenDefinition[] {
  return DEX_TOKEN_REGISTRY[network];
}

export function getDexPairConfig(
  network: BaseNetwork,
  tokenIn: string,
  tokenOut: string,
): DexPairDefinition | undefined {
  const a = tokenIn.toUpperCase() as DexTokenSymbol;
  const b = tokenOut.toUpperCase() as DexTokenSymbol;
  return DEX_PAIR_DEFINITIONS.find(
    (p) => p.tokenIn === a && p.tokenOut === b && p.networks.includes(network),
  );
}

export function isDexPairSupported(
  network: BaseNetwork,
  tokenIn: string,
  tokenOut: string,
): boolean {
  return getDexPairConfig(network, tokenIn, tokenOut) !== undefined;
}

export function listDexPairs(network: BaseNetwork): Array<{
  from: DexTokenSymbol;
  to: DexTokenSymbol;
  pool_fee: number;
}> {
  return DEX_PAIR_DEFINITIONS.filter((p) => p.networks.includes(network)).map((p) => ({
    from: p.tokenIn,
    to: p.tokenOut,
    pool_fee: p.poolFee,
  }));
}

export function dexPairKey(tokenIn: string, tokenOut: string): string {
  return `${tokenIn.toUpperCase()}:${tokenOut.toUpperCase()}`;
}

/** @deprecated Use isDexPairSupported(network, ...) — kept for callers without network context. */
export const DEX_SUPPORTED_PAIRS = new Set(
  DEX_PAIR_DEFINITIONS.flatMap((p) =>
    p.networks.flatMap((n) => (n === 'base-sepolia' ? [dexPairKey(p.tokenIn, p.tokenOut)] : [])),
  ),
);
