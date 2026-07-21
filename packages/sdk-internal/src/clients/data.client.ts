import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export interface TransfersQuery {
  chain?: string;
  token?: string;
  address?: string;
  limit?: number;
  offset?: number;
}

export interface TransfersResponse {
  data: Array<Record<string, unknown>>;
  paging: { limit: number; offset: number; next_offset: number | null };
}

export interface AddressBalancesResponse {
  chain: string;
  address: string;
  balances: Array<{ token_symbol: string; net_amount: number; transfers_in: number; transfers_out: number }>;
}

export interface TxResponse {
  chain: string;
  tx_hash: string;
  transfers: Array<Record<string, unknown>>;
  decoded_events: Array<Record<string, unknown>>;
  salychain_originated: boolean;
  lineage: unknown | null;
}

export interface StablecoinSupplyResponse {
  asset: string;
  by_chain: Array<{ chain_id: string; minted: number; burned: number; net_supply: number }>;
  total_net_supply: number;
}

export interface IntentLineageResponse {
  intent_id: string;
  found: boolean;
  intent_trace: Array<Record<string, unknown>>;
  transactions: Array<{
    transaction_id: string;
    latest_state?: string;
    settle_tx_hash?: string;
    rail?: string;
    states: Array<Record<string, unknown>>;
  }>;
}

export interface BlockResponse {
  chain: string;
  block_number: number;
  found: boolean;
  block: { chain_id: string; block_number: number; block_hash: string; ts: string } | null;
  transfers: Array<Record<string, unknown>>;
}

export interface L3SettlementsResponse {
  chain: string | null;
  data: Array<{ chain_id: string; tx_hash: string; ts: string; contract_address: string; args: string }>;
}

export interface NamedQueryRequest {
  query: string;
  params?: Record<string, unknown>;
}

/** Typed client for the Saly Realtime APIs (read-only ClickHouse data). */
export class DataClient {
  private readonly http: HttpClient;
  constructor(opts: { baseUrl: string; logger?: Logger; internalToken?: string }) {
    this.http = new HttpClient({
      baseUrl: opts.baseUrl,
      serviceName: 'analytics-api',
      ...(opts.logger ? { logger: opts.logger } : {}),
      ...(opts.internalToken ? { internalToken: opts.internalToken } : {}),
    });
  }

  transfers(query: TransfersQuery = {}, options?: RequestOptions): Promise<TransfersResponse> {
    const q: Record<string, string | number | undefined> = {
      chain: query.chain,
      token: query.token,
      address: query.address,
      limit: query.limit,
      offset: query.offset,
    };
    return this.http.get('/v1/data/transfers', { ...options, query: q });
  }

  addressBalances(chain: string, address: string, options?: RequestOptions): Promise<AddressBalancesResponse> {
    return this.http.get(
      `/v1/data/address/${encodeURIComponent(chain)}/${encodeURIComponent(address)}/balances`,
      options,
    );
  }

  tx(chain: string, hash: string, options?: RequestOptions): Promise<TxResponse> {
    return this.http.get(`/v1/data/tx/${encodeURIComponent(chain)}/${encodeURIComponent(hash)}`, options);
  }

  intentLineage(intentId: string, options?: RequestOptions): Promise<IntentLineageResponse> {
    return this.http.get(`/v1/data/intent/${encodeURIComponent(intentId)}/lineage`, options);
  }

  block(chain: string, blockNumber: number | string, options?: RequestOptions): Promise<BlockResponse> {
    return this.http.get(
      `/v1/data/block/${encodeURIComponent(chain)}/${encodeURIComponent(String(blockNumber))}`,
      options,
    );
  }

  l3Settlements(
    query: { chain?: string; limit?: number } = {},
    options?: RequestOptions,
  ): Promise<L3SettlementsResponse> {
    const q: Record<string, string | number | undefined> = {
      chain: query.chain,
      limit: query.limit,
    };
    return this.http.get('/v1/data/l3/settlements', { ...options, query: q });
  }

  usdcSupply(options?: RequestOptions): Promise<StablecoinSupplyResponse> {
    return this.http.get('/v1/data/stablecoin/usdc/supply', options);
  }

  describeQueries(options?: RequestOptions): Promise<{ queries: Array<{ name: string; description: string }> }> {
    return this.http.get('/v1/data/query', options);
  }

  runQuery(body: NamedQueryRequest, options?: RequestOptions): Promise<{ query: string; data: Array<Record<string, unknown>> }> {
    return this.http.post('/v1/data/query', body, options);
  }
}
