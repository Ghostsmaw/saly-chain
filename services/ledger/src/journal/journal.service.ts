import { Injectable, Logger } from '@nestjs/common';
import { Account, JournalEntry, Posting, Prisma } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  ConflictError,
  ErrorCodes,
  InsufficientFundsError,
  NotFoundError,
  ValidationError,
} from '@salychain/errors';
import { ledgerImbalanceDetectedTotal } from '@salychain/observability';
import { PostJournalEntryDto, PostingInputDto } from './dto.js';

/**
 * The posting engine: the only place in the system that mutates the ledger.
 *
 * Guarantees:
 *   1. Atomicity — postings are written and balances updated in one DB
 *      transaction. The DB-level CONSTRAINT TRIGGER additionally validates
 *      double-entry balance at COMMIT time as a defence in depth.
 *   2. Idempotency — submitting the same `idempotency_key` returns the
 *      original entry without re-posting. Different bodies under the same
 *      key raise a conflict.
 *   3. Currency safety — all postings in an entry must share a currency per
 *      side (we allow multi-currency entries to express FX, but each side
 *      must balance per currency).
 *   4. Account state — frozen/closed accounts cannot receive new postings.
 *   5. Insufficient funds — asset-normal accounts cannot go negative unless
 *      explicitly allowed via metadata.
 */
@Injectable()
export class JournalService {
  private readonly logger = new Logger(JournalService.name);

  constructor(private readonly prisma: PrismaService) {}

  async post(dto: PostJournalEntryDto): Promise<JournalEntry & { postings: Posting[] }> {
    this.validateShape(dto);

    // Idempotency check — fast path before opening a transaction.
    const existing = await this.prisma.journalEntry.findUnique({
      where: { idempotencyKey: dto.idempotency_key },
      include: { postings: true },
    });
    if (existing) {
      this.assertSameBody(existing, dto);
      return existing;
    }

    return await this.prisma.$transaction(async (tx) => {
      // Lock involved accounts to serialize concurrent posts on the same account.
      //
      // A plain `findMany` here would read balances via an unlocked snapshot:
      // two concurrent postings against the same account could both read the
      // pre-post balance, both pass the solvency check below, and both commit
      // — overdrawing the account past its allowed limit even though each
      // individual `increment` is atomic. `SELECT ... FOR UPDATE` blocks any
      // other transaction from reading/locking the same rows until this one
      // commits or rolls back, so the solvency check below always sees the
      // latest committed balance. Accounts are locked in a stable (id) order
      // across all callers to avoid lock-ordering deadlocks when two entries
      // touch overlapping account sets in different orders.
      const accountIds = Array.from(new Set(dto.postings.map((p) => p.account_id))).sort();
      const accounts = await this.lockAccountsForUpdate(tx, accountIds);
      const accountMap = new Map(accounts.map((a) => [a.id, a]));

      for (const id of accountIds) {
        if (!accountMap.has(id)) {
          throw NotFoundError(ErrorCodes.LEDGER_ACCOUNT_NOT_FOUND, `Account ${id} not found`);
        }
      }

      for (const acc of accounts) {
        if (acc.status !== 'ACTIVE') {
          throw ConflictError(
            ErrorCodes.LEDGER_ACCOUNT_FROZEN,
            `Account ${acc.id} is ${acc.status} and cannot receive postings`,
          );
        }
      }

      // Per-posting currency must match its account's currency.
      for (const posting of dto.postings) {
        const acc = accountMap.get(posting.account_id)!;
        if (acc.currency !== posting.currency) {
          throw ValidationError(
            ErrorCodes.LEDGER_CURRENCY_MISMATCH,
            `Posting currency ${posting.currency} does not match account ${acc.id} currency ${acc.currency}`,
          );
        }
      }

      // Compute the per-account balance deltas.
      const deltas = new Map<string, bigint>();
      for (const posting of dto.postings) {
        const acc = accountMap.get(posting.account_id)!;
        const amount = BigInt(posting.amount_minor);
        const debitNormal = acc.type === 'ASSET' || acc.type === 'EXPENSE';
        const delta =
          posting.direction === 'DEBIT'
            ? debitNormal
              ? amount
              : -amount
            : debitNormal
              ? -amount
              : amount;
        deltas.set(acc.id, (deltas.get(acc.id) ?? 0n) + delta);
      }

      // Solvency check: asset-normal accounts cannot go negative unless explicitly allowed.
      for (const [accountId, delta] of deltas) {
        const acc = accountMap.get(accountId)!;
        const debitNormal = acc.type === 'ASSET' || acc.type === 'EXPENSE';
        if (!debitNormal) continue;
        const allowNegative = (acc.metadata as { allow_negative?: boolean } | null)?.allow_negative === true;
        const projected = acc.balanceMinor + delta;
        if (projected < 0n && !allowNegative) {
          throw InsufficientFundsError(
            ErrorCodes.LEDGER_INSUFFICIENT_FUNDS,
            `Account ${acc.id} would go negative (current=${acc.balanceMinor}, delta=${delta})`,
          );
        }
      }

      // Per-currency balance check (defence in depth; the DB trigger will catch this too).
      this.assertBalanced(dto.postings);

      // 1) Insert the journal entry as PENDING.
      const entry = await tx.journalEntry.create({
        data: {
          idempotencyKey: dto.idempotency_key,
          transactionId: dto.transaction_id ?? null,
          memo: dto.memo ?? null,
          metadata: (dto.metadata as Prisma.InputJsonValue | undefined) ?? Prisma.DbNull,
          status: 'PENDING',
        },
      });

      // 2) Insert postings.
      await tx.posting.createMany({
        data: dto.postings.map((p) => ({
          journalEntryId: entry.id,
          accountId: p.account_id,
          direction: p.direction,
          amountMinor: BigInt(p.amount_minor),
          currency: p.currency,
        })),
      });

      // 3) Apply balance deltas atomically.
      for (const [accountId, delta] of deltas) {
        await tx.account.update({
          where: { id: accountId },
          data: { balanceMinor: { increment: delta } },
        });
      }

      // 4) Flip to POSTED. The deferred constraint trigger validates at COMMIT.
      const posted = await tx.journalEntry.update({
        where: { id: entry.id },
        data: { status: 'POSTED', postedAt: new Date() },
        include: { postings: true },
      });

      // 5) Audit.
      await tx.auditLog.create({
        data: {
          action: 'journal_entry.posted',
          subjectKind: 'JournalEntry',
          subjectId: posted.id,
          payload: { postings: dto.postings.length, idempotency_key: dto.idempotency_key },
        },
      });

      this.logger.log(`Posted journal entry ${posted.id} (${dto.postings.length} postings)`);
      return posted;
    });
  }

