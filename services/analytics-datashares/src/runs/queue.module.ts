import { Global, Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Queue } from 'bullmq';
import { loadEnv } from '@salychain/config';
import { datasharesEnvSchema, DATASHARES_ENV, type DatasharesEnv } from '../config/env.js';

export const REDIS_CONNECTION = Symbol('REDIS_CONNECTION');
export const RUN_QUEUE = Symbol('RUN_QUEUE');
// BullMQ forbids ':' in queue names (it's the internal Redis key separator).
export const RUN_QUEUE_NAME = 'datashares-run';

@Global()
@Module({
  providers: [
    { provide: DATASHARES_ENV, useFactory: () => loadEnv(datasharesEnvSchema) },
    {
      provide: REDIS_CONNECTION,
      inject: [DATASHARES_ENV],
      useFactory: (env: DatasharesEnv): Redis =>
        new Redis(env.REDIS_URL, { maxRetriesPerRequest: null }),
    },
    {
      provide: RUN_QUEUE,
      inject: [REDIS_CONNECTION],
      useFactory: (connection: Redis) =>
        new Queue(RUN_QUEUE_NAME, {
          connection,
          defaultJobOptions: {
            attempts: 3,
            backoff: { type: 'exponential', delay: 30_000 },
            removeOnComplete: { age: 7 * 24 * 3600, count: 1_000 },
            removeOnFail: { age: 30 * 24 * 3600 },
          },
        }),
    },
  ],
  exports: [DATASHARES_ENV, REDIS_CONNECTION, RUN_QUEUE],
})
export class QueueModule {}
