import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsOptional, IsString, Length, Matches } from 'class-validator';
import { MerchantClient } from '@salychain/sdk-internal';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import type { AuthenticatedRequest } from '../auth/auth.types.js';
import { MERCHANT_CLIENT } from '../proxy/clients.module.js';
import { IdempotencyService } from '../idempotency/idempotency.service.js';

class CreatePaymentLinkDto {
  @IsString() @Length(4, 64) actor_id!: string;
  @IsString() @Length(3, 128) destination_account_ref!: string;
  @IsString() @Length(1, 128) title!: string;
  @IsOptional() @IsString() @Length(0, 512) description?: string;
  @IsString() @Matches(/^\d+$/) amount_minor!: string;
  @IsString() @Length(2, 8) currency!: string;
  @IsString() @Length(2, 2) country!: string;
  @IsOptional() @IsString() success_redirect_url?: string;
}

class OpenCheckoutDto {
  @IsString() @Length(4, 64) actor_id!: string;
  @IsString() @Length(3, 128) destination_account_ref!: string;
  @IsString() @Matches(/^\d+$/) amount_minor!: string;
  @IsString() @Length(2, 8) currency!: string;
  @IsString() @Length(2, 2) country!: string;
  @IsString() @Length(1, 128) customer_name!: string;
  @IsOptional() @IsEmail() customer_email?: string;
  @IsOptional() @IsString() memo?: string;
}

class SettlementReportDto {
  @IsISO8601() period_start!: string;
  @IsISO8601() period_end!: string;
  @IsOptional() @IsString() @Length(2, 8) currency?: string;
}

/**
 * Merchant product (C3): payment links, hosted checkout sessions, settlement reports.
 */
@ApiTags('merchant')
@Controller()
@UseGuards(ScopeGuard)
export class MerchantController {
  constructor(
    @Inject(MERCHANT_CLIENT) private readonly merchant: MerchantClient,
    private readonly idempotency: IdempotencyService,
  ) {}

  @Post('merchant/payment-links')
  @HttpCode(201)
  @RequireScopes('merchant:write')
  @ApiOperation({ summary: 'Create a shareable payment link' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  async createPaymentLink(
    @Req() req: AuthenticatedRequest,
    @Headers('idempotency-key') idempotencyKey: string,
    @Body() dto: CreatePaymentLinkDto,
  ) {
    if (!idempotencyKey) throw new BadRequestException('Idempotency-Key header required');
    const path = '/v1/merchant/payment-links';
    const cached = await this.idempotency.lookup({
      apiKeyId: req.auth!.principal_id,
      idempotencyKey,
      method: 'POST',
      path,
      requestHash: IdempotencyService.hashBody(dto),
    });
    if (cached) return JSON.parse(cached.body);

    const result = await this.merchant.createPaymentLink(dto);
    await this.idempotency.record({
      apiKeyId: req.auth!.principal_id,
      idempotencyKey,
      method: 'POST',
      path,
      requestHash: IdempotencyService.hashBody(dto),
      responseStatus: 201,
      responseBody: JSON.stringify(result),
      responseHeaders: { 'content-type': 'application/json' },
    });
    return result;
  }

  @Get('merchant/payment-links')
  @RequireScopes('merchant:read')
  listPaymentLinks(@Query('status') status?: string, @Query('limit') limit?: string) {
    return this.merchant.listPaymentLinks({
      ...(status ? { status: status as 'ACTIVE' | 'ARCHIVED' } : {}),
      ...(limit ? { limit: Number(limit) } : {}),
    });
  }

  @Get('merchant/payment-links/:id')
  @RequireScopes('merchant:read')
  getPaymentLink(@Param('id') id: string) {
    return this.merchant.getPaymentLink(id);
  }

  @Patch('merchant/payment-links/:id/archive')
  @RequireScopes('merchant:write')
  archivePaymentLink(@Param('id') id: string, @Body() body: { reason?: string }) {
    return this.merchant.archivePaymentLink(id, body.reason);
  }

  @Post('merchant/checkout/sessions')
  @HttpCode(202)
  @RequireScopes('merchant:write')
  @ApiOperation({ summary: 'Open a hosted checkout session' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  async openCheckout(
    @Req() req: AuthenticatedRequest,
    @Headers('idempotency-key') idempotencyKey: string,
    @Body() dto: OpenCheckoutDto,
  ) {
    if (!idempotencyKey) throw new BadRequestException('Idempotency-Key header required');
    const path = '/v1/merchant/checkout/sessions';
    const cached = await this.idempotency.lookup({
      apiKeyId: req.auth!.principal_id,
      idempotencyKey,
      method: 'POST',
      path,
      requestHash: IdempotencyService.hashBody(dto),
    });
    if (cached) return JSON.parse(cached.body);

    const result = await this.merchant.openCheckoutSession({
      ...dto,
      idempotency_key: idempotencyKey,
    });
    await this.idempotency.record({
      apiKeyId: req.auth!.principal_id,
      idempotencyKey,
      method: 'POST',
      path,
      requestHash: IdempotencyService.hashBody(dto),
      responseStatus: 202,
      responseBody: JSON.stringify(result),
      responseHeaders: { 'content-type': 'application/json' },
    });
    return result;
  }

  @Get('merchant/checkout/sessions')
  @RequireScopes('merchant:read')
  listCheckoutSessions(@Query('limit') limit?: string) {
    return this.merchant.listCheckoutSessions({ ...(limit ? { limit: Number(limit) } : {}) });
  }

  @Get('merchant/checkout/sessions/:id')
  @RequireScopes('merchant:read')
  getCheckoutSession(@Param('id') id: string) {
    return this.merchant.getCheckoutSession(id);
  }

  @Post('merchant/settlement-reports')
  @RequireScopes('merchant:write')
  generateSettlementReport(@Body() dto: SettlementReportDto) {
    return this.merchant.generateSettlementReport(dto);
  }

  @Get('merchant/settlement-reports')
  @RequireScopes('merchant:read')
  listSettlementReports(@Query('limit') limit?: string) {
    return this.merchant.listSettlementReports({ ...(limit ? { limit: Number(limit) } : {}) });
  }

  @Get('merchant/settlement-reports/:id')
  @RequireScopes('merchant:read')
  getSettlementReport(@Param('id') id: string) {
    return this.merchant.getSettlementReport(id);
  }

  @Get('merchant/settlement-reports/:id/export')
  @RequireScopes('merchant:read')
  exportSettlementReport(@Param('id') id: string) {
    return this.merchant.exportSettlementReportCsv(id);
  }
}
