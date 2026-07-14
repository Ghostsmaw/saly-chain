import { Module } from '@nestjs/common';
import { RedeemController } from './redeem.controller.js';
import { RedeemService } from './redeem.service.js';
import { ClientsModule } from '../clients/clients.module.js';

@Module({
  imports: [ClientsModule],
  controllers: [RedeemController],
  providers: [RedeemService],
  exports: [RedeemService],
})
export class RedeemModule {}
