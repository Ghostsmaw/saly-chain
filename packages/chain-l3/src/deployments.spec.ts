import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  loadDeploymentManifest,
  resolveDeploymentManifestPath,
  resolveOracleAddress,
} from './deployments.js';

describe('deployment manifest discovery', () => {
  const prevFile = process.env.L3_DEPLOYMENTS_FILE;
  const prevOracle = process.env.L3_L2_OUTPUT_ORACLE;

  afterEach(() => {
    if (prevFile === undefined) delete process.env.L3_DEPLOYMENTS_FILE;
    else process.env.L3_DEPLOYMENTS_FILE = prevFile;
    if (prevOracle === undefined) delete process.env.L3_L2_OUTPUT_ORACLE;
    else process.env.L3_L2_OUTPUT_ORACLE = prevOracle;
  });

  it('loads manifest from L3_DEPLOYMENTS_FILE', () => {
    const dir = mkdtempSync(join(tmpdir(), 'l3-manifest-'));
    const manifestPath = join(dir, 'custom-deployments.json');
    writeFileSync(
      manifestPath,
      JSON.stringify({
        network: 'saly-devnet',
        settlement: 'base-sepolia',
        contracts: { l2OutputOracle: '0x1111111111111111111111111111111111111111' },
      }),
    );
    process.env.L3_DEPLOYMENTS_FILE = manifestPath;
    delete process.env.L3_L2_OUTPUT_ORACLE;

    const manifest = loadDeploymentManifest(dir);
    expect(manifest?.contracts.l2OutputOracle).toBe('0x1111111111111111111111111111111111111111');
    expect(resolveOracleAddress(dir)).toBe('0x1111111111111111111111111111111111111111');
    expect(resolveDeploymentManifestPath(dir)).toBe(manifestPath);
  });

  it('walks up from package cwd to repo infra path', () => {
    delete process.env.L3_DEPLOYMENTS_FILE;
    delete process.env.L3_L2_OUTPUT_ORACLE;

    const repoRoot = join(process.cwd(), '../..');
    const manifest = loadDeploymentManifest(join(repoRoot, 'packages/chain-l3'));
    if (manifest) {
      expect(manifest.network).toBe('saly-devnet');
    } else {
      expect(resolveDeploymentManifestPath(join(repoRoot, 'packages/chain-l3'))).toContain(
        'infra/l3/devnet/deployments.base-sepolia.json',
      );
    }
  });
});
