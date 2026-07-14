import { describe, expect, it } from 'vitest';
import { BASE_ASSETS, getAsset } from './assets.js';

describe('Base asset registry', () => {
  it('exposes USDC on both networks with the right decimals', () => {
    expect(BASE_ASSETS['base-mainnet'].USDC.decimals).toBe(6);
    expect(BASE_ASSETS['base-sepolia'].USDC.decimals).toBe(6);
  });

  it('returns native ETH with 18 decimals and no address', () => {
    expect(BASE_ASSETS['base-mainnet'].ETH.decimals).toBe(18);
    expect(BASE_ASSETS['base-mainnet'].ETH.address).toBeUndefined();
  });

  it('lookups by symbol', () => {
    expect(getAsset('base-sepolia', 'USDC').address).toBe(
      '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    );
  });
});
