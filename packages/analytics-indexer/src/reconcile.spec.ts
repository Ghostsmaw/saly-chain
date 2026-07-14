import { describe, expect, it } from 'vitest';
import { reconcileCounts } from './reconcile.js';
import { partitionDate } from './rows.js';

describe('reconcileCounts', () => {
  it('passes when indexed blocks meet minimum', () => {
    const r = reconcileCounts({
      chainKey: 'BASE:base-sepolia',
      nodeHead: 1000n,
      indexedBlockCount: 500,
      indexedTransferCount: 1200,
      minBlocks: 100,
    });
    expect(r.ok).toBe(true);
  });
});

describe('partitionDate', () => {
  it('extracts YYYY-MM-DD from ClickHouse ts', () => {
    expect(partitionDate('2026-06-24 12:00:00.000')).toBe('2026-06-24');
  });
});
