import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { loadEnv } from '@salychain/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { ClientsModule } from './clients/clients.module.js';
import { PaymentLinksModule } from './payment-links/payment-links.module.js';
import { CheckoutModule } from './checkout/checkout.module.js';
import { SettlementModule } from './settlement/settlement.module.js';
import { HealthController } from './health/health.controller.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';
import { MERCHANT_ENV, merchantEnvSchema } from './config/env.js';

@Module({
  imports: [
    TerminusModule,
    PrismaModule,
    ClientsModule,
    PaymentLinksModule,
    CheckoutModule,
    SettlementModule,
  ],
  controllers: [HealthController],
  providers: [
    { provide: MERCHANT_ENV, useFactory: () => loadEnv(merchantEnvSchema) },
    { provide: APP_FILTER, useClass: DomainErrorFilter },
  ],
})
export class AppModule {}
