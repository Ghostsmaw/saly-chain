'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  mutateAdjudicateHealthClaim,
  mutateAgriInputLoan,
  mutateCreateAgent,
  mutateCreateAviationSettlement,
  mutateCreateEduScholarship,
  mutateCreateEduTuitionInvoice,
  mutateCreateFinanceInstrument,
  mutateCreateGovProgram,
  mutateCreateScmSettlement,
  mutateCreateScmShipment,
  mutateDisburseEduScholarship,
  mutateGrantHealthConsent,
  mutateIssueEduCredential,
  mutateMintAviationPart,
  mutateOriginateFinanceLoan,
  mutatePublishAgentService,
  mutateRegisterAgriFarm,
  mutateRegisterAgriFarmer,
  mutateRegisterAgriLot,
  mutateRegisterAviationAircraft,
  mutateRegisterEduInstitution,
  mutateRegisterGovBeneficiary,
  mutateRegisterHealthPayer,
  mutateRegisterHealthProvider,
  mutateSubmitHealthClaim,
  mutateUpsertFinanceHolding,
  seedVerticalsDemo,
} from '@/lib/verticals';
import { requireSession } from '@/lib/auth';

function redirectVertical(path: string, result: { ok: boolean; message?: string; error?: string }) {
  revalidatePath(path);
  revalidatePath('/verticals');
  if (result.ok) {
    redirect(`${path}?ok=${encodeURIComponent(result.message ?? 'Saved.')}`);
  }
  redirect(`${path}?error=${encodeURIComponent(result.error ?? 'Request failed')}`);
}

export async function seedVerticalsDemoAction(): Promise<void> {
  await requireSession();
  const result = await seedVerticalsDemo();
  redirectVertical('/verticals', result);
}

export async function createFinanceInstrumentAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateCreateFinanceInstrument({
    type: String(formData.get('type') ?? 'BOND') as 'BOND' | 'FUND' | 'RWA',
    name: String(formData.get('name') ?? '').trim(),
    issuerRef: String(formData.get('issuer_ref') ?? '').trim(),
    currency: String(formData.get('currency') ?? 'USD').trim().toUpperCase(),
  });
  redirectVertical('/verticals/finance', result);
}

export async function upsertFinanceHoldingAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateUpsertFinanceHolding({
    accountRef: String(formData.get('account_ref') ?? '').trim(),
    instrumentId: String(formData.get('instrument_id') ?? '').trim(),
    unitsMinor: String(formData.get('units_minor') ?? '').trim(),
  });
  redirectVertical('/verticals/finance', result);
}

export async function originateFinanceLoanAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateOriginateFinanceLoan({
    borrowerRef: String(formData.get('borrower_ref') ?? '').trim(),
    principalMinor: String(formData.get('principal_minor') ?? '').trim(),
    rateBps: Number(formData.get('rate_bps') ?? 0),
    currency: String(formData.get('currency') ?? 'USD').trim().toUpperCase(),
  });
  redirectVertical('/verticals/finance', result);
}

export async function createGovProgramAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateCreateGovProgram({
    name: String(formData.get('name') ?? '').trim(),
    budgetMinor: String(formData.get('budget_minor') ?? '').trim(),
    currency: String(formData.get('currency') ?? 'USD').trim().toUpperCase(),
  });
  redirectVertical('/verticals/gov', result);
}

export async function registerGovBeneficiaryAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateRegisterGovBeneficiary({
    programId: String(formData.get('program_id') ?? '').trim(),
    externalRef: String(formData.get('external_ref') ?? '').trim(),
  });
  redirectVertical('/verticals/gov', result);
}

export async function registerHealthProviderAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateRegisterHealthProvider({
    name: String(formData.get('name') ?? '').trim(),
  });
  redirectVertical('/verticals/health', result);
}

export async function registerHealthPayerAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateRegisterHealthPayer({
    name: String(formData.get('name') ?? '').trim(),
  });
  redirectVertical('/verticals/health', result);
}

export async function grantHealthConsentAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateGrantHealthConsent({
    patientRef: String(formData.get('patient_ref') ?? '').trim(),
    scope: String(formData.get('scope') ?? '').trim(),
  });
  redirectVertical('/verticals/health', result);
}

export async function submitHealthClaimAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateSubmitHealthClaim({
    providerId: String(formData.get('provider_id') ?? '').trim(),
    payerId: String(formData.get('payer_id') ?? '').trim(),
    procedureCode: String(formData.get('procedure_code') ?? '').trim(),
    amountMinor: String(formData.get('amount_minor') ?? '').trim(),
    currency: String(formData.get('currency') ?? 'USD').trim().toUpperCase(),
  });
  redirectVertical('/verticals/health', result);
}

export async function adjudicateHealthClaimAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateAdjudicateHealthClaim({
    claimId: String(formData.get('claim_id') ?? '').trim(),
    approved: String(formData.get('approved') ?? 'true') === 'true',
  });
  redirectVertical('/verticals/health', result);
}

export async function createAgentAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateCreateAgent({
    name: String(formData.get('name') ?? '').trim(),
    ownerId: String(formData.get('owner_id') ?? '').trim() || undefined,
  });
  redirectVertical('/verticals/agents', result);
}

