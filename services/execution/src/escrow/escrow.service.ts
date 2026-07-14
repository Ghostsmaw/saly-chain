import { Inject, Injectable, Logger } from '@nestjs/common';
import { BaseChainAdapter, ESCROW_DEAL_STATUS, escrowStatusLabel, isEscrowDealId } from '@salychain/chain-base';
import { NotFoundError, ValidationError } from '@salychain/errors';
import { loadEnv } from '@salychain/config';
import type { Address, Hex } from 'viem';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/index.js';
import { WALLET_CLIENT } from '../clients/clients.module.js';
import type { WalletClient } from '@salychain/sdk-internal';
import { executionEnvSchema } from '../config/env.js';

export interface EscrowDealDto {
  id: string;
  deal_id: string;
  transaction_id?: string;
  status: string;
  payer: string;
  payee: string;
  token: string;
  amount_minor: string;
  deadline: string;
  escrow_contract: string;
  fund_tx_hash?: string;
  resolve_tx_hash?: string;
  resolution?: string;
  condition?: unknown;
  funded_at?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
  events: Array<{
    type: string;
    tx_hash?: string;
    detail?: unknown;
    occurred_at: string;
  }>;
}

@Injectable()
export class EscrowService {
  private readonly logger = new Logger(EscrowService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(WALLET_CLIENT) private readonly wallet: WalletClient,
  ) {}

  async upsertFundingDeal(input: {
    dealId: string;
    transactionId: string;
    payer: string;
    payee: string;
    token: string;
    amountMinor: bigint;
    deadline: bigint;
    escrowContract: string;
    condition?: unknown;
    fundTxHash?: string;
  }) {
    const deal = await this.prisma.escrowDeal.upsert({
      where: { dealId: input.dealId },
      create: {
        dealId: input.dealId,
        transactionId: input.transactionId,
        status: 'FUNDING',
        payer: input.payer,
        payee: input.payee,
        token: input.token,
        amountMinor: input.amountMinor,
        deadline: input.deadline,
        escrowContract: input.escrowContract,
        condition: input.condition as object | undefined,
        fundTxHash: input.fundTxHash,
      },
      update: {
        transactionId: input.transactionId,
        fundTxHash: input.fundTxHash ?? undefined,
      },
    });

    await this.appendEvent(deal.id, 'FUNDING_STARTED', {
      transaction_id: input.transactionId,
    });

    return deal;
  }

  async markFunded(input: {
    dealId: string;
    txHash: string;
    blockNumber?: number;
  }) {
    const deal = await this.prisma.escrowDeal.findUnique({ where: { dealId: input.dealId } });
    if (!deal) return null;
    if (deal.status === 'RELEASED' || deal.status === 'REFUNDED') return deal;

    const updated = await this.prisma.escrowDeal.update({
      where: { id: deal.id },
      data: {
        status: 'FUNDED',
        fundTxHash: input.txHash,
        fundedAt: new Date(),
      },
    });

    await this.appendEvent(updated.id, 'FUNDED', {
      block_number: input.blockNumber,
    }, input.txHash);

    return updated;
  }

  async releaseDeal(dealId: string, actor?: string) {
    return this.resolveDeal(dealId, 'RELEASE', actor);
  }

  async refundDeal(dealId: string, actor?: string) {
    return this.resolveDeal(dealId, 'REFUND', actor);
  }

  async listDeals(input?: { status?: string; limit?: number }) {
    const limit = Math.min(input?.limit ?? 50, 200);
    const rows = await this.prisma.escrowDeal.findMany({
      where: input?.status ? { status: input.status as never } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { events: { orderBy: { occurredAt: 'desc' }, take: 10 } },
    });
    return rows.map((row) => this.toDto(row));
  }

  async getDeal(dealId: string) {
    const row = await this.prisma.escrowDeal.findUnique({
      where: { dealId },
      include: { events: { orderBy: { occurredAt: 'asc' } } },
    });
    if (!row) throw NotFoundError('execution.escrow.deal_not_found', `Escrow deal ${dealId} not found`);
    return this.toDto(row);
  }

