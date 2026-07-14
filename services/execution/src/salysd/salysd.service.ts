import { Inject, Injectable, Logger } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { L3ChainAdapter, resolveSalysdAddress, type L3Network } from '@salychain/chain-l3';
import { inferFiatRail, type FiatAdapter, type FiatDestination } from '@salychain/chain-fiat';
import { EventBus, SUBJECTS } from '@salychain/events';
import { getTenantOrgId, LedgerClient, WalletClient } from '@salychain/sdk-internal';
import { NotFoundError, ValidationError } from '@salychain/errors';
import type { Address } from 'viem';
import { ulid } from 'ulid';
import type {
  ExecutionTransaction,
  ExecutionTransactionState,
} from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { WALLET_CLIENT, LEDGER_CLIENT } from '../clients/clients.module.js';
import { EVENT_BUS } from '../events/events.module.js';
import { FIAT_ADAPTER } from '../fiat/fiat.module.js';
import { LedgerReservationService } from '../ledger/ledger-reservation.service.js';
import { executionEnvSchema } from '../config/env.js';
import { assertTransition } from '../state/state-machine.js';
import { SalysdMintDto, SalysdRedeemDto, SalysdRedeemFiatPayoutDto } from './dto.js';
import {
  toResponse,
  type TransactionWithEvents,
} from '../transactions/transactions.service.js';

type SalysdMetadata = {
  mint_request_id?: string;
  redeem_request_id?: string;
  salysd_token?: string;
  destination_wallet_id?: string;
  source_wallet_id?: string;
  salysd_redeem_fiat?: boolean;
};

const APPROVE_POLL_MS = 500;
const APPROVE_POLL_MAX = 60;

@Injectable()
export class SalysdService {
  private readonly logger = new Logger(SalysdService.name);
  private readonly env = loadEnv(executionEnvSchema);
  private readonly l3: L3ChainAdapter;

  constructor(
    private readonly prisma: PrismaService,
    @Inject(WALLET_CLIENT) private readonly wallet: WalletClient,
    @Inject(LEDGER_CLIENT) private readonly ledgerClient: LedgerClient,
    @Inject(FIAT_ADAPTER) private readonly fiat: FiatAdapter,
    @Inject(EVENT_BUS) private readonly events: EventBus,
    private readonly ledgerReservation: LedgerReservationService,
  ) {
    this.l3 = new L3ChainAdapter({
      l3Network: this.env.L3_NETWORK as L3Network,
    });
  }

  async createMint(dto: SalysdMintDto): Promise<TransactionWithEvents> {
    const existing = await this.findByIdempotencyKey(dto.idempotency_key);
    if (existing) return existing;

    const minterId = this.env.SALYSD_MINTER_WALLET_ID;
    if (!minterId) {
      throw ValidationError('execution.salysd.minter_unconfigured', 'SALYSD_MINTER_WALLET_ID not configured');
    }

    const dest = await this.wallet.get(dto.destination_wallet_id);
    if (dest.chain !== 'SALY_L3') {
      throw ValidationError('execution.salysd.invalid_destination', 'destination wallet must be on SALY_L3');
    }

    const token = resolveSalysdAddress(this.env.L3_NETWORK as L3Network, process.cwd());
    if (!token) {
      throw ValidationError('execution.salysd.token_unconfigured', 'L3_SALYSD_ADDRESS not configured');
    }

    const tx = await this.prisma.executionTransaction.create({
      data: {
        idempotencyKey: dto.idempotency_key,
        orgId: getTenantOrgId() ?? null,
        kind: 'SALYSD_MINT',
        state: 'CREATED',
        sourceWalletId: minterId,
        destinationWalletId: dto.destination_wallet_id,
        destinationAddress: dest.address,
        destinationChain: 'SALY_L3',
        amountMinor: BigInt(dto.amount_minor),
        currency: 'SALYSD',
        asset: 'SALYSD',
        memo: dto.memo ?? null,
        selectedRail: 'L3',
        metadata: {
          mint_request_id: dto.mint_request_id,
          salysd_token: token,
          destination_wallet_id: dto.destination_wallet_id,
        } satisfies SalysdMetadata,
      },
    });
    await this.recordEvent(tx.id, null, 'CREATED');

    try {
      await this.transition(tx.id, 'SCREENED');
      await this.transition(tx.id, 'ROUTED');

      const transfer = await this.wallet.transfer({
        walletId: minterId,
        destinationAddress: dest.address,
        amountMinor: dto.amount_minor,
        asset: 'SALYSD',
        idempotencyKey: `exec:${tx.id}:salysd-mint`,
        memo: dto.memo ?? `SalySD mint → ${dest.address}`,
        kind: 'SALYSD_MINT',
        salysdPayload: { token, counterparty: dest.address },
      });

      await this.transition(tx.id, 'EXECUTING', { broadcastJobId: transfer.id });
      await this.transition(tx.id, 'AWAITING_CONFIRMATION', {
        broadcastJobId: transfer.id,
        txHash: transfer.tx_hash ?? undefined,
      });

      await this.publish(SUBJECTS.TX_EXECUTING, {
        transaction_id: tx.id,
        kind: 'SALYSD_MINT',
        broadcast_id: transfer.id,
      });

      return this.fetchWithEvents(tx.id);
    } catch (err) {
      await this.fail(tx.id, err);
      throw err;
    }
  }

