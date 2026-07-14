import { Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { govEnvSchema, GOV_ENV } from '../config/env.js';
import { GovController } from './gov.controller.js';
import { GovService } from './gov.service.js';

@Module({
  controllers: [GovController],
  providers: [GovService, { provide: GOV_ENV, useFactory: () => loadEnv(govEnvSchema) }],
})
export class GovModule {}
