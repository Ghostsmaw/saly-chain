import { Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { healthEnvSchema, HEALTH_ENV } from '../config/env.js';
import { HealthVerticalController } from './health-vertical.controller.js';
import { HealthVerticalService } from './health-vertical.service.js';

@Module({
  controllers: [HealthVerticalController],
  providers: [HealthVerticalService, { provide: HEALTH_ENV, useFactory: () => loadEnv(healthEnvSchema) }],
})
export class HealthVerticalModule {}
