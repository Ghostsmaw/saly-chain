import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { ExternalError } from '@salychain/errors';
import type { KmsProvider } from './kms.provider.js';

/**
 * Local AES-256-GCM provider for development and tests.
 *
 * Wire format of the produced ciphertext (single buffer):
 *
 *   [ version (1B) | iv (12B) | tag (16B) | ciphertext (N) ]
 *
 *  version=1  → AES-256-GCM with the master key resolved via the configured ref.
 *
 * The master key is base64-decoded from `KMS_LOCAL_MASTER_KEY`. In production
 * this provider is rejected at startup by the bootstrap guard.
 */
export class LocalKmsProvider implements KmsProvider {
  readonly name = 'local';
  readonly wrappingKeyRef = 'local:v1';
  private readonly masterKey: Buffer;

  constructor(base64MasterKey: string) {
    const buf = Buffer.from(base64MasterKey, 'base64');
    if (buf.length !== 32) {
      throw ExternalError(
        'signer.kms.local_invalid_master_key',
        `KMS_LOCAL_MASTER_KEY must decode to 32 bytes (got ${buf.length})`,
      );
    }
    this.masterKey = buf;
  }

  async encrypt(plaintext: Buffer): Promise<Buffer> {
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', this.masterKey, iv);
    const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([Buffer.from([0x01]), iv, tag, ciphertext]);
  }

  async decrypt(ciphertext: Buffer, wrappingKeyRef: string): Promise<Buffer> {
    if (wrappingKeyRef !== this.wrappingKeyRef) {
      throw ExternalError(
        'signer.kms.wrong_wrapping_key',
        `Local KMS cannot unwrap material wrapped with ${wrappingKeyRef}`,
      );
    }
    if (ciphertext.length < 1 + 12 + 16) {
      throw ExternalError('signer.kms.bad_ciphertext', 'Ciphertext too short');
    }
    const version = ciphertext[0];
    if (version !== 0x01) {
      throw ExternalError('signer.kms.bad_version', `Unsupported ciphertext version ${version}`);
    }
    const iv = ciphertext.subarray(1, 13);
    const tag = ciphertext.subarray(13, 29);
    const body = ciphertext.subarray(29);
    const decipher = createDecipheriv('aes-256-gcm', this.masterKey, iv);
    decipher.setAuthTag(tag);
    try {
      return Buffer.concat([decipher.update(body), decipher.final()]);
    } catch (err) {
      throw ExternalError('signer.kms.decrypt_failed', 'AES-GCM auth tag check failed', { cause: err });
    }
  }

  async ping(): Promise<void> {
    const probe = Buffer.from('salychain-kms-probe');
    const wrapped = await this.encrypt(probe);
    const unwrapped = await this.decrypt(wrapped, this.wrappingKeyRef);
    if (!unwrapped.equals(probe)) {
      throw ExternalError('signer.kms.local_ping_failed', 'Local KMS round-trip probe failed');
    }
  }
}
