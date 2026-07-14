import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'DISABLED';
export type DeliveryStatus = 'PENDING' | 'IN_FLIGHT' | 'SUCCEEDED' | 'RETRYABLE' | 'FAILED' | 'DEAD';

export interface PublicSubscription {
  id: string;
  org_id: string;
  url: string;
  description?: string;
  subjects: string[];
  status: SubscriptionStatus;
  signing_key_id: string;
  consecutive_failures: number;
  disabled_at?: string;
  last_succeeded_at?: string;
  last_attempted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface IssuedSubscription {
  subscription: PublicSubscription;
  signing_secret: string;
}

export interface DeliveryDto {
  id: string;
  subscriptionId: string;
  subject: string;
  eventId: string;
  attempts: number;
  status: DeliveryStatus;
  lastStatusCode: number | null;
  lastLatencyMs: number | null;
  lastError: string | null;
  succeededAt: string | null;
  createdAt: string;
}

export class WebhooksClient {
  private readonly http: HttpClient;
  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'webhooks', logger: opts.logger });
  }

  create(input: { orgId: string; url: string; subjects: string[]; description?: string }, options?: RequestOptions): Promise<IssuedSubscription> {
    return this.http.post('/v1/subscriptions', {
      org_id: input.orgId,
      url: input.url,
      subjects: input.subjects,
      description: input.description,
    }, options);
  }

  list(orgId: string, options?: RequestOptions): Promise<{ data: PublicSubscription[] }> {
    return this.http.get('/v1/subscriptions', { ...options, query: { org_id: orgId } });
  }

  getById(id: string, options?: RequestOptions): Promise<PublicSubscription> {
    return this.http.get(`/v1/subscriptions/${encodeURIComponent(id)}`, options);
  }

  setStatus(id: string, status: SubscriptionStatus, options?: RequestOptions): Promise<PublicSubscription> {
    return this.http.post(`/v1/subscriptions/${encodeURIComponent(id)}/status`, { status }, options);
  }

  rotateSecret(id: string, options?: RequestOptions): Promise<IssuedSubscription> {
    return this.http.post(`/v1/subscriptions/${encodeURIComponent(id)}/rotate-secret`, {}, options);
  }

  delete(id: string, options?: RequestOptions): Promise<void> {
    return this.http.delete(`/v1/subscriptions/${encodeURIComponent(id)}`, options);
  }

  listDeliveries(subscriptionId: string, query: { status?: DeliveryStatus; limit?: number } = {}, options?: RequestOptions): Promise<{ data: DeliveryDto[] }> {
    return this.http.get(`/v1/subscriptions/${encodeURIComponent(subscriptionId)}/deliveries`, { ...options, query });
  }

  getDelivery(id: string, options?: RequestOptions): Promise<DeliveryDto> {
    return this.http.get(`/v1/deliveries/${encodeURIComponent(id)}`, options);
  }

  replayDelivery(id: string, options?: RequestOptions): Promise<{ delivery_id: string; status: DeliveryStatus }> {
    return this.http.post(`/v1/deliveries/${encodeURIComponent(id)}/replay`, {}, options);
  }
}
