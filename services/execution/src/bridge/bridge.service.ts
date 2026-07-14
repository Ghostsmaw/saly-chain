import { Inject, Injectable, Logger } from '@nestjs/common';
import { ulid } from 'ulid';
import { resolveBridgeContracts, resolveBridgeL2TokenAddress } from '@salychain/chain-l3';
import { BASE_ASSETS } from '@salychain/chain-base';
import { EventBus, SUBJECTS, type EventBySubject, type Subject } from '@salychain/events';
import { getTenantOrgId, WalletClient } from '@salychain/sdk-internal';
import { NotFoundError, ValidationError } from '@salychain/errors';
import type {
  ExecutionTransaction,
  ExecutionTransactionState,
} from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { WALLET_CLIENT } from '../clients/clients.module.js';
import { EVENT_BUS } from '../events/events.module.js';
import { LedgerReservationService } from '../ledger/ledger-reservation.service.js';
import { assertTransition } from '../state/state-machine.js';
import { BridgeDepositDto, BridgeWithdrawDto } from './dto.js';
import {
  toResponse,
  type TransactionWithEvents,
} from '../transactions/transactions.service.js';

type BridgeMetadata = {
  direction: 'base_to_l3' | 'l3_to_base';
  l3_network?: string;
  l2_recipient?: string;
  awaiting_l3_credit?: boolean;
  awaiting_base_credit?: boolean;
  base_tx_hash?: string;
  l3_tx_hash?: string;
  l1_recipient?: string;
  log_index?: number;
  bridge_address?: string;
  portal?: boolean;
  opaque_data_hash?: string;
};

@Injectable()
export class BridgeService {
  private readonly logger = new Logger(BridgeService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(WALLET_CLIENT) private readonly wallet: WalletClient,
    @Inject(EVENT_BUS) private readonly events: EventBus,
    private readonly ledger: LedgerReservationService,
  ) {}

  async createDeposit(dto: BridgeDepositDto): Promise<TransactionWithEvents> {
    const existing = await this.findByIdempotencyKey(dto.idempotency_key);
    if (existing) return existing;

    const source = await this.wallet.get(dto.source_wallet_id);
    const dest = await this.wallet.get(dto.destination_wallet_id);
    if (source.chain !== 'BASE') {
      throw ValidationError('execution.bridge.invalid_source', 'source wallet must be on BASE');
    }
    if (dest.chain !== 'SALY_L3') {
      throw ValidationError('execution.bridge.invalid_destination', 'destination wallet must be on SALY_L3');
    }

    const bridge = resolveBridgeContracts(process.cwd());
    if (!bridge.l1StandardBridge) {
      throw ValidationError('execution.bridge.unconfigured', 'L1 standard bridge address not configured');
    }
    const l1Token = BASE_ASSETS[bridge.settlement].USDC.address;
    const l2Token = resolveBridgeL2TokenAddress(bridge.network, 'USDC', process.cwd());
    if (!l1Token || !l2Token) {
      throw ValidationError('execution.bridge.tokens_unconfigured', 'Bridge L1/L2 token addresses not configured');
    }

    const tx = await this.prisma.executionTransaction.create({
      data: {
        idempotencyKey: dto.idempotency_key,
        orgId: getTenantOrgId() ?? null,
        kind: 'BRIDGE_DEPOSIT',
        state: 'CREATED',
        sourceWalletId: dto.source_wallet_id,
        destinationWalletId: dto.destination_wallet_id,
        destinationAddress: dest.address,
        destinationChain: 'SALY_L3',
        amountMinor: BigInt(dto.amount_minor),
        currency: dto.asset,
        asset: dto.asset,
        intentId: dto.intent_id ?? null,
        memo: dto.memo ?? null,
        selectedRail: 'L3',
        metadata: {
          direction: 'base_to_l3',
          l3_network: bridge.network,
          l2_recipient: dest.address,
          bridge_address: bridge.l1StandardBridge,
        } satisfies BridgeMetadata,
      },
    });
    await this.recordEvent(tx.id, null, 'CREATED');

    try {
      await this.transition(tx.id, 'SCREENED');
      await this.transition(tx.id, 'ROUTED');
      await this.reserveChainPayout(tx.id, dto.source_wallet_id, dto.amount_minor, dto.asset, 'BASE');

      const transfer = await this.wallet.transfer({
        walletId: dto.source_wallet_id,
        destinationAddress: bridge.l1StandardBridge,
        amountMinor: dto.amount_minor,
        asset: dto.asset,
        idempotencyKey: `exec:${tx.id}:bridge-deposit`,
        memo: dto.memo ?? `bridge deposit → L3 ${dest.address}`,
        kind: 'BRIDGE_DEPOSIT',
        bridgePayload: {
          l1_standard_bridge: bridge.l1StandardBridge,
          l1_token: l1Token,
          l2_token: l2Token,
          l2_recipient: dest.address,
        },
      });

      await this.transition(tx.id, 'EXECUTING', { broadcastJobId: transfer.id });
      await this.transition(tx.id, 'AWAITING_CONFIRMATION', {
        broadcastJobId: transfer.id,
        txHash: transfer.tx_hash ?? undefined,
        metadata: {
          ...(tx.metadata as object),
          awaiting_l3_credit: true,
        },
      });

      await this.publish(SUBJECTS.TX_EXECUTING, {
        transaction_id: tx.id,
        kind: 'BRIDGE_DEPOSIT',
        broadcast_id: transfer.id,
      });

      return this.fetchWithEvents(tx.id);
    } catch (err) {
      await this.fail(tx.id, err);
      throw err;
    }
  }

