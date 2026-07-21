import { describe, expect, it } from 'vitest';
import { PiiVault } from './pii-vault.js';

describe('PiiVault', () => {
  const key = Buffer.alloc(32, 7).toString('base64');

  it('round-trips sealed JSON', () => {
    const vault = new PiiVault(key);
    const sealed = vault.sealJson({ document_number: 'AB123', country: 'NG' });
    expect(sealed).toEqual({ _enc: expect.stringMatching(/^enc:v1:/) });
    expect(vault.openJson(sealed)).toEqual({ document_number: 'AB123', country: 'NG' });
  });

  it('passthrough without a key (legacy plaintext)', () => {
    const vault = new PiiVault(undefined);
    expect(vault.sealJson({ a: 1 })).toEqual({ a: 1 });
    expect(vault.openJson({ a: 1 })).toEqual({ a: 1 });
  });
});
