import {
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  HttpCode,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { loadEnv } from '@salychain/config';
import { executionEnvSchema } from '../config/env.js';
import { assertBearerToken } from '../common/assert-bearer.js';
import { ReconciliationService } from './reconciliation.service.js';

function assertAdmin(authorization: string | undefined): void {
  const env = loadEnv(executionEnvSchema);
  assertBearerToken(authorization, env.EXECUTION_ADMIN_TOKEN, 'reconciliation admin API is disabled');
}

@ApiTags('reconciliation')
@Controller('admin/reconciliation')
export class ReconciliationController {
  constructor(private readonly recon: ReconciliationService) {}

  @Post('run')
  @HttpCode(200)
  @ApiOperation({ summary: 'Trigger a ledger↔fiat-pay-in reconciliation sweep now' })
  async run(@Headers('authorization') authorization: string | undefined) {
    assertAdmin(authorization);
    return this.recon.runPayinReconciliation();
  }

  @Get('runs')
  @ApiOperation({ summary: 'List recent reconciliation runs with their breaks' })
  async runs(
    @Headers('authorization') authorization: string | undefined,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    assertAdmin(authorization);
    const runs = await this.recon.listRuns(Math.min(limit, 100));
    return { data: runs };
  }
}
