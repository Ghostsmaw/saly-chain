import { ExternalError, NotFoundError, ValidationError } from '@salychain/errors';
import type { FiatAdapter } from './adapter.js';
import type {
  FiatDestination,
  FiatPayinCustomer,
  FiatPayinInstruction,
  FiatPayinMethod,
  FiatPayinStatus,
  FiatTransfer,
  FiatTransferStatus,
} from './types.js';
import { HttpClient } from './http.client.js';

interface FlutterwaveTransferResponse {
  status: string;
  message: string;
  data: {
    id: number;
    reference: string;
    status: string;
    amount: number;
    currency: string;
    complete_message?: string;
  };
}

interface FlutterwaveVerifyResponse {
  status: string;
  data: {
    id: number;
    reference: string;
    status: string;
    amount: number;
    currency: string;
    complete_message?: string;
  };
}

interface FlutterwaveVirtualAccountResponse {
  status: string;
  message: string;
  data: {
    order_ref?: string;
    flw_ref?: string;
    account_number?: string;
    bank_name?: string;
    expiry_date?: string;
    amount?: number;
    note?: string;
  };
}

const FLW_STATUS: Record<string, FiatTransferStatus> = {
  NEW: 'PENDING',
  PENDING: 'PENDING',
  OTP: 'PENDING',
  'OTP-SENT': 'PENDING',
  PROCESSING: 'PROCESSING',
  SUCCESSFUL: 'SETTLED',
  SUCCESS: 'SETTLED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELED',
};

const FLW_PAYIN_STATUS: Record<string, FiatPayinStatus> = {
  SUCCESSFUL: 'SETTLED',
  SUCCESS: 'SETTLED',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  CANCELLED: 'FAILED',
};

/**
 * Flutterwave Transfers API — NGN, GHS, KES, USD, EUR, GBP and more.
 * https://developer.flutterwave.com/docs/transfers
 */
export class FlutterwaveFiatAdapter implements FiatAdapter {
  readonly rail = 'ANY' as const;
  private readonly http: HttpClient;

  constructor(secretKey: string, baseUrl = 'https://api.flutterwave.com/v3') {
    if (!secretKey) {
      throw new Error('FlutterwaveFiatAdapter requires FLUTTERWAVE_SECRET_KEY');
    }
    this.http = new HttpClient({
      baseUrl,
      defaultHeaders: { Authorization: `Bearer ${secretKey}` },
    });
  }

  supports(destination: FiatDestination): boolean {
    if (!destination.accountIdentifier || destination.currency.length !== 3) return false;
    if (destination.countryCode.length !== 2) return false;
    const supported = new Set(['NGN', 'GHS', 'KES', 'USD', 'EUR', 'GBP', 'ZAR', 'UGX', 'TZS']);
    return supported.has(destination.currency.toUpperCase());
  }

  async send(input: {
    correlationId: string;
    amountMinor: string;
    currency: string;
    destination: FiatDestination;
  }): Promise<FiatTransfer> {
    if (!this.supports(input.destination)) {
      throw ValidationError(
        'chain.fiat.unsupported_destination',
        'Flutterwave does not support this destination',
      );
    }

    const existing = await this.findByReference(input.correlationId);
    if (existing) return existing;

    const amountMajor = minorToMajor(input.amountMinor, input.currency);
    const body: Record<string, unknown> = {
      account_bank: input.destination.bankCode ?? '',
      account_number: input.destination.accountIdentifier,
      amount: amountMajor,
      narration: input.destination.reference ?? `SalyChain ${input.correlationId}`,
      currency: input.currency.toUpperCase(),
      reference: input.correlationId,
      debit_currency: input.currency.toUpperCase(),
      beneficiary_name: input.destination.holderName,
    };

    const res = await this.http.request<FlutterwaveTransferResponse>('/transfers', {
      method: 'POST',
      body,
      idempotencyKey: input.correlationId,
    });

    if (res.status !== 'success') {
      throw ExternalError('chain.fiat.psp_error', res.message ?? 'Flutterwave transfer rejected');
    }

    return this.toTransfer(res.data, input);
  }

  async getStatus(pspId: string): Promise<FiatTransfer | null> {
    try {
      const res = await this.http.request<FlutterwaveVerifyResponse>(
        `/transfers/${encodeURIComponent(pspId)}`,
      );
      if (res.status !== 'success') return null;
      return this.toTransferFromVerify(res.data);
    } catch (err) {
      if (err instanceof Error && err.message.includes('404')) return null;
      throw err;
    }
  }

  async cancel(pspId: string): Promise<{ canceled: boolean }> {
    // Flutterwave does not support cancel after submission — best-effort no-op.
    const cur = await this.getStatus(pspId);
    if (!cur) throw NotFoundError('chain.fiat.not_found', `pspId ${pspId} not known`);
    if (cur.status === 'PENDING' || cur.status === 'PROCESSING') {
      return { canceled: false };
    }
    return { canceled: false };
  }

  // ───────────────────────────── Pay-in (inbound) ─────────────────────────────

  supportsPayin(input: { currency: string; countryCode: string }): boolean {
    const supported = new Set(['NGN', 'GHS', 'KES', 'UGX', 'TZS']);
    return supported.has(input.currency.toUpperCase()) && input.countryCode.length === 2;
  }