  async createWithdraw(dto: BridgeWithdrawDto): Promise<TransactionWithEvents> {
    const existing = await this.findByIdempotencyKey(dto.idempotency_key);
    if (existing) return existing;

    const source = await this.wallet.get(dto.source_wallet_id);
    if (source.chain !== 'SALY_L3') {
      throw ValidationError('execution.bridge.invalid_source', 'source wallet must be on SALY_L3');
    }

    const bridge = resolveBridgeContracts(process.cwd());
    const l2Bridge = bridge.l2StandardBridge;
    if (!l2Bridge) {
      throw ValidationError('execution.bridge.unconfigured', 'L2 standard bridge address not configured');
    }
    const l2Token = resolveBridgeL2TokenAddress(bridge.network, 'USDC', process.cwd());
    if (!l2Token) {
      throw ValidationError('execution.bridge.tokens_unconfigured', 'L2 bridge token not configured');
    }

    const tx = await this.prisma.executionTransaction.create({
      data: {
        idempotencyKey: dto.idempotency_key,
        orgId: getTenantOrgId() ?? null,
        kind: 'BRIDGE_WITHDRAW',
        state: 'CREATED',
        sourceWalletId: dto.source_wallet_id,
        destinationAddress: dto.destination_address,
        destinationChain: 'BASE',
        amountMinor: BigInt(dto.amount_minor),
        currency: dto.asset,
        asset: dto.asset,
        intentId: dto.intent_id ?? null,
        memo: dto.memo ?? null,
        selectedRail: 'L3',
        metadata: {
          direction: 'l3_to_base',
          l3_network: bridge.network,
          bridge_address: l2Bridge,
          l1_recipient: dto.destination_address,
          awaiting_base_credit: true,
        } satisfies BridgeMetadata,
      },
    });
    await this.recordEvent(tx.id, null, 'CREATED');

    try {
      await this.transition(tx.id, 'SCREENED');
      await this.transition(tx.id, 'ROUTED');
      await this.reserveChainPayout(tx.id, dto.source_wallet_id, dto.amount_minor, dto.asset, 'L3');

      const transfer = await this.wallet.transfer({
        walletId: dto.source_wallet_id,
        destinationAddress: l2Bridge,
        amountMinor: dto.amount_minor,
        asset: dto.asset,
        idempotencyKey: `exec:${tx.id}:bridge-withdraw`,
        memo: dto.memo ?? `bridge withdraw → Base ${dto.destination_address}`,
        kind: 'BRIDGE_WITHDRAW',
        bridgePayload: {
          l2_standard_bridge: l2Bridge,
          l2_token: l2Token,
          l1_recipient: dto.destination_address,
        },
      });

      await this.transition(tx.id, 'EXECUTING', { broadcastJobId: transfer.id });
      await this.transition(tx.id, 'AWAITING_CONFIRMATION', {
        broadcastJobId: transfer.id,
        txHash: transfer.tx_hash ?? undefined,
      });

      await this.publish(SUBJECTS.TX_EXECUTING, {
        transaction_id: tx.id,
        kind: 'BRIDGE_WITHDRAW',
        broadcast_id: transfer.id,
      });

      return this.fetchWithEvents(tx.id);
    } catch (err) {
      await this.fail(tx.id, err);
      throw err;
    }
  }