  async syncOnChainStatus(dealId: string) {
    const env = loadEnv(executionEnvSchema);
    if (!env.ESCROW_CONTRACT_ADDRESS_BASE) {
      throw ValidationError('execution.escrow_not_configured', 'ESCROW_CONTRACT_ADDRESS_BASE is not set');
    }
    if (!isEscrowDealId(dealId)) {
      throw ValidationError('execution.escrow.bad_deal_id', 'deal_id must be bytes32 hex');
    }

    const adapter = new BaseChainAdapter({
      network: env.BASE_NETWORK ?? 'base-sepolia',
      rpcUrl: env.BASE_RPC_URL ?? 'https://sepolia.base.org',
    });

    const onChain = await adapter.readEscrowDeal(
      env.ESCROW_CONTRACT_ADDRESS_BASE as Address,
      dealId as Hex,
    );

    const label = escrowStatusLabel(onChain.status);
    let row = await this.prisma.escrowDeal.findUnique({ where: { dealId } });

    if (!row && onChain.status !== ESCROW_DEAL_STATUS.NONE) {
      row = await this.prisma.escrowDeal.create({
        data: {
          dealId,
          status: label === 'FUNDED' ? 'FUNDED' : label === 'RELEASED' ? 'RELEASED' : label === 'REFUNDED' ? 'REFUNDED' : 'FUNDING',
          payer: onChain.payer,
          payee: onChain.payee,
          token: onChain.token,
          amountMinor: onChain.amount,
          deadline: onChain.deadline,
          escrowContract: env.ESCROW_CONTRACT_ADDRESS_BASE,
        },
      });
    } else if (row) {
      const nextStatus =
        onChain.status === ESCROW_DEAL_STATUS.RELEASED
          ? 'RELEASED'
          : onChain.status === ESCROW_DEAL_STATUS.REFUNDED
            ? 'REFUNDED'
            : onChain.status === ESCROW_DEAL_STATUS.FUNDED
              ? 'FUNDED'
              : row.status;

      row = await this.prisma.escrowDeal.update({
        where: { id: row.id },
        data: { status: nextStatus as never },
      });
    }

    return {
      deal_id: dealId,
      on_chain_status: label,
      deal: row ? this.toDto({ ...row, events: [] }) : null,
    };
  }

  async markReleased(input: { dealId: string; txHash: string; blockNumber?: number }) {
    return this.markResolved(input.dealId, 'RELEASED', 'RELEASE', input.txHash, input.blockNumber);
  }

  async markRefunded(input: { dealId: string; txHash: string; blockNumber?: number }) {
    return this.markResolved(input.dealId, 'REFUNDED', 'REFUND', input.txHash, input.blockNumber);
  }

  private async resolveDeal(dealId: string, action: 'RELEASE' | 'REFUND', actor?: string) {
    const env = loadEnv(executionEnvSchema);
    if (!env.ESCROW_CONTRACT_ADDRESS_BASE) {
      throw ValidationError('execution.escrow_not_configured', 'ESCROW_CONTRACT_ADDRESS_BASE is not set');
    }
    if (!env.ESCROW_RESOLVER_WALLET_ID) {
      throw ValidationError(
        'execution.escrow.resolver_not_configured',
        'ESCROW_RESOLVER_WALLET_ID must be set for admin release/refund',
      );
    }
    if (!isEscrowDealId(dealId)) {
      throw ValidationError('execution.escrow.bad_deal_id', 'deal_id must be bytes32 hex');
    }

    const deal = await this.prisma.escrowDeal.findUnique({ where: { dealId } });
    if (!deal) throw NotFoundError('execution.escrow.deal_not_found', `Escrow deal ${dealId} not found`);
    if (deal.status !== 'FUNDED') {
      throw ValidationError(
        'execution.escrow.invalid_status',
        `Deal is ${deal.status}; only FUNDED deals can be ${action === 'RELEASE' ? 'released' : 'refunded'}`,
      );
    }

    const adapter = new BaseChainAdapter({
      network: env.BASE_NETWORK ?? 'base-sepolia',
      rpcUrl: env.BASE_RPC_URL ?? 'https://sepolia.base.org',
    });
    const onChain = await adapter.readEscrowDeal(deal.escrowContract as Address, dealId as Hex);
    if (onChain.status !== ESCROW_DEAL_STATUS.FUNDED) {
      throw ValidationError(
        'execution.escrow.on_chain_not_funded',
        `On-chain deal status is ${escrowStatusLabel(onChain.status)}, expected FUNDED`,
      );
    }

    await this.appendEvent(deal.id, action === 'RELEASE' ? 'RELEASE_REQUESTED' : 'REFUND_REQUESTED', {
      actor: actor ?? 'admin',
    });

    const result = await this.wallet.resolveEscrow(
      {
        walletId: env.ESCROW_RESOLVER_WALLET_ID,
        dealId,
        action: action.toLowerCase() as 'release' | 'refund',
        escrowContract: deal.escrowContract,
      },
      env.EXECUTION_ADMIN_TOKEN
        ? { headers: { Authorization: `Bearer ${env.EXECUTION_ADMIN_TOKEN}` } }
        : undefined,
    );

    const updated = await this.prisma.escrowDeal.update({
      where: { id: deal.id },
      data: {
        resolveTxHash: result.tx_hash,
        resolution: action,
      },
    });

    await this.appendEvent(
      updated.id,
      action === 'RELEASE' ? 'RELEASE_BROADCAST' : 'REFUND_BROADCAST',
      { actor: actor ?? 'admin' },
      result.tx_hash,
    );

    this.logger.log(`escrow ${action.toLowerCase()} broadcast deal=${dealId} tx=${result.tx_hash}`);

    return {
      deal_id: dealId,
      action: action.toLowerCase(),
      tx_hash: result.tx_hash,
      status: updated.status,
      message: 'Resolution broadcast — awaiting chain confirmation',
    };
  }

