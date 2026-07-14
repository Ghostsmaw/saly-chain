import type { Address } from 'viem';
import { BaseChainAdapter } from '@salychain/chain-base';
import {
  AbiRegistry,
  transferFromErc20Event,
  type DecodedChainEvent,
  type DecodedTransfer,
} from '@salychain/analytics-decoder';
import type { ChainDriver, IndexBatch } from '../types.js';
import { tsFromEpochSeconds } from '../rows.js';

export interface EvmDriverOptions {
  chainKey: string;
  chainId: string;
  adapter: BaseChainAdapter | import('@salychain/chain-l3').L3ChainAdapter;
  registry: AbiRegistry;
}

/** EVM driver — scans ALL registered token + escrow logs (not wallet-filtered). */
export class EvmChainDriver implements ChainDriver {
  readonly chainKey: string;
  readonly chainId: string;
  private readonly adapter: EvmDriverOptions['adapter'];
  private readonly registry: AbiRegistry;

  constructor(opts: EvmDriverOptions) {
    this.chainKey = opts.chainKey;
    this.chainId = opts.chainId;
    this.adapter = opts.adapter;
    this.registry = opts.registry;
  }

  getHeadPosition(): Promise<bigint> {
    return this.adapter.getCurrentBlockNumber();
  }

  async getHashAt(position: bigint): Promise<string | null> {
    const block = await this.adapter.getBlock(position);
    return block.hash ?? null;
  }

  async scanRange(from: bigint, to: bigint): Promise<IndexBatch> {
    const tokenAddrs = this.registry.tokenAddresses(this.chainId) as Address[];
    const transfers: DecodedTransfer[] = [];
    const decodedEvents: DecodedChainEvent[] = [];
    const blocks: IndexBatch['blocks'] = [];

    const transferLogs = await this.adapter.getTransferLogs(
      tokenAddrs.length
        ? { fromBlock: from, toBlock: to, contractAddresses: tokenAddrs }
        : { fromBlock: from, toBlock: to },
    );

    for (const log of transferLogs) {
      const entry = this.registry.lookup(this.chainId, log.contractAddress);
      const ts = tsFromEpochSeconds(Number((await this.adapter.getBlock(log.blockNumber)).timestamp));
      const event: DecodedChainEvent = {
        chainId: this.chainId,
        txHash: log.txHash,
        logIndex: log.logIndex,
        blockNumber: log.blockNumber,
        blockHash: log.blockHash,
        contractAddress: log.contractAddress.toLowerCase(),
        eventName: 'Transfer',
        protocol: 'erc20',
        args: { from: log.from, to: log.to, value: log.amountMinor.toString() },
      };
      decodedEvents.push(event);
      const t = transferFromErc20Event(event, entry?.label ?? 'TOKEN', ts);
      if (t) transfers.push(t);
    }

    // Escrow events (Base adapter only)
    const escrowEntries = [...this.registry.addressesForChain(this.chainId)].filter((a) => {
      const e = this.registry.lookup(this.chainId, a);
      return e?.protocol === 'escrow';
    });

    if ('getDealFundedLogs' in this.adapter && escrowEntries[0]) {
      const escrow = escrowEntries[0] as Address;
      const [funded, released, refunded] = await Promise.all([
        this.adapter.getDealFundedLogs({ fromBlock: from, toBlock: to, escrowAddress: escrow }),
        this.adapter.getDealReleasedLogs({ fromBlock: from, toBlock: to, escrowAddress: escrow }),
        this.adapter.getDealRefundedLogs({ fromBlock: from, toBlock: to, escrowAddress: escrow }),
      ]);
      for (const logs of [
        { name: 'DealFunded', rows: funded },
        { name: 'DealReleased', rows: released },
        { name: 'DealRefunded', rows: refunded },
      ] as const) {
        for (const log of logs.rows) {
          const baseArgs: Record<string, unknown> = {};
          for (const [k, v] of Object.entries(log as unknown as Record<string, unknown>)) {
            baseArgs[k] = typeof v === 'bigint' ? v.toString() : v;
          }
          decodedEvents.push({
            chainId: this.chainId,
            txHash: log.txHash,
            logIndex: log.logIndex,
            blockNumber: log.blockNumber,
            blockHash: log.blockHash,
            contractAddress: escrow.toLowerCase(),
            eventName: logs.name,
            protocol: 'escrow',
            args: baseArgs,
          });
        }
      }
    }

    for (let n = from; n <= to; n++) {
      const block = await this.adapter.getBlock(n);
      blocks.push({
        chainId: this.chainId,
        blockNumber: n,
        blockHash: block.hash ?? '',
        ts: tsFromEpochSeconds(Number(block.timestamp)),
      });
    }

    return {
      chainId: this.chainId,
      fromPosition: from,
      toPosition: to,
      blocks,
      transfers,
      decodedEvents,
    };
  }
}
