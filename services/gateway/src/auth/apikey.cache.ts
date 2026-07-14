import { createHash } from 'node:crypto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { isIpAllowed } from '@salychain/config';
import { ApiKeysClient, type VerifyKeyResult } from '@salychain/sdk-internal';
import { AuthenticationError, AuthorizationError } from '@salychain/errors';
import { REDIS_CONNECTION } from '../proxy/redis.module.js';
import { GATEWAY_ENV, type GatewayEnv } from '../config/env.js';
import { APIKEYS_CLIENT } from './apikeys.client.module.js';

/**
 * Short-TTL cache in front of the apikeys service.
 *
 * Why cache:
 *   - apikeys.verify runs scrypt (~10ms). That's fine at low QPS but we expect
 *     thousands of req/s on hot keys.
 *   - On a hot key, we cache the verify result keyed by sha256(secret).
 *   - TTL is intentionally short (default 15s). Revocations propagate within
 *     that window; partners who want immediate kill can also call
 *     `POST /v1/api-keys/:id/revoke` and the next cached entry will fail.
 *
 * Why not cache misses:
 *   - A miss means "this secret is invalid". If an attacker is brute-forcing
 *     prefixes, caching misses would help them; we let every miss go to apikeys.
 *     The cost is bounded because scrypt is slow on the wrong secret too.
 */
@Injectable()
export class ApiKeyCache {
  private readonly logger = new Logger(ApiKeyCache.name);
  constructor(
    @Inject(REDIS_CONNECTION) private readonly redis: Redis,
    @Inject(APIKEYS_CLIENT) private readonly client: ApiKeysClient,
    @Inject(GATEWAY_ENV) private readonly env: GatewayEnv,
  ) {}

  async verify(secret: string, ctx: { ip?: string; userAgent?: string; correlationId: string }): Promise<VerifyKeyResult> {
    const hash = createHash('sha256').update(secret).digest('hex');
    const cacheKey = `gw:apikey:${hash}`;
    try {
      const cached = await this.redis.get(cacheKey);
      if (cached) {
        const result = JSON.parse(cached) as VerifyKeyResult;
        if (!isIpAllowed(ctx.ip, result.ip_allow_list)) {
          throw AuthorizationError(
            'apikeys.ip_denied',
            ctx.ip ? `API key not authorized from ${ctx.ip}` : 'API key requires a client IP that matches its allow-list',
          );
        }
        return result;
      }
    } catch (err) {
      if ((err as { code?: string }).code === 'apikeys.ip_denied') throw err;
      this.logger.warn(`apikey cache lookup failed: ${(err as Error).message}`);
    }

    let result: VerifyKeyResult;
    try {
      result = await this.client.verify(secret, ctx);
    } catch (err) {
      // Re-shape unknown errors as 401 so we don't leak transport details.
      if ((err as { httpStatus?: number }).httpStatus === 401 || (err as { httpStatus?: number }).httpStatus === 403) {
        throw err;
      }
      // 5xx from apikeys: fail closed.
      throw AuthenticationError('gateway.auth.unavailable', 'Authentication temporarily unavailable');
    }

    try {
      await this.redis.set(cacheKey, JSON.stringify(result), 'EX', this.env.APIKEY_CACHE_TTL_SEC);
    } catch {
      // best-effort cache
    }
    return result;
  }
}
