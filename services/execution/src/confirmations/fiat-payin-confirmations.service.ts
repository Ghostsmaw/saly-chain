import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import type { FiatAdapter } from '@salychain/chain-fiat';
import { loadEnv } from '@salychain/config';
import { FIAT_ADAPTER } from '../fiat/fiat.module.js';
import { executionEnvSchema } from '../config/env.js';
import { TransactionsService } from '../transactions/transactions.service.js';

/**
 * Polls the PSP for pay-ins parked in AWAITING_CONFIRMATION and settles those
 * the PSP reports funded. This is the resilience layer behind webhook ingestion
 * (recovers missed/late webhooks) and the working path for the stub adapter,
 * which has no webhook delivery.
 */
@Injectable()
export class FiatPayinConfirmationsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(FiatPayinConfirmationsService.name);
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    @Inject(FIAT_ADAPTER) private readonly fiat: FiatAdapter,
    private readonly txs: TransactionsService,
  ) {}

  onApplicationBootstrap(): void {
    const env = loadEnv(executionEnvSchema);
    this.timer = setInterval(() => {
      void this.pollPending().catch((err) => {
        this.logger.warn(`pay-in poll failed: ${(err as Error).message}`);
      });
    }, env.FIAT_CONFIRMATION_POLL_MS);
    this.timer.unref?.();
    this.logger.log(
      `pay-in confirmation poller started (every ${env.FIAT_CONFIRMATION_POLL_MS}ms)`,
    );
  }

  private async pollPending(): Promise<void> {
    const pending = await this.txs.listAwaitingFiatPayin(50);
    for (const tx of pending) {
      const pspReference = tx.broadcastJobId;
      if (!pspReference) continue;

      const status = await this.fiat.getPayinStatus(pspReference);
      if (!status) continue;

      if (status.status === 'SETTLED') {
        await this.txs.confirmFiatPayinFromWebhook({
          reference: tx.id,
          pspReference,
          outcome: 'SETTLED',
          ...(status.amountMinor ? { amountMinor: status.amountMinor } : {}),
          ...(status.currency ? { currency: status.currency } : {}),
          ...(status.settledAt ? { settledAt: status.settledAt } : {}),
        });
      } else if (status.status === 'FAILED' || status.status === 'EXPIRED') {
        await this.txs.confirmFiatPayinFromWebhook({
          reference: tx.id,
          pspReference,
          outcome: 'FAILED',
          reason: status.failureReason ?? status.status,
        });
      }
    }
  }
}
