import { randomBytes } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { SecretVault } from './secret-vault.js';

const KEY = randomBytes(32).toString('base64');

describe('SecretVault', () => {
  it('round-trips a secret', () => {
    const vault = new SecretVault(KEY);
    const sealed = vault.seal('whsec_abc123');
    expect(sealed.startsWith('enc:v1:')).toBe(true);
    expect(sealed).not.toContain('whsec_abc123');
    expect(vault.open(sealed)).toBe('whsec_abc123');
  });

  it('produces a different ciphertext per call (random IV)', () => {
    const vault = new SecretVault(KEY);
    expect(vault.seal('same')).not.toBe(vault.seal('same'));
  });

  it('passes legacy plaintext rows through on read', () => {
    const vault = new SecretVault(KEY);
    expect(vault.open('deadbeefcafe')).toBe('deadbeefcafe');
  });

  it('is a passthrough without a key (development)', () => {
    const vault = new SecretVault(undefined);
    expect(vault.enabled).toBe(false);
    expect(vault.seal('plain')).toBe('plain');
    expect(vault.open('plain')).toBe('plain');
  });

  it('refuses to open ciphertext without a key', () => {
    const sealed = new SecretVault(KEY).seal('secret');
    expect(() => new SecretVault(undefined).open(sealed)).toThrowError(/not configured/);
  });

  it('rejects tampered ciphertext', () => {
    const vault = new SecretVault(KEY);
    const sealed = vault.seal('secret');
    const raw = Buffer.from(sealed.slice('enc:v1:'.length), 'base64');
    raw[raw.length - 1] ^= 0xff;
    expect(() => vault.open('enc:v1:' + raw.toString('base64'))).toThrow();
  });

  it('rejects keys that are not 32 bytes', () => {
    expect(() => new SecretVault(Buffer.from('short').toString('base64'))).toThrowError(
      /32 bytes/,
    );
  });
});
