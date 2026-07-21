/**
 * Unit tests for the posting engine. These tests use a mock PrismaService so
 * they execute without a real database; a full integration suite that runs
 * against a Postgres test container lives in `test/e2e/journal.e2e.spec.ts`
 * and exercises the deferred CONSTRAINT TRIGGER.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JournalService } from './journal.service.js';
import { isSalyChainError } from '@salychain/errors';

/** Assert the rejected value is a SalyChainError with the given code & category. */
async function expectDomainError(
  promise: Promise<unknown>,
  expected: { code?: string; category?: string },
) {
  await expect(promise).rejects.toSatisfy((err: unknown) => {
    if (!isSalyChainError(err)) return false;
    if (expected.code && err.code !== expected.code) return false;
    if (expected.category && err.category !== expected.category) return false;
    return true;
  });
}

interface MockAccount {
  id: string;
  type: 'ASSET' | 'LIABILITY';
  currency: string;
  status: 'ACTIVE' | 'FROZEN';
  balanceMinor: bigint;
  metadata: Record<string, unknown> | null;
}

function makePrismaMock(accounts: MockAccount[]) {
  const accountMap = new Map(accounts.map((a) => [a.id, { ...a }]));
  const journalEntries: any[] = [];
  const postings: any[] = [];
  const audit: any[] = [];
  const queryRawCalls: Array<{ values?: string[] }> = [];

  return {
    accountMap,
    journalEntries,
    postings,
    audit,
    queryRawCalls,
    prisma: {
      journalEntry: {
        findUnique: vi.fn(async ({ where }: any) => {
          if (where.idempotencyKey) {
            const entry = journalEntries.find((e) => e.idempotencyKey === where.idempotencyKey);
            if (!entry) return null;
            return { ...entry, postings: postings.filter((p) => p.journalEntryId === entry.id) };
          }
          return null;
        }),
      },
      $transaction: vi.fn(async (fn: any) => fn({
        // `SELECT ... FOR UPDATE`, simulated: the real query embeds each
        // requested account id as a bound parameter, exposed on `.values`
        // by Prisma's `sql` template tag.
        $queryRaw: vi.fn(async (query: { values?: string[] }) => {
          queryRawCalls.push(query);
          const ids = query.values ?? [];
          return ids
            .map((id) => accountMap.get(id))
            .filter((a): a is MockAccount => Boolean(a))
            .map((a) => ({
              id: a.id,
              code: a.id,
              type: a.type,
              currency: a.currency,
              owner_id: null,
              owner_kind: null,
              status: a.status,
              balance_minor: a.balanceMinor,
              metadata: a.metadata,
              created_at: new Date(),
              updated_at: new Date(),
            }));
        }),
        account: {
          findMany: vi.fn(async ({ where }: any) =>
            (where.id.in as string[]).map((id) => accountMap.get(id)).filter(Boolean),
          ),
          update: vi.fn(async ({ where, data }: any) => {
            const acc = accountMap.get(where.id)!;
            acc.balanceMinor += data.balanceMinor.increment as bigint;
            return acc;
          }),
        },
        journalEntry: {
          create: vi.fn(async ({ data }: any) => {
            const entry = {
              id: `je_${journalEntries.length + 1}`,
              ...data,
              postings: [],
              postedAt: null,
            };
            journalEntries.push(entry);
            return entry;
          }),
          update: vi.fn(async ({ where, data, include }: any) => {
            const entry = journalEntries.find((e) => e.id === where.id)!;
            Object.assign(entry, data);
            return include?.postings
              ? { ...entry, postings: postings.filter((p) => p.journalEntryId === entry.id) }
              : entry;
          }),
        },
        posting: {
          createMany: vi.fn(async ({ data }: any) => {
            for (const p of data) {
              postings.push({ id: `p_${postings.length + 1}`, ...p });
            }
            return { count: data.length };
          }),
        },
        auditLog: { create: vi.fn(async ({ data }: any) => audit.push(data)) },
      })),
    },
  };
}

