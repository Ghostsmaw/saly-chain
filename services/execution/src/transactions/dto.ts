import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class InternalTransferDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty()
  @IsString()
  @Length(36, 36)
  from_account_id!: string;

  @ApiProperty()
  @IsString()
  @Length(36, 36)
  to_account_id!: string;

  @ApiProperty({ example: '5000', description: 'Amount in minor units' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiProperty({ example: 'NGN' })
  @IsString()
  @Length(2, 8)
  currency!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  intent_id?: string;
}

export class BasePayoutDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty()
  @IsString()
  @Length(36, 36)
  source_wallet_id!: string;

  @ApiProperty({ example: '0xabc...' })
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

export class L3PayoutDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty()
  @IsString()
  @Length(36, 36)
  source_wallet_id!: string;

  @ApiProperty({ example: '0xabc...' })
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

export class XrplPayoutDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty()
  @IsString()
  @Length(36, 36)
  source_wallet_id!: string;

  @ApiProperty({ example: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe' })
  @IsString()
  @Matches(/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/)
  destination_address!: string;

  @ApiProperty({ example: '1000000', description: 'Amount in drops (1 XRP = 1,000,000 drops)' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiProperty({ enum: ['XRP', 'USD', 'EUR'] })
  @IsEnum(['XRP', 'USD', 'EUR'])
  asset!: 'XRP' | 'USD' | 'EUR';

  @ApiPropertyOptional({
    description:
      'XRPL IOU issuer (required when asset is USD/EUR unless configured in wallet XRPL_IOU_ISSUERS)',
  })
  @IsOptional()
  @IsString()
  @Matches(/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/)
  iou_issuer?: string;

  @ApiPropertyOptional({ description: 'XRPL destination tag (for hosted-wallet exchanges)' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  destination_tag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  intent_id?: string;
}

export class IngestIntentDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty({
    description: 'Canonical Intent payload (must conform to @salychain/intent-schema)',
  })
  @IsObject()
  intent!: Record<string, unknown>;
}

export class TransactionResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() kind!: string;
  @ApiProperty() state!: string;
  @ApiProperty() source!: Record<string, unknown>;
  @ApiProperty() destination!: Record<string, unknown>;
  @ApiPropertyOptional() ledger_entry_id?: string;
  @ApiPropertyOptional() broadcast_id?: string;
  @ApiPropertyOptional() tx_hash?: string;
  @ApiPropertyOptional() intent_id?: string;
  @ApiPropertyOptional() error?: string;
  @ApiProperty() created_at!: string;
  @ApiPropertyOptional() settled_at?: string;
  @ApiProperty() events!: Array<{ state: string; at: string; detail?: Record<string, unknown> }>;
}

export class TopupDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty({ description: 'Business actor id (biz_*)' })
  @IsString()
  @Length(4, 64)
  actor_id!: string;

  @ApiProperty({ description: 'Ledger account UUID or code to credit' })
  @IsString()
  @Length(3, 128)
  destination_account_ref!: string;

  @ApiProperty({ example: '500000', description: 'Amount in minor units' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiProperty({ example: 'NGN' })
  @IsString()
  @Length(2, 8)
  currency!: string;

  @ApiPropertyOptional({ description: 'External bank / wire reference (ops reconciliation)' })
  @IsOptional()
  @IsString()
  @Length(1, 256)
  external_reference?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo?: string;
}

export class FiatPayinDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty({ description: 'Business actor id receiving the funds (biz_*)' })
  @IsString()
  @Length(4, 64)
  actor_id!: string;

  @ApiProperty({ description: 'Ledger account UUID or code to credit on settlement' })
  @IsString()
  @Length(3, 128)
  destination_account_ref!: string;

  @ApiProperty({ example: '500000', description: 'Amount in minor units' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiProperty({ example: 'NGN' })
  @IsString()
  @Length(2, 8)
  currency!: string;

  @ApiProperty({ example: 'NG', description: 'ISO-3166-1 alpha-2 country of the payer' })
  @IsString()
  @Length(2, 2)
  country!: string;

  @ApiProperty({ description: 'Payer / paying entity display name' })
  @IsString()
  @Length(1, 128)
  customer_name!: string;

  @ApiPropertyOptional({ description: 'Payer email (used for hosted checkout receipts)' })
  @IsOptional()
  @IsEmail()
  customer_email?: string;

  @ApiPropertyOptional({ enum: ['VIRTUAL_ACCOUNT', 'CHECKOUT'] })
  @IsOptional()
  @IsEnum(['VIRTUAL_ACCOUNT', 'CHECKOUT'])
  method?: 'VIRTUAL_ACCOUNT' | 'CHECKOUT';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo?: string;
}

export class SeedClearingDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty({ example: 'NGN' })
  @IsString()
  @Length(2, 8)
  currency!: string;

  @ApiProperty({ example: '100000000', description: 'Amount in minor units to prefund clearing' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo?: string;
}
