import { describe, expect, it } from 'vitest';
import {
  defaultDexRouterAllowlist,
  encodeQuoterCall,
  isAllowedDexRouter,
} from './dex-quoter.js';

describe('isAllowedDexRouter', () => {
  it('accepts canonical Base Sepolia SwapRouter02', () => {
    expect(isAllowedDexRouter('base-sepolia', '0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4')).toBe(true);
    expect(isAllowedDexRouter('base-sepolia', '0x1111111111111111111111111111111111111111')).toBe(false);
  });
});

describe('defaultDexRouterAllowlist', () => {
  it('returns lowercase router for signer policy', () => {
    const list = defaultDexRouterAllowlist('base-sepolia');
    expect(list).toHaveLength(1);
    expect(list[0]).toBe('0x94cc0aac535ccdb3c01d6787d6413c739ae12bc4');
  });
});

describe('encodeQuoterCall', () => {
  it('produces quoter calldata', () => {
    const data = encodeQuoterCall('base-sepolia', {
      network: 'base-sepolia',
      tokenIn: 'USDC',
      tokenOut: 'WETH',
      amountIn: 1_000_000n,
    });
    expect(data.startsWith('0x')).toBe(true);
    expect(data.length).toBeGreaterThan(10);
  });
});
