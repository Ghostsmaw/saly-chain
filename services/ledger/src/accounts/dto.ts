import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsString, Length, Matches } from 'class-validator';
import { AccountType } from '../generated/prisma/index.js';

export class CreateAccountDto {
  @ApiProperty({ example: 'user:01J0G7NF7Z:NGN', description: 'Globally unique human-readable code' })
  @IsString()
  @Length(3, 128)
  code!: string;

  @ApiProperty({ enum: AccountType })
  @IsEnum(AccountType)
  type!: AccountType;

  @ApiProperty({ example: 'NGN' })
  @IsString()
  @Matches(/^[A-Z]{3,8}$/)
  currency!: string;

  @ApiPropertyOptional({ example: 'usr_01J0G7NF7Z' })
  @IsOptional()
  @IsString()
  ownerId?: string;

  @ApiPropertyOptional({ example: 'USER' })
  @IsOptional()
  @IsString()
  ownerKind?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class AccountResponseDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  code!: string;
  @ApiProperty({ enum: AccountType })
  type!: AccountType;
  @ApiProperty()
  currency!: string;
  @ApiProperty({ example: '0', description: 'Balance in minor units, as a string' })
  balance_minor!: string;
  @ApiProperty()
  status!: string;
  @ApiPropertyOptional()
  owner_id?: string;
  @ApiPropertyOptional()
  owner_kind?: string;
  @ApiProperty()
  created_at!: string;
}
