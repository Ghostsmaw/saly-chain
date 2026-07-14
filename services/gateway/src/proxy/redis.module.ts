import { Global, Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { loadEnv } from '@salychain/config';
import { gatewayEnvSchema, GATEWAY_ENV, type GatewayEnv } from '../config/env.js';

export const REDIS_CONNECTION = Symbol('REDIS_CONNECTION');

@Global()
@Module({
  providers: [
    { provide: GATEWAY_ENV, useFactory: () => loadEnv(gatewayEnvSchema) },
    {
      provide: REDIS_CONNECTION,
      inject: [GATEWAY_ENV],
      useFactory: (env: GatewayEnv): Redis =>
        new Redis(env.REDIS_URL, { maxRetriesPerRequest: null }),
    },
  ],
  exports: [GATEWAY_ENV, REDIS_CONNECTION],
})
export class RedisModule {}
