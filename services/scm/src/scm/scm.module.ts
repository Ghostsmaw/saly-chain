import { Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { scmEnvSchema, SCM_ENV } from '../config/env.js';
import { ScmController } from './scm.controller.js';
import { ScmService } from './scm.service.js';

@Module({
  controllers: [ScmController],
  providers: [ScmService, { provide: SCM_ENV, useFactory: () => loadEnv(scmEnvSchema) }],
})
export class ScmModule {}
