import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  custodyAssetAccountCode,
  fiatCustodyAssetAccountCode,
  LedgerReservationService,
  pendingFiatLiabilityAccountCode,
  pendingLiabilityAccountCode,
  walletLiabilityAccountCode,
} from './ledger-reservation.service.js';
import type { LedgerClient, WalletClient } from '@salychain/sdk-internal';

vi.mock('@salychain/config', () => ({
  loadEnv: () => ({ LEDGER_CHAIN_RESERVATION_ENABLED: true }),
}));

describe('ledger account codes (currency-aware)', () => {
  it('maps BASE USDC and WETH pending/custody accounts', () => {
    expect(pendingLiabilityAccountCode('BASE', 'USDC')).toBe('liability.pending.base.usdc');
    expect(pendingLiabilityAccountCode('BASE', 'WETH')).toBe('liability.pending.base.weth');
    expect(pendingLiabilityAccountCode('L3', 'USDC')).toBe('liability.pending.l3.usdc');
    expect(custodyAssetAccountCode('L3', 'USDC')).toBe('asset.custody.l3.usdc');
    expect(custodyAssetAccountCode('BASE', 'WETH')).toBe('asset.custody.base.weth');
  });

  it('builds per-wallet multi-currency liability codes', () => {
    expect(walletLiabilityAccountCode('abc')).toBe('liability.wallet.abc');
    expect(walletLiabilityAccountCode('abc', 'WETH')).toBe('liability.wallet.abc.weth');
  });
});

describe('LedgerReservationService DEX settle', () => {
  let ledger: LedgerClient;
  let wallet: WalletClient;
  let service: LedgerReservationService;

  beforeEach(() => {
    const accounts = new Map<string, { id: string; code: string; currency: string }>();

    ledger = {
      getAccountByCode: vi.fn(async (code: string) => {
        const hit = accounts.get(code);
        if (hit) return { ...hit, type: code.startsWith('asset') ? 'ASSET' : 'LIABILITY', balance_minor: '0', status: 'ACTIVE', created_at: new Date().toISOString() };
        throw new Error('not found');
      }),
      createAccount: vi.fn(async (input) => {
        const row = { id: `acc-${input.code}`, code: input.code, currency: input.currency };
        accounts.set(input.code, row);
        return { ...row, type: input.type, balance_minor: '0', status: 'ACTIVE', created_at: new Date().toISOString() };
      }),
      postJournalEntry: vi.fn(async (input) => ({
        id: `je-${input.idempotencyKey}`,
        idempotency_key: input.idempotencyKey,
        status: 'POSTED',
        posted_at: new Date().toISOString(),
        transaction_id: input.transactionId ?? null,
        memo: input.memo ?? null,
        postings: input.postings.map((p: { account_id: string; direction: string; amount_minor: string; currency: string }, i: number) => ({ id: `p-${i}`, ...p })),
      })),
      reverseJournalEntry: vi.fn(),
    } as unknown as LedgerClient;

    wallet = {
      get: vi.fn(async () => ({
        id: 'wallet-1',
        chain: 'BASE',
        address: '0x1',
        kind: 'BUSINESS_CUSTODIAL',
        status: 'ACTIVE',
        signer_key_ref: 'kms:1',
        ledger_account_id: 'wallet-usdc',
        created_at: new Date().toISOString(),
      })),
      ensureLedgerAccount: vi.fn(),
    } as unknown as WalletClient;

    accounts.set('liability.wallet.wallet-1', { id: 'wallet-usdc', code: 'liability.wallet.wallet-1', currency: 'USDC' });

    service = new LedgerReservationService(ledger, wallet);
  });

  it('posts four-leg DEX settle journal (source out, output in)', async () => {
    const entryId = await service.settleDexSwap({
      txId: 'tx-dex-1',
      walletId: 'wallet-1',
      tokenIn: 'USDC',
      tokenOut: 'WETH',
      amountInMinor: '1000000',
      amountOutMinor: '300000000000000',
    });

    expect(entryId).toBe('je-exec:tx-dex-1:settle-dex');
    expect(ledger.postJournalEntry).toHaveBeenCalledWith(
      expect.objectContaining({
        postings: expect.arrayContaining([
          expect.objectContaining({ direction: 'DEBIT', currency: 'USDC' }),
          expect.objectContaining({ direction: 'CREDIT', currency: 'USDC' }),
          expect.objectContaining({ direction: 'DEBIT', currency: 'WETH' }),
          expect.objectContaining({ direction: 'CREDIT', currency: 'WETH' }),
        ]),
      }),
    );
  });

  it('posts fiat settle journal (pending → custody)', async () => {
    const entryId = await service.settleFiatPayout({
      id: 'tx-fiat-1',
      amountMinor: 500000n,
      currency: 'NGN',
    });

    expect(entryId).toBe('je-exec:tx-fiat-1:settle-fiat');
    expect(pendingFiatLiabilityAccountCode('NGN')).toBe('liability.pending.fiat.ngn');
    expect(fiatCustodyAssetAccountCode('NGN')).toBe('asset.custody.fiat.ngn');
    expect(ledger.postJournalEntry).toHaveBeenCalledWith(
      expect.objectContaining({
        postings: expect.arrayContaining([
          expect.objectContaining({ direction: 'DEBIT', currency: 'NGN' }),
          expect.objectContaining({ direction: 'CREDIT', currency: 'NGN' }),
        ]),
      }),
    );
  });
});
