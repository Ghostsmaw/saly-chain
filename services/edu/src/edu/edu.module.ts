import { Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { eduEnvSchema, EDU_ENV } from '../config/env.js';
import { EduController } from './edu.controller.js';
import { EduService } from './edu.service.js';

@Module({
  controllers: [EduController],
  providers: [EduService, { provide: EDU_ENV, useFactory: () => loadEnv(eduEnvSchema) }],
})
export class EduModule {}
