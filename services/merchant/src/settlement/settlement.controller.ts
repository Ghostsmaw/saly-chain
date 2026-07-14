import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString, Length } from 'class-validator';
import { SettlementService } from './settlement.service.js';

class GenerateSettlementReportDto {
  @IsISO8601()
  period_start!: string;

  @IsISO8601()
  period_end!: string;

  @IsOptional()
  @IsString()
  @Length(2, 8)
  currency?: string;
}

@ApiTags('settlement-reports')
@Controller('settlement-reports')
export class SettlementController {
  constructor(private readonly settlement: SettlementService) {}

  @Post()
  @ApiOperation({ summary: 'Generate a settlement report for the current org' })
  generate(@Body() dto: GenerateSettlementReportDto) {
    return this.settlement.generate(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List settlement reports' })
  list(@Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number) {
    return this.settlement.list(limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a settlement report by id' })
  get(@Param('id') id: string) {
    return this.settlement.getById(id);
  }

  @Get(':id/export')
  @ApiOperation({ summary: 'Export settlement report lines as CSV' })
  exportCsv(@Param('id') id: string) {
    return this.settlement.exportCsv(id);
  }
}
