import {
  connect,
  AckPolicy,
  DeliverPolicy,
  RetentionPolicy,
  StorageType,
  type JetStreamClient,
  type JetStreamManager,
  type NatsConnection,
  type StreamConfig,
  type ConsumerConfig,
  type Subscription,
} from 'nats';
import { ulid } from 'ulid';
import { ExternalError } from '@salychain/errors';
import type { Logger } from '@salychain/logger';
import {
  EVENT_SCHEMA_VERSION,
  STREAMS,
  SUBJECT_SCHEMAS,
  type EventBySubject,
  type Subject,
} from './schemas.js';

export interface EventBusOptions {
  servers: string | string[];
  serviceName: string;
  logger?: Logger;
}

export interface PublishOptions {
  correlationId?: string;
  traceId?: string;
  /** Caller-supplied event id; defaults to a fresh ULID. */
  eventId?: string;
}

/**
 * Build and validate the canonical event envelope WITHOUT sending it.
 *
 * This is the building block for the transactional outbox: a producer can
 * construct the exact bytes it intends to publish, persist them in its own DB
 * transaction, and later hand them to `EventBus.publishEnvelope` for at-least-
 * once delivery. The `event_id` doubles as the JetStream `msgID`, so replays
 * from the outbox are de-duplicated by the broker.
 */
export function buildEventEnvelope<S extends Subject>(
  subject: S,
  payload: Omit<EventBySubject[S], 'schema_version' | 'event_id' | 'occurred_at'>,
  options: PublishOptions = {},
): EventBySubject[S] {
  const envelope = {
    schema_version: EVENT_SCHEMA_VERSION,
    event_id: options.eventId ?? ulid(),
    occurred_at: new Date().toISOString(),
    correlation_id: options.correlationId,
    trace_id: options.traceId,
    ...payload,
  } as EventBySubject[S];

  const schema = SUBJECT_SCHEMAS[subject];
  const parsed = schema.safeParse(envelope);
  if (!parsed.success) {
    throw ExternalError(
      'events.invalid_payload',
      `Invalid event payload for ${subject}: ${parsed.error.message}`,
    );
  }
  return parsed.data as EventBySubject[S];
}

/**
 * EventBus is the only sanctioned way to read or write domain events.
 *
 *  - Streams are declared in `schemas.ts` and reconciled on `start()`.
 *  - Every publish wraps the payload in the canonical envelope and validates
 *    it against the per-subject Zod schema before sending.
 *  - Subscribers receive Zod-validated payloads and an ack/nack handle.
 *  - Consumers are durable per service+subject; messages are at-least-once
 *    and handlers must be idempotent.
 */
export class EventBus {
  private nc: NatsConnection | undefined;
  private js: JetStreamClient | undefined;
  private jsm: JetStreamManager | undefined;
  private readonly logger: Logger | undefined;
  private readonly servers: string | string[];
  private readonly serviceName: string;
  private readonly subscriptions: Subscription[] = [];

  constructor(opts: EventBusOptions) {
    this.servers = opts.servers;
    this.serviceName = opts.serviceName;
    this.logger = opts.logger;
  }

  async start(): Promise<void> {
    if (this.nc) return;
    try {
      this.nc = await connect({ servers: this.servers, name: this.serviceName, maxReconnectAttempts: -1 });
    } catch (err) {
      throw ExternalError('events.nats_connect_failed', 'Failed to connect to NATS', { cause: err });
    }
    this.js = this.nc.jetstream();
    this.jsm = await this.nc.jetstreamManager();

    for (const stream of STREAMS) {
      await this.ensureStream({
        name: stream.name,
        subjects: [...stream.subjects],
        retention: RetentionPolicy.Limits,
        storage: StorageType.File,
        max_age: stream.maxAgeSeconds * 1_000_000_000,
        max_bytes: stream.maxBytes,
      });
    }

    this.logger?.info(`EventBus connected (service=${this.serviceName})`);
  }

  async stop(): Promise<void> {
    for (const sub of this.subscriptions) sub.unsubscribe();
    if (this.nc) await this.nc.drain();
    this.nc = undefined;
    this.js = undefined;
    this.jsm = undefined;
  }

  async publish<S extends Subject>(
    subject: S,
    payload: Omit<EventBySubject[S], 'schema_version' | 'event_id' | 'occurred_at'>,
    options: PublishOptions = {},
  ): Promise<void> {
    if (!this.js) throw ExternalError('events.not_started', 'EventBus.publish called before start()');
    const envelope = buildEventEnvelope(subject, payload, options);
    await this.publishEnvelope(subject, envelope);
  }

