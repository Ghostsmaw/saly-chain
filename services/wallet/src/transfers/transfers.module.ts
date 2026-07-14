import { Module } from '@nestjs/common';
import { TransfersController } from './transfers.controller.js';
import { TransfersService } from './transfers.service.js';
import { BroadcastWorker } from './broadcast.worker.js';
import { WalletsModule } from '../wallets/wallets.module.js';

@Module({
  imports: [WalletsModule],
  controllers: [TransfersController],
  providers: [TransfersService, BroadcastWorker],
  exports: [TransfersService],
})
export class TransfersModule {}
