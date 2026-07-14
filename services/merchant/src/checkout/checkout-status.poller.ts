import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { CheckoutService } from './checkout.service.js';
import { MERCHANT_ENV, type MerchantEnv } from '../config/env.js';

@Injectable()
export class CheckoutStatusPoller implements OnApplicationBootstrap {
  private readonly logger = new Logger(CheckoutStatusPoller.name);
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly checkout: CheckoutService,
    @Inject(MERCHANT_ENV) private readonly env: MerchantEnv,
  ) {}

  onApplicationBootstrap(): void {
    this.timer = setInterval(() => {
      void this.tick().catch((err) => this.logger.warn(`checkout poll failed: ${String(err)}`));
    }, this.env.MERCHANT_CHECKOUT_POLL_MS);
  }

  private async tick(): Promise<void> {
    const pending = await this.checkout.listAwaitingSync(50);
    for (const row of pending) {
      await this.checkout.syncSessionStatus(row.id);
    }
  }
}
