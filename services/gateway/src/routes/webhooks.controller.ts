import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { WebhooksClient, type SubscriptionStatus } from '@salychain/sdk-internal';
import { AuthorizationError } from '@salychain/errors';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import { WEBHOOKS_CLIENT } from '../proxy/clients.module.js';
import type { AuthenticatedRequest } from '../auth/auth.types.js';

class CreateWebhookDto {
  @IsUrl({ require_protocol: true, require_tld: false }) url!: string;
  @IsArray() @ArrayMinSize(1) @ArrayMaxSize(32) @IsString({ each: true }) subjects!: string[];
  @IsOptional() @IsString() @Length(1, 200) description?: string;
}

class SetStatusDto {
  @IsIn(['ACTIVE', 'PAUSED', 'DISABLED']) status!: SubscriptionStatus;
}

@ApiTags('webhooks')
@Controller('webhooks')
@UseGuards(ScopeGuard)
export class WebhooksController {
  constructor(@Inject(WEBHOOKS_CLIENT) private readonly webhooks: WebhooksClient) {}

  @Post()
  @RequireScopes('webhooks:write')
  @ApiOperation({ summary: 'Create a webhook subscription' })
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateWebhookDto) {
    const orgId = req.auth?.org_id;
    if (!orgId) {
      throw AuthorizationError('gateway.webhooks.org_required', 'Webhook management requires an organization context');
    }
    return this.webhooks.create({
      orgId,
      url: dto.url,
      subjects: dto.subjects,
      ...(dto.description ? { description: dto.description } : {}),
    });
  }

  @Get()
  @RequireScopes('webhooks:read')
  list(@Req() req: AuthenticatedRequest) {
    const orgId = req.auth?.org_id;
    if (!orgId) {
      throw AuthorizationError('gateway.webhooks.org_required', 'Webhook management requires an organization context');
    }
    return this.webhooks.list(orgId);
  }

  @Get(':id')
  @RequireScopes('webhooks:read')
  async byId(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const sub = await this.webhooks.getById(id);
    if (sub.org_id !== req.auth!.org_id) throw AuthorizationError('gateway.webhooks.forbidden', 'Not your subscription');
    return sub;
  }

  @Post(':id/status')
  @RequireScopes('webhooks:write')
  async setStatus(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() dto: SetStatusDto) {
    const sub = await this.webhooks.getById(id);
    if (sub.org_id !== req.auth!.org_id) throw AuthorizationError('gateway.webhooks.forbidden', 'Not your subscription');
    return this.webhooks.setStatus(id, dto.status);
  }

  @Post(':id/rotate-secret')
  @RequireScopes('webhooks:write')
  async rotate(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const sub = await this.webhooks.getById(id);
    if (sub.org_id !== req.auth!.org_id) throw AuthorizationError('gateway.webhooks.forbidden', 'Not your subscription');
    return this.webhooks.rotateSecret(id);
  }

  @Delete(':id')
  @HttpCode(204)
  @RequireScopes('webhooks:write')
  async remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const sub = await this.webhooks.getById(id);
    if (sub.org_id !== req.auth!.org_id) throw AuthorizationError('gateway.webhooks.forbidden', 'Not your subscription');
    await this.webhooks.delete(id);
  }

  @Get(':id/deliveries')
  @RequireScopes('webhooks:read')
  async deliveries(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Query('limit') limit?: string) {
    const sub = await this.webhooks.getById(id);
    if (sub.org_id !== req.auth!.org_id) throw AuthorizationError('gateway.webhooks.forbidden', 'Not your subscription');
    return this.webhooks.listDeliveries(id, { limit: limit ? Number(limit) : undefined });
  }
}
