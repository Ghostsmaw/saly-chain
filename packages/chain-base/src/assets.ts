import type { Address } from 'viem';

/**
 * Registry of supported assets on Base by network. Decimals are encoded
 * because they're consumed by the ledger / money layer and we'd rather
 * fail loudly than guess.
 */

export type BaseNetwork = 'base-mainnet' | 'base-sepolia';
export type BaseAsset = 'USDC' | 'ETH';

export interface AssetDefinition {
  symbol: BaseAsset;
  decimals: number;
  /** Contract address; undefined for the native asset (ETH). */
  address?: Address;
}

export const BASE_ASSETS: Record<BaseNetwork, Record<BaseAsset, AssetDefinition>> = {
  'base-mainnet': {
    USDC: {
      symbol: 'USDC',
      decimals: 6,
      address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    },
    ETH: { symbol: 'ETH', decimals: 18 },
  },
  'base-sepolia': {
    // Circle's official testnet USDC on Base Sepolia.
    USDC: {
      symbol: 'USDC',
      decimals: 6,
      address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    },
    ETH: { symbol: 'ETH', decimals: 18 },
  },
};

export function getAsset(network: BaseNetwork, symbol: BaseAsset): AssetDefinition {
  const asset = BASE_ASSETS[network][symbol];
  if (!asset) throw new Error(`Asset ${symbol} not configured on ${network}`);
  return asset;
}
