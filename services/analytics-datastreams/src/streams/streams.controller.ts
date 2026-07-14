import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsIn, IsObject, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { StreamDeliveryStatus, StreamSink, StreamStatus } from '../generated/prisma/index.js';
import { StreamsService } from './streams.service.js';
import { DeliveryService } from '../delivery/delivery.service.js';

class CreateStreamDto {
  @IsString() @Length(3, 64) org_id!: string;
  @IsString() @Length(1, 120) name!: string;
  @IsOptional() @IsString() @Length(1, 500) description?: string;
  @IsIn(['WEBHOOK', 'KAFKA', 'WEBSOCKET']) sink!: StreamSink;
  @IsOptional() @IsObject() filter?: Record<string, unknown>;
  @IsOptional() @IsUrl({ require_protocol: true, require_tld: false }) url?: string;
  @IsOptional() @IsString() @Length(1, 249) kafka_topic?: string;
}

class SetStatusDto {
  @IsIn(['ACTIVE', 'PAUSED', 'DISABLED']) status!: StreamStatus;
}

@ApiTags('streams')
@Controller('streams')
export class StreamsController {
  constructor(
    private readonly streams: StreamsService,
    private readonly delivery: DeliveryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a datastream. Returns signing_secret ONCE (webhook sink).' })
  create(@Body() dto: CreateStreamDto) {
    return this.streams.create({
      orgId: dto.org_id,
      name: dto.name,
      sink: dto.sink,
      filter: dto.filter ?? {},
      ...(dto.description ? { description: dto.description } : {}),
      ...(dto.url ? { url: dto.url } : {}),
      ...(dto.kafka_topic ? { kafkaTopic: dto.kafka_topic } : {}),
    });
  }

  @Get()
  @ApiOperation({ summary: 'List datastreams for an organization' })
  async list(@Query('org_id') orgId: string) {
    return { data: await this.streams.list(orgId) };
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.streams.getById(id);
  }

  @Post(':id/status')
  setStatus(@Param('id') id: string, @Body() dto: SetStatusDto) {
    return this.streams.setStatus(id, dto.status);
  }

  @Post(':id/rotate-secret')
  @ApiOperation({ summary: 'Rotate the webhook signing secret. Returns the new secret ONCE.' })
  rotate(@Param('id') id: string) {
    return this.streams.rotateSecret(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.streams.delete(id);
  }

  @Get(':id/deliveries')
  @ApiOperation({ summary: 'List recent deliveries for a stream' })
  @ApiQuery({ name: 'status', required: false, enum: StreamDeliveryStatus })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async deliveries(
    @Param('id') id: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('status') status?: StreamDeliveryStatus,
  ) {
    return {
      data: await this.delivery.listForStream(id, { limit, ...(status ? { status } : {}) }),
    };
  }

  @Get(':id/dead-letters')
  @ApiOperation({ summary: 'List dead-lettered deliveries for a stream' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async deadLetters(
    @Param('id') id: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return { data: await this.delivery.listDeadLetters(id, limit) };
  }
}

@ApiTags('deliveries')
@Controller('deliveries')
export class DeliveriesController {
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
