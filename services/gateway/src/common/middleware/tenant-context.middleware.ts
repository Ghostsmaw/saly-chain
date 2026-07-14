import { Injectable, type NestMiddleware } from '@nestjs/common';
import { type NextFunction, type Response } from 'express';
import { runWithTenant, type TenantContext } from '@salychain/sdk-internal';
import type { AuthenticatedRequest } from '../../auth/auth.types.js';

/**
 * Binds the authenticated principal's tenant identity for the request's async
 * subtree. Because it wraps `next()` inside `runWithTenant`, every downstream
 * internal client call made while handling the request automatically forwards
 * the org/environment headers — this is what makes tenant isolation hold
 * across the gateway → service hops without threading org through each call.
 *
 * Must run AFTER `AuthMiddleware` (which sets `req.auth`).
 */
@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
    const auth = req.auth;
    const ctx: TenantContext = {};
    if (auth?.org_id) ctx.orgId = auth.org_id;
    if (auth?.environment) ctx.environment = auth.environment;
    if (auth?.correlation_id) ctx.correlationId = auth.correlation_id;
    runWithTenant(ctx, () => next());
  }
}
