import { describe, expect, it } from 'vitest';
import { cosineSimilarity, embedText, l2normalize, topK } from './embeddings.js';

describe('embedText', () => {
  it('is deterministic for the same input', () => {
    expect(embedText('exchange hot wallet', 64)).toEqual(embedText('exchange hot wallet', 64));
  });

  it('produces a unit-length vector of the requested dimension', () => {
    const v = embedText('tornado mixer high risk', 32);
    expect(v).toHaveLength(32);
    const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
    expect(norm).toBeCloseTo(1, 6);
  });

  it('returns a zero vector for empty text', () => {
    const v = embedText('', 16);
    expect(v.every((x) => x === 0)).toBe(true);
  });

  it('similar text scores higher than dissimilar text', () => {
    const q = embedText('coinbase exchange deposit usdc', 128);
    const near = embedText('coinbase exchange withdrawal usdc', 128);
    const far = embedText('tornado cash mixer privacy', 128);
    expect(cosineSimilarity(q, near)).toBeGreaterThan(cosineSimilarity(q, far));
  });
});

describe('cosineSimilarity', () => {
  it('is 1 for identical vectors and 0 for orthogonal', () => {
    expect(cosineSimilarity([1, 0], [1, 0])).toBeCloseTo(1, 6);
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0, 6);
  });
  it('returns 0 when either vector is zero', () => {
    expect(cosineSimilarity([0, 0], [1, 1])).toBe(0);
  });
  it('throws on dimension mismatch', () => {
    expect(() => cosineSimilarity([1, 2], [1, 2, 3])).toThrow();
  });
});

describe('l2normalize', () => {
  it('scales to unit length', () => {
    const n = l2normalize([3, 4]);
    expect(n[0]).toBeCloseTo(0.6, 6);
    expect(n[1]).toBeCloseTo(0.8, 6);
  });
});

describe('topK', () => {
  it('returns the k most similar items in descending score order', () => {
    const q = [1, 0, 0];
    const items = [
      { item: 'a', vector: [0.9, 0.1, 0] },
      { item: 'b', vector: [0, 1, 0] },
      { item: 'c', vector: [0.8, 0.2, 0] },
    ];
    const res = topK(q, items, 2);
    expect(res).toHaveLength(2);
    expect(res[0]!.item).toBe('a');
    expect(res[0]!.score).toBeGreaterThanOrEqual(res[1]!.score);
  });
});
