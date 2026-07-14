/**
 * Deterministic mock datasets for the Super Admin surfaces whose backing
 * services are not yet wired into the dashboard (users, businesses, contracts,
 * integrations, settings) plus the aggregated overview/analytics views.
 *
 * Every shape mirrors what the real `@salychain/sdk-internal` clients will
 * eventually return, so moving to live data is a fetcher swap rather than a
 * structural change. Values are seeded/static so server renders are stable.
 */

import type { StatusTone } from '@salychain/ui';

/* ─────────────────────────── shared helpers ─────────────────────────── */

export function deterministicSeries(n: number, seed: number, base = 50, amp = 18): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const v =
      base +
      Math.sin((i + seed) * 0.6) * amp +
      Math.cos((i + seed) * 0.23) * (amp * 0.55) +
      (i / n) * (amp * 0.8);
    out.push(Math.max(2, Math.round(v)));
  }
  return out;
}

export const usd = (n: number, fractionDigits = 0): string =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

export const compactUsd = (n: number): string =>
  `$${Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(n)}`;

export const compact = (n: number): string =>
  Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

/* ───────────────────────────── overview ─────────────────────────────── */

export interface CorridorRow {
  from: string;
  to: string;
  flag: string;
  volumeUsd: number;
  txCount: number;
  avgSettleSec: number;
  trend: number;
}

export const topCorridors: CorridorRow[] = [
  { from: 'United States', to: 'Nigeria', flag: '🇺🇸→🇳🇬', volumeUsd: 4_820_000, txCount: 18_240, avgSettleSec: 3.1, trend: 14.2 },
  { from: 'United Kingdom', to: 'Kenya', flag: '🇬🇧→🇰🇪', volumeUsd: 3_410_000, txCount: 12_980, avgSettleSec: 2.8, trend: 9.6 },
  { from: 'Eurozone', to: 'Ghana', flag: '🇪🇺→🇬🇭', volumeUsd: 2_760_000, txCount: 9_120, avgSettleSec: 3.4, trend: -2.1 },
  { from: 'United States', to: 'India', flag: '🇺🇸→🇮🇳', volumeUsd: 2_190_000, txCount: 7_640, avgSettleSec: 2.5, trend: 21.7 },
  { from: 'Canada', to: 'Philippines', flag: '🇨🇦→🇵🇭', volumeUsd: 1_540_000, txCount: 6_310, avgSettleSec: 3.0, trend: 6.4 },
  { from: 'UAE', to: 'Pakistan', flag: '🇦🇪→🇵🇰', volumeUsd: 1_280_000, txCount: 5_870, avgSettleSec: 3.6, trend: 4.9 },
];

export interface ActivityEvent {
  id: string;
  kind: 'settlement' | 'onboarding' | 'risk' | 'contract' | 'integration';
  title: string;
  detail: string;
  when: string;
}

export const platformActivity: ActivityEvent[] = [
  { id: 'a1', kind: 'settlement', title: 'Batch settlement cleared', detail: '1,204 payouts to NGN rails settled in 3.1s', when: '1m ago' },
  { id: 'a2', kind: 'onboarding', title: 'New business verified', detail: 'Northwind Trading completed Tier-2 KYB', when: '6m ago' },
  { id: 'a3', kind: 'risk', title: 'Velocity rule triggered', detail: 'Actor act_9f2 throttled — 14 tx / 60s', when: '12m ago' },
  { id: 'a4', kind: 'contract', title: 'Escrow contract funded', detail: 'Deal 0x8a…21 locked $250,000 USDC', when: '24m ago' },
  { id: 'a5', kind: 'integration', title: 'Webhook endpoint rotated', detail: 'Acme Corp rotated signing secret', when: '38m ago' },
];

/* ───────────────────────────── analytics ────────────────────────────── */

export interface KpiCard {
  key: string;
  label: string;
  value: string;
  delta: number;
  spark: number[];
  tone: string;
}

