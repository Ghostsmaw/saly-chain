import { describe, expect, it } from 'vitest';
import { randomBytes } from 'node:crypto';
import { LocalKmsProvider } from './local-kms.provider.js';

const masterKey = randomBytes(32).toString('base64');

describe('LocalKmsProvider', () => {
  it('round-trips a payload', async () => {
    const kms = new LocalKmsProvider(masterKey);
    const plaintext = randomBytes(32);
    const wrapped = await kms.encrypt(plaintext);
    const unwrapped = await kms.decrypt(wrapped, kms.wrappingKeyRef);
    expect(unwrapped.equals(plaintext)).toBe(true);
  });

  it('rejects tampered ciphertext (auth tag)', async () => {
    const kms = new LocalKmsProvider(masterKey);
    const wrapped = Buffer.from(await kms.encrypt(Buffer.from('hello')));
    wrapped[wrapped.length - 1] ^= 0xff; // flip a bit in the ciphertext
    await expect(kms.decrypt(wrapped, kms.wrappingKeyRef)).rejects.toThrow(/auth tag check failed/);
  });

  it('rejects a wrong wrapping key reference', async () => {
    const kms = new LocalKmsProvider(masterKey);
    const wrapped = await kms.encrypt(Buffer.from('hello'));
    await expect(kms.decrypt(wrapped, 'aws-kms:foo')).rejects.toThrow(/cannot unwrap material wrapped/);
  });

  it('rejects a bad master key length', () => {
    expect(() => new LocalKmsProvider(Buffer.from('short').toString('base64'))).toThrow(
      /KMS_LOCAL_MASTER_KEY/,
    );
  });

  it('passes ping round-trip', async () => {
    const kms = new LocalKmsProvider(masterKey);
    await expect(kms.ping()).resolves.toBeUndefined();
  });
});
