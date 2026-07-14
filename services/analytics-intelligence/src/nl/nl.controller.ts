import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { METRICS } from '../semantic/semantic.js';
import { NlService } from './nl.service.js';

class NlQueryDto {
  @IsString() @Length(3, 500) question!: string;
  @IsOptional() @IsString() @Length(1, 64) org_id?: string;
}

@ApiTags('intelligence-nl')
@Controller()
export class NlController {
  constructor(private readonly nl: NlService) {}

  @Post('nl/query')
  @ApiOperation({ summary: 'Ask a natural-language analytics question (semantic-layer grounded)' })
  async query(@Body() dto: NlQueryDto) {
    return this.nl.ask(dto.question, dto.org_id);
  }

  @Get('semantic/metrics')
  @ApiOperation({ summary: 'List the semantic-layer metrics, dimensions and filters' })
  metrics() {
    return {
      data: Object.values(METRICS).map((m) => ({
        id: m.id,
        description: m.description,
        dimensions: Object.keys(m.dimensions),
        filters: Object.keys(m.filters),
      })),
    };
  }
}
