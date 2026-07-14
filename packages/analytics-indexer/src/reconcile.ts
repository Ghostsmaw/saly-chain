import type { ReconcileResult } from './types.js';

export interface ReconcileInput {
  chainKey: string;
  nodeHead: bigint;
  indexedBlockCount: number;
  indexedTransferCount: number;
  /** Minimum expected blocks indexed (head - floor) for pass. */
  minBlocks?: number;
}

export function reconcileCounts(input: ReconcileInput): ReconcileResult {
  const min = input.minBlocks ?? 1;
  const ok = input.indexedBlockCount >= min && input.indexedTransferCount >= 0;
  return {
    chainKey: input.chainKey,
    nodeHead: input.nodeHead,
    indexedBlocks: input.indexedBlockCount,
    indexedTransfers: input.indexedTransferCount,
    ok,
  };
}
