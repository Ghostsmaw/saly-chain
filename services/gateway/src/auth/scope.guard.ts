import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationError, ErrorCodes } from '@salychain/errors';
import type { AuthenticatedRequest } from './auth.types.js';

export const SCOPES_KEY = 'gateway:required_scopes';
/**
 * Declare the scopes a route requires. Caller satisfies the route if its key
 * carries ALL listed scopes (or a more-privileged form like `admin`).
 *
 * Usage:
 *   @RequireScopes('intents:write')
 *   @RequireScopes('transactions:read', 'wallets:read')
 */
export const RequireScopes = (...scopes: string[]) => SetMetadata(SCOPES_KEY, scopes);

@Injectable()
export class ScopeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[] | undefined>(SCOPES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const granted = new Set(req.auth?.scopes ?? []);
    for (const scope of required) {
      if (!grants(granted, scope)) {
        throw AuthorizationError(ErrorCodes.AUTH_MISSING_SCOPE, `Missing required scope: ${scope}`);
      }
    }
    return true;
  }
}

function grants(granted: Set<string>, required: string): boolean {
  if (granted.has(required)) return true;
  const [resource, action] = required.split(':');
  if (!resource || !action) return false;
  if (granted.has(`${resource}:admin`)) return true;
  if (action === 'read' && granted.has(`${resource}:write`)) return true;
  return false;
}
