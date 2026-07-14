import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError, ValidationError } from '@salychain/errors';
import { EventBus, SUBJECTS } from '@salychain/events';
import { EVENT_BUS } from '../events/events.module.js';
import { PrismaService } from '../prisma/prisma.service.js';

export interface RecordAttestationInput {
  reserve_account_id: string;
  attestation_hash: string;
  balance_minor: string;
  authorized_ceiling_minor: string;
  attestation_url?: string;
  as_of: string;
}

@Injectable()
export class ReservesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(EVENT_BUS) private readonly events: EventBus,
  ) {}

  async list() {
    return this.prisma.reserveAccount.findMany({ orderBy: { custodian: 'asc' } });
  }

  async getById(id: string) {
    const row = await this.prisma.reserveAccount.findUnique({ where: { id } });
    if (!row) throw NotFoundError('stablecoin.reserve.not_found', 'Reserve account not found');
    return row;
  }

  async recordAttestation(input: RecordAttestationInput) {
    const balance = BigInt(input.balance_minor);
    const ceiling = BigInt(input.authorized_ceiling_minor);
    if (balance < 0n || ceiling <= 0n || balance > ceiling) {
      throw ValidationError(
        'stablecoin.reserve.invalid_attestation',
        'balance_minor must be >= 0 and <= authorized_ceiling_minor > 0',
      );
    }

    const reserve = await this.getById(input.reserve_account_id);
    const asOf = new Date(input.as_of);

    const [updated] = await this.prisma.$transaction([
      this.prisma.reserveAccount.update({
        where: { id: reserve.id },
        data: {
          balanceMinor: balance,
          authorizedCeilingMinor: ceiling,
          attestationHash: input.attestation_hash,
          attestationUrl: input.attestation_url ?? null,
          asOf,
        },
      }),
      this.prisma.reserveAttestation.create({
        data: {
          reserveAccountId: reserve.id,
          attestationHash: input.attestation_hash,
          balanceMinor: balance,
          authorizedCeilingMinor: ceiling,
          attestationUrl: input.attestation_url ?? null,
          asOf,
        },
      }),
    ]);

    await this.events.publish(SUBJECTS.STABLECOIN_RESERVE_ATTESTED, {
      reserve_account_id: reserve.id,
      attestation_hash: input.attestation_hash,
      balance_minor: input.balance_minor,
      authorized_mint_ceiling_minor: input.authorized_ceiling_minor,
      ...(input.attestation_url ? { attestation_url: input.attestation_url } : {}),
      as_of: asOf.toISOString(),
    } as never);

    return updated;
  }
}
