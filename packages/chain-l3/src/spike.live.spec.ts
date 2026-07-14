import { describe, expect, it } from 'vitest';
import { evaluateSpikeExitCriteria } from './exit-criteria.js';
import { loadDeploymentManifest, applyManifestToEnv } from './deployments.js';
import { resolve } from 'node:path';

const LIVE = process.env.L3_SPIKE_LIVE === 'true';

describe.skipIf(!LIVE)('S5 L3 spike (live Base Sepolia)', () => {
  it('meets spike exit criteria against deployed devnet', async () => {
    const repoRoots = [
      process.cwd(),
      resolve(process.cwd(), '../..'),
      resolve(process.cwd(), '../../..'),
    ];

    for (const root of repoRoots) {
      const manifest = loadDeploymentManifest(root);
      if (manifest) {
        applyManifestToEnv(manifest);
        break;
      }
    }

    const result = await evaluateSpikeExitCriteria();
    for (const c of result.criteria) {
      // eslint-disable-next-line no-console
      console.log(`${c.status} ${c.id}: ${c.detail ?? c.description}`);
    }
    expect(result.spikeComplete).toBe(true);
  }, 60_000);
});
