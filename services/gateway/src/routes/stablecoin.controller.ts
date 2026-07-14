import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { StablecoinClient } from '@salychain/sdk-internal';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import type { AuthenticatedRequest } from '../auth/auth.types.js';
import { STABLECOIN_CLIENT } from '../proxy/clients.module.js';
import { IdempotencyService } from '../idempotency/idempotency.service.js';

class CreateMintRequestDto {
  @IsString() @Length(4, 64) actor_id!: string;
  @IsString() @Matches(/^\d+$/) amount_minor!: string;
  @IsString() @Length(36, 36) destination_wallet_id!: string;
  @IsOptional() @IsString() @Length(36, 36) reserve_account_id?: string;
  @IsOptional() @IsEnum(['SALY_L3', 'BASE']) chain?: 'SALY_L3' | 'BASE';
}

class CreateRedeemRequestDto {
  @IsString() @Length(4, 64) actor_id!: string;
  @IsString() @Matches(/^\d+$/) amount_minor!: string;
  @IsString() @Length(36, 36) source_wallet_id!: string;
  @IsEnum(['FIAT', 'INTERNAL']) payout_rail!: 'FIAT' | 'INTERNAL';
  @IsOptional() @IsEnum(['SALY_L3', 'BASE']) chain?: 'SALY_L3' | 'BASE';
}

@ApiTags('stablecoin')
@Controller()
@UseGuards(ScopeGuard)
export class StablecoinController {
  constructor(
    @Inject(STABLECOIN_CLIENT) private readonly stablecoin: StablecoinClient,
    private readonly idempotency: IdempotencyService,
  ) {}

  @Post('stablecoin/mint-requests')
  @HttpCode(201)
  @RequireScopes('stablecoin:write')
  @ApiOperation({ summary: 'Request SalySD mint (compliance-approved before on-chain execution)' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  async createMint(
    @Req() req: AuthenticatedRequest,
    @Headers('idempotency-key') idempotencyKey: string,
    @Body() dto: CreateMintRequestDto,
  ) {
    if (!idempotencyKey) throw new BadRequestException('Idempotency-Key header required');
    const path = '/v1/stablecoin/mint-requests';
    const requestHash = IdempotencyService.hashBody(dto);
    const cached = await this.idempotency.lookup({
      apiKeyId: req.auth!.principal_id,
      idempotencyKey,
      method: 'POST',
      path,
      requestHash,
    });
    if (cached) return JSON.parse(cached.body);

    const result = await this.stablecoin.createMintRequest({
      idempotencyKey,
      amountMinor: dto.amount_minor,
      destinationWalletId: dto.destination_wallet_id,
      reserveAccountId: dto.reserve_account_id,
      chain: dto.chain,
    });

    await this.idempotency.record({
      apiKeyId: req.auth!.principal_id,
      idempotencyKey,
      method: 'POST',
      path,
      requestHash,
      responseStatus: 201,
      responseBody: JSON.stringify(result),
      responseHeaders: { 'content-type': 'application/json' },
    });
    return result;
  }

  @Post('stablecoin/mint-requests/:id/approve')
  @HttpCode(202)
  @RequireScopes('stablecoin:write')
  @ApiOperation({ summary: 'Approve mint and trigger on-chain SalySD mint via execution' })
  async approveMint(@Param('id') id: string) {
    return this.stablecoin.approveMint(id);
  }

  @Get('stablecoin/mint-requests')
  @RequireScopes('stablecoin:read')
  @ApiOperation({ summary: 'List org mint requests' })
  listMint() {
    return this.stablecoin.listMintRequests();
  }

  @Get('stablecoin/mint-requests/:id')
  @RequireScopes('stablecoin:read')
  getMint(@Param('id') id: string) {
    return this.stablecoin.getMintRequest(id);
  }

  @Post('stablecoin/redeem-requests')
  @HttpCode(201)
  @RequireScopes('stablecoin:write')
  @ApiOperation({ summary: 'Request SalySD redeem (burn + optional fiat payout)' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  async createRedeem(
    @Req() req: AuthenticatedRequest,
    @Headers('idempotency-key') idempotencyKey: string,
    @Body() dto: CreateRedeemRequestDto,
  ) {
    if (!idempotencyKey) throw new BadRequestException('Idempotency-Key header required');
    const path = '/v1/stablecoin/redeem-requests';
    const requestHash = IdempotencyService.hashBody(dto);
    const cached = await this.idempotency.lookup({
      apiKeyId: req.auth!.principal_id,
      idempotencyKey,
      method: 'POST',
      path,
      requestHash,
    });
    if (cached) return JSON.parse(cached.body);

    const result = await this.stablecoin.createRedeemRequest({
      idempotencyKey,
      amountMinor: dto.amount_minor,
      sourceWalletId: dto.source_wallet_id,
      payoutRail: dto.payout_rail,
      chain: dto.chain,
    });

    await this.idempotency.record({
      apiKeyId: req.auth!.principal_id,
      idempotencyKey,
      method: 'POST',
      path,
      requestHash,
      responseStatus: 201,
      responseBody: JSON.stringify(result),
      responseHeaders: { 'content-type': 'application/json' },
    });
    return result;
  }

  @Post('stablecoin/redeem-requests/:id/approve')
  @HttpCode(202)
  @RequireScopes('stablecoin:write')
  @ApiOperation({ summary: 'Approve redeem and trigger on-chain SalySD burn' })
  async approveRedeem(@Param('id') id: string) {
    return this.stablecoin.approveRedeem(id);
  }

  @Get('stablecoin/redeem-requests')
  @RequireScopes('stablecoin:read')
  listRedeem() {
    return this.stablecoin.listRedeemRequests();
  }

  @Get('stablecoin/redeem-requests/:id')
  @RequireScopes('stablecoin:read')
  getRedeem(@Param('id') id: string) {
    return this.stablecoin.getRedeemRequest(id);
  }

  @Get('stablecoin/reserves')
  @RequireScopes('stablecoin:read')
  listReserves() {
    return this.stablecoin.listReserves();
  }

  @Get('stablecoin/supply')
  @RequireScopes('stablecoin:read')
  latestSupply(@Query('chain') chain?: 'SALY_L3' | 'BASE') {
    return this.stablecoin.latestSupply(chain ?? 'SALY_L3');
  }
}
