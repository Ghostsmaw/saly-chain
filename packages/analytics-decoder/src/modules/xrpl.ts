export type { DecodedChainEvent, DecodedTransfer } from '../types.js';
export { transferFromErc20Event } from './erc20.js';

/** XRPL Payment — decoded at the indexer driver (no EVM logs). */
export interface XrplPaymentRow {
  chainId: 'xrpl';
  txHash: string;
  ledgerIndex: number;
  from: string;
  to: string;
  amountRaw: string;
  tokenSymbol: string;
  tokenAddress: string;
  transferType: 'xrpl_native' | 'xrpl_iou';
  feeDrops: string;
  ts: string;
}

export function xrplPaymentToTransfer(row: XrplPaymentRow): import('../types.js').DecodedTransfer {
  return {
    chainId: row.chainId,
    txHash: row.txHash,
    logIndex: 0,
    blockNumber: BigInt(row.ledgerIndex),
    blockHash: '',
    tokenAddress: row.tokenAddress,
    tokenSymbol: row.tokenSymbol,
    from: row.from,
    to: row.to,
    amountRaw: row.amountRaw,
    transferType: row.transferType,
    ts: row.ts,
  };
}
