import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  Module,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { loadEnv } from '@salychain/config';
import { createFiatAdapter, pickFiatEnv } from '@salychain/chain-fiat';
import { NotFoundError } from '@salychain/errors';
import { RoutingDecider } from './decider.service.js';
import { RAIL_EVALUATORS, type RailEvaluator, type RoutingInput } from '../evaluators/rail.evaluator.js';
import { InternalLedgerEvaluator } from '../evaluators/internal.evaluator.js';
import { SwapLedgerEvaluator } from '../evaluators/swap.evaluator.js';
import { BaseDexSwapEvaluator } from '../evaluators/base-dex.evaluator.js';
import { BaseUsdcEvaluator } from '../evaluators/base.evaluator.js';
import { L3UsdcEvaluator } from '../evaluators/l3.evaluator.js';
import { XrplEvaluator } from '../evaluators/xrpl.evaluator.js';
import { FiatRailEvaluator } from '../evaluators/fiat.evaluator.js';
import { EscrowEvaluator } from '../evaluators/escrow.evaluator.js';
import { ROUTING_ENV, routingEnvSchema, type RoutingEnv } from '../config/env.js';
import { PrismaService } from '../prisma/prisma.service.js';

class RoutingEndpointDto {
  @IsEnum(['WALLET', 'LEDGER_ACCOUNT', 'EXTERNAL_ADDRESS', 'BANK_ACCOUNT'])
  type!: 'WALLET' | 'LEDGER_ACCOUNT' | 'EXTERNAL_ADDRESS' | 'BANK_ACCOUNT';

  @IsOptional() @IsString() chain?: string;
  @IsOptional() @IsString() address?: string;
  @IsString() currency!: string;
  @IsOptional() @IsString() country_code?: string;
}

class DecideDto {
  @IsOptional() @IsString() intent_id?: string;
  @IsOptional() @IsString() correlation_key?: string;
  @ValidateNested() @Type(() => RoutingEndpointDto) source!: RoutingEndpointDto;
  @ValidateNested() @Type(() => RoutingEndpointDto) destination!: RoutingEndpointDto;
  @IsInt() @Min(1) @Type(() => Number) amount_minor!: number;
  @IsOptional() @IsInt() @Type(() => Number) risk_score?: number;
  @IsOptional() @IsEnum(['cheapest', 'fastest', 'most_private', 'balanced']) preference?:
    | 'cheapest'
    | 'fastest'
    | 'most_private'
    | 'balanced';
  @IsOptional() @IsObject() metadata?: Record<string, unknown>;
  @IsOptional() @IsObject() escrow_condition?: {
    type: 'DELIVERY' | 'MILESTONE' | 'TIMELOCK' | 'CUSTOM';
    deadline_at?: string;
    description?: string;
  };
  @IsOptional()
  @IsEnum(['TRANSFER', 'SWAP', 'PAYOUT', 'INVOICE', 'PAYROLL', 'AGENT_PAY', 'TOPUP'])
  intent_kind?: 'TRANSFER' | 'SWAP' | 'PAYOUT' | 'INVOICE' | 'PAYROLL' | 'AGENT_PAY' | 'TOPUP';
  @IsOptional()
  @IsEnum(['ledger', 'onchain'])
  swap_execution?: 'ledger' | 'onchain';
}

@ApiTags('routing')
@Controller('routing')
class RoutingController {
  constructor(private readonly decider: RoutingDecider, private readonly prisma: PrismaService) {}

  @Post('decide')
  @HttpCode(200)
  @ApiOperation({ summary: 'Decide the optimal rail for a movement; persists a RouteDecision audit row' })
  async decide(@Body() dto: DecideDto) {
    return this.decider.decide({
      intentId: dto.intent_id,
      correlationKey: dto.correlation_key,
      source: { ...dto.source, currency: dto.source.currency.toUpperCase() } as RoutingInput['source'],
      destination: { ...dto.destination, currency: dto.destination.currency.toUpperCase() },
      amountMinor: BigInt(dto.amount_minor),
      riskScore: dto.risk_score,
      preference: dto.preference,
      escrowCondition: dto.escrow_condition,
      intentKind: dto.intent_kind,
      swapExecution: dto.swap_execution,
    });
  }

  @Get('decisions')
  @ApiOperation({ summary: 'List recent routing decisions (admin)' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async list(@Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number) {
    const data = await this.prisma.routeDecision.findMany({
      orderBy: { createdAt: 'desc' },
      take: Math.min(limit, 200),
    });
    return { data: data.map(toDecisionDto) };
  }

  @Get('decisions/:id')
  async byId(@Param('id') id: string) {
    const decision = await this.prisma.routeDecision.findUnique({ where: { id } });
    if (!decision) throw NotFoundError('routing.decision_not_found', `Decision ${id} not found`);
    return toDecisionDto(decision);
  }
}

function toDecisionDto(d: Awaited<ReturnType<PrismaService['routeDecision']['findUniqueOrThrow']>>) {
  return {
    id: d.id,
    intent_id: d.intentId ?? undefined,
    correlation_key: d.correlationKey ?? undefined,
    selected_rail: d.selectedRail,
    selected_score: d.selectedScore,
    rationale: d.rationale,
    input: d.input,
    candidates: d.candidates,
    created_at: d.createdAt.toISOString(),
  };
}

@Module({
  controllers: [RoutingController],
  providers: [
    RoutingDecider,
    { provide: ROUTING_ENV, useFactory: () => loadEnv(routingEnvSchema) },
    {
      provide: RAIL_EVALUATORS,
      inject: [ROUTING_ENV],
      useFactory: (env: RoutingEnv): RailEvaluator[] => {
        const fiatAdapter = createFiatAdapter(pickFiatEnv(process.env as Record<string, string>));
        return [
        new InternalLedgerEvaluator(),
        new SwapLedgerEvaluator(),
        new BaseDexSwapEvaluator(env.BASE_NETWORK),
        new BaseUsdcEvaluator(),
        new L3UsdcEvaluator(),
        new XrplEvaluator(),
        new FiatRailEvaluator({ enabled: env.ROUTING_FIAT_ENABLED, adapter: fiatAdapter }),
        new EscrowEvaluator(),
      ];
      },
    },
  ],
  exports: [RoutingDecider],
})
export class DeciderModule {}
