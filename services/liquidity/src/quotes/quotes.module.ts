import { Body, Controller, DefaultValuePipe, Get, HttpCode, Module, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { NotFoundError } from '@salychain/errors';
import { QuoteService } from './quote.service.js';
import { DexQuoteService } from './dex-quote.service.js';
import { RatesModule } from '../rates/rates.module.js';

class CreateDexQuoteDto {
  @IsOptional() @IsString() intent_id?: string;
  @IsString() @Length(3, 8) from_currency!: string;
  @IsString() @Length(3, 8) to_currency!: string;
  @IsInt() @Min(1) @Type(() => Number) from_amount_minor!: number;
  @IsString() @Length(42, 42) recipient!: string;
  @IsOptional() @IsInt() @Min(0) @Type(() => Number) slippage_bps?: number;
}

class CreateQuoteDto {
  @IsOptional() @IsString() intent_id?: string;
  @IsString() @Length(3, 4) from_currency!: string;
  @IsString() @Length(3, 4) to_currency!: string;
  @IsInt() @Min(1) @Type(() => Number) from_amount_minor!: number;
}

class ConsumeQuoteDto {
  @IsString() signature!: string;
}

@ApiTags('quotes')
@Controller('quotes')
class QuotesController {
  constructor(
    private readonly quotes: QuoteService,
    private readonly dexQuotes: DexQuoteService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List recent FX quotes (newest first)' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async list(@Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number) {
    const data = await this.quotes.listRecent(Math.min(limit, 200));
    return { data };
  }

  @Post('dex')
  @ApiOperation({ summary: 'Issue a signed on-chain DEX quote (Uniswap V3 on Base)' })
  async createDex(@Body() dto: CreateDexQuoteDto) {
    return this.dexQuotes.quoteDex({
      intentId: dto.intent_id,
      fromCurrency: dto.from_currency,
      toCurrency: dto.to_currency,
      fromAmountMinor: BigInt(dto.from_amount_minor),
      recipient: dto.recipient,
      slippageBps: dto.slippage_bps,
    });
  }

  @Get('dex/pairs')
  @ApiOperation({ summary: 'List supported DEX tokens and pairs for the configured Base network' })
  dexPairs() {
    return this.dexQuotes.listDexCatalog();
  }

  @Get('dex/pool')
  @ApiOperation({ summary: 'Check Uniswap V3 pool readiness for a DEX pair on Base' })
  @ApiQuery({ name: 'from_currency', required: true })
  @ApiQuery({ name: 'to_currency', required: true })
  async dexPool(
    @Query('from_currency') fromCurrency: string,
    @Query('to_currency') toCurrency: string,
  ) {
    return this.dexQuotes.getPoolReadiness(fromCurrency, toCurrency);
  }

  @Post('preview')
  @HttpCode(200)
  @ApiOperation({ summary: 'Preview FX output without persisting a quote (UI)' })
  async preview(@Body() dto: CreateQuoteDto) {
    return this.quotes.previewQuote({
      fromCurrency: dto.from_currency,
      toCurrency: dto.to_currency,
      fromAmountMinor: BigInt(dto.from_amount_minor),
    });
  }

  @Post()
  @ApiOperation({ summary: 'Issue a signed FX quote with a TTL' })
  async create(@Body() dto: CreateQuoteDto) {
    return this.quotes.quote({
      intentId: dto.intent_id,
      fromCurrency: dto.from_currency,
      toCurrency: dto.to_currency,
      fromAmountMinor: BigInt(dto.from_amount_minor),
    });
  }

  @Post(':id/consume')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mark a quote consumed (idempotent). Requires the original signature.' })
  async consume(@Param('id') id: string, @Body() dto: ConsumeQuoteDto) {
    return this.quotes.consume(id, dto.signature);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Inspect a quote (audit)' })
  async byId(@Param('id') id: string) {
    const q = await this.quotes.getQuote(id);
    if (!q) throw NotFoundError('liquidity.quote_not_found', `Quote ${id} not found`);
    return {
      quote_id: q.id,
      from_currency: q.fromCurrency,
      to_currency: q.toCurrency,
      from_amount_minor: q.fromAmountMinor.toString(),
      to_amount_minor: q.toAmountMinor.toString(),
      quoted_rate_1e8: q.quotedRate1e8.toString(),
      mid_rate_1e8: q.midRate1e8.toString(),
      spread_bps: q.spreadBps,
      provider: q.provider,
      status: q.status,
      expires_at: q.expiresAt.toISOString(),
      consumed_at: q.consumedAt?.toISOString() ?? null,
    };
  }
}

@Module({
  imports: [RatesModule],
  controllers: [QuotesController],
  providers: [QuoteService, DexQuoteService],
  exports: [QuoteService, DexQuoteService],
})
export class QuotesModule {}
