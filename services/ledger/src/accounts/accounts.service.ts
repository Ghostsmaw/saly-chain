import { Injectable } from '@nestjs/common';
import { Account, Prisma } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ConflictError, ErrorCodes, NotFoundError } from '@salychain/errors';
import { CreateAccountDto } from './dto.js';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAccountDto): Promise<Account> {
    try {
      return await this.prisma.account.create({
        data: {
          code: dto.code,
          type: dto.type,
          currency: dto.currency,
          ownerId: dto.ownerId ?? null,
          ownerKind: dto.ownerKind ?? null,
          metadata: (dto.metadata as Prisma.InputJsonValue | undefined) ?? Prisma.DbNull,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        throw ConflictError(
          'ledger.account.code_conflict',
          `Account with code "${dto.code}" already exists`,
        );
      }
      throw err;
    }
  }

  async findById(id: string): Promise<Account> {
    const account = await this.prisma.account.findUnique({ where: { id } });
    if (!account) throw NotFoundError(ErrorCodes.LEDGER_ACCOUNT_NOT_FOUND, `Account ${id} not found`);
    return account;
  }

  async findByCode(code: string): Promise<Account> {
    const account = await this.prisma.account.findUnique({ where: { code } });
    if (!account)
      throw NotFoundError(ErrorCodes.LEDGER_ACCOUNT_NOT_FOUND, `Account code "${code}" not found`);
    return account;
  }

  async listByOwner(input: {
    ownerKind: string;
    ownerId: string;
    currency?: string;
  }): Promise<Account[]> {
    return this.prisma.account.findMany({
      where: {
        ownerKind: input.ownerKind,
        ownerId: input.ownerId,
        status: 'ACTIVE',
        ...(input.currency ? { currency: input.currency.toUpperCase() } : {}),
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  /**
   * Authoritative balance: sums postings from the immutable ledger rather than
   * trusting the denormalized cache. Used by reconciliation and by any
   * read path that requires strong correctness guarantees.
   */
  async authoritativeBalance(accountId: string): Promise<bigint> {
    const rows = await this.prisma.posting.groupBy({
      by: ['direction'],
      where: { accountId, journalEntry: { status: 'POSTED' } },
      _sum: { amountMinor: true },
    });
    const debits = rows.find((r) => r.direction === 'DEBIT')?._sum.amountMinor ?? 0n;
    const credits = rows.find((r) => r.direction === 'CREDIT')?._sum.amountMinor ?? 0n;
    const account = await this.findById(accountId);
    // For asset/expense accounts: balance = debits - credits.
    // For liability/equity/revenue accounts: balance = credits - debits.
    const debitNormal = account.type === 'ASSET' || account.type === 'EXPENSE';
    return debitNormal ? debits - credits : credits - debits;
  }

  toResponse(account: Account) {
    return {
      id: account.id,
      code: account.code,
      type: account.type,
      currency: account.currency,
      balance_minor: account.balanceMinor.toString(),
      status: account.status,
      owner_id: account.ownerId ?? undefined,
      owner_kind: account.ownerKind ?? undefined,
      created_at: account.createdAt.toISOString(),
    };
  }
}
