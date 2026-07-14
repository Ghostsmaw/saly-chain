import { Inject, Injectable, Logger } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { LedgerClient, WalletClient } from '@salychain/sdk-internal';
import type { ExecutionTransaction, ExecutionTransactionKind } from '../generated/prisma/index.js';
import { LEDGER_CLIENT, WALLET_CLIENT } from '../clients/clients.module.js';
import { executionEnvSchema } from '../config/env.js';

export type ChainReservationRail = 'BASE' | 'XRPL' | 'L3' | 'ESCROW';

export interface ReserveChainPayoutInput {
  txId: string;
  kind: ExecutionTransactionKind;
  walletId: string;
  amountMinor: string;
  currency: string;
  rail: ChainReservationRail;
}

export interface DexSettleInput {
  txId: string;
  walletId: string;
  tokenIn: string;
  tokenOut: string;
  amountInMinor: string;
  amountOutMinor: string;
}

/** Stable system account codes for chain payout reservation / settlement. */
export function pendingLiabilityAccountCode(rail: ChainReservationRail, currency = 'USDC'): string {
  const ccy = currency.toLowerCase();
  if (rail === 'XRPL') return 'liability.pending.xrpl.xrp';
  if (rail === 'L3') return `liability.pending.l3.${ccy}`;
  return `liability.pending.base.${ccy}`;
}

export function custodyAssetAccountCode(rail: ChainReservationRail, currency = 'USDC'): string {
  const ccy = currency.toLowerCase();
  if (rail === 'XRPL') return 'asset.custody.xrpl.xrp';
  if (rail === 'L3') return `asset.custody.l3.${ccy}`;
  return `asset.custody.base.${ccy}`;
}

export function walletLiabilityAccountCode(walletId: string, currency?: string): string {
  const base = `liability.wallet.${walletId}`;
  if (!currency) return base;
  const ccy = currency.toLowerCase();
  if (ccy === 'usdc') return base;
  return `${base}.${ccy}`;
}

/** Pending liability while a fiat PSP transfer is in flight. */
export function pendingFiatLiabilityAccountCode(currency: string): string {
  return `liability.pending.fiat.${currency.toLowerCase()}`;
}

/** Custody asset representing funds sent to / held at PSP balance. */
export function fiatCustodyAssetAccountCode(currency: string): string {
  return `asset.custody.fiat.${currency.toLowerCase()}`;
}

export interface ReserveFiatPayoutInput {
  txId: string;
  sourceAccountId: string;
  amountMinor: string;
  currency: string;
}

export type BridgeDirection = 'base_to_l3' | 'l3_to_base';

/** Pending liability while bridge transfer is in flight. */
export function pendingBridgeLiabilityAccountCode(
  direction: BridgeDirection,
  currency = 'USDC',
): string {
  return `liability.pending.bridge.${direction}.${currency.toLowerCase()}`;
}

/** Bridge custody asset on Base or L3 settlement side. */
export function bridgeCustodyAssetAccountCode(
  side: 'base' | 'l3',
  currency = 'USDC',
): string {
  return `asset.custody.bridge.${side}.${currency.toLowerCase()}`;
}

/** Off-chain reserve backing SalySD circulation (Milestone D5). */
export function salysdReserveAssetAccountCode(): string {
  return 'asset.reserve.salysd';
}

/** Pending liability while SalySD redeem burn is in flight. */
export function pendingSalysdRedeemAccountCode(): string {
  return 'liability.pending.salysd.redeem';
}

export function reservationRailForTx(tx: Pick<ExecutionTransaction, 'kind' | 'selectedRail'>): ChainReservationRail {
  if (tx.kind === 'XRPL_PAYOUT') return 'XRPL';
  if (tx.kind === 'L3_PAYOUT') return 'L3';
  if (tx.kind === 'ESCROW_PAYOUT') return 'ESCROW';
  if (tx.kind === 'DEX_SWAP') return 'BASE';
  if (tx.selectedRail === 'XRPL') return 'XRPL';
  if (tx.selectedRail === 'L3') return 'L3';
  if (tx.selectedRail === 'ESCROW') return 'ESCROW';
  return 'BASE';
}

