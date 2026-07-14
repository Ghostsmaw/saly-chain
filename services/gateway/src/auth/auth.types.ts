import type { Request } from 'express';

export interface GatewayAuth {
  correlation_id: string;
  auth_mode: 'api_key' | 'jwt';
  /** Stable id for rate limiting + idempotency (api_key_id or user_id). */
  principal_id: string;
  scopes: string[];
  rate_limit_per_min: number;
  api_key_id?: string;
  org_id?: string;
  environment?: 'TEST' | 'LIVE';
  user_id?: string;
  email?: string;
  agent_ids?: string[];
}

export interface AuthenticatedRequest extends Request {
  auth?: GatewayAuth;
}

export function requireAuth(req: AuthenticatedRequest): GatewayAuth {
  if (!req.auth) {
    throw new Error('gateway invariant: request reached scoped handler without auth context');
  }
  return req.auth;
}
