import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiPropertyOptional, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PolicyService } from './policy.service.js';
import { IsArray, IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';

class UpdateWalletPolicyDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  destination_allowlist?: string[];

  @ApiPropertyOptional({ description: 'Trusted IOU issuers: CURRENCY:rAddress or *' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  trusted_issuer_allowlist?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  per_tx_cap_minor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  daily_cap_minor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  approval_threshold_minor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  required_approvers?: number;
}

@ApiTags('wallet-policies')
@Controller('wallets')
export class PolicyController {
  constructor(private readonly policy: PolicyService) {}

  @Get(':id/policy')
  @ApiOperation({ summary: 'Get wallet spending policy' })
  getPolicy(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.policy.getPolicy(id);
  }

  @Patch(':id/policy')
  @ApiOperation({ summary: 'Update wallet spending policy' })
  updatePolicy(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateWalletPolicyDto,
  ) {
    return this.policy.updatePolicy(id, {
      destinationAllowlist: dto.destination_allowlist,
      trustedIssuerAllowlist: dto.trusted_issuer_allowlist,
      perTxCapMinor: dto.per_tx_cap_minor,
      dailyCapMinor: dto.daily_cap_minor,
      approvalThresholdMinor: dto.approval_threshold_minor,
      requiredApprovers: dto.required_approvers,
    });
  }

  @Post(':id/policy/ensure-dex')
  @ApiOperation({ summary: 'Ensure Uniswap router allowlist + DEX caps on a BASE wallet' })
  ensureDexPolicy(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.policy.ensureDexPolicy(id);
  }

  @Post(':id/policy/ensure-iou')
  @ApiOperation({ summary: 'Ensure XRPL IOU issuer allowlist + caps on an XRPL wallet' })
  ensureXrplIouPolicy(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.policy.ensureXrplIouPolicy(id);
  }

  @Get(':id/rolling-spend')
  @ApiOperation({ summary: 'Rolling 24h spend for policy enforcement' })
  rollingSpend(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.policy.getRolling24hSpentMinor(id);
  }

  @Get(':id/rolling-spend-30d')
  @ApiOperation({ summary: 'Rolling 30d spend for monthly cap enforcement' })
  rollingSpend30d(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.policy.getRolling30dSpentMinor(id);
  }
}
