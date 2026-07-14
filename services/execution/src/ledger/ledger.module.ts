import { Module } from '@nestjs/common';
import { LedgerReservationService } from './ledger-reservation.service.js';

@Module({
  providers: [LedgerReservationService],
  exports: [LedgerReservationService],
})
export class LedgerModule {}
