import { Inject, Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { NotFoundError } from '@salychain/errors';
import { hashSubject, hashDataPayload, VERTICAL_SCHEMAS } from '@salychain/vertical-core';
import { PrismaService } from '../prisma/prisma.service.js';
import { EDU_ENV, type EduEnv } from '../config/env.js';

@Injectable()
export class EduService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(EDU_ENV) private readonly env: EduEnv,
  ) {}

  private id() {
    return `${this.env.ID_PREFIX}${ulid()}`;
  }

  async registerLearner(orgId: string, learnerRef: string) {
    const subjectHash = hashSubject(learnerRef, orgId);
    return this.prisma.learner.upsert({
      where: { orgId_subjectHash: { orgId, subjectHash } },
      create: { id: this.id(), orgId, subjectHash },
      update: {},
    });
  }

  async issueCredential(input: {
    orgId: string;
    institutionId: string;
    learnerRef: string;
    type: 'DEGREE' | 'CERTIFICATE' | 'BADGE';
    payload: Record<string, unknown>;
    attestationId?: string;
    expiresAt?: string;
  }) {
    const learner = await this.registerLearner(input.orgId, input.learnerRef);
    return this.prisma.credential.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        institutionId: input.institutionId,
        learnerId: learner.id,
        type: input.type,
        dataHash: hashDataPayload(input.payload),
        attestationId: input.attestationId ?? null,
        expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
      },
    });
  }

  async verifyCredential(orgId: string, credentialId: string) {
    const credential = await this.prisma.credential.findFirst({
      where: { id: credentialId, orgId },
      include: { institution: true, learner: true },
    });
    if (!credential) throw NotFoundError('edu.credential.not_found', 'Credential not found');
    const expired = credential.expiresAt ? credential.expiresAt < new Date() : false;
    const valid = credential.status === 'ACTIVE' && !expired;
    return { valid, credential, schema: VERTICAL_SCHEMAS.EDU_CREDENTIAL };
  }

  async createTuitionInvoice(input: {
    orgId: string;
    learnerRef: string;
    amountMinor: string;
    currency: string;
    dueAt: string;
    intentId?: string;
  }) {
    const learner = await this.registerLearner(input.orgId, input.learnerRef);
    return this.prisma.tuitionInvoice.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        learnerId: learner.id,
        amountMinor: BigInt(input.amountMinor),
        currency: input.currency.toUpperCase(),
        dueAt: new Date(input.dueAt),
        intentId: input.intentId ?? null,
      },
    });
  }

  async createScholarship(input: {
    orgId: string;
    learnerRef: string;
    amountMinor: string;
    currency: string;
    milestone: string;
    escrowIntentId?: string;
  }) {
    const learner = await this.registerLearner(input.orgId, input.learnerRef);
    return this.prisma.scholarshipGrant.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        learnerId: learner.id,
        amountMinor: BigInt(input.amountMinor),
        currency: input.currency.toUpperCase(),
        milestone: input.milestone,
        escrowIntentId: input.escrowIntentId ?? null,
      },
    });
  }

  async disburseScholarship(orgId: string, grantId: string) {
    const grant = await this.prisma.scholarshipGrant.findFirst({
      where: { id: grantId, orgId, status: 'ACTIVE' },
    });
    if (!grant) throw NotFoundError('edu.scholarship.not_found', 'Active scholarship not found');
    return this.prisma.scholarshipGrant.update({
      where: { id: grantId },
      data: { status: 'DISBURSED' },
    });
  }

  async registerInstitution(orgId: string, name: string) {
    const row = await this.prisma.institution.create({
      data: { id: this.id(), orgId, name },
    });
    return {
      id: row.id,
      orgId: row.orgId,
      name: row.name,
      createdAt: row.createdAt.toISOString(),
    };
  }

  async listInstitutions(orgId: string, limit = 50) {
    const rows = await this.prisma.institution.findMany({
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

  async listCredentials(orgId: string, limit = 50) {
    const rows = await this.prisma.credential.findMany({
      where: { orgId },
      orderBy: { issuedAt: 'desc' },
      take: limit,
      include: { institution: { select: { name: true } } },
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        institutionName: row.institution.name,
        type: row.type,
        status: row.status,
        issuedAt: row.issuedAt.toISOString(),
        expiresAt: row.expiresAt?.toISOString() ?? null,
      })),
    };
  }

  async listTuitionInvoices(orgId: string, limit = 50) {
    const rows = await this.prisma.tuitionInvoice.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        learnerId: row.learnerId,
        amountMinor: row.amountMinor.toString(),
        currency: row.currency,
        dueAt: row.dueAt.toISOString(),
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async listScholarships(orgId: string, limit = 50) {
    const rows = await this.prisma.scholarshipGrant.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        learnerId: row.learnerId,
        amountMinor: row.amountMinor.toString(),
        currency: row.currency,
        milestone: row.milestone,
        status: row.status,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }
}
