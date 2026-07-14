/**
 * Milestone E vertical modules — server-side fetch helpers for admin dashboards.
 * Gracefully degrades when a vertical service is offline.
 */

import { createVerticalHttpClient } from '@salychain/vertical-core';

const FINANCE_URL = process.env.FINANCE_BASE_URL ?? 'http://localhost:4023';
const GOV_URL = process.env.GOV_BASE_URL ?? 'http://localhost:4024';
const AGRI_URL = process.env.AGRI_BASE_URL ?? 'http://localhost:4025';
const SCM_URL = process.env.SCM_BASE_URL ?? 'http://localhost:4026';
const AVIATION_URL = process.env.AVIATION_BASE_URL ?? 'http://localhost:4027';
const HEALTH_URL = process.env.HEALTH_BASE_URL ?? 'http://localhost:4028';
const EDU_URL = process.env.EDU_BASE_URL ?? 'http://localhost:4029';
const AGENTS_URL = process.env.AGENTS_BASE_URL ?? 'http://localhost:4011';

export const ADMIN_VERTICAL_ORG_ID =
  process.env.ADMIN_DEMO_ORG_ID ?? process.env.ADMIN_VERTICAL_ORG_ID ?? 'org_demo_acme';

export const ADMIN_DEMO_OWNER_ID =
  process.env.ADMIN_DEMO_OWNER_ID ?? process.env.VERTICAL_DEMO_OWNER_ID ?? 'usr_demo_acme';

export type VerticalFetchResult<T> = { data: T; source: 'live' | 'unavailable' };

export type VerticalActionResult =
  | { ok: true; message: string; id?: string }
  | { ok: false; error: string };

function verticalHttp() {
  return createVerticalHttpClient({
    financeUrl: FINANCE_URL,
    govUrl: GOV_URL,
    healthUrl: HEALTH_URL,
    agentsUrl: AGENTS_URL,
    agriUrl: AGRI_URL,
    scmUrl: SCM_URL,
    aviationUrl: AVIATION_URL,
    eduUrl: EDU_URL,
  });
}

async function verticalFetch<T>(url: string): Promise<VerticalFetchResult<T>> {
  try {
    const res = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(5_000) });
    if (!res.ok) return { data: [] as T, source: 'unavailable' };
    const json = (await res.json()) as { data?: T };
    return { data: (json.data ?? []) as T, source: 'live' };
  } catch {
    return { data: [] as T, source: 'unavailable' };
  }
}

export type FinanceInstrument = {
  id: string;
  orgId: string;
  type: string;
  name: string;
  issuerRef: string;
  currency: string;
  createdAt: string;
};

export type FinanceHolding = {
  id: string;
  orgId: string;
  accountRef: string;
  instrumentId: string;
  unitsMinor: string;
  instrument?: FinanceInstrument | null;
  createdAt: string;
};

export type FinanceLoan = {
  id: string;
  orgId: string;
  borrowerRef: string;
  principalMinor: string;
  rateBps: number;
  currency: string;
  status: string;
  createdAt: string;
};

export type GovProgram = {
  id: string;
  orgId: string;
  name: string;
  budgetMinor: string;
  currency: string;
  disbursementCount: number;
  createdAt: string;
};

export type GovDisbursement = {
  id: string;
  orgId: string;
  programId: string;
  programName: string;
  beneficiaryId: string;
  amountMinor: string;
  currency: string;
  status: string;
  createdAt: string;
};

export type HealthConsent = {
  id: string;
  orgId: string;
  patientId: string;
  scope: string;
  status: string;
  expiresAt: string | null;
  createdAt: string;
};

export type HealthClaim = {
  id: string;
  orgId: string;
  providerId: string;
  payerId: string;
  procedureCode: string;
  amountMinor: string;
  currency: string;
  status: string;
  createdAt: string;
};

export type HealthProvider = {
  id: string;
  orgId: string;
  name: string;
  createdAt: string;
};

