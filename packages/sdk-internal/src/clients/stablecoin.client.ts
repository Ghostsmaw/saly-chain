import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export interface MintRequestDto {
  id: string;
  org_id: string;
  idempotency_key: string;
  status: string;
  amount_minor: string;
  currency: string;
  chain: 'SALY_L3' | 'BASE';
  reserve_account_id: string;
  destination_wallet_id?: string | null;
  destination_address?: string | null;
  execution_transaction_id?: string | null;
  tx_hash?: string | null;
  created_at: string;
  updated_at: string;
}

export interface RedeemRequestDto {
  id: string;
  org_id: string;
  idempotency_key: string;
  status: string;
  amount_minor: string;
  currency: string;
  chain: 'SALY_L3' | 'BASE';
  source_wallet_id: string;
  payout_rail: string;
  execution_transaction_id?: string | null;
  tx_hash?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReserveAccountDto {
  id: string;
  custodian: string;
  currency: string;
  balance_minor: string;
  authorized_ceiling_minor: string;
  attestation_hash?: string | null;
  as_of?: string | null;
  chain: string;
}

export interface SupplySnapshotDto {
  id: string;
  chain: string;
  on_chain_supply_minor: string;
  reserve_total_minor: string;
  reserve_ratio_bps: number;
  captured_at: string;
}

/** Typed client for the Stablecoin service (mint/redeem/reserves/PoR). */
export class StablecoinClient {
  private readonly http: HttpClient;

  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'stablecoin', logger: opts.logger });
  }

  createMintRequest(
    input: {
      idempotencyKey: string;
      amountMinor: string;
      destinationWalletId?: string;
      destinationAddress?: string;
      reserveAccountId?: string;
      chain?: 'SALY_L3' | 'BASE';
    },
    options?: RequestOptions,
  ): Promise<MintRequestDto> {
    return this.http.post(
      '/v1/mint-requests',
      {
        idempotency_key: input.idempotencyKey,
        amount_minor: input.amountMinor,
        destination_wallet_id: input.destinationWalletId,
        destination_address: input.destinationAddress,
        reserve_account_id: input.reserveAccountId,
        chain: input.chain,
      },
      { ...options, idempotencyKey: input.idempotencyKey },
    );
  }

  approveMint(mintRequestId: string, options?: RequestOptions): Promise<MintRequestDto> {
    return this.http.post(`/v1/mint-requests/${encodeURIComponent(mintRequestId)}/approve`, {}, options);
  }

  getMintRequest(id: string, options?: RequestOptions): Promise<MintRequestDto> {
    return this.http.get(`/v1/mint-requests/${encodeURIComponent(id)}`, options);
  }

  listMintRequests(options?: RequestOptions): Promise<MintRequestDto[]> {
    return this.http.get('/v1/mint-requests', options);
  }

  createRedeemRequest(
    input: {
      idempotencyKey: string;
      amountMinor: string;
      sourceWalletId: string;
      payoutRail: 'FIAT' | 'INTERNAL';
      chain?: 'SALY_L3' | 'BASE';
    },
    options?: RequestOptions,
  ): Promise<RedeemRequestDto> {
    return this.http.post(
      '/v1/redeem-requests',
      {
        idempotency_key: input.idempotencyKey,
        amount_minor: input.amountMinor,
        source_wallet_id: input.sourceWalletId,
        payout_rail: input.payoutRail,
        chain: input.chain,
      },
      { ...options, idempotencyKey: input.idempotencyKey },
    );
  }

  approveRedeem(redeemRequestId: string, options?: RequestOptions): Promise<RedeemRequestDto> {
    return this.http.post(`/v1/redeem-requests/${encodeURIComponent(redeemRequestId)}/approve`, {}, options);
  }

  getRedeemRequest(id: string, options?: RequestOptions): Promise<RedeemRequestDto> {
    return this.http.get(`/v1/redeem-requests/${encodeURIComponent(id)}`, options);
  }

  listRedeemRequests(options?: RequestOptions): Promise<RedeemRequestDto[]> {
    return this.http.get('/v1/redeem-requests', options);
  }

  listReserves(options?: RequestOptions): Promise<ReserveAccountDto[]> {
    return this.http.get('/v1/reserves', options);
  }

  latestSupply(chain: 'SALY_L3' | 'BASE' = 'SALY_L3', options?: RequestOptions): Promise<SupplySnapshotDto | null> {
    return this.http.get('/v1/supply/latest', { ...options, query: { chain } });
  }
}
