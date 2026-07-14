import { describe, expect, it, vi } from 'vitest';
import { AwsKmsProvider, buildAwsWrappingKeyRef } from './aws-kms.provider.js';

describe('buildAwsWrappingKeyRef', () => {
  it('encodes ARNs safely', () => {
    const arn = 'arn:aws:kms:us-east-1:123456789012:key/abcd-efgh';
    const ref = buildAwsWrappingKeyRef('us-east-1', arn);
    expect(ref.startsWith('aws-kms:us-east-1:')).toBe(true);
    expect(ref.includes('arn:aws:')).toBe(false);
  });
});

describe('AwsKmsProvider', () => {
  const keyId = 'arn:aws:kms:us-east-1:123456789012:alias/salychain-signer';
  const region = 'us-east-1';

  it('round-trips via mocked KMS client', async () => {
    const plaintext = Buffer.from('secret-seed-material');
    const ciphertext = Buffer.from('kms-ciphertext-blob');

    const client = {
      send: vi.fn(async (cmd: { constructor: { name: string } }) => {
        if (cmd.constructor.name === 'EncryptCommand') return { CiphertextBlob: ciphertext };
        if (cmd.constructor.name === 'DecryptCommand') return { Plaintext: plaintext };
        if (cmd.constructor.name === 'DescribeKeyCommand') return { KeyMetadata: { KeyId: keyId } };
        throw new Error(`unexpected command ${cmd.constructor.name}`);
      }),
    };

    const kms = new AwsKmsProvider({ keyId, region, client: client as never });
    const wrapped = await kms.encrypt(plaintext);
    expect(wrapped.equals(ciphertext)).toBe(true);

    const unwrapped = await kms.decrypt(wrapped, kms.wrappingKeyRef);
    expect(unwrapped.equals(plaintext)).toBe(true);
  });

  it('rejects wrong wrapping key ref', async () => {
    const client = {
      send: vi.fn(async () => ({ CiphertextBlob: Buffer.from('x') })),
    };
    const kms = new AwsKmsProvider({ keyId, region, client: client as never });
    const wrapped = await kms.encrypt(Buffer.from('x'));
    await expect(kms.decrypt(wrapped, 'aws-kms:other:abc')).rejects.toThrow(/cannot unwrap material wrapped/);
  });

  it('ping calls DescribeKey', async () => {
    const send = vi.fn(async (cmd: { constructor: { name: string } }) => {
      if (cmd.constructor.name === 'DescribeKeyCommand') return {};
      throw new Error('unexpected');
    });
    const kms = new AwsKmsProvider({ keyId, region, client: { send } as never });
    await kms.ping();
    expect(send).toHaveBeenCalled();
  });
});
