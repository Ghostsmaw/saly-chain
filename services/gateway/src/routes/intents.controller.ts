import { BadRequestException, Body, Controller, DefaultValuePipe, Get, Headers, HttpCode, Inject, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { IntentClient } from '@salychain/sdk-internal';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import type { AuthenticatedRequest } from '../auth/auth.types.js';
import { INTENT_CLIENT } from '../proxy/clients.module.js';
import { IdempotencyService } from '../idempotency/idempotency.service.js';

class IngestDto {
  @IsObject() intent!: Record<string, unknown>;
}

@ApiTags('intents')
@Controller('intents')
@UseGuards(ScopeGuard)
export class IntentsController {
  constructor(
    @Inject(INTENT_CLIENT) private readonly intent: IntentClient,
    private readonly idempotency: IdempotencyService,
  ) {}

  @Post()
  @HttpCode(201)
  @RequireScopes('intents:write')
  @ApiOperation({ summary: 'Submit an intent for execution' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  async submit(
    @Req() req: AuthenticatedRequest,
    @Headers('idempotency-key') idempotencyKey: string,
    @Body() dto: IngestDto,
  ) {
    if (!idempotencyKey) throw new BadRequestException('Idempotency-Key header required');
    const cached = await this.idempotency.lookup({
      apiKeyId: req.auth!.principal_id,
      idempotencyKey,
      method: 'POST',
      path: '/v1/intents',
      requestHash: IdempotencyService.hashBody(dto),
    });
    if (cached) return JSON.parse(cached.body);

    const result = await this.intent.submit({
      idempotencyKey,
      intent: dto.intent as never,
    });

    await this.idempotency.record({
      apiKeyId: req.auth!.principal_id,
      idempotencyKey,
      method: 'POST',
      path: '/v1/intents',
      requestHash: IdempotencyService.hashBody(dto),
      responseStatus: 201,
      responseBody: JSON.stringify(result),
      responseHeaders: { 'content-type': 'application/json' },
    });
    return result;
  }

  @Get(':intentId')
  @RequireScopes('intents:read')
  byId(@Param('intentId') intentId: string) {
    return this.intent.getById(intentId);
  }

  @Get()
  @RequireScopes('intents:read')
  list(@Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number) {
    return this.intent.list({ limit });
  }
}
