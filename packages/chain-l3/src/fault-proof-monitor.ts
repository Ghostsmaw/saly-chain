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
import { DISPUTE_GAME_FACTORY_ABI } from './contracts.js';
import type { L3Network, L3SettlementNetwork } from './network.js';
import { l3Network, settlementRpcDefault } from './network.js';
import type { OutputProposal, RollupMonitorStatus } from './rollup-monitor.js';

export interface FaultProofMonitorOptions {
  l3Network: L3Network;
  settlementRpcUrl?: string;
  disputeGameFactory?: Address;
  logger?: Logger;
}

export interface DisputeGameProposal {
  gameIndex: bigint;
  gameType: number;
  rootClaim: Hash;
  disputeGame: Address;
  l1BlockNumber: bigint;
  l1TxHash: Hash;
  settlementNetwork: L3SettlementNetwork;
}

/**
 * Observes fault-proof settlement via DisputeGameFactory (OP-Stack bedrock).
 * Production mainnet target per ADR-0016.
 */
export class FaultProofRollupMonitor {
  private readonly network = l3Network(this.opts.l3Network);
  private readonly client;
  private readonly factory: Address | undefined;

  constructor(private readonly opts: FaultProofMonitorOptions) {
    const settlement = this.network.settlement;
    const chain = settlement === 'base-mainnet' ? base : baseSepolia;
    const rpcUrl = opts.settlementRpcUrl ?? settlementRpcDefault(settlement);

    this.client = createPublicClient({
      chain,
      transport: http(rpcUrl, { retryCount: 3, timeout: 30_000 }),
    });

    this.factory = opts.disputeGameFactory ?? this.network.settlementContracts.disputeGameFactory;
  }

  isConfigured(): boolean {
    return Boolean(this.factory);
  }

  async hasFactoryBytecode(): Promise<boolean> {
    if (!this.factory) return false;
    const code = await this.client.getBytecode({ address: this.factory });
    return Boolean(code && code !== '0x');
  }

  async getGameCount(): Promise<bigint> {
    if (!this.factory) return 0n;
    return this.client.readContract({
      address: this.factory,
      abi: DISPUTE_GAME_FACTORY_ABI,
      functionName: 'gameCount',
    });
  }

  async getDisputeGames(fromBlock: bigint, toBlock: bigint): Promise<DisputeGameProposal[]> {
    if (!this.factory) return [];

    const logs = await this.client.getLogs({
      address: this.factory,
      event: DISPUTE_GAME_FACTORY_ABI[0],
      fromBlock,
      toBlock,
    });

    const settlementNetwork = this.network.settlement;
    return logs.map((log, idx) => {
      const decoded = decodeEventLog({
        abi: DISPUTE_GAME_FACTORY_ABI,
        data: log.data,
        topics: log.topics,
      });
      return {
        gameIndex: BigInt(idx),
        gameType: Number(decoded.args.gameType),
        rootClaim: decoded.args.rootClaim as Hash,
        disputeGame: decoded.args.disputeGame as Address,
        l1BlockNumber: log.blockNumber ?? 0n,
        l1TxHash: log.transactionHash ?? ('0x' as Hash),
        settlementNetwork,
      };
    });
  }

  async getStatus(): Promise<RollupMonitorStatus> {
    if (!this.factory) {
      return {
        configured: false,
        l3Network: this.opts.l3Network,
        settlementNetwork: this.network.settlement,
        settlementMode: 'fault_proofs',
        message: 'Set L3_DISPUTE_GAME_FACTORY to the deployed DisputeGameFactory on Base',
      };
    }

    try {
      const gameCount = await this.getGameCount();
      const head = await this.client.getBlockNumber();
      const fromBlock = head > 50_000n ? head - 50_000n : 0n;
      const games = await this.getDisputeGames(fromBlock, head);
      const latest = games.length > 0 ? games[games.length - 1] : undefined;

      const latestProposal: OutputProposal | undefined = latest
        ? {
            outputRoot: latest.rootClaim,
            outputIndex: gameCount > 0n ? gameCount - 1n : 0n,
            l2BlockNumber: 0n,
            l1Timestamp: 0n,
            l1BlockNumber: latest.l1BlockNumber,
            l1TxHash: latest.l1TxHash,
            settlementNetwork: latest.settlementNetwork,
          }
        : undefined;

      return {
        configured: true,
        l3Network: this.opts.l3Network,
        settlementNetwork: this.network.settlement,
        settlementMode: 'fault_proofs',
        disputeGameFactory: this.factory,
        ...(gameCount > 0n ? { latestOutputIndex: gameCount - 1n } : {}),
        ...(latestProposal ? { latestProposal } : {}),
      };
    } catch (err) {
      throw ExternalError(
        'l3.fault_proof.monitor_failed',
        `Fault-proof monitor failed: ${(err as Error).message}`,
      );
    }
  }

  async getLatestOutputProposal(): Promise<OutputProposal | null> {
    const status = await this.getStatus();
    return status.latestProposal ?? null;
  }
}
