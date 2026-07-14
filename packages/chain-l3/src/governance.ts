import { encodeFunctionData, type Address, type Hex } from 'viem';

/** Standard OpenZeppelin Pausable pause()/unpause() selectors. */
export const PAUSABLE_ABI = [
  {
    type: 'function',
    name: 'pause',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    type: 'function',
    name: 'unpause',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
] as const;

export function encodePausablePause(): Hex {
  return encodeFunctionData({ abi: PAUSABLE_ABI, functionName: 'pause', args: [] });
}

export function encodePausableUnpause(): Hex {
  return encodeFunctionData({ abi: PAUSABLE_ABI, functionName: 'unpause', args: [] });
}

export function encodeContractCall(input: { contract: Address; calldata: Hex }): {
  to: Address;
  data: Hex;
  value: bigint;
} {
  return { to: input.contract, data: input.calldata, value: 0n };
}
