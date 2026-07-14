import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { DataClient } from '@salychain/sdk-internal';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import { DATA_CLIENT } from '../proxy/clients.module.js';

class TransfersQueryDto {
  @IsOptional() @IsString() chain?: string;
  @IsOptional() @IsString() token?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() limit?: string;
  @IsOptional() @IsString() offset?: string;
}

class DataQueryDto {
  @IsString() query!: string;
  @IsOptional() @IsObject() params?: Record<string, unknown>;
}

/**
 * Saly Realtime APIs (Product #1). Read-only ClickHouse-backed data behind the
 * gateway's `data:read` scope; rate limits, idempotency and request-log metering
 * are applied by the shared middleware — no new auth surface.
 */
@ApiTags('data')
@Controller('data')
@UseGuards(ScopeGuard)
export class DataController {
  constructor(@Inject(DATA_CLIENT) private readonly data: DataClient) {}

  @Get('transfers')
  @RequireScopes('data:read')
  @ApiOperation({ summary: 'List token transfers (filter by chain, token, address)' })
  transfers(@Query() query: TransfersQueryDto) {
    return this.data.transfers({
      chain: query.chain,
      token: query.token,
      address: query.address,
      limit: query.limit ? Number(query.limit) : undefined,
      offset: query.offset ? Number(query.offset) : undefined,
    });
  }

  @Get('address/:chain/:address/balances')
  @RequireScopes('data:read')
  @ApiOperation({ summary: 'Net token balances for an address on a chain' })
  balances(@Param('chain') chain: string, @Param('address') address: string) {
    return this.data.addressBalances(chain, address);
  }

  @Get('tx/:chain/:hash')
  @RequireScopes('data:read')
  @ApiOperation({ summary: 'Transaction detail with SalyChain settlement lineage when originated here' })
  tx(@Param('chain') chain: string, @Param('hash') hash: string) {
    return this.data.tx(chain, hash);
  }

  @Get('intent/:id/lineage')
  @RequireScopes('data:read')
  @ApiOperation({ summary: 'Intent settlement lineage (screening → routing → settlement)' })
  intentLineage(@Param('id') id: string) {
    return this.data.intentLineage(id);
  }

  @Get('block/:chain/:number')
  @RequireScopes('data:read')
  @ApiOperation({ summary: 'Block detail with token transfers in the block' })
  block(@Param('chain') chain: string, @Param('number') number: string) {
    return this.data.block(chain, number);
  }

  @Get('l3/settlements')
  @RequireScopes('data:read')
  @ApiOperation({ summary: 'L3 OutputProposed settlement outputs (rollup → L1)' })
  l3Settlements(@Query('chain') chain?: string, @Query('limit') limit?: string) {
    return this.data.l3Settlements({ chain, limit: limit ? Number(limit) : undefined });
  }

  @Get('stablecoin/usdc/supply')
  @RequireScopes('data:read')
  @ApiOperation({ summary: 'USDC net supply (mint − burn) per chain' })
  usdcSupply() {
    return this.data.usdcSupply();
  }

  @Get('query')
  @RequireScopes('data:read')
  @ApiOperation({ summary: 'List allowlisted named queries' })
  describeQueries() {
    return this.data.describeQueries();
  }

  @Post('query')
  @RequireScopes('data:read')
  @ApiOperation({ summary: 'Run a sandboxed, parameterized named query' })
  runQuery(@Body() body: DataQueryDto) {
    return this.data.runQuery(body);
  }
}
