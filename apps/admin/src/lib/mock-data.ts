/**
 * Deterministic mock data used while the backend APIs are being built. Every
 * shape here mirrors what the real `@salychain/sdk-internal` will return, so
 * swapping to live data is a function-level change, not a structural one.
 */

export interface VolumePoint {
  label: string;
  value: number;
}

export function buildVolumeSeries(): VolumePoint[] {
  // 24 hourly buckets with a believable mid-day peak.
  const peak = 4_560_342;
  const points: VolumePoint[] = [];
  for (let h = 0; h < 24; h++) {
    const dist = Math.abs(h - 12) / 12;
    const base = peak * (0.45 + 0.55 * Math.cos((dist * Math.PI) / 1.4));
    const jitter = (Math.sin(h * 1.7) + 1) * 80_000;
    const value = Math.max(800_000, Math.round(base + jitter));
    points.push({ label: `${h.toString().padStart(2, '0')}:00`, value });
  }
  return points;
}

export interface DistributionSlice {
  label: string;
  pct: number;
  amountUsd: number;
  color: string;
}

export const transactionDistribution: DistributionSlice[] = [
  { label: 'Base Network', pct: 45.6, amountUsd: 11_200_000, color: '#8159FF' },
  { label: 'XRPL Network', pct: 28.3, amountUsd: 6_950_000, color: '#2BC9F0' },
  { label: 'Internal Ledger', pct: 15.7, amountUsd: 3_850_000, color: '#16C784' },
  { label: 'Other Networks', pct: 10.4, amountUsd: 2_560_000, color: '#F0A92B' },
];

export interface RecentTx {
  id: string;
  label: string;
  amountUsd: number;
  direction: 'in' | 'out';
  when: string;
  status: 'Success' | 'Pending' | 'Failed';
}

export const recentTransactions: RecentTx[] = [
  { id: 'TXN_7X8K9M2', label: 'User Payment',         amountUsd:  2_450.00, direction: 'in',  when: '2m ago',  status: 'Success' },
  { id: 'TXN_3L9P2Q7', label: 'Cross-border Transfer', amountUsd: -1_250.00, direction: 'out', when: '3m ago',  status: 'Success' },
  { id: 'TXN_9A8B7C6', label: 'Business Payout',      amountUsd:  5_780.00, direction: 'in',  when: '5m ago',  status: 'Success' },
  { id: 'TXN_1D2E3F4', label: 'Crypto Swap',          amountUsd:   -980.50, direction: 'out', when: '7m ago',  status: 'Success' },
  { id: 'TXN_5G6H7J8', label: 'Invoice Payment',      amountUsd:  3_400.00, direction: 'in',  when: '10m ago', status: 'Success' },
];

export interface RiskAlert {
  id: string;
  title: string;
  detail: string;
  when: string;
  severity: 'High' | 'Medium' | 'Low';
}

export const riskAlerts: RiskAlert[] = [
  { id: 'r1', title: 'High Risk Transaction', detail: 'Transaction flagged as high risk',  when: '2m ago',  severity: 'High' },
  { id: 'r2', title: 'Velocity Limit Exceeded', detail: 'Multiple rapid transactions detected', when: '5m ago',  severity: 'Medium' },
  { id: 'r3', title: 'Suspicious Activity', detail: 'Unusual login attempt detected', when: '15m ago', severity: 'High' },
  { id: 'r4', title: 'KYC Verification Pending', detail: 'Business KYC verification pending', when: '30m ago', severity: 'Low' },
];

export interface SystemNode {
  key: string;
  label: string;
  status: 'operational' | 'degraded' | 'down';
}

export const systemHealth: SystemNode[] = [
  { key: 'gateway', label: 'API Gateway',     status: 'operational' },
  { key: 'db',      label: 'Database',        status: 'operational' },
  { key: 'queue',   label: 'Redis Queue',     status: 'operational' },
  { key: 'chains',  label: 'Blockchain Nodes',status: 'operational' },
  { key: 'ai',      label: 'AI Services',     status: 'operational' },
  { key: 'storage', label: 'File Storage',    status: 'operational' },
];

export const networkStatus: SystemNode[] = [
  { key: 'base',     label: 'Base Network',  status: 'operational' },
  { key: 'xrpl',     label: 'XRPL Network',  status: 'operational' },
  { key: 'eth',      label: 'Ethereum',      status: 'operational' },
  { key: 'polygon',  label: 'Polygon',       status: 'operational' },
];

export const headlineMetrics = {
  totalVolume: { usd: 24_560_789.45, deltaPct: 12.5,  spark: deterministicSpark(48, 14) },
  totalTransactions: { count: 128_645,  deltaPct: 8.2,  spark: deterministicSpark(48, 22) },
  totalUsers:        { count: 215_678,  deltaPct: 15.3, spark: deterministicSpark(48, 31) },
  activeWallets:     { count:  98_765,  deltaPct: 10.1, spark: deterministicSpark(48, 7)  },
  totalRevenue:      { usd:  356_789.32, deltaPct: 14.7, spark: deterministicSpark(48, 17) },
};

function deterministicSpark(n: number, seed: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const v = 50 + Math.sin((i + seed) * 0.6) * 18 + Math.cos((i + seed) * 0.2) * 10 + (i / n) * 14;
    out.push(Math.max(10, v));
  }
  return out;
}

export const operationalMetrics = {
  successRate: { value: 99.62, delta: 0.04 },
  failedTransactions: { count: 487, delta: -3.2 },
  avgTxTime: { seconds: 2.4, delta: -0.3 },
  gasSaved: { usd: 45_678.32, delta: 6.5 },
};
