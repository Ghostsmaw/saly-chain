import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ulid } from 'ulid';
import { ConflictError, NotFoundError } from '@salychain/errors';
import { Delivery, DeliveryStatus, Prisma } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { DELIVERY_QUEUE } from './queue.module.js';
import { SubscriptionsService } from '../subscriptions/subscriptions.service.js';

export interface DeliveryJobPayload {
  deliveryId: string;
}

export interface EnqueueInput {
  subject: string;
  eventId: string;
  payload: unknown;
}

/**
 * Owns the lifecycle of `Delivery` rows. Two entry points:
 *
 *  1. `enqueueFromEvent` — called by the NATS subscriber whenever an upstream
 *     event lands. Materializes one Delivery per matching subscription, then
 *     pushes to the BullMQ queue.
 *
 *  2. `replay` — admin / partner-initiated re-delivery of a single delivery
 *     row. Resets attempts and re-enqueues.
 */
@Injectable()
export class DeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly subs: SubscriptionsService,
    @Inject(DELIVERY_QUEUE) private readonly queue: Queue<DeliveryJobPayload>,
  ) {}

  async enqueueFromEvent(input: EnqueueInput): Promise<{ enqueued: number }> {
    const targets = await this.subs.resolveTargets(input.subject);
    if (targets.length === 0) return { enqueued: 0 };

    let enqueued = 0;
    for (const sub of targets) {
      try {
        const id = `whdlv_${ulid()}`;
        const created = await this.prisma.delivery.create({
          data: {
            id,
            subscriptionId: sub.id,
            subject: input.subject,
            eventId: input.eventId,
            payload: input.payload as Prisma.InputJsonValue,
            status: 'PENDING',
            attempts: 0,
          },
        });
        await this.queue.add(
          'deliver',
          { deliveryId: created.id },
          { jobId: created.id }, // idempotent enqueue
        );
        enqueued += 1;
      } catch (err) {
        if ((err as { code?: string }).code === 'P2002') {
          this.logger.debug?.(`event ${input.eventId} already enqueued for ${sub.id}`);
          continue;
        }
        throw err;
      }
    }
    if (enqueued > 0) this.logger.log(`enqueued ${enqueued} deliveries for ${input.subject} event=${input.eventId}`);
    return { enqueued };
  }

  async listForSubscription(subscriptionId: string, opts: { status?: DeliveryStatus; limit: number } = { limit: 50 }) {
    return this.prisma.delivery.findMany({
      where: { subscriptionId, ...(opts.status ? { status: opts.status } : {}) },
      orderBy: { createdAt: 'desc' },
      take: Math.min(opts.limit, 200),
    });
  }

  async getById(id: string): Promise<Delivery> {
    const d = await this.prisma.delivery.findUnique({ where: { id } });
    if (!d) throw NotFoundError('webhooks.delivery.not_found', `Delivery ${id} not found`);
    return d;
  }

  async replay(id: string): Promise<{ delivery_id: string; status: DeliveryStatus }> {
    const existing = await this.getById(id);
    if (existing.status === 'IN_FLIGHT') {
      throw ConflictError('webhooks.delivery.in_flight', 'Delivery is currently being attempted; try again shortly');
    }
    const updated = await this.prisma.delivery.update({
      where: { id },
      data: { status: 'PENDING', nextAttemptAt: null, lastError: null },
    });
    await this.queue.add('deliver', { deliveryId: id }, { jobId: `${id}-replay-${Date.now()}` });
    this.logger.warn(`delivery ${id} replay requested`);
    return { delivery_id: id, status: updated.status };
  }
}
