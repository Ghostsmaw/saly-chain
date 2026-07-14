import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class ChainAddressDto {
  @ApiProperty()
  @IsString()
  @Length(2, 32)
  chain!: string;

  @ApiProperty()
  @IsString()
  @Length(3, 128)
  address!: string;
}

export class ScreenSubjectDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  intent_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  transaction_id?: string;

  @ApiProperty()
  @IsString()
  @Length(1, 128)
  subject_ref!: string;

  @ApiProperty({ enum: ['USER', 'BUSINESS', 'COUNTERPARTY', 'AGENT'] })
  @IsEnum(['USER', 'BUSINESS', 'COUNTERPARTY', 'AGENT'])
  subject_kind!: 'USER' | 'BUSINESS' | 'COUNTERPARTY' | 'AGENT';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  display_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(2, 2)
  country_code?: string;

  @ApiPropertyOptional({ type: ChainAddressDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ChainAddressDto)
  chain_address?: ChainAddressDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
