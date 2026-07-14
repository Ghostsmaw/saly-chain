import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export interface QuoteRequest {
  intentId?: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmountMinor: string;
}

export interface QuoteResponse {
  quote_id: string;
  from_currency: string;
  to_currency: string;
  from_amount_minor: string;
  to_amount_minor: string;
  quoted_rate_1e8: string;
  mid_rate_1e8: string;
  spread_bps: number;
  provider: string;
  signature: string;
  expires_at: string;
}

export interface FxQuotePreviewResponse {
  preview: true;
  from_currency: string;
  to_currency: string;
  from_amount_minor: string;
  to_amount_minor: string;
  quoted_rate_1e8: string;
  mid_rate_1e8: string;
  spread_bps: number;
  provider: string;
  expires_at: string;
}

export interface DexQuoteResponse extends QuoteResponse {
  quote_type: 'DEX';
  dex: {
    router: string;
    calldata: string;
    token_in: string;
    token_out: string;
    amount_in: string;
    min_amount_out: string;
    expected_out: string;
    recipient: string;
    pool_address?: string;
    pool_liquidity?: string;
    quote_source: 'onchain' | 'stub';
  };
}

export class LiquidityClient {
  private readonly http: HttpClient;
  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'liquidity', logger: opts.logger });
  }

  quote(input: QuoteRequest, options?: RequestOptions): Promise<QuoteResponse> {
    return this.http.post(
      '/v1/quotes',
      {
        intent_id: input.intentId,
        from_currency: input.fromCurrency,
        to_currency: input.toCurrency,
        from_amount_minor: Number(input.fromAmountMinor),
      },
      options,
    );
  }

  previewQuote(input: QuoteRequest, options?: RequestOptions): Promise<FxQuotePreviewResponse> {
    return this.http.post(
      '/v1/quotes/preview',
      {
        from_currency: input.fromCurrency,
        to_currency: input.toCurrency,
        from_amount_minor: Number(input.fromAmountMinor),
      },
      options,
    );
  }

  quoteDex(
    input: {
      intentId?: string;
      fromCurrency: string;
      toCurrency: string;
      fromAmountMinor: string;
      recipient: string;
      slippageBps?: number;
    },
    options?: RequestOptions,
  ): Promise<DexQuoteResponse> {
    return this.http.post(
      '/v1/quotes/dex',
      {
        intent_id: input.intentId,
        from_currency: input.fromCurrency,
        to_currency: input.toCurrency,
        from_amount_minor: Number(input.fromAmountMinor),
        recipient: input.recipient,
        slippage_bps: input.slippageBps,
      },
      options,
    );
  }

  getDexPoolReadiness(
    input: { fromCurrency: string; toCurrency: string },
    options?: RequestOptions,
  ): Promise<{
    ready: boolean;
    reason?: string;
    pool_address?: string;
    liquidity?: string;
    fee?: number;
    network?: string;
  }> {
    return this.http.get('/v1/quotes/dex/pool', {
      ...options,
      query: { from_currency: input.fromCurrency, to_currency: input.toCurrency },
    });
  }

  getDexCatalog(options?: RequestOptions): Promise<DexCatalogResponse> {
    return this.http.get('/v1/quotes/dex/pairs', options);
  }

  consume(quoteId: string, signature: string, options?: RequestOptions): Promise<QuoteResponse> {
    return this.http.post(`/v1/quotes/${encodeURIComponent(quoteId)}/consume`, { signature }, options);
  }

  listRatePairs(options?: RequestOptions): Promise<RatePairsResponse> {
    return this.http.get('/v1/rates/pairs', options);
  }

  getRateProvider(options?: RequestOptions): Promise<{ provider: string }> {
    return this.http.get('/v1/rates/provider', options);
  }

  listRecentQuotes(input?: { limit?: number }, options?: RequestOptions): Promise<{ data: QuoteListItem[] }> {
    return this.http.get('/v1/quotes', { ...options, query: { limit: input?.limit } });
  }
}

export interface DexCatalogResponse {
  network: 'base-mainnet' | 'base-sepolia';
  tokens: Array<{ symbol: string; decimals: number; label: string }>;
  pairs: Array<{ from: string; to: string; pool_fee: number }>;
}

export interface RatePairRow {
  base: string;
  quote: string;
  mid_rate_1e8?: string;
  provider?: string;
  captured_at?: string;
  available: boolean;
  error?: string;
}

export interface RatePairsResponse {
  provider: string;
  pairs: RatePairRow[];
}

export interface QuoteListItem {
  quote_id: string;
  intent_id?: string | null;
  from_currency: string;
  to_currency: string;
  from_amount_minor: string;
  to_amount_minor: string;
  quoted_rate_1e8: string;
  spread_bps: number;
  provider: string;
  status: string;
  expires_at: string;
  consumed_at: string | null;
  created_at: string;
}
