export type VerticalHttpError = { ok: false; error: string };
export type VerticalHttpSuccess<T> = { ok: true; data: T };
export type VerticalHttpResult<T> = VerticalHttpSuccess<T> | VerticalHttpError;

export type VerticalServiceUrls = {
  financeUrl: string;
  govUrl: string;
  healthUrl: string;
  agentsUrl: string;
  agriUrl: string;
  scmUrl: string;
  aviationUrl: string;
  eduUrl: string;
};

async function parseError(res: Response, fallback: string): Promise<string> {
  const text = await res.text().catch(() => '');
  if (!text) return fallback;
  try {
    const json = JSON.parse(text) as {
      message?: string | string[];
      error?: { message?: string; code?: string };
    };
    if (typeof json.error?.message === 'string') return json.error.message;
    if (Array.isArray(json.message)) return json.message.join(', ');
    if (typeof json.message === 'string') return json.message;
    return text;
  } catch {
    return text;
  }
}

export function createVerticalHttpClient(urls: VerticalServiceUrls) {
  async function post<T>(url: string, body: Record<string, unknown>): Promise<VerticalHttpResult<T>> {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(8_000),
      });
      if (!res.ok) return { ok: false, error: await parseError(res, `HTTP ${res.status}`) };
      const text = await res.text();
      const data = (text ? JSON.parse(text) : {}) as T;
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Service unavailable' };
    }
  }

  async function get<T>(url: string): Promise<VerticalHttpResult<T>> {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8_000) });
      if (!res.ok) return { ok: false, error: await parseError(res, `HTTP ${res.status}`) };
      return { ok: true, data: (await res.json()) as T };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Service unavailable' };
    }
  }

  return {
    get,
    post,
    urls,
    finance: {
      listInstruments: (orgId: string, limit = 50) =>
        get<{ data: unknown[] }>(
          `${urls.financeUrl}/v1/finance/instruments?org_id=${encodeURIComponent(orgId)}&limit=${limit}`,
        ),
      createInstrument: (input: {
        orgId: string;
        type: 'BOND' | 'FUND' | 'RWA';
        name: string;
        issuerRef: string;
        currency: string;
      }) =>
        post(`${urls.financeUrl}/v1/finance/instruments`, {
          org_id: input.orgId,
          type: input.type,
          name: input.name,
          issuer_ref: input.issuerRef,
          currency: input.currency,
        }),
      upsertHolding: (input: {
        orgId: string;
        accountRef: string;
        instrumentId: string;
        unitsMinor: string;
      }) =>
        post(`${urls.financeUrl}/v1/finance/holdings`, {
          org_id: input.orgId,
          account_ref: input.accountRef,
          instrument_id: input.instrumentId,
          units_minor: input.unitsMinor,
        }),
      originateLoan: (input: {
        orgId: string;
        borrowerRef: string;
        principalMinor: string;
        rateBps: number;
        currency: string;
      }) =>
        post(`${urls.financeUrl}/v1/finance/loans`, {
          org_id: input.orgId,
          borrower_ref: input.borrowerRef,
          principal_minor: input.principalMinor,
          rate_bps: input.rateBps,
          currency: input.currency,
        }),
    },
    gov: {
      listPrograms: (orgId: string, limit = 50) =>
        get<{ data: unknown[] }>(
          `${urls.govUrl}/v1/gov/programs?org_id=${encodeURIComponent(orgId)}&limit=${limit}`,
        ),
      createProgram: (input: { orgId: string; name: string; budgetMinor: string; currency: string }) =>
        post(`${urls.govUrl}/v1/gov/programs`, {
          org_id: input.orgId,
          name: input.name,
          budget_minor: input.budgetMinor,
          currency: input.currency,
        }),
      registerBeneficiary: (input: { orgId: string; programId: string; externalRef: string }) =>
        post(`${urls.govUrl}/v1/gov/beneficiaries`, {
          org_id: input.orgId,
          program_id: input.programId,
          external_ref: input.externalRef,
        }),
      batchDisbursements: (input: {
        orgId: string;
        programId: string;
        batchIntentId: string;
        items: Array<{ beneficiaryId: string; amountMinor: string; currency: string }>;
      }) =>
        post(`${urls.govUrl}/v1/gov/disbursements/batch`, {
          org_id: input.orgId,
          program_id: input.programId,
          batch_intent_id: input.batchIntentId,
          items: input.items.map((i) => ({
            beneficiary_id: i.beneficiaryId,
            amount_minor: i.amountMinor,
            currency: i.currency,
          })),
        }),
    },
    health: {
      registerProvider: (orgId: string, name: string) =>
        post(`${urls.healthUrl}/v1/health/providers`, { org_id: orgId, name }),
      registerPayer: (orgId: string, name: string) =>
        post(`${urls.healthUrl}/v1/health/payers`, { org_id: orgId, name }),
      grantConsent: (input: { orgId: string; patientRef: string; scope: string }) =>
        post(`${urls.healthUrl}/v1/health/consent`, {
          org_id: input.orgId,
          patient_ref: input.patientRef,
          scope: input.scope,
        }),
      submitClaim: (input: {
        orgId: string;
        providerId: string;
        payerId: string;
        procedureCode: string;
        amountMinor: string;
        currency: string;
      }) =>
        post(`${urls.healthUrl}/v1/health/claims`, {
          org_id: input.orgId,
          provider_id: input.providerId,
          payer_id: input.payerId,
          procedure_code: input.procedureCode,
          amount_minor: input.amountMinor,
          currency: input.currency,
        }),
      adjudicateClaim: (orgId: string, claimId: string, approved: boolean) =>
        post(`${urls.healthUrl}/v1/health/claims/${encodeURIComponent(claimId)}/adjudicate`, {
          org_id: orgId,
          approved,
        }),
    },
    agents: {
      create: (input: {
        ownerId: string;
        ownerKind: 'USER' | 'BUSINESS';
        orgId?: string;
        name: string;
      }) =>
        post(`${urls.agentsUrl}/v1/agents`, {
          owner_id: input.ownerId,
          owner_kind: input.ownerKind,
          org_id: input.orgId,
          name: input.name,
        }),
      publishService: (
        agentId: string,
        input: {
          name: string;
          description?: string;
          priceMinor: string;
          currency: string;
          tags?: string[];
        },
      ) =>
        post(`${urls.agentsUrl}/v1/agents/${encodeURIComponent(agentId)}/services`, {
          name: input.name,
          description: input.description,
          price_minor: input.priceMinor,
          currency: input.currency,
          tags: input.tags,
          list_on_marketplace: true,
        }),
    },
    agri: {
      registerFarmer: (orgId: string, externalRef: string) =>
        post(`${urls.agriUrl}/v1/agri/farmers`, { org_id: orgId, external_ref: externalRef }),
      registerFarm: (input: { orgId: string; farmerId: string; crop?: string; season?: string }) =>
        post(`${urls.agriUrl}/v1/agri/farms`, {
          org_id: input.orgId,
          farmer_id: input.farmerId,
          crop: input.crop,
          season: input.season,
        }),
      registerLot: (input: { orgId: string; farmId: string; lotCode: string; origin?: string }) =>
        post(`${urls.agriUrl}/v1/agri/lots`, {
          org_id: input.orgId,
          farm_id: input.farmId,
          lot_code: input.lotCode,
          origin: input.origin,
        }),
      inputLoan: (input: { orgId: string; farmerId: string; amountMinor: string; currency: string }) =>
        post(`${urls.agriUrl}/v1/agri/loans`, {
          org_id: input.orgId,
          farmer_id: input.farmerId,
          amount_minor: input.amountMinor,
          currency: input.currency,
        }),
    },
    scm: {
      createShipment: (input: { orgId: string; origin: string; destination: string; productId?: string }) =>
        post(`${urls.scmUrl}/v1/scm/shipments`, {
          org_id: input.orgId,
          origin: input.origin,
          destination: input.destination,
          product_id: input.productId,
        }),
      createSettlement: (input: { orgId: string; shipmentId: string; amountMinor: string; currency: string }) =>
        post(`${urls.scmUrl}/v1/scm/settlements`, {
          org_id: input.orgId,
          shipment_id: input.shipmentId,
          amount_minor: input.amountMinor,
          currency: input.currency,
        }),
    },
    aviation: {
      registerAircraft: (input: { orgId: string; tail: string; model: string; ownerRef: string }) =>
        post(`${urls.aviationUrl}/v1/aviation/aircraft`, {
          org_id: input.orgId,
          tail: input.tail,
          model: input.model,
          owner_ref: input.ownerRef,
        }),
      mintPart: (input: { orgId: string; serial: string; partType: string; aircraftId?: string }) =>
        post(`${urls.aviationUrl}/v1/aviation/parts`, {
          org_id: input.orgId,
          serial: input.serial,
          part_type: input.partType,
          aircraft_id: input.aircraftId,
        }),
      createSettlement: (input: {
        orgId: string;
        partId: string;
        buyerRef: string;
        sellerRef: string;
        amountMinor: string;
        currency: string;
      }) =>
        post(`${urls.aviationUrl}/v1/aviation/settlements`, {
          org_id: input.orgId,
          part_id: input.partId,
          buyer_ref: input.buyerRef,
          seller_ref: input.sellerRef,
          amount_minor: input.amountMinor,
          currency: input.currency,
        }),
    },
    edu: {
      registerInstitution: (orgId: string, name: string) =>
        post(`${urls.eduUrl}/v1/edu/institutions`, { org_id: orgId, name }),
      issueCredential: (input: {
        orgId: string;
        institutionId: string;
        learnerRef: string;
        type: 'DEGREE' | 'CERTIFICATE' | 'BADGE';
        payload: Record<string, unknown>;
      }) =>
        post(`${urls.eduUrl}/v1/edu/credentials/issue`, {
          org_id: input.orgId,
          institution_id: input.institutionId,
          learner_ref: input.learnerRef,
          type: input.type,
          payload: input.payload,
        }),
      tuitionInvoice: (input: {
        orgId: string;
        learnerRef: string;
        amountMinor: string;
        currency: string;
        dueAt: string;
      }) =>
        post(`${urls.eduUrl}/v1/edu/tuition/invoice`, {
          org_id: input.orgId,
          learner_ref: input.learnerRef,
          amount_minor: input.amountMinor,
          currency: input.currency,
          due_at: input.dueAt,
        }),
      scholarship: (input: {
        orgId: string;
        learnerRef: string;
        amountMinor: string;
        currency: string;
        milestone: string;
      }) =>
        post(`${urls.eduUrl}/v1/edu/scholarships`, {
          org_id: input.orgId,
          learner_ref: input.learnerRef,
          amount_minor: input.amountMinor,
          currency: input.currency,
          milestone: input.milestone,
        }),
      disburseScholarship: (orgId: string, grantId: string) =>
        post(`${urls.eduUrl}/v1/edu/scholarships/${encodeURIComponent(grantId)}/disburse`, { org_id: orgId }),
    },
  };
}

export type VerticalHttpClient = ReturnType<typeof createVerticalHttpClient>;