export type HealthPayer = {
  id: string;
  orgId: string;
  name: string;
  createdAt: string;
};

export type AgentMarketplaceListing = {
  id: string;
  serviceId: string;
  tags: unknown;
  visible: boolean;
  createdAt: string;
  service: {
    id: string;
    name: string;
    description: string | null;
    priceMinor: string;
    currency: string;
    agent: { id: string; name: string; status: string; orgId: string | null };
  };
};

export type AgentSummary = {
  id: string;
  name: string;
  status: string;
  org_id?: string;
  owner_id: string;
  created_at: string;
};

export async function fetchFinanceInstruments(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<FinanceInstrument[]>(
    `${FINANCE_URL}/v1/finance/instruments?org_id=${encodeURIComponent(orgId)}&limit=${limit}`,
  );
}

export async function fetchFinanceHoldings(orgId = ADMIN_VERTICAL_ORG_ID) {
  return verticalFetch<FinanceHolding[]>(
    `${FINANCE_URL}/v1/finance/holdings?org_id=${encodeURIComponent(orgId)}`,
  );
}

export async function fetchFinanceLoans(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<FinanceLoan[]>(
    `${FINANCE_URL}/v1/finance/loans?org_id=${encodeURIComponent(orgId)}&limit=${limit}`,
  );
}

export async function fetchGovPrograms(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<GovProgram[]>(
    `${GOV_URL}/v1/gov/programs?org_id=${encodeURIComponent(orgId)}&limit=${limit}`,
  );
}

export async function fetchGovDisbursements(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<GovDisbursement[]>(
    `${GOV_URL}/v1/gov/disbursements?org_id=${encodeURIComponent(orgId)}&limit=${limit}`,
  );
}

export async function fetchHealthConsents(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<HealthConsent[]>(
    `${HEALTH_URL}/v1/health/consents?org_id=${encodeURIComponent(orgId)}&limit=${limit}`,
  );
}

export async function fetchHealthClaims(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<HealthClaim[]>(
    `${HEALTH_URL}/v1/health/claims?org_id=${encodeURIComponent(orgId)}&limit=${limit}`,
  );
}

export async function fetchHealthProviders(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<HealthProvider[]>(
    `${HEALTH_URL}/v1/health/providers?org_id=${encodeURIComponent(orgId)}&limit=${limit}`,
  );
}

export async function fetchHealthPayers(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<HealthPayer[]>(
    `${HEALTH_URL}/v1/health/payers?org_id=${encodeURIComponent(orgId)}&limit=${limit}`,
  );
}

export async function fetchAgentMarketplace(limit = 25, tag?: string) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (tag) params.set('tag', tag);
  return verticalFetch<AgentMarketplaceListing[]>(`${AGENTS_URL}/v1/agents/marketplace/discover?${params}`);
}

export async function fetchOrgAgents(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<AgentSummary[]>(
    `${AGENTS_URL}/v1/agents?org_id=${encodeURIComponent(orgId)}&limit=${limit}`,
  );
}

export type AgriFarmer = { id: string; externalRef: string; createdAt: string };
export type AgriFarm = { id: string; farmerId: string; farmerRef: string; crop: string | null; season: string | null; createdAt: string };
export type AgriLot = { id: string; farmId: string; lotCode: string; origin: string | null; crop: string | null; createdAt: string };
export type AgriInputLoan = { id: string; farmerId: string; amountMinor: string; currency: string; status: string; createdAt: string };

export type ScmShipment = { id: string; origin: string; destination: string; status: string; createdAt: string };
export type ScmSettlement = { id: string; shipmentId: string; amountMinor: string; currency: string; status: string; createdAt: string };

export type AviationAircraft = { id: string; tail: string; model: string; ownerRef: string; createdAt: string };
export type AviationPart = { id: string; serial: string; partType: string; aircraftId: string | null; createdAt: string };
export type AviationSettlement = { id: string; partId: string; buyerRef: string; sellerRef: string; amountMinor: string; currency: string; status: string; createdAt: string };

