import { Inject, Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { NotFoundError } from '@salychain/errors';
import { PrismaService } from '../prisma/prisma.service.js';
import { FeaturesService } from '../features/features.service.js';
import { INTELLIGENCE_ENV, type IntelligenceEnv } from '../config/env.js';
import { embedText, topK } from './embeddings.js';
import type { AddressFeatures } from '../features/features.js';

const MODEL = 'local-hash-v1';
const SEARCH_SCAN_CAP = 5_000;

export interface SimilarAddress {
  chain: string;
  address: string;
  score: number;
}

@Injectable()
export class EmbeddingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly features: FeaturesService,
    @Inject(INTELLIGENCE_ENV) private readonly env: IntelligenceEnv,
  ) {}

  /** Build a deterministic activity-profile embedding for an address + store it. */
  async upsertAddressEmbedding(chain: string, address: string): Promise<number[]> {
    const features = await this.features.getAddressFeatures(chain, address);
    const text = profileText(
      features,
      features.entity?.label ?? null,
      features.entity?.category ?? null,
    );
    const vector = embedText(text, this.env.EMBEDDING_DIM);

    await this.prisma.addressEmbedding.upsert({
      where: { chain_address: { chain, address: address.toLowerCase() } },
      create: {
        id: `emb_${ulid()}`,
        chain,
        address: address.toLowerCase(),
        dim: this.env.EMBEDDING_DIM,
        vector,
        model: MODEL,
      },
      update: { dim: this.env.EMBEDDING_DIM, vector, model: MODEL },
    });
    return vector;
  }

  async searchByText(chain: string, text: string, k: number): Promise<SimilarAddress[]> {
    const query = embedText(text, this.env.EMBEDDING_DIM);
    return this.rank(chain, query, k, null);
  }

  async searchSimilarToAddress(
    chain: string,
    address: string,
    k: number,
  ): Promise<SimilarAddress[]> {
    const addr = address.toLowerCase();
    const existing = await this.prisma.addressEmbedding.findUnique({
      where: { chain_address: { chain, address: addr } },
    });
    const query = existing
      ? (existing.vector as number[])
      : await this.upsertAddressEmbedding(chain, addr);
    return this.rank(chain, query, k, addr);
  }

  private async rank(
    chain: string,
    query: number[],
    k: number,
    excludeAddress: string | null,
  ): Promise<SimilarAddress[]> {
    const rows = await this.prisma.addressEmbedding.findMany({
      where: { chain },
      take: SEARCH_SCAN_CAP,
    });
    if (rows.length === 0) {
      throw NotFoundError(
        'intelligence.embeddings.empty',
        `No embeddings materialized for chain ${chain}`,
      );
    }
    const items = rows
      .filter((r) => r.address !== excludeAddress && (r.vector as number[]).length === query.length)
      .map((r) => ({ item: { chain: r.chain, address: r.address }, vector: r.vector as number[] }));
    return topK(query, items, k).map((s) => ({
      chain: s.item.chain,
      address: s.item.address,
      score: Math.round(s.score * 1000) / 1000,
    }));
  }
}

/**
 * Turns numeric features into a stable bag-of-words "profile" the hashing
 * embedder can encode. Buckets keep nearby behaviours close in vector space.
 */
export function profileText(
  f: AddressFeatures,
  label: string | null,
  category: string | null,
): string {
  const tokens: string[] = [`chain_${f.chain}`];
  if (label) tokens.push(`label_${label.replace(/\s+/g, '_')}`);
  if (category) tokens.push(`category_${category}`);
  tokens.push(`activity_${bucket(f.transfers_total)}`);
  tokens.push(`counterparties_${bucket(f.distinct_counterparties)}`);
  tokens.push(`tokens_${bucket(f.distinct_tokens)}`);
  tokens.push(`out_${bucket(f.volume_out)}`);
  tokens.push(`in_${bucket(f.volume_in)}`);
  tokens.push(`age_${bucket(f.age_days)}`);
  // repeat dominant signals so they weigh more in the embedding
  if (f.distinct_counterparties >= 20) tokens.push('high_fanout', 'high_fanout');
  if (f.age_days <= 7) tokens.push('new_address');
  return tokens.join(' ');
}

function bucket(n: number): string {
  if (n <= 0) return '0';
  if (n < 10) return 'lt10';
  if (n < 100) return 'lt100';
  if (n < 1_000) return 'lt1k';
  if (n < 10_000) return 'lt10k';
  return 'gte10k';
}
