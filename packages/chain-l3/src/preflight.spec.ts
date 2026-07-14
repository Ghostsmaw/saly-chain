import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { Address, Hex } from 'viem';
import { verifyL3Connection, assertL3Connection, type L3ChainProbe } from './preflight.js';
import { l3Network } from './network.js';

const DEVNET_CHAIN_ID = l3Network('saly-devnet').chainId;
const USDC = '0x1111111111111111111111111111111111111111' as Address;

function probe(opts: {
  chainId?: number;
  chainIdError?: string;
  bytecode?: Hex | undefined;
  bytecodeError?: string;
}): L3ChainProbe {
  return {
    async getChainId() {
      if (opts.chainIdError) throw new Error(opts.chainIdError);
      return opts.chainId ?? DEVNET_CHAIN_ID;
    },
    async getBytecode() {
      if (opts.bytecodeError) throw new Error(opts.bytecodeError);
      return opts.bytecode;
    },
  };
}

describe('verifyL3Connection', () => {
  const prevUsdc = process.env.L3_USDC_ADDRESS;
  const prevRpc = process.env.L3_L3_RPC_URL;

  beforeEach(() => {
    delete process.env.L3_USDC_ADDRESS;
    process.env.L3_L3_RPC_URL = 'http://127.0.0.1:9545';
  });

  afterEach(() => {
    if (prevUsdc) process.env.L3_USDC_ADDRESS = prevUsdc;
    else delete process.env.L3_USDC_ADDRESS;
    if (prevRpc) process.env.L3_L3_RPC_URL = prevRpc;
    else delete process.env.L3_L3_RPC_URL;
  });

  it('passes when chain id matches and USDC not required', async () => {
    const report = await verifyL3Connection({
      network: 'saly-devnet',
      probe: probe({ chainId: DEVNET_CHAIN_ID }),
    });
    expect(report.ok).toBe(true);
    expect(report.chainIdMatches).toBe(true);
    expect(report.failures).toHaveLength(0);
  });

  it('fails closed on chain id mismatch (wrong chain — funds protection)', async () => {
    const report = await verifyL3Connection({
      network: 'saly-devnet',
      probe: probe({ chainId: 84532 }),
    });
    expect(report.ok).toBe(false);
    expect(report.actualChainId).toBe(84532);
    expect(report.failures.some((f) => f.startsWith('chain.l3.chain_id_mismatch'))).toBe(true);
  });

  it('fails when RPC is unreachable', async () => {
    const report = await verifyL3Connection({
      network: 'saly-devnet',
      probe: probe({ chainIdError: 'ECONNREFUSED' }),
    });
    expect(report.ok).toBe(false);
    expect(report.failures.some((f) => f.startsWith('chain.l3.rpc_unreachable'))).toBe(true);
  });

  it('requires USDC config when requireUsdc is set', async () => {
    const report = await verifyL3Connection({
      network: 'saly-devnet',
      requireUsdc: true,
      probe: probe({ chainId: DEVNET_CHAIN_ID }),
    });
    expect(report.ok).toBe(false);
    expect(report.failures.some((f) => f.startsWith('chain.l3.usdc_unconfigured'))).toBe(true);
  });

  it('requires USDC bytecode to be present when requireUsdc is set', async () => {
    const report = await verifyL3Connection({
      network: 'saly-devnet',
      requireUsdc: true,
      usdcAddress: USDC,
      probe: probe({ chainId: DEVNET_CHAIN_ID, bytecode: '0x' }),
    });
    expect(report.ok).toBe(false);
    expect(report.usdcDeployed).toBe(false);
    expect(report.failures.some((f) => f.startsWith('chain.l3.usdc_not_deployed'))).toBe(true);
  });

  it('passes full money-rail check when chain id and USDC bytecode are valid', async () => {
    const report = await verifyL3Connection({
      network: 'saly-devnet',
      requireUsdc: true,
      usdcAddress: USDC,
      probe: probe({ chainId: DEVNET_CHAIN_ID, bytecode: '0x6080604052' }),
    });
    expect(report.ok).toBe(true);
    expect(report.usdcDeployed).toBe(true);
    expect(report.usdcAddress).toBe(USDC);
  });

  it('throws on invalid USDC address input', async () => {
    await expect(
      verifyL3Connection({
        network: 'saly-devnet',
        usdcAddress: '0xnot-an-address' as Address,
        probe: probe({ chainId: DEVNET_CHAIN_ID }),
      }),
    ).rejects.toMatchObject({ code: 'chain.l3.bad_usdc_address' });
  });
});

describe('assertL3Connection', () => {
  it('throws a fail-closed error when the connection is unsafe', async () => {
    await expect(
      assertL3Connection({
        network: 'saly-devnet',
        probe: probe({ chainId: 84532 }),
      }),
    ).rejects.toMatchObject({ code: 'chain.l3.connection_unsafe' });
  });

  it('returns the report when the connection is safe', async () => {
    const report = await assertL3Connection({
      network: 'saly-devnet',
      probe: probe({ chainId: DEVNET_CHAIN_ID }),
    });
    expect(report.ok).toBe(true);
  });
});
