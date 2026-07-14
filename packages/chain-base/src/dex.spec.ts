import { describe, expect, it } from 'vitest';
import {
  applySlippageFloor,
  isDexPairSupported,
  listDexPairs,
  prepareExactInputSingleSwap,
} from './dex.js';

describe('prepareExactInputSingleSwap', () => {
  it('encodes router calldata for USDC→WETH', () => {
    const prepared = prepareExactInputSingleSwap({
      network: 'base-sepolia',
      tokenIn: 'USDC',
      tokenOut: 'WETH',
      recipient: '0x1111111111111111111111111111111111111111',
      amountIn: 1_000_000n,
      amountOutMinimum: 500_000_000_000_000n,
    });
    expect(prepared.calldata.startsWith('0x')).toBe(true);
    expect(prepared.router).toMatch(/^0x/);
  });

  it('uses 0.01% fee tier for USDC→DAI on mainnet', () => {
    const prepared = prepareExactInputSingleSwap({
      network: 'base-mainnet',
      tokenIn: 'USDC',
      tokenOut: 'DAI',
      recipient: '0x1111111111111111111111111111111111111111',
      amountIn: 1_000_000n,
      amountOutMinimum: 990_000_000_000_000_000n,
    });
    expect(prepared.calldata.length).toBeGreaterThan(10);
  });
});

describe('applySlippageFloor', () => {
  it('reduces output by slippage bps', () => {
    expect(applySlippageFloor(10_000n, 100)).toBe(9900n);
  });
});

describe('isDexPairSupported', () => {
  it('allows USDC/WETH on Sepolia and mainnet', () => {
    expect(isDexPairSupported('base-sepolia', 'USDC', 'WETH')).toBe(true);
    expect(isDexPairSupported('base-mainnet', 'WETH', 'USDC')).toBe(true);
    expect(isDexPairSupported('base-sepolia', 'USDC', 'NGN')).toBe(false);
  });

  it('allows DAI pairs on mainnet only', () => {
    expect(isDexPairSupported('base-mainnet', 'USDC', 'DAI')).toBe(true);
    expect(isDexPairSupported('base-sepolia', 'USDC', 'DAI')).toBe(false);
  });
});

describe('listDexPairs', () => {
  it('returns more pairs on mainnet than Sepolia', () => {
    expect(listDexPairs('base-mainnet').length).toBeGreaterThan(listDexPairs('base-sepolia').length);
  });
});
