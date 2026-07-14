import { Global, Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { createLogger } from '@salychain/logger';
import { AgentsClient, IdentityClient, WalletClient } from '@salychain/sdk-internal';
import { gatewayEnvSchema } from '../config/env.js';

export const IDENTITY_CLIENT = Symbol('IDENTITY_CLIENT');
export const AGENTS_CLIENT = Symbol('AGENTS_CLIENT');
export const WALLET_CLIENT = Symbol('WALLET_CLIENT');

@Global()
@Module({
  providers: [
    {
      provide: IDENTITY_CLIENT,
      useFactory: () => {
        const env = loadEnv(gatewayEnvSchema);
        return new IdentityClient({
          baseUrl: env.IDENTITY_BASE_URL,
          logger: createLogger({ service: 'gateway.identity' }),
        });
      },
    },
    {
      provide: AGENTS_CLIENT,
      useFactory: () => {
        const env = loadEnv(gatewayEnvSchema);
        return new AgentsClient({
          baseUrl: env.AGENTS_BASE_URL,
          logger: createLogger({ service: 'gateway.agents' }),
        });
      },
    },
    {
      provide: WALLET_CLIENT,
      useFactory: () => {
        const env = loadEnv(gatewayEnvSchema);
        return new WalletClient({
          baseUrl: env.WALLET_BASE_URL,
          logger: createLogger({ service: 'gateway.wallet' }),
        });
      },
    },
  ],
  exports: [IDENTITY_CLIENT, AGENTS_CLIENT, WALLET_CLIENT],
})
export class S4ClientsModule {}
