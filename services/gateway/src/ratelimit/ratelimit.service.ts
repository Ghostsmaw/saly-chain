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

  /**
   * Pre-auth defense: bounds how many FAILED credential attempts an IP can
   * make per minute. The per-key limiter above only runs after successful
   * auth, so without this an attacker with garbage keys gets unbounded scrypt
   * work out of the apikeys service. Fails open on Redis errors — losing the
   * throttle is better than losing the data plane.
   */
  async assertAuthFailureBudget(ip: string | undefined, limitPerMinute: number): Promise<void> {
    if (!ip) return;
    try {
      const count = await this.redis.get(this.authFailKey(ip));
      if (count !== null && Number(count) >= limitPerMinute) {
        throw RateLimitError(
          'gateway.auth.throttled',
          'Too many failed authentication attempts from this address. Retry later.',
        );
      }
    } catch (err) {
      if ((err as { code?: string }).code === 'gateway.auth.throttled') throw err;
    }
  }

  async recordAuthFailure(ip: string | undefined): Promise<void> {
    if (!ip) return;
    try {
      const key = this.authFailKey(ip);
      const tx = this.redis.multi();
      tx.incr(key);
      tx.expire(key, 90);
      await tx.exec();
    } catch {
      // best-effort counter
    }
  }

  private authFailKey(ip: string): string {
    const window = Math.floor(Date.now() / 60_000);
    return `gw:authfail:${ip}:${window}`;
  }
}

export interface RateLimitState {
  limit: number;
  remaining: number;
  resetAt: Date;
}