/**
 * Posts double-entry journals for chain payout reservation lifecycle:
 *
 *   Reserve (before broadcast):
 *     DR liability.wallet.{walletId}
 *     CR liability.pending.{rail}.{currency}
 *
 *   Settle (on-chain confirmation, single-asset payout):
 *     DR liability.pending.{rail}.{currency}
 *     CR asset.custody.{rail}.{currency}
 *
 *   Settle DEX swap (cross-asset):
 *     DR liability.pending.{source}
 *     CR asset.custody.{source}
 *     DR asset.custody.{output}
 *     CR liability.wallet.{walletId}.{output}
 *
 *   Release (failure): reverse the reserve entry.
 */
@Injectable()
export class LedgerReservationService {
  private readonly logger = new Logger(LedgerReservationService.name);
  private readonly enabled: boolean;

  constructor(
    @Inject(LEDGER_CLIENT) private readonly ledger: LedgerClient,
    @Inject(WALLET_CLIENT) private readonly wallet: WalletClient,
  ) {
    const env = loadEnv(executionEnvSchema);
    this.enabled = env.LEDGER_CHAIN_RESERVATION_ENABLED;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  async reserveChainPayout(input: ReserveChainPayoutInput): Promise<string | undefined> {
    if (!this.enabled) return undefined;

    const walletAccountId = await this.resolveWalletLiabilityAccountId(
      input.walletId,
      input.currency,
    );
    const pending = await this.ensureSystemAccount(
      pendingLiabilityAccountCode(input.rail, input.currency),
      'LIABILITY',
      input.currency,
      'pending',
    );

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${input.txId}:reserve`,
      transactionId: input.txId,
      memo: `Chain payout reserve (${input.rail} ${input.currency})`,
      metadata: { tx_id: input.txId, kind: input.kind, rail: input.rail, phase: 'reserve' },
      postings: [
        {
          account_id: walletAccountId,
          direction: 'DEBIT',
          amount_minor: input.amountMinor,
          currency: input.currency,
        },
        {
          account_id: pending.id,
          direction: 'CREDIT',
          amount_minor: input.amountMinor,
          currency: input.currency,
        },
      ],
    });

    this.logger.debug(`reserved ${input.amountMinor} ${input.currency} for tx ${input.txId} → ${journal.id}`);
    return journal.id;
  }

  /** Reserve ledger funds before initiating a fiat PSP transfer. */
  async reserveFiatPayout(input: ReserveFiatPayoutInput): Promise<string | undefined> {
    if (!this.enabled) return undefined;

    const pending = await this.ensureSystemAccount(
      pendingFiatLiabilityAccountCode(input.currency),
      'LIABILITY',
      input.currency,
      'fiat_pending',
    );

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${input.txId}:reserve-fiat`,
      transactionId: input.txId,
      memo: `Fiat payout reserve (${input.currency})`,
      metadata: { tx_id: input.txId, kind: 'FIAT_PAYOUT', phase: 'reserve' },
      postings: [
        {
          account_id: input.sourceAccountId,
          direction: 'DEBIT',
          amount_minor: input.amountMinor,
          currency: input.currency,
        },
        {
          account_id: pending.id,
          direction: 'CREDIT',
          amount_minor: input.amountMinor,
          currency: input.currency,
        },
      ],
    });

