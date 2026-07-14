import { describe, expect, it } from 'vitest';
import { isBridgeConfigured, resolveBridgeContracts } from './contracts.js';

describe('resolveBridgeContracts', () => {
  it('returns unset portal when no manifest or env', () => {
    const prev = process.env.L3_OPTIMISM_PORTAL;
    delete process.env.L3_OPTIMISM_PORTAL;
    const contracts = resolveBridgeContracts('/nonexistent');
    expect(isBridgeConfigured(contracts)).toBe(false);
    if (prev) process.env.L3_OPTIMISM_PORTAL = prev;
  });

  it('reads portal from env', () => {
    process.env.L3_OPTIMISM_PORTAL = '0x1111111111111111111111111111111111111111';
    const contracts = resolveBridgeContracts('/nonexistent');
    expect(contracts.optimismPortal).toBe('0x1111111111111111111111111111111111111111');
    expect(isBridgeConfigured(contracts)).toBe(true);
    delete process.env.L3_OPTIMISM_PORTAL;
  });
});
