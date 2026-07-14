import type { DecodedBlock, DecodedChainEvent, DecodedTransfer } from '@salychain/analytics-decoder';

export type IndexerMode = 'backfill' | 'tip';

export interface IndexCheckpoint {
  readonly chainKey: string;
  lastPosition: bigint;
  lastBlockHash: string;
  backfillComplete: boolean;
}

export interface CheckpointStore {
  get(chainKey: string): Promise<IndexCheckpoint | null>;
  upsert(checkpoint: IndexCheckpoint): Promise<void>;
}

export interface IndexBatch {
  readonly chainId: string;
  readonly fromPosition: bigint;
  readonly toPosition: bigint;
  blocks: DecodedBlock[];
  transfers: DecodedTransfer[];
  decodedEvents: DecodedChainEvent[];
}

/** Scans a contiguous block/ledger range and returns normalized rows. */
export interface ChainDriver {
  readonly chainKey: string;
  readonly chainId: string;
  getHeadPosition(): Promise<bigint>;
  getHashAt(position: bigint): Promise<string | null>;
  scanRange(from: bigint, to: bigint): Promise<IndexBatch>;
}

export interface BatchWriter {
  writeBatch(batch: IndexBatch): Promise<void>;
}

export interface BackfillOptions {
  driver: ChainDriver;
  checkpoint: CheckpointStore;
  writer: BatchWriter;
  floor: bigint;
  batchSize: number;
  concurrency: number;
  confirmations: bigint;
  onProgress?: (info: { from: bigint; to: bigint; head: bigint }) => void;
}

export interface TipOptions {
  driver: ChainDriver;
  checkpoint: CheckpointStore;
  writer: BatchWriter;
  batchSize: number;
  confirmations: bigint;
  pollIntervalMs: number;
  shouldStop?: () => boolean;
  onProgress?: (info: { from: bigint; to: bigint; head: bigint }) => void;
}

export interface ReconcileResult {
  chainKey: string;
  nodeHead: bigint;
  indexedBlocks: number;
  indexedTransfers: number;
  ok: boolean;
}