export const analyticsKpis: KpiCard[] = [
  { key: 'gmv', label: 'Gross volume (30d)', value: compactUsd(412_900_000), delta: 18.4, spark: deterministicSeries(30, 4, 40, 16), tone: '#8159FF' },
  { key: 'take', label: 'Net take rate', value: '0.74%', delta: 2.1, spark: deterministicSeries(30, 11, 48, 8), tone: '#16C784' },
  { key: 'arpu', label: 'Revenue / active org', value: usd(1_284), delta: 6.7, spark: deterministicSeries(30, 19, 44, 12), tone: '#2BC9F0' },
  { key: 'retention', label: '90-day retention', value: '87.3%', delta: 1.4, spark: deterministicSeries(30, 27, 52, 6), tone: '#F0A92B' },
];

export interface RailMixMonth {
  label: string;
  base: number;
  xrpl: number;
  ledger: number;
  fiat: number;
}

export const railMixByMonth: RailMixMonth[] = [
  { label: 'Dec', base: 8.2, xrpl: 5.1, ledger: 3.4, fiat: 2.1 },
  { label: 'Jan', base: 9.6, xrpl: 5.8, ledger: 3.9, fiat: 2.6 },
  { label: 'Feb', base: 10.4, xrpl: 6.2, ledger: 4.1, fiat: 3.0 },
  { label: 'Mar', base: 12.1, xrpl: 6.9, ledger: 4.6, fiat: 3.4 },
  { label: 'Apr', base: 13.8, xrpl: 7.4, ledger: 5.0, fiat: 3.9 },
  { label: 'May', base: 15.2, xrpl: 8.1, ledger: 5.3, fiat: 4.4 },
];

export const railMixLegend = [
  { key: 'base', label: 'Base', color: '#8159FF' },
  { key: 'xrpl', label: 'XRPL', color: '#2BC9F0' },
  { key: 'ledger', label: 'Internal ledger', color: '#16C784' },
  { key: 'fiat', label: 'Fiat PSP', color: '#F0A92B' },
] as const;

/** Cohort retention — rows are signup cohorts, cols are months since signup. */
export const retentionCohorts: { cohort: string; values: number[] }[] = [
  { cohort: 'Dec', values: [100, 82, 74, 69, 66, 64] },
  { cohort: 'Jan', values: [100, 85, 77, 72, 70] },
  { cohort: 'Feb', values: [100, 88, 81, 76] },
  { cohort: 'Mar', values: [100, 90, 84] },
  { cohort: 'Apr', values: [100, 91] },
  { cohort: 'May', values: [100] },
];

export interface TakeRateRow {
  rail: string;
  volumeUsd: number;
  takeBps: number;
  revenueUsd: number;
  color: string;
}

export const takeRateByRail: TakeRateRow[] = [
  { rail: 'Base (USDC)', volumeUsd: 188_000_000, takeBps: 65, revenueUsd: 1_222_000, color: '#8159FF' },
  { rail: 'XRPL (IOU)', volumeUsd: 101_000_000, takeBps: 72, revenueUsd: 727_200, color: '#2BC9F0' },
  { rail: 'Internal ledger', volumeUsd: 78_000_000, takeBps: 40, revenueUsd: 312_000, color: '#16C784' },
  { rail: 'Fiat PSP', volumeUsd: 45_900_000, takeBps: 110, revenueUsd: 504_900, color: '#F0A92B' },
];

/* ─────────────────────────────── users ──────────────────────────────── */

export type KycTier = 'Tier 0' | 'Tier 1' | 'Tier 2' | 'Tier 3';
export type UserStatus = 'Active' | 'Pending' | 'Suspended';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  country: string;
  tier: KycTier;
  riskScore: number;
  lifetimeVolumeUsd: number;
  wallets: number;
  status: UserStatus;
  joined: string;
}

