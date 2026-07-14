import { Global, Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { createLogger } from '@salychain/logger';
import { ExecutionClient, IntentClient } from '@salychain/sdk-internal';
import { merchantEnvSchema } from '../config/env.js';

export const EXECUTION_CLIENT = Symbol('EXECUTION_CLIENT');
export const INTENT_CLIENT = Symbol('INTENT_CLIENT');

@Global()
@Module({
  providers: [
    {
      provide: EXECUTION_CLIENT,
      useFactory: () => {
        const env = loadEnv(merchantEnvSchema);
        return new ExecutionClient({
          baseUrl: env.EXECUTION_BASE_URL,
          logger: createLogger({ service: 'merchant.execution' }),
        });
      },
    },
    {
      provide: INTENT_CLIENT,
      useFactory: () => {
        const env = loadEnv(merchantEnvSchema);
        return new IntentClient({
          baseUrl: env.INTENT_BASE_URL,
          logger: createLogger({ service: 'merchant.intent' }),
        });
      },
    },
  ],
  exports: [EXECUTION_CLIENT, INTENT_CLIENT],
})
export class ClientsModule {}
