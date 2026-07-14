import { Controller, Get, Inject, Module } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { loadEnv } from '@salychain/config';
import { FX_DASHBOARD_PAIRS, createRateProvider } from '../rates/rate-provider.factory.js';
import type { RateProvider } from '../rates/rate.provider.js';
import { RATE_PROVIDER } from '../quotes/quote.service.js';
import { LIQUIDITY_ENV, liquidityEnvSchema, type LiquidityEnv } from '../config/env.js';

@ApiTags('rates')
@Controller('rates')
class RatesController {
  constructor(@Inject(RATE_PROVIDER) private readonly rates: RateProvider) {}

  @Get('provider')
  @ApiOperation({ summary: 'Active FX rate provider name' })
  providerInfo() {
    return { provider: this.rates.name };
  }

  @Get('pairs')
  @ApiOperation({ summary: 'Mid-market FX rates for dashboard pairs' })
  async pairs() {
    const results = await Promise.allSettled(
      FX_DASHBOARD_PAIRS.map(async ([base, quote]) => {
        const r = await this.rates.getMidRate(base, quote);
        return {
          base,
          quote,
          mid_rate_1e8: r.midRate1e8.toString(),
          provider: r.provider,
          captured_at: r.capturedAt.toISOString(),
        };
      }),
    );

    return {
      provider: this.rates.name,
      pairs: results.map((res, i) => {
        const [base, quote] = FX_DASHBOARD_PAIRS[i]!;
        if (res.status === 'fulfilled') return { ...res.value, available: true };
        return {
          base,
          quote,
          available: false,
          error: res.reason instanceof Error ? res.reason.message : String(res.reason),
        };
      }),
    };
  }
}

@Module({
  controllers: [RatesController],
  providers: [
    { provide: LIQUIDITY_ENV, useFactory: () => loadEnv(liquidityEnvSchema) },
    {
      provide: RATE_PROVIDER,
      inject: [LIQUIDITY_ENV],
      useFactory: (env: LiquidityEnv): RateProvider => createRateProvider(env),
    },
  ],
  exports: [RATE_PROVIDER, LIQUIDITY_ENV],
})
export class RatesModule {}
