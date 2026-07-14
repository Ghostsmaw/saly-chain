import { Inject, Injectable } from '@nestjs/common';
import { ConflictError, NotFoundError, ValidationError } from '@salychain/errors';
import { EventBus, SUBJECTS } from '@salychain/events';
import { ExecutionClient } from '@salychain/sdk-internal';
import { getTenantOrgId } from '@salychain/sdk-internal';
import { PrismaService } from '../prisma/prisma.service.js';
import { EVENT_BUS } from '../events/events.module.js';
import { EXECUTION_CLIENT } from '../clients/clients.module.js';

export interface CreateRedeemRequestInput {
  idempotency_key: string;
  amount_minor: string;
  source_wallet_id: string;
  payout_rail: 'FIAT' | 'INTERNAL';
  chain?: 'SALY_L3' | 'BASE';
  payout?: {
    currency?: string;
    country_code?: string;
    account_number?: string;
    bank_code?: string;
    holder_name?: string;
  };
}

@Injectable()
export class RedeemService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(EVENT_BUS) private readonly events: EventBus,
    @Inject(EXECUTION_CLIENT) private readonly execution: ExecutionClient,
  ) {}

  async create(input: CreateRedeemRequestInput) {
    const orgId = getTenantOrgId();
    if (!orgId) {
      throw ValidationError('stablecoin.tenant.required', 'Org context required for redeem requests');
    }

    const existing = await this.prisma.redeemRequest.findUnique({
      where: { idempotencyKey: input.idempotency_key },
    });
    if (existing) {
      if (existing.orgId !== orgId) {
        throw NotFoundError('stablecoin.redeem.not_found', 'Redeem request not found');
      }
      return existing;
    }

    const amount = BigInt(input.amount_minor);
    if (amount <= 0n) {
      throw ValidationError('stablecoin.redeem.invalid_amount', 'amount_minor must be positive');
    }

    const row = await this.prisma.redeemRequest.create({
      data: {
        orgId,
        idempotencyKey: input.idempotency_key,
        amountMinor: amount,
        sourceWalletId: input.source_wallet_id,
        payoutRail: input.payout_rail,
        chain: input.chain ?? 'SALY_L3',
        ...(input.payout ? { metadata: { payout: input.payout } } : {}),
      },
    });

    await this.events.publish(SUBJECTS.STABLECOIN_REDEEM_REQUESTED, {
      org_id: orgId,
      chain: row.chain,
      currency: 'SALYSD',
      redeem_request_id: row.id,
      amount_minor: row.amountMinor.toString(),
      source_wallet_id: row.sourceWalletId,
      payout_rail: input.payout_rail,
    } as never);

    return row;
  }

  async approve(id: string) {
    const orgId = getTenantOrgId();
    const row = await this.prisma.redeemRequest.findUnique({ where: { id } });
    if (!row || (orgId && row.orgId !== orgId)) {
      throw NotFoundError('stablecoin.redeem.not_found', 'Redeem request not found');
    }
    if (row.status !== 'PENDING' && row.status !== 'APPROVED') {
      throw ConflictError('stablecoin.redeem.invalid_status', `Cannot approve redeem in status ${row.status}`);
    }
    if (row.executionTransactionId) {
      return row;
    }

    const tx = await this.execution.salysdRedeem({
      idempotencyKey: `redeem:${row.id}`,
      redeemRequestId: row.id,
      sourceWalletId: row.sourceWalletId,
      amountMinor: row.amountMinor.toString(),
    });

    return this.prisma.redeemRequest.update({
      where: { id: row.id },
      data: {
        status: 'BURNING',
        executionTransactionId: tx.id,
      },
    });
  }

  async list(limit = 50) {
    const orgId = getTenantOrgId();
    if (!orgId) {
      throw ValidationError('stablecoin.tenant.required', 'Org context required');
    }
    return this.prisma.redeemRequest.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getById(id: string) {
    const orgId = getTenantOrgId();
    const row = await this.prisma.redeemRequest.findUnique({ where: { id } });
    if (!row || (orgId && row.orgId !== orgId)) {
      throw NotFoundError('stablecoin.redeem.not_found', 'Redeem request not found');
    }
    return row;
  }
}
