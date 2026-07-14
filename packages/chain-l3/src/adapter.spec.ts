import { describe, expect, it } from 'vitest';
import { resolveL3RpcUrl, resolveUsdcAddress, l3Network } from './index.js';

describe('L3 money rail config', () => {
  it('defaults devnet RPC to stable local op-geth URL', () => {
    const prev = process.env.L3_L3_RPC_URL;
    delete process.env.L3_L3_RPC_URL;
    expect(resolveL3RpcUrl('saly-devnet')).toBe('http://127.0.0.1:9545');
    if (prev) process.env.L3_L3_RPC_URL = prev;
  });

  it('exposes devnet chain id 845320001', () => {
    expect(l3Network('saly-devnet').chainId).toBe(845320001);
  });

  it('returns undefined USDC without env or manifest', () => {
    const prev = process.env.L3_USDC_ADDRESS;
    delete process.env.L3_USDC_ADDRESS;
    expect(resolveUsdcAddress('saly-devnet', '/tmp/no-manifest')).toBeUndefined();
    if (prev) process.env.L3_USDC_ADDRESS = prev;
  });
});
