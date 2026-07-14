import { Inject, Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { NotFoundError, ValidationError } from '@salychain/errors';
import { hashDataPayload, hashSubject, VERTICAL_SCHEMAS } from '@salychain/vertical-core';
import type { Beneficiary, Disbursement, Prisma, Procurement, Program, PublicRecord } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { GOV_ENV, type GovEnv } from '../config/env.js';

function serializeProgram(row: Program) {
  return {
    id: row.id,
    orgId: row.orgId,
    name: row.name,
    budgetMinor: row.budgetMinor.toString(),
    currency: row.currency,
    eligibility: row.eligibility,
    createdAt: row.createdAt.toISOString(),
  };
}

function serializeBeneficiary(row: Beneficiary) {
  return {
    id: row.id,
    orgId: row.orgId,
    programId: row.programId,
    externalRef: row.externalRef,
    kycStatus: row.kycStatus,
    createdAt: row.createdAt.toISOString(),
  };
}

function serializeDisbursement(row: Disbursement) {
  return {
    id: row.id,
    orgId: row.orgId,
    programId: row.programId,
    beneficiaryId: row.beneficiaryId,
    amountMinor: row.amountMinor.toString(),
    currency: row.currency,
    status: row.status,
    batchIntentId: row.batchIntentId,
    createdAt: row.createdAt.toISOString(),
  };
}

function serializeProcurement(row: Procurement) {
  return {
    id: row.id,
    orgId: row.orgId,
    tenderRef: row.tenderRef,
    title: row.title,
    budgetMinor: row.budgetMinor.toString(),
    currency: row.currency,
    status: row.status,
    awardRef: row.awardRef,
    escrowIntentId: row.escrowIntentId,
    createdAt: row.createdAt.toISOString(),
  };
}

function serializePublicRecord(row: PublicRecord) {
  return {
    id: row.id,
    orgId: row.orgId,
    programId: row.programId,
    recordType: row.recordType,
    subjectHash: row.subjectHash,
    dataHash: row.dataHash,
    attestationId: row.attestationId,
    createdAt: row.createdAt.toISOString(),
  };
}

@Injectable()
export class GovService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(GOV_ENV) private readonly env: GovEnv,
  ) {}

  private id() {
    return `${this.env.ID_PREFIX}${ulid()}`;
  }

  async createProgram(input: {
    orgId: string;
    name: string;
    budgetMinor: string;
    currency: string;
    eligibility?: Record<string, unknown>;
  }) {
    const row = await this.prisma.program.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        name: input.name,
        budgetMinor: BigInt(input.budgetMinor),
        currency: input.currency.toUpperCase(),
        eligibility: input.eligibility !== undefined ? (input.eligibility as Prisma.InputJsonValue) : undefined,
      },
    });
    return serializeProgram(row);
  }

  async registerBeneficiary(input: {
    orgId: string;
    programId: string;
    externalRef: string;
  }) {
    const row = await this.prisma.beneficiary.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        programId: input.programId,
        externalRef: input.externalRef,
      },
    });
    return serializeBeneficiary(row);
  }

  async batchDisbursements(input: {
    orgId: string;
    programId: string;
    items: Array<{ beneficiaryId: string; amountMinor: string; currency: string }>;
    batchIntentId: string;
  }) {
    const program = await this.prisma.program.findFirst({
      where: { id: input.programId, orgId: input.orgId },
    });
    if (!program) throw NotFoundError('gov.program.not_found', 'Program not found');

    const total = input.items.reduce((s, i) => s + BigInt(i.amountMinor), 0n);
    if (total > program.budgetMinor) {
      throw ValidationError('gov.program.budget_exceeded', 'Disbursement batch exceeds program budget');
    }

    const rows = await this.prisma.$transaction(
      input.items.map((item) =>
        this.prisma.disbursement.create({
          data: {
            id: this.id(),
            orgId: input.orgId,
            programId: input.programId,
            beneficiaryId: item.beneficiaryId,
            amountMinor: BigInt(item.amountMinor),
            currency: item.currency.toUpperCase(),
            status: 'BATCHED',
            batchIntentId: input.batchIntentId,
          },
        }),
      ),
    );
    return {
      data: rows.map(serializeDisbursement),
      batch_intent_id: input.batchIntentId,
    };
  }

  async awardProcurement(input: {
    orgId: string;
    tenderRef: string;
    awardRef: string;
    escrowIntentId?: string;
  }) {
    const proc = await this.prisma.procurement.findFirst({
      where: { orgId: input.orgId, tenderRef: input.tenderRef },
    });
    if (!proc) throw NotFoundError('gov.procurement.not_found', 'Procurement not found');
    const row = await this.prisma.procurement.update({
      where: { id: proc.id },
      data: {
        status: 'AWARDED',
        awardRef: input.awardRef,
        escrowIntentId: input.escrowIntentId ?? null,
      },
    });
    return serializeProcurement(row);
  }

  async createProcurement(input: {
    orgId: string;
    tenderRef: string;
    title: string;
    budgetMinor: string;
    currency: string;
  }) {
    const row = await this.prisma.procurement.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        tenderRef: input.tenderRef,
        title: input.title,
        budgetMinor: BigInt(input.budgetMinor),
        currency: input.currency.toUpperCase(),
      },
    });
    return serializeProcurement(row);
  }

  async anchorPublicRecord(input: {
    orgId: string;
    programId?: string;
    recordType: string;
    subjectRef: string;
    payload: Record<string, unknown>;
    attestationId?: string;
  }) {
    const row = await this.prisma.publicRecord.create({
      data: {
        id: this.id(),
        orgId: input.orgId,
        programId: input.programId ?? null,
        recordType: input.recordType,
        subjectHash: hashSubject(input.subjectRef, input.orgId),
        dataHash: hashDataPayload(input.payload),
        attestationId: input.attestationId ?? null,
      },
    });
    return serializePublicRecord(row);
  }

  async listPrograms(orgId: string, limit = 50) {
    const rows = await this.prisma.program.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { _count: { select: { disbursements: true } } },
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        name: row.name,
        budgetMinor: row.budgetMinor.toString(),
        currency: row.currency,
        disbursementCount: row._count.disbursements,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async listDisbursements(orgId: string, programId?: string, limit = 50) {
    const rows = await this.prisma.disbursement.findMany({
      where: { orgId, ...(programId ? { programId } : {}) },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { program: { select: { name: true } } },
    });
    return {
      data: rows.map((row) => ({
        id: row.id,
        orgId: row.orgId,
        programId: row.programId,
        programName: row.program.name,
        beneficiaryId: row.beneficiaryId,
        amountMinor: row.amountMinor.toString(),
        currency: row.currency,
        status: row.status,
        batchIntentId: row.batchIntentId,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  }

  async transparencyReport(orgId: string, programId: string) {
    const [program, disbursements, records] = await Promise.all([
      this.prisma.program.findFirst({ where: { id: programId, orgId } }),
      this.prisma.disbursement.findMany({ where: { orgId, programId } }),
      this.prisma.publicRecord.findMany({ where: { orgId, programId } }),
    ]);
    if (!program) throw NotFoundError('gov.program.not_found', 'Program not found');

    const spent = disbursements
      .filter((d) => d.status === 'SETTLED' || d.status === 'BATCHED')
      .reduce((s, d) => s + d.amountMinor, 0n);

    return {
      program: serializeProgram(program),
      budget_minor: program.budgetMinor.toString(),
      spent_minor: spent.toString(),
      disbursement_count: disbursements.length,
      public_records: records.map(serializePublicRecord),
      schema: VERTICAL_SCHEMAS.GOV_PUBLIC_RECORD,
    };
  }
}
