import { describe, expect, it } from 'vitest';
import { extractPrefix, generateApiKey, verifyApiKey } from './key-secret.js';

describe('api-key secret', () => {
  it('generates a key with the correct shape and verifies it', () => {
    const k = generateApiKey('TEST', 'unit-test-pepper-1234567890');
    expect(k.prefix).toMatch(/^sk_test_[0-9A-HJKMNP-TV-Z]{12}$/);
    expect(k.fullSecret.startsWith(`${k.prefix}_`)).toBe(true);
    expect(k.lastFour.length).toBe(4);
    expect(k.secretHash.length).toBe(64); // 32 bytes hex

    const ok = verifyApiKey(k.fullSecret, { salt: k.salt, secretHash: k.secretHash }, 'unit-test-pepper-1234567890');
    expect(ok).toBe(true);
  });

  it('rejects a tampered secret', () => {
    const k = generateApiKey('LIVE', 'unit-test-pepper-1234567890');
    const tampered = k.fullSecret.slice(0, -1) + (k.fullSecret.endsWith('0') ? '1' : '0');
    expect(verifyApiKey(tampered, { salt: k.salt, secretHash: k.secretHash }, 'unit-test-pepper-1234567890')).toBe(false);
  });

  it('rejects a key issued with a different pepper', () => {
    const k = generateApiKey('TEST', 'pepper-a-1234567890');
    expect(verifyApiKey(k.fullSecret, { salt: k.salt, secretHash: k.secretHash }, 'pepper-b-1234567890')).toBe(false);
  });

  it('extracts the prefix correctly', () => {
    const k = generateApiKey('LIVE', 'pepper-1234567890');
    expect(extractPrefix(k.fullSecret)).toBe(k.prefix);
  });

  it('returns null for malformed input', () => {
    expect(extractPrefix('not_a_key')).toBeNull();
    expect(extractPrefix('sk_unknown_abc_def')).toBeNull();
    expect(extractPrefix('xx_test_abc_def')).toBeNull();
  });
});
