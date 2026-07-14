import type { Address } from 'viem';
import type { L3Network } from './network.js';
import { loadDeploymentManifest } from './deployments.js';

export type L3Asset = 'USDC' | 'ETH';

export interface L3AssetDefinition {
  symbol: L3Asset;
  decimals: number;
  address?: Address;
}

export const L3_ASSETS: Record<L3Network, Record<L3Asset, L3AssetDefinition>> = {
  'saly-devnet': {
    USDC: { symbol: 'USDC', decimals: 6 },
    ETH: { symbol: 'ETH', decimals: 18 },
  },
  'saly-testnet': {
    USDC: { symbol: 'USDC', decimals: 6 },
    ETH: { symbol: 'ETH', decimals: 18 },
  },
  'saly-mainnet': {
    USDC: { symbol: 'USDC', decimals: 6 },
    ETH: { symbol: 'ETH', decimals: 18 },
  },
};

export function resolveUsdcAddress(network: L3Network, cwd = process.cwd()): Address | undefined {
  const fromEnv = process.env.L3_USDC_ADDRESS;
  if (fromEnv && /^0x[a-fA-F0-9]{40}$/.test(fromEnv)) return fromEnv as Address;

  const manifest = loadDeploymentManifest(cwd);
  if (manifest?.assets?.USDC) return manifest.assets.USDC;

  return L3_ASSETS[network].USDC.address;
}

export function resolveSalysdAddress(_network: L3Network, cwd = process.cwd()): Address | undefined {
  const fromEnv = process.env.L3_SALYSD_ADDRESS;
  if (fromEnv && /^0x[a-fA-F0-9]{40}$/.test(fromEnv)) return fromEnv as Address;

  const manifest = loadDeploymentManifest(cwd);
  if (manifest?.assets?.SalySD) return manifest.assets.SalySD;

  return undefined;
}

export function resolveAttestationRegistryAddress(_network: L3Network, cwd = process.cwd()): Address | undefined {
  const fromEnv = process.env.L3_ATTESTATION_REGISTRY_ADDRESS;
  if (fromEnv && /^0x[a-fA-F0-9]{40}$/.test(fromEnv)) return fromEnv as Address;

  const manifest = loadDeploymentManifest(cwd);
  if (manifest?.assets?.SalyAttestationRegistry) return manifest.assets.SalyAttestationRegistry;

  return undefined;
}

/** Canonical bridged ERC-20 on L3 — SalySD on testnet/mainnet, USDC on devnet. */
export function resolveBridgeL2TokenAddress(
  network: L3Network,
  asset: 'USDC' = 'USDC',
  cwd = process.cwd(),
): Address | undefined {
  if (asset !== 'USDC') return undefined;
  if (network === 'saly-testnet' || network === 'saly-mainnet') {
    return resolveSalysdAddress(network, cwd) ?? resolveUsdcAddress(network, cwd);
  }
  return resolveUsdcAddress(network, cwd);
}

export function getL3Asset(network: L3Network, symbol: L3Asset): L3AssetDefinition {
  if (symbol === 'USDC') {
    const address = resolveUsdcAddress(network);
    return { symbol: 'USDC', decimals: 6, ...(address ? { address } : {}) };
  }
  return L3_ASSETS[network].ETH;
}

/** SalyTestUSDC is devnet-only — fail closed on testnet/mainnet deploy paths. */
export function assertSalyTestUsdcDevnetOnly(network: L3Network): void {
  if (network !== 'saly-devnet') {
    throw new Error(
      `SalyTestUSDC is deprecated on ${network}. Use SalySD (deploy-salysd.sh) for testnet/mainnet.`,
    );
  }
}

export function withL3UsdcAddress(network: L3Network, address: Address): void {
  L3_ASSETS[network].USDC = { symbol: 'USDC', decimals: 6, address };
}
