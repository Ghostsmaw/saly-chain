import { Injectable, type NestMiddleware } from '@nestjs/common';
import { type NextFunction, type Response } from 'express';
import { ulid } from 'ulid';
import { AuthenticationError } from '@salychain/errors';
import { ApiKeyCache } from './apikey.cache.js';
import type { AuthenticatedRequest, GatewayAuth } from './auth.types.js';
import { IdentityClient } from '@salychain/sdk-internal';
import { Inject } from '@nestjs/common';
import { IDENTITY_CLIENT } from './s4-clients.module.js';

const BEARER_PREFIX = 'Bearer ';
const API_KEY_PREFIXES = ['sk_test_', 'sk_live_'];

/**
 * Dual auth middleware (S4):
 *
 *   Authorization: Bearer sk_live_…   → API key path (B2B partners)
 *   Authorization: Bearer eyJ…        → JWT path (Saly AI consumer surface)
 *   X-API-Key: sk_live_…              → API key path
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly cache: ApiKeyCache,
    @Inject(IDENTITY_CLIENT) private readonly identity: IdentityClient,
  ) {}

  async use(req: AuthenticatedRequest, _res: Response, next: NextFunction): Promise<void> {
    const presented = extractBearerOrApiKey(req);
    if (!presented) {
      throw AuthenticationError(
        'gateway.auth.missing',
        'Missing credentials. Send Authorization: Bearer sk_… / JWT, or X-API-Key.',
      );
    }

    const correlationId = (req.headers['x-correlation-id'] as string | undefined) ?? ulid();
    const ip = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ?? req.ip;

    if (isApiKey(presented)) {
      const result = await this.cache.verify(presented, {
        ...(ip ? { ip } : {}),
        ...(req.headers['user-agent'] ? { userAgent: req.headers['user-agent'] as string } : {}),
        correlationId,
      });
      req.auth = {
        correlation_id: correlationId,
        auth_mode: 'api_key',
        principal_id: result.api_key_id,
        scopes: result.scopes,
        rate_limit_per_min: result.rate_limit_per_min,
        api_key_id: result.api_key_id,
        org_id: result.org_id,
        environment: result.environment,
      };
      next();
      return;
    }

    const jwt = await this.identity.verifyToken(presented);
    req.auth = {
      correlation_id: correlationId,
      auth_mode: 'jwt',
      principal_id: jwt.user_id,
      scopes: jwt.scopes,
      rate_limit_per_min: jwt.rate_limit_per_min,
      user_id: jwt.user_id,
      email: jwt.email,
      agent_ids: jwt.agent_ids,
    };
    next();
  }
}

function extractBearerOrApiKey(req: AuthenticatedRequest): string | null {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith(BEARER_PREFIX)) {
    const token = auth.slice(BEARER_PREFIX.length).trim();
    if (token) return token;
  }
  const xapikey = req.headers['x-api-key'];
  if (typeof xapikey === 'string' && xapikey.length > 0) return xapikey;
  return null;
}

function isApiKey(token: string): boolean {
  return API_KEY_PREFIXES.some((p) => token.startsWith(p));
}
