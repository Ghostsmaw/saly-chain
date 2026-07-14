import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export type AgentStatus = 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';
export type OwnerKind = 'USER' | 'BUSINESS';

export interface AgentDto {
  id: string;
  owner_id: string;
  owner_kind: OwnerKind;
  org_id?: string;
  name: string;
  status: AgentStatus;
  metadata?: Record<string, unknown>;
  wallet_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface SpendingPolicyDto {
  agent_id: string;
  per_tx_cap_minor: string;
  daily_cap_minor: string;
  monthly_cap_minor?: string;
  destination_allowlist: string[];
  approval_threshold_minor: string;
  required_approvers: number;
  currency: string;
  version: number;
  updated_at: string;
}

export interface AuthorizeSpendResult {
  allowed: boolean;
  pending_approval?: boolean;
  approval_request_id?: string;
  reason_code?: string;
  reason_message?: string;
  policy_version: number;
}

export interface ReasoningLogDto {
  id: string;
  agent_id: string;
  intent_id?: string;
  trace_id?: string;
  summary: string;
  steps: unknown[];
  created_at: string;
}

export class AgentsClient {
  private readonly http: HttpClient;

  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'agents', logger: opts.logger });
  }

  create(
    input: {
      ownerId: string;
      ownerKind: OwnerKind;
      orgId?: string;
      name: string;
      metadata?: Record<string, unknown>;
      provisionChains?: Array<'BASE' | 'XRPL'>;
    },
    options?: RequestOptions,
  ): Promise<AgentDto> {
    return this.http.post(
      '/v1/agents',
      {
        owner_id: input.ownerId,
        owner_kind: input.ownerKind,
        org_id: input.orgId,
        name: input.name,
        metadata: input.metadata,
        provision_chains: input.provisionChains,
      },
      options,
    );
  }

  list(
    input?: { ownerId?: string; orgId?: string; limit?: number },
    options?: RequestOptions,
  ): Promise<{ data: AgentDto[] }> {
    return this.http.get('/v1/agents', {
      ...options,
      query: {
        owner_id: input?.ownerId,
        org_id: input?.orgId,
        limit: input?.limit,
      },
    });
  }

  getById(id: string, options?: RequestOptions): Promise<AgentDto> {
    return this.http.get(`/v1/agents/${encodeURIComponent(id)}`, options);
  }

  setStatus(id: string, status: AgentStatus, options?: RequestOptions): Promise<AgentDto> {
    return this.http.patch(`/v1/agents/${encodeURIComponent(id)}/status`, { status }, options);
  }

  getPolicy(id: string, options?: RequestOptions): Promise<SpendingPolicyDto> {
    return this.http.get(`/v1/agents/${encodeURIComponent(id)}/policy`, options);
  }

  updatePolicy(
    id: string,
    input: {
      perTxCapMinor?: string;
      dailyCapMinor?: string;
      monthlyCapMinor?: string;
      destinationAllowlist?: string[];
      approvalThresholdMinor?: string;
      requiredApprovers?: number;
      currency?: string;
    },
    options?: RequestOptions,
  ): Promise<SpendingPolicyDto> {
    return this.http.patch(`/v1/agents/${encodeURIComponent(id)}/policy`, {
      per_tx_cap_minor: input.perTxCapMinor,
      daily_cap_minor: input.dailyCapMinor,
      monthly_cap_minor: input.monthlyCapMinor,
      destination_allowlist: input.destinationAllowlist,
      approval_threshold_minor: input.approvalThresholdMinor,
      required_approvers: input.requiredApprovers,
      currency: input.currency,
    }, options);
  }

  authorizeSpend(
    id: string,
    input: { amountMinor: string; destinationAddress: string; intentId?: string },
    options?: RequestOptions,
  ): Promise<AuthorizeSpendResult> {
    return this.http.post(
      `/v1/agents/${encodeURIComponent(id)}/authorize-spend`,
      {
        amount_minor: input.amountMinor,
        destination_address: input.destinationAddress,
        intent_id: input.intentId,
      },
      options,
    );
  }

  recordReasoningLog(
    id: string,
    input: { summary: string; steps: unknown[]; intentId?: string; traceId?: string },
    options?: RequestOptions,
  ): Promise<ReasoningLogDto> {
    return this.http.post(
      `/v1/agents/${encodeURIComponent(id)}/reasoning-logs`,
      {
        summary: input.summary,
        steps: input.steps,
        intent_id: input.intentId,
        trace_id: input.traceId,
      },
      options,
    );
  }

  listReasoningLogs(id: string, limit = 25, options?: RequestOptions): Promise<{ data: ReasoningLogDto[] }> {
    return this.http.get(`/v1/agents/${encodeURIComponent(id)}/reasoning-logs`, {
      ...options,
      query: { limit },
    });
  }

  getSpendApprovalByIntent(
    agentId: string,
    intentId: string,
    options?: RequestOptions,
  ): Promise<{
    id?: string;
    agent_id: string;
    intent_id: string;
    approval_count: number;
    required_approvers: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED' | 'NONE';
    created_at?: string;
    updated_at?: string;
  }> {
    return this.http.get(
      `/v1/agents/${encodeURIComponent(agentId)}/spend-approvals/by-intent/${encodeURIComponent(intentId)}`,
      options,
    );
  }

  listSpendApprovals(
    agentId: string,
    input?: { status?: 'PENDING' | 'APPROVED' | 'REJECTED' },
    options?: RequestOptions,
  ): Promise<{
    data: Array<{
      id: string;
      agent_id: string;
      intent_id?: string;
      amount_minor: string;
      destination: string;
      approval_count: number;
      required_approvers: number;
      status: string;
      created_at: string;
      updated_at: string;
    }>;
  }> {
    return this.http.get(`/v1/agents/${encodeURIComponent(agentId)}/spend-approvals`, {
      ...options,
      query: { status: input?.status },
    });
  }

  voteSpendApproval(
    agentId: string,
    requestId: string,
    approverId: string,
    options?: RequestOptions,
  ): Promise<{
    id: string;
    agent_id: string;
    intent_id?: string;
    approval_count: number;
    required_approvers: number;
    status: 'PENDING' | 'APPROVED';
  }> {
    return this.http.post(
      `/v1/agents/${encodeURIComponent(agentId)}/spend-approvals/${encodeURIComponent(requestId)}/vote`,
      { approver_id: approverId },
      options,
    );
  }
}
