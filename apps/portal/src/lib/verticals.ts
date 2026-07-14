/**
 * Milestone E vertical modules — org-scoped fetch helpers for the developer portal.
 */

import { createVerticalHttpClient } from '@salychain/vertical-core';
import { resolveOrgId } from '@/lib/api';

const FINANCE_URL = process.env.FINANCE_BASE_URL ?? 'http://localhost:4023';
const GOV_URL = process.env.GOV_BASE_URL ?? 'http://localhost:4024';
const AGRI_URL = process.env.AGRI_BASE_URL ?? 'http://localhost:4025';
const SCM_URL = process.env.SCM_BASE_URL ?? 'http://localhost:4026';
const AVIATION_URL = process.env.AVIATION_BASE_URL ?? 'http://localhost:4027';
const HEALTH_URL = process.env.HEALTH_BASE_URL ?? 'http://localhost:4028';
const EDU_URL = process.env.EDU_BASE_URL ?? 'http://localhost:4029';
const AGENTS_URL = process.env.AGENTS_BASE_URL ?? 'http://localhost:4011';

export type VerticalFetchResult<T> = { data: T; source: 'live' | 'unavailable' };

export type VerticalActionResult =
  | { ok: true; message: string; id?: string }
  | { ok: false; error: string };

export const PORTAL_DEMO_OWNER_ID =
  process.env.PORTAL_DEMO_OWNER_ID ?? process.env.VERTICAL_DEMO_OWNER_ID ?? 'usr_demo_acme';

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
  accountRef: string;
  instrumentId: string;
  unitsMinor: string;
  instrument?: FinanceInstrument | null;
};

export type FinanceLoan = {
  id: string;
  borrowerRef: string;
  principalMinor: string;
  rateBps: number;
  currency: string;
  status: string;
  createdAt: string;
};

export type GovProgram = {
  id: string;
  name: string;
  budgetMinor: string;
  currency: string;
  disbursementCount: number;
  createdAt: string;
};

export type GovDisbursement = {
  id: string;
  programName: string;
  beneficiaryId: string;
  amountMinor: string;
  currency: string;
  status: string;
  createdAt: string;
};

export type HealthConsent = {
  id: string;
  patientId: string;
  scope: string;
  status: string;
  expiresAt: string | null;
  createdAt: string;
};

export type HealthClaim = {
  id: string;
  providerId: string;
  payerId: string;
  procedureCode: string;
  amountMinor: string;
  currency: string;
  status: string;
  createdAt: string;
};

export type HealthProvider = { id: string; name: string };
export type HealthPayer = { id: string; name: string };

export type AgentMarketplaceListing = {
  id: string;
  service: {
    id: string;
    name: string;
    description: string | null;
    priceMinor: string;
    currency: string;
    agent: { id: string; name: string; status: string };
  };
  tags: unknown;
};

export type AgentSummary = {
  id: string;
  name: string;
  status: string;
  created_at: string;
};

function orgId() {
  return resolveOrgId();
}

export async function fetchFinanceInstruments(limit = 50) {
  return verticalFetch<FinanceInstrument[]>(
    `${FINANCE_URL}/v1/finance/instruments?org_id=${encodeURIComponent(orgId())}&limit=${limit}`,
  );
}

export async function fetchFinanceHoldings() {
  return verticalFetch<FinanceHolding[]>(
    `${FINANCE_URL}/v1/finance/holdings?org_id=${encodeURIComponent(orgId())}`,
  );
}

export async function fetchFinanceLoans(limit = 50) {
  return verticalFetch<FinanceLoan[]>(
    `${FINANCE_URL}/v1/finance/loans?org_id=${encodeURIComponent(orgId())}&limit=${limit}`,
  );
}

export async function fetchGovPrograms(limit = 50) {
  return verticalFetch<GovProgram[]>(
    `${GOV_URL}/v1/gov/programs?org_id=${encodeURIComponent(orgId())}&limit=${limit}`,
  );
}

export async function fetchGovDisbursements(limit = 50) {
  return verticalFetch<GovDisbursement[]>(
    `${GOV_URL}/v1/gov/disbursements?org_id=${encodeURIComponent(orgId())}&limit=${limit}`,
  );
}

export async function fetchHealthConsents(limit = 50) {
  return verticalFetch<HealthConsent[]>(
    `${HEALTH_URL}/v1/health/consents?org_id=${encodeURIComponent(orgId())}&limit=${limit}`,
  );
}