export type EduInstitution = { id: string; name: string; createdAt: string };
export type EduCredential = { id: string; institutionName: string; type: string; status: string; issuedAt: string; expiresAt: string | null };
export type EduTuitionInvoice = { id: string; learnerId: string; amountMinor: string; currency: string; dueAt: string; createdAt: string };
export type EduScholarship = { id: string; learnerId: string; amountMinor: string; currency: string; milestone: string; status: string; createdAt: string };

export async function fetchAgriFarmers(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<AgriFarmer[]>(`${AGRI_URL}/v1/agri/farmers?org_id=${encodeURIComponent(orgId)}&limit=${limit}`);
}
export async function fetchAgriFarms(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<AgriFarm[]>(`${AGRI_URL}/v1/agri/farms?org_id=${encodeURIComponent(orgId)}&limit=${limit}`);
}
export async function fetchAgriLots(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<AgriLot[]>(`${AGRI_URL}/v1/agri/lots?org_id=${encodeURIComponent(orgId)}&limit=${limit}`);
}
export async function fetchAgriLoans(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<AgriInputLoan[]>(`${AGRI_URL}/v1/agri/loans?org_id=${encodeURIComponent(orgId)}&limit=${limit}`);
}
export async function fetchScmShipments(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<ScmShipment[]>(`${SCM_URL}/v1/scm/shipments?org_id=${encodeURIComponent(orgId)}&limit=${limit}`);
}
export async function fetchScmSettlements(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<ScmSettlement[]>(`${SCM_URL}/v1/scm/settlements?org_id=${encodeURIComponent(orgId)}&limit=${limit}`);
}
export async function fetchAviationAircraft(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<AviationAircraft[]>(`${AVIATION_URL}/v1/aviation/aircraft?org_id=${encodeURIComponent(orgId)}&limit=${limit}`);
}
export async function fetchAviationParts(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<AviationPart[]>(`${AVIATION_URL}/v1/aviation/parts?org_id=${encodeURIComponent(orgId)}&limit=${limit}`);
}
export async function fetchAviationSettlements(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<AviationSettlement[]>(`${AVIATION_URL}/v1/aviation/settlements?org_id=${encodeURIComponent(orgId)}&limit=${limit}`);
}
export async function fetchEduInstitutions(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<EduInstitution[]>(`${EDU_URL}/v1/edu/institutions?org_id=${encodeURIComponent(orgId)}&limit=${limit}`);
}
export async function fetchEduCredentials(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<EduCredential[]>(`${EDU_URL}/v1/edu/credentials?org_id=${encodeURIComponent(orgId)}&limit=${limit}`);
}
export async function fetchEduTuitionInvoices(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<EduTuitionInvoice[]>(`${EDU_URL}/v1/edu/tuition/invoices?org_id=${encodeURIComponent(orgId)}&limit=${limit}`);
}
export async function fetchEduScholarships(orgId = ADMIN_VERTICAL_ORG_ID, limit = 50) {
  return verticalFetch<EduScholarship[]>(`${EDU_URL}/v1/edu/scholarships?org_id=${encodeURIComponent(orgId)}&limit=${limit}`);
}

