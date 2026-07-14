import { ExternalError, ValidationError } from '@salychain/errors';
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

interface PaystackEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
}

interface PaystackRecipient {
  recipient_code: string;
  details: { account_number: string; bank_code: string };
}

interface PaystackTransfer {
  transfer_code: string;
  reference: string;
  amount: number;
  currency: string;
  status: string;
  reason?: string;
}

const PS_STATUS: Record<string, FiatTransferStatus> = {
  pending: 'PENDING',
  otp: 'PENDING',
  processing: 'PROCESSING',
  success: 'SETTLED',
  failed: 'FAILED',
  reversed: 'FAILED',
};

const PS_PAYIN_STATUS: Record<string, FiatPayinStatus> = {
  success: 'SETTLED',
  failed: 'FAILED',
  abandoned: 'FAILED',
  reversed: 'FAILED',
  pending: 'PENDING',
  ongoing: 'PENDING',
};

interface PaystackInitTransaction {
  authorization_url: string;
  access_code: string;
  reference: string;
}

interface PaystackVerifyTransaction {
  id?: number;
  reference: string;
  status: string;
  amount: number;
  currency: string;
  paid_at?: string;
  gateway_response?: string;
}

/**
 * Paystack Transfers — Nigeria (NGN) bank payouts via NIP.
 * https://paystack.com/docs/transfers/single-transfers/
 */
export class PaystackFiatAdapter implements FiatAdapter {
  readonly rail = 'NIP' as const;
  private readonly http: HttpClient;
  private readonly recipientCache = new Map<string, string>();

  constructor(secretKey: string, baseUrl = 'https://api.paystack.co') {
    if (!secretKey) {
      throw new Error('PaystackFiatAdapter requires PAYSTACK_SECRET_KEY');
    }
    this.http = new HttpClient({
      baseUrl,
      defaultHeaders: { Authorization: `Bearer ${secretKey}` },
    });
  }

