import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { ConflictError, NotFoundError, ValidationError } from '@salychain/errors';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DelegationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: {
    userId: string;
    agentId: string;
    scopes?: string[];
    expiresAt?: Date;
  }) {
    if (!input.agentId.startsWith('agt_')) {
      throw ValidationError('identity.delegation.invalid_agent', 'agent_id must be agt_*');
    }
    const user = await this.prisma.user.findUnique({ where: { id: input.userId } });
    if (!user) throw NotFoundError('identity.user.not_found', `User ${input.userId} not found`);

    const existing = await this.prisma.delegationGrant.findUnique({
      where: { userId_agentId: { userId: input.userId, agentId: input.agentId } },
    });
    if (existing && !existing.revokedAt) {
      throw ConflictError(
        'identity.delegation.exists',
        `Delegation already exists for user ${input.userId} and agent ${input.agentId}`,
      );
    }

    const grant = existing
      ? await this.prisma.delegationGrant.update({
          where: { id: existing.id },
          data: {
            scopes: input.scopes ?? ['intents:write', 'agents:read'],
            expiresAt: input.expiresAt ?? null,
            revokedAt: null,
          },
        })
      : await this.prisma.delegationGrant.create({
          data: {
            id: `dlg_${ulid()}`,
            userId: input.userId,
            agentId: input.agentId,
            scopes: input.scopes ?? ['intents:write', 'agents:read'],
            expiresAt: input.expiresAt ?? null,
          },
        });

    return toPublic(grant);
  }

  async list(opts: { userId?: string; agentId?: string }) {
    const where: { userId?: string; agentId?: string; revokedAt?: null } = { revokedAt: null };
    if (opts.userId) where.userId = opts.userId;
    if (opts.agentId) where.agentId = opts.agentId;
    const rows = await this.prisma.delegationGrant.findMany({ where, orderBy: { createdAt: 'desc' } });
    return { data: rows.map(toPublic) };
  }

  async revoke(id: string) {
    const grant = await this.prisma.delegationGrant.findUnique({ where: { id } });
    if (!grant) throw NotFoundError('identity.delegation.not_found', `Delegation ${id} not found`);
    const updated = await this.prisma.delegationGrant.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
    return toPublic(updated);
  }
}

function toPublic(grant: {
  id: string;
  userId: string;
  agentId: string;
  scopes: string[];
  expiresAt: Date | null;
  revokedAt: Date | null;
  createdAt: Date;
}) {
  return {
    id: grant.id,
    user_id: grant.userId,
    agent_id: grant.agentId,
    scopes: grant.scopes,
    expires_at: grant.expiresAt?.toISOString(),
    revoked_at: grant.revokedAt?.toISOString(),
    created_at: grant.createdAt.toISOString(),
  };
}
