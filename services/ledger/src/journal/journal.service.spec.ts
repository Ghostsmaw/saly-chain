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

  return {
    accountMap,
    journalEntries,
    postings,
    audit,
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
