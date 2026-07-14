import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';
import type { Intent } from '@salychain/intent-schema';

export type TransactionState =
  | 'CREATED'
  | 'SCREENED'
  | 'ROUTED'
  | 'QUOTED'
  | 'RESERVED'
  | 'EXECUTING'
  | 'AWAITING_APPROVAL'
  | 'AWAITING_CONFIRMATION'
  | 'SETTLED'
  | 'FAILED'
  | 'REVERSING'
  | 'REVERSED'
  | 'REJECTED';

export interface TransactionDto {
  id: string;
  kind:
    | 'INTERNAL_TRANSFER'
    | 'BASE_PAYOUT'
    | 'XRPL_PAYOUT'
    | 'L3_PAYOUT'
    | 'ESCROW_PAYOUT'
    | 'PAYROLL_BATCH'
    | 'FIAT_PAYOUT'
    | 'FIAT_PAYIN'
    | 'SWAP'
    | 'TOPUP'
    | 'DEX_SWAP'
    | 'BRIDGE_DEPOSIT'
    | 'BRIDGE_WITHDRAW'
    | 'SALYSD_MINT'
    | 'SALYSD_REDEEM';
  state: TransactionState;
  source: {
    wallet_id?: string;
    account_id?: string;
    amount_minor: string;
    currency: string;
  };
  destination: {
    wallet_id?: string;
    account_id?: string;
    address?: string;
    chain?: string;
  };
  ledger_entry_id?: string;
  reversal_entry_id?: string;
  broadcast_id?: string;
  tx_hash?: string;
  intent_id?: string;
  error?: string;
  created_at: string;
  settled_at?: string;
  payroll?: PayrollBatchSummary;
  topup?: TopupSummary;
  events: Array<{ state: TransactionState; at: string; detail?: Record<string, unknown> }>;
}

export interface TopupSummary {
  amount_minor: string;
  currency: string;
  ledger_transaction_id?: string;
  clearing_account_id?: string;
  destination_account_id?: string;
  external_reference?: string;
}

export interface PayrollLineResult {
  line_id: string;
  transaction_id?: string;
  intent_id?: string;
  state: TransactionState | 'SKIPPED';
  error?: string;
  label?: string;
}

export interface PayrollBatchSummary {
  batch_id: string;
  name?: string;
  pay_period?: string;
  total_lines: number;
  lines_settled: number;
  lines_failed: number;
  lines_pending: number;
  lines: PayrollLineResult[];
}

export interface InternalTransferRequest {
  idempotencyKey: string;
  fromAccountId: string;
  toAccountId: string;
  amountMinor: string;
  currency: string;
  memo?: string;
  intentId?: string;
}

export interface BasePayoutRequest {
  idempotencyKey: string;
  sourceWalletId: string;
  destinationAddress: string;
  amountMinor: string;
  /** "USDC" for now; other ERC20s land later. */
  asset: 'USDC';
  memo?: string;
  intentId?: string;
}

export interface L3PayoutRequest {
  idempotencyKey: string;
  sourceWalletId: string;
  destinationAddress: string;
  amountMinor: string;
  /** USDC on the Saly L3 execution layer. */
  asset: 'USDC';
  memo?: string;
  intentId?: string;
}

export interface XrplPayoutRequest {
  idempotencyKey: string;
  sourceWalletId: string;
  destinationAddress: string;
  /** Native XRP drops, or IOU minor units (e.g. USD cents). */
  amountMinor: string;
  asset: 'XRP' | 'USD' | 'EUR';
  iouIssuer?: string;
  destinationTag?: number;
  memo?: string;
  intentId?: string;
}

export interface IngestIntentRequest {
  idempotency_key: string;
  intent: Intent;
}

export interface TopupRequest {
  idempotencyKey: string;
  actorId: string;
  destinationAccountRef: string;
  amountMinor: string;
  currency: string;
  externalReference?: string;
  memo?: string;
}

export interface FiatPayinRequest {
  idempotencyKey: string;
  actorId: string;
  destinationAccountRef: string;
  amountMinor: string;
  currency: string;
  /** ISO-3166-1 alpha-2 country of the payer. */
  country: string;
  customerName: string;
  customerEmail?: string;
  method?: 'VIRTUAL_ACCOUNT' | 'CHECKOUT';
  memo?: string;
}