  async createRedeem(dto: SalysdRedeemDto): Promise<TransactionWithEvents> {
    const existing = await this.findByIdempotencyKey(dto.idempotency_key);
    if (existing) return existing;

    const burnerId = this.env.SALYSD_BURNER_WALLET_ID;
    if (!burnerId) {
      throw ValidationError('execution.salysd.burner_unconfigured', 'SALYSD_BURNER_WALLET_ID not configured');
    }

    const source = await this.wallet.get(dto.source_wallet_id);
    if (source.chain !== 'SALY_L3') {
      throw ValidationError('execution.salysd.invalid_source', 'source wallet must be on SALY_L3');
    }

    const burner = await this.wallet.get(burnerId);
    const token = resolveSalysdAddress(this.env.L3_NETWORK as L3Network, process.cwd());
    if (!token) {
      throw ValidationError('execution.salysd.token_unconfigured', 'L3_SALYSD_ADDRESS not configured');
    }

    const tx = await this.prisma.executionTransaction.create({
      data: {
        idempotencyKey: dto.idempotency_key,
        orgId: getTenantOrgId() ?? null,
        kind: 'SALYSD_REDEEM',
        state: 'CREATED',
        sourceWalletId: dto.source_wallet_id,
        destinationAddress: token,
        destinationChain: 'SALY_L3',
        amountMinor: BigInt(dto.amount_minor),
        currency: 'SALYSD',
        asset: 'SALYSD',
        memo: dto.memo ?? null,
        selectedRail: 'L3',
        metadata: {
          redeem_request_id: dto.redeem_request_id,
          salysd_token: token,
          source_wallet_id: dto.source_wallet_id,
        } satisfies SalysdMetadata,
      },
    });
    await this.recordEvent(tx.id, null, 'CREATED');

    try {
      await this.transition(tx.id, 'SCREENED');
      await this.transition(tx.id, 'ROUTED');

      const reserveEntryId = await this.ledgerReservation.reserveSalysdRedeem({
        txId: tx.id,
        walletId: dto.source_wallet_id,
        amountMinor: dto.amount_minor,
      });
      if (reserveEntryId) {
        await this.transition(tx.id, 'RESERVED', { ledgerEntryId: reserveEntryId });
      }

      const allowance = await this.l3.getAllowance({
        owner: source.address as Address,
        spender: burner.address as Address,
        token: token as Address,
      });
      if (allowance < BigInt(dto.amount_minor)) {
        const approve = await this.wallet.transfer({
          walletId: dto.source_wallet_id,
          destinationAddress: token,
          amountMinor: dto.amount_minor,
          asset: 'SALYSD',
          idempotencyKey: `exec:${tx.id}:salysd-approve`,
          memo: `SalySD approve burner for redeem`,
          kind: 'SALYSD_APPROVE',
          salysdPayload: { token, spender: burner.address },
        });
        await this.waitForSubmitted(approve.id);
      }

      const transfer = await this.wallet.transfer({
        walletId: burnerId,
        destinationAddress: token,
        amountMinor: dto.amount_minor,
        asset: 'SALYSD',
        idempotencyKey: `exec:${tx.id}:salysd-redeem`,
        memo: dto.memo ?? `SalySD redeem burn ← ${source.address}`,
        kind: 'SALYSD_REDEEM',
        salysdPayload: { token, holder: source.address },
      });

      await this.transition(tx.id, 'EXECUTING', { broadcastJobId: transfer.id });
      await this.transition(tx.id, 'AWAITING_CONFIRMATION', {
        broadcastJobId: transfer.id,
        txHash: transfer.tx_hash ?? undefined,
      });

      await this.publish(SUBJECTS.TX_EXECUTING, {
        transaction_id: tx.id,
        kind: 'SALYSD_REDEEM',
        broadcast_id: transfer.id,
      });

      return this.fetchWithEvents(tx.id);
    } catch (err) {
      await this.fail(tx.id, err);
      throw err;
    }
  }

