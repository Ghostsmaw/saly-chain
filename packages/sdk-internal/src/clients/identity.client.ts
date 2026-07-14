import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export type AuthRole = 'SUPER_ADMIN' | 'BUSINESS' | 'DEVELOPER' | 'CONSUMER';

export interface UserDto {
  id: string;
  email: string;
  status: string;
  role: AuthRole;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserListResponse {
  data: UserDto[];
  total: number;
  by_role: Record<string, number>;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: 'Bearer';
}

export interface AuthSession {
  id: string;
  email: string;
  role: AuthRole;
  display_name: string | null;
  status: string;
  access_token: string;
  expires_in: number;
  token_type: 'Bearer';
}

export interface SuperAdminInviteResult {
  user_id: string;
  email: string;
  temp_password: string;
  created: boolean;
}

export interface SuperAdminRevokeResult {
  user_id: string;
  email: string;
  suspended: boolean;
}

export interface VerifyTokenResult {
  user_id: string;
  email: string;
  role: AuthRole;
  agent_ids: string[];
  scopes: string[];
  rate_limit_per_min: number;
}

export interface DelegationDto {
  id: string;
  user_id: string;
  agent_id: string;
  scopes: string[];
  expires_at?: string;
  revoked_at?: string;
  created_at: string;
}

export class IdentityClient {
  private readonly http: HttpClient;

  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'identity', logger: opts.logger });
  }

  createUser(input: { email: string; metadata?: Record<string, unknown> }, options?: RequestOptions): Promise<UserDto> {
    return this.http.post('/v1/users', input, options);
  }

  getUser(id: string, options?: RequestOptions): Promise<UserDto> {
    return this.http.get(`/v1/users/${encodeURIComponent(id)}`, options);
  }

  listUsers(
    input: { limit?: number; role?: AuthRole } = {},
    options?: RequestOptions,
  ): Promise<UserListResponse> {
    return this.http.get('/v1/users', {
      ...options,
      query: { limit: input.limit, role: input.role },
    });
  }

  register(
    input: { email: string; password: string; displayName?: string; role: 'BUSINESS' | 'DEVELOPER' },
    options?: RequestOptions,
  ): Promise<AuthSession> {
    return this.http.post(
      '/v1/auth/register',
      {
        email: input.email,
        password: input.password,
        display_name: input.displayName,
        role: input.role,
      },
      options,
    );
  }

  login(
    input: { email: string; password: string; expectedRole?: AuthRole },
    options?: RequestOptions,
  ): Promise<AuthSession> {
    return this.http.post(
      '/v1/auth/login',
      {
        email: input.email,
        password: input.password,
        expected_role: input.expectedRole,
      },
      options,
    );
  }

  inviteSuperAdmin(
    input: { email: string; displayName?: string },
    internalToken?: string,
    options?: RequestOptions,
  ): Promise<SuperAdminInviteResult> {
    return this.http.post(
      '/v1/auth/invite-super-admin',
      { email: input.email, display_name: input.displayName },
      {
        ...options,
        headers: {
          ...(options?.headers ?? {}),
          ...(internalToken ? { authorization: `Bearer ${internalToken}` } : {}),
        },
      },
    );
  }

  revokeSuperAdmin(
    input: { email: string },
    internalToken?: string,
    options?: RequestOptions,
  ): Promise<SuperAdminRevokeResult> {
    return this.http.post(
      '/v1/auth/revoke-super-admin',
      { email: input.email },
      {
        ...options,
        headers: {
          ...(options?.headers ?? {}),
          ...(internalToken ? { authorization: `Bearer ${internalToken}` } : {}),
        },
      },
    );
  }

  issueToken(userId: string, options?: RequestOptions): Promise<TokenResponse> {
    return this.http.post('/v1/auth/token', { user_id: userId }, options);
  }

  verifyToken(token: string, options?: RequestOptions): Promise<VerifyTokenResult> {
    return this.http.post('/v1/auth/verify', { token }, options);
  }

  createDelegation(
    input: { userId: string; agentId: string; scopes?: string[]; expiresAt?: string },
    options?: RequestOptions,
  ): Promise<DelegationDto> {
    return this.http.post(
      '/v1/delegations',
      {
        user_id: input.userId,
        agent_id: input.agentId,
        scopes: input.scopes,
        expires_at: input.expiresAt,
      },
      options,
    );
  }

  listDelegations(input?: { userId?: string; agentId?: string }, options?: RequestOptions): Promise<{ data: DelegationDto[] }> {
    return this.http.get('/v1/delegations', {
      ...options,
      query: { user_id: input?.userId, agent_id: input?.agentId },
    });
  }

  resolveBeneficiary(
    input: { kind: 'PHONE' | 'EMAIL' | 'HANDLE'; value: string },
    options?: RequestOptions,
  ): Promise<{ user_id: string; verified: boolean }> {
    return this.http.get('/v1/users/resolve', {
      ...options,
      query: { kind: input.kind, value: input.value },
    });
  }

  registerAlias(
    userId: string,
    input: { kind: 'PHONE' | 'EMAIL' | 'HANDLE'; value: string; verified?: boolean },
    options?: RequestOptions,
  ): Promise<{ id: string; kind: string; value: string; user_id: string }> {
    return this.http.post(`/v1/users/${encodeURIComponent(userId)}/aliases`, input, options);
  }
}
