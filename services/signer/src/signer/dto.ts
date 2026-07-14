import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { SignerChain } from '../generated/prisma/index.js';

export class CreateKeyDto {
  @ApiProperty({ enum: SignerChain })
  @IsEnum(SignerChain)
  chain!: SignerChain;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 128)
  label?: string;
}

export class PolicyContextDto {
  @ApiProperty({ enum: SignerChain })
  @IsEnum(SignerChain)
  destination_chain!: SignerChain;

  @ApiProperty()
  @IsString()
  @Length(3, 128)
  destination_address!: string;

  @ApiProperty({ example: '5000000', description: 'Positive integer string, smallest unit' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiProperty({ example: 'USDC' })
  @IsString()
  @Length(2, 16)
  asset_symbol!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 256)
  memo?: string;
}

export class SignPolicyDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  destination_allowlist!: string[];

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  per_tx_cap_minor?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  daily_cap_minor?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  approval_threshold_minor?: string | null;

  @ApiProperty()
  required_approvers!: number;
}

export class SignDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 64)
  wallet_id?: string;

  @ApiProperty({ description: 'Signer key reference returned by createKey' })
  @IsString()
  @Length(8, 128)
  signer_key_ref!: string;

  @ApiProperty({ enum: SignerChain })
  @IsEnum(SignerChain)
  chain!: SignerChain;

  @ApiProperty({
    description:
      '0x-prefixed serialized unsigned tx (EVM) or hex-encoded canonical binary blob (XRPL)',
  })
  @IsString()
  @Length(2, 200_000)
  unsigned_tx!: string;

  @ApiProperty({ type: PolicyContextDto })
  @ValidateNested()
  @Type(() => PolicyContextDto)
  policy_context!: PolicyContextDto;

  @ApiPropertyOptional({ type: SignPolicyDto, description: 'Wallet policy supplied by wallet service (S4)' })
  @IsOptional()
  @ValidateNested()
  @Type(() => SignPolicyDto)
  policy?: SignPolicyDto;

  @ApiPropertyOptional({ example: '0', description: 'Rolling 24h spend in smallest unit' })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  rolling_24h_spent_minor?: string;

  @ApiPropertyOptional({ example: '1', description: 'Approver signatures already collected' })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  approvers?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class CreateKeyResponseDto {
  @ApiProperty() key_ref!: string;
  @ApiProperty({ enum: SignerChain }) chain!: SignerChain;
  @ApiProperty() public_address!: string;
  @ApiProperty() created_at!: string;
}

export class SignResponseDto {
  @ApiProperty() idempotency_key!: string;
  @ApiProperty() signed_tx!: string;
  @ApiProperty() signer_key_ref!: string;
  @ApiProperty() signed_at!: string;
}
