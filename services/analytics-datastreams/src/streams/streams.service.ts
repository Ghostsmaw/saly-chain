import { timingSafeEqual } from 'node:crypto';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ulid } from 'ulid';
import { ConflictError, NotFoundError, ValidationError } from '@salychain/errors';
import { datastreamsActiveStreams } from '@salychain/observability';
import { Stream, StreamSink, StreamStatus } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { DATASTREAMS_ENV, type DatastreamsEnv } from '../config/env.js';
import { generateSigningSecret } from '../delivery/signing.js';
import { CompiledFilter, parseStreamFilter, type StreamFilter } from '../filters/filter.js';
import { KafkaSink } from '../sinks/kafka.sink.js';

export interface CreateStreamInput {
  orgId: string;
  name: string;
  description?: string;
  sink: StreamSink;
  filter: unknown;
  /** Required when sink = WEBHOOK. */
  url?: string;
  /** Required when sink = KAFKA. */
  kafkaTopic?: string;
}

export interface PublicStream {
  id: string;
  org_id: string;
  name: string;
  description?: string;
  status: StreamStatus;
  sink: StreamSink;
  filter: StreamFilter;
  url?: string;
  kafka_topic?: string;
  signing_key_id: string;
  consecutive_failures: number;
  matched_total: string;
  disabled_at?: string;
  last_matched_at?: string;
  last_delivered_at?: string;
  last_attempted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface IssuedStream {
  stream: PublicStream;
  /** Shown to the caller once on creation / rotation (webhook sink only). */
  signing_secret: string;
}

/** Compiled, ready-to-match view of an active stream used on the hot path. */
export interface ActiveStream {
  id: string;
  orgId: string;
  sink: StreamSink;
  compiled: CompiledFilter;
}

@Injectable()
export class StreamsService implements OnModuleInit {
  private readonly logger = new Logger(StreamsService.name);

  // Hot-path cache of compiled active streams. Refreshed on a TTL and eagerly
  // invalidated on any mutation so a newly-created stream starts matching fast.
  private cache: ActiveStream[] = [];
  private cacheExpiresAt = 0;
  private readonly cacheTtlMs = 5_000;

  constructor(
    private readonly prisma: PrismaService,
    @Inject(DATASTREAMS_ENV) private readonly env: DatastreamsEnv,
    private readonly kafka: KafkaSink,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.refreshCache();
  }

  async create(input: CreateStreamInput): Promise<IssuedStream> {
    if (!input.name || input.name.length > 120) {
      throw ValidationError('datastreams.name.invalid', 'Stream name must be 1–120 characters');
    }
    const filter = parseStreamFilter(input.filter);

    if (input.sink === 'WEBHOOK') {
      if (!input.url || !/^https?:\/\//.test(input.url)) {
        throw ValidationError('datastreams.url.invalid', 'Webhook streams require an http(s) url');
      }
    } else if (input.sink === 'KAFKA') {
      if (!input.kafkaTopic) {
        throw ValidationError(
          'datastreams.kafka.topic_required',
          'Kafka streams require a kafkaTopic',
        );
      }
      this.kafka.assertTopicAllowed(input.kafkaTopic);
    }
    // WEBSOCKET needs no endpoint config: clients dial in and authenticate with
    // the per-stream signing secret returned below (the connection token).

    const id = `dstr_${ulid()}`;
    const { secretHex, keyId } = generateSigningSecret(this.env.SIGNING_SECRET_BYTES);
    const created = await this.prisma.stream.create({
      data: {
        id,
        orgId: input.orgId,
        name: input.name,
        description: input.description ?? null,
        sink: input.sink,
        filter: filter as object,
        url: input.sink === 'WEBHOOK' ? input.url! : null,
        kafkaTopic: input.sink === 'KAFKA' ? input.kafkaTopic! : null,
        signingSecret: secretHex,
        signingKeyId: keyId,
      },
    });
    this.invalidate();
    this.logger.log(`stream created id=${id} org=${input.orgId} sink=${input.sink}`);
    return { stream: toPublic(created), signing_secret: secretHex };
  }

  async list(orgId: string): Promise<PublicStream[]> {
    const rows = await this.prisma.stream.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(toPublic);
  }

  async getById(id: string): Promise<PublicStream> {
    return toPublic(await this.requireById(id));
  }

  /**
   * Authorize a WebSocket connection: the stream must exist, be ACTIVE, use the
   * WEBSOCKET sink, and the presented secret must match the signing secret
   * (timing-safe). Returns the org id on success so the gateway can scope logs.
   */
  async authorizeWebsocket(id: string, presentedSecret: string): Promise<{ orgId: string } | null> {
    const stream = await this.prisma.stream.findUnique({ where: { id } });
    if (!stream || stream.status !== 'ACTIVE' || stream.sink !== 'WEBSOCKET') return null;
    if (!secretMatches(stream.signingSecret, presentedSecret)) return null;
    return { orgId: stream.orgId };
  }

