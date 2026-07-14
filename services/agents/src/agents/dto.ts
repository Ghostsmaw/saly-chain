import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAgentDto {
  @ApiProperty({ example: 'usr_01J0G7NF7Z' })
  @IsString()
  @Length(4, 64)
  owner_id!: string;

  @ApiProperty({ enum: ['USER', 'BUSINESS'] })
  @IsEnum(['USER', 'BUSINESS'])
  owner_kind!: 'USER' | 'BUSINESS';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(4, 64)
  org_id?: string;

  @ApiProperty({ example: 'Invoice payment agent' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Chains to provision custodial wallets for', example: ['BASE'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  provision_chains?: Array<'BASE' | 'XRPL'>;
}

export class UpdateAgentStatusDto {
  @ApiProperty({ enum: ['ACTIVE', 'SUSPENDED', 'ARCHIVED'] })
  @IsEnum(['ACTIVE', 'SUSPENDED', 'ARCHIVED'])
  status!: 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';
}

export class UpdateSpendingPolicyDto {
  @ApiPropertyOptional({ example: '5000000' })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  per_tx_cap_minor?: string;

  @ApiPropertyOptional({ example: '50000000' })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  daily_cap_minor?: string;

  @ApiPropertyOptional({ example: '200000000' })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  monthly_cap_minor?: string;

  @ApiPropertyOptional({ example: '["0xabc...", "*"]' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  destination_allowlist?: string[];

  @ApiPropertyOptional({ example: '10000000' })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  approval_threshold_minor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  required_approvers?: number;

  @ApiPropertyOptional({ example: 'USD' })
  @IsOptional()
  @IsString()
  @Length(3, 8)
  currency?: string;
}

export class AuthorizeSpendDto {
  @ApiProperty({ example: '5000000' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiProperty({ example: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' })
  @IsString()
  @Length(3, 128)
  destination_address!: string;

  @ApiPropertyOptional({ example: 'itn_01J0G7NF7Z' })
  @IsOptional()
  @IsString()
  intent_id?: string;
}

export class VoteSpendApprovalDto {
  @ApiProperty({ example: 'usr_01J0G7NF7Z' })
  @IsString()
  @Length(4, 64)
  approver_id!: string;
}

export class CreateReasoningLogDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  summary!: string;

  @ApiProperty({ description: 'Structured reasoning chain from Saly AI' })
  @IsArray()
  steps!: unknown[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  intent_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  trace_id?: string;
}
