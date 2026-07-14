#!/usr/bin/env node
/**
 * Seed Milestone E vertical demo data for admin/portal pages.
 *
 * Prerequisites: postgres migrated + vertical services running on default ports.
 *   pnpm db:migrate
 *   pnpm --filter @salychain/service-finance dev   # :4023
 *   pnpm --filter @salychain/service-gov dev       # :4024
 *   pnpm --filter @salychain/service-health dev    # :4028
 *   pnpm --filter @salychain/service-agents dev    # :4011 (also needs wallet :4002)
 *
 * Usage:
 *   node scripts/seed-verticals-demo.mjs
 *   FORCE=1 node scripts/seed-verticals-demo.mjs   # re-seed even if data exists
 */

const ORG = process.env.VERTICAL_DEMO_ORG_ID ?? process.env.ADMIN_DEMO_ORG_ID ?? 'org_demo_acme';
const OWNER = process.env.VERTICAL_DEMO_OWNER_ID ?? 'usr_demo_acme';

const URLS = {
  finance: process.env.FINANCE_BASE_URL ?? 'http://localhost:4023',
  gov: process.env.GOV_BASE_URL ?? 'http://localhost:4024',
  health: process.env.HEALTH_BASE_URL ?? 'http://localhost:4028',
  agents: process.env.AGENTS_BASE_URL ?? 'http://localhost:4011',
};

async function get(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(8_000) });
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  return res.json();
}

async function post(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8_000),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`POST ${url} → ${res.status}: ${text.slice(0, 200)}`);
  }
  return text ? JSON.parse(text) : {};
}

function log(step, msg) {
  console.log(`[verticals:seed] ${step}: ${msg}`);
}

async function alreadySeeded() {
  try {
    const programs = await get(`${URLS.gov}/v1/gov/programs?org_id=${encodeURIComponent(ORG)}`);
    return Array.isArray(programs.data) && programs.data.length > 0;
  } catch {
    return false;
  }
}

async function seedFinance() {
  const bond = await post(`${URLS.finance}/v1/finance/instruments`, {
    org_id: ORG,
    type: 'BOND',
    name: 'Acme Municipal Bond 2028',
    issuer_ref: 'issuer_acme_muni',
    currency: 'USD',
  });
  log('finance', `instrument ${bond.id ?? bond.name}`);

  const fund = await post(`${URLS.finance}/v1/finance/instruments`, {
    org_id: ORG,
    type: 'FUND',
    name: 'Saly Growth Fund I',
    issuer_ref: 'issuer_saly_capital',
    currency: 'USD',
  });
  log('finance', `instrument ${fund.id ?? fund.name}`);

  if (bond.id) {
    await post(`${URLS.finance}/v1/finance/holdings`, {
      org_id: ORG,
      account_ref: 'treasury_main',
      instrument_id: bond.id,
      units_minor: '500000',
    });
    log('finance', 'holding treasury_main → bond');
  }

  await post(`${URLS.finance}/v1/finance/loans`, {
    org_id: ORG,
    borrower_ref: 'borrower_acme_ops',
    principal_minor: '25000000',
    rate_bps: 650,
    currency: 'USD',
  });
  log('finance', 'loan originated');
}

async function seedGov() {
  const program = await post(`${URLS.gov}/v1/gov/programs`, {
    org_id: ORG,
    name: 'Small Business Relief Q3',
    budget_minor: '500000000',
    currency: 'USD',
  });
  log('gov', `program ${program.id}`);

  const benA = await post(`${URLS.gov}/v1/gov/beneficiaries`, {
    org_id: ORG,
    program_id: program.id,
    external_ref: 'beneficiary_001',
  });
  const benB = await post(`${URLS.gov}/v1/gov/beneficiaries`, {
    org_id: ORG,
    program_id: program.id,
    external_ref: 'beneficiary_002',
  });
  log('gov', `beneficiaries ${benA.id}, ${benB.id}`);

  await post(`${URLS.gov}/v1/gov/disbursements/batch`, {
    org_id: ORG,
    program_id: program.id,
    batch_intent_id: `intent_demo_${Date.now()}`,
    items: [
      { beneficiary_id: benA.id, amount_minor: '1500000', currency: 'USD' },
      { beneficiary_id: benB.id, amount_minor: '2200000', currency: 'USD' },
    ],
  });
  log('gov', 'disbursement batch created');
}

async function seedHealth() {
  const provider = await post(`${URLS.health}/v1/health/providers`, {
    org_id: ORG,
    name: 'Acme General Hospital',
  });
  const payer = await post(`${URLS.health}/v1/health/payers`, {
    org_id: ORG,
    name: 'Acme Health Plan',
  });
  log('health', `provider ${provider.id}, payer ${payer.id}`);

  await post(`${URLS.health}/v1/health/consent`, {
    org_id: ORG,
    patient_ref: 'patient_demo_001',
    scope: 'claims.adjudication',
  });
  log('health', 'consent granted');

  const claim = await post(`${URLS.health}/v1/health/claims`, {
    org_id: ORG,
    provider_id: provider.id,
    payer_id: payer.id,
    procedure_code: '99213',
    amount_minor: '18500',
    currency: 'USD',
  });
  log('health', `claim ${claim.id} submitted`);
}

async function seedAgents() {
  const agent = await post(`${URLS.agents}/v1/agents`, {
    owner_id: OWNER,
    owner_kind: 'USER',
    org_id: ORG,
    name: 'Invoice Automation Agent',
  });
  log('agents', `agent ${agent.id}`);

  await post(`${URLS.agents}/v1/agents/${agent.id}/services`, {
    name: 'Invoice OCR + Payment',
    description: 'Extract invoice fields and initiate payment intents',
    price_minor: '2500',
    currency: 'USD',
    tags: ['finance', 'ocr', 'payments'],
    list_on_marketplace: true,
  });
  log('agents', 'marketplace service published');
}

async function main() {
  console.log(`[verticals:seed] org=${ORG} owner=${OWNER}`);

  if (!process.env.FORCE && (await alreadySeeded())) {
    console.log('[verticals:seed] Demo data already present (set FORCE=1 to re-run).');
    return;
  }

  const steps = [
    ['finance', seedFinance],
    ['gov', seedGov],
    ['health', seedHealth],
    ['agents', seedAgents],
  ];

  for (const [name, fn] of steps) {
    try {
      await fn();
    } catch (err) {
      console.warn(`[verticals:seed] ${name} skipped: ${err instanceof Error ? err.message : err}`);
    }
  }

  console.log('[verticals:seed] Done. Open http://localhost:3001/verticals or http://localhost:3003/verticals/finance');
}

main().catch((err) => {
  console.error('[verticals:seed] Fatal:', err);
  process.exit(1);
});