export interface FiatPayinInstructionDto {
  pspReference: string;
  correlationId: string;
  method: 'VIRTUAL_ACCOUNT' | 'CHECKOUT';
  status: 'PENDING' | 'SETTLED' | 'FAILED' | 'EXPIRED';
  amountMinor: string;
  currency: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  checkoutUrl?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface FiatPayinResponse {
  transaction: TransactionDto;
  payin: FiatPayinInstructionDto | null;
}

export interface ReconciliationBreakDto {
  id: string;
  kind: string;
  reference?: string;
  currency?: string;
  expectedMinor?: string;
  actualMinor?: string;
  detail?: Record<string, unknown>;
  createdAt: string;
}

export interface ReconciliationRunDto {
  id: string;
  scope: string;
  status: 'OK' | 'BREAKS_FOUND' | 'ERROR';
  startedAt: string;
  finishedAt?: string;
  checkedCount: number;
  breakCount: number;
  summary?: Record<string, unknown>;
  breaks?: ReconciliationBreakDto[];
}

export interface SeedClearingRequest {
  idempotencyKey: string;
  currency: string;
  amountMinor: string;
  memo?: string;
}

export interface SeedClearingResult {
  journal_entry_id: string;
  clearing_account_id: string;
  equity_account_id: string;
  amount_minor: string;
  currency: string;
}

export interface TransactionListQuery extends Record<
  string,
  string | number | boolean | undefined
> {
  limit?: number;
  cursor?: string;
  state?: TransactionState;
  kind?: TransactionDto['kind'];
  payroll_parent_id?: string;
}

export class ExecutionClient {
  private readonly http: HttpClient;

  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({
      baseUrl: opts.baseUrl,
      serviceName: 'execution',
      logger: opts.logger,
    });
  }

  internalTransfer(
    input: InternalTransferRequest,
    options?: RequestOptions,
  ): Promise<TransactionDto> {
    return this.http.post(
      '/v1/transfers',
      {
        idempotency_key: input.idempotencyKey,
        from_account_id: input.fromAccountId,
        to_account_id: input.toAccountId,
        amount_minor: input.amountMinor,
        currency: input.currency,
        memo: input.memo,
        intent_id: input.intentId,
      },
      { ...options, idempotencyKey: input.idempotencyKey },
    );
  }

  basePayout(input: BasePayoutRequest, options?: RequestOptions): Promise<TransactionDto> {
    return this.http.post(
      '/v1/payouts/base',
      {
        idempotency_key: input.idempotencyKey,
        source_wallet_id: input.sourceWalletId,
        destination_address: input.destinationAddress,
        amount_minor: input.amountMinor,
        asset: input.asset,
        memo: input.memo,
        intent_id: input.intentId,
      },
      { ...options, idempotencyKey: input.idempotencyKey },
    );
  }

  l3Payout(input: L3PayoutRequest, options?: RequestOptions): Promise<TransactionDto> {
    return this.http.post(
      '/v1/payouts/l3',
      {
        idempotency_key: input.idempotencyKey,
        source_wallet_id: input.sourceWalletId,
        destination_address: input.destinationAddress,
        amount_minor: input.amountMinor,
        asset: input.asset,
        memo: input.memo,
        intent_id: input.intentId,
      },
      { ...options, idempotencyKey: input.idempotencyKey },
    );
  }

  xrplPayout(input: XrplPayoutRequest, options?: RequestOptions): Promise<TransactionDto> {
    return this.http.post(
      '/v1/payouts/xrpl',
      {
        idempotency_key: input.idempotencyKey,
        source_wallet_id: input.sourceWalletId,
        destination_address: input.destinationAddress,
        amount_minor: input.amountMinor,
        asset: input.asset,
        iou_issuer: input.iouIssuer,
        destination_tag: input.destinationTag,
        memo: input.memo,
        intent_id: input.intentId,
      },
      { ...options, idempotencyKey: input.idempotencyKey },
    );
  }

  ingestIntent(input: IngestIntentRequest, options?: RequestOptions): Promise<TransactionDto> {
    return this.http.post('/v1/intents', input, {
      ...options,
      idempotencyKey: input.idempotency_key,
    });
  }

  createTopup(input: TopupRequest, options?: RequestOptions): Promise<TransactionDto> {
    return this.http.post(
      '/v1/topups',
      {
        idempotency_key: input.idempotencyKey,
        actor_id: input.actorId,
        destination_account_ref: input.destinationAccountRef,
        amount_minor: input.amountMinor,
        currency: input.currency,
        external_reference: input.externalReference,
        memo: input.memo,
      },
      { ...options, idempotencyKey: input.idempotencyKey },
    );
  }

  createPayin(input: FiatPayinRequest, options?: RequestOptions): Promise<FiatPayinResponse> {
    return this.http.post(
      '/v1/payins',
      {
        idempotency_key: input.idempotencyKey,
        actor_id: input.actorId,
        destination_account_ref: input.destinationAccountRef,
        amount_minor: input.amountMinor,
        currency: input.currency,
        country: input.country,
        customer_name: input.customerName,
        customer_email: input.customerEmail,
        method: input.method,
        memo: input.memo,
      },
      { ...options, idempotencyKey: input.idempotencyKey },
    );
  }

  listReconciliationRuns(
    query: { limit?: number } = {},
    options?: RequestOptions,
  ): Promise<{ data: ReconciliationRunDto[] }> {
    return this.http.get('/v1/admin/reconciliation/runs', { ...options, query });
  }

  runReconciliation(options?: RequestOptions): Promise<ReconciliationRunDto> {
    return this.http.post('/v1/admin/reconciliation/run', {}, options);
  }

