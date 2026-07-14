import { describe, expect, it } from 'vitest';
import { detectReorg } from './reorg.js';

describe('detectReorg', () => {
  it('returns null when checkpoint hash matches canonical chain', async () => {
    const result = await detectReorg({
      checkpointBlock: 100n,
      checkpointHash: '0xabc',
      confirmations: 2,
      getHashAt: async () => '0xabc',
    });
    expect(result).toBeNull();
  });

  it('rewinds and returns orphaned range on hash mismatch', async () => {
    const result = await detectReorg({
      checkpointBlock: 100n,
      checkpointHash: '0xold',
      confirmations: 2,
      getHashAt: async () => '0xnew',
    });
    expect(result).toEqual({
      rewindTo: 98n,
      fromBlock: 99,
      toBlock: 100,
      orphanedBlockHash: '0xold',
    });
  });

  it('rewinds to genesis when confirmations exceed checkpoint', async () => {
    const result = await detectReorg({
      checkpointBlock: 1n,
      checkpointHash: '0xold',
      confirmations: 2,
      getHashAt: async () => '0xnew',
    });
    expect(result?.rewindTo).toBe(0n);
    expect(result?.fromBlock).toBe(1);
  });
});
