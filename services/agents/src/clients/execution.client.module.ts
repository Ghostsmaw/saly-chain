import { Global, Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { createLogger } from '@salychain/logger';
import { ExecutionClient } from '@salychain/sdk-internal';
import { agentsEnvSchema } from '../config/env.js';

export const EXECUTION_CLIENT = Symbol('EXECUTION_CLIENT');

@Global()
@Module({
  providers: [
    {
      provide: EXECUTION_CLIENT,
      useFactory: () => {
        const env = loadEnv(agentsEnvSchema);
        return new ExecutionClient({
          baseUrl: env.EXECUTION_BASE_URL,
          logger: createLogger({ service: 'agents.execution' }),
        });
      },
    },
  ],
  exports: [EXECUTION_CLIENT],
})
export class ExecutionClientModule {}