export async function publishAgentServiceAction(formData: FormData): Promise<void> {
  await requireSession();
  const tagsRaw = String(formData.get('tags') ?? '').trim();
  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : undefined;
  const result = await mutatePublishAgentService({
    agentId: String(formData.get('agent_id') ?? '').trim(),
    name: String(formData.get('name') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim() || undefined,
    priceMinor: String(formData.get('price_minor') ?? '').trim(),
    currency: String(formData.get('currency') ?? 'USD').trim().toUpperCase(),
    tags,
  });
  redirectVertical('/verticals/agents', result);
}

export async function registerAgriFarmerAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateRegisterAgriFarmer({
    externalRef: String(formData.get('external_ref') ?? '').trim(),
  });
  redirectVertical('/verticals/agri', result);
}

export async function registerAgriFarmAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateRegisterAgriFarm({
    farmerId: String(formData.get('farmer_id') ?? '').trim(),
    crop: String(formData.get('crop') ?? '').trim() || undefined,
    season: String(formData.get('season') ?? '').trim() || undefined,
  });
  redirectVertical('/verticals/agri', result);
}

export async function registerAgriLotAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateRegisterAgriLot({
    farmId: String(formData.get('farm_id') ?? '').trim(),
    lotCode: String(formData.get('lot_code') ?? '').trim(),
    origin: String(formData.get('origin') ?? '').trim() || undefined,
  });
  redirectVertical('/verticals/agri', result);
}

export async function agriInputLoanAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateAgriInputLoan({
    farmerId: String(formData.get('farmer_id') ?? '').trim(),
    amountMinor: String(formData.get('amount_minor') ?? '').trim(),
    currency: String(formData.get('currency') ?? 'USD').trim().toUpperCase(),
  });
  redirectVertical('/verticals/agri', result);
}

export async function createScmShipmentAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateCreateScmShipment({
    origin: String(formData.get('origin') ?? '').trim(),
    destination: String(formData.get('destination') ?? '').trim(),
  });
  redirectVertical('/verticals/scm', result);
}

export async function createScmSettlementAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateCreateScmSettlement({
    shipmentId: String(formData.get('shipment_id') ?? '').trim(),
    amountMinor: String(formData.get('amount_minor') ?? '').trim(),
    currency: String(formData.get('currency') ?? 'USD').trim().toUpperCase(),
  });
  redirectVertical('/verticals/scm', result);
}

export async function registerAviationAircraftAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateRegisterAviationAircraft({
    tail: String(formData.get('tail') ?? '').trim(),
    model: String(formData.get('model') ?? '').trim(),
    ownerRef: String(formData.get('owner_ref') ?? '').trim(),
  });
  redirectVertical('/verticals/aviation', result);
}

export async function mintAviationPartAction(formData: FormData): Promise<void> {
  await requireSession();
  const aircraftId = String(formData.get('aircraft_id') ?? '').trim();
  const result = await mutateMintAviationPart({
    serial: String(formData.get('serial') ?? '').trim(),
    partType: String(formData.get('part_type') ?? '').trim(),
    aircraftId: aircraftId || undefined,
  });
  redirectVertical('/verticals/aviation', result);
}

export async function createAviationSettlementAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateCreateAviationSettlement({
    partId: String(formData.get('part_id') ?? '').trim(),
    buyerRef: String(formData.get('buyer_ref') ?? '').trim(),
    sellerRef: String(formData.get('seller_ref') ?? '').trim(),
    amountMinor: String(formData.get('amount_minor') ?? '').trim(),
    currency: String(formData.get('currency') ?? 'USD').trim().toUpperCase(),
  });
  redirectVertical('/verticals/aviation', result);
}

export async function registerEduInstitutionAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateRegisterEduInstitution({
    name: String(formData.get('name') ?? '').trim(),
  });
  redirectVertical('/verticals/edu', result);
}

export async function issueEduCredentialAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateIssueEduCredential({
    institutionId: String(formData.get('institution_id') ?? '').trim(),
    learnerRef: String(formData.get('learner_ref') ?? '').trim(),
    type: String(formData.get('type') ?? 'CERTIFICATE') as 'DEGREE' | 'CERTIFICATE' | 'BADGE',
    program: String(formData.get('program') ?? '').trim(),
  });
  redirectVertical('/verticals/edu', result);
}

export async function createEduTuitionInvoiceAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateCreateEduTuitionInvoice({
    learnerRef: String(formData.get('learner_ref') ?? '').trim(),
    amountMinor: String(formData.get('amount_minor') ?? '').trim(),
    currency: String(formData.get('currency') ?? 'USD').trim().toUpperCase(),
    dueAt: String(formData.get('due_at') ?? '').trim(),
  });
  redirectVertical('/verticals/edu', result);
}

export async function createEduScholarshipAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateCreateEduScholarship({
    learnerRef: String(formData.get('learner_ref') ?? '').trim(),
    amountMinor: String(formData.get('amount_minor') ?? '').trim(),
    currency: String(formData.get('currency') ?? 'USD').trim().toUpperCase(),
    milestone: String(formData.get('milestone') ?? '').trim(),
  });
  redirectVertical('/verticals/edu', result);
}

export async function disburseEduScholarshipAction(formData: FormData): Promise<void> {
  await requireSession();
  const result = await mutateDisburseEduScholarship({
    grantId: String(formData.get('grant_id') ?? '').trim(),
  });
  redirectVertical('/verticals/edu', result);
}
