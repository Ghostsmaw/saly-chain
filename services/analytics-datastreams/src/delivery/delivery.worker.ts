import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ulid } from 'ulid';
import { Worker, type Job } from 'bullmq';
import type { Redis } from 'ioredis';
import { datastreamsDeliveriesTotal } from '@salychain/observability';
import { Stream } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { DELIVERY_QUEUE_NAME, REDIS_CONNECTION } from './queue.module.js';
import { DATASTREAMS_ENV, type DatastreamsEnv } from '../config/env.js';
import { signPayload } from './signing.js';
import { StreamsService } from '../streams/streams.service.js';
import { KafkaSink } from '../sinks/kafka.sink.js';
import type { DeliveryJobPayload } from './delivery.service.js';

/**
 * Drains the delivery queue and pushes each matched event to its stream's sink:
 *
 *   WEBHOOK → HMAC-signed POST. 2xx ⇒ SUCCEEDED; 4xx (≠408/429) ⇒ FAILED (no
 *             retry); 5xx/timeout/network ⇒ RETRYABLE (BullMQ backoff).
 *   KAFKA   → produce to the configured topic. Any error ⇒ RETRYABLE.
 *
 * When attempts == maxAttempts on a retryable failure the delivery is marked
 * DEAD and copied into the dead-letter table.
 */
