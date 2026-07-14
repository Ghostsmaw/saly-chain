import { Global, Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { signerEnvSchema } from '../config/env.js';
import { LocalKmsProvider } from './local-kms.provider.js';
import { AwsKmsProvider } from './aws-kms.provider.js';
import type { KmsProvider } from './kms.provider.js';

export const KMS_PROVIDER_TOKEN = Symbol('KMS_PROVIDER');

@Global()
@Module({
  providers: [
    {
      provide: KMS_PROVIDER_TOKEN,
      useFactory: (): KmsProvider => {
        const env = loadEnv(signerEnvSchema);
        if (env.KMS_PROVIDER === 'local') {
          if (!env.KMS_LOCAL_MASTER_KEY) {
            throw new Error('KMS_LOCAL_MASTER_KEY must be set when KMS_PROVIDER=local');
          }
          return new LocalKmsProvider(env.KMS_LOCAL_MASTER_KEY);
        }
        if (!env.KMS_AWS_KEY_ID || !env.KMS_AWS_REGION) {
          throw new Error('KMS_AWS_KEY_ID and KMS_AWS_REGION must be set when KMS_PROVIDER=aws');
        }
        return new AwsKmsProvider({
          keyId: env.KMS_AWS_KEY_ID,
          region: env.KMS_AWS_REGION,
          endpoint: env.KMS_AWS_ENDPOINT,
        });
      },
    },
  ],
  exports: [KMS_PROVIDER_TOKEN],
})
export class KmsModule {}
