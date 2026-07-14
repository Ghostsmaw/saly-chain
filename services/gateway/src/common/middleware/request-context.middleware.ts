import { Injectable, type NestMiddleware } from '@nestjs/common';
import { type NextFunction, type Response, type Request } from 'express';
import { ulid } from 'ulid';

/**
 * Idempotent correlation-id propagation. The very first middleware so every
 * downstream handler sees `x-correlation-id` on req.headers and the response.
 */
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const incoming = req.headers['x-correlation-id'];
    const correlationId = typeof incoming === 'string' && incoming.length > 0 ? incoming : ulid();
    req.headers['x-correlation-id'] = correlationId;
    res.setHeader('x-correlation-id', correlationId);
    next();
  }
}