@Injectable()
export class DeliveryWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DeliveryWorker.name);
  private worker?: Worker;

  constructor(
    private readonly prisma: PrismaService,
    private readonly streams: StreamsService,
    private readonly kafka: KafkaSink,
    @Inject(REDIS_CONNECTION) private readonly redis: Redis,
    @Inject(DATASTREAMS_ENV) private readonly env: DatastreamsEnv,
  ) {}

  async onModuleInit(): Promise<void> {
    this.worker = new Worker(
      DELIVERY_QUEUE_NAME,
      async (job: Job<DeliveryJobPayload>) => this.handle(job),
      {
        connection: this.redis,
        concurrency: 10,
      },
    );
    this.worker.on('failed', (job, err) =>
      this.logger.warn(`delivery ${job?.id} failed: ${err.message}`),
    );
    this.logger.log(`DeliveryWorker listening on ${DELIVERY_QUEUE_NAME}`);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.worker) await this.worker.close();
  }

  private async handle(job: Job<DeliveryJobPayload>): Promise<void> {
    const delivery = await this.prisma.streamDelivery.findUnique({
      where: { id: job.data.deliveryId },
    });
    if (!delivery) {
      this.logger.error(`delivery ${job.data.deliveryId} missing — terminating`);
      return;
    }
    if (
      delivery.status === 'SUCCEEDED' ||
      delivery.status === 'DEAD' ||
      delivery.status === 'FAILED'
    ) {
      return;
    }

    const stream = await this.prisma.stream.findUnique({ where: { id: delivery.streamId } });
    if (!stream) {
      await this.prisma.streamDelivery.update({
        where: { id: delivery.id },
        data: { status: 'FAILED', lastError: 'stream_deleted' },
      });
      return;
    }
    if (stream.status !== 'ACTIVE') {
      await this.prisma.streamDelivery.update({
        where: { id: delivery.id },
        data: { status: 'RETRYABLE', lastError: `stream_${stream.status.toLowerCase()}` },
      });
      throw new Error(`stream not active: ${stream.status}`);
    }

    await this.prisma.streamDelivery.update({
      where: { id: delivery.id },
      data: { status: 'IN_FLIGHT', attempts: { increment: 1 } },
    });

    if (stream.sink === 'KAFKA') {
      await this.deliverKafka(
        job,
        stream,
        delivery.id,
        delivery.subject,
        delivery.eventId,
        delivery.payload,
      );
    } else {
      await this.deliverWebhook(
        job,
        stream,
        delivery.id,
        delivery.subject,
        delivery.eventId,
        delivery.payload,
        delivery.attempts,
      );
    }
  }

  private async deliverWebhook(
    job: Job<DeliveryJobPayload>,
    stream: Stream,
    deliveryId: string,
    subject: string,
    eventId: string,
    payload: unknown,
    priorAttempts: number,
  ): Promise<void> {
    const body = JSON.stringify({
      id: deliveryId,
      stream_id: stream.id,
      event_id: eventId,
      subject,
      created_at: new Date().toISOString(),
      delivery_attempt: (priorAttempts ?? 0) + 1,
      data: payload,
    });
    const signed = signPayload(stream.signingSecret, stream.signingKeyId, body);
    const correlationId = ulid();
    const start = Date.now();
    let response: Response;
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.env.DELIVERY_TIMEOUT_MS);
      try {
        response = await fetch(stream.url!, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': 'SalyChain-Datastreams/1.0',
            'x-saly-signature': signed.header,
            'x-saly-subject': subject,
            'x-saly-event-id': eventId,
            'x-saly-stream-id': stream.id,
            'x-saly-delivery-id': deliveryId,
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
      await this.prisma.streamDelivery.update({
        where: { id: deliveryId },
        data: {
          status: 'RETRYABLE',
          lastError: (err as Error).message.slice(0, 1_000),
          lastLatencyMs: latency,
          nextAttemptAt: nextRetryAt(job.attemptsMade, this.env.DELIVERY_BASE_BACKOFF_MS),
        },
      });
      await this.streams.markFailed(stream.id);
      await this.maybeDeadLetter(
        deliveryId,
        job.opts.attempts ?? this.env.MAX_DELIVERY_ATTEMPTS,
        'WEBHOOK',
      );
      throw err;
    }

    const latency = Date.now() - start;
    const excerpt = (await response.text().catch(() => '')).slice(0, 500);

    if (response.status >= 200 && response.status < 300) {
      await this.prisma.streamDelivery.update({
        where: { id: deliveryId },
        data: {
          status: 'SUCCEEDED',
          lastStatusCode: response.status,
          lastLatencyMs: latency,
          lastResponseExcerpt: excerpt,
          lastError: null,
          succeededAt: new Date(),
        },
      });
      await this.streams.markDelivered(stream.id);
      datastreamsDeliveriesTotal.inc({ sink: 'WEBHOOK', outcome: 'succeeded' });
      return;
    }

    const retryable = response.status >= 500 || response.status === 408 || response.status === 429;
    await this.prisma.streamDelivery.update({
      where: { id: deliveryId },
      data: {
        status: retryable ? 'RETRYABLE' : 'FAILED',
        lastStatusCode: response.status,
        lastLatencyMs: latency,
        lastResponseExcerpt: excerpt,
        lastError: `http_${response.status}`,
        nextAttemptAt: retryable
          ? nextRetryAt(job.attemptsMade, this.env.DELIVERY_BASE_BACKOFF_MS)
          : null,
      },
    });
    await this.streams.markFailed(stream.id);
    if (!retryable) {
      datastreamsDeliveriesTotal.inc({ sink: 'WEBHOOK', outcome: 'failed' });
      return;
    }
    await this.maybeDeadLetter(
      deliveryId,
      job.opts.attempts ?? this.env.MAX_DELIVERY_ATTEMPTS,
      'WEBHOOK',
    );
    throw new Error(`http_${response.status}`);
  }

  private async deliverKafka(
    job: Job<DeliveryJobPayload>,
    stream: Stream,
    deliveryId: string,
    subject: string,
    eventId: string,
    payload: unknown,
  ): Promise<void> {
    const start = Date.now();
    try {
      await this.kafka.produce(stream.kafkaTopic!, eventId, {
        stream_id: stream.id,
        subject,
        event_id: eventId,
        data: payload,
      });
    } catch (err) {
      const latency = Date.now() - start;
      await this.prisma.streamDelivery.update({
        where: { id: deliveryId },
        data: {
          status: 'RETRYABLE',
          lastError: (err as Error).message.slice(0, 1_000),
          lastLatencyMs: latency,
          nextAttemptAt: nextRetryAt(job.attemptsMade, this.env.DELIVERY_BASE_BACKOFF_MS),
        },
      });
      await this.streams.markFailed(stream.id);
      await this.maybeDeadLetter(
        deliveryId,
        job.opts.attempts ?? this.env.MAX_DELIVERY_ATTEMPTS,
        'KAFKA',
      );
      throw err;
    }
    await this.prisma.streamDelivery.update({
      where: { id: deliveryId },
      data: {
        status: 'SUCCEEDED',
        lastLatencyMs: Date.now() - start,
        lastError: null,
        succeededAt: new Date(),
      },
    });
    await this.streams.markDelivered(stream.id);
    datastreamsDeliveriesTotal.inc({ sink: 'KAFKA', outcome: 'succeeded' });
  }

  private async maybeDeadLetter(
    deliveryId: string,
    maxAttempts: number,
    sink: string,
  ): Promise<void> {
    const delivery = await this.prisma.streamDelivery.findUnique({ where: { id: deliveryId } });
    if (!delivery) return;
    if (delivery.attempts < maxAttempts) return;

    await this.prisma.$transaction(async (tx) => {
      await tx.streamDelivery.update({ where: { id: deliveryId }, data: { status: 'DEAD' } });
      await tx.streamDeadLetter.upsert({
        where: { deliveryId },
        update: {},
        create: {
          id: `dsdl_${ulid()}`,
          deliveryId,
          streamId: delivery.streamId,
          subject: delivery.subject,
          eventId: delivery.eventId,
          payload: delivery.payload as never,
          attempts: delivery.attempts,
          lastStatusCode: delivery.lastStatusCode,
          lastError: delivery.lastError,
        },
      });
    });
    datastreamsDeliveriesTotal.inc({ sink, outcome: 'dead' });
    this.logger.error(
      `delivery ${deliveryId} moved to dead-letter after ${delivery.attempts} attempts`,
    );
  }
}

function nextRetryAt(attemptsMade: number, baseMs: number): Date {
  const exp = Math.min(60 * 60_000, baseMs * 2 ** attemptsMade);
  const jitter = Math.floor(Math.random() * (exp / 2));
  return new Date(Date.now() + exp + jitter);
}
