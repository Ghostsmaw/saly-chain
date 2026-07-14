import { verifyVerticalsExit } from '../verticals-exit-criteria.js';

const requireHealth = process.env.MILESTONE_E_REQUIRE_HEALTH === '1';
const result = await verifyVerticalsExit({ requireHealth });

for (const check of result.checks) {
  console.log(`${check.ok ? '✓' : '✗'} ${check.name}${check.detail ? `: ${check.detail}` : ''}`);
}

if (!result.ok) {
  console.error('\nverticals verify FAILED');
  process.exit(1);
}

console.log('\nverticals verify OK — Milestone E3–E7 ops wiring complete');