export const users: AdminUser[] = [
  { id: 'usr_7k2', name: 'Amara Okafor', email: 'amara.okafor@gmail.com', country: 'Nigeria', tier: 'Tier 3', riskScore: 12, lifetimeVolumeUsd: 184_500, wallets: 3, status: 'Active', joined: '2025-02-14' },
  { id: 'usr_9p4', name: 'James Whitfield', email: 'jwhitfield@outlook.com', country: 'United Kingdom', tier: 'Tier 2', riskScore: 8, lifetimeVolumeUsd: 96_200, wallets: 2, status: 'Active', joined: '2025-03-02' },
  { id: 'usr_3m8', name: 'Priya Nair', email: 'priya.nair@proton.me', country: 'India', tier: 'Tier 2', riskScore: 21, lifetimeVolumeUsd: 51_800, wallets: 2, status: 'Active', joined: '2025-03-19' },
  { id: 'usr_5w1', name: 'Carlos Mendoza', email: 'cmendoza@gmail.com', country: 'Mexico', tier: 'Tier 1', riskScore: 34, lifetimeVolumeUsd: 12_400, wallets: 1, status: 'Active', joined: '2025-04-08' },
  { id: 'usr_2a6', name: 'Fatima Al-Sayed', email: 'fatima.alsayed@gmail.com', country: 'UAE', tier: 'Tier 3', riskScore: 6, lifetimeVolumeUsd: 312_700, wallets: 4, status: 'Active', joined: '2025-01-22' },
  { id: 'usr_8d3', name: 'Wei Chen', email: 'wei.chen@gmail.com', country: 'Singapore', tier: 'Tier 2', riskScore: 17, lifetimeVolumeUsd: 78_900, wallets: 2, status: 'Active', joined: '2025-02-28' },
  { id: 'usr_4f9', name: 'Sofia Rossi', email: 'sofia.rossi@gmail.com', country: 'Italy', tier: 'Tier 1', riskScore: 29, lifetimeVolumeUsd: 9_600, wallets: 1, status: 'Pending', joined: '2025-05-11' },
  { id: 'usr_6h2', name: 'David Kimani', email: 'dkimani@gmail.com', country: 'Kenya', tier: 'Tier 2', riskScore: 19, lifetimeVolumeUsd: 44_300, wallets: 2, status: 'Active', joined: '2025-03-30' },
  { id: 'usr_1z5', name: 'Anna Kowalski', email: 'anna.kowalski@gmail.com', country: 'Poland', tier: 'Tier 1', riskScore: 41, lifetimeVolumeUsd: 6_200, wallets: 1, status: 'Active', joined: '2025-04-25' },
  { id: 'usr_0q7', name: 'Mohammed Hassan', email: 'm.hassan@gmail.com', country: 'Pakistan', tier: 'Tier 0', riskScore: 72, lifetimeVolumeUsd: 0, wallets: 1, status: 'Suspended', joined: '2025-05-18' },
  { id: 'usr_7t3', name: 'Lucia Fernández', email: 'lfernandez@gmail.com', country: 'Spain', tier: 'Tier 2', riskScore: 14, lifetimeVolumeUsd: 67_400, wallets: 2, status: 'Active', joined: '2025-02-07' },
  { id: 'usr_3b8', name: 'Kwame Asante', email: 'kasante@gmail.com', country: 'Ghana', tier: 'Tier 2', riskScore: 23, lifetimeVolumeUsd: 38_900, wallets: 2, status: 'Active', joined: '2025-03-14' },
  { id: 'usr_9n1', name: 'Yuki Tanaka', email: 'yuki.tanaka@gmail.com', country: 'Japan', tier: 'Tier 3', riskScore: 5, lifetimeVolumeUsd: 256_100, wallets: 3, status: 'Active', joined: '2025-01-09' },
  { id: 'usr_5c4', name: 'Olga Petrova', email: 'opetrova@gmail.com', country: 'Estonia', tier: 'Tier 1', riskScore: 38, lifetimeVolumeUsd: 11_800, wallets: 1, status: 'Pending', joined: '2025-05-02' },
  { id: 'usr_2k9', name: 'Ravi Patel', email: 'ravi.patel@gmail.com', country: 'India', tier: 'Tier 2', riskScore: 16, lifetimeVolumeUsd: 89_300, wallets: 2, status: 'Active', joined: '2025-02-20' },
  { id: 'usr_8e6', name: 'Grace Mwangi', email: 'gmwangi@gmail.com', country: 'Kenya', tier: 'Tier 1', riskScore: 27, lifetimeVolumeUsd: 14_700, wallets: 1, status: 'Active', joined: '2025-04-16' },
  { id: 'usr_4r2', name: 'Tom Anderson', email: 'tanderson@gmail.com', country: 'United States', tier: 'Tier 3', riskScore: 9, lifetimeVolumeUsd: 198_400, wallets: 3, status: 'Active', joined: '2025-01-30' },
  { id: 'usr_6y8', name: 'Aisha Bello', email: 'aisha.bello@gmail.com', country: 'Nigeria', tier: 'Tier 2', riskScore: 31, lifetimeVolumeUsd: 42_600, wallets: 2, status: 'Active', joined: '2025-03-25' },
];

