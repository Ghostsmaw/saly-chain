import { Module } from '@nestjs/common';
import { CompletionsService } from './completions.service.js';
import { EventsModule } from '../events/events.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ClientsModule } from '../clients/clients.module.js';

@Module({
  imports: [EventsModule, PrismaModule, ClientsModule],
  providers: [CompletionsService],
})
export class CompletionsModule {}
