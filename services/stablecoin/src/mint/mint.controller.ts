import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MintService } from './mint.service.js';

class CreateMintDto {
  idempotency_key!: string;
  amount_minor!: string;
  chain?: 'SALY_L3' | 'BASE';
  destination_wallet_id?: string;
  destination_address?: string;
  reserve_account_id?: string;
}

@ApiTags('mint')
@Controller('mint-requests')
export class MintController {
  constructor(private readonly mint: MintService) {}

  @Post()
  create(@Body() body: CreateMintDto) {
    return this.mint.create(body);
  }

  @Post(':id/approve')
  @HttpCode(202)
  approve(@Param('id') id: string) {
    return this.mint.approve(id);
  }

  @Get()
  list() {
    return this.mint.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.mint.getById(id);
  }
}
