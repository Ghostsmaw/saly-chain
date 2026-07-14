import type { BackfillOptions } from './types.js';

async function runChunk(
  opts: BackfillOptions,
  from: bigint,
  to: bigint,
): Promise<void> {
  const batch = await opts.driver.scanRange(from, to);
  await opts.writer.writeBatch(batch);
  const tipHash = await opts.driver.getHashAt(to);
  await opts.checkpoint.upsert({
    chainKey: opts.driver.chainKey,
    lastPosition: to,
    lastBlockHash: tipHash ?? '',
    backfillComplete: false,
  });
}

/**
 * Parallel range-scan backfill from `floor` toward `head - confirmations`.
 * Idempotent: downstream writers use ReplacingMergeTree / overwrite-safe Parquet paths.
 */
export async function runBackfill(opts: BackfillOptions): Promise<void> {
  const head = await opts.driver.getHeadPosition();
  const target = head > opts.confirmations ? head - opts.confirmations : 0n;

  const existing = await opts.checkpoint.get(opts.driver.chainKey);
  let cursor = existing?.lastPosition ?? opts.floor;
  if (cursor < opts.floor) cursor = opts.floor;

  while (cursor < target) {
    const jobs: Promise<void>[] = [];
    for (let i = 0; i < opts.concurrency && cursor < target; i++) {
      const from = cursor + 1n;
      const to =
        from + BigInt(opts.batchSize) - 1n > target
          ? target
          : from + BigInt(opts.batchSize) - 1n;
      cursor = to;
      opts.onProgress?.({ from, to, head: target });
      jobs.push(runChunk(opts, from, to));
    }
    await Promise.all(jobs);
  }

  const tipHash = await opts.driver.getHashAt(target);
  await opts.checkpoint.upsert({
    chainKey: opts.driver.chainKey,
    lastPosition: target,
    lastBlockHash: tipHash ?? '',
    backfillComplete: true,
  });
}