/* ──────────────────────────── businesses ────────────────────────────── */

export type BizTier = 'Starter' | 'Growth' | 'Scale' | 'Enterprise';
export interface Business {
  id: string;
  name: string;
  industry: string;
  tier: BizTier;
  members: number;
  treasuryUsd: number;
  monthlyVolumeUsd: number;
  apiCalls30d: number;
  status: 'Active' | 'Trial' | 'Suspended';
  since: string;
}

export const businesses: Business[] = [
  { id: 'org_acme', name: 'Acme Corp', industry: 'Marketplace', tier: 'Enterprise', members: 42, treasuryUsd: 4_820_000, monthlyVolumeUsd: 38_400_000, apiCalls30d: 12_400_000, status: 'Active', since: '2024-08-01' },
  { id: 'org_north', name: 'Northwind Trading', industry: 'Import / Export', tier: 'Scale', members: 18, treasuryUsd: 1_640_000, monthlyVolumeUsd: 14_200_000, apiCalls30d: 4_180_000, status: 'Active', since: '2024-11-12' },
  { id: 'org_pay', name: 'PayStream Inc', industry: 'Fintech / PSP', tier: 'Enterprise', members: 67, treasuryUsd: 9_310_000, monthlyVolumeUsd: 62_700_000, apiCalls30d: 28_900_000, status: 'Active', since: '2024-06-20' },
  { id: 'org_globex', name: 'Globex Logistics', industry: 'Logistics', tier: 'Growth', members: 9, treasuryUsd: 420_000, monthlyVolumeUsd: 3_900_000, apiCalls30d: 980_000, status: 'Active', since: '2025-01-15' },
  { id: 'org_remit', name: 'RemitFast', industry: 'Remittance', tier: 'Scale', members: 24, treasuryUsd: 2_180_000, monthlyVolumeUsd: 21_600_000, apiCalls30d: 7_440_000, status: 'Active', since: '2024-10-03' },
  { id: 'org_initech', name: 'Initech', industry: 'SaaS', tier: 'Growth', members: 12, treasuryUsd: 318_000, monthlyVolumeUsd: 2_400_000, apiCalls30d: 640_000, status: 'Active', since: '2025-02-09' },
  { id: 'org_umbrella', name: 'Umbrella Health', industry: 'Healthcare', tier: 'Scale', members: 31, treasuryUsd: 1_920_000, monthlyVolumeUsd: 9_800_000, apiCalls30d: 2_210_000, status: 'Active', since: '2024-12-01' },
  { id: 'org_wonka', name: 'Wonka Foods', industry: 'CPG', tier: 'Starter', members: 4, treasuryUsd: 86_000, monthlyVolumeUsd: 540_000, apiCalls30d: 120_000, status: 'Trial', since: '2025-05-04' },
  { id: 'org_stark', name: 'Stark Industries', industry: 'Manufacturing', tier: 'Enterprise', members: 88, treasuryUsd: 12_400_000, monthlyVolumeUsd: 71_300_000, apiCalls30d: 31_200_000, status: 'Active', since: '2024-05-18' },
  { id: 'org_hooli', name: 'Hooli', industry: 'Tech', tier: 'Scale', members: 27, treasuryUsd: 2_640_000, monthlyVolumeUsd: 16_900_000, apiCalls30d: 6_010_000, status: 'Active', since: '2024-09-22' },
  { id: 'org_soylent', name: 'Soylent Co', industry: 'CPG', tier: 'Growth', members: 7, treasuryUsd: 240_000, monthlyVolumeUsd: 1_800_000, apiCalls30d: 410_000, status: 'Active', since: '2025-03-11' },
  { id: 'org_pied', name: 'Pied Piper', industry: 'SaaS', tier: 'Starter', members: 5, treasuryUsd: 64_000, monthlyVolumeUsd: 380_000, apiCalls30d: 90_000, status: 'Trial', since: '2025-05-21' },
];

/* ──────────────────────────── contracts ─────────────────────────────── */

