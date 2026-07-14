import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { EventBus, SUBJECTS } from '@salychain/events';
import { ExecutionClient, runWithTenant } from '@salychain/sdk-internal';
import { PrismaService } from '../prisma/prisma.service.js';
import { EVENT_BUS } from '../events/events.module.js';
import { EXECUTION_CLIENT } from '../clients/clients.module.js';

type RedeemPayoutMetadata = {
  currency?: string;
  country_code?: string;
  account_number?: string;
  bank_code?: string;
  holder_name?: string;
};

/**
 * Updates mint/redeem request rows when execution publishes TX_SETTLED for SalySD kinds.
 * Triggers fiat payout after burn when redeem payout_rail is FIAT.
 */
@Injectable()
export class CompletionsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(CompletionsService.name);

  constructor(
    @Inject(EVENT_BUS) private readonly events: EventBus,
    @Inject(EXECUTION_CLIENT) private readonly execution: ExecutionClient,
    private readonly prisma: PrismaService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.events.subscribe(
      SUBJECTS.TX_SETTLED,
      'stablecoin-tx-settled',
      async (event) => {
        if (
          event.kind !== 'SALYSD_MINT' &&
          event.kind !== 'SALYSD_REDEEM' &&
          event.kind !== 'FIAT_PAYOUT'
        ) {
          return 'ack';
        }
        try {
          if (event.kind === 'SALYSD_MINT') {
            await this.completeMint(event);
          } else if (event.kind === 'SALYSD_REDEEM') {
            await this.completeRedeem(event);
          } else {
            await this.completeRedeemFiatPayout(event);
          }
          return 'ack';
        } catch (err) {
          this.logger.warn(`stablecoin completion failed: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );
    this.logger.log('subscribed to TX_SETTLED for SalySD completions');
  }

  private async completeMint(event: {
    transaction_id: string;
    tx_hash?: string;
    ledger_entry_id?: string;
  }): Promise<void> {
    const row = await this.prisma.mintRequest.findFirst({
      where: { executionTransactionId: event.transaction_id },
    });
    if (!row || row.status === 'COMPLETED') return;

    await this.prisma.mintRequest.update({
      where: { id: row.id },
      data: {
        status: 'COMPLETED',
        txHash: event.tx_hash ?? row.txHash,
        ledgerEntryId: event.ledger_entry_id ?? row.ledgerEntryId,
      },
    });

    await this.events.publish(SUBJECTS.STABLECOIN_MINT_COMPLETED, {
      org_id: row.orgId,
      chain: row.chain,
      currency: 'SALYSD',
      mint_request_id: row.id,
      amount_minor: row.amountMinor.toString(),
      ...(event.tx_hash ? { tx_hash: event.tx_hash } : {}),
      ...(event.ledger_entry_id ? { ledger_entry_id: event.ledger_entry_id } : {}),
    } as never);

    await this.prisma.reserveAccount.update({
      where: { id: row.reserveAccountId },
      data: { balanceMinor: { decrement: row.amountMinor } },
    });
  }

  private async completeRedeem(event: {
    transaction_id: string;
    tx_hash?: string;
    ledger_entry_id?: string;
  }): Promise<void> {
    const row = await this.prisma.redeemRequest.findFirst({
      where: { executionTransactionId: event.transaction_id },
    });
    if (!row || row.status === 'COMPLETED' || row.status === 'PAYOUT') return;

    const nextStatus = row.payoutRail === 'FIAT' ? 'PAYOUT' : 'COMPLETED';

    await this.prisma.redeemRequest.update({
      where: { id: row.id },
      data: {
        status: nextStatus,
        txHash: event.tx_hash ?? row.txHash,
        ledgerEntryId: event.ledger_entry_id ?? row.ledgerEntryId,
      },
    });

    if (nextStatus === 'COMPLETED') {
      await this.publishRedeemCompleted(row, event);
      return;
    }

    await this.triggerRedeemFiatPayout(row);
  }

  private async completeRedeemFiatPayout(event: {
    transaction_id: string;
    ledger_entry_id?: string;
  }): Promise<void> {
    const row = await this.prisma.redeemRequest.findFirst({
      where: {
        status: 'PAYOUT',
        metadata: {
          path: ['fiat_payout_transaction_id'],
          equals: event.transaction_id,
        },
      },
    });
    if (!row || row.status === 'COMPLETED') return;

    await this.prisma.redeemRequest.update({
      where: { id: row.id },
      data: {
        status: 'COMPLETED',
        ...(event.ledger_entry_id ? { ledgerEntryId: event.ledger_entry_id } : {}),
      },
    });

    await this.publishRedeemCompleted(row, event);
  }

  private async triggerRedeemFiatPayout(row: {
    id: string;
    orgId: string;
    amountMinor: bigint;
    metadata: unknown;
  }): Promise<void> {
    const payout = this.readPayoutMetadata(row.metadata);
    const tx = await runWithTenant({ orgId: row.orgId }, () =>
      this.execution.salysdRedeemFiatPayout({
        idempotencyKey: `redeem-fiat:${row.id}`,
        redeemRequestId: row.id,
        orgId: row.orgId,
        amountMinor: row.amountMinor.toString(),
        fiatCurrency: payout.currency,
        countryCode: payout.country_code,
        accountNumber: payout.account_number,
        bankCode: payout.bank_code,
        holderName: payout.holder_name,
        memo: `SalySD redeem ${row.id}`,
      }),
    );

    await this.prisma.redeemRequest.update({
      where: { id: row.id },
      data: {
        metadata: {
          ...(typeof row.metadata === 'object' && row.metadata !== null
            ? (row.metadata as Record<string, unknown>)
            : {}),
          fiat_payout_transaction_id: tx.id,
        },
      },
    });
  }

  private readPayoutMetadata(metadata: unknown): RedeemPayoutMetadata {
    if (typeof metadata !== 'object' || metadata === null) return {};
    const payout = (metadata as { payout?: RedeemPayoutMetadata }).payout;
    return payout ?? {};
  }

  private async publishRedeemCompleted(
    row: {
      id: string;
      orgId: string;
      chain: string;
      amountMinor: bigint;
      payoutRail: string;
    },
    event: { tx_hash?: string; ledger_entry_id?: string },
  ): Promise<void> {
    await this.events.publish(SUBJECTS.STABLECOIN_REDEEM_COMPLETED, {
      org_id: row.orgId,
      chain: row.chain,
      currency: 'SALYSD',
      redeem_request_id: row.id,
      amount_minor: row.amountMinor.toString(),
      payout_rail: row.payoutRail as 'FIAT' | 'INTERNAL',
      ...(event.tx_hash ? { tx_hash: event.tx_hash } : {}),
      ...(event.ledger_entry_id ? { ledger_entry_id: event.ledger_entry_id } : {}),
    } as never);
  }
}
