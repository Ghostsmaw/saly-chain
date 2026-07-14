import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  HttpCode,
  Module,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { NotFoundError, ValidationError } from '@salychain/errors';
import { IntentState } from '../generated/prisma/index.js';
import { IntentsService } from './intents.service.js';

class IngestDto {
  @IsObject() intent!: Record<string, unknown>;
}

@ApiTags('intents')
@Controller('intents')
class IntentsController {
  constructor(private readonly intents: IntentsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Submit a canonical intent. Idempotent on (actor, Idempotency-Key).' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  async ingest(@Headers('idempotency-key') idempotencyKey: string, @Body() dto: IngestDto) {
    if (!idempotencyKey) throw ValidationError('intent.missing_idempotency_key', 'Idempotency-Key header required');
    return this.intents.ingest({ payload: dto.intent, idempotencyKey });
  }

  @Get(':intentId')
  @ApiOperation({ summary: 'Fetch an intent record by ID' })
  async byId(@Param('intentId') intentId: string) {
    const record = await this.intents.getById(intentId);
    if (!record) throw NotFoundError('intent.not_found', `Intent ${intentId} not found`);
    return toIntentDto(record);
  }

  @Get()
  @ApiOperation({ summary: 'List recent intents' })
  @ApiQuery({ name: 'state', required: false, enum: IntentState })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async list(
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('state') state?: IntentState,
  ) {
    const data = await this.intents.list({ state, limit: Math.min(limit, 200) });
    return { data: data.map(toIntentDto) };
  }
}

function toIntentDto(r: NonNullable<Awaited<ReturnType<IntentsService['getById']>>>) {
  return {
    intent_id: r.intentId,
    actor_ref: r.actorRef,
    channel: r.channel,
    kind: r.kind,
    state: r.state,
    execution_transaction_id: r.executionTransactionId ?? undefined,
    rejection: r.rejectionCode ? { code: r.rejectionCode, message: r.rejectionMessage } : undefined,
    payload: r.payload,
    created_at: r.createdAt.toISOString(),
    updated_at: r.updatedAt.toISOString(),
  };
}

@Module({
  controllers: [IntentsController],
  providers: [IntentsService],
  exports: [IntentsService],
})
export class IntentsModule {}
