import { describe, expect, it } from 'vitest';
import { XrplChainAdapter } from './adapter.js';

describe('XrplChainAdapter (pure)', () => {
  const adapter = new XrplChainAdapter({ network: 'xrpl-testnet' });

  it('generates valid ed25519 keypairs with classic addresses', () => {
    const kp = adapter.generateKey();
    expect(kp.address).toMatch(/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/);
    expect(kp.publicKey).toMatch(/^[A-F0-9]+$/i);
    expect(kp.privateKey).toMatch(/^[A-F0-9]+$/i);
    expect(XrplChainAdapter.isValidAddress(kp.address)).toBe(true);
  });

  it('round-trips seed → derived address', () => {
    const a = adapter.generateKey();
    const b = adapter.deriveFromSeed(a.seed);
    expect(b.address).toBe(a.address);
    expect(b.publicKey).toBe(a.publicKey);
  });

  it('converts XRP to drops', () => {
    expect(XrplChainAdapter.xrpToDrops('1')).toBe('1000000');
    expect(XrplChainAdapter.xrpToDrops('0.000001')).toBe('1');
  });

  it('rejects invalid classic addresses', () => {
    expect(XrplChainAdapter.isValidAddress('0xabcd')).toBe(false);
    expect(XrplChainAdapter.isValidAddress('rNotAValidAddress123')).toBe(false);
  });
});