  async handleErc20DepositObserved(
    event: EventBySubject[typeof SUBJECTS.CHAIN_BASE_BRIDGE_ERC20_DEPOSIT_OBSERVED],
  ): Promise<void> {
    const idempotencyKey = `bridge:erc20:${event.tx_hash}:${event.log_index}`;
    const existing = await this.prisma.executionTransaction.findUnique({
      where: { idempotencyKey },
    });
    if (existing?.state === 'SETTLED') return;

    const source = await this.wallet.findByAddress({ chain: 'BASE', address: event.from });
    const dest = await this.wallet.findByAddress({ chain: 'SALY_L3', address: event.to });

    let tx = existing;
    if (!tx && source.data) {
      tx = await this.prisma.executionTransaction.findFirst({
        where: {
          kind: 'BRIDGE_DEPOSIT',
          state: 'AWAITING_CONFIRMATION',
          OR: [{ txHash: event.tx_hash }, { sourceWalletId: source.data.id, amountMinor: BigInt(event.amount_minor) }],
        },
      });
    }

    if (!tx) {
      if (!source.data || !dest.data) {
        this.logger.debug(`bridge deposit ${event.tx_hash} skipped — unknown custodial party`);
        return;
      }

      tx = await this.prisma.executionTransaction.create({
        data: {
          idempotencyKey,
          kind: 'BRIDGE_DEPOSIT',
          state: 'AWAITING_CONFIRMATION',
          sourceWalletId: source.data.id,
          destinationWalletId: dest.data.id,
          destinationAddress: event.to,
          destinationChain: 'SALY_L3',
          amountMinor: BigInt(event.amount_minor),
          currency: 'USDC',
          asset: 'USDC',
          txHash: event.tx_hash,
          selectedRail: 'L3',
          metadata: {
            direction: 'base_to_l3',
            l3_network: event.l3_network,
            l2_recipient: event.to,
            awaiting_l3_credit: true,
            base_tx_hash: event.tx_hash,
            log_index: event.log_index,
            observed: true,
          } satisfies BridgeMetadata & { observed: boolean },
        },
      });
      await this.recordEvent(tx.id, null, 'AWAITING_CONFIRMATION', { observed: true });
    } else if (tx.txHash !== event.tx_hash) {
      await this.prisma.executionTransaction.update({
        where: { id: tx.id },
        data: { txHash: event.tx_hash },
      });
    }

    await this.ledger.recordBridgeBaseLeg({
      txId: tx.id,
      amountMinor: event.amount_minor,
      currency: 'USDC',
      direction: 'base_to_l3',
    });
  }

