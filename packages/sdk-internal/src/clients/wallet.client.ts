import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export type Chain = 'BASE' | 'XRPL' | 'ETHEREUM' | 'POLYGON' | 'INTERNAL' | 'SALY_L3';

export interface WalletDto {
  id: string;
  chain: Chain;
  address: string;
  kind: string;
  status: string;
  signer_key_ref: string;
  ledger_account_id?: string;
  owner_id?: string;
  owner_kind?: string;
  created_at: string;
}

export interface ProvisionWalletInput {
  chain: Chain;
  kind:
    | 'USER_CUSTODIAL'
    | 'BUSINESS_CUSTODIAL'
    | 'AGENT_CUSTODIAL'
    | 'TREASURY'
    | 'HOT_OPERATIONAL'
    | 'FEE_COLLECTION';
  ownerId?: string;
  ownerKind?: string;
  label?: string;
  metadata?: Record<string, unknown>;
}

export interface TransferRequest {
  walletId: string;
  destinationAddress: string;
  amountMinor: string;
  asset: string;
  idempotencyKey: string;
  memo?: string;
  metadata?: Record<string, unknown>;
  intentId?: string;
  iouIssuer?: string;
  destinationTag?: number;
  kind?: 'TRANSFER' | 'ESCROW_FUND' | 'DEX_SWAP' | 'BRIDGE_DEPOSIT' | 'BRIDGE_WITHDRAW' | 'SALYSD_MINT' | 'SALYSD_REDEEM' | 'SALYSD_APPROVE' | 'SALYSD_ORACLE_UPDATE' | 'CONTRACT_CALL';
  dealId?: string;
  escrowContract?: string;
  escrowDeadline?: string;
  bridgePayload?: {
    l1_standard_bridge?: string;
    l1_token?: string;
    l2_token?: string;
    l2_recipient?: string;
    l2_standard_bridge?: string;
    l1_recipient?: string;
  };
  salysdPayload?: {
    token?: string;
    counterparty?: string;
    holder?: string;
    spender?: string;
    reserve_oracle?: string;
    attestation_hash?: string;
    ceiling_minor?: string;
  };
  contractCallPayload?: {
    contract: string;
    calldata: string;
    chain?: 'SALY_L3' | 'BASE';
  };
  swapPayload?: {
    router: string;
    calldata: string;
    token_in: string;
    token_out: string;
    min_amount_out: string;
    recipient: string;
  };
}

export interface TransferResponse {
  id: string;
  wallet_id: string;
  kind?: 'TRANSFER' | 'ESCROW_FUND' | 'DEX_SWAP';
  status: 'PENDING' | 'SUBMITTED' | 'CONFIRMED' | 'FAILED';
  tx_hash: string | null;
  deal_id?: string | null;
  attempts: number;
  last_error: string | null;
  created_at: string;
}

export interface TransferListItem extends TransferResponse {
  chain?: string;
  destination_address?: string;
  amount_minor?: string;
  asset?: string;
}

export interface WalletStats {
  total: number;
  pending_broadcasts: number;
  by_status: Record<string, number>;
  by_chain: Record<string, number>;
}

