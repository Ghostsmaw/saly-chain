import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JournalService } from './journal.service.js';
import { JournalEntryResponseDto, PostJournalEntryDto } from './dto.js';

@ApiTags('journal')
@Controller('journal/entries')
export class JournalController {
  constructor(private readonly journal: JournalService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Post a double-entry journal entry (idempotent)' })
  @ApiResponse({ status: 201, type: JournalEntryResponseDto })
  async post(@Body() dto: PostJournalEntryDto) {
    const entry = await this.journal.post(dto);
    return this.journal.toResponse(entry);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a journal entry by id' })
  @ApiResponse({ status: 200, type: JournalEntryResponseDto })
  async byId(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const entry = await this.journal.findById(id);
    return this.journal.toResponse(entry);
  }

  @Post(':id/reverse')
  @HttpCode(201)
  @ApiOperation({ summary: 'Reverse a posted journal entry' })
  async reverse(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: { idempotency_key: string; memo?: string },
  ) {
    const entry = await this.journal.reverse(id, body.idempotency_key, body.memo);
    return this.journal.toResponse(entry);
  }
}
