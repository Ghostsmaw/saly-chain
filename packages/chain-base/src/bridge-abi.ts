/** OP-Stack L1StandardBridge — minimal surface for custodial deposits. */
export const L1_STANDARD_BRIDGE_DEPOSIT_ABI = [
  {
    type: 'function',
    name: 'depositERC20To',
    inputs: [
      { name: '_l1Token', type: 'address' },
      { name: '_l2Token', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_amount', type: 'uint256' },
      { name: '_minGasLimit', type: 'uint32' },
      { name: '_extraData', type: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

export const DEFAULT_BRIDGE_MIN_GAS_LIMIT = 200_000;
