import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DataService } from './data.service.js';
import { NamedQueryDto, TransfersQueryDto } from './dto.js';

/**
 * Internal data API. No auth here — it sits behind the gateway, which enforces
 * the `data:read` scope, rate limits and metering. Mirrors the trust model of
 * the other internal services.
 */
@Controller('data')
export class DataController {
  constructor(private readonly data: DataService) {}

  @Get('transfers')
  transfers(@Query() query: TransfersQueryDto) {
    return this.data.transfers(query);
  }

  @Get('address/:chain/:address/balances')
  balances(@Param('chain') chain: string, @Param('address') address: string) {
    return this.data.addressBalances(chain, address);
  }

  @Get('tx/:chain/:hash')
  tx(@Param('chain') chain: string, @Param('hash') hash: string) {
    return this.data.tx(chain, hash);
  }

  @Get('intent/:id/lineage')
  intentLineage(@Param('id') id: string) {
    return this.data.intentLineage(id);
  }

  @Get('block/:chain/:number')
  block(@Param('chain') chain: string, @Param('number') number: string) {
    return this.data.block(chain, Number(number));
  }

  @Get('l3/settlements')
  l3Settlements(@Query('chain') chain?: string, @Query('limit') limit?: string) {
    return this.data.l3Settlements(chain, limit ? Number(limit) : undefined);
  }

  @Get('stablecoin/usdc/supply')
  usdcSupply() {
    return this.data.stablecoinSupply('USDC');
  }

  @Get('stablecoin/salysd/supply')
  salysdSupply() {
    return this.data.stablecoinSupply('SALYSD');
  }

  @Get('query')
  describeQueries() {
    return this.data.describeQueries();
  }

  @Post('query')
  runQuery(@Body() body: NamedQueryDto) {
    return this.data.runNamed(body);
  }
}
