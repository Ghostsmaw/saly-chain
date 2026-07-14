import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';
import type { Intent } from '@salychain/intent-schema';

export type IntentState = 'RECEIVED' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'FAILED';

export interface IntentRecordDto {
  intent_id: string;
  actor_ref: string;
  channel: string;
  kind: string;
  state: IntentState;
  execution_transaction_id?: string;
  rejection?: { code: string; message: string };
  payload: unknown;
  created_at: string;
  updated_at: string;
}

export class IntentClient {
  private readonly http: HttpClient;
  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'intent', logger: opts.logger });
  }

  /** Submit a canonical intent. Idempotency is keyed by header (Idempotency-Key). */
  submit(input: { idempotencyKey: string; intent: Intent }, options?: RequestOptions): Promise<{
    intent_id: string;
    state: IntentState;
    execution_transaction_id?: string;
    rejection?: { code: string; message: string };
  }> {
    return this.http.post(
      '/v1/intents',
      { intent: input.intent },
      {
        ...options,
        idempotencyKey: input.idempotencyKey,
        headers: { ...(options?.headers ?? {}), 'Idempotency-Key': input.idempotencyKey },
      },
    );
  }

  getById(intentId: string, options?: RequestOptions): Promise<IntentRecordDto> {
    return this.http.get(`/v1/intents/${encodeURIComponent(intentId)}`, options);
  }

  list(query: { state?: IntentState; limit?: number } = {}, options?: RequestOptions): Promise<{ data: IntentRecordDto[] }> {
    return this.http.get('/v1/intents', { ...options, query });
  }
}
