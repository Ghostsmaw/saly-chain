import { Controller, Get, HttpCode, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BridgeService } from './bridge.service.js';
import { BridgeDepositDto, BridgeWithdrawDto } from './dto.js';
import { TransactionResponseDto } from '../transactions/dto.js';
import { toResponse } from '../transactions/transactions.service.js';

@ApiTags('bridge')
@Controller('bridge')
export class BridgeController {
  constructor(private readonly bridge: BridgeService) {}

  @Get('status')
  @ApiOperation({ summary: 'Canonical L3 ↔ Base bridge contract configuration' })
  async status() {
    return this.bridge.getStatus();
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Recent bridge deposit/withdraw execution transactions' })
  async transactions() {
    const data = await this.bridge.listRecent();
    return { data };
  }

  @Post('deposit')
  @HttpCode(202)
  @ApiOperation({ summary: 'Initiate Base → L3 bridge deposit from custodial wallets' })
  @ApiResponse({ status: 202, type: TransactionResponseDto })
  async deposit(@Body() dto: BridgeDepositDto) {
    const tx = await this.bridge.createDeposit(dto);
    return toResponse(tx);
  }

  @Post('withdraw')
  @HttpCode(202)
  @ApiOperation({ summary: 'Initiate L3 → Base bridge withdrawal' })
  @ApiResponse({ status: 202, type: TransactionResponseDto })
  async withdraw(@Body() dto: BridgeWithdrawDto) {
    const tx = await this.bridge.createWithdraw(dto);
    return toResponse(tx);
  }
}
