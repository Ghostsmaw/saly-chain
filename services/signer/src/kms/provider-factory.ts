import { loadEnv } from '@salychain/config';
import type { SignerEnv } from '../config/env.js';
import { signerEnvSchema } from '../config/env.js';
import { AwsKmsProvider, parseAwsWrappingKeyRef } from './aws-kms.provider.js';
import type { KmsProvider } from './kms.provider.js';
import { LocalKmsProvider } from './local-kms.provider.js';

/** Instantiate the KMS provider configured for the current deploy (encrypt target). */
export function createActiveKmsProvider(env: SignerEnv = loadEnv(signerEnvSchema)): KmsProvider {
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
}

/**
 * Instantiate the provider that originally wrapped a key (decrypt source).
 * Uses stored `wrapping_key_ref` rather than the active deploy config.
 */
export function createKmsProviderForRef(wrappingKeyRef: string, env: SignerEnv = loadEnv(signerEnvSchema)): KmsProvider {
  if (wrappingKeyRef === 'local:v1') {
    if (!env.KMS_LOCAL_MASTER_KEY) {
      throw new Error('KMS_LOCAL_MASTER_KEY required to unwrap local:v1 material');
    }
    return new LocalKmsProvider(env.KMS_LOCAL_MASTER_KEY);
  }

  const parsed = parseAwsWrappingKeyRef(wrappingKeyRef);
  if (parsed) {
    return new AwsKmsProvider({
      keyId: parsed.keyId,
      region: parsed.region,
      endpoint: env.KMS_AWS_ENDPOINT,
    });
  }

  throw new Error(`Unsupported wrapping_key_ref: ${wrappingKeyRef}`);
}
