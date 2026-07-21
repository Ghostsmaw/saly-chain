import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { loadEnv } from '@salychain/config';
import { executionEnvSchema } from '../config/env.js';
import { assertBearerToken } from '../common/assert-bearer.js';
import { SeedClearingDto } from './dto.js';
import { TransactionsService } from './transactions.service.js';

function assertAdmin(authorization: string | undefined) {
  const env = loadEnv(executionEnvSchema);
  assertBearerToken(authorization, env.EXECUTION_ADMIN_TOKEN, 'clearing admin API is disabled');
}

@ApiTags('clearing')
@Controller('admin/clearing')
export class ClearingController {
  constructor(private readonly txs: TransactionsService) {}

  @Post('seed')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Prefund inbound clearing pool (DR asset.clearing, CR equity.inbound)',
  })
  async seed(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: SeedClearingDto,
  ) {
    assertAdmin(authorization);
    return this.txs.seedClearingPool(dto);
  }
}
