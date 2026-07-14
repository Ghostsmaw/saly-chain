import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export type Rail = 'INTERNAL' | 'BASE' | 'XRPL' | 'L3' | 'FIAT' | 'ESCROW';

export interface EscrowCondition {
  type: 'DELIVERY' | 'MILESTONE' | 'TIMELOCK' | 'CUSTOM';
  deadline_at?: string;
  description?: string;
}

export interface RoutingEndpoint {
  type: 'WALLET' | 'LEDGER_ACCOUNT' | 'EXTERNAL_ADDRESS' | 'BANK_ACCOUNT';
  chain?: string;
  address?: string;
  currency: string;
  country_code?: string;
}

export interface DecideRouteRequest {
  intentId?: string;
  correlationKey?: string;
  source: RoutingEndpoint;
  destination: RoutingEndpoint;
  amountMinor: string;
  riskScore?: number;
  preference?: 'cheapest' | 'fastest' | 'most_private' | 'balanced';
  escrowCondition?: EscrowCondition;
  intentKind?: 'TRANSFER' | 'SWAP' | 'PAYOUT' | 'INVOICE' | 'PAYROLL' | 'AGENT_PAY' | 'TOPUP';
  swapExecution?: 'ledger' | 'onchain';
}

export interface RouteCandidate {
  rail: Rail;
  available: boolean;
  score: number;
  expected_cost_usd_minor: string;
  expected_seconds: number;
  reliability: number;
  privacy: number;
  notes: string[];
}

export interface DecideRouteResponse {
  decision_id: string;
  selected_rail: Rail;
  selected_score: number;
  rationale: string;
  candidates: RouteCandidate[];
}

export class RoutingClient {
  private readonly http: HttpClient;
  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'routing', logger: opts.logger });
  }

  decide(input: DecideRouteRequest, options?: RequestOptions): Promise<DecideRouteResponse> {
    return this.http.post(
      '/v1/routing/decide',
      {
        intent_id: input.intentId,
        correlation_key: input.correlationKey,
        source: input.source,
        destination: input.destination,
        amount_minor: Number(input.amountMinor),
        risk_score: input.riskScore,
        preference: input.preference,
        escrow_condition: input.escrowCondition,
        intent_kind: input.intentKind,
        swap_execution: input.swapExecution,
      },
      options,
    );
  }
}
