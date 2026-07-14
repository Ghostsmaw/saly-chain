import { keccak256, stringToBytes, type Address, type Hex } from 'viem';

/** On-chain SalyEscrow deal status (matches Solidity enum). */
export const ESCROW_DEAL_STATUS = {
  NONE: 0,
  FUNDED: 1,
  RELEASED: 2,
  REFUNDED: 3,
} as const;

export type EscrowDealStatusCode = (typeof ESCROW_DEAL_STATUS)[keyof typeof ESCROW_DEAL_STATUS];

export function escrowStatusLabel(status: number): 'NONE' | 'FUNDED' | 'RELEASED' | 'REFUNDED' | 'UNKNOWN' {
  switch (status) {
    case ESCROW_DEAL_STATUS.NONE:
      return 'NONE';
    case ESCROW_DEAL_STATUS.FUNDED:
      return 'FUNDED';
    case ESCROW_DEAL_STATUS.RELEASED:
      return 'RELEASED';
    case ESCROW_DEAL_STATUS.REFUNDED:
      return 'REFUNDED';
    default:
      return 'UNKNOWN';
  }
}

/** Minimal SalyEscrow ABI — fund, resolve, read, and audit events. */
export const SALY_ESCROW_ABI = [
  {
    type: 'function',
    name: 'fundDeal',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'dealId', type: 'bytes32' },
      { name: 'payee', type: 'address' },
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint128' },
      { name: 'deadline', type: 'uint64' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'release',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'dealId', type: 'bytes32' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'refund',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'dealId', type: 'bytes32' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'resolver',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
  },
  {
    type: 'function',
    name: 'deals',
    stateMutability: 'view',
    inputs: [{ name: 'dealId', type: 'bytes32' }],
    outputs: [
      { name: 'payer', type: 'address' },
      { name: 'payee', type: 'address' },
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint128' },
      { name: 'deadline', type: 'uint64' },
      { name: 'status', type: 'uint8' },
    ],
  },
  {
    type: 'event',
    name: 'DealFunded',
    inputs: [
      { name: 'dealId', type: 'bytes32', indexed: true },
      { name: 'payer', type: 'address', indexed: true },
      { name: 'payee', type: 'address', indexed: true },
      { name: 'token', type: 'address', indexed: false },
      { name: 'amount', type: 'uint128', indexed: false },
      { name: 'deadline', type: 'uint64', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'DealReleased',
    inputs: [
      { name: 'dealId', type: 'bytes32', indexed: true },
      { name: 'payee', type: 'address', indexed: true },
      { name: 'amount', type: 'uint128', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'DealRefunded',
    inputs: [
      { name: 'dealId', type: 'bytes32', indexed: true },
      { name: 'payer', type: 'address', indexed: true },
      { name: 'amount', type: 'uint128', indexed: false },
    ],
  },
] as const;

export interface OnChainEscrowDeal {
  payer: Address;
  payee: Address;
  token: Address;
  amount: bigint;
  deadline: bigint;
  status: EscrowDealStatusCode;
}

/**
 * Derive a deterministic on-chain deal id from an internal correlation id
 * (execution transaction id, intent id, etc.).
 */
export function dealIdFromCorrelationId(correlationId: string): Hex {
  return keccak256(stringToBytes(correlationId));
}

export function isEscrowDealId(value: string): value is Hex {
  return /^0x[a-fA-F0-9]{64}$/.test(value);
}
