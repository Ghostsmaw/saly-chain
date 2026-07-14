import { Body, Controller, Get, Inject, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { IntelligenceClient } from '@salychain/sdk-internal';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import { INTELLIGENCE_CLIENT } from '../proxy/clients.module.js';
import type { AuthenticatedRequest } from '../auth/auth.types.js';

class ResolveDto {
  @IsOptional() @IsString() @Length(1, 64) chain?: string;
  @IsOptional() @IsBoolean() async?: boolean;
}

class NlQueryDto {
  @IsString() @Length(3, 500) question!: string;
}

class UpsertEmbeddingDto {
  @IsString() @Length(1, 64) chain!: string;
  @IsString() @Length(1, 128) address!: string;
}

class MaterializeDto {
  @IsString() @Length(1, 64) chain!: string;
}

/**
 * Saly Intelligence (Product #5). Entity resolution, point-in-time features,
 * vector search, and semantic-layer natural-language analytics. Reads require
 * `intelligence:read`; resolution/embedding mutations require `intelligence:write`.
 */
@ApiTags('intelligence')
@Controller('intelligence')
@UseGuards(ScopeGuard)
export class IntelligenceController {
  constructor(@Inject(INTELLIGENCE_CLIENT) private readonly intel: IntelligenceClient) {}

  // ── Entities ──────────────────────────────────────────────────────────────
  @Get('entities')
  @RequireScopes('intelligence:read')
  @ApiOperation({ summary: 'List resolved entities (highest risk first)' })
  listEntities(
    @Query('chain') chain?: string,
    @Query('sanctioned') sanctioned?: string,
    @Query('limit') limit?: string,
  ) {
    return this.intel.listEntities({
      ...(chain ? { chain } : {}),
      ...(sanctioned !== undefined ? { sanctioned: sanctioned === 'true' } : {}),
      ...(limit ? { limit: Number(limit) } : {}),
    });
  }

  @Get('entities/runs')
  @RequireScopes('intelligence:read')
  listRuns(@Query('limit') limit?: string) {
    return this.intel.listRuns({ ...(limit ? { limit: Number(limit) } : {}) });
  }

  @Get('entities/by-address')
  @RequireScopes('intelligence:read')
  @ApiOperation({ summary: 'Resolve the entity an address belongs to' })
  byAddress(@Query('chain') chain: string, @Query('address') address: string) {
    return this.intel.entityByAddress(chain, address);
  }

  @Get('entities/:id')
  @RequireScopes('intelligence:read')
  getEntity(@Param('id') id: string) {
    return this.intel.getEntity(id);
  }

  @Post('entities/resolve')
  @RequireScopes('intelligence:write')
  @ApiOperation({ summary: 'Run (or enqueue) an entity-resolution pass' })
  resolve(@Body() dto: ResolveDto) {
    return this.intel.resolve({
      ...(dto.chain ? { chain: dto.chain } : {}),
      ...(dto.async !== undefined ? { async: dto.async } : {}),
    });
  }

  // ── Features ────────────────────────────────────────────────────────────────
  @Get('features/address')
  @RequireScopes('intelligence:read')
  @ApiOperation({ summary: 'Point-in-time feature vector for an address' })
  features(
    @Query('chain') chain: string,
    @Query('address') address: string,
    @Query('as_of') asOf?: string,
  ) {
    return this.intel.addressFeatures(chain, address, asOf);
  }

  // ── Embeddings ──────────────────────────────────────────────────────────────
  @Get('embeddings/search')
  @RequireScopes('intelligence:read')
  @ApiOperation({ summary: 'Nearest-neighbour address search' })
  search(
    @Query('chain') chain: string,
    @Query('q') q?: string,
    @Query('address') address?: string,
    @Query('k') k?: string,
  ) {
    return this.intel.searchEmbeddings({
      chain,
      ...(q ? { q } : {}),
      ...(address ? { address } : {}),
      ...(k ? { k: Number(k) } : {}),
    });
  }

  @Post('embeddings/upsert')
  @RequireScopes('intelligence:write')
  @ApiOperation({ summary: 'Compute + store an address activity embedding' })
  upsert(@Body() dto: UpsertEmbeddingDto) {
    return this.intel.upsertEmbedding(dto.chain, dto.address);
  }

  @Post('embeddings/materialize')
  @RequireScopes('intelligence:write')
  @ApiOperation({ summary: 'Enqueue embedding (re)materialization for a chain' })
  materialize(@Body() dto: MaterializeDto) {
    return this.intel.materializeEmbeddings(dto.chain);
  }

  // ── Natural-language analytics ──────────────────────────────────────────────
  @Post('nl/query')
  @RequireScopes('intelligence:read')
  @ApiOperation({ summary: 'Ask a natural-language analytics question' })
  ask(@Req() req: AuthenticatedRequest, @Body() dto: NlQueryDto) {
    return this.intel.ask(dto.question, req.auth?.org_id);
  }

  @Get('semantic/metrics')
  @RequireScopes('intelligence:read')
  metrics() {
    return this.intel.metrics();
  }
}