export class WalletClient {
  private readonly http: HttpClient;

  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'wallet', logger: opts.logger });
  }

  provision(input: ProvisionWalletInput, options?: RequestOptions): Promise<WalletDto> {
    return this.http.post(
      '/v1/wallets',
      {
        chain: input.chain,
        kind: input.kind,
        owner_id: input.ownerId,
        owner_kind: input.ownerKind,
        label: input.label,
        metadata: input.metadata,
      },
      options,
    );
  }

  get(id: string, options?: RequestOptions): Promise<WalletDto> {
    return this.http.get(`/v1/wallets/${encodeURIComponent(id)}`, options);
  }

  /** Create or return the wallet's ledger liability account (idempotent backfill). */
  ensureLedgerAccount(walletId: string, options?: RequestOptions): Promise<WalletDto> {
    return this.http.post(
      `/v1/wallets/${encodeURIComponent(walletId)}/ensure-ledger-account`,
      {},
      options,
    );
  }

  /** Search wallets by owner / chain. Used by orchestrators that operate on an actor reference. */
  listWalletsByActor(
    input: { actorRef: string; chain?: Chain },
    options?: RequestOptions,
  ): Promise<{ data: WalletDto[] }> {
    return this.http.get('/v1/wallets', {
      ...options,
      query: { owner_id: input.actorRef, chain: input.chain },
    });
  }

  listWallets(
    input?: { limit?: number; chain?: Chain; ownerId?: string },
    options?: RequestOptions,
  ): Promise<{ data: WalletDto[] }> {
    return this.http.get('/v1/wallets', {
      ...options,
      query: { limit: input?.limit, chain: input?.chain, owner_id: input?.ownerId },
    });
  }

  findByAddress(
    input: { chain: Chain; address: string },
    options?: RequestOptions,
  ): Promise<{ data: WalletDto | null }> {
    return this.http.get('/v1/wallets/lookup', {
      ...options,
      query: { chain: input.chain, address: input.address },
    });
  }

  getStats(options?: RequestOptions): Promise<WalletStats> {
    return this.http.get('/v1/wallets/stats', options);
  }

  transfer(input: TransferRequest, options?: RequestOptions): Promise<TransferResponse> {
    return this.http.post(
      '/v1/transfers',
      {
        wallet_id: input.walletId,
        destination_address: input.destinationAddress,
        amount_minor: input.amountMinor,
        asset: input.asset,
        idempotency_key: input.idempotencyKey,
        memo: input.memo,
        metadata: input.metadata,
        intent_id: input.intentId,
        iou_issuer: input.iouIssuer,
        destination_tag: input.destinationTag,
        kind: input.kind,
        deal_id: input.dealId,
        escrow_contract: input.escrowContract,
        escrow_deadline: input.escrowDeadline,
        bridge_payload: input.bridgePayload,
        swap_payload: input.swapPayload,
        salysd_payload: input.salysdPayload,
        contract_call_payload: input.contractCallPayload,
      },
      { ...options, idempotencyKey: input.idempotencyKey },
    );
  }

  getTransfer(id: string, options?: RequestOptions): Promise<TransferResponse> {
    return this.http.get(`/v1/transfers/${encodeURIComponent(id)}`, options);
  }

  listTransfers(
    input?: { limit?: number; status?: TransferResponse['status'] },
    options?: RequestOptions,
  ): Promise<{ data: TransferListItem[] }> {
    return this.http.get('/v1/transfers', {
      ...options,
      query: { limit: input?.limit, status: input?.status },
    });
  }

  getPolicy(walletId: string, options?: RequestOptions): Promise<WalletPolicyDto> {
    return this.http.get(`/v1/wallets/${encodeURIComponent(walletId)}/policy`, options);
  }

  updatePolicy(
    walletId: string,
    input: {
      perTxCapMinor?: string;
      dailyCapMinor?: string;
      destinationAllowlist?: string[];
      trustedIssuerAllowlist?: string[];
      approvalThresholdMinor?: string;
      requiredApprovers?: number;
    },
    options?: RequestOptions,
  ): Promise<WalletPolicyDto> {
    return this.http.patch(`/v1/wallets/${encodeURIComponent(walletId)}/policy`, {
      per_tx_cap_minor: input.perTxCapMinor,
      daily_cap_minor: input.dailyCapMinor,
      destination_allowlist: input.destinationAllowlist,
      trusted_issuer_allowlist: input.trustedIssuerAllowlist,
      approval_threshold_minor: input.approvalThresholdMinor,
      required_approvers: input.requiredApprovers,
    }, options);
  }

  getRollingSpend(walletId: string, options?: RequestOptions): Promise<{ wallet_id: string; rolling_24h_spent_minor: string }> {
    return this.http.get(`/v1/wallets/${encodeURIComponent(walletId)}/rolling-spend`, options);
  }

  getRollingSpend30d(walletId: string, options?: RequestOptions): Promise<{ wallet_id: string; rolling_30d_spent_minor: string }> {
    return this.http.get(`/v1/wallets/${encodeURIComponent(walletId)}/rolling-spend-30d`, options);
  }

  resolveEscrow(
    input: {
      walletId: string;
      dealId: string;
      action: 'release' | 'refund';
      escrowContract: string;
      idempotencyKey?: string;
    },
    options?: RequestOptions,
  ): Promise<{ tx_hash: string; action: string; deal_id: string }> {
    return this.http.post(
      '/v1/internal/escrow/resolve',
      {
        wallet_id: input.walletId,
        deal_id: input.dealId,
        action: input.action,
        escrow_contract: input.escrowContract,
        idempotency_key: input.idempotencyKey,
      },
      options,
    );
  }
}

export interface WalletPolicyDto {
  wallet_id: string;
  destination_allowlist: string[];
  trusted_issuer_allowlist: string[];
  per_tx_cap_minor: string;
  daily_cap_minor: string;
  approval_threshold_minor: string;
  required_approvers: number;
  updated_at: string;
}
