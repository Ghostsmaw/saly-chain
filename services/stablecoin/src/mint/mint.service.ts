import { Inject, Injectable } from '@nestjs/common';
import { ConflictError, NotFoundError, ValidationError } from '@salychain/errors';
import { EventBus, SUBJECTS } from '@salychain/events';
import { ExecutionClient, getTenantOrgId } from '@salychain/sdk-internal';
import { PrismaService } from '../prisma/prisma.service.js';
import { EVENT_BUS } from '../events/events.module.js';
import { EXECUTION_CLIENT } from '../clients/clients.module.js';
import { STABLECOIN_ENV, type StablecoinEnv } from '../config/env.js';
import type { ReserveAccount } from '../generated/prisma/index.js';

export interface CreateMintRequestInput {
  idempotency_key: string;
  amount_minor: string;
  chain?: 'SALY_L3' | 'BASE';
  destination_wallet_id?: string;
  destination_address?: string;
  reserve_account_id?: string;
}

@Injectable()
export class MintService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(EVENT_BUS) private readonly events: EventBus,
    @Inject(EXECUTION_CLIENT) private readonly execution: ExecutionClient,
    @Inject(STABLECOIN_ENV) private readonly env: StablecoinEnv,
  ) {}

  async create(input: CreateMintRequestInput) {
    const orgId = getTenantOrgId();
    if (!orgId) {
      throw ValidationError('stablecoin.tenant.required', 'Org context required for mint requests');
    }

    const existing = await this.prisma.mintRequest.findUnique({
      where: { idempotencyKey: input.idempotency_key },
    });
    if (existing) {
      if (existing.orgId !== orgId) {
        throw NotFoundError('stablecoin.mint.not_found', 'Mint request not found');
      }
      return existing;
    }

    const amount = BigInt(input.amount_minor);
    if (amount <= 0n) {
      throw ValidationError('stablecoin.mint.invalid_amount', 'amount_minor must be positive');
    }
    if (!input.destination_wallet_id && !input.destination_address) {
      throw ValidationError(
        'stablecoin.mint.destination_required',
        'destination_wallet_id or destination_address required',
      );
    }

    const reserveId = input.reserve_account_id ?? this.env.STABLECOIN_DEFAULT_RESERVE_ACCOUNT_ID;
    if (!reserveId) {
      throw ValidationError(
        'stablecoin.mint.reserve_required',
        'reserve_account_id required until default reserve is configured',
      );
    }

    const reserve = await this.prisma.reserveAccount.findUnique({ where: { id: reserveId } });
    if (!reserve) {
      throw NotFoundError('stablecoin.reserve.not_found', 'Reserve account not found');
    }

    this.assertReserveAttestationFresh(reserve);

    const headroom = reserve.authorizedCeilingMinor - reserve.balanceMinor;
    if (amount > headroom) {
      throw ConflictError(
        'stablecoin.mint.insufficient_reserve_headroom',
        `Requested ${amount} exceeds reserve headroom ${headroom}`,
      );
    }

    const row = await this.prisma.mintRequest.create({
      data: {
        orgId,
        idempotencyKey: input.idempotency_key,
        amountMinor: amount,
        chain: input.chain ?? 'SALY_L3',
        reserveAccountId: reserveId,
        destinationWalletId: input.destination_wallet_id ?? null,
        destinationAddress: input.destination_address ?? null,
      },
    });

    await this.events.publish(SUBJECTS.STABLECOIN_MINT_REQUESTED, {
      org_id: orgId,
      chain: row.chain,
      currency: 'SALYSD',
      mint_request_id: row.id,
      amount_minor: row.amountMinor.toString(),
      reserve_account_id: reserveId,
      ...(row.destinationWalletId ? { destination_wallet_id: row.destinationWalletId } : {}),
      ...(row.destinationAddress ? { destination_address: row.destinationAddress } : {}),
    } as never);

    return row;
  }

  async approve(id: string) {
    const orgId = getTenantOrgId();
    const row = await this.prisma.mintRequest.findUnique({ where: { id } });
    if (!row || (orgId && row.orgId !== orgId)) {
      throw NotFoundError('stablecoin.mint.not_found', 'Mint request not found');
    }
    if (row.status !== 'PENDING' && row.status !== 'APPROVED') {
      throw ConflictError('stablecoin.mint.invalid_status', `Cannot approve mint in status ${row.status}`);
    }
    if (!row.destinationWalletId) {
      throw ValidationError(
        'stablecoin.mint.wallet_required',
        'destination_wallet_id required for on-chain mint execution',
      );
    }

    const reserve = await this.prisma.reserveAccount.findUnique({ where: { id: row.reserveAccountId } });
    if (!reserve) {
      throw NotFoundError('stablecoin.reserve.not_found', 'Reserve account not found');
    }
    this.assertReserveAttestationFresh(reserve);

    if (row.executionTransactionId) {
      return row;
    }

    const tx = await this.execution.salysdMint({
      idempotencyKey: `mint:${row.id}`,
      mintRequestId: row.id,
      destinationWalletId: row.destinationWalletId,
      amountMinor: row.amountMinor.toString(),
    });

    return this.prisma.mintRequest.update({
      where: { id: row.id },
      data: {
        status: 'MINTING',
        executionTransactionId: tx.id,
      },
    });
  }

  async list(limit = 50) {
    const orgId = getTenantOrgId();
    if (!orgId) {
      throw ValidationError('stablecoin.tenant.required', 'Org context required');
    }
    return this.prisma.mintRequest.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getById(id: string) {
    const orgId = getTenantOrgId();
    const row = await this.prisma.mintRequest.findUnique({ where: { id } });
    if (!row || (orgId && row.orgId !== orgId)) {
      throw NotFoundError('stablecoin.mint.not_found', 'Mint request not found');
    }
    return row;
  }

  private assertReserveAttestationFresh(reserve: ReserveAccount): void {
    if (!reserve.asOf) {
      throw ValidationError(
        'stablecoin.reserve.stale_attestation',
        'Reserve account has no attestation timestamp',
      );
    }
    const ageMs = Date.now() - reserve.asOf.getTime();
    if (ageMs > this.env.STABLECOIN_ATTESTATION_MAX_AGE_MS) {
      throw ValidationError(
        'stablecoin.reserve.stale_attestation',
        `Reserve attestation is stale (${Math.floor(ageMs / 86_400_000)}d old)`,
      );
    }
  }
}
