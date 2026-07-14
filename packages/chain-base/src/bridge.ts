import { encodeFunctionData, type Address, type Hex } from 'viem';
import { L1_STANDARD_BRIDGE_DEPOSIT_ABI, DEFAULT_BRIDGE_MIN_GAS_LIMIT } from './bridge-abi.js';

/** Pure calldata encoder for L1StandardBridge.depositERC20To (Base → L3). */
export function encodeDepositErc20To(input: {
  l1Token: Address;
  l2Token: Address;
  l2Recipient: Address;
  amountMinor: bigint;
  minGasLimit?: number;
  extraData?: Hex;
}): Hex {
  return encodeFunctionData({
    abi: L1_STANDARD_BRIDGE_DEPOSIT_ABI,
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
