import { verifyGovernanceExit } from '../governance-exit-criteria.js';

const contractRegistryBaseUrl = process.env.CONTRACT_REGISTRY_BASE_URL ?? 'http://localhost:4013';
const walletBaseUrl = process.env.WALLET_BASE_URL ?? 'http://localhost:4002';
const l3Network = (process.env.L3_NETWORK ?? 'saly-testnet') as 'saly-devnet' | 'saly-testnet' | 'saly-mainnet';

const result = await verifyGovernanceExit({
  contractRegistryBaseUrl,
  walletBaseUrl,
  l3Network,
  ...(process.env.GOVERNANCE_EXECUTOR_WALLET_ID
    ? { governanceExecutorWalletId: process.env.GOVERNANCE_EXECUTOR_WALLET_ID }
    : {}),
});

for (const check of result.checks) {
  const mark = check.ok ? '✓' : '✗';
  console.log(`${mark} ${check.name}${check.detail ? `: ${check.detail}` : ''}`);
}

if (!result.ok) {
  console.error('\ngovernance verify FAILED');
  process.exit(1);
}

console.log('\ngovernance verify OK — Milestone E0–E2 ops wiring complete');
