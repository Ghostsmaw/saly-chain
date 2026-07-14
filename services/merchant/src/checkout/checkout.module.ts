import { Module } from '@nestjs/common';
import { PaymentLinksModule } from '../payment-links/payment-links.module.js';
import { CheckoutController, PublicCheckoutController } from './checkout.controller.js';
import { CheckoutService } from './checkout.service.js';
import { CheckoutStatusPoller } from './checkout-status.poller.js';

@Module({
  imports: [PaymentLinksModule],
  controllers: [CheckoutController, PublicCheckoutController],
  providers: [CheckoutService, CheckoutStatusPoller],
  exports: [CheckoutService],
})
export class CheckoutModule {}
