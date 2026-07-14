import { Global, Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Queue } from 'bullmq';
import { loadEnv } from '@salychain/config';
import { intelligenceEnvSchema, INTELLIGENCE_ENV, type IntelligenceEnv } from '../config/env.js';

export const REDIS_CONNECTION = Symbol('REDIS_CONNECTION');
export const JOB_QUEUE = Symbol('JOB_QUEUE');
// BullMQ forbids ':' in queue names (it's the internal Redis key separator).
export const JOB_QUEUE_NAME = 'intelligence-jobs';

@Global()
@Module({
  providers: [
    { provide: INTELLIGENCE_ENV, useFactory: () => loadEnv(intelligenceEnvSchema) },
    {
      provide: REDIS_CONNECTION,
      inject: [INTELLIGENCE_ENV],
      useFactory: (env: IntelligenceEnv): Redis =>
        new Redis(env.REDIS_URL, { maxRetriesPerRequest: null }),
    },
    {
      provide: JOB_QUEUE,
      inject: [REDIS_CONNECTION],
      useFactory: (connection: Redis) =>
        new Queue(JOB_QUEUE_NAME, {
          connection,
          defaultJobOptions: {
            attempts: 2,
            backoff: { type: 'exponential', delay: 30_000 },
            removeOnComplete: { age: 7 * 24 * 3600, count: 500 },
            removeOnFail: { age: 30 * 24 * 3600 },
          },
        }),
    },
  ],
  exports: [INTELLIGENCE_ENV, REDIS_CONNECTION, JOB_QUEUE],
})
export class QueueModule {}