export function formatMinorAmount(minor: string, currency: string): string {
  try {
    const value = Number(minor) / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.length === 3 ? currency : 'USD',
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${minor} ${currency}`;
  }
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso.slice(0, 16);
  }
}

function actionOk(message: string, id?: string): VerticalActionResult {
  return { ok: true, message, id };
}

function actionErr(error: string): VerticalActionResult {
  return { ok: false, error };
}

export async function mutateCreateFinanceInstrument(input: {
  orgId?: string;
  type: 'BOND' | 'FUND' | 'RWA';
  name: string;
  issuerRef: string;
  currency: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().finance.createInstrument({
    orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID,
    type: input.type,
    name: input.name,
    issuerRef: input.issuerRef,
    currency: input.currency,
  });
  if (!res.ok) return actionErr(res.error);
  const id = (res.data as { id?: string }).id;
  return actionOk('Instrument registered.', id);
}

export async function mutateUpsertFinanceHolding(input: {
  orgId?: string;
  accountRef: string;
  instrumentId: string;
  unitsMinor: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().finance.upsertHolding({
    orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID,
    accountRef: input.accountRef,
    instrumentId: input.instrumentId,
    unitsMinor: input.unitsMinor,
  });
  return res.ok ? actionOk('Holding updated.') : actionErr(res.error);
}

export async function mutateOriginateFinanceLoan(input: {
  orgId?: string;
  borrowerRef: string;
  principalMinor: string;
  rateBps: number;
  currency: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().finance.originateLoan({
    orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID,
    borrowerRef: input.borrowerRef,
    principalMinor: input.principalMinor,
    rateBps: input.rateBps,
    currency: input.currency,
  });
  return res.ok ? actionOk('Loan originated.') : actionErr(res.error);
}

export async function mutateCreateGovProgram(input: {
  orgId?: string;
  name: string;
  budgetMinor: string;
  currency: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().gov.createProgram({
    orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID,
    name: input.name,
    budgetMinor: input.budgetMinor,
    currency: input.currency,
  });
  if (!res.ok) return actionErr(res.error);
  return actionOk('Program created.', (res.data as { id?: string }).id);
}

export async function mutateRegisterGovBeneficiary(input: {
  orgId?: string;
  programId: string;
  externalRef: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().gov.registerBeneficiary({
    orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID,
    programId: input.programId,
    externalRef: input.externalRef,
  });
  return res.ok ? actionOk('Beneficiary registered.') : actionErr(res.error);
}

export async function mutateRegisterHealthProvider(input: {
  orgId?: string;
  name: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().health.registerProvider(input.orgId ?? ADMIN_VERTICAL_ORG_ID, input.name);
  if (!res.ok) return actionErr(res.error);
  return actionOk('Provider registered.', (res.data as { id?: string }).id);
}

export async function mutateRegisterHealthPayer(input: {
  orgId?: string;
  name: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().health.registerPayer(input.orgId ?? ADMIN_VERTICAL_ORG_ID, input.name);
  if (!res.ok) return actionErr(res.error);
  return actionOk('Payer registered.', (res.data as { id?: string }).id);
}

export async function mutateGrantHealthConsent(input: {
  orgId?: string;
  patientRef: string;
  scope: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().health.grantConsent({
    orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID,
    patientRef: input.patientRef,
    scope: input.scope,
  });
  return res.ok ? actionOk('Consent granted.') : actionErr(res.error);
}

export async function mutateSubmitHealthClaim(input: {
  orgId?: string;
  providerId: string;
  payerId: string;
  procedureCode: string;
  amountMinor: string;
  currency: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().health.submitClaim({
    orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID,
    providerId: input.providerId,
    payerId: input.payerId,
    procedureCode: input.procedureCode,
    amountMinor: input.amountMinor,
    currency: input.currency,
  });
  return res.ok ? actionOk('Claim submitted.') : actionErr(res.error);
}

export async function mutateAdjudicateHealthClaim(input: {
  orgId?: string;
  claimId: string;
  approved: boolean;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().health.adjudicateClaim(
    input.orgId ?? ADMIN_VERTICAL_ORG_ID,
    input.claimId,
    input.approved,
  );
  return res.ok ? actionOk(input.approved ? 'Claim approved.' : 'Claim rejected.') : actionErr(res.error);
}

export async function mutateCreateAgent(input: {
  orgId?: string;
  name: string;
  ownerId?: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().agents.create({
    ownerId: input.ownerId ?? ADMIN_DEMO_OWNER_ID,
    ownerKind: 'USER',
    orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID,
    name: input.name,
  });
  if (!res.ok) return actionErr(res.error);
  return actionOk('Agent created.', (res.data as { id?: string }).id);
}

export async function mutatePublishAgentService(input: {
  agentId: string;
  name: string;
  description?: string;
  priceMinor: string;
  currency: string;
  tags?: string[];
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().agents.publishService(input.agentId, {
    name: input.name,
    description: input.description,
    priceMinor: input.priceMinor,
    currency: input.currency,
    tags: input.tags,
  });
  return res.ok ? actionOk('Service published to marketplace.') : actionErr(res.error);
}

export async function mutateRegisterAgriFarmer(input: { orgId?: string; externalRef: string }): Promise<VerticalActionResult> {
  const res = await verticalHttp().agri.registerFarmer(input.orgId ?? ADMIN_VERTICAL_ORG_ID, input.externalRef);
  return res.ok ? actionOk('Farmer registered.', (res.data as { id?: string }).id) : actionErr(res.error);
}

export async function mutateRegisterAgriFarm(input: {
  orgId?: string;
  farmerId: string;
  crop?: string;
  season?: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().agri.registerFarm({ orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID, ...input });
  return res.ok ? actionOk('Farm registered.') : actionErr(res.error);
}

export async function mutateRegisterAgriLot(input: {
  orgId?: string;
  farmId: string;
  lotCode: string;
  origin?: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().agri.registerLot({ orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID, ...input });
  return res.ok ? actionOk('Produce lot registered.') : actionErr(res.error);
}

export async function mutateAgriInputLoan(input: {
  orgId?: string;
  farmerId: string;
  amountMinor: string;
  currency: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().agri.inputLoan({ orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID, ...input });
  return res.ok ? actionOk('Input loan originated.') : actionErr(res.error);
}

export async function mutateCreateScmShipment(input: {
  orgId?: string;
  origin: string;
  destination: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().scm.createShipment({ orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID, ...input });
  return res.ok ? actionOk('Shipment created.', (res.data as { id?: string }).id) : actionErr(res.error);
}

export async function mutateCreateScmSettlement(input: {
  orgId?: string;
  shipmentId: string;
  amountMinor: string;
  currency: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().scm.createSettlement({ orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID, ...input });
  return res.ok ? actionOk('Settlement created.') : actionErr(res.error);
}

export async function mutateRegisterAviationAircraft(input: {
  orgId?: string;
  tail: string;
  model: string;
  ownerRef: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().aviation.registerAircraft({ orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID, ...input });
  return res.ok ? actionOk('Aircraft registered.') : actionErr(res.error);
}

export async function mutateMintAviationPart(input: {
  orgId?: string;
  serial: string;
  partType: string;
  aircraftId?: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().aviation.mintPart({ orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID, ...input });
  return res.ok ? actionOk('Part minted.') : actionErr(res.error);
}

export async function mutateCreateAviationSettlement(input: {
  orgId?: string;
  partId: string;
  buyerRef: string;
  sellerRef: string;
  amountMinor: string;
  currency: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().aviation.createSettlement({ orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID, ...input });
  return res.ok ? actionOk('Aviation settlement created.') : actionErr(res.error);
}

export async function mutateRegisterEduInstitution(input: { orgId?: string; name: string }): Promise<VerticalActionResult> {
  const res = await verticalHttp().edu.registerInstitution(input.orgId ?? ADMIN_VERTICAL_ORG_ID, input.name);
  return res.ok ? actionOk('Institution registered.', (res.data as { id?: string }).id) : actionErr(res.error);
}

export async function mutateIssueEduCredential(input: {
  orgId?: string;
  institutionId: string;
  learnerRef: string;
  type: 'DEGREE' | 'CERTIFICATE' | 'BADGE';
  program: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().edu.issueCredential({
    orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID,
    institutionId: input.institutionId,
    learnerRef: input.learnerRef,
    type: input.type,
    payload: { program: input.program },
  });
  return res.ok ? actionOk('Credential issued.') : actionErr(res.error);
}

export async function mutateCreateEduTuitionInvoice(input: {
  orgId?: string;
  learnerRef: string;
  amountMinor: string;
  currency: string;
  dueAt: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().edu.tuitionInvoice({ orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID, ...input });
  return res.ok ? actionOk('Tuition invoice created.') : actionErr(res.error);
}

export async function mutateCreateEduScholarship(input: {
  orgId?: string;
  learnerRef: string;
  amountMinor: string;
  currency: string;
  milestone: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().edu.scholarship({ orgId: input.orgId ?? ADMIN_VERTICAL_ORG_ID, ...input });
  return res.ok ? actionOk('Scholarship grant created.') : actionErr(res.error);
}

export async function mutateDisburseEduScholarship(input: { orgId?: string; grantId: string }): Promise<VerticalActionResult> {
  const res = await verticalHttp().edu.disburseScholarship(input.orgId ?? ADMIN_VERTICAL_ORG_ID, input.grantId);
  return res.ok ? actionOk('Scholarship disbursed.') : actionErr(res.error);
}

export async function seedVerticalsDemo(orgId = ADMIN_VERTICAL_ORG_ID): Promise<VerticalActionResult> {
  const client = verticalHttp();
  const errors: string[] = [];

  const bond = await client.finance.createInstrument({
    orgId,
    type: 'BOND',
    name: 'Acme Municipal Bond 2028',
    issuerRef: 'issuer_acme_muni',
    currency: 'USD',
  });
  if (!bond.ok) errors.push(`finance: ${bond.error}`);
  else if ((bond.data as { id?: string }).id) {
    await client.finance.upsertHolding({
      orgId,
      accountRef: 'treasury_main',
      instrumentId: (bond.data as { id: string }).id,
      unitsMinor: '500000',
    });
  }

  await client.finance.createInstrument({
    orgId,
    type: 'FUND',
    name: 'Saly Growth Fund I',
    issuerRef: 'issuer_saly_capital',
    currency: 'USD',
  });
  await client.finance.originateLoan({
    orgId,
    borrowerRef: 'borrower_acme_ops',
    principalMinor: '25000000',
    rateBps: 650,
    currency: 'USD',
  });

  const program = await client.gov.createProgram({
    orgId,
    name: 'Small Business Relief Q3',
    budgetMinor: '500000000',
    currency: 'USD',
  });
  if (program.ok && (program.data as { id?: string }).id) {
    const programId = (program.data as { id: string }).id;
    const benA = await client.gov.registerBeneficiary({
      orgId,
      programId,
      externalRef: 'beneficiary_001',
    });
    const benB = await client.gov.registerBeneficiary({
      orgId,
      programId,
      externalRef: 'beneficiary_002',
    });
    if (benA.ok && benB.ok) {
      const batch = await client.gov.batchDisbursements({
        orgId,
        programId,
        batchIntentId: `intent_demo_${Date.now()}`,
        items: [
          {
            beneficiaryId: (benA.data as { id: string }).id,
            amountMinor: '1500000',
            currency: 'USD',
          },
          {
            beneficiaryId: (benB.data as { id: string }).id,
            amountMinor: '2200000',
            currency: 'USD',
          },
        ],
      });
      if (!batch.ok) errors.push(`gov: ${batch.error}`);
    } else {
      if (!benA.ok) errors.push(`gov: ${benA.error}`);
      if (!benB.ok) errors.push(`gov: ${benB.error}`);
    }
  } else if (!program.ok) {
    errors.push(`gov: ${program.error}`);
  }

  const provider = await client.health.registerProvider(orgId, 'Acme General Hospital');
  const payer = await client.health.registerPayer(orgId, 'Acme Health Plan');
  await client.health.grantConsent({
    orgId,
    patientRef: 'patient_demo_001',
    scope: 'claims.adjudication',
  });
  if (provider.ok && payer.ok) {
    await client.health.submitClaim({
      orgId,
      providerId: (provider.data as { id: string }).id,
      payerId: (payer.data as { id: string }).id,
      procedureCode: '99213',
      amountMinor: '18500',
      currency: 'USD',
    });
  }

  const agent = await client.agents.create({
    ownerId: ADMIN_DEMO_OWNER_ID,
    ownerKind: 'USER',
    orgId,
    name: 'Invoice Automation Agent',
  });
  if (agent.ok && (agent.data as { id?: string }).id) {
    await client.agents.publishService((agent.data as { id: string }).id, {
      name: 'Invoice OCR + Payment',
      description: 'Extract invoice fields and initiate payment intents',
      priceMinor: '2500',
      currency: 'USD',
      tags: ['finance', 'ocr', 'payments'],
    });
  } else if (!agent.ok) {
    errors.push(`agents: ${agent.error} (wallet service must be running)`);
  }

  const farmer = await client.agri.registerFarmer(orgId, 'farmer_demo_001');
  if (farmer.ok && (farmer.data as { id?: string }).id) {
    const farmerId = (farmer.data as { id: string }).id;
    const farm = await client.agri.registerFarm({ orgId, farmerId, crop: 'Maize', season: '2026-A' });
    if (farm.ok && (farm.data as { id?: string }).id) {
      await client.agri.registerLot({ orgId, farmId: (farm.data as { id: string }).id, lotCode: 'LOT-2026-001', origin: 'Kano' });
    }
    await client.agri.inputLoan({ orgId, farmerId, amountMinor: '500000', currency: 'NGN' });
  }

  const shipment = await client.scm.createShipment({ orgId, origin: 'Lagos Port', destination: 'Abuja DC' });
  if (shipment.ok && (shipment.data as { id?: string }).id) {
    await client.scm.createSettlement({
      orgId,
      shipmentId: (shipment.data as { id: string }).id,
      amountMinor: '2500000',
      currency: 'USD',
    });
  }

  const aircraft = await client.aviation.registerAircraft({
    orgId,
    tail: 'N123SA',
    model: 'B737-800',
    ownerRef: 'owner_demo_airline',
  });
  if (aircraft.ok && (aircraft.data as { id?: string }).id) {
    const part = await client.aviation.mintPart({
      orgId,
      serial: 'PN-88421',
      partType: 'APU',
      aircraftId: (aircraft.data as { id: string }).id,
    });
    if (part.ok && (part.data as { id?: string }).id) {
      await client.aviation.createSettlement({
        orgId,
        partId: (part.data as { id: string }).id,
        buyerRef: 'buyer_mro',
        sellerRef: 'seller_oem',
        amountMinor: '45000000',
        currency: 'USD',
      });
    }
  }

  const institution = await client.edu.registerInstitution(orgId, 'Saly Academy');
  if (institution.ok && (institution.data as { id?: string }).id) {
    await client.edu.issueCredential({
      orgId,
      institutionId: (institution.data as { id: string }).id,
      learnerRef: 'learner_demo_001',
      type: 'CERTIFICATE',
      payload: { program: 'Blockchain Engineering' },
    });
    await client.edu.tuitionInvoice({
      orgId,
      learnerRef: 'learner_demo_001',
      amountMinor: '1200000',
      currency: 'USD',
      dueAt: new Date(Date.now() + 30 * 86_400_000).toISOString(),
    });
    await client.edu.scholarship({
      orgId,
      learnerRef: 'learner_demo_001',
      amountMinor: '300000',
      currency: 'USD',
      milestone: 'semester_1_complete',
    });
  }

  if (errors.length > 0) {
    return actionErr(`Partial seed — ${errors.join('; ')}`);
  }
  return actionOk('Demo data seeded for all Milestone E vertical modules.');
}
