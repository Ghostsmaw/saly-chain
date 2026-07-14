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
import { IsIn, IsObject, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import {
  DatastreamsClient,
  type StreamFilter,
  type StreamSink,
  type StreamStatus,
} from '@salychain/sdk-internal';
import { AuthorizationError } from '@salychain/errors';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import { DATASTREAMS_CLIENT } from '../proxy/clients.module.js';
import type { AuthenticatedRequest } from '../auth/auth.types.js';

class CreateStreamDto {
  @IsString() @Length(1, 120) name!: string;
  @IsIn(['WEBHOOK', 'KAFKA', 'WEBSOCKET']) sink!: StreamSink;
  @IsOptional() @IsObject() filter?: StreamFilter;
  @IsOptional() @IsString() @Length(1, 500) description?: string;
  @IsOptional() @IsUrl({ require_protocol: true, require_tld: false }) url?: string;
  @IsOptional() @IsString() @Length(1, 249) kafkaTopic?: string;
}

class SetStatusDto {
  @IsIn(['ACTIVE', 'PAUSED', 'DISABLED']) status!: StreamStatus;
}

/**
 * Saly Datastreams (Product #2). Filtered realtime push of the event spine to a
 * partner-owned webhook or Kafka topic. Guarded by `streams:*` scopes; every
 * mutating/read route is scoped to the caller's org.
 */
@ApiTags('streams')
@Controller('streams')
@UseGuards(ScopeGuard)
export class DatastreamsController {
  constructor(@Inject(DATASTREAMS_CLIENT) private readonly streams: DatastreamsClient) {}

  private requireOrg(req: AuthenticatedRequest): string {
    const orgId = req.auth?.org_id;
    if (!orgId) {
      throw AuthorizationError(
        'gateway.streams.org_required',
        'Datastream management requires an organization context',
      );
    }
    return orgId;
  }

  @Post()
  @RequireScopes('streams:write')
  @ApiOperation({ summary: 'Create a datastream (returns signing_secret once for webhook sinks)' })
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateStreamDto) {
    const orgId = this.requireOrg(req);
    return this.streams.create({
      orgId,
      name: dto.name,
      sink: dto.sink,
      ...(dto.filter ? { filter: dto.filter } : {}),
      ...(dto.description ? { description: dto.description } : {}),
      ...(dto.url ? { url: dto.url } : {}),
      ...(dto.kafkaTopic ? { kafkaTopic: dto.kafkaTopic } : {}),
    });
  }

  @Get()
  @RequireScopes('streams:read')
  list(@Req() req: AuthenticatedRequest) {
    return this.streams.list(this.requireOrg(req));
  }

  @Get(':id')
  @RequireScopes('streams:read')
  async byId(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const stream = await this.streams.getById(id);
    if (stream.org_id !== this.requireOrg(req)) {
      throw AuthorizationError('gateway.streams.forbidden', 'Not your stream');
    }
    return stream;
  }

  @Post(':id/status')
  @RequireScopes('streams:write')
  async setStatus(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: SetStatusDto,
  ) {
    await this.assertOwner(req, id);
    return this.streams.setStatus(id, dto.status);
  }

  @Post(':id/rotate-secret')
  @RequireScopes('streams:write')
  async rotate(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    await this.assertOwner(req, id);
    return this.streams.rotateSecret(id);
  }

  @Delete(':id')
  @HttpCode(204)
  @RequireScopes('streams:write')
  async remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    await this.assertOwner(req, id);
    await this.streams.delete(id);
  }

  @Get(':id/deliveries')
  @RequireScopes('streams:read')
  async deliveries(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Query('limit') limit?: string,
  ) {
    await this.assertOwner(req, id);
    return this.streams.listDeliveries(id, { limit: limit ? Number(limit) : undefined });
  }

  @Get(':id/dead-letters')
  @RequireScopes('streams:read')
  async deadLetters(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Query('limit') limit?: string,
  ) {
    await this.assertOwner(req, id);
    return this.streams.listDeadLetters(id, { limit: limit ? Number(limit) : undefined });
  }

  private async assertOwner(req: AuthenticatedRequest, id: string): Promise<void> {
    const stream = await this.streams.getById(id);
    if (stream.org_id !== this.requireOrg(req)) {
      throw AuthorizationError('gateway.streams.forbidden', 'Not your stream');
    }
  }
}
