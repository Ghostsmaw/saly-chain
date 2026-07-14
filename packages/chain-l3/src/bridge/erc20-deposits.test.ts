import { describe, expect, it } from 'vitest';
import { resolveBridgeContracts, isBridgeConfigured } from './contracts.js';

describe('erc20 bridge deposits config', () => {
  it('requires optimism portal for bridge listener', () => {
    const prev = { ...process.env };
    delete process.env.L3_OPTIMISM_PORTAL;
    delete process.env.L3_L1_STANDARD_BRIDGE;
    const contracts = resolveBridgeContracts('/nonexistent');
    expect(isBridgeConfigured(contracts)).toBe(false);
    process.env = prev;
  });
});
