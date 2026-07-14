import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ulid } from 'ulid';
import { Worker, type Job } from 'bullmq';
import type { Redis } from 'ioredis';
import { PrismaService } from '../prisma/prisma.service.js';
import { DELIVERY_QUEUE_NAME, REDIS_CONNECTION } from './queue.module.js';
import { WEBHOOKS_ENV, type WebhooksEnv } from '../config/env.js';
import { signPayload } from './signing.js';
import { SubscriptionsService } from '../subscriptions/subscriptions.service.js';
import type { DeliveryJobPayload } from './delivery.service.js';

/**
 * Pulls delivery jobs off the queue, signs them with the subscription's
 * secret, and POSTs to the subscriber URL.
 *
 * On 2xx → SUCCEEDED. On 4xx (other than 408, 429) → FAILED (caller error, no
 * retry). On 5xx / timeout / network → status RETRYABLE and we throw to let
 * BullMQ re-enqueue with exponential backoff. When attempts == maxAttempts we
 * mark the delivery DEAD and copy it into the dead-letter table.
 */
@Injectable()
export class DeliveryWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DeliveryWorker.name);
  private worker?: Worker;

  constructor(
    private readonly prisma: PrismaService,
    private readonly subs: SubscriptionsService,
    @Inject(REDIS_CONNECTION) private readonly redis: Redis,
    @Inject(WEBHOOKS_ENV) private readonly env: WebhooksEnv,
  ) {}

  async onModuleInit(): Promise<void> {
    this.worker = new Worker(
      DELIVERY_QUEUE_NAME,
      async (job: Job<DeliveryJobPayload>) => this.handle(job),
      { connection: this.redis, concurrency: 10 },
    );
    this.worker.on('failed', (job, err) => this.logger.warn(`delivery ${job?.id} failed: ${err.message}`));
    this.worker.on('completed', (job) => this.logger.log(`delivery ${job.id} completed`));
    this.logger.log(`DeliveryWorker listening on ${DELIVERY_QUEUE_NAME}`);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.worker) await this.worker.close();
  }

  private async handle(job: Job<DeliveryJobPayload>): Promise<void> {
    const delivery = await this.prisma.delivery.findUnique({ where: { id: job.data.deliveryId } });
    if (!delivery) {
      this.logger.error(`delivery ${job.data.deliveryId} missing — terminating`);
      return;
    }
    if (delivery.status === 'SUCCEEDED' || delivery.status === 'DEAD' || delivery.status === 'FAILED') {
      this.logger.debug?.(`delivery ${delivery.id} already terminal (${delivery.status})`);
      return;
    }

    const sub = await this.prisma.subscription.findUnique({ where: { id: delivery.subscriptionId } });
    if (!sub) {
      this.logger.error(`subscription ${delivery.subscriptionId} disappeared — failing delivery ${delivery.id}`);
      await this.prisma.delivery.update({
        where: { id: delivery.id },
        data: { status: 'FAILED', lastError: 'subscription_deleted' },
      });
      return;
    }
    if (sub.status !== 'ACTIVE') {
      this.logger.debug?.(`subscription ${sub.id} is ${sub.status}; deferring delivery ${delivery.id}`);
      await this.prisma.delivery.update({
        where: { id: delivery.id },
        data: { status: 'RETRYABLE', lastError: `subscription_${sub.status.toLowerCase()}` },
      });
      throw new Error(`subscription not active: ${sub.status}`);
    }

    const body = JSON.stringify({
      id: delivery.id,
      event_id: delivery.eventId,
      subject: delivery.subject,
      created_at: new Date().toISOString(),
      delivery_attempt: (delivery.attempts ?? 0) + 1,
      data: delivery.payload,
    });
    const signed = signPayload(sub.signingSecret, sub.signingKeyId, body);
    const correlationId = ulid();

    await this.prisma.delivery.update({
      where: { id: delivery.id },
      data: { status: 'IN_FLIGHT', attempts: { increment: 1 } },
    });

    const start = Date.now();
    let response: Response;
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.env.DELIVERY_TIMEOUT_MS);
      try {
        response = await fetch(sub.url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': 'SalyChain-Webhooks/1.0',
            'x-saly-signature': signed.header,
            'x-saly-subject': delivery.subject,
            'x-saly-event-id': delivery.eventId,
            'x-saly-delivery-id': delivery.id,
            'x-correlation-id': correlationId,
          },
          body,
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timer);
      }
    } catch (err) {
      const latency = Date.now() - start;
      const msg = (err as Error).message;
      await this.prisma.delivery.update({
        where: { id: delivery.id },
        data: {
          status: 'RETRYABLE',
          lastError: msg.slice(0, 1_000),
          lastLatencyMs: latency,
          nextAttemptAt: nextRetryAt(job.attemptsMade, this.env.DELIVERY_BASE_BACKOFF_MS),
        },
      });
      await this.subs.markFailed(sub.id);
      await this.maybeMoveToDeadLetter(delivery.id, job.opts.attempts ?? this.env.MAX_DELIVERY_ATTEMPTS);
      throw err;
    }

    const latency = Date.now() - start;
    const text = await response.text().catch(() => '');
    const excerpt = text.slice(0, 500);

    if (response.status >= 200 && response.status < 300) {
      await this.prisma.delivery.update({
        where: { id: delivery.id },
        data: {
          status: 'SUCCEEDED',
          lastStatusCode: response.status,
          lastLatencyMs: latency,
          lastResponseExcerpt: excerpt,
          lastError: null,
          succeededAt: new Date(),
        },
      });
      await this.subs.markDelivered(sub.id);
      this.logger.log(`delivery ${delivery.id} → ${response.status} in ${latency}ms`);
      return;
    }

    const retryable = response.status >= 500 || response.status === 408 || response.status === 429;
    await this.prisma.delivery.update({
      where: { id: delivery.id },
      data: {
        status: retryable ? 'RETRYABLE' : 'FAILED',
        lastStatusCode: response.status,
        lastLatencyMs: latency,
        lastResponseExcerpt: excerpt,
        lastError: `http_${response.status}`,
        nextAttemptAt: retryable ? nextRetryAt(job.attemptsMade, this.env.DELIVERY_BASE_BACKOFF_MS) : null,
      },
    });
    await this.subs.markFailed(sub.id);

    if (!retryable) {
      this.logger.warn(`delivery ${delivery.id} non-retryable ${response.status}`);
      return;
    }
    await this.maybeMoveToDeadLetter(delivery.id, job.opts.attempts ?? this.env.MAX_DELIVERY_ATTEMPTS);
    throw new Error(`http_${response.status}`);
  }

  private async maybeMoveToDeadLetter(deliveryId: string, maxAttempts: number): Promise<void> {
    const delivery = await this.prisma.delivery.findUnique({ where: { id: deliveryId } });
    if (!delivery) return;
    if (delivery.attempts < maxAttempts) return;

    await this.prisma.$transaction(async (tx) => {
      await tx.delivery.update({ where: { id: deliveryId }, data: { status: 'DEAD' } });
      await tx.deadLetter.upsert({
        where: { deliveryId },
        update: {},
        create: {
          id: `whdl_${ulid()}`,
          deliveryId,
          subscriptionId: delivery.subscriptionId,
          subject: delivery.subject,
          eventId: delivery.eventId,
          payload: delivery.payload as never,
          attempts: delivery.attempts,
          lastStatusCode: delivery.lastStatusCode,
          lastError: delivery.lastError,
        },
      });
    });
    this.logger.error(`delivery ${deliveryId} moved to dead-letter after ${delivery.attempts} attempts`);
  }
}

function nextRetryAt(attemptsMade: number, baseMs: number): Date {
  const exp = Math.min(60 * 60_000, baseMs * 2 ** attemptsMade);
  const jitter = Math.floor(Math.random() * (exp / 2));
  return new Date(Date.now() + exp + jitter);
}
