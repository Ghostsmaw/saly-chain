import { Injectable } from '@nestjs/common';
import { Prisma, Transaction, TransactionKind } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotFoundError } from '@salychain/errors';

export interface CreateTransactionInput {
  kind: TransactionKind;
  externalRef?: string;
  intentId?: string;
  metadata?: Record<string, unknown>;
}

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateTransactionInput): Promise<Transaction> {
    return this.prisma.transaction.create({
      data: {
        kind: input.kind,
        externalRef: input.externalRef ?? null,
        intentId: input.intentId ?? null,
        metadata: (input.metadata as Prisma.InputJsonValue | undefined) ?? Prisma.DbNull,
      },
    });
  }

  async findById(id: string): Promise<Transaction> {
    const tx = await this.prisma.transaction.findUnique({
      where: { id },
      include: { journalEntries: true },
    });
    if (!tx) throw NotFoundError('ledger.transaction.not_found', `Transaction ${id} not found`);
    return tx;
  }

  toResponse(tx: Transaction) {
    return {
      id: tx.id,
      external_ref: tx.externalRef,
      kind: tx.kind,
      intent_id: tx.intentId,
      created_at: tx.createdAt.toISOString(),
    };
  }
}
