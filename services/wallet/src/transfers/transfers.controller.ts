import { Body, Controller, DefaultValuePipe, Get, HttpCode, Param, ParseIntPipe, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BroadcastJobStatus } from '../generated/prisma/index.js';
import { TransfersService } from './transfers.service.js';
import { CreateTransferDto, TransferResponseDto } from './dto.js';

@ApiTags('transfers')
@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfers: TransfersService) {}

  @Get()
  @ApiOperation({ summary: 'List recent broadcast jobs (newest first)' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: BroadcastJobStatus })
  async list(
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('status') status?: BroadcastJobStatus,
  ) {
    const rows = await this.transfers.list({ limit: Math.min(limit, 200), status });
    return {
      data: rows.map((job) => ({
        ...this.transfers.toResponse(job),
        chain: job.chain,
        destination_address: job.destinationAddress,
        amount_minor: job.amountMinor.toString(),
        asset: job.asset,
      })),
    };
  }

  @Post()
  @HttpCode(202)
  @ApiOperation({ summary: 'Initiate an outbound on-chain transfer (asynchronous)' })
  @ApiResponse({ status: 202, type: TransferResponseDto })
  async create(@Body() dto: CreateTransferDto) {
    const job = await this.transfers.create(dto);
    return this.transfers.toResponse(job);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch transfer status' })
  @ApiResponse({ status: 200, type: TransferResponseDto })
  async byId(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const job = await this.transfers.findById(id);
    return this.transfers.toResponse(job);
  }
}
