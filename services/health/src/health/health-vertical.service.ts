import { Inject, Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { NotFoundError, ValidationError } from '@salychain/errors';
import { hashSubject, hashDataPayload, VERTICAL_SCHEMAS } from '@salychain/vertical-core';
import { PrismaService } from '../prisma/prisma.service.js';
import { HEALTH_ENV, type HealthEnv } from '../config/env.js';

@Injectable()
export class HealthVerticalService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(HEALTH_ENV) private readonly env: HealthEnv,
  ) {}

  private id() {
    return `${this.env.ID_PREFIX}${ulid()}`;
  }

  private providerId() {
    return `hpr_${ulid()}`;
  }

  private payerId() {
    return `hpy_${ulid()}`;
  }

  async registerPatient(orgId: string, patientRef: string) {
    const subjectHash = hashSubject(patientRef, orgId);
    return this.prisma.patient.upsert({
      where: { orgId_subjectHash: { orgId, subjectHash } },
      create: { id: this.id(), orgId, subjectHash },
      update: {},
    });
  }

  async grantConsent(input: {
    orgId: string;
    patientRef: string;
    scope: string;
    expiresAt?: string;
    attestationId?: string;
  }) {
    const patient = await this.registerPatient(input.orgId, input.patientRef);
    return this.prisma.consent.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        patientId: patient.id,
        scope: input.scope,
        expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
        attestationId: input.attestationId ?? null,
      },
    });
  }

  async revokeConsent(orgId: string, consentId: string) {
    const consent = await this.prisma.consent.findFirst({ where: { id: consentId, orgId } });
    if (!consent) throw NotFoundError('health.consent.not_found', 'Consent not found');
    return this.prisma.consent.update({ where: { id: consentId }, data: { status: 'REVOKED' } });
  }

  async verifyConsent(orgId: string, consentId: string) {
    const consent = await this.prisma.consent.findFirst({
      where: { id: consentId, orgId },
      include: { patient: true },
    });
    if (!consent) throw NotFoundError('health.consent.not_found', 'Consent not found');
    const expired = consent.expiresAt ? consent.expiresAt < new Date() : false;
    const valid = consent.status === 'ACTIVE' && !expired;
    return {
      valid,
      consent,
      schema: VERTICAL_SCHEMAS.HEALTH_CONSENT,
    };
  }

  async submitClaim(input: {
    orgId: string;
    providerId: string;
    payerId: string;
    procedureCode: string;
    amountMinor: string;
    currency: string;
    escrowIntentId?: string;
  }) {
    if (BigInt(input.amountMinor) <= 0n) {
      throw ValidationError('health.claim.amount', 'amount_minor must be positive');
    }
    return this.prisma.claim.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        providerId: input.providerId,
        payerId: input.payerId,
        procedureCode: input.procedureCode,
        amountMinor: BigInt(input.amountMinor),
        currency: input.currency.toUpperCase(),
        escrowIntentId: input.escrowIntentId ?? null,
      },
    });
  }

  async adjudicateClaim(orgId: string, claimId: string, approved: boolean) {
    const claim = await this.prisma.claim.findFirst({ where: { id: claimId, orgId } });
    if (!claim) throw NotFoundError('health.claim.not_found', 'Claim not found');
    if (claim.status !== 'SUBMITTED' && claim.status !== 'DISPUTED') {
      throw ValidationError('health.claim.status', `Claim is ${claim.status}`);
    }
    return this.prisma.claim.update({
      where: { id: claimId },
      data: { status: approved ? 'ADJUDICATED' : 'REFUNDED' },
    });
  }

  async listConsents(orgId: string, limit = 50) {
    const rows = await this.prisma.consent.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        patientId: row.patientId,
        scope: row.scope,
        status: row.status,
        expiresAt: row.expiresAt?.toISOString() ?? null,
        attestationId: row.attestationId,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async listClaims(orgId: string, limit = 50) {
    const rows = await this.prisma.claim.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        providerId: row.providerId,
        payerId: row.payerId,
        procedureCode: row.procedureCode,
        amountMinor: row.amountMinor.toString(),
        currency: row.currency,
        status: row.status,
        escrowIntentId: row.escrowIntentId,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async registerProvider(orgId: string, name: string) {
    const row = await this.prisma.provider.create({
      data: { id: this.providerId(), orgId, name },
    });
    return {
      id: row.id,
      orgId: row.orgId,
      name: row.name,
      createdAt: row.createdAt.toISOString(),
    };
  }

  async registerPayer(orgId: string, name: string) {
    const row = await this.prisma.payer.create({
      data: { id: this.payerId(), orgId, name },
    });
    return {
      id: row.id,
      orgId: row.orgId,
      name: row.name,
      createdAt: row.createdAt.toISOString(),
    };
  }

  async listProviders(orgId: string, limit = 50) {
    const rows = await this.prisma.provider.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        name: row.name,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async listPayers(orgId: string, limit = 50) {
    const rows = await this.prisma.payer.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        name: row.name,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async attestRecord(input: {
    orgId: string;
    patientRef: string;
    payload: Record<string, unknown>;
    attestationId: string;
  }) {
    const patient = await this.registerPatient(input.orgId, input.patientRef);
    return this.prisma.recordAttestation.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        patientId: patient.id,
        dataHash: hashDataPayload(input.payload),
        attestationId: input.attestationId,
      },
    });
  }
}
