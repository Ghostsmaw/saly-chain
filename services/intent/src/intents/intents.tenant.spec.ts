import { describe, expect, it, vi } from 'vitest';
import { runWithTenant } from '@salychain/sdk-internal';
import { IntentsService } from './intents.service.js';

/**
 * Tenant isolation for intent reads. We construct the service with a fake
 * Prisma layer and only exercise the read paths, which depend solely on the
 * propagated org context.
 */
function serviceWith(records: Array<{ intentId: string; orgId: string | null }>) {
  const prisma = {
    intentRecord: {
      findMany: vi.fn(async ({ where }: { where: { orgId?: string } }) => {
        return records.filter((r) => (where.orgId ? r.orgId === where.orgId : true));
      }),
      findUnique: vi.fn(async ({ where }: { where: { intentId: string } }) => {
        return records.find((r) => r.intentId === where.intentId) ?? null;
      }),
    },
  };
  const svc = new IntentsService(prisma as never, {} as never, {} as never, {} as never);
  return { svc, prisma };
}

describe('IntentsService tenant isolation', () => {
  const records = [
    { intentId: 'itn_a', orgId: 'org_a' },
    { intentId: 'itn_b', orgId: 'org_b' },
    { intentId: 'itn_legacy', orgId: null },
  ];

  it('list scopes results to the active org', async () => {
    const { svc } = serviceWith(records);
    const rows = await runWithTenant({ orgId: 'org_a' }, () => svc.list({ limit: 50 }));
    expect(rows.map((r) => r.intentId)).toEqual(['itn_a']);
  });

  it('list returns everything when no org context (consumer/internal)', async () => {
    const { svc } = serviceWith(records);
    const rows = await svc.list({ limit: 50 });
    expect(rows).toHaveLength(3);
  });

  it('getById returns the record for the owning org', async () => {
    const { svc } = serviceWith(records);
    const row = await runWithTenant({ orgId: 'org_a' }, () => svc.getById('itn_a'));
    expect(row?.intentId).toBe('itn_a');
  });

  it('getById hides another org record as not-found', async () => {
    const { svc } = serviceWith(records);
    const row = await runWithTenant({ orgId: 'org_a' }, () => svc.getById('itn_b'));
    expect(row).toBeNull();
  });

  it('getById hides null-org (non-tenant) records from an org caller', async () => {
    const { svc } = serviceWith(records);
    const row = await runWithTenant({ orgId: 'org_a' }, () => svc.getById('itn_legacy'));
    expect(row).toBeNull();
  });
});
