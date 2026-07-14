import { Body, Controller, DefaultValuePipe, Get, HttpCode, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { MarketplaceService } from './marketplace.service.js';

class PublishServiceBody {
  @IsString() @Length(1, 200) name!: string;
  @IsOptional() @IsString() description?: string;
  @IsString() price_minor!: string;
  @IsString() @Length(3, 8) currency!: string;
  @IsOptional() capability?: Record<string, unknown>;
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
  @IsOptional() @IsBoolean() list_on_marketplace?: boolean;
}

class SubscribeBody {
  @IsString() subscriber_agent_id!: string;
  @IsOptional() @IsString() renew_at?: string;
  @IsOptional() @IsString() intent_id?: string;
}

class InvoiceBody {
  @IsString() payer_agent_id!: string;
  @IsString() amount_minor!: string;
  @IsString() @Length(3, 8) currency!: string;
  @IsOptional() @IsString() memo?: string;
  @IsOptional() @IsString() intent_id?: string;
}

class UsageBody {
  @IsOptional() @IsString() service_id?: string;
  @IsString() units!: string;
  @IsString() amount_minor!: string;
  @IsString() @Length(3, 8) currency!: string;
  @IsString() period_start!: string;
  @IsString() period_end!: string;
  @IsOptional() @IsString() intent_id?: string;
}

@ApiTags('agents-marketplace')
@Controller('agents/marketplace')
export class MarketplaceDiscoverController {
  constructor(private readonly marketplace: MarketplaceService) {}

  @Get('discover')
  @ApiOperation({ summary: 'Discover marketplace agent services' })
  discover(
    @Query('tag') tag?: string,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit?: number,
  ) {
    return this.marketplace.discover({ tag, limit });
  }
}

@ApiTags('agents-marketplace')
@Controller('agents')
export class MarketplaceController {
  constructor(private readonly marketplace: MarketplaceService) {}

  @Post(':id/services')
  @HttpCode(201)
  @ApiOperation({ summary: 'Publish a paid agent capability' })
  publishService(@Param('id') agentId: string, @Body() body: PublishServiceBody) {
    return this.marketplace.publishService({
      agentId,
      name: body.name,
      description: body.description,
      priceMinor: body.price_minor,
      currency: body.currency,
      capability: body.capability,
      tags: body.tags,
      listOnMarketplace: body.list_on_marketplace,
    });
  }

  @Post('services/:serviceId/subscribe')
  @HttpCode(201)
  subscribe(@Param('serviceId') serviceId: string, @Body() body: SubscribeBody) {
    return this.marketplace.subscribe({
      serviceId,
      subscriberAgentId: body.subscriber_agent_id,
      renewAt: body.renew_at,
      intentId: body.intent_id,
    });
  }

  @Post(':id/invoice')
  @HttpCode(201)
  invoice(@Param('id') agentId: string, @Body() body: InvoiceBody) {
    return this.marketplace.createInvoice({
      agentId,
      payerAgentId: body.payer_agent_id,
      amountMinor: body.amount_minor,
      currency: body.currency,
      memo: body.memo,
      intentId: body.intent_id,
    });
  }

  @Post(':id/usage')
  @HttpCode(201)
  usage(@Param('id') agentId: string, @Body() body: UsageBody) {
    return this.marketplace.recordUsage({
      agentId,
      serviceId: body.service_id,
      units: body.units,
      amountMinor: body.amount_minor,
      currency: body.currency,
      periodStart: body.period_start,
      periodEnd: body.period_end,
      intentId: body.intent_id,
    });
  }
}
