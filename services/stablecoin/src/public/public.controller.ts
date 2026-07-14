import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PorService } from './por.service.js';

/** Unauthenticated public transparency endpoints for explorer and auditors. */
@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(private readonly por: PorService) {}

  @Get('por')
  @ApiOperation({ summary: 'Public proof-of-reserves snapshot (SalySD supply vs reserves)' })
  getPor() {
    return this.por.getPublicPor();
  }

  @Get('mint-requests')
  @ApiOperation({ summary: 'Recent SalySD mint requests (org-redacted)' })
  listMint(@Query('limit') limit?: string) {
    return this.por.listPublicMintRequests(limit ? Number(limit) : 20);
  }

  @Get('redeem-requests')
  @ApiOperation({ summary: 'Recent SalySD redeem requests (org-redacted)' })
  listRedeem(@Query('limit') limit?: string) {
    return this.por.listPublicRedeemRequests(limit ? Number(limit) : 20);
  }
}
