import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export interface PaymentLinkDto {
  id: string;
  org_id: string;
  slug: string;
  title: string;
  description: string | null;
  amount_minor: string;
  currency: string;
  country: string;
  actor_id: string;
  destination_account_ref: string;
  status: 'ACTIVE' | 'ARCHIVED';
  success_redirect_url: string | null;
  checkout_url: string;
  created_at: string;
  updated_at: string;
}

export interface PublicPaymentLinkDto {
  slug: string;
  title: string;
  description: string | null;
  amount_minor: string;
  currency: string;
  country: string;
  status: 'ACTIVE' | 'ARCHIVED';
  checkout_url: string;
}

export interface CheckoutSessionDto {
  id: string;
  org_id: string;
  payment_link_id: string | null;
  status: 'OPEN' | 'AWAITING_PAYMENT' | 'COMPLETED' | 'FAILED' | 'EXPIRED';
  amount_minor: string;
  currency: string;
  country: string;
  customer_name: string;
  customer_email: string | null;
  intent_id: string | null;
  execution_transaction_id: string | null;
  instruction: Record<string, unknown> | null;
  expires_at: string | null;
  completed_at: string | null;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface SettlementReportDto {
  id: string;
  org_id: string;
  period_start: string;
  period_end: string;
  currency: string | null;
  status: 'PENDING' | 'READY' | 'FAILED';
  total_settled_minor: string | null;
  transaction_count: number | null;
  lines: unknown;
  error: string | null;
  generated_at: string | null;
  created_at: string;
}

export interface SettlementCsvExport {
  report_id: string;
  content_type: string;
  filename: string;
  body: string;
}

/** Typed client for the Merchant service (payment links, checkout, settlement reports). */
export class MerchantClient {
  private readonly http: HttpClient;

  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'merchant', logger: opts.logger });
  }

  createPaymentLink(
    input: {
      actor_id: string;
      destination_account_ref: string;
      title: string;
      description?: string;
      amount_minor: string;
      currency: string;
      country: string;
      success_redirect_url?: string;
    },
    options?: RequestOptions,
  ): Promise<PaymentLinkDto> {
    return this.http.post('/v1/payment-links', input, options);
  }

  listPaymentLinks(
    query: { status?: 'ACTIVE' | 'ARCHIVED'; limit?: number } = {},
    options?: RequestOptions,
  ): Promise<{ data: PaymentLinkDto[] }> {
    return this.http.get('/v1/payment-links', { ...options, query });
  }

  getPaymentLink(id: string, options?: RequestOptions): Promise<PaymentLinkDto> {
    return this.http.get(`/v1/payment-links/${encodeURIComponent(id)}`, options);
  }

  archivePaymentLink(id: string, reason?: string, options?: RequestOptions): Promise<PaymentLinkDto> {
    return this.http.patch(
      `/v1/payment-links/${encodeURIComponent(id)}/archive`,
      reason ? { reason } : {},
      options,
    );
  }

  getPublicPaymentLink(slug: string, options?: RequestOptions): Promise<PublicPaymentLinkDto> {
    return this.http.get(`/v1/public/payment-links/${encodeURIComponent(slug)}`, options);
  }

  openCheckoutFromLink(
    slug: string,
    input: { customer_name: string; customer_email?: string; idempotency_key?: string },
    options?: RequestOptions,
  ): Promise<CheckoutSessionDto> {
    return this.http.post(`/v1/public/checkout/${encodeURIComponent(slug)}/sessions`, input, options);
  }

  openCheckoutSession(
    input: {
      actor_id: string;
      destination_account_ref: string;
      amount_minor: string;
      currency: string;
      country: string;
      customer_name: string;
      customer_email?: string;
      memo?: string;
      idempotency_key?: string;
    },
    options?: RequestOptions,
  ): Promise<CheckoutSessionDto> {
    return this.http.post('/v1/checkout/sessions', input, options);
  }

  getCheckoutSession(id: string, options?: RequestOptions): Promise<CheckoutSessionDto> {
    return this.http.get(`/v1/checkout/sessions/${encodeURIComponent(id)}`, options);
  }

  getPublicCheckoutSession(id: string, options?: RequestOptions): Promise<CheckoutSessionDto> {
    return this.http.get(`/v1/public/checkout/sessions/${encodeURIComponent(id)}`, options);
  }

  listCheckoutSessions(
    query: { limit?: number } = {},
    options?: RequestOptions,
  ): Promise<{ data: CheckoutSessionDto[] }> {
    return this.http.get('/v1/checkout/sessions', { ...options, query });
  }

  generateSettlementReport(
    input: { period_start: string; period_end: string; currency?: string },
    options?: RequestOptions,
  ): Promise<SettlementReportDto> {
    return this.http.post('/v1/settlement-reports', input, options);
  }

  listSettlementReports(
    query: { limit?: number } = {},
    options?: RequestOptions,
  ): Promise<{ data: SettlementReportDto[] }> {
    return this.http.get('/v1/settlement-reports', { ...options, query });
  }

  getSettlementReport(id: string, options?: RequestOptions): Promise<SettlementReportDto> {
    return this.http.get(`/v1/settlement-reports/${encodeURIComponent(id)}`, options);
  }

  exportSettlementReportCsv(id: string, options?: RequestOptions): Promise<SettlementCsvExport> {
    return this.http.get(`/v1/settlement-reports/${encodeURIComponent(id)}/export`, options);
  }
}
