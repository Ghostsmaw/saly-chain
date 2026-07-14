import { Injectable, Logger } from '@nestjs/common';
import { ulid } from 'ulid';
import { ConflictError, NotFoundError } from '@salychain/errors';
import { Organization, OrgStatus, Prisma } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';

export interface CreateOrgInput {
  name: string;
  defaultRateLimitPerMin?: number;
  metadata?: Record<string, unknown>;
}

export interface AddMemberInput {
  orgId: string;
  email: string;
  role?: 'owner' | 'admin' | 'member' | 'viewer';
}

@Injectable()
export class OrgsService {
  private readonly logger = new Logger(OrgsService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateOrgInput): Promise<Organization> {
    const id = `org_${ulid()}`;
    const org = await this.prisma.organization.create({
      data: {
        id,
        name: input.name,
        defaultRateLimitPerMin: input.defaultRateLimitPerMin ?? 600,
        metadata: (input.metadata as Prisma.InputJsonValue | undefined) ?? Prisma.JsonNull,
      },
    });
    this.logger.log(`org created id=${org.id} name="${org.name}"`);
    return org;
  }

  async list(): Promise<Organization[]> {
    return this.prisma.organization.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async getById(id: string): Promise<Organization> {
    const org = await this.prisma.organization.findUnique({ where: { id } });
    if (!org) throw NotFoundError('apikeys.org.not_found', `Org ${id} not found`);
    return org;
  }

  async setStatus(id: string, status: OrgStatus): Promise<Organization> {
    await this.getById(id);
    const updated = await this.prisma.organization.update({ where: { id }, data: { status } });
    this.logger.warn(`org ${id} status → ${status}`);
    return updated;
  }

  async addMember(input: AddMemberInput) {
    await this.getById(input.orgId);
    const id = `mem_${ulid()}`;
    try {
      return await this.prisma.member.create({
        data: {
          id,
          orgId: input.orgId,
          email: input.email.toLowerCase(),
          role: input.role ?? 'member',
        },
      });
    } catch (err) {
      if ((err as { code?: string }).code === 'P2002') {
        throw ConflictError('apikeys.member.exists', `${input.email} is already a member of ${input.orgId}`);
      }
      throw err;
    }
  }

  async listMembers(orgId: string) {
    await this.getById(orgId);
    return this.prisma.member.findMany({ where: { orgId }, orderBy: { createdAt: 'asc' } });
  }
}
