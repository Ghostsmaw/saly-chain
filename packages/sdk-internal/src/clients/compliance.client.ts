import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export type ScreeningDecision = 'ALLOW' | 'REVIEW' | 'BLOCK';

export interface ScreenSubjectRequest {
  intentId?: string;
  transactionId?: string;
  subjectRef: string;
  subjectKind: 'USER' | 'BUSINESS' | 'COUNTERPARTY' | 'AGENT';
  displayName?: string;
  countryCode?: string;
  chainAddress?: { chain: string; address: string };
}

export interface ScreeningResultDto {
  category: string;
  decision: ScreeningDecision;
  score: number;
  matched_list_ids: string[];
}

export interface ScreenSubjectResponse {
  decision: ScreeningDecision;
  max_score: number;
  run_id: string;
  results: ScreeningResultDto[];
  case_id?: string;
}

export class ComplianceClient {
  private readonly http: HttpClient;
  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'compliance', logger: opts.logger });
  }

  screen(input: ScreenSubjectRequest, options?: RequestOptions): Promise<ScreenSubjectResponse> {
    return this.http.post(
      '/v1/screening/screen',
      {
        intent_id: input.intentId,
        transaction_id: input.transactionId,
        subject_ref: input.subjectRef,
        subject_kind: input.subjectKind,
        display_name: input.displayName,
        country_code: input.countryCode,
        chain_address: input.chainAddress,
      },
      options,
    );
  }

  getTier(externalRef: string, options?: RequestOptions): Promise<{ tier: string; updated_at: string | null }> {
    return this.http.get(`/v1/kyc/tier/${encodeURIComponent(externalRef)}`, options);
  }

  startOnboarding(
    input: { externalRef: string; profile: 'business' | 'developer'; displayName?: string; email?: string },
    options?: RequestOptions,
  ): Promise<OnboardingStatusDto> {
    return this.http.post(
      '/v1/onboarding/start',
      {
        external_ref: input.externalRef,
        profile: input.profile,
        display_name: input.displayName,
        email: input.email,
      },
      options,
    );
  }

  getOnboarding(externalRef: string, options?: RequestOptions): Promise<OnboardingStatusDto> {
    return this.http.get(`/v1/onboarding/${encodeURIComponent(externalRef)}`, options);
  }

  submitOnboardingStep(
    externalRef: string,
    input: { step: string; data: Record<string, unknown> },
    options?: RequestOptions,
  ): Promise<OnboardingStatusDto> {
    return this.http.patch(`/v1/onboarding/${encodeURIComponent(externalRef)}`, input, options);
  }

  resubmitOnboarding(externalRef: string, options?: RequestOptions): Promise<OnboardingStatusDto> {
    return this.http.post(`/v1/onboarding/${encodeURIComponent(externalRef)}/resubmit`, {}, options);
  }

  getProviderStatus(options?: RequestOptions): Promise<ComplianceProviderStatus> {
    return this.http.get('/v1/screening/provider', options);
  }

  listCases(opts?: { status?: string; limit?: number }, options?: RequestOptions): Promise<{ data: ComplianceCaseDto[] }> {
    const params = new URLSearchParams();
    if (opts?.status) params.set('status', opts.status);
    if (opts?.limit) params.set('limit', String(opts.limit));
    const q = params.toString();
    return this.http.get(`/v1/cases${q ? `?${q}` : ''}`, options);
  }

  getCase(id: string, options?: RequestOptions): Promise<ComplianceCaseDto> {
    return this.http.get(`/v1/cases/${encodeURIComponent(id)}`, options);
  }

  updateCase(
    id: string,
    patch: { status?: string; priority?: string; assigned_to?: string },
    options?: RequestOptions,
  ): Promise<ComplianceCaseDto> {
    return this.http.patch(`/v1/cases/${encodeURIComponent(id)}`, patch, options);
  }
}

export interface ComplianceProviderStatus {
  active: string;
  configured: string[];
  vendors: Array<{ name: string; enabled: boolean; role: string }>;
}

export interface OnboardingStepDto {
  key: string;
  label: string;
  status: 'pending' | 'done';
  data: Record<string, unknown> | null;
}

export interface OnboardingRequirementDto {
  id: string;
  label: string;
  category: 'kyb' | 'kyc';
  input_type: 'document' | 'information';
  field_key: string;
  step_key: string;
  value_format: string | null;
  placeholder: string | null;
  accept: string | null;
  sort_order: number;
}

export interface OnboardingStatusDto {
  external_ref: string;
  required: boolean;
  profile: 'business' | 'developer' | null;
  flow?: string;
  status: string;
  tier?: string;
  display_name?: string | null;
  steps: OnboardingStepDto[];
  requirements?: OnboardingRequirementDto[];
  current_step: string | null;
  complete: boolean;
  submitted_at?: string | null;
  approved_at?: string | null;
  rejected_at?: string | null;
  ocr?: Record<string, unknown> | null;
}

export interface ComplianceCaseDto {
  id: string;
  status: string;
  priority: string;
  summary: string;
  intent_id?: string;
  transaction_id?: string;
  assigned_to?: string;
  subject?: {
    id: string;
    external_ref: string;
    kind: string;
    display_name?: string;
    country_code?: string;
    tier: string;
  } | null;
  notes?: unknown;
  created_at: string;
  updated_at: string;
  resolved_at?: string | null;
}
