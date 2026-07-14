import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export type Environment = 'TEST' | 'LIVE';
export type ApiKeyStatus = 'ACTIVE' | 'REVOKED' | 'EXPIRED';

export interface PublicApiKey {
  id: string;
  org_id: string;
  prefix: string;
  last_four: string;
  environment: Environment;
  status: ApiKeyStatus;
  scopes: string[];
  rate_limit_per_min: number;
  description?: string;
  ip_allow_list: string[];
  created_by?: string;
  created_at: string;
  last_used_at?: string;
  expires_at?: string;
  revoked_at?: string;
  revoked_reason?: string;
}

export interface IssuedKey {
  secret: string;
  apiKey: PublicApiKey;
}

export interface VerifyKeyResult {
  api_key_id: string;
  org_id: string;
  environment: Environment;
  scopes: string[];
  rate_limit_per_min: number;
  ip_allow_list: string[];
}

export class ApiKeysClient {
  private readonly http: HttpClient;
  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'apikeys', logger: opts.logger });
  }

  issue(input: {
    orgId: string;
    environment: Environment;
    scopes: string[];
    description?: string;
    rateLimitPerMin?: number;
    ipAllowList?: string[];
    expiresAt?: string;
    createdBy?: string;
  }, options?: RequestOptions): Promise<IssuedKey> {
    return this.http.post('/v1/api-keys', {
      org_id: input.orgId,
      environment: input.environment,
      scopes: input.scopes,
      description: input.description,
      rate_limit_per_min: input.rateLimitPerMin,
      ip_allow_list: input.ipAllowList,
      expires_at: input.expiresAt,
      created_by: input.createdBy,
    }, options);
  }

  list(orgId: string, opts?: { includeRevoked?: boolean }, options?: RequestOptions): Promise<{ data: PublicApiKey[] }> {
    return this.http.get('/v1/api-keys', { ...options, query: { org_id: orgId, include_revoked: opts?.includeRevoked ?? false } });
  }

  getById(id: string, options?: RequestOptions): Promise<PublicApiKey> {
    return this.http.get(`/v1/api-keys/${encodeURIComponent(id)}`, options);
  }

  revoke(id: string, reason: string, options?: RequestOptions): Promise<PublicApiKey> {
    return this.http.post(`/v1/api-keys/${encodeURIComponent(id)}/revoke`, { reason }, options);
  }

  rotate(id: string, reason: string, createdBy?: string, options?: RequestOptions): Promise<IssuedKey> {
    return this.http.post(`/v1/api-keys/${encodeURIComponent(id)}/rotate`, { reason, created_by: createdBy }, options);
  }

  /**
   * Hot-path verify used by the gateway. Has aggressive timeout + no retry
   * (a single failure makes the request fail-closed; better to return 401 fast
   * than to hang on a degraded apikeys instance).
   */
  verify(secret: string, ctx: { ip?: string; userAgent?: string; correlationId?: string }, options?: RequestOptions): Promise<VerifyKeyResult> {
    return this.http.post('/v1/api-keys/verify', {
      secret,
      ip: ctx.ip,
      user_agent: ctx.userAgent,
      correlation_id: ctx.correlationId,
    }, { timeoutMs: 1_500, noRetry: true, ...options });
  }
}
