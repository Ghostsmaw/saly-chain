import { Injectable, type NestMiddleware } from '@nestjs/common';
import { type NextFunction, type Response } from 'express';
import { ulid } from 'ulid';
import { AuthenticationError } from '@salychain/errors';
import { ApiKeyCache } from './apikey.cache.js';
import type { AuthenticatedRequest, GatewayAuth } from './auth.types.js';
import { IdentityClient } from '@salychain/sdk-internal';
import { Inject } from '@nestjs/common';
import { IDENTITY_CLIENT } from './s4-clients.module.js';
import { RateLimitService } from '../ratelimit/ratelimit.service.js';
import { GATEWAY_ENV, type GatewayEnv } from '../config/env.js';

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
    private readonly limiter: RateLimitService,
    @Inject(IDENTITY_CLIENT) private readonly identity: IdentityClient,
    @Inject(GATEWAY_ENV) private readonly env: GatewayEnv,
  ) {}

  async use(req: AuthenticatedRequest, _res: Response, next: NextFunction): Promise<void> {
    // Defense-in-depth: Nest middleware `.exclude()` has historically mismatched
    // global-prefix paths. Health probes must never require credentials.
    const pathOnly = (req.originalUrl ?? req.url ?? '').split('?')[0] ?? '';
    if (pathOnly === '/v1/health' || pathOnly === '/health') {
      next();
      return;
    }

    const presented = extractBearerOrApiKey(req);
    if (!presented) {
      throw AuthenticationError(
        'gateway.auth.missing',
        'Missing credentials. Send Authorization: Bearer sk_… / JWT, or X-API-Key.',
      );
    }

    const correlationId = (req.headers['x-correlation-id'] as string | undefined) ?? ulid();
    // req.ip is resolved by Express via `trust proxy` (hop count), which
    // ignores attacker-prepended X-Forwarded-For entries. Never read the
    // header directly here — ip_allow_list enforcement depends on this value.
    const ip = req.ip;

    // Pre-auth gate: an IP burning through failed credentials gets cut off
    // BEFORE we spend scrypt/JWT-verification work on it.
    await this.limiter.assertAuthFailureBudget(ip, this.env.AUTH_FAILURE_LIMIT_PER_MIN);

    try {
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
    } catch (err) {
      await this.limiter.recordAuthFailure(ip);
      throw err;
    }
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
