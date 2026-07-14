import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from './prisma/prisma.module.js';
import { HealthController } from './health/health.controller.js';
import { AccountsModule } from './accounts/accounts.module.js';
import { JournalModule } from './journal/journal.module.js';
import { TransactionsModule } from './transactions/transactions.module.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    TerminusModule,
    PrismaModule,
    AccountsModule,
    JournalModule,
    TransactionsModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DomainErrorFilter,
    },
  ],
})
export class AppModule {}
