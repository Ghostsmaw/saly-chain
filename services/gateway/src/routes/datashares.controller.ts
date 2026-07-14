import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsIn, IsObject, IsOptional, IsString, Length } from 'class-validator';
import {
  DatasharesClient,
  type AccessPolicy,
  type DatashareDestination,
  type DatashareFormat,
  type DatashareStatus,
} from '@salychain/sdk-internal';
import { AuthorizationError } from '@salychain/errors';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import { DATASHARES_CLIENT } from '../proxy/clients.module.js';
import type { AuthenticatedRequest } from '../auth/auth.types.js';

class CreateDatashareDto {
  @IsString() @Length(1, 120) name!: string;
  @IsString() dataset_id!: string;
  @IsOptional() @IsString() @Length(1, 500) description?: string;
  @IsOptional() @IsObject() params?: Record<string, unknown>;
  @IsOptional() @IsObject() policy?: AccessPolicy;
  @IsOptional()
  @IsIn(['S3', 'SNOWFLAKE', 'BIGQUERY', 'DATABRICKS'])
  destination?: DatashareDestination;
  @IsOptional() @IsObject() destination_config?: Record<string, unknown>;
  @IsOptional() @IsIn(['CSV', 'JSON', 'PARQUET']) format?: DatashareFormat;
  @IsOptional() @IsString() @Length(9, 100) schedule?: string;
}

class SetStatusDto {
  @IsIn(['ACTIVE', 'PAUSED']) status!: DatashareStatus;
}

/**
 * Saly Datashares (Product #4). Governed, scheduled delivery of curated datasets
 * (with PII redaction) into customer-controlled destinations. Guarded by
 * `datashares:*` scopes; every route is scoped to the caller's org.
 */
@ApiTags('datashares')
@Controller('datashares')
@UseGuards(ScopeGuard)
export class DatasharesController {
  constructor(@Inject(DATASHARES_CLIENT) private readonly shares: DatasharesClient) {}

  private requireOrg(req: AuthenticatedRequest): string {
    const orgId = req.auth?.org_id;
    if (!orgId) {
      throw AuthorizationError(
        'gateway.datashares.org_required',
        'Datashare management requires an organization context',
      );
    }
    return orgId;
  }

  @Get('catalog')
  @RequireScopes('datashares:read')
  @ApiOperation({ summary: 'List the curated datasets available to share' })
  catalog() {
    return this.shares.listDatasets();
  }

  @Post()
  @RequireScopes('datashares:write')
  @ApiOperation({ summary: 'Create a governed datashare' })
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateDatashareDto) {
    const orgId = this.requireOrg(req);
    return this.shares.create({
      orgId,
      name: dto.name,
      datasetId: dto.dataset_id,
      ...(dto.description ? { description: dto.description } : {}),
      ...(dto.params ? { params: dto.params } : {}),
      ...(dto.policy ? { policy: dto.policy } : {}),
      ...(dto.destination ? { destination: dto.destination } : {}),
      ...(dto.destination_config ? { destinationConfig: dto.destination_config } : {}),
      ...(dto.format ? { format: dto.format } : {}),
      ...(dto.schedule ? { schedule: dto.schedule } : {}),
    });
  }

  @Get()
  @RequireScopes('datashares:read')
  list(@Req() req: AuthenticatedRequest) {
    return this.shares.list(this.requireOrg(req));
  }

  @Get(':id')
  @RequireScopes('datashares:read')
  async byId(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const share = await this.shares.getById(id);
    if (share.org_id !== this.requireOrg(req)) {
      throw AuthorizationError('gateway.datashares.forbidden', 'Not your datashare');
    }
    return share;
  }

  @Post(':id/status')
  @RequireScopes('datashares:write')
  async setStatus(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: SetStatusDto,
  ) {
    await this.assertOwner(req, id);
    return this.shares.setStatus(id, dto.status);
  }

  @Post(':id/run')
  @HttpCode(202)
  @RequireScopes('datashares:write')
  @ApiOperation({ summary: 'Trigger a one-off run now' })
  async run(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    await this.assertOwner(req, id);
    return this.shares.run(id);
  }

  @Get(':id/runs')
  @RequireScopes('datashares:read')
  async runs(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Query('limit') limit?: string,
  ) {
    await this.assertOwner(req, id);
    return this.shares.listRuns(id, { limit: limit ? Number(limit) : undefined });
  }

  @Delete(':id')
  @HttpCode(204)
  @RequireScopes('datashares:write')
  async remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    await this.assertOwner(req, id);
    await this.shares.delete(id);
  }

  private async assertOwner(req: AuthenticatedRequest, id: string): Promise<void> {
    const share = await this.shares.getById(id);
    if (share.org_id !== this.requireOrg(req)) {
      throw AuthorizationError('gateway.datashares.forbidden', 'Not your datashare');
    }
  }
}
