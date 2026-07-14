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
import { IsIn, IsObject, IsOptional, IsString, Length } from 'class-validator';
import {
  DatashareDestination,
  DatashareFormat,
  DatashareStatus,
} from '../generated/prisma/index.js';
import { DatasharesService } from './datashares.service.js';
import { NAMED_DATASETS } from '../datasets/named-datasets.js';

class CreateDatashareDto {
  @IsString() @Length(3, 64) org_id!: string;
  @IsString() @Length(1, 120) name!: string;
  @IsOptional() @IsString() @Length(1, 500) description?: string;
  @IsString() dataset_id!: string;
  @IsOptional() @IsObject() params?: Record<string, unknown>;
  @IsOptional() @IsObject() policy?: Record<string, unknown>;
  @IsOptional()
  @IsIn(['S3', 'SNOWFLAKE', 'BIGQUERY', 'DATABRICKS'])
  destination?: DatashareDestination;
  @IsOptional() @IsObject() destination_config?: Record<string, unknown>;
  @IsOptional() @IsIn(['CSV', 'JSON', 'PARQUET']) format?: DatashareFormat;
  @IsOptional() @IsString() @Length(9, 100) schedule?: string;
}

class SetStatusDto {
  @IsIn(['ACTIVE', 'PAUSED']) status!: DatashareStatus;
}

@ApiTags('datashares')
@Controller('datashares')
export class DatasharesController {
  constructor(private readonly shares: DatasharesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a governed datashare (curated dataset + redaction policy)' })
  create(@Body() dto: CreateDatashareDto) {
    return this.shares.create({
      orgId: dto.org_id,
      name: dto.name,
      datasetId: dto.dataset_id,
      ...(dto.description ? { description: dto.description } : {}),
      ...(dto.params ? { params: dto.params } : {}),
      ...(dto.policy ? { policy: dto.policy } : {}),
      ...(dto.destination ? { destination: dto.destination } : {}),
      ...(dto.destination_config ? { destinationConfig: dto.destination_config } : {}),
      ...(dto.format ? { format: dto.format } : {}),
      ...(dto.schedule ? { schedule: dto.schedule } : {}),
    });
  }

  @Get()
  @ApiOperation({ summary: 'List datashares for an organization' })
  async list(@Query('org_id') orgId: string) {
    return { data: await this.shares.list(orgId) };
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.shares.getById(id);
  }

  @Post(':id/status')
  setStatus(@Param('id') id: string, @Body() dto: SetStatusDto) {
    return this.shares.setStatus(id, dto.status);
  }

  @Post(':id/run')
  @HttpCode(202)
  @ApiOperation({ summary: 'Trigger a one-off run now (returns the pending run)' })
  run(@Param('id') id: string) {
    return this.shares.runNow(id);
  }

  @Get(':id/runs')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async runs(
    @Param('id') id: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return { data: await this.shares.listRuns(id, { limit }) };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.shares.delete(id);
  }
}

@ApiTags('datasets')
@Controller('datasets')
export class DatasetsController {
  @Get()
  @ApiOperation({
    summary: 'List the curated datasets available to share, with their column schema',
  })
  list() {
    return {
      data: Object.values(NAMED_DATASETS).map((d) => ({
        id: d.id,
        title: d.title,
        description: d.description,
        columns: d.columns.map((c) => ({ name: c.name, type: c.type, class: c.class })),
      })),
    };
  }
}
