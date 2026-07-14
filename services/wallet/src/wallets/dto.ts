import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsString, Length } from 'class-validator';
import { Chain, WalletKind } from '../generated/prisma/index.js';

export class ProvisionWalletDto {
  @ApiProperty({ enum: Chain })
  @IsEnum(Chain)
  chain!: Chain;

  @ApiProperty({ enum: WalletKind })
  @IsEnum(WalletKind)
  kind!: WalletKind;

  @ApiPropertyOptional({ example: 'usr_01J0G7NF7Z' })
  @IsOptional()
  @IsString()
  @Length(1, 64)
  owner_id?: string;

  @ApiPropertyOptional({ example: 'USER' })
  @IsOptional()
  @IsString()
  @Length(1, 32)
  owner_kind?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 128)
  label?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class WalletResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() chain!: Chain;
  @ApiProperty() address!: string;
  @ApiProperty() kind!: WalletKind;
  @ApiProperty() status!: string;
  @ApiProperty({ description: 'Reference to key material; never the key itself' })
  signer_key_ref!: string;
  @ApiPropertyOptional() owner_id?: string;
  @ApiPropertyOptional() owner_kind?: string;
  @ApiPropertyOptional({ description: 'Linked ledger liability account for this wallet' })
  ledger_account_id?: string;
  @ApiProperty() created_at!: string;
}
