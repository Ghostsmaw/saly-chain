import { Inject, Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { NotFoundError } from '@salychain/errors';
import { VERTICAL_SCHEMAS } from '@salychain/vertical-core';
import { PrismaService } from '../prisma/prisma.service.js';
import { AVIATION_ENV, type AviationEnv } from '../config/env.js';

@Injectable()
export class AviationService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(AVIATION_ENV) private readonly env: AviationEnv,
  ) {}

  private id() {
    return `${this.env.ID_PREFIX}${ulid()}`;
  }

  async registerAircraft(input: { orgId: string; tail: string; model: string; ownerRef: string }) {
    return this.prisma.aircraft.create({
      data: { id: this.id(), orgId: input.orgId, tail: input.tail, model: input.model, ownerRef: input.ownerRef },
    });
  }

  async mintPart(input: {
    orgId: string;
    serial: string;
    partType: string;
    aircraftId?: string;
    tokenId?: string;
  }) {
    return this.prisma.part.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        serial: input.serial,
        partType: input.partType,
        aircraftId: input.aircraftId ?? null,
        tokenId: input.tokenId ?? null,
      },
    });
  }

  async recordMaintenance(input: {
    orgId: string;
    partId: string;
    action: string;
    technicianRef: string;
    attestationId?: string;
  }) {
    return this.prisma.maintenanceEvent.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        partId: input.partId,
        action: input.action,
        technicianRef: input.technicianRef,
        attestationId: input.attestationId ?? null,
      },
    });
  }

  async partHistory(orgId: string, serial: string) {
    const part = await this.prisma.part.findFirst({
      where: { orgId, serial },
      include: { maintenance: { orderBy: { createdAt: 'asc' } }, aircraft: true },
    });
    if (!part) throw NotFoundError('aviation.part.not_found', 'Part not found');
    return { part, schema: VERTICAL_SCHEMAS.AVIATION_MAINTENANCE };
  }

  async issueAirworthiness(input: {
    orgId: string;
    aircraftId: string;
    attestationId: string;
    expiresAt: string;
  }) {
    return this.prisma.airworthinessCert.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        aircraftId: input.aircraftId,
        attestationId: input.attestationId,
        expiresAt: new Date(input.expiresAt),
      },
    });
  }

  async createSettlement(input: {
    orgId: string;
    partId: string;
    buyerRef: string;
    sellerRef: string;
    amountMinor: string;
    currency: string;
  }) {
    return this.prisma.aviationSettlement.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        partId: input.partId,
        buyerRef: input.buyerRef,
        sellerRef: input.sellerRef,
        amountMinor: BigInt(input.amountMinor),
        currency: input.currency.toUpperCase(),
      },
    });
  }

  async fundSettlement(orgId: string, settlementId: string, escrowIntentId: string) {
    const row = await this.prisma.aviationSettlement.findFirst({ where: { id: settlementId, orgId } });
    if (!row) throw NotFoundError('aviation.settlement.not_found', 'Settlement not found');
    return this.prisma.aviationSettlement.update({
      where: { id: settlementId },
      data: { status: 'ESCROW_FUNDED', escrowIntentId },
    });
  }

  async listAircraft(orgId: string, limit = 50) {
    const rows = await this.prisma.aircraft.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        tail: row.tail,
        model: row.model,
        ownerRef: row.ownerRef,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async listParts(orgId: string, limit = 50) {
    const rows = await this.prisma.part.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        serial: row.serial,
        partType: row.partType,
        aircraftId: row.aircraftId,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async listSettlements(orgId: string, limit = 50) {
    const rows = await this.prisma.aviationSettlement.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        partId: row.partId,
        buyerRef: row.buyerRef,
        sellerRef: row.sellerRef,
        amountMinor: row.amountMinor.toString(),
        currency: row.currency,
        status: row.status,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }
}
