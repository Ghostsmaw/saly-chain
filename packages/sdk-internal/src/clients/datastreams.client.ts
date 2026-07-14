import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export type StreamStatus = 'ACTIVE' | 'PAUSED' | 'DISABLED';
export type StreamSink = 'WEBHOOK' | 'KAFKA' | 'WEBSOCKET';
export type StreamDeliveryStatus =
  | 'PENDING'
  | 'IN_FLIGHT'
  | 'SUCCEEDED'
  | 'RETRYABLE'
  | 'FAILED'
  | 'DEAD';

/** Declarative predicate attached to a stream (see the datastreams service). */
export interface StreamFilter {
  subjects?: string[];
  chains?: string[];
  rails?: string[];
  assets?: string[];
  addresses?: string[];
  direction?: 'from' | 'to' | 'either';
  minAmountMinor?: string;
  maxAmountMinor?: string;
  kinds?: string[];
  agentIds?: string[];
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
  /** Returned once at creation / rotation (webhook sink only). */
  signing_secret: string;
}

export interface StreamDeliveryDto {
  id: string;
  streamId: string;
  subject: string;
  eventId: string;
  attempts: number;
  status: StreamDeliveryStatus;
  lastStatusCode: number | null;
  lastLatencyMs: number | null;
  lastError: string | null;
  succeededAt: string | null;
  createdAt: string;
}

export interface CreateStreamInput {
  orgId: string;
  name: string;
  sink: StreamSink;
  filter?: StreamFilter;
  description?: string;
  url?: string;
  kafkaTopic?: string;
}

/** Typed client for the Saly Datastreams service (filtered realtime push). */
export class DatastreamsClient {
  private readonly http: HttpClient;
  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({
      baseUrl: opts.baseUrl,
      serviceName: 'analytics-datastreams',
      logger: opts.logger,
    });
  }

  create(input: CreateStreamInput, options?: RequestOptions): Promise<IssuedStream> {
    return this.http.post(
      '/v1/streams',
      {
        org_id: input.orgId,
        name: input.name,
        sink: input.sink,
        filter: input.filter ?? {},
        url: input.url,
        kafka_topic: input.kafkaTopic,
        description: input.description,
      },
      options,
    );
  }

  list(orgId: string, options?: RequestOptions): Promise<{ data: PublicStream[] }> {
    return this.http.get('/v1/streams', { ...options, query: { org_id: orgId } });
  }

  getById(id: string, options?: RequestOptions): Promise<PublicStream> {
    return this.http.get(`/v1/streams/${encodeURIComponent(id)}`, options);
  }

  setStatus(id: string, status: StreamStatus, options?: RequestOptions): Promise<PublicStream> {
    return this.http.post(`/v1/streams/${encodeURIComponent(id)}/status`, { status }, options);
  }

  rotateSecret(id: string, options?: RequestOptions): Promise<IssuedStream> {
    return this.http.post(`/v1/streams/${encodeURIComponent(id)}/rotate-secret`, {}, options);
  }

  delete(id: string, options?: RequestOptions): Promise<void> {
    return this.http.delete(`/v1/streams/${encodeURIComponent(id)}`, options);
  }

  listDeliveries(
    streamId: string,
    query: { status?: StreamDeliveryStatus; limit?: number } = {},
    options?: RequestOptions,
  ): Promise<{ data: StreamDeliveryDto[] }> {
    return this.http.get(`/v1/streams/${encodeURIComponent(streamId)}/deliveries`, {
      ...options,
      query,
    });
  }

  listDeadLetters(
    streamId: string,
    query: { limit?: number } = {},
    options?: RequestOptions,
  ): Promise<{ data: Array<Record<string, unknown>> }> {
    return this.http.get(`/v1/streams/${encodeURIComponent(streamId)}/dead-letters`, {
      ...options,
      query,
    });
  }

  getDelivery(id: string, options?: RequestOptions): Promise<StreamDeliveryDto> {
    return this.http.get(`/v1/deliveries/${encodeURIComponent(id)}`, options);
  }

  replayDelivery(
    id: string,
    options?: RequestOptions,
  ): Promise<{ delivery_id: string; status: StreamDeliveryStatus }> {
    return this.http.post(`/v1/deliveries/${encodeURIComponent(id)}/replay`, {}, options);
  }
}
