import { Global, Module } from '@nestjs/common';
import { AgentsClient, ExecutionClient } from '@salychain/sdk-internal';
import { loadEnv } from '@salychain/config';
import { intentEnvSchema } from '../config/env.js';

export const EXECUTION_CLIENT = Symbol('EXECUTION_CLIENT');
export const AGENTS_CLIENT = Symbol('AGENTS_CLIENT');

@Global()
@Module({
  providers: [
    {
      provide: EXECUTION_CLIENT,
      useFactory: () => {
        const env = loadEnv(intentEnvSchema);
        return new ExecutionClient({ baseUrl: env.EXECUTION_BASE_URL });
      },
    },
    {
      provide: AGENTS_CLIENT,
      useFactory: () => {
        const env = loadEnv(intentEnvSchema);
        return new AgentsClient({ baseUrl: env.AGENTS_BASE_URL });
      },
    },
  ],
  exports: [EXECUTION_CLIENT, AGENTS_CLIENT],
})
export class ClientsModule {}
