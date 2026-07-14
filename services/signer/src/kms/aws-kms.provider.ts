import {
  DecryptCommand,
  DescribeKeyCommand,
  EncryptCommand,
  KMSClient,
  type KMSClientConfig,
} from '@aws-sdk/client-kms';
import { ExternalError } from '@salychain/errors';
import type { KmsProvider } from './kms.provider.js';

export interface AwsKmsProviderOptions {
  keyId: string;
  region: string;
  /** Optional — LocalStack / custom endpoint for integration tests. */
  endpoint?: string;
  /** Inject for unit tests. */
  client?: KMSClient;
}

/** Canonical encryption context — must match on Encrypt and Decrypt. */
export const AWS_KMS_ENCRYPTION_CONTEXT = {
  service: 'salychain-signer',
  purpose: 'wallet-private-key',
} as const;

/**
 * AWS KMS envelope encryption for custodial private keys.
 *
 * Uses the default AWS credential chain (ECS task role, IRSA, env vars).
 * IAM policy on the signer task must grant kms:Encrypt, kms:Decrypt,
 * kms:DescribeKey on the configured CMK.
 */
export class AwsKmsProvider implements KmsProvider {
  readonly name = 'aws';
  readonly wrappingKeyRef: string;
  private readonly keyId: string;
  private readonly client: KMSClient;

  constructor(opts: AwsKmsProviderOptions) {
    if (!opts.keyId || !opts.region) {
      throw ExternalError('signer.kms.aws_misconfigured', 'KMS_AWS_KEY_ID and KMS_AWS_REGION are required');
    }
    this.keyId = opts.keyId;
    this.wrappingKeyRef = buildAwsWrappingKeyRef(opts.region, opts.keyId);

    if (opts.client) {
      this.client = opts.client;
    } else {
      const config: KMSClientConfig = { region: opts.region };
      if (opts.endpoint) config.endpoint = opts.endpoint;
      this.client = new KMSClient(config);
    }
  }

  async encrypt(plaintext: Buffer): Promise<Buffer> {
    const res = await this.client.send(
      new EncryptCommand({
        KeyId: this.keyId,
        Plaintext: plaintext,
        EncryptionContext: { ...AWS_KMS_ENCRYPTION_CONTEXT },
      }),
    );
    if (!res.CiphertextBlob) {
      throw ExternalError('signer.kms.aws_encrypt_failed', 'AWS KMS Encrypt returned no ciphertext');
    }
    return Buffer.from(res.CiphertextBlob);
  }

  async decrypt(ciphertext: Buffer, wrappingKeyRef: string): Promise<Buffer> {
    if (wrappingKeyRef !== this.wrappingKeyRef) {
      throw ExternalError(
        'signer.kms.wrong_wrapping_key',
        `AWS KMS cannot unwrap material wrapped with ${wrappingKeyRef}`,
      );
    }
    const res = await this.client.send(
      new DecryptCommand({
        CiphertextBlob: ciphertext,
        EncryptionContext: { ...AWS_KMS_ENCRYPTION_CONTEXT },
      }),
    );
    if (!res.Plaintext) {
      throw ExternalError('signer.kms.aws_decrypt_failed', 'AWS KMS Decrypt returned no plaintext');
    }
    return Buffer.from(res.Plaintext);
  }

  async ping(): Promise<void> {
    await this.client.send(new DescribeKeyCommand({ KeyId: this.keyId }));
  }
}

/** Stable, parse-safe wrapping ref that survives ARNs with colons. */
export function buildAwsWrappingKeyRef(region: string, keyId: string): string {
  const encoded = Buffer.from(keyId, 'utf8').toString('base64url');
  return `aws-kms:${region}:${encoded}`;
}

/** Reverse {@link buildAwsWrappingKeyRef} for decrypting legacy wrapped keys. */
export function parseAwsWrappingKeyRef(ref: string): { region: string; keyId: string } | null {
  const match = /^aws-kms:([^:]+):([A-Za-z0-9_-]+)$/.exec(ref);
  if (!match) return null;
  return { region: match[1]!, keyId: Buffer.from(match[2]!, 'base64url').toString('utf8') };
}
