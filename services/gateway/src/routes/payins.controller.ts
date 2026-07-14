import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { ExecutionClient } from '@salychain/sdk-internal';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import type { AuthenticatedRequest } from '../auth/auth.types.js';
import { EXECUTION_CLIENT } from '../proxy/clients.module.js';
import { IdempotencyService } from '../idempotency/idempotency.service.js';

class CreatePayinDto {
  @IsString()
  @Length(4, 64)
  actor_id!: string;

  @IsString()
  @Length(3, 128)
  destination_account_ref!: string;

  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @IsString()
  @Length(2, 8)
  currency!: string;

  @IsString()
  @Length(2, 2)
  country!: string;

  @IsString()
  @Length(1, 128)
  customer_name!: string;

  @IsOptional()
  @IsEmail()
  customer_email?: string;

  @IsOptional()
  @IsEnum(['VIRTUAL_ACCOUNT', 'CHECKOUT'])
  method?: 'VIRTUAL_ACCOUNT' | 'CHECKOUT';

  @IsOptional()
  @IsString()
  memo?: string;
}

@ApiTags('payins')
@Controller('payins')
@UseGuards(ScopeGuard)
export class PayinsController {
  constructor(
    @Inject(EXECUTION_CLIENT) private readonly execution: ExecutionClient,
    private readonly idempotency: IdempotencyService,
  ) {}

  @Post()
  @HttpCode(202)
  @RequireScopes('payins:write')
  @ApiOperation({ summary: 'Open a real fiat pay-in (virtual account / hosted checkout)' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  async create(
    @Req() req: AuthenticatedRequest,
    @Headers('idempotency-key') idempotencyKey: string,
    @Body() dto: CreatePayinDto,
  ) {
    if (!idempotencyKey) throw new BadRequestException('Idempotency-Key header required');
    const cached = await this.idempotency.lookup({
      apiKeyId: req.auth!.principal_id,
      idempotencyKey,
      method: 'POST',
      path: '/v1/payins',
      requestHash: IdempotencyService.hashBody(dto),
    });
    if (cached) return JSON.parse(cached.body);

    const result = await this.execution.createPayin({
      idempotencyKey,
      actorId: dto.actor_id,
      destinationAccountRef: dto.destination_account_ref,
      amountMinor: dto.amount_minor,
      currency: dto.currency,
      country: dto.country,
      customerName: dto.customer_name,
      ...(dto.customer_email ? { customerEmail: dto.customer_email } : {}),
      ...(dto.method ? { method: dto.method } : {}),
      ...(dto.memo ? { memo: dto.memo } : {}),
    });

    await this.idempotency.record({
      apiKeyId: req.auth!.principal_id,
      idempotencyKey,
      method: 'POST',
      path: '/v1/payins',
      requestHash: IdempotencyService.hashBody(dto),
      responseStatus: 202,
      responseBody: JSON.stringify(result),
      responseHeaders: { 'content-type': 'application/json' },
    });
    return result;
  }
}
