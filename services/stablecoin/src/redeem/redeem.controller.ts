import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedeemService } from './redeem.service.js';

class CreateRedeemDto {
  idempotency_key!: string;
  amount_minor!: string;
  source_wallet_id!: string;
  payout_rail!: 'FIAT' | 'INTERNAL';
  chain?: 'SALY_L3' | 'BASE';
  payout?: {
    currency?: string;
    country_code?: string;
    account_number?: string;
    bank_code?: string;
    holder_name?: string;
  };
}

@ApiTags('redeem')
@Controller('redeem-requests')
export class RedeemController {
  constructor(private readonly redeem: RedeemService) {}

  @Post()
  create(@Body() body: CreateRedeemDto) {
    return this.redeem.create(body);
  }

  @Post(':id/approve')
  @HttpCode(202)
  approve(@Param('id') id: string) {
    return this.redeem.approve(id);
  }

  @Get()
  list() {
    return this.redeem.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.redeem.getById(id);
  }
}
