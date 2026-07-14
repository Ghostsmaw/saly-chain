import { describe, expect, it } from 'vitest';
import { resolveOracleAddress, loadDeploymentManifest } from './deployments.js';
import { evaluateSpikeExitCriteria } from './exit-criteria.js';

describe('evaluateSpikeExitCriteria', () => {
  it('returns pending when oracle is not configured', async () => {
    const prev = process.env.L3_L2_OUTPUT_ORACLE;
    delete process.env.L3_L2_OUTPUT_ORACLE;
    const result = await evaluateSpikeExitCriteria({
      cwd: '/nonexistent',
      monitorHealthUrl: 'http://127.0.0.1:1/health',
    });
    if (prev) process.env.L3_L2_OUTPUT_ORACLE = prev;

    expect(result.spikeComplete).toBe(false);
    expect(result.criteria.find((c) => c.id === 'oracle_configured')?.status).toBe('fail');
  });

  it('documents nine exit checks including D1/D2 rail gates', async () => {
    const result = await evaluateSpikeExitCriteria({
      cwd: '/nonexistent',
      monitorHealthUrl: 'http://127.0.0.1:1/health',
      l3ListenerMetricsUrl: 'http://127.0.0.1:1/metrics',
    });
    expect(result.criteria.map((c) => c.id)).toEqual([
      'deploy_manifest',
      'oracle_configured',
      'settlement_rpc',
      'oracle_contract',
      'output_proposed',
      'monitor_worker',
      'l3_rpc_reachable',
      'bridge_configured',
      'l3_listener_healthy',
    ]);
    expect(result.total).toBe(9);
  });
});

describe('resolveOracleAddress', () => {
  it('returns undefined without manifest or env', () => {
    const prev = process.env.L3_L2_OUTPUT_ORACLE;
    delete process.env.L3_L2_OUTPUT_ORACLE;
    expect(resolveOracleAddress('/tmp')).toBeUndefined();
    if (prev) process.env.L3_L2_OUTPUT_ORACLE = prev;
  });
});

describe('loadDeploymentManifest', () => {
  it('returns null when file missing', () => {
    expect(loadDeploymentManifest('/tmp/no-saly-l3')).toBeNull();
  });
});