  async handleL3CreditForBridge(
    event: EventBySubject[typeof SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED],
  ): Promise<void> {
    const open = await this.prisma.executionTransaction.findMany({
      where: {
        kind: 'BRIDGE_DEPOSIT',
        state: 'AWAITING_CONFIRMATION',
        amountMinor: BigInt(event.amount_minor),
        destinationAddress: { equals: event.to, mode: 'insensitive' },
      },
      take: 5,
      orderBy: { createdAt: 'asc' },
    });

    const tx = open.find((row) => {
      const meta = row.metadata as BridgeMetadata | null;
      return meta?.awaiting_l3_credit !== false;
    });
    if (!tx || !tx.destinationWalletId) return;

    await this.ledger.settleBridgeToL3Wallet({
      txId: tx.id,
      destinationWalletId: tx.destinationWalletId,
      amountMinor: event.amount_minor,
      currency: tx.currency,
      direction: 'base_to_l3',
    });

    await this.transition(tx.id, 'SETTLED', {
      txHash: event.tx_hash,
      metadata: {
        ...(tx.metadata as object),
        awaiting_l3_credit: false,
        l3_tx_hash: event.tx_hash,
      },
    });

    await this.publish(SUBJECTS.TX_SETTLED, {
      transaction_id: tx.id,
      kind: 'BRIDGE_DEPOSIT',
      tx_hash: event.tx_hash,
      settled_at: new Date().toISOString(),
    });
  }

  async handleL3WithdrawalInitiated(
    event: EventBySubject[typeof SUBJECTS.CHAIN_L3_BRIDGE_WITHDRAWAL_INITIATED],
  ): Promise<void> {
    const open = await this.prisma.executionTransaction.findMany({
      where: {
        kind: 'BRIDGE_WITHDRAW',
        state: 'AWAITING_CONFIRMATION',
        amountMinor: BigInt(event.amount_minor),
        OR: [
          { txHash: event.tx_hash },
          {
            destinationAddress: { equals: event.l1_recipient, mode: 'insensitive' },
            sourceWalletId: { not: null },
          },
        ],
      },
      take: 10,
      orderBy: { createdAt: 'asc' },
    });

    const source = await this.wallet.findByAddress({ chain: 'SALY_L3', address: event.initiator });
    const tx = open.find((row) => {
      const meta = row.metadata as BridgeMetadata | null;
      if (meta?.awaiting_base_credit === false) return false;
      if (row.txHash && row.txHash === event.tx_hash) return true;
      if (source.data && row.sourceWalletId === source.data.id) return true;
      return false;
    });
    if (!tx) {
      this.logger.debug(`L3 withdrawal ${event.tx_hash} skipped — no matching bridge withdraw`);
      return;
    }

    await this.ledger.recordBridgeL3Leg({
      txId: tx.id,
      amountMinor: event.amount_minor,
      currency: tx.currency,
      direction: 'l3_to_base',
    });

    if (tx.txHash !== event.tx_hash) {
      await this.prisma.executionTransaction.update({
        where: { id: tx.id },
        data: { txHash: event.tx_hash },
      });
    }

    await this.prisma.executionTransaction.update({
      where: { id: tx.id },
      data: {
        metadata: {
          ...(tx.metadata as object),
          l3_tx_hash: event.tx_hash,
          l1_recipient: event.l1_recipient,
        },
      },
    });
  }

  async handleBaseCreditForBridgeWithdraw(
    event: EventBySubject[typeof SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED],
  ): Promise<void> {
    const open = await this.prisma.executionTransaction.findMany({
      where: {
        kind: 'BRIDGE_WITHDRAW',
        state: 'AWAITING_CONFIRMATION',
        amountMinor: BigInt(event.amount_minor),
        destinationAddress: { equals: event.to, mode: 'insensitive' },
      },
      take: 5,
      orderBy: { createdAt: 'asc' },
    });

    const tx = open.find((row) => {
      const meta = row.metadata as BridgeMetadata | null;
      return meta?.awaiting_base_credit !== false && meta?.direction === 'l3_to_base';
    });
    if (!tx) return;

    const destWallet = await this.wallet.findByAddress({ chain: 'BASE', address: event.to });

    await this.ledger.settleBridgeToBase({
      txId: tx.id,
      amountMinor: event.amount_minor,
      currency: tx.currency,
      ...(destWallet.data ? { destinationWalletId: destWallet.data.id } : {}),
      direction: 'l3_to_base',
    });

    await this.transition(tx.id, 'SETTLED', {
      txHash: event.tx_hash,
      metadata: {
        ...(tx.metadata as object),
        awaiting_base_credit: false,
        base_tx_hash: event.tx_hash,
      },
    });

    await this.publish(SUBJECTS.TX_SETTLED, {
      transaction_id: tx.id,
      kind: 'BRIDGE_WITHDRAW',
      tx_hash: event.tx_hash,
      settled_at: new Date().toISOString(),
    });
  }