  supports(destination: FiatDestination): boolean {
    return (
      destination.currency.toUpperCase() === 'NGN' &&
      destination.countryCode.toUpperCase() === 'NG' &&
      Boolean(destination.accountIdentifier) &&
      Boolean(destination.bankCode)
    );
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
        'Paystack only supports NGN/Nigeria bank accounts',
      );
    }

    const existing = await this.findByReference(input.correlationId);
    if (existing) return existing;

    const recipient = await this.ensureRecipient(input.destination);
    const res = await this.http.request<PaystackEnvelope<PaystackTransfer>>('/transfer', {
      method: 'POST',
      body: {
        source: 'balance',
        amount: Number(input.amountMinor),
        recipient,
        reason: input.destination.reference ?? `SalyChain ${input.correlationId}`,
        reference: input.correlationId,
        currency: 'NGN',
      },
      idempotencyKey: input.correlationId,
    });

    if (!res.status) {
      throw ExternalError('chain.fiat.psp_error', res.message ?? 'Paystack transfer rejected');
    }

    return this.toTransfer(res.data, input);
  }

  async getStatus(pspId: string): Promise<FiatTransfer | null> {
    try {
      const res = await this.http.request<PaystackEnvelope<PaystackTransfer>>(
        `/transfer/verify?reference=${encodeURIComponent(pspId)}`,
      );
      if (!res.status) return null;
      return this.toTransferFromVerify(res.data);
    } catch {
      try {
        const byCode = await this.http.request<PaystackEnvelope<PaystackTransfer>>(
          `/transfer/${encodeURIComponent(pspId)}`,
        );
        if (!byCode.status) return null;
        return this.toTransferFromVerify(byCode.data);
      } catch {
        return null;
      }
    }
  }

  async cancel(_pspId: string): Promise<{ canceled: boolean }> {
    return { canceled: false };
  }

  // ───────────────────────────── Pay-in (inbound) ─────────────────────────────

  supportsPayin(input: { currency: string; countryCode: string }): boolean {
    return input.currency.toUpperCase() === 'NGN' && input.countryCode.toUpperCase() === 'NG';
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
        'Paystack pay-in only supports NGN/Nigeria',
      );
    }
    const existing = await this.getPayinStatus(input.correlationId);
    if (existing) return existing;

    // Hosted checkout: the payer is sent to `authorization_url`. The credit is
    // confirmed later via the `charge.success` webhook keyed on `reference`.
    const res = await this.http.request<PaystackEnvelope<PaystackInitTransaction>>(
      '/transaction/initialize',
      {
        method: 'POST',
        body: {
          amount: Number(input.amountMinor),
          currency: 'NGN',
          email: input.customer.email ?? `payin+${input.correlationId}@salychain.dev`,
          reference: input.correlationId,
        },
        idempotencyKey: input.correlationId,
      },
    );
    if (!res.status) {
      throw ExternalError(
        'chain.fiat.psp_error',
        res.message ?? 'Paystack pay-in initialization failed',
      );
    }

    return {
      pspReference: res.data.reference,
      correlationId: input.correlationId,
      method: 'CHECKOUT',
      status: 'PENDING',
      amountMinor: input.amountMinor,
      currency: 'NGN',
      checkoutUrl: res.data.authorization_url,
      createdAt: new Date().toISOString(),
    };
  }

  async getPayinStatus(pspReference: string): Promise<FiatPayinInstruction | null> {
    try {
      const res = await this.http.request<PaystackEnvelope<PaystackVerifyTransaction>>(
        `/transaction/verify/${encodeURIComponent(pspReference)}`,
      );
      if (!res.status) return null;
      const d = res.data;
      const status = PS_PAYIN_STATUS[d.status?.toLowerCase()] ?? 'PENDING';
      return {
        pspReference: d.reference,
        correlationId: d.reference,
        method: 'CHECKOUT',
        status,
        amountMinor: String(d.amount),
        currency: d.currency,
        createdAt: new Date().toISOString(),
        ...(status === 'SETTLED' && d.paid_at ? { settledAt: d.paid_at } : {}),
        ...(status === 'FAILED' && d.gateway_response ? { failureReason: d.gateway_response } : {}),
      };
    } catch {
      return null;
    }
  }

  private async ensureRecipient(dest: FiatDestination): Promise<string> {
    const key = `${dest.bankCode}:${dest.accountIdentifier}`;
    const cached = this.recipientCache.get(key);
    if (cached) return cached;

    const res = await this.http.request<PaystackEnvelope<PaystackRecipient>>('/transferrecipient', {
      method: 'POST',
      body: {
        type: 'nuban',
        name: dest.holderName,
        account_number: dest.accountIdentifier,
        bank_code: dest.bankCode,
        currency: 'NGN',
      },
    });

    if (!res.status) {
      throw ExternalError(
        'chain.fiat.psp_error',
        res.message ?? 'Paystack recipient creation failed',
      );
    }

    this.recipientCache.set(key, res.data.recipient_code);
    return res.data.recipient_code;
  }

  private async findByReference(reference: string): Promise<FiatTransfer | null> {
    try {
      const res = await this.http.request<PaystackEnvelope<PaystackTransfer>>(
        `/transfer/verify?reference=${encodeURIComponent(reference)}`,
      );
      if (!res.status) return null;
      return this.toTransferFromVerify(res.data);
    } catch {
      return null;
    }
  }

  private toTransfer(
    data: PaystackTransfer,
    input: {
      correlationId: string;
      amountMinor: string;
      currency: string;
      destination: FiatDestination;
    },
  ): FiatTransfer {
    const status = PS_STATUS[data.status.toLowerCase()] ?? 'PROCESSING';
    return {
      pspId: data.transfer_code,
      correlationId: input.correlationId,
      rail: input.destination.rail,
      status,
      amountMinor: input.amountMinor,
      currency: input.currency,
      destination: input.destination,
      createdAt: new Date().toISOString(),
      ...(status === 'SETTLED' ? { settledAt: new Date().toISOString() } : {}),
      ...(data.reason ? { failureReason: data.reason } : {}),
    };
  }

  private toTransferFromVerify(data: PaystackTransfer): FiatTransfer {
    const status = PS_STATUS[data.status.toLowerCase()] ?? 'PROCESSING';
    return {
      pspId: data.transfer_code,
      correlationId: data.reference,
      rail: 'NIP',
      status,
      amountMinor: String(data.amount),
      currency: data.currency,
      destination: {
        currency: 'NGN',
        rail: 'NIP',
        accountIdentifier: '',
        holderName: '',
        countryCode: 'NG',
      },
      createdAt: new Date().toISOString(),
      ...(status === 'SETTLED' ? { settledAt: new Date().toISOString() } : {}),
      ...(data.reason ? { failureReason: data.reason } : {}),
    };
  }
}
