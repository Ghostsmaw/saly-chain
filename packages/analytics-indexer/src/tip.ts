import type { TipOptions } from './types.js';

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Tip follower: trails chain head by `confirmations`, detects reorgs via block
 * hash mismatch and rewinds the checkpoint before re-pulling.
 */
export async function runTip(opts: TipOptions): Promise<void> {
  while (!opts.shouldStop?.()) {
    const head = await opts.driver.getHeadPosition();
    const safeHead = head > opts.confirmations ? head - opts.confirmations : 0n;
    const cp = await opts.checkpoint.get(opts.driver.chainKey);
    let cursor = cp?.lastPosition ?? 0n;

    // Reorg detection: if hash at cursor differs, rewind confirmations blocks.
    if (cp && cp.lastPosition > 0n && cp.lastBlockHash) {
      const hash = await opts.driver.getHashAt(cp.lastPosition);
      if (hash && hash !== cp.lastBlockHash) {
        const rewind =
          cp.lastPosition > opts.confirmations ? cp.lastPosition - opts.confirmations : 0n;
        await opts.checkpoint.upsert({
          chainKey: opts.driver.chainKey,
          lastPosition: rewind,
          lastBlockHash: '',
          backfillComplete: cp.backfillComplete,
        });
        cursor = rewind;
      }
    }

    if (safeHead > cursor) {
      const from = cursor + 1n;
      const to =
        from + BigInt(opts.batchSize) - 1n > safeHead
          ? safeHead
          : from + BigInt(opts.batchSize) - 1n;
      opts.onProgress?.({ from, to, head: safeHead });
      const batch = await opts.driver.scanRange(from, to);
      await opts.writer.writeBatch(batch);
      const tipHash = await opts.driver.getHashAt(to);
      await opts.checkpoint.upsert({
        chainKey: opts.driver.chainKey,
        lastPosition: to,
        lastBlockHash: tipHash ?? '',
        backfillComplete: true,
      });
    }

    await sleep(opts.pollIntervalMs);
  }
}
