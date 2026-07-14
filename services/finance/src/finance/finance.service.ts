import { Inject, Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { NotFoundError, ValidationError } from '@salychain/errors';
import type { CashflowType, InstrumentType, LoanStatus, Prisma } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { FINANCE_ENV, type FinanceEnv } from '../config/env.js';

@Injectable()
export class FinanceService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(FINANCE_ENV) private readonly env: FinanceEnv,
  ) {}

  private id(suffix?: string) {
    return `${this.env.ID_PREFIX}${ulid()}${suffix ?? ''}`;
  }

  async createInstrument(input: {
    orgId: string;
    type: InstrumentType;
    name: string;
    issuerRef: string;
    currency: string;
    terms?: Record<string, unknown>;
    tokenId?: string;
  }) {
    return this.prisma.instrument.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        type: input.type,
        name: input.name,
        issuerRef: input.issuerRef,
        currency: input.currency.toUpperCase(),
        terms: input.terms !== undefined ? (input.terms as Prisma.InputJsonValue) : undefined,
        tokenId: input.tokenId ?? null,
      },
    });
  }

  async listInstruments(orgId: string, limit = 50) {
    const rows = await this.prisma.instrument.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        ...row,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async upsertHolding(input: {
    orgId: string;
    accountRef: string;
    instrumentId: string;
    unitsMinor: string;
  }) {
    const instrument = await this.prisma.instrument.findFirst({
      where: { id: input.instrumentId, orgId: input.orgId },
    });
    if (!instrument) throw NotFoundError('finance.instrument.not_found', 'Instrument not found');

    const units = BigInt(input.unitsMinor);
    if (units < 0n) throw ValidationError('finance.units.invalid', 'units_minor must be non-negative');

    return this.prisma.holding.upsert({
      where: {
        orgId_accountRef_instrumentId: {
          orgId: input.orgId,
          accountRef: input.accountRef,
          instrumentId: input.instrumentId,
        },
      },
      create: {
        id: this.id(),
        orgId: input.orgId,
        accountRef: input.accountRef,
        instrumentId: input.instrumentId,
        unitsMinor: units,
      },
      update: { unitsMinor: units },
    });
  }

  async listHoldings(orgId: string, accountRef?: string) {
    const rows = await this.prisma.holding.findMany({
      where: { orgId, ...(accountRef ? { accountRef } : {}) },
      include: { instrument: true },
    });
    return {
      data: rows.map((row) => ({
        ...row,
        unitsMinor: row.unitsMinor.toString(),
        instrument: row.instrument
          ? { ...row.instrument, createdAt: row.instrument.createdAt.toISOString() }
          : null,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      })),
    };
  }

  async listLoans(orgId: string, limit = 50) {
    const rows = await this.prisma.loan.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        instrumentId: row.instrumentId,
        borrowerRef: row.borrowerRef,
        principalMinor: row.principalMinor.toString(),
        rateBps: row.rateBps,
        collateralRef: row.collateralRef,
        currency: row.currency,
        status: row.status,
        intentId: row.intentId,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async originateLoan(input: {
    orgId: string;
    borrowerRef: string;
    principalMinor: string;
    rateBps: number;
    currency: string;
    instrumentId?: string;
    collateralRef?: string;
    intentId?: string;
  }) {
    if (BigInt(input.principalMinor) <= 0n) {
      throw ValidationError('finance.loan.amount', 'principal_minor must be positive');
    }
    return this.prisma.loan.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        borrowerRef: input.borrowerRef,
        principalMinor: BigInt(input.principalMinor),
        rateBps: input.rateBps,
        currency: input.currency.toUpperCase(),
        instrumentId: input.instrumentId ?? null,
        collateralRef: input.collateralRef ?? null,
        intentId: input.intentId ?? null,
      },
    });
  }

  async repayLoan(orgId: string, loanId: string, intentId?: string) {
    const loan = await this.prisma.loan.findFirst({ where: { id: loanId, orgId } });
    if (!loan) throw NotFoundError('finance.loan.not_found', 'Loan not found');
    if (loan.status !== 'ACTIVE') {
      throw ValidationError('finance.loan.status', `Loan is ${loan.status}`);
    }
    return this.prisma.loan.update({
      where: { id: loanId },
      data: { status: 'REPAID' as LoanStatus, intentId: intentId ?? loan.intentId },
    });
  }

  async scheduleCashflow(input: {
    orgId: string;
    instrumentId: string;
    type: CashflowType;
    amountMinor: string;
    currency: string;
    scheduledAt: string;
  }) {
    return this.prisma.cashflow.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        instrumentId: input.instrumentId,
        type: input.type,
        amountMinor: BigInt(input.amountMinor),
        currency: input.currency.toUpperCase(),
        scheduledAt: new Date(input.scheduledAt),
      },
    });
  }

  async runCashflows(orgId: string, instrumentId: string, batchIntentId: string) {
    const due = await this.prisma.cashflow.findMany({
      where: { orgId, instrumentId, executedAt: null, scheduledAt: { lte: new Date() } },
    });
    if (!due.length) return { data: [], batch_intent_id: batchIntentId };

    await this.prisma.cashflow.updateMany({
      where: { id: { in: due.map((c) => c.id) } },
      data: { executedAt: new Date(), batchIntentId },
    });
    return { data: due, batch_intent_id: batchIntentId };
  }

  async createDvp(input: {
    orgId: string;
    buyerRef: string;
    sellerRef: string;
    instrumentId: string;
    unitsMinor: string;
    priceMinor: string;
    currency: string;
  }) {
    return this.prisma.dvpTrade.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        buyerRef: input.buyerRef,
        sellerRef: input.sellerRef,
        instrumentId: input.instrumentId,
        unitsMinor: BigInt(input.unitsMinor),
        priceMinor: BigInt(input.priceMinor),
        currency: input.currency.toUpperCase(),
      },
    });
  }

  async fundDvpEscrow(orgId: string, tradeId: string, escrowIntentId: string) {
    const trade = await this.prisma.dvpTrade.findFirst({ where: { id: tradeId, orgId } });
    if (!trade) throw NotFoundError('finance.dvp.not_found', 'DvP trade not found');
    return this.prisma.dvpTrade.update({
      where: { id: tradeId },
      data: { status: 'ESCROW_FUNDED', escrowIntentId },
    });
  }
}
