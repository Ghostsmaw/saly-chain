import { ulid } from 'ulid';
import type { DecodedBlock, DecodedChainEvent, DecodedTransfer } from '@salychain/analytics-decoder';

export function chDateTime(d: Date): string {
  return d.toISOString().replace('T', ' ').replace('Z', '');
}

export function tsFromEpochSeconds(s: number): string {
  return chDateTime(new Date(s * 1000));
}

export function blockRow(block: DecodedBlock, eventId = ulid()) {
  return {
    chain_id: block.chainId,
    block_number: Number(block.blockNumber),
    block_hash: block.blockHash,
    ts: block.ts,
    event_id: eventId,
  };
}

export function transferRow(transfer: DecodedTransfer, eventId = ulid()) {
  return {
    chain_id: transfer.chainId,
    tx_hash: transfer.txHash,
    log_index: transfer.logIndex,
    ts: transfer.ts,
    block_number: Number(transfer.blockNumber),
    token_address: transfer.tokenAddress,
    token_symbol: transfer.tokenSymbol,
    from_address: transfer.from,
    to_address: transfer.to,
    amount_raw: transfer.amountRaw,
    transfer_type: transfer.transferType,
    event_id: eventId,
  };
}

export function decodedEventRow(event: DecodedChainEvent, ts: string, eventId = ulid()) {
  return {
    chain_id: event.chainId,
    tx_hash: event.txHash,
    log_index: event.logIndex,
    ts,
    contract_address: event.contractAddress,
    event_name: event.eventName,
    args: JSON.stringify(event.args),
    event_id: eventId,
  };
}

/** Flatten batch into lake Parquet-friendly records (snake_case strings). */
export function lakeTransferRecords(transfers: DecodedTransfer[]) {
  return transfers.map((t) => ({
    chain_id: t.chainId,
    tx_hash: t.txHash,
    log_index: t.logIndex,
    ts: t.ts,
    block_number: Number(t.blockNumber),
    token_address: t.tokenAddress,
    token_symbol: t.tokenSymbol,
    from_address: t.from,
    to_address: t.to,
    amount_raw: t.amountRaw,
    transfer_type: t.transferType,
  }));
}

export function lakeBlockRecords(blocks: DecodedBlock[]) {
  return blocks.map((b) => ({
    chain_id: b.chainId,
    block_number: Number(b.blockNumber),
    block_hash: b.blockHash,
    ts: b.ts,
  }));
}

export function partitionDate(ts: string): string {
  const d = ts.includes('T') ? ts.slice(0, 10) : ts.slice(0, 10);
  return d.length >= 10 ? d : new Date().toISOString().slice(0, 10);
}
