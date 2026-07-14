import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';

export class BridgeDepositDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty({ description: 'Base custodial wallet funding the bridge deposit' })
  @IsString()
  @Length(36, 36)
  source_wallet_id!: string;

  @ApiProperty({ description: 'L3 custodial wallet receiving bridged funds' })
  @IsString()
  @Length(36, 36)
  destination_wallet_id!: string;

  @ApiProperty({ example: '5000000' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiProperty({ enum: ['USDC'] })
  @IsEnum(['USDC'])
  asset!: 'USDC';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  intent_id?: string;
}

export class BridgeWithdrawDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty({ description: 'L3 custodial wallet initiating withdrawal to Base' })
  @IsString()
  @Length(36, 36)
  source_wallet_id!: string;

  @ApiProperty({ example: '0xabc...', description: 'Base recipient address' })
  @IsString()
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  destination_address!: string;

  @ApiProperty({ example: '5000000' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiProperty({ enum: ['USDC'] })
  @IsEnum(['USDC'])
  asset!: 'USDC';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  intent_id?: string;
}