  async createPayin(input: {
    correlationId: string;
    amountMinor: string;
    currency: string;
    customer: FiatPayinCustomer;
    method?: FiatPayinMethod;
  }): Promise<FiatPayinInstruction> {
    if (
      !this.supportsPayin({ currency: input.currency, countryCode: input.customer.countryCode })
    ) {
      throw ValidationError(
        'chain.fiat.unsupported_payin',
        'Flutterwave pay-in does not support this currency/country',
      );
    }
    const existing = await this.getPayinStatus(input.correlationId);
    if (existing) return existing;

    // Dynamic virtual account: payer makes a bank transfer to it; the
    // `charge.completed` webhook (keyed on tx_ref) confirms the credit.
    const res = await this.http.request<FlutterwaveVirtualAccountResponse>(
      '/virtual-account-numbers',
      {
        method: 'POST',
        body: {
          email: input.customer.email ?? `payin+${input.correlationId}@salychain.dev`,
          currency: input.currency.toUpperCase(),
          amount: minorToMajor(input.amountMinor, input.currency),
          tx_ref: input.correlationId,
          is_permanent: false,
          narration: input.customer.name,
        },
        idempotencyKey: input.correlationId,
      },
    );
    if (res.status !== 'success') {
      throw ExternalError(
        'chain.fiat.psp_error',
        res.message ?? 'Flutterwave pay-in creation failed',
      );
    }

    return {
      pspReference: res.data.order_ref ?? res.data.flw_ref ?? input.correlationId,
      correlationId: input.correlationId,
      method: 'VIRTUAL_ACCOUNT',
      status: 'PENDING',
      amountMinor: input.amountMinor,
      currency: input.currency.toUpperCase(),
      accountName: input.customer.name,
      createdAt: new Date().toISOString(),
      ...(res.data.bank_name ? { bankName: res.data.bank_name } : {}),
      ...(res.data.account_number ? { accountNumber: res.data.account_number } : {}),
      ...(res.data.expiry_date ? { expiresAt: res.data.expiry_date } : {}),
    };
  }

  async getPayinStatus(pspReference: string): Promise<FiatPayinInstruction | null> {
    try {
      const res = await this.http.request<FlutterwaveVerifyResponse>(
        `/transactions/verify_by_reference?tx_ref=${encodeURIComponent(pspReference)}`,
      );
      if (res.status !== 'success' || !res.data) return null;
      const d = res.data;
      const status = FLW_PAYIN_STATUS[(d.status ?? '').toUpperCase()] ?? 'PENDING';
      return {
        pspReference,
        correlationId: d.reference,
        method: 'VIRTUAL_ACCOUNT',
        status,
        amountMinor: majorToMinor(String(d.amount), d.currency),
        currency: d.currency,
        createdAt: new Date().toISOString(),
        ...(status === 'SETTLED' ? { settledAt: new Date().toISOString() } : {}),
        ...(d.complete_message ? { failureReason: d.complete_message } : {}),
      };
    } catch {
      return null;
    }
  }

  private async findByReference(reference: string): Promise<FiatTransfer | null> {
    try {
      const res = await this.http.request<FlutterwaveVerifyResponse>(
        `/transfers?reference=${encodeURIComponent(reference)}`,
      );
      if (res.status !== 'success' || !res.data) return null;
      return this.toTransferFromVerify(res.data);
    } catch {
      return null;
    }
  }

  private toTransfer(
    data: FlutterwaveTransferResponse['data'],
    input: {
      correlationId: string;
      amountMinor: string;
      currency: string;
      destination: FiatDestination;
    },
  ): FiatTransfer {
    return {
      pspId: String(data.id),
      correlationId: input.correlationId,
      rail: input.destination.rail,
      status: FLW_STATUS[data.status.toUpperCase()] ?? 'PROCESSING',
      amountMinor: input.amountMinor,
      currency: input.currency,
      destination: input.destination,
      createdAt: new Date().toISOString(),
      ...(FLW_STATUS[data.status.toUpperCase()] === 'SETTLED'
        ? { settledAt: new Date().toISOString() }
        : {}),
      ...(data.complete_message ? { failureReason: data.complete_message } : {}),
    };
  }

  private toTransferFromVerify(data: FlutterwaveVerifyResponse['data']): FiatTransfer {
    const status = FLW_STATUS[data.status.toUpperCase()] ?? 'PROCESSING';
    return {
      pspId: String(data.id),
      correlationId: data.reference,
      rail: 'NIP',
      status,
      amountMinor: majorToMinor(String(data.amount), data.currency),
      currency: data.currency,
      destination: {
        currency: data.currency,
        rail: 'NIP',
        accountIdentifier: '',
        holderName: '',
        countryCode: 'NG',
      },
      createdAt: new Date().toISOString(),
      ...(status === 'SETTLED' ? { settledAt: new Date().toISOString() } : {}),
      ...(data.complete_message ? { failureReason: data.complete_message } : {}),
    };
  }
}

function minorToMajor(amountMinor: string, currency: string): number {
  const minor = BigInt(amountMinor);
  const zeroDec = new Set(['JPY', 'KRW']);
  if (zeroDec.has(currency.toUpperCase())) return Number(minor);
  return Number(minor) / 100;
}

function majorToMinor(amountMajor: string, currency: string): string {
  const zeroDec = new Set(['JPY', 'KRW']);
  if (zeroDec.has(currency.toUpperCase())) return String(Math.round(Number(amountMajor)));
  return String(Math.round(Number(amountMajor) * 100));
}
