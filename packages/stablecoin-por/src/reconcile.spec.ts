import { describe, expect, it } from 'vitest';
import { isUnderCollateralized, reserveRatioBps, supplyDriftMinor } from './reconcile.js';

describe('supply reconciliation', () => {
  it('computes drift as reserves minus supply', () => {
    expect(supplyDriftMinor(1_000_000n, 1_500_000n)).toBe(500_000n);
    expect(supplyDriftMinor(2_000_000n, 1_500_000n)).toBe(-500_000n);
  });

  it('flags under-collateralization', () => {
    expect(isUnderCollateralized(2_000_000n, 1_000_000n)).toBe(true);
    expect(isUnderCollateralized(1_000_000n, 2_000_000n)).toBe(false);
  });

  it('computes reserve ratio in bps', () => {
    expect(reserveRatioBps(1_000_000n, 1_000_000n)).toBe(10_000);
    expect(reserveRatioBps(1_000_000n, 1_500_000n)).toBe(15_000);
    expect(reserveRatioBps(0n, 0n)).toBe(0);
    expect(reserveRatioBps(0n, 100n)).toBe(10_000);
  });
});
