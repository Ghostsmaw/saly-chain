import { Global, Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { createLogger } from '@salychain/logger';
import { WalletClient } from '@salychain/sdk-internal';
import { agentsEnvSchema } from '../config/env.js';

export const WALLET_CLIENT = Symbol('WALLET_CLIENT');

@Global()
@Module({
  providers: [
    {
      provide: WALLET_CLIENT,
      useFactory: () => {
        const env = loadEnv(agentsEnvSchema);
        return new WalletClient({
          baseUrl: env.WALLET_BASE_URL,
          logger: createLogger({ service: 'agents.wallet' }),
        });
      },
    },
  ],
  exports: [WALLET_CLIENT],
})
export class WalletClientModule {}
