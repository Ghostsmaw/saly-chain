import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export type SignerChain = 'BASE' | 'XRPL' | 'ETHEREUM' | 'POLYGON' | 'SALY_L3';

export interface SignerKeyDto {
  key_ref: string;
  chain: SignerChain;
  public_address: string;
  created_at: string;
}

export interface PolicyContext {
  destination_chain: SignerChain;
  destination_address: string;
  amount_minor: string;
  asset_symbol: string;
  memo?: string;
}

export interface SignPolicy {
  destination_allowlist: readonly string[];
  per_tx_cap_minor: string | null;
  daily_cap_minor: string | null;
  approval_threshold_minor: string | null;
  required_approvers: number;
}

export interface SignRequest {
  idempotency_key: string;
  wallet_id: string;
  signer_key_ref: string;
  chain: SignerChain;
  /** Hex (0x-prefixed) unsigned transaction for EVM, canonical JSON for XRPL. */
  unsigned_tx: string;
  policy_context: PolicyContext;
  policy?: SignPolicy;
  rolling_24h_spent_minor?: string;
  /** Approver votes already collected (required when amount exceeds approval threshold). */
  approvers?: string;
}

export interface SignResponse {
  idempotency_key: string;
  /** Hex (0x-prefixed) signed transaction, ready for broadcast. */
  signed_tx: string;
  signer_key_ref: string;
  signed_at: string;
}

export interface SignerHealth {
  ok: boolean;
  kms_available: boolean;
  kms_provider: string;
  wrapping_key_ref: string;
  version: string;
}

export class SignerClient {
  private readonly http: HttpClient;

  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'signer', logger: opts.logger });
  }

  health(options?: RequestOptions): Promise<SignerHealth> {
    return this.http.get('/v1/health', { ...options, noRetry: true });
  }

  createKey(input: { chain: SignerChain; label?: string }, options?: RequestOptions): Promise<SignerKeyDto> {
    return this.http.post('/v1/keys', input, options);
  }

  sign(input: SignRequest, options?: RequestOptions): Promise<SignResponse> {
    return this.http.post('/v1/sign', input, {
      ...options,
      idempotencyKey: input.idempotency_key,
    });
  }
}
