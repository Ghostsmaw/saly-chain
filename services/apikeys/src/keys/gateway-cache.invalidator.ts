import { Inject, Injectable, Logger, type OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
import { APIKEYS_ENV, type ApiKeysRuntimeEnv } from '../config/env.runtime.js';

/**
 * Kills the gateway's verify-result cache entry when a key is revoked.
 *
 * The gateway caches successful verifications in Redis for a short TTL and
 * writes a `gw:apikey:byid:<key_id>` pointer next to each entry. Deleting
 * the pointer target here makes revocation take effect immediately instead
 * of after the TTL window.
 *
 * Best-effort by design: when REDIS_URL is unset or Redis is down we only
 * log — the gateway's short TTL remains the backstop, and revocation must
 * never fail because a cache was unreachable.
 */
@Injectable()
export class GatewayCacheInvalidator implements OnModuleDestroy {
  private readonly logger = new Logger(GatewayCacheInvalidator.name);
  private readonly redis: Redis | null;

  constructor(@Inject(APIKEYS_ENV) env: ApiKeysRuntimeEnv) {
    this.redis = env.REDIS_URL
      ? new Redis(env.REDIS_URL, { maxRetriesPerRequest: 1, lazyConnect: true })
      : null;
    if (!this.redis) {
      this.logger.log('REDIS_URL not set — revocations rely on the gateway cache TTL');
    }
  }

  async invalidate(apiKeyId: string): Promise<void> {
    if (!this.redis) return;
    try {
      const pointerKey = `gw:apikey:byid:${apiKeyId}`;
      const cacheKey = await this.redis.get(pointerKey);
      await this.redis.del(...(cacheKey ? [pointerKey, cacheKey] : [pointerKey]));
    } catch (err) {
      this.logger.warn(`gateway cache invalidation failed for ${apiKeyId}: ${(err as Error).message}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.redis) await this.redis.quit().catch(() => undefined);
  }
}
