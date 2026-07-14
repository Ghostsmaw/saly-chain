import { verifyStablecoinExit } from '../stablecoin-exit-criteria.js';

const stablecoinBaseUrl = process.env.STABLECOIN_BASE_URL ?? 'http://localhost:4022';
const porMetricsUrl = process.env.POR_METRICS_URL ?? 'http://localhost:9108/metrics';
const l3Network = (process.env.L3_NETWORK ?? 'saly-testnet') as 'saly-devnet' | 'saly-testnet' | 'saly-mainnet';

const result = await verifyStablecoinExit({ stablecoinBaseUrl, porMetricsUrl, l3Network });

for (const check of result.checks) {
  const mark = check.ok ? '✓' : '✗';
  console.log(`${mark} ${check.name}${check.detail ? `: ${check.detail}` : ''}`);
}

if (!result.ok) {
  console.error('\nstablecoin verify FAILED');
  process.exit(1);
}

console.log('\nstablecoin verify OK — Milestone D6 exit criteria met');
