import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { EventBus, SUBJECTS } from '@salychain/events';
import { SalysdService } from './salysd.service.js';
import { EVENT_BUS } from '../events/events.module.js';
import { PrismaService } from '../prisma/prisma.service.js';

/**
 * Settles SalySD mint/redeem execution txs when L3 transfer observations arrive.
 */
@Injectable()
export class SalysdConfirmationsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SalysdConfirmationsService.name);

  constructor(
    @Inject(EVENT_BUS) private readonly events: EventBus,
    private readonly salysd: SalysdService,
    private readonly prisma: PrismaService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.events.subscribe(
      SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED,
      'execution-salysd-l3-settle',
      async (event) => {
        try {
          const byHash = await this.prisma.executionTransaction.findFirst({
            where: {
              txHash: event.tx_hash,
              state: 'AWAITING_CONFIRMATION',
              kind: { in: ['SALYSD_MINT', 'SALYSD_REDEEM'] },
            },
          });
          if (byHash) {
            if (byHash.kind === 'SALYSD_MINT') {
              await this.salysd.handleMintSettled(byHash, event.tx_hash);
            } else {
              await this.salysd.handleRedeemSettled(byHash, event.tx_hash);
            }
            return 'ack';
          }

          const mintOpen = await this.prisma.executionTransaction.findMany({
            where: {
              kind: 'SALYSD_MINT',
              state: 'AWAITING_CONFIRMATION',
              amountMinor: BigInt(event.amount_minor),
              destinationAddress: { equals: event.to, mode: 'insensitive' },
            },
            take: 3,
            orderBy: { createdAt: 'asc' },
          });
          if (mintOpen[0]) {
            await this.salysd.handleMintSettled(mintOpen[0], event.tx_hash);
            return 'ack';
          }

          return 'ack';
        } catch (err) {
          this.logger.warn(`salysd L3 settle failed: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );

    this.logger.log('subscribed to SalySD L3 confirmation events');
  }
}
