import type { ParsedFiatPayin, ParsedFiatWebhook } from '@salychain/chain-fiat';
import { createLogger } from '@salychain/logger';
import { env } from './config.js';

const logger = createLogger({ service: 'fiat-listener' });

export interface ExecutionConfirmResult {
  ok: boolean;
  applied?: boolean;
  reason?: string;
}

export class ExecutionClient {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(baseUrl = env.EXECUTION_BASE_URL, token = env.EXECUTION_INTERNAL_WEBHOOK_TOKEN) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.token = token;
  }

  private headers(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
      ...(env.INTERNAL_SERVICE_TOKEN ? { 'x-internal-token': env.INTERNAL_SERVICE_TOKEN } : {}),
    };
  }

  async confirmSettlement(event: ParsedFiatWebhook): Promise<ExecutionConfirmResult> {
    const res = await fetch(`${this.baseUrl}/v1/internal/fiat/confirmations`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        tx_id: event.txId,
        psp_id: event.pspId,
        outcome: event.outcome,
        reason: event.failureReason,
        settled_at: event.settledAt,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      logger.error(`execution confirm failed (${res.status}): ${text}`);
      throw new Error(`execution confirm failed: ${res.status}`);
    }

    return (await res.json()) as ExecutionConfirmResult;
  }

  async confirmPayin(event: ParsedFiatPayin): Promise<ExecutionConfirmResult> {
    const res = await fetch(`${this.baseUrl}/v1/internal/fiat/payins`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        reference: event.reference,
        psp_reference: event.pspReference,
        outcome: event.outcome,
        amount_minor: event.amountMinor,
        currency: event.currency,
        provider: event.provider,
        reason: event.failureReason,
        settled_at: event.settledAt,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      logger.error(`execution pay-in confirm failed (${res.status}): ${text}`);
      throw new Error(`execution pay-in confirm failed: ${res.status}`);
    }

    return (await res.json()) as ExecutionConfirmResult;
  }
}
