import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Module, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { DeliveryStatus, SubscriptionStatus } from '../generated/prisma/index.js';
import { SubscriptionsService } from './subscriptions.service.js';
import { DeliveryService } from '../delivery/delivery.service.js';

class CreateSubscriptionDto {
  @IsString() @Length(3, 64) org_id!: string;
  @IsUrl({ require_protocol: true, require_tld: false }) url!: string;
  @IsArray() @ArrayMinSize(1) @ArrayMaxSize(32) @IsString({ each: true }) subjects!: string[];
  @IsOptional() @IsString() @Length(1, 200) description?: string;
}

class SetStatusDto {
  @IsIn(['ACTIVE', 'PAUSED', 'DISABLED']) status!: SubscriptionStatus;
}

@ApiTags('subscriptions')
@Controller('subscriptions')
class SubscriptionsController {
  constructor(
    private readonly subs: SubscriptionsService,
    private readonly delivery: DeliveryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a webhook subscription. Returns signing_secret ONCE.' })
  create(@Body() dto: CreateSubscriptionDto) {
    return this.subs.create({
      orgId: dto.org_id,
      url: dto.url,
      subjects: dto.subjects,
      ...(dto.description ? { description: dto.description } : {}),
    });
  }

  @Get()
  @ApiOperation({ summary: 'List subscriptions for an organization' })
  async list(@Query('org_id') orgId: string) {
    return { data: await this.subs.list(orgId) };
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.subs.getById(id);
  }

  @Post(':id/status')
  setStatus(@Param('id') id: string, @Body() dto: SetStatusDto) {
    return this.subs.setStatus(id, dto.status);
  }

  @Post(':id/rotate-secret')
  @ApiOperation({ summary: 'Rotate the signing secret. Returns the new secret ONCE.' })
  rotate(@Param('id') id: string) {
    return this.subs.rotateSecret(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.subs.delete(id);
  }

  @Get(':id/deliveries')
  @ApiOperation({ summary: 'List recent deliveries for a subscription' })
  @ApiQuery({ name: 'status', required: false, enum: DeliveryStatus })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async deliveries(
    @Param('id') id: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('status') status?: DeliveryStatus,
  ) {
    return { data: await this.delivery.listForSubscription(id, { limit, ...(status ? { status } : {}) }) };
  }
}

@ApiTags('deliveries')
@Controller('deliveries')
class DeliveriesController {
  constructor(private readonly delivery: DeliveryService) {}

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.delivery.getById(id);
  }

  @Post(':id/replay')
  @HttpCode(202)
  replay(@Param('id') id: string) {
    return this.delivery.replay(id);
  }
}

@Module({
  controllers: [SubscriptionsController, DeliveriesController],
  providers: [SubscriptionsService, DeliveryService],
  exports: [SubscriptionsService, DeliveryService],
})
export class SubscriptionsModule {}
