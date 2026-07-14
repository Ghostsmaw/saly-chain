import { Inject, Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { NotFoundError, ValidationError } from '@salychain/errors';
import { VERTICAL_SCHEMAS } from '@salychain/vertical-core';
import type { Prisma } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AGRI_ENV, type AgriEnv } from '../config/env.js';

@Injectable()
export class AgriService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(AGRI_ENV) private readonly env: AgriEnv,
  ) {}

  private id() {
    return `${this.env.ID_PREFIX}${ulid()}`;
  }

  async registerFarmer(orgId: string, externalRef: string) {
    return this.prisma.farmer.create({ data: { id: this.id(), orgId, externalRef } });
  }

  async registerFarm(input: { orgId: string; farmerId: string; crop?: string; season?: string; geo?: Record<string, unknown> }) {
    return this.prisma.farm.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        farmerId: input.farmerId,
        crop: input.crop ?? null,
        season: input.season ?? null,
        geo: input.geo !== undefined ? (input.geo as Prisma.InputJsonValue) : undefined,
      },
    });
  }

  async originateInputLoan(input: {
    orgId: string;
    farmerId: string;
    amountMinor: string;
    currency: string;
    payoutIntentId?: string;
  }) {
    if (BigInt(input.amountMinor) <= 0n) {
      throw ValidationError('agri.loan.amount', 'amount_minor must be positive');
    }
    return this.prisma.inputLoan.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        farmerId: input.farmerId,
        amountMinor: BigInt(input.amountMinor),
        currency: input.currency.toUpperCase(),
        payoutIntentId: input.payoutIntentId ?? null,
      },
    });
  }

  async createInsurancePolicy(input: {
    orgId: string;
    farmerId: string;
    triggerMetric: string;
    threshold: string;
    premiumMinor: string;
    payoutMinor: string;
    currency: string;
  }) {
    return this.prisma.insurancePolicy.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        farmerId: input.farmerId,
        triggerMetric: input.triggerMetric,
        threshold: input.threshold,
        premiumMinor: BigInt(input.premiumMinor),
        payoutMinor: BigInt(input.payoutMinor),
        currency: input.currency.toUpperCase(),
      },
    });
  }

  async autoInsuranceClaim(orgId: string, policyId: string, observedValue: string) {
    const policy = await this.prisma.insurancePolicy.findFirst({
      where: { id: policyId, orgId, status: 'ACTIVE' },
    });
    if (!policy) throw NotFoundError('agri.policy.not_found', 'Active policy not found');

    const triggered = Number(observedValue) <= Number(policy.threshold);
    if (!triggered) {
      return { triggered: false, policy_id: policyId, observed: observedValue };
    }

    const updated = await this.prisma.insurancePolicy.update({
      where: { id: policyId },
      data: { status: 'CLAIMED' },
    });
    return {
      triggered: true,
      policy: updated,
      payout_minor: policy.payoutMinor.toString(),
      currency: policy.currency,
    };
  }

  async registerLot(input: {
    orgId: string;
    farmId: string;
    lotCode: string;
    origin?: string;
    attestationId?: string;
  }) {
    return this.prisma.produceLot.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        farmId: input.farmId,
        lotCode: input.lotCode,
        origin: input.origin ?? null,
        attestationId: input.attestationId ?? null,
      },
    });
  }

  async traceLot(orgId: string, lotId: string) {
    const lot = await this.prisma.produceLot.findFirst({
      where: { id: lotId, orgId },
      include: { farm: { include: { farmer: true } }, custody: { orderBy: { createdAt: 'asc' } } },
    });
    if (!lot) throw NotFoundError('agri.lot.not_found', 'Produce lot not found');
    return {
      lot,
      schema: VERTICAL_SCHEMAS.AGRI_PRODUCE_LOT,
      custody_chain: lot.custody,
    };
  }

  async recordCustody(input: {
    orgId: string;
    lotId: string;
    actorRef: string;
    geo?: Record<string, unknown>;
    attestationId?: string;
  }) {
    return this.prisma.custodyHandoff.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        lotId: input.lotId,
        actorRef: input.actorRef,
        geo: input.geo !== undefined ? (input.geo as Prisma.InputJsonValue) : undefined,
        attestationId: input.attestationId ?? null,
      },
    });
  }

  async createOfftake(input: {
    orgId: string;
    lotId: string;
    buyerRef: string;
    priceMinor: string;
    currency: string;
    escrowIntentId?: string;
  }) {
    return this.prisma.offtakeContract.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        lotId: input.lotId,
        buyerRef: input.buyerRef,
        priceMinor: BigInt(input.priceMinor),
        currency: input.currency.toUpperCase(),
        escrowIntentId: input.escrowIntentId ?? null,
      },
    });
  }

  async listFarmers(orgId: string, limit = 50) {
    const rows = await this.prisma.farmer.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        externalRef: row.externalRef,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async listFarms(orgId: string, limit = 50) {
    const rows = await this.prisma.farm.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { farmer: { select: { externalRef: true } } },
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        farmerId: row.farmerId,
        farmerRef: row.farmer.externalRef,
        crop: row.crop,
        season: row.season,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async listProduceLots(orgId: string, limit = 50) {
    const rows = await this.prisma.produceLot.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { farm: { select: { crop: true } } },
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        farmId: row.farmId,
        lotCode: row.lotCode,
        origin: row.origin,
        crop: row.farm.crop,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async listInputLoans(orgId: string, limit = 50) {
    const rows = await this.prisma.inputLoan.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        farmerId: row.farmerId,
        amountMinor: row.amountMinor.toString(),
        currency: row.currency,
        status: row.status,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }
}
