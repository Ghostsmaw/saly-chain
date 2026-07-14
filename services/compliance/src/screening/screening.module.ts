import { Controller, Get, Inject, Module } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { loadEnv } from '@salychain/config';
import { complianceEnvSchema, type ComplianceEnv } from '../config/env.js';
import { createSanctionsProvider, describeProviderStatus } from './sanctions-provider.factory.js';
import { ScreeningService, SANCTIONS_PROVIDER } from './screening.service.js';
import { ScreeningController } from './screening.controller.js';
import type { SanctionsProvider } from './screening.provider.js';

export const COMPLIANCE_ENV = Symbol('COMPLIANCE_ENV');

@ApiTags('screening')
@Controller('screening')
class ScreeningStatusController {
  constructor(
    @Inject(SANCTIONS_PROVIDER) private readonly provider: SanctionsProvider,
    @Inject(COMPLIANCE_ENV) private readonly env: ComplianceEnv,
  ) {}

  @Get('provider')
  @ApiOperation({ summary: 'Active sanctions provider and vendor configuration status' })
  providerStatus() {
    return describeProviderStatus(this.env, this.provider);
  }
}

@Module({
  controllers: [ScreeningController, ScreeningStatusController],
  providers: [
    { provide: COMPLIANCE_ENV, useFactory: () => loadEnv(complianceEnvSchema) },
    {
      provide: SANCTIONS_PROVIDER,
      inject: [COMPLIANCE_ENV],
      useFactory: (env: ComplianceEnv): SanctionsProvider => createSanctionsProvider(env),
    },
    ScreeningService,
  ],
  exports: [ScreeningService, SANCTIONS_PROVIDER, COMPLIANCE_ENV],
})
export class ScreeningModule {}
