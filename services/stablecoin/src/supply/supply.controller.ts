import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SupplyService } from './supply.service.js';

class SnapshotDto {
  chain!: 'SALY_L3' | 'BASE';
  on_chain_supply_minor!: string;
  reserve_total_minor!: string;
}

@ApiTags('supply')
@Controller('supply')
export class SupplyController {
  constructor(private readonly supply: SupplyService) {}

  @Get('latest')
  latest(@Query('chain') chain?: 'SALY_L3' | 'BASE') {
    return this.supply.latest(chain ?? 'SALY_L3');
  }

  @Post('snapshots')
  capture(@Body() body: SnapshotDto) {
    return this.supply.captureSnapshot(body);
  }
}
