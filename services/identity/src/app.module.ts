import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { IdentityModule } from './identity.module.js';
import { HealthController } from './health/health.controller.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';

@Module({
  imports: [TerminusModule, IdentityModule],
  controllers: [HealthController],
  providers: [{ provide: APP_FILTER, useClass: DomainErrorFilter }],
})
export class AppModule {}
