import { encodeFunctionData, type Address, type Hex } from 'viem';

/** Minimal ABI for SalySD mint / burnFrom (Milestone D4). */
export const SALYSD_ABI = [
  {
    type: 'function',
    name: 'mint',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'burnFrom',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [],
  },
] as const;

export function encodeSalysdMint(input: { to: Address; amountMinor: bigint }): Hex {
  return encodeFunctionData({
    abi: SALYSD_ABI,
    functionName: 'mint',
    args: [input.to, input.amountMinor],
  });
}

export function encodeSalysdBurnFrom(input: { from: Address; amountMinor: bigint }): Hex {
  return encodeFunctionData({
    abi: SALYSD_ABI,
    functionName: 'burnFrom',
    args: [input.from, input.amountMinor],
  });
}