  private async markResolved(
    dealId: string,
    status: 'RELEASED' | 'REFUNDED',
    resolution: 'RELEASE' | 'REFUND',
    txHash: string,
    blockNumber?: number,
  ) {
    const deal = await this.prisma.escrowDeal.findUnique({ where: { dealId } });
    if (!deal) return null;
    if (deal.status === status) return deal;

    const updated = await this.prisma.escrowDeal.update({
      where: { id: deal.id },
      data: {
        status,
        resolution,
        resolveTxHash: txHash,
        resolvedAt: new Date(),
      },
    });

    await this.appendEvent(
      updated.id,
      status,
      { block_number: blockNumber, confirmed_via: 'chain_listener' },
      txHash,
    );

    return updated;
  }

  private async appendEvent(
    dealRowId: string,
    type: string,
    detail?: Record<string, unknown>,
    txHash?: string,
  ) {
    await this.prisma.escrowDealEvent.create({
      data: {
        dealRowId,
        type,
        detail: detail ? (detail as Prisma.InputJsonValue) : undefined,
        txHash,
      },
    });
  }

  private toDto(row: {
    id: string;
    dealId: string;
    transactionId: string | null;
    status: string;
    payer: string;
    payee: string;
    token: string;
    amountMinor: bigint;
    deadline: bigint;
    escrowContract: string;
    fundTxHash: string | null;
    resolveTxHash: string | null;
    resolution: string | null;
    condition: unknown;
    fundedAt: Date | null;
    resolvedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    events: Array<{
      type: string;
      txHash: string | null;
      detail: unknown;
      occurredAt: Date;
    }>;
  }): EscrowDealDto {
    return {
      id: row.id,
      deal_id: row.dealId,
      transaction_id: row.transactionId ?? undefined,
      status: row.status,
      payer: row.payer,
      payee: row.payee,
      token: row.token,
      amount_minor: row.amountMinor.toString(),
      deadline: row.deadline.toString(),
      escrow_contract: row.escrowContract,
      fund_tx_hash: row.fundTxHash ?? undefined,
      resolve_tx_hash: row.resolveTxHash ?? undefined,
      resolution: row.resolution ?? undefined,
      condition: row.condition ?? undefined,
      funded_at: row.fundedAt?.toISOString(),
      resolved_at: row.resolvedAt?.toISOString(),
      created_at: row.createdAt.toISOString(),
      updated_at: row.updatedAt.toISOString(),
      events: row.events.map((e) => ({
        type: e.type,
        tx_hash: e.txHash ?? undefined,
        detail: e.detail ?? undefined,
        occurred_at: e.occurredAt.toISOString(),
      })),
    };
  }
}
