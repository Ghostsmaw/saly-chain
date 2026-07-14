import { Module } from '@nestjs/common';
import {
  PaymentLinksArchiveController,
  PaymentLinksController,
  PublicPaymentLinksController,
} from './payment-links.controller.js';
import { PaymentLinksService } from './payment-links.service.js';

@Module({
  controllers: [PaymentLinksController, PaymentLinksArchiveController, PublicPaymentLinksController],
  providers: [PaymentLinksService],
  exports: [PaymentLinksService],
})
export class PaymentLinksModule {}
