import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { loadEnv } from '@salychain/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { EventsModule } from './events/events.module.js';
import { ClientsModule } from './clients/clients.module.js';
import { CompletionsModule } from './completions/completions.module.js';
import { MintModule } from './mint/mint.module.js';
import { RedeemModule } from './redeem/redeem.module.js';
import { ReservesModule } from './reserves/reserves.module.js';
import { SupplyModule } from './supply/supply.module.js';
import { PublicModule } from './public/public.module.js';
import { HealthController } from './health/health.controller.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';
import { STABLECOIN_ENV, stablecoinEnvSchema } from './config/env.js';

@Module({
  imports: [
    TerminusModule,
    PrismaModule,
    EventsModule,
    ClientsModule,
    CompletionsModule,
    MintModule,
    RedeemModule,
    ReservesModule,
    SupplyModule,
    PublicModule,
  ],
  controllers: [HealthController],
  providers: [
    { provide: STABLECOIN_ENV, useFactory: () => loadEnv(stablecoinEnvSchema) },
    { provide: APP_FILTER, useClass: DomainErrorFilter },
  ],
})
export class AppModule {}
