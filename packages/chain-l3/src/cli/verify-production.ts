#!/usr/bin/env node
/**
 * Verify D3 production exit criteria (HA sequencer + RPC fleet + fault proofs).
 *
 * Usage:
 *   L3_NETWORK=saly-mainnet pnpm l3:verify:production
 */
import { resolve } from 'node:path';
import { applyManifestToEnv, loadDeploymentManifest } from '../deployments.js';
import { evaluateProductionExitCriteria } from '../production-exit-criteria.js';

const repoRoots = [
  process.cwd(),
  resolve(process.cwd(), '../..'),
  resolve(process.cwd(), '../../..'),
];

let manifest = null;
for (const root of repoRoots) {
  manifest = loadDeploymentManifest(root);
  if (manifest) {
    applyManifestToEnv(manifest);
    process.chdir(root);
    break;
  }
}

const network = (process.env.L3_NETWORK ?? manifest?.network ?? 'saly-mainnet') as string;
const result = await evaluateProductionExitCriteria({
  cwd: process.cwd(),
  l3Network: network as 'saly-mainnet',
});

console.log(`\n=== L3 production exit criteria (${result.network}) ===\n`);

for (const c of result.criteria) {
  const icon = c.status === 'pass' ? '✓' : c.status === 'fail' ? '✗' : '○';
  console.log(`${icon} ${c.label}`);
  console.log(`  ${c.description}`);
  if (c.detail) console.log(`  → ${c.detail}`);
  console.log();
}

console.log(`Progress: ${result.passed}/${result.total} passed`);
console.log(
  result.productionReady
    ? '\n✅ D3 production infra COMPLETE\n'
    : '\n⏳ D3 production infra incomplete — see docs/runbooks/d3-l3-production.md\n',
);
process.exit(result.productionReady ? 0 : 1);
