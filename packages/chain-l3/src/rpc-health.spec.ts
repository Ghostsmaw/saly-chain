import { describe, expect, it } from 'vitest';
import { rpcPoolMaxLag } from './rpc-health.js';

describe('rpcPoolMaxLag', () => {
  it('returns 0 for fewer than two healthy endpoints', () => {
    expect(rpcPoolMaxLag([{ url: 'a', ok: true, synced: true, blockNumber: 100n, latencyMs: 1, detail: '' }])).toBe(0);
  });

  it('computes max-min block spread', () => {
    expect(
      rpcPoolMaxLag([
        { url: 'a', ok: true, synced: true, blockNumber: 100n, latencyMs: 1, detail: '' },
        { url: 'b', ok: true, synced: true, blockNumber: 103n, latencyMs: 1, detail: '' },
      ]),
    ).toBe(3);
  });
});
