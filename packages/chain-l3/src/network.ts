/** SalyChain L3 network identifier. */
export type L3Network = 'saly-devnet' | 'saly-testnet' | 'saly-mainnet';

/** Settlement layer (L1 for the L3 rollup). */
export type L3SettlementNetwork = 'base-sepolia' | 'base-mainnet';

export interface L3SettlementContracts {
  /** L2OutputOracle on Base — proposer posts output roots here (legacy path). */
  l2OutputOracle?: `0x${string}`;
  /** DisputeGameFactory on Base — fault-proof settlement path (production). */
  disputeGameFactory?: `0x${string}`;
  /** BatchInbox address on Base — batcher submits channel data here. */
  batchInbox?: `0x${string}`;
  /** OptimismPortal on Base — deposits/withdrawals (future). */
  optimismPortal?: `0x${string}`;
}

export interface L3NetworkDefinition {
  id: L3Network;
  label: string;
  chainId: number;
  settlement: L3SettlementNetwork;
  settlementChainId: number;
  /** Default L3 execution RPC (op-geth). Set after devnet deploy. */
  defaultRpcUrl?: string;
  /** Contracts deployed on the settlement layer (Base). */
  settlementContracts: L3SettlementContracts;
}

/** OP-Stack sequencer components — documentation + admin UI. */
export interface SequencerComponent {
  id: string;
  label: string;
  description: string;
  /** Process / container name in devnet compose */
  process: string;
  status: 'required' | 'optional' | 'future';
}

export const SEQUENCER_COMPONENTS: readonly SequencerComponent[] = [
  {
    id: 'op-geth',
    label: 'op-geth',
    description: 'L3 execution client — produces blocks, serves JSON-RPC',
    process: 'saly-l3-geth',
    status: 'required',
  },
  {
    id: 'op-node',
    label: 'op-node',
    description: 'Rollup driver — derives L3 chain from batches on Base',
    process: 'saly-l3-node',
    status: 'required',
  },
  {
    id: 'op-batcher',
    label: 'op-batcher',
    description: 'Posts compressed L3 transaction batches to Base BatchInbox',
    process: 'saly-l3-batcher',
    status: 'required',
  },
  {
    id: 'op-proposer',
    label: 'op-proposer',
    description: 'Submits L2 output roots to Base L2OutputOracle',
    process: 'saly-l3-proposer',
    status: 'required',
  },
  {
    id: 'sequencer',
    label: 'Sequencer',
    description: 'Orders L3 transactions before batching (enabled on op-node in devnet)',
    process: 'saly-l3-node (sequencer mode)',
    status: 'required',
  },
  {
    id: 'conductor',
    label: 'Conductor (HA)',
    description: 'Raft leader election for multi-sequencer production (D3)',
    process: 'saly-l3-conductor',
    status: 'required',
  },
  {
    id: 'rpc-gateway',
    label: 'RPC gateway',
    description: 'Rate-limited public JSON-RPC fleet in front of read replicas',
    process: 'saly-l3-rpc-gateway',
    status: 'required',
  },
] as const;

export const L3_NETWORKS: Record<L3Network, L3NetworkDefinition> = {
  'saly-devnet': {
    id: 'saly-devnet',
    label: 'Saly L3 Devnet',
    chainId: 845320001,
    settlement: 'base-sepolia',
    settlementChainId: 84532,
    defaultRpcUrl: 'http://127.0.0.1:9545',
    settlementContracts: {},
  },
  'saly-testnet': {
    id: 'saly-testnet',
    label: 'Saly L3 Testnet',
    chainId: 845320002,
    settlement: 'base-sepolia',
    settlementChainId: 84532,
    defaultRpcUrl: 'https://l3-testnet-rpc.example.com',
    settlementContracts: {},
  },
  'saly-mainnet': {
    id: 'saly-mainnet',
    label: 'Saly L3 Mainnet',
    chainId: 845320003,
    settlement: 'base-mainnet',
    settlementChainId: 8453,
    defaultRpcUrl: 'https://l3-rpc.salychain.io',
    settlementContracts: {},
  },
};

export function l3Network(id: L3Network): L3NetworkDefinition {
  return L3_NETWORKS[id];
}

export function settlementRpcDefault(network: L3SettlementNetwork): string {
  return network === 'base-mainnet' ? 'https://mainnet.base.org' : 'https://sepolia.base.org';
}
