import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { ConflictError, NotFoundError } from '@salychain/errors';
import { Prisma, UserRole } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AliasesService } from '../aliases/aliases.service.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aliases: AliasesService,
  ) {}

  async create(input: { email: string; metadata?: Record<string, unknown> }) {
    const existing = await this.prisma.user.findUnique({ where: { email: input.email } });
    if (existing) {
      throw ConflictError('identity.user.exists', `User with email ${input.email} already exists`);
    }
    const user = await this.prisma.user.create({
      data: {
        id: `usr_${ulid()}`,
        email: input.email,
        metadata: input.metadata !== undefined ? (input.metadata as Prisma.InputJsonValue) : undefined,
      },
    });
    await this.aliases.register({ userId: user.id, kind: 'EMAIL', value: input.email, verified: true });
    return toPublic(user);
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw NotFoundError('identity.user.not_found', `User ${id} not found`);
    return toPublic(user);
  }

  async list(limit = 50, role?: string) {
    const where = role && isUserRole(role) ? { role: role as UserRole } : undefined;
    const take = Math.min(Math.max(limit, 1), 200);
    const [rows, total, grouped] = await Promise.all([
      this.prisma.user.findMany({ where, orderBy: { createdAt: 'desc' }, take }),
      this.prisma.user.count({ where }),
      this.prisma.user.groupBy({ by: ['role'], _count: { _all: true } }),
    ]);
    const by_role: Record<string, number> = {};
    for (const g of grouped) by_role[g.role] = g._count._all;
    return { data: rows.map(toPublic), total, by_role };
  }
}

function isUserRole(value: string): value is UserRole {
  return value === 'SUPER_ADMIN' || value === 'BUSINESS' || value === 'DEVELOPER' || value === 'CONSUMER';
}

function toPublic(user: {
  id: string;
  email: string;
  status: string;
  role: string;
  displayName: string | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: user.id,
    email: user.email,
    status: user.status,
    role: user.role,
    display_name: user.displayName,
    created_at: user.createdAt.toISOString(),
    updated_at: user.updatedAt.toISOString(),
  };
}