  async setStatus(id: string, status: StreamStatus): Promise<PublicStream> {
    await this.requireById(id);
    const updated = await this.prisma.stream.update({
      where: { id },
      data: {
        status,
        disabledAt: status === 'DISABLED' ? new Date() : null,
        consecutiveFailures: status === 'ACTIVE' ? 0 : undefined,
      },
    });
    this.invalidate();
    this.logger.warn(`stream ${id} → ${status}`);
    return toPublic(updated);
  }

  async rotateSecret(id: string): Promise<IssuedStream> {
    const existing = await this.requireById(id);
    if (existing.sink !== 'WEBHOOK') {
      throw ConflictError(
        'datastreams.rotate.not_webhook',
        'Only webhook streams have a signing secret',
      );
    }
    const { secretHex, keyId } = generateSigningSecret(this.env.SIGNING_SECRET_BYTES);
    const updated = await this.prisma.stream.update({
      where: { id },
      data: { signingSecret: secretHex, signingKeyId: keyId },
    });
    this.logger.warn(`stream ${id} secret rotated, new kid=${keyId}`);
    return { stream: toPublic(updated), signing_secret: secretHex };
  }

  async delete(id: string): Promise<void> {
    await this.requireById(id);
    await this.prisma.stream.delete({ where: { id } });
    this.invalidate();
    this.logger.warn(`stream ${id} deleted`);
  }

  /** Compiled active streams for the consumer hot path (TTL-cached). */
  async listActiveCompiled(): Promise<ActiveStream[]> {
    if (Date.now() >= this.cacheExpiresAt) await this.refreshCache();
    return this.cache;
  }

  async recordMatch(id: string): Promise<void> {
    await this.prisma.stream.update({
      where: { id },
      data: { matchedTotal: { increment: 1 }, lastMatchedAt: new Date() },
    });
  }

  async markDelivered(id: string): Promise<void> {
    await this.prisma.stream.update({
      where: { id },
      data: { lastDeliveredAt: new Date(), lastAttemptedAt: new Date(), consecutiveFailures: 0 },
    });
  }

  /**
   * Record a delivery failure. Crossing the consecutive-failure threshold
   * auto-disables the stream so we stop hammering a broken sink.
   */
  async markFailed(id: string): Promise<{ disabled: boolean }> {
    const updated = await this.prisma.stream.update({
      where: { id },
      data: { lastAttemptedAt: new Date(), consecutiveFailures: { increment: 1 } },
    });
    if (
      updated.consecutiveFailures >= this.env.AUTO_DISABLE_THRESHOLD &&
      updated.status === 'ACTIVE'
    ) {
      await this.prisma.stream.update({
        where: { id },
        data: { status: 'DISABLED', disabledAt: new Date() },
      });
      this.invalidate();
      this.logger.error(
        `stream ${id} auto-disabled after ${updated.consecutiveFailures} consecutive failures`,
      );
      return { disabled: true };
    }
    return { disabled: false };
  }

  private async refreshCache(): Promise<void> {
    const rows = await this.prisma.stream.findMany({ where: { status: 'ACTIVE' } });
    this.cache = rows.map((s) => ({
      id: s.id,
      orgId: s.orgId,
      sink: s.sink,
      compiled: new CompiledFilter(parseStreamFilter(s.filter)),
    }));
    this.cacheExpiresAt = Date.now() + this.cacheTtlMs;
    datastreamsActiveStreams.set(this.cache.length);
  }

  private invalidate(): void {
    this.cacheExpiresAt = 0;
  }

  private async requireById(id: string): Promise<Stream> {
    const s = await this.prisma.stream.findUnique({ where: { id } });
    if (!s) throw NotFoundError('datastreams.stream.not_found', `Stream ${id} not found`);
    return s;
  }
}

/** Constant-time comparison that never throws on length mismatch. */
function secretMatches(expectedHex: string, presented: string): boolean {
  if (typeof presented !== 'string' || presented.length === 0) return false;
  const a = Buffer.from(expectedHex);
  const b = Buffer.from(presented);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function toPublic(s: Stream): PublicStream {
  return {
    id: s.id,
    org_id: s.orgId,
    name: s.name,
    ...(s.description ? { description: s.description } : {}),
    status: s.status,
    sink: s.sink,
    filter: parseStreamFilter(s.filter),
    ...(s.url ? { url: s.url } : {}),
    ...(s.kafkaTopic ? { kafka_topic: s.kafkaTopic } : {}),
    signing_key_id: s.signingKeyId,
    consecutive_failures: s.consecutiveFailures,
    matched_total: s.matchedTotal.toString(),
    ...(s.disabledAt ? { disabled_at: s.disabledAt.toISOString() } : {}),
    ...(s.lastMatchedAt ? { last_matched_at: s.lastMatchedAt.toISOString() } : {}),
    ...(s.lastDeliveredAt ? { last_delivered_at: s.lastDeliveredAt.toISOString() } : {}),
    ...(s.lastAttemptedAt ? { last_attempted_at: s.lastAttemptedAt.toISOString() } : {}),
    created_at: s.createdAt.toISOString(),
    updated_at: s.updatedAt.toISOString(),
  };
}
