import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from './prisma/prisma.module.js';
import { ScreeningModule } from './screening/screening.module.js';
import { KycModule } from './kyc/kyc.module.js';
import { CasesModule } from './cases/cases.module.js';
import { OnboardingModule } from './onboarding/onboarding.module.js';
import { HealthController } from './health/health.controller.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';

@Module({
  imports: [TerminusModule, PrismaModule, ScreeningModule, KycModule, CasesModule, OnboardingModule],
  controllers: [HealthController],
  providers: [{ provide: APP_FILTER, useClass: DomainErrorFilter }],
})
export class AppModule {}