  /**
   * Publish a pre-built, already-validated envelope (see `buildEventEnvelope`).
   * Used by the outbox relay to re-emit persisted events. Validation runs again
   * defensively; the stored `event_id` is the JetStream `msgID` for dedup.
   */
  async publishEnvelope<S extends Subject>(
    subject: S,
    envelope: EventBySubject[S],
  ): Promise<void> {
    if (!this.js) throw ExternalError('events.not_started', 'EventBus.publishEnvelope called before start()');

    const schema = SUBJECT_SCHEMAS[subject];
    const parsed = schema.safeParse(envelope);
    if (!parsed.success) {
      throw ExternalError('events.invalid_payload', `Invalid event payload for ${subject}: ${parsed.error.message}`);
    }

    const eventId = (envelope as { event_id: string }).event_id;
    const bytes = Buffer.from(JSON.stringify(parsed.data));
    await this.js.publish(subject, bytes, { msgID: eventId });
    this.logger?.debug?.(`published ${subject}`, { event_id: eventId });
  }

  /**
   * Subscribe with a durable consumer. The handler MUST be idempotent because
   * delivery is at-least-once. Return value of the handler controls ack/nack:
   *   `ack`   → ack
   *   `nack`  → nack with default backoff
   *   `term`  → terminate (poison message); never re-delivered
   */
  async subscribe<S extends Subject>(
    subject: S,
    durableName: string,
    handler: (
      event: EventBySubject[S],
      ctx: { redeliveries: number; subject: string },
    ) => Promise<'ack' | 'nack' | 'term'>,
  ): Promise<void> {
    if (!this.js || !this.jsm)
      throw ExternalError('events.not_started', 'EventBus.subscribe called before start()');

    const stream = STREAMS.find((s) => s.subjects.some((p) => matchSubject(p, subject)));
    if (!stream) throw ExternalError('events.no_stream', `No stream covers subject ${subject}`);

    const consumerConfig: Partial<ConsumerConfig> = {
      durable_name: durableName,
      ack_policy: AckPolicy.Explicit,
      deliver_policy: DeliverPolicy.All,
      filter_subject: subject,
      ack_wait: 30 * 1_000_000_000,
      max_deliver: 8,
    };
    await this.jsm.consumers.add(stream.name, consumerConfig);

    const consumer = await this.js.consumers.get(stream.name, durableName);
    const messages = await consumer.consume();
    void (async () => {
      const schema = SUBJECT_SCHEMAS[subject];
      for await (const msg of messages) {
        let parsed: ReturnType<typeof schema.safeParse>;
        try {
          parsed = schema.safeParse(JSON.parse(Buffer.from(msg.data).toString('utf-8')));
        } catch (err) {
          this.logger?.error?.(`Bad JSON on ${subject}, terminating`, { err: (err as Error).message });
          msg.term();
          continue;
        }
        if (!parsed.success) {
          this.logger?.error?.(`Schema violation on ${subject}, terminating`, { issues: parsed.error.message });
          msg.term();
          continue;
        }
        try {
          const result = await handler(parsed.data as EventBySubject[S], {
            redeliveries: Number(msg.info.redeliveryCount ?? 0),
            subject: msg.subject,
          });
          if (result === 'ack') msg.ack();
          else if (result === 'term') msg.term();
          else msg.nak();
        } catch (err) {
          this.logger?.error?.(`Handler threw on ${subject}, nack`, { err: (err as Error).message });
          msg.nak();
        }
      }
    })();
  }

  private async ensureStream(config: Partial<StreamConfig> & { name: string; subjects: string[] }): Promise<void> {
    if (!this.jsm) return;
    try {
      await this.jsm.streams.info(config.name);
      await this.jsm.streams.update(config.name, config);
      this.logger?.debug?.(`stream ${config.name} updated`);
    } catch {
      await this.jsm.streams.add(config);
      this.logger?.info?.(`stream ${config.name} created`);
    }
  }
}

function matchSubject(pattern: string, subject: string): boolean {
  // NATS supports `*` (one token) and `>` (greedy tail).
  const p = pattern.split('.');
  const s = subject.split('.');
  for (let i = 0; i < p.length; i++) {
    if (p[i] === '>') return true;
    if (p[i] === '*') {
      if (s[i] === undefined) return false;
      continue;
    }
    if (p[i] !== s[i]) return false;
  }
  return p.length === s.length;
}
