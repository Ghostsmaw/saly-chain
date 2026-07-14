import { Global, Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { createLogger } from '@salychain/logger';
import { LedgerClient } from '@salychain/sdk-internal';
import { walletEnvSchema } from '../config/env.js';

export const LEDGER_CLIENT = Symbol('LEDGER_CLIENT');

@Global()
@Module({
  providers: [
    {
      provide: LEDGER_CLIENT,
      useFactory: () => {
        const env = loadEnv(walletEnvSchema);
        return new LedgerClient({
          baseUrl: env.LEDGER_BASE_URL,
          logger: createLogger({ service: 'wallet.ledger' }),
        });
      },
    },
  ],
  exports: [LEDGER_CLIENT],
})
export class LedgerClientModule {}
