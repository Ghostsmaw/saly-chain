import { Module } from '@nestjs/common';
import { MintController } from './mint.controller.js';
import { MintService } from './mint.service.js';
import { ClientsModule } from '../clients/clients.module.js';

@Module({
  imports: [ClientsModule],
  controllers: [MintController],
  providers: [MintService],
  exports: [MintService],
})
export class MintModule {}
