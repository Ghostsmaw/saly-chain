import type { Address, Hex } from 'viem';
import { encodeFunctionData } from 'viem';
import { L1_STANDARD_BRIDGE_ABI, L2_STANDARD_BRIDGE_ABI } from '../contracts.js';

/** Default min gas limit for OP-Stack standard bridge messages. */
export const DEFAULT_BRIDGE_MIN_GAS_LIMIT = 200_000;

export function encodeDepositErc20To(input: {
  l1Token: Address;
  l2Token: Address;
  l2Recipient: Address;
  amountMinor: bigint;
  minGasLimit?: number;
  extraData?: Hex;
}): Hex {
  return encodeFunctionData({
    abi: L1_STANDARD_BRIDGE_ABI,
    functionName: 'depositERC20To',
    args: [
      input.l1Token,
      input.l2Token,
      input.l2Recipient,
      input.amountMinor,
      input.minGasLimit ?? DEFAULT_BRIDGE_MIN_GAS_LIMIT,
      input.extraData ?? '0x',
    ],
  });
}

export function encodeWithdrawTo(input: {
  l2Token: Address;
  l1Recipient: Address;
  amountMinor: bigint;
  minGasLimit?: number;
  extraData?: Hex;
}): Hex {
  return encodeFunctionData({
    abi: L2_STANDARD_BRIDGE_ABI,
    functionName: 'withdrawTo',
    args: [
      input.l2Token,
      input.l1Recipient,
      input.amountMinor,
      input.minGasLimit ?? DEFAULT_BRIDGE_MIN_GAS_LIMIT,
      input.extraData ?? '0x',
    ],
  });
}
