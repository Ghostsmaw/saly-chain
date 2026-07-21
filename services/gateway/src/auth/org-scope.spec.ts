import { describe, expect, it } from 'vitest';
import { enforceOrgScope } from './org-scope.js';
import type { AuthenticatedRequest, GatewayAuth } from './auth.types.js';

function reqWith(auth: Partial<GatewayAuth> | undefined): AuthenticatedRequest {
  return {
    auth: auth
      ? ({
          correlation_id: 'c1',
          auth_mode: 'api_key',
          principal_id: 'k1',
          scopes: [],
          rate_limit_per_min: 60,
          ...auth,
        } as GatewayAuth)
      : undefined,
  } as AuthenticatedRequest;
}

describe('enforceOrgScope', () => {
  it('returns the authenticated org when no org is claimed', () => {
    expect(enforceOrgScope(reqWith({ org_id: 'org_a' }))).toBe('org_a');
  });

  it('accepts a claimed org that matches the authenticated org', () => {
    expect(enforceOrgScope(reqWith({ org_id: 'org_a' }), 'org_a')).toBe('org_a');
  });

  it('rejects a claimed org that differs from the authenticated org', () => {
    expect(() => enforceOrgScope(reqWith({ org_id: 'org_a' }), 'org_b')).toThrowError(
      /org_id does not match/,
    );
  });

  it('rejects any claimed org when the principal has no org binding', () => {
    expect(() => enforceOrgScope(reqWith({}), 'org_b')).toThrowError(/cannot be honored/);
    expect(() => enforceOrgScope(reqWith(undefined), 'org_b')).toThrowError(/cannot be honored/);
  });

  it('returns undefined for org-less principals that claim nothing', () => {
    expect(enforceOrgScope(reqWith({}))).toBeUndefined();
  });

  it('ignores non-string claims', () => {
    expect(enforceOrgScope(reqWith({ org_id: 'org_a' }), 42)).toBe('org_a');
    expect(enforceOrgScope(reqWith({ org_id: 'org_a' }), '')).toBe('org_a');
  });
});
