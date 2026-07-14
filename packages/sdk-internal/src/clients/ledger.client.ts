import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export interface LedgerAccount {
  id: string;
  code: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  currency: string;
  balance_minor: string;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  owner_id?: string;
  owner_kind?: string;
  created_at: string;
}

export interface CreateAccountInput {
  code: string;
  type: LedgerAccount['type'];
  currency: string;
  ownerId?: string;
  ownerKind?: string;
  metadata?: Record<string, unknown>;
}

export interface PostingInput {
  account_id: string;
  direction: 'DEBIT' | 'CREDIT';
  amount_minor: string;
  currency: string;
}

export interface JournalEntry {
  id: string;
  idempotency_key: string;
  status: 'PENDING' | 'POSTED' | 'REVERSED';
  posted_at: string | null;
  transaction_id: string | null;
  memo: string | null;
  postings: Array<{
    id: string;
    account_id: string;
    direction: 'DEBIT' | 'CREDIT';
    amount_minor: string;
    currency: string;
  }>;
}

export interface PostJournalEntryInput {
  idempotencyKey: string;
  transactionId?: string;
  memo?: string;
  metadata?: Record<string, unknown>;
  postings: PostingInput[];
}

export interface LedgerTransaction {
  id: string;
  external_ref: string | null;
  kind: 'PAYIN' | 'PAYOUT' | 'TRANSFER' | 'SWAP' | 'FEE' | 'REWARD' | 'REVERSAL';
  intent_id: string | null;
  created_at: string;
}

export class LedgerClient {
  private readonly http: HttpClient;

  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'ledger', logger: opts.logger });
  }

  createAccount(input: CreateAccountInput, options?: RequestOptions): Promise<LedgerAccount> {
    return this.http.post('/v1/accounts', input, options);
  }

  getAccount(id: string, options?: RequestOptions): Promise<LedgerAccount> {
    return this.http.get(`/v1/accounts/${encodeURIComponent(id)}`, options);
  }

  getAccountByCode(code: string, options?: RequestOptions): Promise<LedgerAccount> {
    return this.http.get(`/v1/accounts/by-code/${encodeURIComponent(code)}`, options);
  }

  listAccountsByOwner(
    input: { ownerKind: string; ownerId: string; currency?: string },
    options?: RequestOptions,
  ): Promise<{ data: LedgerAccount[] }> {
    return this.http.get('/v1/accounts/by-owner', {
      ...options,
      query: {
        owner_kind: input.ownerKind,
        owner_id: input.ownerId,
        currency: input.currency,
      },
    });
  }

  getAccountBalance(id: string, options?: RequestOptions) {
    return this.http.get<{
      account_id: string;
      currency: string;
      balance_minor: string;
      cached_balance_minor: string;
      drift_minor: string;
    }>(`/v1/accounts/${encodeURIComponent(id)}/balance`, options);
  }

  postJournalEntry(input: PostJournalEntryInput, options?: RequestOptions): Promise<JournalEntry> {
    return this.http.post(
      '/v1/journal/entries',
      {
        idempotency_key: input.idempotencyKey,
        transaction_id: input.transactionId,
        memo: input.memo,
        metadata: input.metadata,
        postings: input.postings,
      },
      { ...options, idempotencyKey: input.idempotencyKey },
    );
  }

  getJournalEntry(id: string, options?: RequestOptions): Promise<JournalEntry> {
    return this.http.get(`/v1/journal/entries/${encodeURIComponent(id)}`, options);
  }

  reverseJournalEntry(
    id: string,
    body: { idempotencyKey: string; memo?: string },
    options?: RequestOptions,
  ): Promise<JournalEntry> {
    return this.http.post(
      `/v1/journal/entries/${encodeURIComponent(id)}/reverse`,
      { idempotency_key: body.idempotencyKey, memo: body.memo },
      { ...options, idempotencyKey: body.idempotencyKey },
    );
  }

  createTransaction(
    input: { kind: LedgerTransaction['kind']; externalRef?: string; intentId?: string; metadata?: Record<string, unknown> },
    options?: RequestOptions,
  ): Promise<LedgerTransaction> {
    return this.http.post(
      '/v1/transactions',
      {
        kind: input.kind,
        external_ref: input.externalRef,
        intent_id: input.intentId,
        metadata: input.metadata,
      },
      options,
    );
  }
}
