import { Body, Controller, Get, Module, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { VerificationTier } from '../generated/prisma/index.js';
import { KycService } from './kyc.service.js';

class SetTierDto {
  @IsString() external_ref!: string;
  @IsEnum(VerificationTier) tier!: VerificationTier;
  @IsOptional() @IsString() reason?: string;
}

@ApiTags('kyc')
@Controller('kyc')
class KycController {
  constructor(private readonly kyc: KycService) {}

  @Post('tier')
  @ApiOperation({ summary: 'Set a subject\'s KYC tier (admin operation in S2; vendor webhook in S3)' })
  async setTier(@Body() dto: SetTierDto) {
    await this.kyc.setTier(dto.external_ref, dto.tier, dto.reason);
    return { ok: true };
  }

  @Get('tier/:externalRef')
  @ApiOperation({ summary: 'Fetch a subject\'s current KYC tier' })
  async getTier(@Param('externalRef') externalRef: string) {
    const t = await this.kyc.getTier(externalRef);
    return { external_ref: externalRef, tier: t.tier, updated_at: t.updated_at };
  }
}

@Module({
  controllers: [KycController],
  providers: [KycService],
  exports: [KycService],
})
export class KycModule {}
