import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export interface EntityMember {
  id: string;
  chain: string;
  address: string;
  transfer_events: number;
  label: string | null;
}

export interface PublicEntity {
  id: string;
  chain: string;
  label: string | null;
  category: string | null;
  status: 'ACTIVE' | 'MERGED';
  address_count: number;
  risk_score: number;
  sanctioned: boolean;
  resolved_at: string;
  members?: EntityMember[];
}

export interface AddressFeatures {
  address: string;
  chain: string;
  as_of: string;
  transfers_total: number;
  outbound_count: number;
  inbound_count: number;
  distinct_counterparties: number;
  distinct_tokens: number;
  volume_out: number;
  volume_in: number;
  net_volume: number;
  max_transfer: number;
  avg_transfer: number;
  active_days: number;
  first_seen_at: string | null;
  last_seen_at: string | null;
  age_days: number;
  days_since_last_activity: number;
  entity: {
    id: string;
    label: string | null;
    category: string | null;
    risk_score: number;
    sanctioned: boolean;
    address_count: number;
  } | null;
  entity_risk_score: number;
  sanctioned: boolean;
}

export interface NlAnswer {
  status: 'executed' | 'unsupported' | 'failed';
  question: string;
  metric?: string;
  plan?: unknown;
  rationale?: string;
  sql?: string;
  rows?: Array<Record<string, unknown>>;
  row_count?: number;
  reason?: string;
}

export interface SimilarAddress {
  chain: string;
  address: string;
  score: number;
}

/** Typed client for the Saly Intelligence service (entity resolution, features, NL analytics). */
export class IntelligenceClient {
  private readonly http: HttpClient;
  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({
      baseUrl: opts.baseUrl,
      serviceName: 'analytics-intelligence',
      logger: opts.logger,
    });
  }

  // ── Entities ──────────────────────────────────────────────────────────────
  resolve(
    body: { chain?: string; async?: boolean } = {},
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.http.post('/v1/entities/resolve', body, options);
  }

  listEntities(
    query: { chain?: string; sanctioned?: boolean; limit?: number } = {},
    options?: RequestOptions,
  ): Promise<{ data: PublicEntity[] }> {
    return this.http.get('/v1/entities', { ...options, query });
  }

  listRuns(query: { limit?: number } = {}, options?: RequestOptions): Promise<{ data: unknown[] }> {
    return this.http.get('/v1/entities/runs', { ...options, query });
  }

  getEntity(id: string, options?: RequestOptions): Promise<PublicEntity> {
    return this.http.get(`/v1/entities/${encodeURIComponent(id)}`, options);
  }

  entityByAddress(chain: string, address: string, options?: RequestOptions): Promise<PublicEntity> {
    return this.http.get('/v1/entities/by-address', { ...options, query: { chain, address } });
  }

  // ── Features (consumed by services/risk) ────────────────────────────────────
  addressFeatures(
    chain: string,
    address: string,
    asOf?: string,
    options?: RequestOptions,
  ): Promise<AddressFeatures> {
    return this.http.get('/v1/features/address', {
      ...options,
      query: { chain, address, ...(asOf ? { as_of: asOf } : {}) },
    });
  }

  // ── Embeddings / vector search ──────────────────────────────────────────────
  searchEmbeddings(
    query: { chain: string; q?: string; address?: string; k?: number },
    options?: RequestOptions,
  ): Promise<{ data: SimilarAddress[] }> {
    return this.http.get('/v1/embeddings/search', { ...options, query });
  }

  upsertEmbedding(
    chain: string,
    address: string,
    options?: RequestOptions,
  ): Promise<{ chain: string; address: string; dim: number }> {
    return this.http.post('/v1/embeddings/upsert', { chain, address }, options);
  }

  materializeEmbeddings(
    chain: string,
    options?: RequestOptions,
  ): Promise<{ enqueued: boolean; job_id: string }> {
    return this.http.post('/v1/embeddings/materialize', { chain }, options);
  }

  // ── Natural-language analytics ──────────────────────────────────────────────
  ask(question: string, orgId?: string, options?: RequestOptions): Promise<NlAnswer> {
    return this.http.post(
      '/v1/nl/query',
      { question, ...(orgId ? { org_id: orgId } : {}) },
      options,
    );
  }

  metrics(options?: RequestOptions): Promise<{ data: unknown[] }> {
    return this.http.get('/v1/semantic/metrics', options);
  }
}
