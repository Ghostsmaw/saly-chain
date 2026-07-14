import { Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { agriEnvSchema, AGRI_ENV } from '../config/env.js';
import { AgriController } from './agri.controller.js';
import { AgriService } from './agri.service.js';

@Module({
  controllers: [AgriController],
  providers: [AgriService, { provide: AGRI_ENV, useFactory: () => loadEnv(agriEnvSchema) }],
})
export class AgriModule {}
