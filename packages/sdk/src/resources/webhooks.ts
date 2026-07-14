import type { HttpTransport } from '../transport.js';
import type { SubscriptionStatus, WebhookSubscription, WebhookSubscriptionWithSecret } from '../types.js';

export class Webhooks {
  constructor(private readonly http: HttpTransport) {}

  async create(input: { url: string; subjects: string[]; description?: string }, options: { signal?: AbortSignal } = {}): Promise<WebhookSubscriptionWithSecret> {
    return this.http.request<WebhookSubscriptionWithSecret>({
      method: 'POST',
      path: '/v1/webhooks',
      body: input,
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }

  async list(options: { signal?: AbortSignal } = {}): Promise<{ data: WebhookSubscription[] }> {
    return this.http.request<{ data: WebhookSubscription[] }>({
      method: 'GET',
      path: '/v1/webhooks',
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }

  async get(id: string, options: { signal?: AbortSignal } = {}): Promise<WebhookSubscription> {
    return this.http.request<WebhookSubscription>({
      method: 'GET',
      path: `/v1/webhooks/${encodeURIComponent(id)}`,
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }

  async setStatus(id: string, status: SubscriptionStatus, options: { signal?: AbortSignal } = {}): Promise<WebhookSubscription> {
    return this.http.request<WebhookSubscription>({
      method: 'POST',
      path: `/v1/webhooks/${encodeURIComponent(id)}/status`,
      body: { status },
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }

  async rotateSecret(id: string, options: { signal?: AbortSignal } = {}): Promise<WebhookSubscriptionWithSecret> {
    return this.http.request<WebhookSubscriptionWithSecret>({
      method: 'POST',
      path: `/v1/webhooks/${encodeURIComponent(id)}/rotate-secret`,
      body: {},
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }

  async delete(id: string, options: { signal?: AbortSignal } = {}): Promise<void> {
    await this.http.request<void>({
      method: 'DELETE',
      path: `/v1/webhooks/${encodeURIComponent(id)}`,
      ...(options.signal ? { signal: options.signal } : {}),
    });
  }
}
