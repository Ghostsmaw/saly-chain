import {
  createPublicClient,
  decodeEventLog,
  http,
  type Address,
  type Hash,
} from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { ExternalError } from '@salychain/errors';
import type { Logger } from '@salychain/logger';
import { L2_OUTPUT_ORACLE_ABI } from './contracts.js';
import type { L3Network, L3SettlementNetwork } from './network.js';
import { l3Network, settlementRpcDefault } from './network.js';
import type { L3SettlementMode } from './settlement-mode.js';

export interface OutputProposal {
  outputRoot: Hash;
  outputIndex: bigint;
  l2BlockNumber: bigint;
  l1Timestamp: bigint;
  l1BlockNumber: bigint;
  l1TxHash: Hash;
  settlementNetwork: L3SettlementNetwork;
}

export interface RollupMonitorStatus {
  configured: boolean;
  l3Network: L3Network;
  settlementNetwork: L3SettlementNetwork;
  settlementMode?: L3SettlementMode;
  l2OutputOracle?: Address;
  disputeGameFactory?: Address;
  latestOutputIndex?: bigint;
  latestL2BlockNumber?: bigint;
  latestProposal?: OutputProposal;
  message?: string;
}

export interface L3RollupMonitorOptions {
  l3Network: L3Network;
  settlementRpcUrl?: string;
  /** Override — otherwise read from network definition or env at call site */
  l2OutputOracle?: Address;
  logger?: Logger;
}

/**
 * Observes OP-Stack settlement posts on Base (L1 for Saly L3).
 * S5 spike: reads L2OutputOracle.OutputProposed events.
 */
export class L3RollupMonitor {
  private readonly network = l3Network(this.opts.l3Network);
  private readonly client;
  private readonly oracle: Address | undefined;

  constructor(private readonly opts: L3RollupMonitorOptions) {
    const settlement = this.network.settlement;
    const chain = settlement === 'base-mainnet' ? base : baseSepolia;
    const rpcUrl = opts.settlementRpcUrl ?? settlementRpcDefault(settlement);

    this.client = createPublicClient({
      chain,
      transport: http(rpcUrl, { retryCount: 3, timeout: 30_000 }),
    });

    this.oracle = opts.l2OutputOracle ?? this.network.settlementContracts.l2OutputOracle;
  }

  isConfigured(): boolean {
    return Boolean(this.oracle);
  }

  async hasOracleBytecode(): Promise<boolean> {
    if (!this.oracle) return false;
    const code = await this.client.getBytecode({ address: this.oracle });
    return Boolean(code && code !== '0x');
  }

  /** Read proposal from oracle storage when event logs are outside lookback window. */
  async getProposalAtIndex(index: bigint): Promise<OutputProposal | null> {
    if (!this.oracle) return null;
    try {
      const out = await this.client.readContract({
        address: this.oracle,
        abi: L2_OUTPUT_ORACLE_ABI,
        functionName: 'getL2Output',
        args: [index],
      });
      return {
        outputRoot: out.outputRoot,
        outputIndex: index,
        l2BlockNumber: BigInt(out.l2BlockNumber),
        l1Timestamp: BigInt(out.timestamp),
        l1BlockNumber: 0n,
        l1TxHash: '0x' as Hash,
        settlementNetwork: this.network.settlement,
      };
    } catch {
      return null;
    }
  }

  async getStatus(): Promise<RollupMonitorStatus> {
    if (!this.oracle) {
      return {
        configured: false,
        l3Network: this.opts.l3Network,
        settlementNetwork: this.network.settlement,
        settlementMode: 'legacy',
        message: 'Set L3_L2_OUTPUT_ORACLE to the deployed L2OutputOracle on Base',
      };
    }

    try {
      const [latestOutputIndex, latestL2BlockNumber] = await Promise.all([
        this.client.readContract({
          address: this.oracle,
          abi: L2_OUTPUT_ORACLE_ABI,
          functionName: 'latestOutputIndex',
        }),
        this.client.readContract({
          address: this.oracle,
          abi: L2_OUTPUT_ORACLE_ABI,
          functionName: 'latestBlockNumber',
        }),
      ]);

      const head = await this.client.getBlockNumber();
      const fromBlock = head > 50_000n ? head - 50_000n : 0n;
      const proposals = await this.getOutputProposals(fromBlock, head);
      let latestProposal = proposals.length > 0 ? proposals[proposals.length - 1] : undefined;

      if (!latestProposal && latestOutputIndex >= 0n) {
        latestProposal = (await this.getProposalAtIndex(latestOutputIndex)) ?? undefined;
      }

      return {
        configured: true,
        l3Network: this.opts.l3Network,
        settlementNetwork: this.network.settlement,
        settlementMode: 'legacy',
        l2OutputOracle: this.oracle,
        latestOutputIndex,
        latestL2BlockNumber,
        ...(latestProposal ? { latestProposal } : {}),
      };
    } catch (err) {
      throw ExternalError(
        'l3.rollup.monitor_failed',
        `L3 rollup monitor failed: ${(err as Error).message}`,
      );
    }
  }

  async getOutputProposals(fromBlock: bigint, toBlock: bigint): Promise<OutputProposal[]> {
    if (!this.oracle) return [];

    const logs = await this.client.getLogs({
      address: this.oracle,
      event: L2_OUTPUT_ORACLE_ABI[0],
      fromBlock,
      toBlock,
    });

    const settlementNetwork = this.network.settlement;
    return logs.map((log: (typeof logs)[number]) => {
      const decoded = decodeEventLog({
        abi: L2_OUTPUT_ORACLE_ABI,
        data: log.data,
        topics: log.topics,
      });
      return {
        outputRoot: decoded.args.outputRoot as Hash,
        outputIndex: decoded.args.l2OutputIndex as bigint,
        l2BlockNumber: decoded.args.l2BlockNumber as bigint,
        l1Timestamp: decoded.args.l1Timestamp as bigint,
        l1BlockNumber: log.blockNumber ?? 0n,
        l1TxHash: log.transactionHash ?? ('0x' as Hash),
        settlementNetwork,
      };
    });
  }

  async getLatestOutputProposal(): Promise<OutputProposal | null> {
    const status = await this.getStatus();
    return status.latestProposal ?? null;
  }
}

/** Merge env-provided contract addresses into a network definition (devnet deploy). */
export function withSettlementContracts(
  network: L3Network,
  contracts: {
    l2OutputOracle?: Address;
    batchInbox?: Address;
    optimismPortal?: Address;
  },
): void {
  const def = l3Network(network);
  if (contracts.l2OutputOracle) def.settlementContracts.l2OutputOracle = contracts.l2OutputOracle;
  if (contracts.batchInbox) def.settlementContracts.batchInbox = contracts.batchInbox;
  if (contracts.optimismPortal) def.settlementContracts.optimismPortal = contracts.optimismPortal;
}
