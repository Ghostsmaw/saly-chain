import { Injectable, type NestMiddleware } from '@nestjs/common';
import { type NextFunction, type Response } from 'express';
import { RateLimitService } from '../../ratelimit/ratelimit.service.js';
import type { AuthenticatedRequest } from '../../auth/auth.types.js';

/**
 * Runs AFTER AuthMiddleware. We need req.auth to be set so we can scope the
 * limiter per API key. Sets standard X-RateLimit-* headers on the response.
 */
@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(private readonly limiter: RateLimitService) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    if (!req.auth) return next();
    const state = await this.limiter.checkAndIncrement(req.auth.principal_id, req.auth.rate_limit_per_min);
    res.setHeader('x-ratelimit-limit', String(state.limit));
    res.setHeader('x-ratelimit-remaining', String(state.remaining));
    res.setHeader('x-ratelimit-reset', state.resetAt.toISOString());
    next();
  }
}