  async createRedeemFiatPayout(dto: SalysdRedeemFiatPayoutDto): Promise<TransactionWithEvents> {
    const existing = await this.findByIdempotencyKey(dto.idempotency_key);
    if (existing) return existing;

    const currency = (dto.fiat_currency ?? this.env.SALYSD_REDEEM_FIAT_CURRENCY).toUpperCase();
    const countryCode = (dto.country_code ?? this.env.SALYSD_REDEEM_FIAT_COUNTRY).toUpperCase();
    const accountNumber = dto.account_number ?? this.env.SALYSD_REDEEM_FIAT_ACCOUNT;
    const bankCode = dto.bank_code ?? this.env.SALYSD_REDEEM_FIAT_BANK_CODE;
    const holderName = dto.holder_name ?? this.env.SALYSD_REDEEM_FIAT_HOLDER ?? 'Recipient';

    if (!accountNumber) {
      throw ValidationError(
        'execution.salysd.fiat_destination_required',
        'Redeem fiat payout requires account_number on the request or SALYSD_REDEEM_FIAT_ACCOUNT in env',
      );
    }

    const rail =
      this.env.SALYSD_REDEEM_FIAT_RAIL ?? inferFiatRail(currency, countryCode);
    if (!rail) {
      throw ValidationError(
        'execution.salysd.fiat_rail_unknown',
        `No fiat rail for ${currency}/${countryCode}`,
      );
    }

    const destination: FiatDestination = {
      currency,
      rail,
      accountIdentifier: accountNumber,
      bankCode,
      holderName,
      countryCode,
      reference: dto.memo ?? `SalySD redeem ${dto.redeem_request_id}`,
    };

    if (!this.fiat.supports(destination)) {
      throw ValidationError(
        'execution.salysd.fiat_unsupported',
        `Active PSP adapter does not support ${currency}/${countryCode}`,
      );
    }

    const sourceAccountId = await this.resolveRedeemFiatSourceAccount(dto.org_id, currency);

    const tx = await this.prisma.executionTransaction.create({
      data: {
        idempotencyKey: dto.idempotency_key,
        orgId: dto.org_id,
        kind: 'FIAT_PAYOUT',
        state: 'CREATED',
        sourceAccountId,
        amountMinor: BigInt(dto.amount_minor),
        currency,
        asset: currency,
        memo: dto.memo ?? null,
        selectedRail: rail,
        metadata: {
          redeem_request_id: dto.redeem_request_id,
          salysd_redeem_fiat: true,
          fiat_destination: {
            country_code: countryCode,
            bank_code: bankCode,
            account_number: maskAccountNumber(accountNumber),
            holder_name: holderName,
          },
        },
      },
    });
    await this.recordEvent(tx.id, null, 'CREATED');

    try {
      await this.transition(tx.id, 'SCREENED');
      await this.transition(tx.id, 'ROUTED');

      const ledgerEntryId = await this.ledgerReservation.reserveFiatPayout({
        txId: tx.id,
        sourceAccountId,
        amountMinor: dto.amount_minor,
        currency,
      });
      await this.transition(tx.id, 'RESERVED', { ledgerEntryId: ledgerEntryId ?? undefined });

      const transfer = await this.fiat.send({
        correlationId: tx.id,
        amountMinor: dto.amount_minor,
        currency,
        destination,
      });

      await this.transition(tx.id, 'EXECUTING', { broadcastJobId: transfer.pspId });
      await this.transition(tx.id, 'AWAITING_CONFIRMATION', { broadcastJobId: transfer.pspId });

      await this.publish(SUBJECTS.TX_EXECUTING, {
        transaction_id: tx.id,
        kind: 'FIAT_PAYOUT',
        broadcast_id: transfer.pspId,
      });

      return this.fetchWithEvents(tx.id);
    } catch (err) {
      await this.fail(tx.id, err);
      throw err;
    }
  }

