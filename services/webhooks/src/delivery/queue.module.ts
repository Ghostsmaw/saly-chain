import { Global, Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Queue } from 'bullmq';
import { loadEnv } from '@salychain/config';
import { webhooksEnvSchema, WEBHOOKS_ENV, type WebhooksEnv } from '../config/env.js';

export const REDIS_CONNECTION = Symbol('REDIS_CONNECTION');
export const DELIVERY_QUEUE = Symbol('DELIVERY_QUEUE');
// BullMQ forbids ':' in queue names (it's the internal Redis key separator).
export const DELIVERY_QUEUE_NAME = 'webhooks-delivery';

@Global()
@Module({
  providers: [
    { provide: WEBHOOKS_ENV, useFactory: () => loadEnv(webhooksEnvSchema) },
    {
      provide: REDIS_CONNECTION,
      inject: [WEBHOOKS_ENV],
      useFactory: (env: WebhooksEnv): Redis =>
        new Redis(env.REDIS_URL, { maxRetriesPerRequest: null }),
    },
    {
      provide: DELIVERY_QUEUE,
      inject: [REDIS_CONNECTION, WEBHOOKS_ENV],
      useFactory: (connection: Redis, env: WebhooksEnv) =>
        new Queue(DELIVERY_QUEUE_NAME, {
          connection,
          defaultJobOptions: {
            attempts: env.MAX_DELIVERY_ATTEMPTS,
            backoff: { type: 'exponential', delay: env.DELIVERY_BASE_BACKOFF_MS },
            removeOnComplete: { age: 24 * 3600, count: 5_000 },
            removeOnFail: { age: 7 * 24 * 3600 },
          },
        }),
    },
  ],
  exports: [WEBHOOKS_ENV, REDIS_CONNECTION, DELIVERY_QUEUE],
})
export class QueueModule {}