  seedClearing(input: SeedClearingRequest, options?: RequestOptions): Promise<SeedClearingResult> {
    return this.http.post(
      '/v1/admin/clearing/seed',
      {
        idempotency_key: input.idempotencyKey,
        currency: input.currency,
        amount_minor: input.amountMinor,
        memo: input.memo,
      },
      { ...options, idempotencyKey: input.idempotencyKey },
    );
  }

  getTransaction(id: string, options?: RequestOptions): Promise<TransactionDto> {
    return this.http.get(`/v1/transactions/${encodeURIComponent(id)}`, options);
  }

  listTransactions(
    query: TransactionListQuery = {},
    options?: RequestOptions,
  ): Promise<{ data: TransactionDto[]; next_cursor: string | null }> {
    return this.http.get('/v1/transactions', { ...options, query });
  }

  listPayrollBatchLines(
    batchId: string,
    options?: RequestOptions,
  ): Promise<{ data: TransactionDto[] }> {
    return this.http.get(`/v1/payroll-batches/${encodeURIComponent(batchId)}/lines`, options);
  }

  resumeAfterApproval(intentId: string, options?: RequestOptions): Promise<TransactionDto> {
    return this.http.post('/v1/transactions/resume-approval', { intent_id: intentId }, options);
  }

  listEscrowDeals(
    query: { status?: string; limit?: number } = {},
    options?: RequestOptions,
  ): Promise<{ data: EscrowDealDto[] }> {
    return this.http.get('/v1/escrow/deals', { ...options, query });
  }

  getEscrowDeal(dealId: string, options?: RequestOptions): Promise<EscrowDealDto> {
    return this.http.get(`/v1/escrow/deals/${encodeURIComponent(dealId)}`, options);
  }

  releaseEscrowDeal(
    dealId: string,
    input?: { actor?: string },
    options?: RequestOptions,
  ): Promise<{
    deal_id: string;
    action: string;
    tx_hash: string;
    status: string;
    message: string;
  }> {
    return this.http.post(
      `/v1/escrow/deals/${encodeURIComponent(dealId)}/release`,
      input ?? {},
      options,
    );
  }

  salysdMint(
    input: {
      idempotencyKey: string;
      mintRequestId: string;
      destinationWalletId: string;
      amountMinor: string;
      memo?: string;
    },
    options?: RequestOptions,
  ): Promise<TransactionDto> {
    return this.http.post(
      '/v1/salysd/mint',
      {
        idempotency_key: input.idempotencyKey,
        mint_request_id: input.mintRequestId,
        destination_wallet_id: input.destinationWalletId,
        amount_minor: input.amountMinor,
        memo: input.memo,
      },
      { ...options, idempotencyKey: input.idempotencyKey },
    );
  }

  salysdRedeem(
    input: {
      idempotencyKey: string;
      redeemRequestId: string;
      sourceWalletId: string;
      amountMinor: string;
      memo?: string;
    },
    options?: RequestOptions,
  ): Promise<TransactionDto> {
    return this.http.post(
      '/v1/salysd/redeem',
      {
        idempotency_key: input.idempotencyKey,
        redeem_request_id: input.redeemRequestId,
        source_wallet_id: input.sourceWalletId,
        amount_minor: input.amountMinor,
        memo: input.memo,
      },
      { ...options, idempotencyKey: input.idempotencyKey },
    );
  }

  salysdRedeemFiatPayout(
    input: {
      idempotencyKey: string;
      redeemRequestId: string;
      orgId: string;
      amountMinor: string;
      fiatCurrency?: string;
      countryCode?: string;
      accountNumber?: string;
      bankCode?: string;
      holderName?: string;
      memo?: string;
    },
    options?: RequestOptions,
  ): Promise<TransactionDto> {
    return this.http.post(
      '/v1/salysd/redeem-fiat-payout',
      {
        idempotency_key: input.idempotencyKey,
        redeem_request_id: input.redeemRequestId,
        org_id: input.orgId,
        amount_minor: input.amountMinor,
        fiat_currency: input.fiatCurrency,
        country_code: input.countryCode,
        account_number: input.accountNumber,
        bank_code: input.bankCode,
        holder_name: input.holderName,
        memo: input.memo,
      },
      { ...options, idempotencyKey: input.idempotencyKey, orgId: input.orgId },
    );
  }

  refundEscrowDeal(
    dealId: string,
    input?: { actor?: string },
    options?: RequestOptions,
  ): Promise<{
    deal_id: string;
    action: string;
    tx_hash: string;
    status: string;
    message: string;
  }> {
    return this.http.post(
      `/v1/escrow/deals/${encodeURIComponent(dealId)}/refund`,
      input ?? {},
      options,
    );
  }
}

export interface EscrowDealDto {
  id: string;
  deal_id: string;
  transaction_id?: string;
  status: string;
  payer: string;
  payee: string;
  token: string;
  amount_minor: string;
  deadline: string;
  escrow_contract: string;
  fund_tx_hash?: string;
  resolve_tx_hash?: string;
  resolution?: string;
  condition?: unknown;
  funded_at?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
  events: Array<{ type: string; tx_hash?: string; detail?: unknown; occurred_at: string }>;
}
