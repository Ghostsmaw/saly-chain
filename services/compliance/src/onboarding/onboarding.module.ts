import { Body, Controller, Get, Module, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsIn, IsObject, IsOptional, IsString, MinLength } from 'class-validator';
import { loadEnv } from '@salychain/config';
import { KycModule } from '../kyc/kyc.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { complianceEnvSchema } from '../config/env.js';
import { PII_VAULT, PiiVault } from '../crypto/pii-vault.js';
import { OnboardingService, type OnboardingProfile } from './onboarding.service.js';

class StartOnboardingDto {
  @IsString()
  @MinLength(4)
  external_ref!: string;

  @IsIn(['business', 'developer'])
  profile!: OnboardingProfile;

  @IsOptional()
  @IsString()
  display_name?: string;

  @IsOptional()
  @IsString()
  email?: string;
}

class SubmitOnboardingStepDto {
  @IsString()
  @MinLength(1)
  step!: string;

  @IsObject()
  data!: Record<string, unknown>;
}

@ApiTags('onboarding')
@Controller('onboarding')
class OnboardingController {
  constructor(private readonly onboarding: OnboardingService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start progressive KYC/KYB onboarding for a user' })
  start(@Body() body: StartOnboardingDto) {
    return this.onboarding.start({
      externalRef: body.external_ref,
      profile: body.profile,
      displayName: body.display_name,
      email: body.email,
    });
  }

  @Get(':externalRef')
  @ApiOperation({ summary: 'Fetch onboarding status and step progress' })
  get(@Param('externalRef') externalRef: string) {
    return this.onboarding.get(externalRef);
  }

  @Patch(':externalRef')
  @ApiOperation({ summary: 'Submit data for an onboarding step' })
  submit(@Param('externalRef') externalRef: string, @Body() body: SubmitOnboardingStepDto) {
    return this.onboarding.submitStep(externalRef, body.step, body.data);
  }

  @Post(':externalRef/resubmit')
  @ApiOperation({ summary: 'Resubmit a rejected onboarding package for admin review' })
  resubmit(@Param('externalRef') externalRef: string) {
    return this.onboarding.resubmitForReview(externalRef);
  }
}

@Module({
  imports: [KycModule, PrismaModule],
  controllers: [OnboardingController],
  providers: [
    {
      provide: PII_VAULT,
      useFactory: () => new PiiVault(loadEnv(complianceEnvSchema).COMPLIANCE_PII_ENC_KEY),
    },
    OnboardingService,
  ],
  exports: [OnboardingService],
})
export class OnboardingModule {}