  async handleBridgeDepositObserved(
    event: EventBySubject[typeof SUBJECTS.CHAIN_BASE_BRIDGE_DEPOSIT_OBSERVED],
  ): Promise<void> {
    const idempotencyKey = `bridge:portal:${event.tx_hash}:${event.log_index}`;
    const existing = await this.prisma.executionTransaction.findUnique({
      where: { idempotencyKey },
    });
    if (existing) return;

    const source = await this.wallet.findByAddress({ chain: 'BASE', address: event.depositor });
    const dest = await this.wallet.findByAddress({ chain: 'SALY_L3', address: event.l2_recipient });
    if (!source.data) {
      this.logger.debug(`portal deposit ${event.tx_hash} skipped — unknown depositor`);
      return;
    }

    await this.prisma.executionTransaction.create({
      data: {
        idempotencyKey,
        kind: 'BRIDGE_DEPOSIT',
        state: 'AWAITING_CONFIRMATION',
        sourceWalletId: source.data.id,
        destinationWalletId: dest.data?.id ?? null,
        destinationAddress: event.l2_recipient,
        destinationChain: 'SALY_L3',
        amountMinor: 0n,
        currency: 'USDC',
        asset: 'USDC',
        txHash: event.tx_hash,
        selectedRail: 'L3',
        metadata: {
          direction: 'base_to_l3',
          l3_network: event.l3_network,
          l2_recipient: event.l2_recipient,
          portal: true,
          opaque_data_hash: event.opaque_data_hash,
          awaiting_l3_credit: Boolean(dest.data),
        },
      },
    });
  }

  async listRecent(limit = 20): Promise<ReturnType<typeof toResponse>[]> {
    const rows = await this.prisma.executionTransaction.findMany({
      where: { kind: { in: ['BRIDGE_DEPOSIT', 'BRIDGE_WITHDRAW'] } },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { events: { orderBy: { occurredAt: 'asc' } } },
    });
    return rows.map((tx) => toResponse(tx as TransactionWithEvents));
  }

  async getStatus(): Promise<{
    configured: boolean;
    network: string;
    optimism_portal?: string;
    l1_standard_bridge?: string;
    l2_standard_bridge?: string;
  }> {
    const bridge = resolveBridgeContracts(process.cwd());
    return {
      configured: Boolean(bridge.optimismPortal),
      network: bridge.network,
      ...(bridge.optimismPortal ? { optimism_portal: bridge.optimismPortal } : {}),
      ...(bridge.l1StandardBridge ? { l1_standard_bridge: bridge.l1StandardBridge } : {}),
      ...(bridge.l2StandardBridge ? { l2_standard_bridge: bridge.l2StandardBridge } : {}),
    };
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

  private async reserveChainPayout(
    txId: string,
    walletId: string,
    amountMinor: string,
    currency: string,
    rail: 'BASE' | 'L3',
  ): Promise<void> {
    const entryId = await this.ledger.reserveChainPayout({
      txId,
      kind: rail === 'BASE' ? 'BASE_PAYOUT' : 'L3_PAYOUT',
      walletId,
      amountMinor,
      currency,
      rail,
    });
    await this.transition(txId, 'RESERVED', { ledgerEntryId: entryId ?? undefined });
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

  private async publish<S extends Subject>(
    subject: S,
    payload: Omit<EventBySubject[S], 'schema_version' | 'event_id' | 'occurred_at'>,
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
}
