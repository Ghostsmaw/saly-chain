import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { loadEnv } from '@salychain/config';
import { executionEnvSchema } from '../config/env.js';
import { SeedClearingDto } from './dto.js';
import { TransactionsService } from './transactions.service.js';

function assertAdmin(authorization: string | undefined) {
  const env = loadEnv(executionEnvSchema);
  const token = env.EXECUTION_ADMIN_TOKEN;
  if (!token) throw new UnauthorizedException('clearing admin API is disabled');
  if (authorization !== `Bearer ${token}`) {
    throw new UnauthorizedException('invalid admin token');
  }
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
