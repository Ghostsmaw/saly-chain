import type { HttpTransport } from '../transport.js';

export interface Agent {
  id: string;
  owner_id: string;
  owner_kind: 'USER' | 'BUSINESS';
  org_id?: string;
  name: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';
  wallet_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface AgentSpendingPolicy {
  agent_id: string;
  per_tx_cap_minor: string;
  daily_cap_minor: string;
  destination_allowlist: string[];
  approval_threshold_minor: string;
  required_approvers: number;
  currency: string;
  version: number;
  updated_at: string;
}

export class Agents {
  constructor(private readonly http: HttpTransport) {}

  create(
    input: {
      owner_id: string;
      owner_kind: 'USER' | 'BUSINESS';
      name: string;
      org_id?: string;
      metadata?: Record<string, unknown>;
      provision_chains?: Array<'BASE' | 'XRPL'>;
    },
    options: { signal?: AbortSignal } = {},
  ): Promise<Agent> {
    return this.http.request<Agent>({
      method: 'POST',
      path: '/v1/agents',
      body: input,
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }

  list(
    query?: { owner_id?: string; limit?: number },
    options: { signal?: AbortSignal } = {},
  ): Promise<{ data: Agent[] }> {
    return this.http.request<{ data: Agent[] }>({
      method: 'GET',
      path: '/v1/agents',
      query: query as Record<string, string | number | undefined>,
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }

  get(id: string, options: { signal?: AbortSignal } = {}): Promise<Agent> {
    return this.http.request<Agent>({
      method: 'GET',
      path: `/v1/agents/${encodeURIComponent(id)}`,
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }

  getPolicy(id: string, options: { signal?: AbortSignal } = {}): Promise<AgentSpendingPolicy> {
    return this.http.request<AgentSpendingPolicy>({
      method: 'GET',
      path: `/v1/agents/${encodeURIComponent(id)}/policy`,
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }

  updatePolicy(
    id: string,
    patch: {
      per_tx_cap_minor?: string;
      daily_cap_minor?: string;
      destination_allowlist?: string[];
      approval_threshold_minor?: string;
      required_approvers?: number;
      currency?: string;
    },
    options: { signal?: AbortSignal } = {},
  ): Promise<AgentSpendingPolicy> {
    return this.http.request<AgentSpendingPolicy>({
      method: 'PATCH',
      path: `/v1/agents/${encodeURIComponent(id)}/policy`,
      body: patch,
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }
}
