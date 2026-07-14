import { describe, expect, it } from 'vitest';
import { computeAttestationHash } from './attestation.js';

describe('attestation hash', () => {
  it('is deterministic for the same payload', () => {
    const input = {
      custodian: 'primary-custodian',
      balanceMinor: 1_000_000_000n,
      authorizedCeilingMinor: 2_000_000_000n,
      asOf: '2026-06-24T12:00:00.000Z',
    };
    expect(computeAttestationHash(input)).toBe(computeAttestationHash(input));
    expect(computeAttestationHash(input)).toMatch(/^0x[a-fA-F0-9]{64}$/);
  });

  it('changes when balance changes', () => {
    const base = {
      custodian: 'c',
      balanceMinor: 100n,
      authorizedCeilingMinor: 200n,
      asOf: '2026-06-24T12:00:00.000Z',
    };
    expect(computeAttestationHash({ ...base, balanceMinor: 101n })).not.toBe(computeAttestationHash(base));
  });
});
