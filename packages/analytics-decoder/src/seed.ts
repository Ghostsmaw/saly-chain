import { BASE_ASSETS, ERC20_ABI, SALY_ESCROW_ABI, type BaseNetwork } from '@salychain/chain-base';
import type { AbiRegistryEntry } from './types.js';

/** Map Base network env to analytics chain_id used in ClickHouse. */
export function baseChainId(_network: BaseNetwork): string {
  return 'base';
}

/** Seed ERC-20 + SalyEscrow ABIs from chain-base for a Base deployment. */
export function baseRegistryEntries(
  network: BaseNetwork,
  escrowAddress?: string,
): AbiRegistryEntry[] {
  const chainId = baseChainId(network);
  const entries: AbiRegistryEntry[] = [];
  const usdc = BASE_ASSETS[network].USDC.address;
  if (usdc) {
    entries.push({
      chainId,
      address: usdc,
      protocol: 'erc20',
      abi: ERC20_ABI,
      label: 'USDC',
    });
  }
  if (escrowAddress) {
    entries.push({
      chainId,
      address: escrowAddress,
      protocol: 'escrow',
      abi: SALY_ESCROW_ABI,
      label: 'SalyEscrow',
    });
  }
  return entries;
}

/** L3 uses the same ERC-20 ABI; chain_id is the l3 network slug. */
export function l3RegistryEntries(l3Network: string, usdcAddress: string): AbiRegistryEntry[] {
  return [
    {
      chainId: l3Network,
      address: usdcAddress,
      protocol: 'erc20',
      abi: ERC20_ABI,
      label: 'USDC',
    },
  ];
}

/** XRPL has no contract ABIs; payments are decoded at the transaction layer. */
export function xrplRegistryPlaceholder(): AbiRegistryEntry[] {
  return [];
}
