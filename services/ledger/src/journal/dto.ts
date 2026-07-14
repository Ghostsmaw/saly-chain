import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { PostingDirection } from '../generated/prisma/index.js';

export class PostingInputDto {
  @ApiProperty({ description: 'Account UUID' })
  @IsString()
  @Length(36, 36)
  account_id!: string;

  @ApiProperty({ enum: PostingDirection })
  @IsEnum(PostingDirection)
  direction!: PostingDirection;

  @ApiProperty({ example: '5000', description: 'Positive integer string in minor units' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiProperty({ example: 'NGN' })
  @IsString()
  @Matches(/^[A-Z]{3,8}$/)
  currency!: string;
}

export class PostJournalEntryDto {
  @ApiProperty({ description: 'Caller-supplied idempotency key (use ULIDs)' })
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiPropertyOptional({ description: 'Business-level transaction ID this entry settles' })
  @IsOptional()
  @IsString()
  @Length(36, 36)
  transaction_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 256)
  memo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @ApiProperty({ type: [PostingInputDto], minItems: 2 })
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => PostingInputDto)
  postings!: PostingInputDto[];
}

export class JournalEntryResponseDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  idempotency_key!: string;
  @ApiProperty()
  status!: string;
  @ApiProperty()
  posted_at!: string | null;
  @ApiProperty()
  postings!: Array<{
    id: string;
    account_id: string;
    direction: string;
    amount_minor: string;
    currency: string;
  }>;
}