  /** Reverse a previously posted entry by inserting an offsetting entry. */
  async reverse(
    sourceId: string,
    idempotencyKey: string,
    memo?: string,
  ): Promise<JournalEntry & { postings: Posting[] }> {
    const source = await this.prisma.journalEntry.findUnique({
      where: { id: sourceId },
      include: { postings: true },
    });
    if (!source) throw NotFoundError('ledger.entry.not_found', `Journal entry ${sourceId} not found`);
    if (source.status !== 'POSTED')
      throw ConflictError('ledger.entry.not_posted', `Entry ${sourceId} is ${source.status}`);
    if (source.reversedById)
      throw ConflictError('ledger.entry.already_reversed', `Entry ${sourceId} already reversed`);

    const reversedPostings: PostingInputDto[] = source.postings.map((p) => ({
      account_id: p.accountId,
      direction: p.direction === 'DEBIT' ? 'CREDIT' : 'DEBIT',
      amount_minor: p.amountMinor.toString(),
      currency: p.currency,
    }));

    const reversal = await this.post({
      idempotency_key: idempotencyKey,
      transaction_id: source.transactionId ?? undefined,
      memo: memo ?? `Reversal of ${source.id}`,
      metadata: { reverses: source.id },
      postings: reversedPostings,
    });

    await this.prisma.$transaction([
      this.prisma.journalEntry.update({
        where: { id: source.id },
        data: { status: 'REVERSED', reversedById: reversal.id },
      }),
      this.prisma.journalEntry.update({
        where: { id: reversal.id },
        data: { reversesId: source.id },
      }),
    ]);

    return reversal;
  }

  async findById(id: string): Promise<JournalEntry & { postings: Posting[] }> {
    const entry = await this.prisma.journalEntry.findUnique({
      where: { id },
      include: { postings: true },
    });
    if (!entry) throw NotFoundError('ledger.entry.not_found', `Journal entry ${id} not found`);
    return entry;
  }

  toResponse(entry: JournalEntry & { postings: Posting[] }) {
    return {
      id: entry.id,
      idempotency_key: entry.idempotencyKey,
      status: entry.status,
      posted_at: entry.postedAt ? entry.postedAt.toISOString() : null,
      transaction_id: entry.transactionId,
      memo: entry.memo,
      postings: entry.postings.map((p) => ({
        id: p.id,
        account_id: p.accountId,
        direction: p.direction,
        amount_minor: p.amountMinor.toString(),
        currency: p.currency,
      })),
    };
  }

