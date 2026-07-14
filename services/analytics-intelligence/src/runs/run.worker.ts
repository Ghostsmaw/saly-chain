import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Worker, type Job } from 'bullmq';
import type { Redis } from 'ioredis';
import { PrismaService } from '../prisma/prisma.service.js';
import { EntitiesService } from '../entities/entities.service.js';
import { EmbeddingsService } from '../embeddings/embeddings.service.js';
import { JOB_QUEUE_NAME, REDIS_CONNECTION } from './queue.module.js';

export type JobData =
  | { type: 'resolve'; trigger: 'MANUAL' | 'SCHEDULE'; chain?: string }
  | { type: 'embeddings'; chain: string };

const EMBEDDING_MATERIALIZE_CAP = 5_000;

/**
 * Processes intelligence batch jobs:
 *   - `resolve`     → run a full entity-resolution pass (optionally per chain).
 *   - `embeddings`  → (re)materialize address embeddings for resolved members.
 * Failures are retried by BullMQ with exponential backoff.
 */
@Injectable()
export class RunWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RunWorker.name);
  private worker?: Worker<JobData>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly entities: EntitiesService,
    private readonly embeddings: EmbeddingsService,
    @Inject(REDIS_CONNECTION) private readonly redis: Redis,
  ) {}

  async onModuleInit(): Promise<void> {
    this.worker = new Worker<JobData>(JOB_QUEUE_NAME, (job) => this.handle(job), {
      connection: this.redis,
      concurrency: 2,
    });
    this.worker.on('failed', (job, err) =>
      this.logger.warn(`job ${job?.id} failed: ${err.message}`),
    );
    this.logger.log(`RunWorker listening on ${JOB_QUEUE_NAME}`);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.worker) await this.worker.close();
  }

  private async handle(job: Job<JobData>): Promise<void> {
    switch (job.data.type) {
      case 'resolve': {
        const res = await this.entities.runResolution(job.data.trigger, job.data.chain);
        this.logger.log(`resolve job ${job.id}: ${JSON.stringify(res)}`);
        return;
      }
      case 'embeddings': {
        const members = await this.prisma.entityMember.findMany({
          where: { chain: job.data.chain },
          take: EMBEDDING_MATERIALIZE_CAP,
        });
        let ok = 0;
        for (const m of members) {
          try {
            await this.embeddings.upsertAddressEmbedding(m.chain, m.address);
            ok += 1;
          } catch (err) {
            this.logger.debug(
              `embedding ${m.chain}:${m.address} failed: ${(err as Error).message}`,
            );
          }
        }
        this.logger.log(`embeddings job ${job.id}: ${ok}/${members.length} for ${job.data.chain}`);
        return;
      }
    }
  }
}
