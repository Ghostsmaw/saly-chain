import { Controller, Get, HttpCode, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SalysdService } from './salysd.service.js';
import { SalysdMintDto, SalysdRedeemDto, SalysdRedeemFiatPayoutDto } from './dto.js';
import { TransactionResponseDto } from '../transactions/dto.js';
import { toResponse } from '../transactions/transactions.service.js';

@ApiTags('salysd')
@Controller('salysd')
export class SalysdController {
  constructor(private readonly salysd: SalysdService) {}

  @Get('transactions')
  @ApiOperation({ summary: 'Recent SalySD mint/redeem execution transactions' })
  async transactions() {
    const data = await this.salysd.listRecent();
    return { data };
  }

  @Post('mint')
  @HttpCode(202)
  @ApiOperation({ summary: 'Execute on-chain SalySD mint from treasury minter wallet' })
  @ApiResponse({ status: 202, type: TransactionResponseDto })
  async mint(@Body() dto: SalysdMintDto) {
    const tx = await this.salysd.createMint(dto);
    return toResponse(tx);
  }

  @Post('redeem')
  @HttpCode(202)
  @ApiOperation({ summary: 'Execute on-chain SalySD burn (redeem unwind)' })
  @ApiResponse({ status: 202, type: TransactionResponseDto })
  async redeem(@Body() dto: SalysdRedeemDto) {
    const tx = await this.salysd.createRedeem(dto);
    return toResponse(tx);
  }

  @Post('redeem-fiat-payout')
  @HttpCode(202)
  @ApiOperation({ summary: 'Initiate fiat bank payout after SalySD burn (redeem unwind)' })
  @ApiResponse({ status: 202, type: TransactionResponseDto })
  async redeemFiatPayout(@Body() dto: SalysdRedeemFiatPayoutDto) {
    const tx = await this.salysd.createRedeemFiatPayout(dto);
    return toResponse(tx);
  }
}
