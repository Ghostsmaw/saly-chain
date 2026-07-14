import type { Chain } from './domain.js';

export type ChainOperationalStatus = 'live' | 'schema_only' | 'internal';

export interface ChainDefinition {
  id: Chain;
  label: string;
  nativeAsset: string;
  status: ChainOperationalStatus;
  /** Human-readable capability summary for dashboards */
  summary: string;
  explorerTxUrl?: (hash: string) => string;
}

export const CHAIN_DEFINITIONS: readonly ChainDefinition[] = [
  {
    id: 'BASE',
    label: 'Base',
    nativeAsset: 'USDC',
    status: 'live',
    summary: 'EVM L2 — USDC payouts, DEX swaps, escrow',
    explorerTxUrl: (hash) => `https://sepolia.basescan.org/tx/${hash}`,
  },
  {
    id: 'XRPL',
    label: 'XRPL',
    nativeAsset: 'XRP',
    status: 'live',
    summary: 'Native XRP and issued IOU (USD/EUR) transfers',
    explorerTxUrl: (hash) => `https://testnet.xrpl.org/transactions/${hash}`,
  },
  {
    id: 'SALY_L3',
    label: 'Saly L3',
    nativeAsset: 'USDC',
    status: 'live',
    summary: 'OP-Stack L3 devnet — USDC payouts on dedicated blockspace',
    explorerTxUrl: (hash) => `https://explorer.salychain.example/tx/saly-mainnet/${hash}`,
  },
  {
    id: 'INTERNAL',
    label: 'Internal',
    nativeAsset: 'USD',
    status: 'internal',
    summary: 'Synthetic ledger-only wallet — no on-chain broadcast',
  },
  {
    id: 'ETHEREUM',
    label: 'Ethereum',
    nativeAsset: 'USDC',
    status: 'schema_only',
    summary: 'Schema reserved — adapter, dispatcher, and listener not implemented',
  },
  {
    id: 'POLYGON',
    label: 'Polygon',
    nativeAsset: 'USDC',
    status: 'schema_only',
    summary: 'Schema reserved — adapter, dispatcher, and listener not implemented',
  },
] as const;

export const OPERATIONAL_WALLET_CHAINS: readonly Chain[] = ['BASE', 'XRPL', 'SALY_L3', 'INTERNAL'];

export const SCHEMA_ONLY_CHAINS: readonly Chain[] = ['ETHEREUM', 'POLYGON'];

export const TRANSFER_WALLET_CHAINS: readonly Chain[] = ['BASE', 'XRPL', 'SALY_L3'];

export function chainDefinition(chain: Chain | string): ChainDefinition | undefined {
  return CHAIN_DEFINITIONS.find((c) => c.id === chain);
}

export function isOperationalWalletChain(chain: Chain | string): boolean {
  return (OPERATIONAL_WALLET_CHAINS as readonly string[]).includes(chain);
}

export function isTransferWalletChain(chain: Chain | string): boolean {
  return (TRANSFER_WALLET_CHAINS as readonly string[]).includes(chain);
}

export function isSchemaOnlyChain(chain: Chain | string): boolean {
  return (SCHEMA_ONLY_CHAINS as readonly string[]).includes(chain);
}

export function assertProvisionableChain(chain: Chain): void {
  if (isSchemaOnlyChain(chain)) {
    throw new Error(
      `Chain ${chain} is reserved in schema only — provision BASE, XRPL, or SALY_L3 (see docs/runbooks/s6-l3-money-rail.md)`,
    );
  }
}
