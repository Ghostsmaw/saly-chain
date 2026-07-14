import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { NotFoundError } from '@salychain/errors';
import { UserAliasKind } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';

export type BeneficiaryAliasKind = 'PHONE' | 'EMAIL' | 'HANDLE';

@Injectable()
export class AliasesService {
  constructor(private readonly prisma: PrismaService) {}

  normalize(kind: BeneficiaryAliasKind, value: string): string {
    const trimmed = value.trim();
    if (kind === 'EMAIL') return trimmed.toLowerCase();
    if (kind === 'HANDLE') return trimmed.startsWith('@') ? trimmed.slice(1).toLowerCase() : trimmed.toLowerCase();
    return trimmed;
  }

  async register(input: {
    userId: string;
    kind: BeneficiaryAliasKind;
    value: string;
    verified?: boolean;
  }): Promise<{ id: string; kind: BeneficiaryAliasKind; value: string; user_id: string }> {
    const normalized = this.normalize(input.kind, input.value);
    const row = await this.prisma.userAlias.upsert({
      where: { kind_value: { kind: input.kind as UserAliasKind, value: normalized } },
      create: {
        id: `ual_${ulid()}`,
        userId: input.userId,
        kind: input.kind as UserAliasKind,
        value: normalized,
        verified: input.verified ?? false,
      },
      update: { userId: input.userId, verified: input.verified ?? undefined },
    });
    return { id: row.id, kind: input.kind, value: row.value, user_id: row.userId };
  }

  async resolve(kind: BeneficiaryAliasKind, value: string): Promise<{ user_id: string; verified: boolean }> {
    const normalized = this.normalize(kind, value);
    const alias = await this.prisma.userAlias.findUnique({
      where: { kind_value: { kind: kind as UserAliasKind, value: normalized } },
      include: { user: true },
    });
    if (!alias || alias.user.status !== 'ACTIVE') {
      throw NotFoundError(
        'identity.alias.not_found',
        `No active user for ${kind} ${normalized}`,
      );
    }
    return { user_id: alias.userId, verified: alias.verified };
  }
}
