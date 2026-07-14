import { Global, Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { createLogger } from '@salychain/logger';
import { AgentsClient } from '@salychain/sdk-internal';
import { walletEnvSchema } from '../config/env.js';

export const AGENTS_CLIENT = Symbol('AGENTS_CLIENT');

@Global()
@Module({
  providers: [
    {
      provide: AGENTS_CLIENT,
      useFactory: () => {
        const env = loadEnv(walletEnvSchema);
        return new AgentsClient({
          baseUrl: env.AGENTS_BASE_URL,
          logger: createLogger({ service: 'wallet.agents' }),
        });
      },
    },
  ],
  exports: [AGENTS_CLIENT],
})
export class AgentsClientModule {}
