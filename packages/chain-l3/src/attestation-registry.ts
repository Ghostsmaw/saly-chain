import { encodeFunctionData, keccak256, toHex, type Address, type Hex } from 'viem';

export const ATTESTATION_REGISTRY_ABI = [
  {
    type: 'function',
    name: 'setAccreditedIssuer',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'issuer', type: 'address' },
      { name: 'accredited', type: 'bool' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'verify',
    stateMutability: 'view',
    inputs: [{ name: 'id', type: 'bytes32' }],
    outputs: [
      { name: 'valid', type: 'bool' },
      {
        name: 'record',
        type: 'tuple',
        components: [
          { name: 'schemaId', type: 'bytes32' },
          { name: 'issuer', type: 'address' },
          { name: 'subject', type: 'bytes32' },
          { name: 'dataHash', type: 'bytes32' },
          { name: 'issuedAt', type: 'uint64' },
          { name: 'expiresAt', type: 'uint64' },
          { name: 'revoked', type: 'bool' },
        ],
      },
    ],
  },
  {
    type: 'function',
    name: 'accreditedIssuers',
    stateMutability: 'view',
    inputs: [{ name: 'issuer', type: 'address' }],
    outputs: [{ type: 'bool' }],
  },
] as const;

export function encodeSetAccreditedIssuer(input: { issuer: Address; accredited: boolean }): Hex {
  return encodeFunctionData({
    abi: ATTESTATION_REGISTRY_ABI,
    functionName: 'setAccreditedIssuer',
    args: [input.issuer, input.accredited],
  });
}

export function attestationIdFromString(id: string): Hex {
  if (id.startsWith('0x') && id.length === 66) return id as Hex;
  return keccak256(toHex(id));
}
