import type { HttpTransport } from '../transport.js';
import type { Page, Transaction, TransactionState } from '../types.js';

export class Transactions {
  constructor(private readonly http: HttpTransport) {}

  async get(id: string, options: { signal?: AbortSignal } = {}): Promise<Transaction> {
    return this.http.request<Transaction>({
      method: 'GET',
      path: `/v1/transactions/${encodeURIComponent(id)}`,
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }

  async list(
    query: { limit?: number; cursor?: string; state?: TransactionState } = {},
    options: { signal?: AbortSignal } = {},
  ): Promise<Page<Transaction>> {
    return this.http.request<Page<Transaction>>({
      method: 'GET',
      path: '/v1/transactions',
      query: { limit: query.limit, cursor: query.cursor, state: query.state },
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }
}