  // ─────────────────────── helpers ───────────────────────

  /**
   * Locks accounts with `SELECT ... FOR UPDATE` inside the caller's
   * transaction so their balances cannot be read or changed by any other
   * transaction until this one finishes. Returns full `Account` rows.
   *
   * `accountIds` MUST be pre-sorted by the caller so every concurrent
   * transaction acquires locks in the same order, preventing deadlocks.
   */
  private async lockAccountsForUpdate(
    tx: Prisma.TransactionClient,
    accountIds: string[],
  ): Promise<Account[]> {
    if (accountIds.length === 0) return [];
    const rows = await tx.$queryRaw<
      Array<{
        id: string;
        code: string;
        type: Account['type'];
        currency: string;
        owner_id: string | null;
        owner_kind: string | null;
        status: Account['status'];
        balance_minor: bigint | string;
        metadata: Prisma.JsonValue;
        created_at: Date;
        updated_at: Date;
      }>
    >(Prisma.sql`
      SELECT id, code, type, currency, owner_id, owner_kind, status,
             balance_minor, metadata, created_at, updated_at
      FROM accounts
      WHERE id IN (${Prisma.join(accountIds.map((id) => Prisma.sql`${id}::uuid`))})
      ORDER BY id ASC
      FOR UPDATE
    `);
    return rows.map((r) => ({
      id: r.id,
      code: r.code,
      type: r.type,
      currency: r.currency,
      ownerId: r.owner_id,
      ownerKind: r.owner_kind,
      status: r.status,
      balanceMinor: BigInt(r.balance_minor),
      metadata: r.metadata,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
  }

  private validateShape(dto: PostJournalEntryDto): void {
    if (dto.postings.length < 2) {
      throw ValidationError(
        ErrorCodes.LEDGER_ENTRY_UNBALANCED,
        'A journal entry requires at least 2 postings',
      );
    }
    for (const posting of dto.postings) {
      const value = BigInt(posting.amount_minor);
      if (value <= 0n) {
        throw ValidationError(
          ErrorCodes.LEDGER_ENTRY_UNBALANCED,
          `Posting amount must be positive (got ${posting.amount_minor})`,
        );
      }
    }
  }

  private assertBalanced(postings: PostingInputDto[]): void {
    const byCurrency = new Map<string, { debit: bigint; credit: bigint }>();
    for (const p of postings) {
      const bucket = byCurrency.get(p.currency) ?? { debit: 0n, credit: 0n };
      if (p.direction === 'DEBIT') bucket.debit += BigInt(p.amount_minor);
      else bucket.credit += BigInt(p.amount_minor);
      byCurrency.set(p.currency, bucket);
    }
    for (const [currency, { debit, credit }] of byCurrency) {
      if (debit !== credit) {
        // Page-worthy: a posting violated the double-entry invariant.
        ledgerImbalanceDetectedTotal.inc();
        throw ValidationError(
          ErrorCodes.LEDGER_ENTRY_UNBALANCED,
          `Journal entry unbalanced for ${currency}: debits=${debit} credits=${credit}`,
        );
      }
    }
  }

  private assertSameBody(
    existing: JournalEntry & { postings: Posting[] },
    dto: PostJournalEntryDto,
  ): void {
    if (existing.postings.length !== dto.postings.length) {
      throw ConflictError(
        ErrorCodes.LEDGER_IDEMPOTENCY_CONFLICT,
        `Idempotency key ${dto.idempotency_key} reused with a different body (posting count differs)`,
      );
    }
    const normalize = (
      postings: Array<{ accountId?: string; account_id?: string; direction: string; amountMinor?: bigint; amount_minor?: string; currency: string }>,
    ) =>
      postings
        .map((p) => {
          const accountId = p.accountId ?? p.account_id!;
          const amount = p.amountMinor !== undefined ? p.amountMinor.toString() : p.amount_minor!;
          return `${accountId}|${p.direction}|${amount}|${p.currency}`;
        })
        .sort()
        .join(',');
    if (normalize(existing.postings as never[]) !== normalize(dto.postings as never[])) {
      throw ConflictError(
        ErrorCodes.LEDGER_IDEMPOTENCY_CONFLICT,
        `Idempotency key ${dto.idempotency_key} reused with a different body`,
      );
    }
  }
}
