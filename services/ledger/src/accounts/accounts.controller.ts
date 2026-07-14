import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service.js';
import { AccountResponseDto, CreateAccountDto } from './dto.js';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accounts: AccountsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a ledger account' })
  @ApiResponse({ status: 201, type: AccountResponseDto })
  async create(@Body() dto: CreateAccountDto) {
    const acc = await this.accounts.create(dto);
    return this.accounts.toResponse(acc);
  }

  @Get('by-code/:code')
  @ApiOperation({ summary: 'Fetch a ledger account by stable code' })
  @ApiResponse({ status: 200, type: AccountResponseDto })
  async byCode(@Param('code') code: string) {
    const acc = await this.accounts.findByCode(code);
    return this.accounts.toResponse(acc);
  }

  @Get('by-owner')
  @ApiOperation({ summary: 'List ledger accounts for an owner (optionally filter by currency)' })
  @ApiQuery({ name: 'owner_kind', required: true })
  @ApiQuery({ name: 'owner_id', required: true })
  @ApiQuery({ name: 'currency', required: false })
  async byOwner(
    @Query('owner_kind') ownerKind: string,
    @Query('owner_id') ownerId: string,
    @Query('currency') currency?: string,
  ) {
    const rows = await this.accounts.listByOwner({ ownerKind, ownerId, currency });
    return { data: rows.map((acc) => this.accounts.toResponse(acc)) };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a ledger account by id' })
  @ApiResponse({ status: 200, type: AccountResponseDto })
  async byId(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const acc = await this.accounts.findById(id);
    return this.accounts.toResponse(acc);
  }

  @Get(':id/balance')
  @ApiOperation({ summary: 'Authoritative balance (sums postings)' })
  async balance(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const balance = await this.accounts.authoritativeBalance(id);
    const account = await this.accounts.findById(id);
    return {
      account_id: id,
      currency: account.currency,
      balance_minor: balance.toString(),
      cached_balance_minor: account.balanceMinor.toString(),
      drift_minor: (balance - account.balanceMinor).toString(),
    };
  }
}
