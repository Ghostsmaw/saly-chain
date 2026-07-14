import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsString, Length } from 'class-validator';
import { TransactionKind } from '../generated/prisma/index.js';
import { TransactionsService } from './transactions.service.js';

class CreateTransactionDto {
  @IsEnum(TransactionKind)
  kind!: TransactionKind;

  @IsOptional()
  @IsString()
  @Length(1, 128)
  external_ref?: string;

  @IsOptional()
  @IsString()
  @Length(1, 128)
  intent_id?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly txs: TransactionsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Open a new business transaction' })
  async create(@Body() dto: CreateTransactionDto) {
    const tx = await this.txs.create({
      kind: dto.kind,
      externalRef: dto.external_ref,
      intentId: dto.intent_id,
      metadata: dto.metadata,
    });
    return this.txs.toResponse(tx);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a business transaction by id' })
  async byId(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const tx = await this.txs.findById(id);
    return this.txs.toResponse(tx);
  }
}
