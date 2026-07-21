import { Injectable, type NestMiddleware } from '@nestjs/common';
import { type NextFunction, type Response } from 'express';
import { RequestLogService } from '../../proxy/request-log.service.js';
import type { AuthenticatedRequest } from '../../auth/auth.types.js';

/**
 * Logs every request once the response finishes. Best-effort — failures here
 * never reach the user, and we never block on durable writes (RequestLogService
 * swallows DB errors so a degraded log table can't take down the data plane).
 */
@Injectable()
export class RequestLogMiddleware implements NestMiddleware {
  constructor(private readonly logger: RequestLogService) {}

  use(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    const start = Date.now();
    res.on('finish', () => {
      const correlationId = (req.headers['x-correlation-id'] as string | undefined) ?? '';
      // Trust-proxy-resolved client IP (see main.ts); raw XFF is spoofable.
      const ip = req.ip;
      this.logger.log({
        ...(req.auth?.api_key_id ? { apiKeyId: req.auth.api_key_id } : {}),
        ...(req.auth?.org_id ? { orgId: req.auth.org_id } : {}),
        method: req.method,
        path: req.originalUrl.split('?')[0] ?? req.path,
        status: res.statusCode,
        latencyMs: Date.now() - start,
        ...(ip ? { ip } : {}),
        ...(req.headers['user-agent'] ? { userAgent: req.headers['user-agent'] as string } : {}),
        correlationId,
      });
    });
    next();
  }
}
