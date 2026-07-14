import { encodeFunctionData, type Hex } from 'viem';

export const RESERVE_ORACLE_ABI = [
  {
    type: 'function',
    name: 'updateAttestation',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'newCeiling', type: 'uint256' },
      { name: 'newAttestationHash', type: 'bytes32' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'authorizedMintCeiling',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'reserveAttestationHash',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'bytes32' }],
  },
  {
    type: 'function',
    name: 'lastAttestationAt',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint64' }],
  },
] as const;

export const SALYSD_SUPPLY_ABI = [
  {
    type: 'function',
    name: 'totalSupply',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
] as const;

export function encodeReserveOracleUpdate(input: {
  ceilingMinor: bigint;
  attestationHash: Hex;
}): Hex {
  return encodeFunctionData({
    abi: RESERVE_ORACLE_ABI,
    functionName: 'updateAttestation',
    args: [input.ceilingMinor, input.attestationHash],
  });
}

export interface ReserveOracleState {
  authorizedMintCeiling: bigint;
  reserveAttestationHash: Hex;
  lastAttestationAt: bigint;
}
