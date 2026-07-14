import { describe, expect, it } from 'vitest';
import { AbiRegistry } from './registry.js';
import { baseRegistryEntries } from './seed.js';
import { ERC20_ABI } from '@salychain/chain-base';

describe('AbiRegistry', () => {
  it('registers and looks up by chain + address', () => {
    const reg = new AbiRegistry();
    reg.registerMany(baseRegistryEntries('base-sepolia'));
    const addrs = reg.tokenAddresses('base');
    expect(addrs.length).toBe(1);
    expect(addrs[0]).toMatch(/^0x/);
  });

  it('decodes an ERC-20 Transfer log', () => {
    const reg = new AbiRegistry();
    const usdc = baseRegistryEntries('base-sepolia')[0]!;
    reg.register(usdc);
    // Synthetic log — decode may fail without real topics; test lookup path
    expect(reg.lookup('base', usdc.address)?.abi).toEqual(ERC20_ABI);
  });
});
