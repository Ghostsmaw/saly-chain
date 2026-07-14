#!/usr/bin/env node
/**
 * Verify L3 exit criteria against Base Sepolia settlement + optional testnet rail checks.
 *
 * Usage:
 *   L3_L2_OUTPUT_ORACLE=0x... pnpm l3:verify
 *   L3_NETWORK=saly-testnet pnpm l3:verify
 */
import { resolve } from 'node:path';
import { evaluateSpikeExitCriteria } from '../exit-criteria.js';
import { applyManifestToEnv, loadDeploymentManifestForNetwork } from '../deployments.js';
import type { L3Network } from '../network.js';

const repoRoots = [
  process.cwd(),
  resolve(process.cwd(), '../..'),
  resolve(process.cwd(), '../../..'),
];

const requestedNetwork = (process.env.L3_NETWORK ?? 'saly-devnet') as L3Network;

let manifest = null;
for (const root of repoRoots) {
  manifest = loadDeploymentManifestForNetwork(requestedNetwork, root);
  if (manifest) {
    applyManifestToEnv(manifest);
    process.chdir(root);
    break;
  }
}

const network = (process.env.L3_NETWORK ?? manifest?.network ?? requestedNetwork) as L3Network;
const result = await evaluateSpikeExitCriteria({
  cwd: process.cwd(),
  l3Network: network as 'saly-devnet' | 'saly-testnet' | 'saly-mainnet',
});

console.log(`\n=== L3 exit criteria (${result.network}) ===\n`);

for (const c of result.criteria) {
  const icon = c.status === 'pass' ? '✓' : c.status === 'fail' ? '✗' : '○';
  console.log(`${icon} ${c.label}`);
  console.log(`  ${c.description}`);
  if (c.detail) console.log(`  → ${c.detail}`);
  console.log();
}

console.log(`Progress: ${result.passed}/${result.total} passed`);

if (result.network === 'saly-testnet') {
  console.log(
    result.l3RailComplete
      ? '\n✅ D1 testnet rail COMPLETE\n'
      : '\n⏳ D1 testnet rail incomplete — see docs/runbooks/d1-l3-testnet.md\n',
  );
  process.exit(result.l3RailComplete ? 0 : 1);
}

console.log(
  result.spikeComplete
    ? '\n✅ S5 devnet spike COMPLETE\n'
    : '\n⏳ S5 devnet spike incomplete — see runbook\n',
);
process.exit(result.spikeComplete ? 0 : 1);