export async function fetchHealthClaims(limit = 50) {
  return verticalFetch<HealthClaim[]>(
    `${HEALTH_URL}/v1/health/claims?org_id=${encodeURIComponent(orgId())}&limit=${limit}`,
  );
}

export async function fetchHealthProviders(limit = 50) {
  return verticalFetch<HealthProvider[]>(
    `${HEALTH_URL}/v1/health/providers?org_id=${encodeURIComponent(orgId())}&limit=${limit}`,
  );
}

export async function fetchHealthPayers(limit = 50) {
  return verticalFetch<HealthPayer[]>(
    `${HEALTH_URL}/v1/health/payers?org_id=${encodeURIComponent(orgId())}&limit=${limit}`,
  );
}

export async function fetchAgentMarketplace(limit = 25) {
  return verticalFetch<AgentMarketplaceListing[]>(
    `${AGENTS_URL}/v1/agents/marketplace/discover?limit=${limit}`,
  );
}

export async function fetchOrgAgents(limit = 50) {
  return verticalFetch<AgentSummary[]>(
    `${AGENTS_URL}/v1/agents?org_id=${encodeURIComponent(orgId())}&limit=${limit}`,
  );
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
    });
  } catch {
    return iso.slice(0, 10);
  }
}

function oid() {
  return orgId();
}

function ok(message: string, id?: string): VerticalActionResult {
  return { ok: true, message, id };
}

function err(error: string): VerticalActionResult {
  return { ok: false, error };
}

