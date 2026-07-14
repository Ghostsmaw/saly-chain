import type { DecodedChainEvent, DecodedTransfer } from '../types.js';

export function transferFromErc20Event(
  event: DecodedChainEvent,
  tokenSymbol: string,
  ts: string,
): DecodedTransfer | null {
  if (event.eventName !== 'Transfer') return null;
  const from = String(event.args.from ?? '');
  const to = String(event.args.to ?? '');
  const value = event.args.value;
  if (!from || !to || value === undefined) return null;
  return {
    chainId: event.chainId,
    txHash: event.txHash,
    logIndex: event.logIndex,
    blockNumber: event.blockNumber,
    blockHash: event.blockHash,
    tokenAddress: event.contractAddress,
    tokenSymbol,
    from,
    to,
    amountRaw: String(value),
    transferType: 'erc20',
    ts,
  };
}

export function escrowEventToDecoded(event: DecodedChainEvent, ts: string): DecodedChainEvent {
  return { ...event, args: { ...event.args, _indexed_at: ts } };
}
