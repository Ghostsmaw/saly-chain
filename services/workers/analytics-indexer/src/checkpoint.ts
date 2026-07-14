import { PrismaClient } from './generated/prisma/index.js';
import type { CheckpointStore, IndexCheckpoint } from '@salychain/analytics-indexer';

export class PrismaCheckpointStore implements CheckpointStore {
  constructor(private readonly prisma: PrismaClient) {}

  async get(chainKey: string): Promise<IndexCheckpoint | null> {
    const row = await this.prisma.analyticsIndexerCheckpoint.findUnique({ where: { chainKey } });
    if (!row) return null;
    return {
      chainKey: row.chainKey,
      lastPosition: row.lastPosition,
      lastBlockHash: row.lastBlockHash,
      backfillComplete: row.backfillComplete,
    };
  }

  async upsert(checkpoint: IndexCheckpoint): Promise<void> {
    await this.prisma.analyticsIndexerCheckpoint.upsert({
      where: { chainKey: checkpoint.chainKey },
      create: {
        chainKey: checkpoint.chainKey,
        lastPosition: checkpoint.lastPosition,
        lastBlockHash: checkpoint.lastBlockHash,
        backfillComplete: checkpoint.backfillComplete,
      },
      update: {
        lastPosition: checkpoint.lastPosition,
        lastBlockHash: checkpoint.lastBlockHash,
        backfillComplete: checkpoint.backfillComplete,
      },
    });
  }
}