  async handleMintSettled(tx: ExecutionTransaction, txHash: string): Promise<void> {
    if (tx.state === 'SETTLED') return;
    const meta = tx.metadata as SalysdMetadata | null;
    const destWalletId = tx.destinationWalletId ?? meta?.destination_wallet_id;
    if (!destWalletId) {
      this.logger.warn(`SalySD mint ${tx.id} missing destination wallet`);
      return;
    }

    const settleEntryId = await this.ledgerReservation.settleSalysdMint({
      txId: tx.id,
      destinationWalletId: destWalletId,
      amountMinor: tx.amountMinor.toString(),
    });

    await this.transition(tx.id, 'SETTLED', {
      txHash,
      ledgerEntryId: settleEntryId ?? tx.ledgerEntryId ?? undefined,
    });

    await this.publish(SUBJECTS.TX_SETTLED, {
      transaction_id: tx.id,
      kind: 'SALYSD_MINT',
      tx_hash: txHash,
      ledger_entry_id: settleEntryId,
      settled_at: new Date().toISOString(),
    });
  }

  async handleRedeemSettled(tx: ExecutionTransaction, txHash: string): Promise<void> {
    if (tx.state === 'SETTLED') return;

    const settleEntryId = await this.ledgerReservation.settleSalysdRedeem({
      txId: tx.id,
      amountMinor: tx.amountMinor.toString(),
    });

    await this.transition(tx.id, 'SETTLED', {
      txHash,
      ledgerEntryId: settleEntryId ?? tx.ledgerEntryId ?? undefined,
    });

    await this.publish(SUBJECTS.TX_SETTLED, {
      transaction_id: tx.id,
      kind: 'SALYSD_REDEEM',
      tx_hash: txHash,
      ledger_entry_id: settleEntryId,
      settled_at: new Date().toISOString(),
    });
  }

  async listRecent(limit = 20): Promise<ReturnType<typeof toResponse>[]> {
    const rows = await this.prisma.executionTransaction.findMany({
      where: { kind: { in: ['SALYSD_MINT', 'SALYSD_REDEEM'] } },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { events: { orderBy: { occurredAt: 'asc' } } },
    });
    return rows.map((row) => toResponse(row as TransactionWithEvents));
  }

  private async waitForSubmitted(transferId: string): Promise<void> {
    for (let i = 0; i < APPROVE_POLL_MAX; i++) {
      const job = await this.wallet.getTransfer(transferId);
      if (job.status === 'SUBMITTED' || job.status === 'CONFIRMED') return;
      if (job.status === 'FAILED') {
        throw ValidationError('execution.salysd.approve_failed', job.last_error ?? 'approve broadcast failed');
      }
      await new Promise((r) => setTimeout(r, APPROVE_POLL_MS));
    }
    throw ValidationError('execution.salysd.approve_timeout', 'SalySD approve broadcast timed out');
  }

