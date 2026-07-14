import { Module } from '@nestjs/common';
import { ReservesController } from './reserves.controller.js';
import { ReservesService } from './reserves.service.js';

@Module({
  controllers: [ReservesController],
  providers: [ReservesService],
  exports: [ReservesService],
})
export class ReservesModule {}
