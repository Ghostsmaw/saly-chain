import { Inject, Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { NotFoundError } from '@salychain/errors';
import { hashDataPayload, VERTICAL_SCHEMAS } from '@salychain/vertical-core';
import type { Prisma } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { SCM_ENV, type ScmEnv } from '../config/env.js';

@Injectable()
export class ScmService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SCM_ENV) private readonly env: ScmEnv,
  ) {}

  private id() {
    return `${this.env.ID_PREFIX}${ulid()}`;
  }

  async createShipment(input: { orgId: string; productId?: string; origin: string; destination: string }) {
    return this.prisma.shipment.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        productId: input.productId ?? null,
        origin: input.origin,
        destination: input.destination,
      },
    });
  }

  async recordCustody(input: {
    orgId: string;
    shipmentId: string;
    actorRef: string;
    geo?: Record<string, unknown>;
    attestationId?: string;
  }) {
    await this.prisma.shipment.updateMany({
      where: { id: input.shipmentId, orgId: input.orgId, status: 'CREATED' },
      data: { status: 'IN_TRANSIT' },
    });
    return this.prisma.custodyEvent.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        shipmentId: input.shipmentId,
        actorRef: input.actorRef,
        geo: input.geo !== undefined ? (input.geo as Prisma.InputJsonValue) : undefined,
        attestationId: input.attestationId ?? null,
      },
    });
  }

  async traceShipment(orgId: string, shipmentId: string) {
    const shipment = await this.prisma.shipment.findFirst({
      where: { id: shipmentId, orgId },
      include: { custody: { orderBy: { createdAt: 'asc' } }, docs: true },
    });
    if (!shipment) throw NotFoundError('scm.shipment.not_found', 'Shipment not found');
    return { shipment, schema: VERTICAL_SCHEMAS.SCM_CUSTODY };
  }

  async attachTradeDoc(input: {
    orgId: string;
    shipmentId: string;
    docType: string;
    payload: Record<string, unknown>;
  }) {
    return this.prisma.tradeDoc.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        shipmentId: input.shipmentId,
        docType: input.docType,
        dataHash: hashDataPayload(input.payload),
      },
    });
  }

  async originateTradeFinance(input: {
    orgId: string;
    shipmentId: string;
    financierRef: string;
    amountMinor: string;
    currency: string;
    payoutIntentId?: string;
  }) {
    return this.prisma.tradeFinance.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        shipmentId: input.shipmentId,
        financierRef: input.financierRef,
        amountMinor: BigInt(input.amountMinor),
        currency: input.currency.toUpperCase(),
        payoutIntentId: input.payoutIntentId ?? null,
      },
    });
  }

  async createSettlement(input: {
    orgId: string;
    shipmentId: string;
    amountMinor: string;
    currency: string;
  }) {
    return this.prisma.scmSettlement.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        shipmentId: input.shipmentId,
        amountMinor: BigInt(input.amountMinor),
        currency: input.currency.toUpperCase(),
      },
    });
  }

  async releaseSettlement(orgId: string, settlementId: string, escrowIntentId: string) {
    const row = await this.prisma.scmSettlement.findFirst({ where: { id: settlementId, orgId } });
    if (!row) throw NotFoundError('scm.settlement.not_found', 'Settlement not found');
    await this.prisma.shipment.updateMany({
      where: { id: row.shipmentId },
      data: { status: 'DELIVERED' },
    });
    return this.prisma.scmSettlement.update({
      where: { id: settlementId },
      data: { status: 'RELEASED', escrowIntentId },
    });
  }

  async listShipments(orgId: string, limit = 50) {
    const rows = await this.prisma.shipment.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        productId: row.productId,
        origin: row.origin,
        destination: row.destination,
        status: row.status,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async listSettlements(orgId: string, limit = 50) {
    const rows = await this.prisma.scmSettlement.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        shipmentId: row.shipmentId,
        amountMinor: row.amountMinor.toString(),
        currency: row.currency,
        status: row.status,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }
}