export type ContractStatus = 'Active' | 'Paused' | 'Deprecated';
export interface DeployedContract {
  id: string;
  name: string;
  purpose: string;
  network: string;
  address: string;
  version: string;
  status: ContractStatus;
  tvlUsd: number;
  audited: boolean;
  deployed: string;
}

export const contracts: DeployedContract[] = [
  { id: 'c_escrow', name: 'SalyEscrow', purpose: 'Conditional deal escrow + release', network: 'Base', address: '0x8a3f4c9b21d7e6f0a1b2c3d4e5f60718293a4b5c', version: 'v2.1.0', status: 'Active', tvlUsd: 18_400_000, audited: true, deployed: '2025-01-12' },
  { id: 'c_settle', name: 'SettlementVault', purpose: 'Batch payout settlement', network: 'Base', address: '0x1f2e3d4c5b6a7980f1e2d3c4b5a69788f0e1d2c3', version: 'v1.4.2', status: 'Active', tvlUsd: 9_120_000, audited: true, deployed: '2025-02-03' },
  { id: 'c_token', name: 'SalyToken', purpose: '$SALY ERC-20 (launch-gated)', network: 'Base', address: '0xabc1234567890def1234567890abcdef12345678', version: 'v1.0.0', status: 'Paused', tvlUsd: 0, audited: true, deployed: '2025-05-20' },
  { id: 'c_stake', name: 'SalyStaking', purpose: 'Synthetix-style staking rewards', network: 'Base', address: '0xdef9876543210fedcba9876543210fedcba98765', version: 'v1.0.0', status: 'Paused', tvlUsd: 0, audited: false, deployed: '2025-05-20' },
  { id: 'c_xrpl', name: 'XRPL Hook: Allowlist', purpose: 'Trust-line issuer allowlist enforcement', network: 'XRPL', address: 'rSALYHookAllowlist9x2k4m8p1q7w3e5r6t8y0u', version: 'v1.1.0', status: 'Active', tvlUsd: 6_300_000, audited: true, deployed: '2025-03-08' },
  { id: 'c_l3bridge', name: 'L3 Bridge', purpose: 'L3 ↔ Base canonical bridge', network: 'Base ↔ L3', address: '0x4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e', version: 'v0.9.3', status: 'Active', tvlUsd: 3_980_000, audited: false, deployed: '2025-04-19' },
];

export interface ContractUpgrade {
  id: string;
  contract: string;
  from: string;
  to: string;
  when: string;
  by: string;
}

export const contractUpgrades: ContractUpgrade[] = [
  { id: 'u1', contract: 'SalyEscrow', from: 'v2.0.1', to: 'v2.1.0', when: '2025-05-14', by: 'multisig 3/5' },
  { id: 'u2', contract: 'SettlementVault', from: 'v1.4.1', to: 'v1.4.2', when: '2025-04-28', by: 'multisig 3/5' },
  { id: 'u3', contract: 'XRPL Hook: Allowlist', from: 'v1.0.0', to: 'v1.1.0', when: '2025-04-02', by: 'multisig 4/5' },
  { id: 'u4', contract: 'SalyEscrow', from: 'v2.0.0', to: 'v2.0.1', when: '2025-03-11', by: 'multisig 3/5' },
];

/* ─────────────────────────── integrations ───────────────────────────── */

export type IntegrationHealth = 'operational' | 'degraded' | 'down';
export interface Integration {
  id: string;
  name: string;
  category: 'Banking rails' | 'KYC / AML' | 'FX / Liquidity' | 'Blockchain RPC' | 'Notifications';
  description: string;
  health: IntegrationHealth;
  latencyMs: number;
  uptime: number;
  envKey: string;
}

