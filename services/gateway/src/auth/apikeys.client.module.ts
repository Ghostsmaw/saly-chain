import { Global, Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { ApiKeysClient } from '@salychain/sdk-internal';
import { createLogger } from '@salychain/logger';
import { gatewayEnvSchema } from '../config/env.js';

export const APIKEYS_CLIENT = Symbol('APIKEYS_CLIENT');

@Global()
@Module({
  providers: [
    {
      provide: APIKEYS_CLIENT,
      useFactory: (): ApiKeysClient => {
        const env = loadEnv(gatewayEnvSchema);
        return new ApiKeysClient({
          baseUrl: env.APIKEYS_BASE_URL,
          logger: createLogger({ service: 'gateway.apikeys' }),
        });
      },
    },
  ],
  exports: [APIKEYS_CLIENT],
})
export class ApiKeysClientModule {}
