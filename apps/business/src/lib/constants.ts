/**
 * Tenant binding for the business app. Fail-closed in production: a missing
 * `BUSINESS_ORG_ID`/`BUSINESS_ACTOR_ID` aborts startup rather than silently
 * defaulting to the demo org, which could cross tenants. Dev/test keep the
 * frictionless demo fallback.
 */
function requireTenantEnv(
  name: 'BUSINESS_ORG_ID' | 'BUSINESS_ACTOR_ID',
  devFallback: string,
): string {
  const value = process.env[name];
  if (value) return value;
  const isNextBuild = process.env.NEXT_PHASE === 'phase-production-build';
  if (process.env.NODE_ENV === 'production' && !isNextBuild) {
    throw new Error(`${name} must be set in production (no demo-org fallback).`);
  }
  return devFallback;
}

export const BUSINESS_ORG_ID = requireTenantEnv('BUSINESS_ORG_ID', 'org_demo_acme');
export const BUSINESS_ACTOR_ID = requireTenantEnv(
  'BUSINESS_ACTOR_ID',
  'biz_01HZJKMNPQRSTVWXYZ0ABCDEFGH',
);
/** Ledger account UUID for NGN fiat payouts (optional — execution falls back to liability.business.{actor}.ngn). */
export const BUSINESS_FIAT_NGN_LEDGER_ACCOUNT = process.env.BUSINESS_FIAT_NGN_LEDGER_ACCOUNT;

/** Default NGN treasury account code when UUID is not configured. */
export function businessNgnTreasuryAccountRef(): string {
  return (
    BUSINESS_FIAT_NGN_LEDGER_ACCOUNT ?? `liability.business.${BUSINESS_ACTOR_ID.toLowerCase()}.ngn`
  );
}

export const SERVICE_URLS = {
  apikeys: process.env.APIKEYS_BASE_URL ?? 'http://localhost:4009',
  wallet: process.env.WALLET_BASE_URL ?? 'http://localhost:4002',
  ledger: process.env.LEDGER_BASE_URL ?? 'http://localhost:4001',
  execution: process.env.EXECUTION_BASE_URL ?? 'http://localhost:4003',
  intent: process.env.INTENT_BASE_URL ?? 'http://localhost:4008',
  agents: process.env.AGENTS_BASE_URL ?? 'http://localhost:4011',
  liquidity: process.env.LIQUIDITY_BASE_URL ?? 'http://localhost:4006',
  merchant: process.env.MERCHANT_BASE_URL ?? 'http://localhost:4021',
} as const;
