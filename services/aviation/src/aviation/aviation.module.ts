import { Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { aviationEnvSchema, AVIATION_ENV } from '../config/env.js';
import { AviationController } from './aviation.controller.js';
import { AviationService } from './aviation.service.js';

@Module({
  controllers: [AviationController],
  providers: [AviationService, { provide: AVIATION_ENV, useFactory: () => loadEnv(aviationEnvSchema) }],
})
export class AviationModule {}
