import {
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  Inject,
  ParseIntPipe,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { constantTimeEquals } from '@salychain/config';
import { AuthorizationError } from '@salychain/errors';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import type { AuthenticatedRequest } from '../auth/auth.types.js';
import { Req } from '@nestjs/common';
import { RequestLogService } from '../proxy/request-log.service.js';
import { GATEWAY_ENV, type GatewayEnv } from '../config/env.js';

function toPublicLog(row: Awaited<ReturnType<RequestLogService['list']>>[number]) {
  return {
    id: row.id,
    api_key_id: row.apiKeyId ?? undefined,
    org_id: row.orgId ?? undefined,
    method: row.method,
    path: row.path,
    status: row.status,
    latency_ms: row.latencyMs,
    ip: row.ip ?? undefined,
    user_agent: row.userAgent ?? undefined,
    correlation_id: row.correlationId,
    occurred_at: row.occurredAt.toISOString(),
  };
}

@ApiTags('logs')
@Controller('logs')
@UseGuards(ScopeGuard)
export class LogsController {
  constructor(
    private readonly logs: RequestLogService,
    @Inject(GATEWAY_ENV) private readonly env: GatewayEnv,
  ) {}

  @Get()
  @RequireScopes('logs:read')
  @ApiOperation({ summary: 'List recent API request logs for the authenticated org' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async list(
    @Req() req: AuthenticatedRequest,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ) {
    const orgId = req.auth?.org_id;
    if (!orgId) {
      throw AuthorizationError('gateway.logs.org_required', 'Request logs require an org-scoped API key');
    }
    const rows = await this.logs.list(orgId, limit);
    return { data: rows.map(toPublicLog) };
  }

  @Get('summary')
  @RequireScopes('logs:read')
  @ApiOperation({ summary: 'Aggregate request log stats for the authenticated org' })
  @ApiQuery({ name: 'window_hours', required: false, type: Number })
  async summary(
    @Req() req: AuthenticatedRequest,
    @Query('window_hours', new DefaultValuePipe(24), ParseIntPipe) windowHours: number,
  ) {
    const orgId = req.auth?.org_id;
    if (!orgId) {
      throw AuthorizationError('gateway.logs.org_required', 'Request logs require an org-scoped API key');
    }
    return this.logs.summarize(orgId, Math.min(Math.max(windowHours, 1), 168));
  }
}

/**
 * Portal-only read path. Excluded from API-key auth middleware; protected by
 * a shared internal secret instead so the developer portal can fetch logs
 * server-side without storing a partner API key in the browser.
 */
@ApiTags('internal')
@Controller('internal/logs')
export class InternalLogsController {
  constructor(
    private readonly logs: RequestLogService,
    @Inject(GATEWAY_ENV) private readonly env: GatewayEnv,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Portal-internal request log read (X-Portal-Secret)' })
  @ApiQuery({ name: 'org_id', required: true })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async list(
    @Headers('x-portal-secret') secret: string | undefined,
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ) {
    this.assertPortalSecret(secret);
    const rows = await this.logs.list(orgId, limit);
    return { data: rows.map(toPublicLog) };
  }

  @Get('summary')
  @ApiOperation({ summary: 'Portal-internal request log summary (X-Portal-Secret)' })
  @ApiQuery({ name: 'org_id', required: true })
  @ApiQuery({ name: 'window_hours', required: false, type: Number })
  async summary(
    @Headers('x-portal-secret') secret: string | undefined,
    @Query('org_id') orgId: string,
    @Query('window_hours', new DefaultValuePipe(24), ParseIntPipe) windowHours: number,
  ) {
    this.assertPortalSecret(secret);
    return this.logs.summarize(orgId, Math.min(Math.max(windowHours, 1), 168));
  }

  private assertPortalSecret(secret: string | undefined): void {
    const expected = this.env.PORTAL_INTERNAL_SECRET;
    // Fail closed when unconfigured; compare in constant time (no timing oracle).
    if (!expected || !secret || !constantTimeEquals(secret, expected)) {
      throw new UnauthorizedException('Invalid portal secret');
    }
  }
}
