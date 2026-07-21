import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, Length, Matches } from 'class-validator';
import { loadEnv } from '@salychain/config';
import { executionEnvSchema } from '../config/env.js';
import { assertBearerToken } from '../common/assert-bearer.js';
import { TransactionsService } from './transactions.service.js';

class FiatWebhookConfirmationDto {
  @IsUUID('4')
  tx_id!: string;

  @IsOptional()
  @IsString()
  @Length(1, 128)
  psp_id?: string;

  @IsEnum(['SETTLED', 'FAILED'])
  outcome!: 'SETTLED' | 'FAILED';

  @IsOptional()
  @IsString()
  @Length(1, 512)
  reason?: string;

  @IsOptional()
  @IsString()
  settled_at?: string;
}

class FiatPayinConfirmationDto {
  /** Our correlation id — the execution transaction id. */
  @IsUUID('4')
  reference!: string;

  @IsOptional()
  @IsString()
  @Length(1, 128)
  psp_reference?: string;

  @IsEnum(['SETTLED', 'FAILED'])
  outcome!: 'SETTLED' | 'FAILED';

  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  amount_minor?: string;

  @IsOptional()
  @IsString()
  @Length(2, 8)
  currency?: string;

  @IsOptional()
  @IsString()
  @Length(1, 64)
  provider?: string;

  @IsOptional()
  @IsString()
  @Length(1, 512)
  reason?: string;

  @IsOptional()
  @IsString()
  settled_at?: string;
}

function assertInternalToken(authorization: string | undefined): void {
  const env = loadEnv(executionEnvSchema);
  assertBearerToken(
    authorization,
    env.EXECUTION_INTERNAL_WEBHOOK_TOKEN,
    'internal webhook endpoint is disabled',
  );
}

@ApiTags('internal')
@Controller('internal/fiat')
export class FiatWebhookController {
  constructor(private readonly txs: TransactionsService) {}

  @Post('confirmations')
  @HttpCode(200)
  @ApiOperation({ summary: 'Apply a verified PSP payout webhook settlement (fiat-listener only)' })
  @ApiResponse({ status: 200, description: 'Confirmation accepted or idempotently skipped' })
  async confirm(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: FiatWebhookConfirmationDto,
  ) {
    assertInternalToken(authorization);
    const result = await this.txs.confirmFiatFromWebhook({
      txId: dto.tx_id,
      pspId: dto.psp_id,
      outcome: dto.outcome,
      reason: dto.reason,
      settledAt: dto.settled_at,
    });
    return { ok: true, ...result };
  }

  @Post('payins')
  @HttpCode(200)
  @ApiOperation({ summary: 'Apply a verified PSP pay-in credit (fiat-listener only)' })
  @ApiResponse({ status: 200, description: 'Pay-in applied or idempotently skipped' })
  async confirmPayin(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: FiatPayinConfirmationDto,
  ) {
    assertInternalToken(authorization);
    const result = await this.txs.confirmFiatPayinFromWebhook({
      reference: dto.reference,
      pspReference: dto.psp_reference,
      outcome: dto.outcome,
      amountMinor: dto.amount_minor,
      currency: dto.currency,
      provider: dto.provider,
      reason: dto.reason,
      settledAt: dto.settled_at,
    });
    return { ok: true, ...result };
  }
}
