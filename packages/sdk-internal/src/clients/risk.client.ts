import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export type RiskDecision = 'ALLOW' | 'REVIEW' | 'BLOCK';

export interface AssessRiskRequest {
  intentId?: string;
  transactionId?: string;
  actorExternalRef: string;
  counterpartyRef?: string;
  amountUsdMinor: string;
}

export interface AssessRiskResponse {
  assessment_id: string;
  decision: RiskDecision;
  score: number;
  components: Record<string, number>;
  reasons: string[];
}

export interface RiskAssessmentListItem {
  id: string;
  intent_id?: string | null;
  transaction_id?: string | null;
  actor_external_ref: string;
  counterparty_ref?: string | null;
  amount_usd_minor: string;
  components: Record<string, number>;
  final_score: number;
  decision: RiskDecision;
  reasons: string[];
  created_at: string;
}

export interface RiskSummary {
  thresholds: { review: number; block: number };
  last_24h: { total: number; ALLOW: number; REVIEW: number; BLOCK: number };
  pending_review_24h: number;
  actor_profiles: number;
}

export interface RiskActorProfile {
  external_ref: string;
  rolling_24h_usd_minor: string;
  rolling_24h_count: number;
  lifetime_count: number;
  mean_ticket_usd_minor: string;
  last_seen_at: string | null;
}

export class RiskClient {
  private readonly http: HttpClient;
  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'risk', logger: opts.logger });
  }

  assess(input: AssessRiskRequest, options?: RequestOptions): Promise<AssessRiskResponse> {
    return this.http.post(
      '/v1/risk/assess',
      {
        intent_id: input.intentId,
        transaction_id: input.transactionId,
        actor_external_ref: input.actorExternalRef,
        counterparty_ref: input.counterpartyRef,
        amount_usd_minor: Number(input.amountUsdMinor),
      },
      options,
    );
  }

  commit(input: AssessRiskRequest, options?: RequestOptions): Promise<{ ok: true }> {
    return this.http.post(
      '/v1/risk/commit',
      {
        intent_id: input.intentId,
        transaction_id: input.transactionId,
        actor_external_ref: input.actorExternalRef,
        counterparty_ref: input.counterpartyRef,
        amount_usd_minor: Number(input.amountUsdMinor),
      },
      options,
    );
  }

  listAssessments(
    input?: { limit?: number; decision?: RiskDecision },
    options?: RequestOptions,
  ): Promise<{ data: RiskAssessmentListItem[] }> {
    return this.http.get('/v1/risk/assessments', {
      ...options,
      query: { limit: input?.limit, decision: input?.decision },
    });
  }

  getSummary(options?: RequestOptions): Promise<RiskSummary> {
    return this.http.get('/v1/risk/summary', options);
  }

  listActors(input?: { limit?: number }, options?: RequestOptions): Promise<{ data: RiskActorProfile[] }> {
    return this.http.get('/v1/risk/actors', { ...options, query: { limit: input?.limit } });
  }
}
