import { defineChain } from 'viem';
import type { L3NetworkDefinition } from './network.js';

export function l3ViemChain(def: L3NetworkDefinition, rpcUrl: string) {
  return defineChain({
    id: def.chainId,
    name: def.label,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: [rpcUrl] },
    },
  });
}
