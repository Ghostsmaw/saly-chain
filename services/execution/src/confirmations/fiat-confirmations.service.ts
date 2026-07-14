import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import type { FiatAdapter } from '@salychain/chain-fiat';
import { loadEnv } from '@salychain/config';
import { FIAT_ADAPTER } from '../fiat/fiat.module.js';
import { executionEnvSchema } from '../config/env.js';
import { TransactionsService } from '../transactions/transactions.service.js';

/**
 * Polls PSP APIs for fiat payouts stuck in AWAITING_CONFIRMATION.
 * Replaces chain-listener for bank rails until webhook ingestion ships.
 */
@Injectable()
export class FiatConfirmationsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(FiatConfirmationsService.name);
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    @Inject(FIAT_ADAPTER) private readonly fiat: FiatAdapter,
    private readonly txs: TransactionsService,
  ) {}

  onApplicationBootstrap(): void {
    const env = loadEnv(executionEnvSchema);
    this.timer = setInterval(() => {
      void this.pollPending().catch((err) => {
        this.logger.warn(`fiat poll failed: ${(err as Error).message}`);
      });
    }, env.FIAT_CONFIRMATION_POLL_MS);
    this.timer.unref?.();
    this.logger.log(`fiat confirmation poller started (every ${env.FIAT_CONFIRMATION_POLL_MS}ms)`);
  }

  private async pollPending(): Promise<void> {
    const pending = await this.txs.listAwaitingFiatConfirmation(50);
    for (const tx of pending) {
      const pspId = tx.broadcastJobId;
      if (!pspId) continue;

      let transfer = await this.fiat.getStatus(pspId);
      // Paystack stores correlationId (tx UUID) as reference — fallback for transfer_code polling.
      if (!transfer) {
        transfer = await this.fiat.getStatus(tx.id);
      }
      if (!transfer) continue;

      if (transfer.status === 'SETTLED') {
        await this.txs.markSettledByPspId({
          txId: tx.id,
          pspId,
          settledAt: transfer.settledAt,
          confirmedVia: 'poll',
        });
      } else if (transfer.status === 'FAILED' || transfer.status === 'CANCELED') {
        await this.txs.markFailedByPspId({
          txId: tx.id,
          pspId,
          reason: transfer.failureReason ?? transfer.status,
          confirmedVia: 'poll',
        });
      }
    }
  }
}