  private async findByIdempotencyKey(key: string): Promise<TransactionWithEvents | null> {
    const tx = await this.prisma.executionTransaction.findUnique({
      where: { idempotencyKey: key },
      include: { events: { orderBy: { occurredAt: 'asc' } } },
    });
    return tx ? (tx as TransactionWithEvents) : null;
  }

  private async fetchWithEvents(id: string): Promise<TransactionWithEvents> {
    const tx = await this.prisma.executionTransaction.findUnique({
      where: { id },
      include: { events: { orderBy: { occurredAt: 'asc' } } },
    });
    if (!tx) throw NotFoundError('execution.tx.not_found', `transaction ${id} not found`);
    return tx as TransactionWithEvents;
  }

  private async transition(
    id: string,
    to: ExecutionTransactionState,
    extra?: {
      broadcastJobId?: string;
      txHash?: string;
      ledgerEntryId?: string;
      metadata?: Record<string, unknown>;
    },
  ): Promise<void> {
    const tx = await this.prisma.executionTransaction.findUnique({ where: { id } });
    if (!tx) throw NotFoundError('execution.tx.not_found', `transaction ${id} not found`);
    assertTransition(tx.state, to);
    await this.prisma.executionTransaction.update({
      where: { id },
      data: {
        state: to,
        ...(extra?.broadcastJobId ? { broadcastJobId: extra.broadcastJobId } : {}),
        ...(extra?.txHash ? { txHash: extra.txHash } : {}),
        ...(extra?.ledgerEntryId ? { ledgerEntryId: extra.ledgerEntryId } : {}),
        ...(extra?.metadata ? { metadata: extra.metadata as object } : {}),
        ...(to === 'SETTLED' ? { settledAt: new Date() } : {}),
      },
    });
    await this.recordEvent(id, tx.state, to, extra);
  }

  private async recordEvent(
    txId: string,
    from: ExecutionTransactionState | null,
    to: ExecutionTransactionState,
    detail?: unknown,
  ): Promise<void> {
    await this.prisma.executionTransactionEvent.create({
      data: {
        transactionId: txId,
        fromState: from,
        toState: to,
        detail: detail ? (detail as object) : undefined,
      },
    });
  }

  private async publish(
    subject: typeof SUBJECTS.TX_EXECUTING | typeof SUBJECTS.TX_SETTLED,
    payload: Record<string, unknown>,
  ): Promise<void> {
    await this.events.publish(subject, {
      event_id: ulid(),
      occurred_at: new Date().toISOString(),
      ...payload,
    } as never);
  }

  private async fail(txId: string, err: unknown): Promise<void> {
    const message = err instanceof Error ? err.message : String(err);
    await this.prisma.executionTransaction.update({
      where: { id: txId },
      data: { state: 'FAILED', error: message.slice(0, 2000) },
    });
    await this.recordEvent(txId, 'EXECUTING', 'FAILED', { error: message });
  }

  private async resolveRedeemFiatSourceAccount(orgId: string, currency: string): Promise<string> {
    if (this.env.SALYSD_REDEEM_FIAT_SOURCE_ACCOUNT_ID) {
      return this.env.SALYSD_REDEEM_FIAT_SOURCE_ACCOUNT_ID;
    }
    const code = `${this.env.EXECUTION_FIAT_SOURCE_ACCOUNT_PREFIX}.${orgId}.${currency.toLowerCase()}`;
    try {
      const account = await this.ledgerClient.getAccountByCode(code);
      return account.id;
    } catch {
      throw ValidationError(
        'execution.salysd.fiat_no_source',
        `No fiat source ledger account (${code}). Fund the business ${currency} treasury or set SALYSD_REDEEM_FIAT_SOURCE_ACCOUNT_ID.`,
      );
    }
  }
}

function maskAccountNumber(account: string): string {
  if (account.length <= 4) return account;
  return `${'*'.repeat(Math.max(0, account.length - 4))}${account.slice(-4)}`;
}
