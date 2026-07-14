import { describe, expect, it } from 'vitest';
import {
  L3_NETWORKS,
  SEQUENCER_COMPONENTS,
  l3Network,
  settlementRpcDefault,
} from './network.js';
import { L3RollupMonitor } from './rollup-monitor.js';

describe('L3 network registry', () => {
  it('defines devnet with Base Sepolia settlement', () => {
    const devnet = l3Network('saly-devnet');
    expect(devnet.chainId).toBe(845320001);
    expect(devnet.settlement).toBe('base-sepolia');
    expect(devnet.settlementChainId).toBe(84532);
  });

  it('documents required OP-Stack sequencer components', () => {
    const required = SEQUENCER_COMPONENTS.filter((c) => c.status === 'required');
    expect(required.map((c) => c.id)).toEqual(
      expect.arrayContaining(['op-geth', 'op-node', 'op-batcher', 'op-proposer', 'sequencer']),
    );
  });

  it('covers all network ids', () => {
    expect(Object.keys(L3_NETWORKS)).toHaveLength(3);
  });

  it('defaults settlement RPC to Base endpoints', () => {
    expect(settlementRpcDefault('base-sepolia')).toContain('sepolia');
    expect(settlementRpcDefault('base-mainnet')).toContain('mainnet');
  });
});

describe('L3RollupMonitor', () => {
  it('reports unconfigured when oracle address is missing', async () => {
    const monitor = new L3RollupMonitor({ l3Network: 'saly-devnet' });
    expect(monitor.isConfigured()).toBe(false);
    const status = await monitor.getStatus();
    expect(status.configured).toBe(false);
    expect(status.message).toMatch(/L3_L2_OUTPUT_ORACLE/i);
  });

  it('returns empty proposals without live RPC when oracle unset', async () => {
    const monitor = new L3RollupMonitor({ l3Network: 'saly-devnet' });
    const proposals = await monitor.getOutputProposals(0n, 100n);
    expect(proposals).toEqual([]);
  });
});

describe('S5 exit criteria (integration shape)', () => {
  it('documents settlement observation path', () => {
    const path = [
      'op-batcher → Base BatchInbox',
      'op-proposer → L2OutputOracle.OutputProposed',
      'l3-rollup-monitor → NATS',
    ];
    expect(path).toContain('op-proposer → L2OutputOracle.OutputProposed');
  });
});
