import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import type { Queue } from 'bullmq';
import { JOB_QUEUE } from '../runs/queue.module.js';
import { EntitiesService } from './entities.service.js';

class ResolveDto {
  @IsOptional() @IsString() @Length(1, 64) chain?: string;
  /** When true the run is enqueued for the worker; otherwise it runs inline. */
  @IsOptional() @IsBoolean() async?: boolean;
}

@ApiTags('intelligence-entities')
@Controller('entities')
export class EntitiesController {
  constructor(
    private readonly entities: EntitiesService,
    @Inject(JOB_QUEUE) private readonly queue: Queue,
  ) {}

  @Post('resolve')
  @ApiOperation({ summary: 'Run (or enqueue) an entity-resolution pass' })
  async resolve(@Body() dto: ResolveDto) {
    if (dto.async) {
      const job = await this.queue.add('resolve', {
        type: 'resolve',
        trigger: 'MANUAL',
        ...(dto.chain ? { chain: dto.chain } : {}),
      });
      return { enqueued: true, job_id: job.id };
    }
    return this.entities.runResolution('MANUAL', dto.chain);
  }

  @Get()
  @ApiOperation({ summary: 'List resolved entities (highest risk first)' })
  @ApiQuery({ name: 'chain', required: false })
  @ApiQuery({ name: 'sanctioned', required: false })
  async list(
    @Query('chain') chain: string | undefined,
    @Query('sanctioned') sanctioned: string | undefined,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return {
      data: await this.entities.listEntities({
        ...(chain ? { chain } : {}),
        ...(sanctioned !== undefined ? { sanctioned: sanctioned === 'true' } : {}),
        limit: Math.min(limit, 500),
      }),
    };
  }

  @Get('runs')
  @ApiOperation({ summary: 'List recent entity-resolution runs' })
  async runs(@Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number) {
    return { data: await this.entities.listRuns(Math.min(limit, 100)) };
  }

  @Get('by-address')
  @ApiOperation({ summary: 'Resolve the entity an address belongs to' })
  async byAddress(@Query('chain') chain: string, @Query('address') address: string) {
    return this.entities.findByAddress(chain, address);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a resolved entity by id (with members)' })
  async get(@Param('id') id: string) {
    return this.entities.getEntityById(id);
  }
}
