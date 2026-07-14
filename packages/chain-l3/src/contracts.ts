export const L2_OUTPUT_ORACLE_ABI = [
  {
    type: 'event',
    name: 'OutputProposed',
    inputs: [
      { name: 'outputRoot', type: 'bytes32', indexed: true },
      { name: 'l2OutputIndex', type: 'uint256', indexed: true },
      { name: 'l2BlockNumber', type: 'uint256', indexed: false },
      { name: 'l1Timestamp', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'function',
    name: 'latestBlockNumber',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'latestOutputIndex',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getL2Output',
    inputs: [{ name: '_l2OutputIndex', type: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'outputRoot', type: 'bytes32' },
          { name: 'timestamp', type: 'uint128' },
          { name: 'l2BlockNumber', type: 'uint128' },
        ],
      },
    ],
    stateMutability: 'view',
  },
] as const;

/** Emitted when batch inbox receives data (simplified — actual inbox is an EOA in bedrock). */
export const BATCH_INBOX_TOPIC = '0x' as const;

export const L1_STANDARD_BRIDGE_ABI = [
  {
    type: 'event',
    name: 'ERC20DepositInitiated',
    inputs: [
      { name: 'l1Token', type: 'address', indexed: true },
      { name: 'l2Token', type: 'address', indexed: true },
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: false },
      { name: 'amount', type: 'uint256', indexed: false },
      { name: 'extraData', type: 'bytes', indexed: false },
    ],
  },
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

export const L2_STANDARD_BRIDGE_ABI = [
  {
    type: 'event',
    name: 'WithdrawalInitiated',
    inputs: [
      { name: 'l1Token', type: 'address', indexed: true },
      { name: 'l2Token', type: 'address', indexed: true },
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: false },
      { name: 'amount', type: 'uint256', indexed: false },
      { name: 'extraData', type: 'bytes', indexed: false },
    ],
  },
  {
    type: 'function',
    name: 'withdrawTo',
    inputs: [
      { name: '_l2Token', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_amount', type: 'uint256' },
      { name: '_minGasLimit', type: 'uint32' },
      { name: '_extraData', type: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
] as const;

export const OPTIMISM_PORTAL_ABI = [
  {
    type: 'event',
    name: 'TransactionDeposited',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'version', type: 'uint256', indexed: true },
      { name: 'opaqueData', type: 'bytes', indexed: false },
    ],
  },
] as const;

/** Fault-proof settlement path — proposer creates dispute games instead of L2OutputOracle posts. */
export const DISPUTE_GAME_FACTORY_ABI = [
  {
    type: 'event',
    name: 'DisputeGameCreated',
    inputs: [
      { name: 'gameType', type: 'uint32', indexed: true },
      { name: 'rootClaim', type: 'bytes32', indexed: true },
      { name: 'extraData', type: 'bytes', indexed: true },
      { name: 'disputeGame', type: 'address', indexed: false },
    ],
  },
  {
    type: 'function',
    name: 'gameCount',
    inputs: [],
    outputs: [{ name: 'gameCount_', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const;
