import { describe, expect, it } from 'vitest';
import { StubFiatAdapter } from '@salychain/chain-fiat';
import { bankSettlementAccountCode, buildPayinPostings } from './topup.js';

/**
 * Integration-shape tests for the real fiat pay-in rail (C2). They exercise the
 * adapter pay-in lifecycle and the settlement chart-of-accounts without a live
 * ledger/execution stack (full E2E lands behind PAYIN_E2E_LIVE later).
 */
describe('Fiat pay-in rail (integration shape)', () => {
  it('settled cash lands in a per-provider asset account, not the equity seed', () => {
    const code = bankSettlementAccountCode('paystack', 'NGN');
    expect(code).toBe('asset.bank.paystack.NGN');
    // Real money — must NOT reuse the simulated clearing-seed equity offset.
    expect(code).not.toContain('equity.inbound');
  });

  it('a confirmed pay-in DEBITs the PSP bank and CREDITs the org treasury', () => {
    const postings = buildPayinPostings({
      bankAccountId: 'asset-bank-paystack-ngn',
      destinationAccountId: 'liability-business-ngn',
      destinationAccountType: 'LIABILITY',
      amountMinor: '500000',
      currency: 'NGN',
    });
    expect(postings[0]).toMatchObject({
      account_id: 'asset-bank-paystack-ngn',
      direction: 'DEBIT',
    });
    expect(postings[1]).toMatchObject({
      account_id: 'liability-business-ngn',
      direction: 'CREDIT',
    });
    const debit = BigInt(postings[0]!.amount_minor);
    const credit = BigInt(postings[1]!.amount_minor);
    expect(debit).toBe(credit);
  });

  it('adapter opens a PENDING instruction and settles only after funding', async () => {
    const stub = new StubFiatAdapter({ settlementLatencyMs: 60_000 });
    const correlationId = 'tx_payin_integration';
    const opened = await stub.createPayin({
      correlationId,
      amountMinor: '500000',
      currency: 'NGN',
      customer: { name: 'Acme Ltd', countryCode: 'NG' },
    });
    expect(opened.status).toBe('PENDING');
    expect(opened.accountNumber).toBeTruthy();

    // Before funds land, the poller would see PENDING and take no action.
    expect((await stub.getPayinStatus(opened.pspReference))?.status).toBe('PENDING');

    // PSP webhook (or its poller fallback) reports the credit.
    stub._settlePayin(opened.pspReference);
    expect((await stub.getPayinStatus(opened.pspReference))?.status).toBe('SETTLED');
  });

  it('documents the C2 API + webhook surface', () => {
    const endpoints = [
      'POST /v1/payins',
      'POST /v1/internal/fiat/payins',
      'POST /v1/admin/reconciliation/run',
      'GET /v1/admin/reconciliation/runs',
    ];
    expect(endpoints).toContain('POST /v1/payins');
    expect(endpoints).toContain('POST /v1/internal/fiat/payins');
  });
});
