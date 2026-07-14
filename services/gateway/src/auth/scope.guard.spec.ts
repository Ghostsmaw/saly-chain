import { describe, it, expect } from 'vitest';
import { Reflector } from '@nestjs/core';
import { ScopeGuard, SCOPES_KEY } from './scope.guard.js';
import type { AuthenticatedRequest } from './auth.types.js';

function makeCtx(required: string[] | undefined, scopes: string[]) {
  const reflector = new Reflector();
  if (required) reflector.get = () => required as never;
  reflector.getAllAndOverride = () => required as never;
  const req: Partial<AuthenticatedRequest> = {
    auth: {
      api_key_id: 'key_1',
      org_id: 'org_1',
      environment: 'TEST',
      scopes,
      rate_limit_per_min: 60,
      ip_allow_list: [],
      correlation_id: 'corr_1',
    },
  };
  const ctx = {
    getHandler: () => undefined,
    getClass: () => undefined,
    switchToHttp: () => ({ getRequest: () => req }),
  } as never;
  return { ctx, guard: new ScopeGuard(reflector) };
}

describe('ScopeGuard', () => {
  it('allows when no scopes required', () => {
    const { ctx, guard } = makeCtx(undefined, []);
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('allows when exact scope present', () => {
    const { ctx, guard } = makeCtx(['intents:write'], ['intents:write']);
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('allows write to satisfy read', () => {
    const { ctx, guard } = makeCtx(['intents:read'], ['intents:write']);
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('allows admin to satisfy write or read', () => {
    const a = makeCtx(['intents:write'], ['intents:admin']);
    const b = makeCtx(['intents:read'], ['intents:admin']);
    expect(a.guard.canActivate(a.ctx)).toBe(true);
    expect(b.guard.canActivate(b.ctx)).toBe(true);
  });

  it('rejects when scope is missing', () => {
    const { ctx, guard } = makeCtx(['transactions:read'], ['intents:write']);
    expect(() => guard.canActivate(ctx)).toThrow();
  });
});
