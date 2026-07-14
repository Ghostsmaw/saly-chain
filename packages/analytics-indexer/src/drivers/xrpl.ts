import { Client } from 'xrpl';
import { xrplPaymentToTransfer, type XrplPaymentRow } from '@salychain/analytics-decoder';
import type { ChainDriver, IndexBatch } from '../types.js';
import { tsFromEpochSeconds } from '../rows.js';

export interface XrplDriverOptions {
  wsUrl: string;
  chainKey?: string;
}

/**
 * XRPL driver — indexes ALL successful Payment transactions in a ledger range
 * (historical backfill; not limited to custodial addresses).
 */
export class XrplChainDriver implements ChainDriver {
  readonly chainKey: string;
  readonly chainId = 'xrpl';
  private readonly wsUrl: string;
  private client: Client | undefined;

  constructor(opts: XrplDriverOptions) {
    this.chainKey = opts.chainKey ?? 'XRPL:testnet';
    this.wsUrl = opts.wsUrl;
  }

  private async connect(): Promise<Client> {
    if (!this.client?.isConnected()) {
      this.client = new Client(this.wsUrl);
      await this.client.connect();
    }
    return this.client;
  }

  async getHeadPosition(): Promise<bigint> {
    const client = await this.connect();
    const res = await client.request({ command: 'ledger', ledger_index: 'validated' });
    return BigInt(Number((res.result as { ledger_index?: number }).ledger_index ?? 0));
  }

  async getHashAt(position: bigint): Promise<string | null> {
    const client = await this.connect();
    try {
      const res = await client.request({ command: 'ledger', ledger_index: Number(position) });
      const ledger = res.result.ledger as { ledger_hash?: string };
      return ledger.ledger_hash ?? null;
    } catch {
      return null;
    }
  }

  async scanRange(from: bigint, to: bigint): Promise<IndexBatch> {
    const client = await this.connect();
    const transfers: IndexBatch['transfers'] = [];
    const blocks: IndexBatch['blocks'] = [];

    for (let ledgerIndex = Number(from); ledgerIndex <= Number(to); ledgerIndex++) {
      try {
        const res = await client.request({
          command: 'ledger',
          ledger_index: ledgerIndex,
          transactions: true,
          expand: true,
        });
        const ledger = res.result.ledger as {
          ledger_hash?: string;
          close_time?: number;
          transactions?: Array<Record<string, unknown>>;
        };
        const closeTime = Number(ledger.close_time ?? 0);
        const ts = tsFromEpochSeconds(closeTime);
        blocks.push({
          chainId: this.chainId,
          blockNumber: BigInt(ledgerIndex),
          blockHash: ledger.ledger_hash ?? '',
          ts,
        });

        for (const txEntry of ledger.transactions ?? []) {
          if (txEntry.TransactionType !== 'Payment') continue;
          const meta = txEntry.metaData as { TransactionResult?: string } | undefined;
          if (meta?.TransactionResult !== 'tesSUCCESS') continue;

          const fromAcct = String(txEntry.Account ?? '');
          const toAcct = String(txEntry.Destination ?? '');
          const amount = txEntry.Amount;
          const txHash = String(txEntry.hash ?? '');

          let row: XrplPaymentRow;
          if (typeof amount === 'string') {
            row = {
              chainId: 'xrpl',
              txHash,
              ledgerIndex,
              from: fromAcct,
              to: toAcct,
              amountRaw: amount,
              tokenSymbol: 'XRP',
              tokenAddress: 'XRP',
              transferType: 'xrpl_native',
              feeDrops: String(txEntry.Fee ?? '0'),
              ts,
            };
          } else if (amount && typeof amount === 'object') {
            const iou = amount as { currency?: string; issuer?: string; value?: string };
            if (!iou.currency || !iou.issuer || !iou.value) continue;
            row = {
              chainId: 'xrpl',
              txHash,
              ledgerIndex,
              from: fromAcct,
              to: toAcct,
              amountRaw: iou.value,
              tokenSymbol: iou.currency,
              tokenAddress: `${iou.currency}.${iou.issuer}`,
              transferType: 'xrpl_iou',
              feeDrops: String(txEntry.Fee ?? '0'),
              ts,
            };
          } else {
            continue;
          }
          transfers.push(xrplPaymentToTransfer(row));
        }
      } catch {
        // skip missing ledgers on devnet gaps
      }
    }

    return {
      chainId: this.chainId,
      fromPosition: from,
      toPosition: to,
      blocks,
      transfers,
      decodedEvents: [],
    };
  }

  async close(): Promise<void> {
    if (this.client?.isConnected()) await this.client.disconnect();
  }
}
