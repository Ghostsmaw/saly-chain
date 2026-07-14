import { describe, expect, it } from 'vitest';
import {
  getTenant,
  getTenantOrgId,
  runWithTenant,
  tenantContextMiddleware,
  HEADER_ORG_ID,
  HEADER_ENVIRONMENT,
} from './tenant-context.js';

describe('tenant-context', () => {
  it('has no ambient context outside runWithTenant', () => {
    expect(getTenant()).toBeUndefined();
    expect(getTenantOrgId()).toBeUndefined();
  });

  it('binds and exposes the context for the async subtree', async () => {
    const result = await runWithTenant({ orgId: 'org_a', environment: 'LIVE' }, async () => {
      expect(getTenantOrgId()).toBe('org_a');
      await Promise.resolve();
      // context survives await boundaries
      return getTenant();
    });
    expect(result).toEqual({ orgId: 'org_a', environment: 'LIVE' });
    // and is cleared afterwards
    expect(getTenant()).toBeUndefined();
  });

  it('isolates concurrent contexts', async () => {
    const [a, b] = await Promise.all([
      runWithTenant({ orgId: 'org_a' }, async () => {
        await new Promise((r) => setTimeout(r, 5));
        return getTenantOrgId();
      }),
      runWithTenant({ orgId: 'org_b' }, async () => getTenantOrgId()),
    ]);
    expect(a).toBe('org_a');
    expect(b).toBe('org_b');
  });

  it('middleware reads tenant headers into the context', () => {
    const req = {
      headers: { [HEADER_ORG_ID]: 'org_x', [HEADER_ENVIRONMENT]: 'TEST' },
    };
    let seen: string | undefined;
    tenantContextMiddleware(req, {}, () => {
      seen = getTenantOrgId();
    });
    expect(seen).toBe('org_x');
  });

  it('middleware binds nothing when headers are absent', () => {
    let seen: string | undefined = 'sentinel';
    tenantContextMiddleware({ headers: {} }, {}, () => {
      seen = getTenantOrgId();
    });
    expect(seen).toBeUndefined();
  });
});