describe('JournalService.post', () => {
  let cashAsset: MockAccount;
  let userLiability: MockAccount;
  let walletAsset: MockAccount;

  beforeEach(() => {
    cashAsset = {
      id: 'acc-cash',
      type: 'ASSET',
      currency: 'USD',
      status: 'ACTIVE',
      balanceMinor: 1_000_000n, // $10,000.00
      metadata: null,
    };
    userLiability = {
      id: 'acc-user',
      type: 'LIABILITY',
      currency: 'USD',
      status: 'ACTIVE',
      balanceMinor: 0n,
      metadata: null,
    };
    walletAsset = {
      id: 'acc-wallet',
      type: 'ASSET',
      currency: 'USD',
      status: 'ACTIVE',
      balanceMinor: 0n,
      metadata: null,
    };
  });

  it('posts a balanced two-leg entry and updates balances', async () => {
    const { prisma, accountMap, postings } = makePrismaMock([cashAsset, userLiability]);
    const svc = new JournalService(prisma as any);

    const entry = await svc.post({
      idempotency_key: 'idem-1',
      postings: [
        { account_id: cashAsset.id, direction: 'DEBIT', amount_minor: '5000', currency: 'USD' },
        { account_id: userLiability.id, direction: 'CREDIT', amount_minor: '5000', currency: 'USD' },
      ],
    });

    expect(entry.status).toBe('POSTED');
    expect(postings.length).toBe(2);
    expect(accountMap.get('acc-cash')!.balanceMinor).toBe(1_005_000n); // asset +debit
    expect(accountMap.get('acc-user')!.balanceMinor).toBe(5_000n);     // liability +credit
  });

  it('rejects an unbalanced entry before touching the DB', async () => {
    const { prisma } = makePrismaMock([cashAsset, userLiability]);
    const svc = new JournalService(prisma as any);

    await expectDomainError(
      svc.post({
        idempotency_key: 'idem-bad',
        postings: [
          { account_id: cashAsset.id, direction: 'DEBIT', amount_minor: '5000', currency: 'USD' },
          { account_id: userLiability.id, direction: 'CREDIT', amount_minor: '4999', currency: 'USD' },
        ],
      }),
      { code: 'ledger.entry.unbalanced', category: 'VALIDATION' },
    );
  });

  it('blocks negative balances on asset accounts', async () => {
    const { prisma } = makePrismaMock([walletAsset, userLiability]);
    const svc = new JournalService(prisma as any);

    await expectDomainError(
      svc.post({
        idempotency_key: 'idem-overdraft',
        postings: [
          { account_id: walletAsset.id, direction: 'CREDIT', amount_minor: '1', currency: 'USD' },
          { account_id: userLiability.id, direction: 'DEBIT', amount_minor: '1', currency: 'USD' },
        ],
      }),
      { code: 'ledger.account.insufficient_funds', category: 'INSUFFICIENT_FUNDS' },
    );
  });

  it('is idempotent under retry with the same body', async () => {
    const { prisma, accountMap } = makePrismaMock([cashAsset, userLiability]);
    const svc = new JournalService(prisma as any);

    const body = {
      idempotency_key: 'idem-retry',
      postings: [
        { account_id: cashAsset.id, direction: 'DEBIT' as const, amount_minor: '100', currency: 'USD' },
        { account_id: userLiability.id, direction: 'CREDIT' as const, amount_minor: '100', currency: 'USD' },
      ],
    };
    const first = await svc.post(body);
    const second = await svc.post(body);
    expect(second.id).toBe(first.id);
    // The mock clones accounts into accountMap; assert on the engine-updated copy.
    expect(accountMap.get(cashAsset.id)!.balanceMinor).toBe(1_000_100n); // not double-applied
  });

  it('rejects same idempotency key with different body', async () => {
    const { prisma } = makePrismaMock([cashAsset, userLiability]);
    const svc = new JournalService(prisma as any);

    await svc.post({
      idempotency_key: 'idem-conflict',
      postings: [
        { account_id: cashAsset.id, direction: 'DEBIT', amount_minor: '100', currency: 'USD' },
        { account_id: userLiability.id, direction: 'CREDIT', amount_minor: '100', currency: 'USD' },
      ],
    });

    await expectDomainError(
      svc.post({
        idempotency_key: 'idem-conflict',
        postings: [
          { account_id: cashAsset.id, direction: 'DEBIT', amount_minor: '200', currency: 'USD' },
          { account_id: userLiability.id, direction: 'CREDIT', amount_minor: '200', currency: 'USD' },
        ],
      }),
      { code: 'ledger.entry.idempotency_conflict', category: 'CONFLICT' },
    );
  });

  it('locks every involved account with SELECT ... FOR UPDATE before checking solvency', async () => {
    const { prisma, queryRawCalls } = makePrismaMock([cashAsset, userLiability]);
    const svc = new JournalService(prisma as any);

    await svc.post({
      idempotency_key: 'idem-lock',
      postings: [
        { account_id: cashAsset.id, direction: 'DEBIT', amount_minor: '100', currency: 'USD' },
        { account_id: userLiability.id, direction: 'CREDIT', amount_minor: '100', currency: 'USD' },
      ],
    });

    expect(queryRawCalls).toHaveLength(1);
    expect(queryRawCalls[0]?.values?.slice().sort()).toEqual(
      [cashAsset.id, userLiability.id].sort(),
    );
  });

  it('locks accounts in sorted id order to avoid cross-entry deadlocks', async () => {
    // Postings listed high-id first; lock acquisition must still sort.
    const high = { ...userLiability, id: 'acct_zzzz' };
    const low = { ...cashAsset, id: 'acct_aaaa' };
    const { prisma, queryRawCalls } = makePrismaMock([high, low]);
    const svc = new JournalService(prisma as any);

    await svc.post({
      idempotency_key: 'idem-lock-order',
      postings: [
        { account_id: high.id, direction: 'CREDIT', amount_minor: '50', currency: 'USD' },
        { account_id: low.id, direction: 'DEBIT', amount_minor: '50', currency: 'USD' },
      ],
    });

    expect(queryRawCalls[0]?.values).toEqual([low.id, high.id].sort());
  });

  it('refuses postings on a frozen account', async () => {
    cashAsset.status = 'FROZEN';
    const { prisma } = makePrismaMock([cashAsset, userLiability]);
    const svc = new JournalService(prisma as any);

    await expectDomainError(
      svc.post({
        idempotency_key: 'idem-frozen',
        postings: [
          { account_id: cashAsset.id, direction: 'DEBIT', amount_minor: '100', currency: 'USD' },
          { account_id: userLiability.id, direction: 'CREDIT', amount_minor: '100', currency: 'USD' },
        ],
      }),
      { code: 'ledger.account.frozen', category: 'CONFLICT' },
    );
  });
});