export const integrations: Integration[] = [
  { id: 'i_flw', name: 'Flutterwave', category: 'Banking rails', description: 'NGN, GHS, KES, USD payouts', health: 'operational', latencyMs: 240, uptime: 99.98, envKey: 'FLUTTERWAVE_SECRET_KEY' },
  { id: 'i_psk', name: 'Paystack', category: 'Banking rails', description: 'NGN NIP instant transfer', health: 'operational', latencyMs: 180, uptime: 99.95, envKey: 'PAYSTACK_SECRET_KEY' },
  { id: 'i_wise', name: 'Wise Platform', category: 'Banking rails', description: 'EUR / GBP SEPA + Faster Payments', health: 'degraded', latencyMs: 820, uptime: 99.21, envKey: 'WISE_API_TOKEN' },
  { id: 'i_chainalysis', name: 'Chainalysis', category: 'KYC / AML', description: 'On-chain address screening', health: 'operational', latencyMs: 310, uptime: 99.99, envKey: 'CHAINALYSIS_API_KEY' },
  { id: 'i_comply', name: 'ComplyAdvantage', category: 'KYC / AML', description: 'Sanctions, PEP, adverse media', health: 'operational', latencyMs: 410, uptime: 99.92, envKey: 'COMPLY_API_KEY' },
  { id: 'i_refinitiv', name: 'Refinitiv World-Check', category: 'KYC / AML', description: 'Global watchlist screening', health: 'down', latencyMs: 0, uptime: 96.40, envKey: 'REFINITIV_API_KEY' },
  { id: 'i_coinbase', name: 'Coinbase Exchange', category: 'FX / Liquidity', description: 'Crypto/fiat mid-market rates', health: 'operational', latencyMs: 95, uptime: 99.97, envKey: 'COINBASE_API_URL' },
  { id: 'i_frankfurter', name: 'Frankfurter', category: 'FX / Liquidity', description: 'ECB reference FX rates', health: 'operational', latencyMs: 130, uptime: 99.88, envKey: 'FRANKFURTER_API_URL' },
  { id: 'i_base', name: 'Base RPC (Alchemy)', category: 'Blockchain RPC', description: 'Base mainnet JSON-RPC + websockets', health: 'operational', latencyMs: 60, uptime: 99.99, envKey: 'BASE_RPC_URL' },
  { id: 'i_xrpl', name: 'XRPL Cluster', category: 'Blockchain RPC', description: 'XRP Ledger full-history nodes', health: 'operational', latencyMs: 140, uptime: 99.96, envKey: 'XRPL_RPC_URL' },
  { id: 'i_resend', name: 'Resend', category: 'Notifications', description: 'Transactional email delivery', health: 'operational', latencyMs: 210, uptime: 99.90, envKey: 'RESEND_API_KEY' },
];

export interface WebhookEndpoint {
  id: string;
  org: string;
  url: string;
  events: number;
  successRate: number;
  lastDelivery: string;
}

export const webhookEndpoints: WebhookEndpoint[] = [
  { id: 'wh1', org: 'Acme Corp', url: 'https://api.acme.com/saly/hooks', events: 184_200, successRate: 99.97, lastDelivery: '8s ago' },
  { id: 'wh2', org: 'PayStream Inc', url: 'https://hooks.paystream.io/v1/saly', events: 412_800, successRate: 99.91, lastDelivery: '2s ago' },
  { id: 'wh3', org: 'RemitFast', url: 'https://remitfast.app/webhooks', events: 96_400, successRate: 98.40, lastDelivery: '41s ago' },
  { id: 'wh4', org: 'Stark Industries', url: 'https://edge.stark.io/saly-events', events: 521_900, successRate: 99.99, lastDelivery: '1s ago' },
];

export interface CredentialRotation {
  id: string;
  name: string;
  scope: string;
  lastRotated: string;
  nextDue: string;
  overdue: boolean;
}

export const credentialRotations: CredentialRotation[] = [
  { id: 'cr1', name: 'FLUTTERWAVE_SECRET_KEY', scope: 'Banking rails', lastRotated: '2025-04-01', nextDue: '2025-07-01', overdue: false },
  { id: 'cr2', name: 'CHAINALYSIS_API_KEY', scope: 'KYC / AML', lastRotated: '2025-02-15', nextDue: '2025-05-15', overdue: true },
  { id: 'cr3', name: 'BASE_RPC_URL', scope: 'Blockchain RPC', lastRotated: '2025-05-10', nextDue: '2025-08-10', overdue: false },
  { id: 'cr4', name: 'COMPLY_API_KEY', scope: 'KYC / AML', lastRotated: '2025-03-20', nextDue: '2025-06-20', overdue: false },
];

/* ───────────────────────────── settings ─────────────────────────────── */

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  mfa: boolean;
}

