import { Global, Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Queue, type ConnectionOptions } from 'bullmq';
import { loadEnv } from '@salychain/config';
import { walletEnvSchema } from '../config/env.js';

export const REDIS_CONNECTION = Symbol('REDIS_CONNECTION');
export const BROADCAST_QUEUE = Symbol('BROADCAST_QUEUE');

export const BROADCAST_QUEUE_NAME = 'wallet-broadcast';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CONNECTION,
      useFactory: (): Redis => {
        const env = loadEnv(walletEnvSchema);
        return new Redis(env.REDIS_URL, { maxRetriesPerRequest: null });
      },
    },
    {
      provide: BROADCAST_QUEUE,
      inject: [REDIS_CONNECTION],
      useFactory: (connection: Redis) =>
        new Queue(BROADCAST_QUEUE_NAME, {
          connection: connection as ConnectionOptions,
          defaultJobOptions: {
            attempts: 8,
            backoff: { type: 'exponential', delay: 2_000 },
            removeOnComplete: { age: 24 * 3600, count: 5_000 },
            removeOnFail: { age: 7 * 24 * 3600 },
          },
        }),
    },
  ],
  exports: [REDIS_CONNECTION, BROADCAST_QUEUE],
})
export class QueuesModule {}
