import { verifyGovernanceExit } from '../governance-exit-criteria.js';
import { verifyVerticalsExit } from '../verticals-exit-criteria.js';

const onChain = process.env.MILESTONE_E_ON_CHAIN === '1';
const requireHealth = process.env.MILESTONE_E_REQUIRE_HEALTH === '1';

const verticals = await verifyVerticalsExit({
  requireHealth,
});

console.log('── Vertical modules (E3–E7) ──');
for (const check of verticals.checks) {
  console.log(`${check.ok ? '✓' : '✗'} ${check.name}${check.detail ? `: ${check.detail}` : ''}`);
}

if (!verticals.ok) {
  console.error('\nverticals verify FAILED');
  process.exit(1);
}
console.log('\nverticals verify OK');

if (onChain) {
  const governance = await verifyGovernanceExit({
    contractRegistryBaseUrl: process.env.CONTRACT_REGISTRY_BASE_URL ?? 'http://localhost:4013',
    walletBaseUrl: process.env.WALLET_BASE_URL ?? 'http://localhost:4002',
    l3Network: (process.env.L3_NETWORK ?? 'saly-testnet') as 'saly-devnet' | 'saly-testnet' | 'saly-mainnet',
    ...(process.env.GOVERNANCE_EXECUTOR_WALLET_ID
      ? { governanceExecutorWalletId: process.env.GOVERNANCE_EXECUTOR_WALLET_ID }
      : {}),
  });

  console.log('\n── Governance + registry (E0–E2) ──');
  for (const check of governance.checks) {
    console.log(`${check.ok ? '✓' : '✗'} ${check.name}${check.detail ? `: ${check.detail}` : ''}`);
  }

  if (!governance.ok) {
    console.error('\ngovernance verify FAILED (on-chain mode)');
    process.exit(1);
  }
  console.log('\ngovernance verify OK');
} else {
  console.log('\n(on-chain governance checks skipped — set MILESTONE_E_ON_CHAIN=1 after l3:testnet:e-ops-apply)');
}

console.log('\nmilestone E ops verify OK');