    this.logger.debug(`fiat reserved ${input.amountMinor} ${input.currency} for tx ${input.txId} → ${journal.id}`);
    return journal.id;
  }

  async settleChainPayout(tx: ExecutionTransaction): Promise<string | undefined> {
    if (!this.enabled || !tx.ledgerEntryId) return undefined;

    const rail = reservationRailForTx(tx);
    const currency = tx.currency;
    const pending = await this.ensureSystemAccount(
      pendingLiabilityAccountCode(rail, currency),
      'LIABILITY',
      currency,
      'pending',
    );
    const custody = await this.ensureSystemAccount(
      custodyAssetAccountCode(rail, currency),
      'ASSET',
      currency,
      'custody',
    );
    const amountMinor = tx.amountMinor.toString();

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${tx.id}:settle`,
      transactionId: tx.id,
      memo: `Chain payout settle (${rail} ${currency})`,
      metadata: { tx_id: tx.id, kind: tx.kind, rail, phase: 'settle', reserve_entry_id: tx.ledgerEntryId },
      postings: [
        {
          account_id: pending.id,
          direction: 'DEBIT',
          amount_minor: amountMinor,
          currency,
        },
        {
          account_id: custody.id,
          direction: 'CREDIT',
          amount_minor: amountMinor,
          currency,
        },
      ],
    });

    this.logger.debug(`settled tx ${tx.id} on ledger → ${journal.id}`);
    return journal.id;
  }

  /** Consume fiat pending liability into PSP custody on PSP settlement. */
  async settleFiatPayout(tx: Pick<ExecutionTransaction, 'id' | 'amountMinor' | 'currency'>): Promise<string | undefined> {
    if (!this.enabled) return undefined;

    const currency = tx.currency;
    const pending = await this.ensureSystemAccount(
      pendingFiatLiabilityAccountCode(currency),
      'LIABILITY',
      currency,
      'fiat_pending',
    );
    const custody = await this.ensureSystemAccount(
      fiatCustodyAssetAccountCode(currency),
      'ASSET',
      currency,
      'fiat_custody',
    );
    const amountMinor = tx.amountMinor.toString();

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${tx.id}:settle-fiat`,
      transactionId: tx.id,
      memo: `Fiat payout settle (${currency})`,
      metadata: { tx_id: tx.id, kind: 'FIAT_PAYOUT', phase: 'settle' },
      postings: [
        {
          account_id: pending.id,
          direction: 'DEBIT',
          amount_minor: amountMinor,
          currency,
        },
        {
          account_id: custody.id,
          direction: 'CREDIT',
          amount_minor: amountMinor,
          currency,
        },
      ],
    });

    this.logger.debug(`fiat settled tx ${tx.id} → ${journal.id}`);
    return journal.id;
  }

  /** Cross-asset DEX settlement: consume source from pending→custody, credit output to wallet. */
  async settleDexSwap(input: DexSettleInput): Promise<string | undefined> {
    if (!this.enabled) return undefined;

    const tokenIn = input.tokenIn.toUpperCase();
    const tokenOut = input.tokenOut.toUpperCase();
    const rail: ChainReservationRail = 'BASE';

    const pendingIn = await this.ensureSystemAccount(
      pendingLiabilityAccountCode(rail, tokenIn),
      'LIABILITY',
      tokenIn,
      'pending',
    );
    const custodyIn = await this.ensureSystemAccount(
      custodyAssetAccountCode(rail, tokenIn),
      'ASSET',
      tokenIn,
      'custody',
    );
    const custodyOut = await this.ensureSystemAccount(
      custodyAssetAccountCode(rail, tokenOut),
      'ASSET',
      tokenOut,
      'custody',
    );
    const walletOutId = await this.resolveWalletLiabilityAccountId(input.walletId, tokenOut);

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${input.txId}:settle-dex`,
      transactionId: input.txId,
      memo: `DEX swap settle ${tokenIn}→${tokenOut}`,
      metadata: {
        tx_id: input.txId,
        kind: 'DEX_SWAP',
        phase: 'settle',
        token_in: tokenIn,
        token_out: tokenOut,
      },
      postings: [
        {
          account_id: pendingIn.id,
          direction: 'DEBIT',
          amount_minor: input.amountInMinor,
          currency: tokenIn,
        },
        {
          account_id: custodyIn.id,
          direction: 'CREDIT',
          amount_minor: input.amountInMinor,
          currency: tokenIn,
        },
        {
          account_id: custodyOut.id,
          direction: 'DEBIT',
          amount_minor: input.amountOutMinor,
          currency: tokenOut,
        },
        {
          account_id: walletOutId,
          direction: 'CREDIT',
          amount_minor: input.amountOutMinor,
          currency: tokenOut,
        },
      ],
    });

    this.logger.debug(`DEX settled tx ${input.txId} → ${journal.id}`);
    return journal.id;
  }

  /** Base leg observed: move value into bridge custody pending L3 credit. */
  async recordBridgeBaseLeg(input: {
    txId: string;
    amountMinor: string;
    currency: string;
    direction?: BridgeDirection;
  }): Promise<string | undefined> {
    if (!this.enabled) return undefined;

    const direction = input.direction ?? 'base_to_l3';
    const currency = input.currency;
    const pending = await this.ensureSystemAccount(
      pendingBridgeLiabilityAccountCode(direction, currency),
      'LIABILITY',
      currency,
      'bridge-pending',
    );
    const custody = await this.ensureSystemAccount(
      bridgeCustodyAssetAccountCode('base', currency),
      'ASSET',
      currency,
      'bridge-custody',
    );

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${input.txId}:bridge-base`,
      transactionId: input.txId,
      memo: `Bridge Base leg (${direction})`,
      metadata: { tx_id: input.txId, phase: 'base_leg', direction },
      postings: [
        { account_id: custody.id, direction: 'DEBIT', amount_minor: input.amountMinor, currency },
        { account_id: pending.id, direction: 'CREDIT', amount_minor: input.amountMinor, currency },
      ],
    });

    return journal.id;
  }

  /**
   * L3 withdrawal initiated: consume L3 payout reserve into bridge pending liability.
   * DR liability.pending.l3 → CR liability.pending.bridge.l3_to_base
   */
  async recordBridgeL3Leg(input: {
    txId: string;
    amountMinor: string;
    currency: string;
    direction?: BridgeDirection;
  }): Promise<string | undefined> {
    if (!this.enabled) return undefined;

    const direction = input.direction ?? 'l3_to_base';
    const currency = input.currency;
    const l3Pending = await this.ensureSystemAccount(
      pendingLiabilityAccountCode('L3', currency),
      'LIABILITY',
      currency,
      'pending',
    );
    const bridgePending = await this.ensureSystemAccount(
      pendingBridgeLiabilityAccountCode(direction, currency),
      'LIABILITY',
      currency,
      'bridge-pending',
    );

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${input.txId}:bridge-l3`,
      transactionId: input.txId,
      memo: `Bridge L3 leg (${direction})`,
      metadata: { tx_id: input.txId, phase: 'l3_leg', direction },
      postings: [
        { account_id: l3Pending.id, direction: 'DEBIT', amount_minor: input.amountMinor, currency },
        {
          account_id: bridgePending.id,
          direction: 'CREDIT',
          amount_minor: input.amountMinor,
          currency,
        },
      ],
    });

    return journal.id;
  }

  /** Base credit observed: release bridge pending to wallet or external custody exit. */
  async settleBridgeToBase(input: {
    txId: string;
    amountMinor: string;
    currency: string;
    destinationWalletId?: string;
    direction?: BridgeDirection;
  }): Promise<string | undefined> {
    if (!this.enabled) return undefined;

    const direction = input.direction ?? 'l3_to_base';
    const currency = input.currency;
    const pending = await this.ensureSystemAccount(
      pendingBridgeLiabilityAccountCode(direction, currency),
      'LIABILITY',
      currency,
      'bridge-pending',
    );

    const creditAccountId = input.destinationWalletId
      ? await this.resolveWalletLiabilityAccountId(input.destinationWalletId, currency)
      : (
          await this.ensureSystemAccount(
            custodyAssetAccountCode('BASE', currency),
            'ASSET',
            currency,
            'custody',
          )
        ).id;

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${input.txId}:bridge-base-credit`,
      transactionId: input.txId,
      memo: `Bridge Base credit (${direction})`,
      metadata: {
        tx_id: input.txId,
        phase: 'base_credit',
        direction,
        external: !input.destinationWalletId,
      },
      postings: [
        { account_id: pending.id, direction: 'DEBIT', amount_minor: input.amountMinor, currency },
        {
          account_id: creditAccountId,
          direction: 'CREDIT',
          amount_minor: input.amountMinor,
          currency,
        },
      ],
    });

    return journal.id;
  }

  /** L3 credit observed: release bridge pending into destination wallet liability. */
  async settleBridgeToL3Wallet(input: {
    txId: string;
    destinationWalletId: string;
    amountMinor: string;
    currency: string;
    direction?: BridgeDirection;
  }): Promise<string | undefined> {
    if (!this.enabled) return undefined;

    const direction = input.direction ?? 'base_to_l3';
    const currency = input.currency;
    const pending = await this.ensureSystemAccount(
      pendingBridgeLiabilityAccountCode(direction, currency),
      'LIABILITY',
      currency,
      'bridge-pending',
    );
    const walletId = await this.resolveWalletLiabilityAccountId(input.destinationWalletId, currency);

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${input.txId}:bridge-l3-credit`,
      transactionId: input.txId,
      memo: `Bridge L3 credit (${direction})`,
      metadata: { tx_id: input.txId, phase: 'l3_credit', direction },
      postings: [
        { account_id: pending.id, direction: 'DEBIT', amount_minor: input.amountMinor, currency },
        { account_id: walletId, direction: 'CREDIT', amount_minor: input.amountMinor, currency },
      ],
    });

    return journal.id;
  }

  /**
   * SalySD mint confirmed on-chain:
   *   DR asset.reserve.salysd
   *   CR liability.wallet.{destination}
   */
  async settleSalysdMint(input: {
    txId: string;
    destinationWalletId: string;
    amountMinor: string;
  }): Promise<string | undefined> {
    if (!this.enabled) return undefined;

    const currency = 'SALYSD';
    const reserve = await this.ensureSystemAccount(
      salysdReserveAssetAccountCode(),
      'ASSET',
      currency,
      'salysd-reserve',
    );
    const walletId = await this.resolveWalletLiabilityAccountId(input.destinationWalletId, currency);

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${input.txId}:salysd-mint-settle`,
      transactionId: input.txId,
      memo: 'SalySD mint settle',
      metadata: { tx_id: input.txId, kind: 'SALYSD_MINT', phase: 'settle' },
      postings: [
        { account_id: reserve.id, direction: 'DEBIT', amount_minor: input.amountMinor, currency },
        { account_id: walletId, direction: 'CREDIT', amount_minor: input.amountMinor, currency },
      ],
    });

    return journal.id;
  }

  /**
   * Reserve custodial SalySD before burn broadcast:
   *   DR liability.wallet.{source}
   *   CR liability.pending.salysd.redeem
   */
  async reserveSalysdRedeem(input: {
    txId: string;
    walletId: string;
    amountMinor: string;
  }): Promise<string | undefined> {
    if (!this.enabled) return undefined;

    const currency = 'SALYSD';
    const walletAccountId = await this.resolveWalletLiabilityAccountId(input.walletId, currency);
    const pending = await this.ensureSystemAccount(
      pendingSalysdRedeemAccountCode(),
      'LIABILITY',
      currency,
      'salysd-redeem-pending',
    );

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${input.txId}:salysd-redeem-reserve`,
      transactionId: input.txId,
      memo: 'SalySD redeem reserve',
      metadata: { tx_id: input.txId, kind: 'SALYSD_REDEEM', phase: 'reserve' },
      postings: [
        { account_id: walletAccountId, direction: 'DEBIT', amount_minor: input.amountMinor, currency },
        { account_id: pending.id, direction: 'CREDIT', amount_minor: input.amountMinor, currency },
      ],
    });

    return journal.id;
  }

  /**
   * SalySD burn confirmed — unwind pending into reserve asset:
   *   DR liability.pending.salysd.redeem
   *   CR asset.reserve.salysd
   */
  async settleSalysdRedeem(input: { txId: string; amountMinor: string }): Promise<string | undefined> {
    if (!this.enabled) return undefined;

    const currency = 'SALYSD';
    const pending = await this.ensureSystemAccount(
      pendingSalysdRedeemAccountCode(),
      'LIABILITY',
      currency,
      'salysd-redeem-pending',
    );
    const reserve = await this.ensureSystemAccount(
      salysdReserveAssetAccountCode(),
      'ASSET',
      currency,
      'salysd-reserve',
    );

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${input.txId}:salysd-redeem-settle`,
      transactionId: input.txId,
      memo: 'SalySD redeem settle',
      metadata: { tx_id: input.txId, kind: 'SALYSD_REDEEM', phase: 'settle' },
      postings: [
        { account_id: pending.id, direction: 'DEBIT', amount_minor: input.amountMinor, currency },
        { account_id: reserve.id, direction: 'CREDIT', amount_minor: input.amountMinor, currency },
      ],
    });

    return journal.id;
  }

  async releaseChainReservation(txId: string, reserveEntryId: string): Promise<string | undefined> {
    if (!this.enabled) return undefined;

    const reversal = await this.ledger.reverseJournalEntry(reserveEntryId, {
      idempotencyKey: `exec:${txId}:release`,
      memo: `Release chain payout reservation for tx ${txId}`,
    });

    this.logger.debug(`released reserve ${reserveEntryId} for tx ${txId} → ${reversal.id}`);
    return reversal.id;
  }

  /** Reverse a prior chain settlement journal (reorg-safe unwind). */
  async reverseChainSettlement(txId: string, settleEntryId: string): Promise<string | undefined> {
    if (!this.enabled) return undefined;

    const reversal = await this.ledger.reverseJournalEntry(settleEntryId, {
      idempotencyKey: `exec:${txId}:reorg-reverse`,
      memo: `Reverse chain settlement due to reorg for tx ${txId}`,
    });

    this.logger.debug(`reversed settle ${settleEntryId} for tx ${txId} → ${reversal.id}`);
    return reversal.id;
  }

  private async ensureSystemAccount(
    code: string,
    type: 'ASSET' | 'LIABILITY',
    currency: string,
    role: string,
  ) {
    try {
      return await this.ledger.getAccountByCode(code);
    } catch {
      return this.ledger.createAccount({
        code,
        type,
        currency: currency.toUpperCase(),
        ownerKind: 'SYSTEM',
        ownerId: 'treasury-custody',
        metadata: { role },
      });
    }
  }

  private async resolveWalletLiabilityAccountId(walletId: string, currency: string): Promise<string> {
    const code = walletLiabilityAccountCode(walletId, currency);
    try {
      const existing = await this.ledger.getAccountByCode(code);
      return existing.id;
    } catch {
      // fall through to ensure via wallet service for primary USDC account
    }

    let dto = await this.wallet.get(walletId);
    if (!dto.ledger_account_id && currency.toUpperCase() === ledgerCurrencyForWallet(dto.chain)) {
      dto = await this.wallet.ensureLedgerAccount(walletId);
      if (dto.ledger_account_id) return dto.ledger_account_id;
    }

    const created = await this.ledger.createAccount({
      code,
      type: 'LIABILITY',
      currency: currency.toUpperCase(),
      ownerId: dto.owner_id ?? walletId,
      ownerKind: dto.owner_kind ?? 'WALLET',
      metadata: { wallet_id: walletId, chain: dto.chain },
    });
    return created.id;
  }
}

function ledgerCurrencyForWallet(chain: string): string | null {
  switch (chain) {
    case 'BASE':
      return 'USDC';
    case 'XRPL':
      return 'XRP';
    default:
      return null;
  }
}
