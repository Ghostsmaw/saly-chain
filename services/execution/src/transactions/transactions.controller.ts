import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExecutionTransactionKind, ExecutionTransactionState } from '../generated/prisma/index.js';
import { toResponse, TransactionsService } from './transactions.service.js';
import {
  BasePayoutDto,
  FiatPayinDto,
  IngestIntentDto,
  InternalTransferDto,
  L3PayoutDto,
  TopupDto,
  TransactionResponseDto,
  XrplPayoutDto,
} from './dto.js';

@ApiTags('transactions')
@Controller()
export class TransactionsController {
  constructor(private readonly txs: TransactionsService) {}

  @Post('transfers')
  @HttpCode(201)
  @ApiOperation({ summary: 'Internal ledger transfer (no chain hop)' })
  @ApiResponse({ status: 201, type: TransactionResponseDto })
  async internalTransfer(@Body() dto: InternalTransferDto) {
    const tx = await this.txs.createInternalTransfer(dto);
    return toResponse(tx);
  }

  @Post('payouts/base')
  @HttpCode(202)
  @ApiOperation({ summary: 'Base USDC payout from a custodial wallet' })
  @ApiResponse({ status: 202, type: TransactionResponseDto })
  async basePayout(@Body() dto: BasePayoutDto) {
    const tx = await this.txs.createBasePayout(dto);
    return toResponse(tx);
  }

  @Post('payouts/l3')
  @HttpCode(202)
  @ApiOperation({ summary: 'Saly L3 USDC payout from a custodial wallet' })
  @ApiResponse({ status: 202, type: TransactionResponseDto })
  async l3Payout(@Body() dto: L3PayoutDto) {
    const tx = await this.txs.createL3Payout(dto);
    return toResponse(tx);
  }

  @Post('payouts/xrpl')
  @HttpCode(202)
  @ApiOperation({ summary: 'Native XRP payout from a custodial XRPL wallet' })
  @ApiResponse({ status: 202, type: TransactionResponseDto })
  async xrplPayout(@Body() dto: XrplPayoutDto) {
    const tx = await this.txs.createXrplPayout(dto);
    return toResponse(tx);
  }

  @Post('intents')
  @HttpCode(202)
  @ApiOperation({
    summary: 'Ingest a canonical intent and run the screen→route→quote→execute pipeline',
  })
  @ApiResponse({ status: 202, type: TransactionResponseDto })
  async ingestIntent(@Body() dto: IngestIntentDto) {
    const tx = await this.txs.ingestIntent(dto);
    return toResponse(tx);
  }

  @Post('topups')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Credit a ledger account from inbound clearing (Tier 2 — no real pay-in rail)',
  })
  @ApiResponse({ status: 201, type: TransactionResponseDto })
  async createTopup(@Body() dto: TopupDto) {
    const tx = await this.txs.createTopup(dto);
    return toResponse(tx);
  }

  @Post('payins')
  @HttpCode(202)
  @ApiOperation({
    summary: 'Open a real PSP pay-in (virtual account / checkout); credited on PSP confirmation',
  })
  @ApiResponse({ status: 202, description: 'Pay-in opened; returns payment instructions' })
  async createPayin(@Body() dto: FiatPayinDto) {
    const { transaction, instruction } = await this.txs.createFiatPayin(dto);
    return { transaction: toResponse(transaction), payin: instruction };
  }

  @Post('transactions/resume-approval')
  @HttpCode(202)
  @ApiOperation({ summary: 'Resume a transaction held for manual spend approval' })
  async resumeApproval(@Body() body: { intent_id: string }) {
    const tx = await this.txs.resumeAfterApproval(body.intent_id);
    return toResponse(tx);
  }

  @Get('payroll-batches/:id/lines')
  @ApiOperation({ summary: 'List child payout transactions for a PAYROLL_BATCH' })
  async getPayrollBatchLines(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const lines = await this.txs.getPayrollBatchLines(id);
    return { data: lines };
  }

  @Get('transactions/:id')
  @ApiOperation({ summary: 'Fetch a transaction with its event log' })
  @ApiResponse({ status: 200, type: TransactionResponseDto })
  async getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const tx = await this.txs.getById(id);
    return toResponse(tx);
  }

  @Get('transactions')
  @ApiOperation({ summary: 'List recent transactions, newest first' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'cursor', required: false, type: String })
  @ApiQuery({ name: 'state', required: false, enum: ExecutionTransactionState })
  @ApiQuery({ name: 'kind', required: false, enum: ExecutionTransactionKind })
  @ApiQuery({ name: 'payroll_parent_id', required: false, type: String })
  async list(
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
    @Query('cursor') cursor?: string,
    @Query('state') state?: ExecutionTransactionState,
    @Query('kind') kind?: ExecutionTransactionKind,
    @Query('payroll_parent_id') payrollParentId?: string,
  ) {
    return this.txs.list({ limit, cursor, state, kind, payrollParentId });
  }
}