export const adminTeam: AdminMember[] = [
  { id: 'm1', name: 'Sarah Chen', email: 'sarah.chen@salychain.io', role: 'Owner', lastActive: '2m ago', mfa: true },
  { id: 'm2', name: 'Marcus Webb', email: 'marcus.webb@salychain.io', role: 'Platform Admin', lastActive: '18m ago', mfa: true },
  { id: 'm3', name: 'Lena Hoffmann', email: 'lena.h@salychain.io', role: 'Compliance Officer', lastActive: '1h ago', mfa: true },
  { id: 'm4', name: 'Dev Sharma', email: 'dev.sharma@salychain.io', role: 'Risk Analyst', lastActive: '3h ago', mfa: false },
  { id: 'm5', name: 'Tomás Rivera', email: 'tomas.r@salychain.io', role: 'Support Lead', lastActive: '5h ago', mfa: true },
];

export interface RbacRole {
  id: string;
  name: string;
  members: number;
  permissions: string[];
  tone: 'brand' | 'success' | 'warning' | 'danger';
}

export const rbacRoles: RbacRole[] = [
  { id: 'r_owner', name: 'Owner', members: 1, tone: 'brand', permissions: ['Full platform access', 'Billing & contracts', 'Manage admins', 'Break-glass access'] },
  { id: 'r_admin', name: 'Platform Admin', members: 3, tone: 'success', permissions: ['Manage businesses & users', 'Feature flags', 'View all transactions', 'Trigger settlements'] },
  { id: 'r_compliance', name: 'Compliance Officer', members: 4, tone: 'warning', permissions: ['Review KYC cases', 'Approve / reject screening', 'Export audit logs', 'Freeze accounts'] },
  { id: 'r_risk', name: 'Risk Analyst', members: 6, tone: 'danger', permissions: ['View risk assessments', 'Tune thresholds (proposed)', 'Flag actors', 'Read-only ledger'] },
  { id: 'r_support', name: 'Support', members: 9, tone: 'success', permissions: ['View user profiles', 'Resend receipts', 'Open tickets', 'Read-only transactions'] },
];

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  scope: string;
}

export const featureFlags: FeatureFlag[] = [
  { id: 'f1', name: '$SALY token launch', description: 'Activate the $SALY ERC-20 + staking surfaces platform-wide', enabled: false, scope: 'Global' },
  { id: 'f2', name: 'L3 money rail', description: 'Route eligible payouts through the L3 rollup', enabled: true, scope: 'Global' },
  { id: 'f3', name: 'On-chain DEX quotes', description: 'Uniswap V3 QuoterV2 pricing for crypto swaps', enabled: true, scope: 'Liquidity' },
  { id: 'f4', name: 'Agentic spend approvals', description: 'Multi-approver high-value spend gating for AI agents', enabled: true, scope: 'Agents' },
  { id: 'f5', name: 'New onboarding flow', description: 'Progressive KYB with document OCR', enabled: false, scope: 'Beta' },
  { id: 'f6', name: 'Webhook v2 signing', description: 'Ed25519 webhook signatures (rotating from HMAC)', enabled: false, scope: 'Beta' },
];

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  when: string;
  tone: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
}

export const auditLog: AuditEntry[] = [
  { id: 'al1', actor: 'sarah.chen', action: 'Updated feature flag', target: 'L3 money rail → enabled', when: '14m ago', tone: 'brand' },
  { id: 'al2', actor: 'lena.h', action: 'Resolved compliance case', target: 'case_8f21 (cleared)', when: '52m ago', tone: 'success' },
  { id: 'al3', actor: 'marcus.webb', action: 'Triggered batch settlement', target: '1,204 NGN payouts', when: '1h ago', tone: 'brand' },
  { id: 'al4', actor: 'dev.sharma', action: 'Flagged actor', target: 'act_9f2 (velocity)', when: '2h ago', tone: 'warning' },
  { id: 'al5', actor: 'lena.h', action: 'Froze account', target: 'usr_0q7 (sanctions hit)', when: '3h ago', tone: 'danger' },
  { id: 'al6', actor: 'sarah.chen', action: 'Invited admin', target: 'tomas.r@salychain.io', when: '6h ago', tone: 'neutral' },
];

/* status helpers */
export function healthTone(h: IntegrationHealth | StatusTone): StatusTone {
  if (h === 'operational' || h === 'degraded' || h === 'down' || h === 'pending') return h;
  return 'operational';
}
