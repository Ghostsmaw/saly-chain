import { createHash } from 'node:crypto';

/**
 * Deterministic, dependency-free text embedder using the **feature-hashing**
 * (a.k.a. "hashing trick") technique: each token is hashed to a dimension and a
 * sign, contributions are accumulated, and the vector is L2-normalized. This is
 * a real, classic embedding method — not a learned model, but stable, fast, and
 * good enough for nearest-neighbour grouping of address activity profiles.
 *
 * The embedder is intentionally local so the service has no external-model
 * dependency or API key. A learned embedding provider can be swapped in later
 * behind the same `embedText` contract.
 */
export function embedText(text: string, dim: number): number[] {
  const vec = new Array<number>(dim).fill(0);
  const tokens = tokenize(text);
  for (const token of tokens) {
    const { index, sign } = hashToken(token, dim);
    vec[index] += sign;
  }
  return l2normalize(vec);
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 0);
}

function hashToken(token: string, dim: number): { index: number; sign: number } {
  const digest = createHash('sha1').update(token).digest();
  // First 4 bytes → dimension index; next byte's low bit → sign.
  const index = digest.readUInt32BE(0) % dim;
  const sign = (digest[4]! & 1) === 0 ? 1 : -1;
  return { index, sign };
}

export function l2normalize(vec: number[]): number[] {
  let sumSq = 0;
  for (const v of vec) sumSq += v * v;
  const norm = Math.sqrt(sumSq);
  if (norm === 0) return vec.slice();
  return vec.map((v) => v / norm);
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(`vector dimension mismatch: ${a.length} vs ${b.length}`);
  }
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i]! * b[i]!;
    na += a[i]! * a[i]!;
    nb += b[i]! * b[i]!;
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export interface ScoredItem<T> {
  item: T;
  score: number;
}

/** Brute-force top-K nearest neighbours by cosine similarity. */
export function topK<T>(
  query: number[],
  items: Array<{ item: T; vector: number[] }>,
  k: number,
): Array<ScoredItem<T>> {
  const scored = items.map(({ item, vector }) => ({
    item,
    score: cosineSimilarity(query, vector),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, Math.max(0, k));
}
