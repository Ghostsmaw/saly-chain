import { Global, Module } from '@nestjs/common';
import { SignerClient } from '@salychain/sdk-internal';
import { loadEnv } from '@salychain/config';
import { walletEnvSchema } from '../config/env.js';

export const SIGNER_CLIENT = Symbol('SIGNER_CLIENT');

@Global()
@Module({
  providers: [
    {
      provide: SIGNER_CLIENT,
      useFactory: (): SignerClient => {
        const env = loadEnv(walletEnvSchema);
        return new SignerClient({ baseUrl: env.SIGNER_BASE_URL });
      },
    },
  ],
  exports: [SIGNER_CLIENT],
})
export class SignerModule {}
