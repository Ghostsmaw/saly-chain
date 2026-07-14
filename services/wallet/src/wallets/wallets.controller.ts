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
import type { Chain } from '../generated/prisma/index.js';
import { WalletsService } from './wallets.service.js';
import { ProvisionWalletDto, WalletResponseDto } from './dto.js';

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly wallets: WalletsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Provision a new custodial wallet' })
  @ApiResponse({ status: 201, type: WalletResponseDto })
  async provision(@Body() dto: ProvisionWalletDto) {
    const wallet = await this.wallets.provision(dto);
    return this.wallets.toResponse(wallet);
  }

  @Get()
  @ApiOperation({ summary: 'List wallets, optionally filtered by owner / chain' })
  @ApiQuery({ name: 'owner_id', required: false })
  @ApiQuery({ name: 'chain', required: false })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async list(
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('owner_id') ownerId?: string,
    @Query('chain') chain?: Chain,
  ) {
    const data = await this.wallets.list({ ownerId, chain, limit });
    return { data: data.map((w) => this.wallets.toResponse(w)) };
  }

  @Get('lookup')
  @ApiOperation({ summary: 'Resolve a custodial wallet by chain and on-chain address' })
  @ApiQuery({ name: 'chain', required: true })
  @ApiQuery({ name: 'address', required: true })
  async lookup(@Query('chain') chain: Chain, @Query('address') address: string) {
    const wallet = await this.wallets.findByAddress(chain, address);
    if (!wallet) return { data: null };
    return { data: this.wallets.toResponse(wallet) };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Wallet inventory counters and pending broadcast jobs' })
  async stats() {
    return this.wallets.stats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a wallet by id' })
  async byId(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const wallet = await this.wallets.findById(id);
    return this.wallets.toResponse(wallet);
  }

  @Post(':id/ensure-ledger-account')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create or return the wallet ledger liability account' })
  @ApiResponse({ status: 200, type: WalletResponseDto })
  async ensureLedgerAccount(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const wallet = await this.wallets.ensureLedgerAccount(id);
    return this.wallets.toResponse(wallet);
  }
}
