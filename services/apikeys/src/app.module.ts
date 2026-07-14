import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from './prisma/prisma.module.js';
import { OrgsModule } from './orgs/orgs.module.js';
import { KeysModule } from './keys/keys.module.js';
import { HealthController } from './health/health.controller.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';

@Module({
  imports: [TerminusModule, PrismaModule, OrgsModule, KeysModule],
  controllers: [HealthController],
  providers: [{ provide: APP_FILTER, useClass: DomainErrorFilter }],
})
export class AppModule {}