export async function mutateCreateFinanceInstrument(input: {
  type: 'BOND' | 'FUND' | 'RWA';
  name: string;
  issuerRef: string;
  currency: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().finance.createInstrument({ orgId: oid(), ...input });
  return res.ok ? ok('Instrument registered.', (res.data as { id?: string }).id) : err(res.error);
}

export async function mutateUpsertFinanceHolding(input: {
  accountRef: string;
  instrumentId: string;
  unitsMinor: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().finance.upsertHolding({ orgId: oid(), ...input });
  return res.ok ? ok('Holding updated.') : err(res.error);
}

export async function mutateOriginateFinanceLoan(input: {
  borrowerRef: string;
  principalMinor: string;
  rateBps: number;
  currency: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().finance.originateLoan({ orgId: oid(), ...input });
  return res.ok ? ok('Loan originated.') : err(res.error);
}

export async function mutateCreateGovProgram(input: {
  name: string;
  budgetMinor: string;
  currency: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().gov.createProgram({ orgId: oid(), ...input });
  return res.ok ? ok('Program created.', (res.data as { id?: string }).id) : err(res.error);
}

export async function mutateRegisterHealthProvider(name: string): Promise<VerticalActionResult> {
  const res = await verticalHttp().health.registerProvider(oid(), name);
  return res.ok ? ok('Provider registered.', (res.data as { id?: string }).id) : err(res.error);
}

export async function mutateRegisterHealthPayer(name: string): Promise<VerticalActionResult> {
  const res = await verticalHttp().health.registerPayer(oid(), name);
  return res.ok ? ok('Payer registered.', (res.data as { id?: string }).id) : err(res.error);
}

export async function mutateGrantHealthConsent(input: {
  patientRef: string;
  scope: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().health.grantConsent({ orgId: oid(), ...input });
  return res.ok ? ok('Consent granted.') : err(res.error);
}

export async function mutateSubmitHealthClaim(input: {
  providerId: string;
  payerId: string;
  procedureCode: string;
  amountMinor: string;
  currency: string;
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().health.submitClaim({ orgId: oid(), ...input });
  return res.ok ? ok('Claim submitted.') : err(res.error);
}

export async function mutateAdjudicateHealthClaim(claimId: string, approved: boolean): Promise<VerticalActionResult> {
  const res = await verticalHttp().health.adjudicateClaim(oid(), claimId, approved);
  return res.ok ? ok(approved ? 'Claim approved.' : 'Claim rejected.') : err(res.error);
}

export async function mutateCreateAgent(name: string): Promise<VerticalActionResult> {
  const res = await verticalHttp().agents.create({
    ownerId: PORTAL_DEMO_OWNER_ID,
    ownerKind: 'USER',
    orgId: oid(),
    name,
  });
  return res.ok ? ok('Agent created.', (res.data as { id?: string }).id) : err(res.error);
}

export async function mutatePublishAgentService(input: {
  agentId: string;
  name: string;
  description?: string;
  priceMinor: string;
  currency: string;
  tags?: string[];
}): Promise<VerticalActionResult> {
  const res = await verticalHttp().agents.publishService(input.agentId, input);
  return res.ok ? ok('Service published to marketplace.') : err(res.error);
}

export type AgriFarmer = { id: string; externalRef: string; createdAt: string };
export type AgriFarm = { id: string; farmerId: string; farmerRef: string; crop: string | null; season: string | null };
export type AgriLot = { id: string; farmId: string; lotCode: string; origin: string | null; crop: string | null };
export type AgriInputLoan = { id: string; farmerId: string; amountMinor: string; currency: string; status: string };
export type ScmShipment = { id: string; origin: string; destination: string; status: string };
export type ScmSettlement = { id: string; shipmentId: string; amountMinor: string; currency: string; status: string };
export type AviationAircraft = { id: string; tail: string; model: string; ownerRef: string };
export type AviationPart = { id: string; serial: string; partType: string; aircraftId: string | null };
export type AviationSettlement = { id: string; partId: string; buyerRef: string; sellerRef: string; amountMinor: string; currency: string; status: string };
export type EduInstitution = { id: string; name: string };
export type EduCredential = { id: string; institutionName: string; type: string; status: string };
export type EduTuitionInvoice = { id: string; learnerId: string; amountMinor: string; currency: string; dueAt: string };
export type EduScholarship = { id: string; learnerId: string; amountMinor: string; currency: string; milestone: string; status: string };

export async function fetchAgriFarmers(limit = 50) {
  return verticalFetch<AgriFarmer[]>(`${AGRI_URL}/v1/agri/farmers?org_id=${encodeURIComponent(orgId())}&limit=${limit}`);
}
export async function fetchAgriFarms(limit = 50) {
  return verticalFetch<AgriFarm[]>(`${AGRI_URL}/v1/agri/farms?org_id=${encodeURIComponent(orgId())}&limit=${limit}`);
}
export async function fetchAgriLots(limit = 50) {
  return verticalFetch<AgriLot[]>(`${AGRI_URL}/v1/agri/lots?org_id=${encodeURIComponent(orgId())}&limit=${limit}`);
}
export async function fetchAgriLoans(limit = 50) {
  return verticalFetch<AgriInputLoan[]>(`${AGRI_URL}/v1/agri/loans?org_id=${encodeURIComponent(orgId())}&limit=${limit}`);
}
export async function fetchScmShipments(limit = 50) {
  return verticalFetch<ScmShipment[]>(`${SCM_URL}/v1/scm/shipments?org_id=${encodeURIComponent(orgId())}&limit=${limit}`);
}
export async function fetchScmSettlements(limit = 50) {
  return verticalFetch<ScmSettlement[]>(`${SCM_URL}/v1/scm/settlements?org_id=${encodeURIComponent(orgId())}&limit=${limit}`);
}
export async function fetchAviationAircraft(limit = 50) {
  return verticalFetch<AviationAircraft[]>(`${AVIATION_URL}/v1/aviation/aircraft?org_id=${encodeURIComponent(orgId())}&limit=${limit}`);
}
export async function fetchAviationParts(limit = 50) {
  return verticalFetch<AviationPart[]>(`${AVIATION_URL}/v1/aviation/parts?org_id=${encodeURIComponent(orgId())}&limit=${limit}`);
}
export async function fetchAviationSettlements(limit = 50) {
  return verticalFetch<AviationSettlement[]>(`${AVIATION_URL}/v1/aviation/settlements?org_id=${encodeURIComponent(orgId())}&limit=${limit}`);
}
export async function fetchEduInstitutions(limit = 50) {
  return verticalFetch<EduInstitution[]>(`${EDU_URL}/v1/edu/institutions?org_id=${encodeURIComponent(orgId())}&limit=${limit}`);
}
export async function fetchEduCredentials(limit = 50) {
  return verticalFetch<EduCredential[]>(`${EDU_URL}/v1/edu/credentials?org_id=${encodeURIComponent(orgId())}&limit=${limit}`);
}
export async function fetchEduTuitionInvoices(limit = 50) {
  return verticalFetch<EduTuitionInvoice[]>(`${EDU_URL}/v1/edu/tuition/invoices?org_id=${encodeURIComponent(orgId())}&limit=${limit}`);
}
export async function fetchEduScholarships(limit = 50) {
  return verticalFetch<EduScholarship[]>(`${EDU_URL}/v1/edu/scholarships?org_id=${encodeURIComponent(orgId())}&limit=${limit}`);
}

export async function mutateRegisterAgriFarmer(externalRef: string) {
  const res = await verticalHttp().agri.registerFarmer(oid(), externalRef);
  return res.ok ? ok('Farmer registered.') : err(res.error);
}
export async function mutateRegisterAgriFarm(input: { farmerId: string; crop?: string; season?: string }) {
  const res = await verticalHttp().agri.registerFarm({ orgId: oid(), ...input });
  return res.ok ? ok('Farm registered.') : err(res.error);
}
export async function mutateRegisterAgriLot(input: { farmId: string; lotCode: string; origin?: string }) {
  const res = await verticalHttp().agri.registerLot({ orgId: oid(), ...input });
  return res.ok ? ok('Produce lot registered.') : err(res.error);
}
export async function mutateAgriInputLoan(input: { farmerId: string; amountMinor: string; currency: string }) {
  const res = await verticalHttp().agri.inputLoan({ orgId: oid(), ...input });
  return res.ok ? ok('Input loan originated.') : err(res.error);
}
export async function mutateCreateScmShipment(input: { origin: string; destination: string }) {
  const res = await verticalHttp().scm.createShipment({ orgId: oid(), ...input });
  return res.ok ? ok('Shipment created.') : err(res.error);
}
export async function mutateCreateScmSettlement(input: { shipmentId: string; amountMinor: string; currency: string }) {
  const res = await verticalHttp().scm.createSettlement({ orgId: oid(), ...input });
  return res.ok ? ok('Settlement created.') : err(res.error);
}
export async function mutateRegisterAviationAircraft(input: { tail: string; model: string; ownerRef: string }) {
  const res = await verticalHttp().aviation.registerAircraft({ orgId: oid(), ...input });
  return res.ok ? ok('Aircraft registered.') : err(res.error);
}
export async function mutateMintAviationPart(input: { serial: string; partType: string; aircraftId?: string }) {
  const res = await verticalHttp().aviation.mintPart({ orgId: oid(), ...input });
  return res.ok ? ok('Part minted.') : err(res.error);
}
export async function mutateCreateAviationSettlement(input: {
  partId: string;
  buyerRef: string;
  sellerRef: string;
  amountMinor: string;
  currency: string;
}) {
  const res = await verticalHttp().aviation.createSettlement({ orgId: oid(), ...input });
  return res.ok ? ok('Aviation settlement created.') : err(res.error);
}
export async function mutateRegisterEduInstitution(name: string) {
  const res = await verticalHttp().edu.registerInstitution(oid(), name);
  return res.ok ? ok('Institution registered.') : err(res.error);
}
export async function mutateIssueEduCredential(input: {
  institutionId: string;
  learnerRef: string;
  type: 'DEGREE' | 'CERTIFICATE' | 'BADGE';
  program: string;
}) {
  const res = await verticalHttp().edu.issueCredential({
    orgId: oid(),
    institutionId: input.institutionId,
    learnerRef: input.learnerRef,
    type: input.type,
    payload: { program: input.program },
  });
  return res.ok ? ok('Credential issued.') : err(res.error);
}
export async function mutateCreateEduTuitionInvoice(input: {
  learnerRef: string;
  amountMinor: string;
  currency: string;
  dueAt: string;
}) {
  const res = await verticalHttp().edu.tuitionInvoice({ orgId: oid(), ...input });
  return res.ok ? ok('Tuition invoice created.') : err(res.error);
}
export async function mutateCreateEduScholarship(input: {
  learnerRef: string;
  amountMinor: string;
  currency: string;
  milestone: string;
}) {
  const res = await verticalHttp().edu.scholarship({ orgId: oid(), ...input });
  return res.ok ? ok('Scholarship grant created.') : err(res.error);
}
export async function mutateDisburseEduScholarship(grantId: string) {
  const res = await verticalHttp().edu.disburseScholarship(oid(), grantId);
  return res.ok ? ok('Scholarship disbursed.') : err(res.error);
}
