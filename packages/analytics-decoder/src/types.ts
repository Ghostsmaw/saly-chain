import type { Abi } from 'viem';

export type ProtocolKind = 'erc20' | 'escrow' | 'uniswap_v3' | 'xrpl_payment' | 'custom';

export interface AbiRegistryEntry {
  readonly chainId: string;
  readonly address: string;
  readonly protocol: ProtocolKind;
  readonly abi: Abi;
  readonly label?: string;
}

export interface RawEvmLog {
  readonly address: string;
  readonly data: `0x${string}`;
  readonly topics: readonly `0x${string}`[];
  readonly txHash: string;
  readonly logIndex: number;
  readonly blockNumber: bigint;
  readonly blockHash: string;
}

export interface DecodedChainEvent {
  readonly chainId: string;
  readonly txHash: string;
  readonly logIndex: number;
  readonly blockNumber: bigint;
  readonly blockHash: string;
  readonly contractAddress: string;
  readonly eventName: string;
  readonly protocol: ProtocolKind;
  readonly args: Record<string, unknown>;
}

export interface DecodedTransfer {
  readonly chainId: string;
  readonly txHash: string;
  readonly logIndex: number;
  readonly blockNumber: bigint;
  readonly blockHash: string;
  readonly tokenAddress: string;
  readonly tokenSymbol: string;
  readonly from: string;
  readonly to: string;
  readonly amountRaw: string;
  readonly transferType: 'erc20' | 'xrpl_native' | 'xrpl_iou';
  readonly ts: string;
}

export interface DecodedBlock {
  readonly chainId: string;
  readonly blockNumber: bigint;
  readonly blockHash: string;
  readonly ts: string;
}
