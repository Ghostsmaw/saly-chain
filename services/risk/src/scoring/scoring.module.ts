import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  Module,
  ParseIntPipe,
  Post,
  Query,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { loadEnv } from '@salychain/config';
import { createLogger } from '@salychain/logger';
import { IntelligenceClient } from '@salychain/sdk-internal';
import { RiskDecision } from '../generated/prisma/index.js';
import { ScoringEngine } from './scoring.engine.js';
import { RiskService } from './risk.service.js';
import { RISK_ENV, INTELLIGENCE_CLIENT, riskEnvSchema, type RiskEnv } from '../config/env.js';

class AssessDto {
  @IsOptional() @IsString() intent_id?: string;
  @IsOptional() @IsString() transaction_id?: string;
  @IsString() actor_external_ref!: string;
  @IsOptional() @IsString() counterparty_ref?: string;
  @IsInt() @Min(1) @Type(() => Number) amount_usd_minor!: number;
}

class CommitDto extends AssessDto {}

@ApiTags('risk')
@Controller('risk')
class RiskController {
  private readonly logger = new Logger(RiskController.name);

  constructor(private readonly risk: RiskService) {}

  @Get('assessments')
  @ApiOperation({ summary: 'List recent risk assessments (newest first)' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'decision', required: false, enum: RiskDecision })
  async listAssessments(
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('decision') decision?: RiskDecision,
  ) {
    const data = await this.risk.listAssessments({
      limit: Math.min(limit, 200),
      decision,
    });
    return { data };
  }

  @Get('summary')
  @ApiOperation({ summary: 'Dashboard counters and configured thresholds' })
  async summary() {
    return this.risk.getSummary();
  }

  @Get('actors')
  @ApiOperation({ summary: 'Actors ranked by 24h velocity (USD-normalized)' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async actors(@Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number) {
    const data = await this.risk.listHighVelocityActors(Math.min(limit, 100));
    return { data };
  }

  @Post('assess')
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Score the proposed transaction and return a decision; does NOT advance the actor profile',
  })
  async assess(@Body() dto: AssessDto) {
    const res = await this.risk.assess({
      intentId: dto.intent_id,
      transactionId: dto.transaction_id,
      actorExternalRef: dto.actor_external_ref,
      counterpartyRef: dto.counterparty_ref,
      amountUsdMinor: BigInt(dto.amount_usd_minor),
    });
    return {
      assessment_id: res.assessmentId,
      decision: res.decision,
      score: res.finalScore,
      components: res.components,
      reasons: res.reasons,
    };
  }

  @Post('commit')
  @HttpCode(200)
  @ApiOperation({ summary: 'Advance the actor + counterparty profile after a settled transaction' })
  async commit(@Body() dto: CommitDto) {
    await this.risk.commit({
      intentId: dto.intent_id,
      transactionId: dto.transaction_id,
      actorExternalRef: dto.actor_external_ref,
      counterpartyRef: dto.counterparty_ref,
      amountUsdMinor: BigInt(dto.amount_usd_minor),
    });
    return { ok: true };
  }
}

@Module({
  controllers: [RiskController],
  providers: [
    ScoringEngine,
    RiskService,
    { provide: RISK_ENV, useFactory: () => loadEnv(riskEnvSchema) },
    {
      provide: INTELLIGENCE_CLIENT,
      inject: [RISK_ENV],
      useFactory: (env: RiskEnv): IntelligenceClient | null =>
        env.RISK_INTELLIGENCE_ENABLED
          ? new IntelligenceClient({
              baseUrl: env.INTELLIGENCE_BASE_URL,
              logger: createLogger({ service: 'risk' }),
            })
          : null,
    },
  ],
  exports: [RiskService, ScoringEngine],
})
export class ScoringModule {}
