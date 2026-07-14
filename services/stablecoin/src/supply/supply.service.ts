import { Inject, Injectable } from '@nestjs/common';
import { EventBus, SUBJECTS } from '@salychain/events';
import { EVENT_BUS } from '../events/events.module.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SupplyService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(EVENT_BUS) private readonly events: EventBus,
  ) {}

  async captureSnapshot(input: {
    chain: 'SALY_L3' | 'BASE';
    on_chain_supply_minor: string;
    reserve_total_minor: string;
  }) {
    const onChain = BigInt(input.on_chain_supply_minor);
    const reserves = BigInt(input.reserve_total_minor);
    const ratioBps =
      onChain === 0n ? (reserves > 0n ? 100_00 : 0) : Number((reserves * 100_00n) / onChain);

    const snapshot = await this.prisma.supplySnapshot.create({
      data: {
        chain: input.chain,
        onChainSupplyMinor: onChain,
        reserveTotalMinor: reserves,
        reserveRatioBps: ratioBps,
      },
    });

    await this.events.publish(SUBJECTS.STABLECOIN_SUPPLY_SNAPSHOT, {
      chain: input.chain,
      on_chain_supply_minor: input.on_chain_supply_minor,
      reserve_total_minor: input.reserve_total_minor,
      reserve_ratio_bps: ratioBps,
    } as never);

    return snapshot;
  }

  async latest(chain: 'SALY_L3' | 'BASE' = 'SALY_L3') {
    return this.prisma.supplySnapshot.findFirst({
      where: { chain },
      orderBy: { capturedAt: 'desc' },
    });
  }
}
