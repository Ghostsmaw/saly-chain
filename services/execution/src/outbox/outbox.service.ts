import { Injectable } from '@nestjs/common';
import {
  buildEventEnvelope,
  type OutboxRecord,
  type OutboxStore,
  type Subject,
} from '@salychain/events';
import { Prisma } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';

/** A Prisma client bound to an open transaction (from `$transaction`). */
export type OutboxTxClient = Prisma.TransactionClient;

export interface EnqueueOptions {
  readonly correlationId?: string;
  readonly traceId?: string;
}

/**
 * The execution service's transactional-outbox store.
 *
 * `enqueueTx` writes an event row using a caller-supplied transaction client so
 * the event commits atomically with the state change. `enqueue` uses the base
 * connection for events that aren't bound to a single state-machine step. Both
 * persist the fully-validated envelope; the relay (see OutboxRelayService)
 * drains rows to NATS.
 */
@Injectable()
export class OutboxService implements OutboxStore {
  constructor(private readonly prisma: PrismaService) {}

  private toRow(
    subject: Subject,
    payload: Record<string, unknown>,
    options?: EnqueueOptions,
  ): Prisma.EventOutboxCreateInput {
    const envelope = buildEventEnvelope(subject, payload as never, options ?? {});
    return {
      eventId: (envelope as { event_id: string }).event_id,
      subject,
      payload: envelope as unknown as Prisma.InputJsonValue,
    };
  }

  /** Enqueue atomically inside a caller's transaction. */
  async enqueueTx(
    tx: OutboxTxClient,
    subject: Subject,
    payload: Record<string, unknown>,
    options?: EnqueueOptions,
  ): Promise<void> {
    await tx.eventOutbox.create({ data: this.toRow(subject, payload, options) });
  }

  /** Enqueue on the base connection (reliable, near-atomic). */
  async enqueue(
    subject: Subject,
    payload: Record<string, unknown>,
    options?: EnqueueOptions,
  ): Promise<void> {
    await this.prisma.eventOutbox.create({ data: this.toRow(subject, payload, options) });
  }

  // ───────────────────────── OutboxStore (relay-facing) ─────────────────────────

  async fetchPending(limit: number): Promise<OutboxRecord[]> {
    const rows = await this.prisma.eventOutbox.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });
    return rows.map((r) => ({
      id: r.id,
      subject: r.subject,
      payload: r.payload,
      attempts: r.attempts,
    }));
  }

  async markPublished(id: string): Promise<void> {
    await this.prisma.eventOutbox.update({
      where: { id },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
    });
  }

  async markFailed(id: string, error: string, attempts: number, dead: boolean): Promise<void> {
    await this.prisma.eventOutbox.update({
      where: { id },
      data: { status: dead ? 'FAILED' : 'PENDING', attempts, lastError: error.slice(0, 1000) },
    });
  }
}
