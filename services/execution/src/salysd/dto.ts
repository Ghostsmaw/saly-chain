import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class SalysdMintDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty({ description: 'Stablecoin mint_request id' })
  @IsString()
  @Length(36, 36)
  mint_request_id!: string;

  @ApiProperty({ description: 'L3 custodial wallet receiving minted SalySD' })
  @IsString()
  @Length(36, 36)
  destination_wallet_id!: string;

  @ApiProperty({ example: '1000000' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo?: string;
}

export class SalysdRedeemDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty({ description: 'Stablecoin redeem_request id' })
  @IsString()
  @Length(36, 36)
  redeem_request_id!: string;

  @ApiProperty({ description: 'L3 custodial wallet holding SalySD to burn' })
  @IsString()
  @Length(36, 36)
  source_wallet_id!: string;

  @ApiProperty({ example: '1000000' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo?: string;
}

export class SalysdRedeemFiatPayoutDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty({ description: 'Stablecoin redeem_request id' })
  @IsString()
  @Length(36, 36)
  redeem_request_id!: string;

  @ApiProperty({ description: 'Org that owns the redeem request' })
  @IsString()
  @Length(1, 128)
  org_id!: string;

  @ApiProperty({ example: '1000000', description: 'Fiat payout amount in minor units' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiPropertyOptional({ example: 'USD' })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  fiat_currency?: string;

  @ApiPropertyOptional({ example: 'US' })
  @IsOptional()
  @IsString()
  @Length(2, 2)
  country_code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  account_number?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bank_code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  holder_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo?: string;
}
