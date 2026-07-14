import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { loadEnv } from '@salychain/config';
import { executionEnvSchema } from '../config/env.js';
import { EscrowService } from './escrow.service.js';

class EscrowResolveDto {
  @IsOptional()
  @IsString()
  @Length(1, 128)
  actor?: string;
}

function assertAdmin(authorization: string | undefined) {
  const env = loadEnv(executionEnvSchema);
  const token = env.EXECUTION_ADMIN_TOKEN;
  if (!token) throw new UnauthorizedException('escrow admin API is disabled');
  if (authorization !== `Bearer ${token}`) {
    throw new UnauthorizedException('invalid admin token');
  }
}

@ApiTags('escrow')
@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrow: EscrowService) {}

  @Get('deals')
  @ApiOperation({ summary: 'List escrow deals (admin audit)' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async list(
    @Headers('authorization') authorization: string | undefined,
    @Query('status') status?: string,
    @Query('limit') limit?: string,
  ) {
    assertAdmin(authorization);
    const data = await this.escrow.listDeals({
      status,
      limit: limit ? Number(limit) : undefined,
    });
    return { data };
  }

  @Get('deals/:dealId')
  @ApiOperation({ summary: 'Get escrow deal with audit events' })
  async getByDealId(
    @Headers('authorization') authorization: string | undefined,
    @Param('dealId') dealId: string,
  ) {
    assertAdmin(authorization);
    return this.escrow.getDeal(dealId);
  }

  @Get('deals/:dealId/on-chain')
  @ApiOperation({ summary: 'Sync deal status from SalyEscrow contract' })
  async syncOnChain(
    @Headers('authorization') authorization: string | undefined,
    @Param('dealId') dealId: string,
  ) {
    assertAdmin(authorization);
    return this.escrow.syncOnChainStatus(dealId);
  }

  @Post('deals/:dealId/release')
  @HttpCode(202)
  @ApiOperation({ summary: 'Release funded deal to payee (resolver wallet)' })
  async release(
    @Headers('authorization') authorization: string | undefined,
    @Param('dealId') dealId: string,
    @Body() dto: EscrowResolveDto,
  ) {
    assertAdmin(authorization);
    return this.escrow.releaseDeal(dealId, dto.actor);
  }

  @Post('deals/:dealId/refund')
  @HttpCode(202)
  @ApiOperation({ summary: 'Refund funded deal to payer (resolver wallet)' })
  async refund(
    @Headers('authorization') authorization: string | undefined,
    @Param('dealId') dealId: string,
    @Body() dto: EscrowResolveDto,
  ) {
    assertAdmin(authorization);
    return this.escrow.refundDeal(dealId, dto.actor);
  }
}
