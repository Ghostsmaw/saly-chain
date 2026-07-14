import { Inject, Injectable } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { RateLimitError } from '@salychain/errors';
import { REDIS_CONNECTION } from '../proxy/redis.module.js';

/**
 * Per-API-key fixed-window rate limiter.
 *
 * We use a 60s window keyed by the floor of the current minute. This trades
 * some boundary-burstiness for radically simpler reasoning and a single
 * INCR+EXPIRE round-trip per request. Sliding-window precision isn't worth
 * the extra complexity at our current scale.
 */
@Injectable()
export class RateLimitService {
  constructor(@Inject(REDIS_CONNECTION) private readonly redis: Redis) {}

  async checkAndIncrement(apiKeyId: string, limitPerMinute: number): Promise<RateLimitState> {
    const window = Math.floor(Date.now() / 60_000);
    const key = `gw:rl:${apiKeyId}:${window}`;
    const tx = this.redis.multi();
    tx.incr(key);
    tx.expire(key, 90); // outlive the window so late requests still see the count
    const [[, count]] = (await tx.exec()) as Array<[Error | null, number]>;
    const remaining = Math.max(0, limitPerMinute - Number(count));
    const resetMs = (window + 1) * 60_000;
    if (Number(count) > limitPerMinute) {
      throw RateLimitError('gateway.rate_limit', `Rate limit exceeded (${limitPerMinute}/min). Retry after ${Math.ceil((resetMs - Date.now()) / 1000)}s.`, {
        details: { limit: limitPerMinute, remaining: 0, reset: new Date(resetMs).toISOString() },
      });
    }
    return { limit: limitPerMinute, remaining, resetAt: new Date(resetMs) };
  }
}

export interface RateLimitState {
  limit: number;
  remaining: number;
  resetAt: Date;
}
