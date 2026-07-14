import { describe, expect, it, vi } from 'vitest';
import { runWithTenant } from '@salychain/sdk-internal';
import { TransactionsService } from './transactions.service.js';

/**
 * Tenant isolation for execution reads. We build the service with a fake Prisma
 * and stub the remaining (unused) dependencies — `getById` only touches Prisma
 * and the propagated org context.
 */
function serviceWith(records: Array<{ id: string; orgId: string | null }>) {
  const prisma = {
    executionTransaction: {
      findUnique: vi.fn(async ({ where }: { where: { id: string } }) => {
        const found = records.find((r) => r.id === where.id);
        return found ? { ...found, events: [] } : null;
      }),
    },
  };
  const stub = undefined as never;
  const svc = new TransactionsService(
    prisma as never,
    stub,
    stub,
    stub,
    stub,
    stub,
    stub,
    stub,
    stub,
    stub,
    stub,
    stub,
    stub,
    stub,
  );
  return svc;
}

describe('TransactionsService tenant isolation', () => {
  const records = [
    { id: 'tx_a', orgId: 'org_a' },
    { id: 'tx_b', orgId: 'org_b' },
    { id: 'tx_legacy', orgId: null },
  ];

  it('returns the transaction for the owning org', async () => {
    const svc = serviceWith(records);
    const tx = await runWithTenant({ orgId: 'org_a' }, () => svc.getById('tx_a'));
    expect(tx.id).toBe('tx_a');
  });

  it('hides another org transaction as not-found', async () => {
    const svc = serviceWith(records);
    await expect(runWithTenant({ orgId: 'org_a' }, () => svc.getById('tx_b'))).rejects.toThrow(
      /not found/i,
    );
  });

  it('hides null-org transactions from an org caller', async () => {
    const svc = serviceWith(records);
    await expect(runWithTenant({ orgId: 'org_a' }, () => svc.getById('tx_legacy'))).rejects.toThrow(
      /not found/i,
    );
  });

  it('returns any transaction when there is no org context', async () => {
    const svc = serviceWith(records);
    const tx = await svc.getById('tx_b');
    expect(tx.id).toBe('tx_b');
  });
});
