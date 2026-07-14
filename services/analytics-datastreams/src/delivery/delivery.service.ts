import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ulid } from 'ulid';
import { ConflictError, NotFoundError } from '@salychain/errors';
import { StreamDelivery, StreamDeliveryStatus, Prisma } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { DELIVERY_QUEUE } from './queue.module.js';

export interface DeliveryJobPayload {
  deliveryId: string;
}

export interface EnqueueMatchInput {
  streamId: string;
  subject: string;
  eventId: string;
  payload: unknown;
}

/**
 * Owns the lifecycle of `StreamDelivery` rows. A matched event is materialized
 * as exactly one delivery per stream (idempotent on streamId+eventId), then
 * pushed to BullMQ. The worker dispatches to the stream's sink (webhook/Kafka)
 * with retry + dead-letter.
 */
@Injectable()
export class DeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(DELIVERY_QUEUE) private readonly queue: Queue<DeliveryJobPayload>,
  ) {}

  /** Materialize + enqueue a delivery for one matched (stream, event) pair. */
  async enqueueMatch(input: EnqueueMatchInput): Promise<{ enqueued: boolean }> {
    try {
      const id = `dsdlv_${ulid()}`;
      const created = await this.prisma.streamDelivery.create({
        data: {
          id,
          streamId: input.streamId,
          subject: input.subject,
          eventId: input.eventId,
          payload: input.payload as Prisma.InputJsonValue,
          status: 'PENDING',
          attempts: 0,
        },
      });
      await this.queue.add('deliver', { deliveryId: created.id }, { jobId: created.id });
      return { enqueued: true };
    } catch (err) {
      if ((err as { code?: string }).code === 'P2002') {
        // Same event already enqueued for this stream — at-least-once dedupe.
        this.logger.debug?.(`event ${input.eventId} already enqueued for stream ${input.streamId}`);
        return { enqueued: false };
      }
      throw err;
    }
  }

  async listForStream(
    streamId: string,
    opts: { status?: StreamDeliveryStatus; limit: number } = { limit: 50 },
  ): Promise<StreamDelivery[]> {
    return this.prisma.streamDelivery.findMany({
      where: { streamId, ...(opts.status ? { status: opts.status } : {}) },
      orderBy: { createdAt: 'desc' },
      take: Math.min(opts.limit, 200),
    });
  }

  async getById(id: string): Promise<StreamDelivery> {
    const d = await this.prisma.streamDelivery.findUnique({ where: { id } });
    if (!d) throw NotFoundError('datastreams.delivery.not_found', `Delivery ${id} not found`);
    return d;
  }

  async replay(id: string): Promise<{ delivery_id: string; status: StreamDeliveryStatus }> {
    const existing = await this.getById(id);
    if (existing.status === 'IN_FLIGHT') {
      throw ConflictError(
        'datastreams.delivery.in_flight',
        'Delivery is currently being attempted; try again shortly',
      );
    }
    const updated = await this.prisma.streamDelivery.update({
      where: { id },
      data: { status: 'PENDING', nextAttemptAt: null, lastError: null },
    });
    await this.queue.add('deliver', { deliveryId: id }, { jobId: `${id}-replay-${Date.now()}` });
    this.logger.warn(`delivery ${id} replay requested`);
    return { delivery_id: id, status: updated.status };
  }

  async listDeadLetters(streamId: string, limit = 50) {
    return this.prisma.streamDeadLetter.findMany({
      where: { streamId },
      orderBy: { createdAt: 'desc' },
      take: Math.min(limit, 200),
    });
  }
}
