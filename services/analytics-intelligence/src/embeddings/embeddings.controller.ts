import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { ValidationError } from '@salychain/errors';
import type { Queue } from 'bullmq';
import { JOB_QUEUE } from '../runs/queue.module.js';
import { EmbeddingsService } from './embeddings.service.js';

class UpsertEmbeddingDto {
  @IsString() @Length(1, 64) chain!: string;
  @IsString() @Length(1, 128) address!: string;
}
class MaterializeDto {
  @IsString() @Length(1, 64) chain!: string;
}

@ApiTags('intelligence-embeddings')
@Controller('embeddings')
export class EmbeddingsController {
  constructor(
    private readonly embeddings: EmbeddingsService,
    @Inject(JOB_QUEUE) private readonly queue: Queue,
  ) {}

  @Post('upsert')
  @ApiOperation({ summary: 'Compute + store an address activity embedding' })
  async upsert(@Body() dto: UpsertEmbeddingDto) {
    const vector = await this.embeddings.upsertAddressEmbedding(dto.chain, dto.address);
    return { chain: dto.chain, address: dto.address.toLowerCase(), dim: vector.length };
  }

  @Post('materialize')
  @ApiOperation({ summary: 'Enqueue embedding (re)materialization for a chain' })
  async materialize(@Body() dto: MaterializeDto) {
    const job = await this.queue.add('embeddings', { type: 'embeddings', chain: dto.chain });
    return { enqueued: true, job_id: job.id };
  }

  @Get('search')
  @ApiOperation({ summary: 'Nearest-neighbour address search (by text or by address)' })
  @ApiQuery({ name: 'chain', required: true })
  @ApiQuery({ name: 'q', required: false, description: 'free-text profile query' })
  @ApiQuery({ name: 'address', required: false, description: 'find addresses similar to this one' })
  async search(
    @Query('chain') chain: string,
    @Query('q') q: string | undefined,
    @Query('address') address: string | undefined,
    @Query('k', new DefaultValuePipe(10), ParseIntPipe) k: number,
  ) {
    if (!chain) throw ValidationError('intelligence.embeddings.invalid', 'chain is required');
    const topK = Math.min(Math.max(k, 1), 100);
    if (address) {
      return { data: await this.embeddings.searchSimilarToAddress(chain, address, topK) };
    }
    if (q) {
      return { data: await this.embeddings.searchByText(chain, q, topK) };
    }
    throw ValidationError('intelligence.embeddings.invalid', 'either q or address is required');
  }
}
