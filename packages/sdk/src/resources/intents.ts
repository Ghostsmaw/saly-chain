import type { Intent } from '@salychain/intent-schema';
import type { HttpTransport } from '../transport.js';
import type { IntentRecord, IntentState, IntentSubmissionResult } from '../types.js';

export class Intents {
  constructor(private readonly http: HttpTransport) {}

  /**
   * Submit a canonical Intent. Returns the assigned lifecycle state immediately;
   * the transaction id (when known) is on the response and you can subscribe
   * to webhooks for further state changes.
   *
   * The Idempotency-Key is required by the gateway. If you don't supply one,
   * the SDK auto-generates a random key — but for at-least-once safety in
   * your own retry loop, *always* derive a stable key from your own intent id.
   */
  async submit(
    intent: Intent,
    options: { idempotencyKey?: string; signal?: AbortSignal } = {},
  ): Promise<IntentSubmissionResult> {
    return this.http.request<IntentSubmissionResult>({
      method: 'POST',
      path: '/v1/intents',
      body: { intent },
      ...(options.idempotencyKey ? { idempotencyKey: options.idempotencyKey } : {}),
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }

  async get(intentId: string, options: { signal?: AbortSignal } = {}): Promise<IntentRecord> {
    return this.http.request<IntentRecord>({
      method: 'GET',
      path: `/v1/intents/${encodeURIComponent(intentId)}`,
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }

  async list(
    query: { limit?: number; state?: IntentState } = {},
    options: { signal?: AbortSignal } = {},
  ): Promise<{ data: IntentRecord[] }> {
    return this.http.request<{ data: IntentRecord[] }>({
      method: 'GET',
      path: '/v1/intents',
      query: { limit: query.limit, state: query.state },
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }
}
