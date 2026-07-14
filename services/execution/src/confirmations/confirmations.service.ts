import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { EventBus, SUBJECTS } from '@salychain/events';
import { requiredConfirmations } from '@salychain/finality';
import { EVENT_BUS } from '../events/events.module.js';
import { TransactionsService } from '../transactions/transactions.service.js';
import { EscrowService } from '../escrow/escrow.service.js';

/**
 * Subscribes to chain observation events and translates them into transaction
 * state machine transitions.
 *
 * Idempotency: `markSettledByTxHash` looks up the transaction by `tx_hash` and
 * only transitions if it's still in `AWAITING_CONFIRMATION`, so duplicate
 * deliveries from NATS are safe.
 */
@Injectable()
export class ConfirmationsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ConfirmationsService.name);

  constructor(
    @Inject(EVENT_BUS) private readonly events: EventBus,
    private readonly txs: TransactionsService,
    private readonly escrow: EscrowService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.events.subscribe(
      SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED,
      'execution-base-confirmations',
      async (event) => {
        try {
          await this.txs.markSettledByTxHash({
            txHash: event.tx_hash,
            blockNumber: event.block_number,
            blockHash: event.block_hash,
            chain: 'BASE',
            confirmationsDepth: event.confirmations_depth ?? requiredConfirmations('BASE'),
          });
          return 'ack';
        } catch (err) {
          this.logger.warn(`failed to mark settled for ${event.tx_hash}: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );
    this.logger.log('subscribed to Base transfer observations');

    await this.events.subscribe(
      SUBJECTS.CHAIN_BASE_DEAL_FUNDED,
      'execution-base-escrow-confirmations',
      async (event) => {
        try {
          await this.txs.markSettledByDealFunded({
            txHash: event.tx_hash,
            dealId: event.deal_id,
            blockNumber: event.block_number,
          });
          return 'ack';
        } catch (err) {
          this.logger.warn(`failed to mark escrow settled for ${event.deal_id}: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );
    this.logger.log('subscribed to Base DealFunded observations');

    await this.events.subscribe(
      SUBJECTS.CHAIN_BASE_DEAL_RELEASED,
      'execution-base-escrow-released',
      async (event) => {
        try {
          await this.escrow.markReleased({
            dealId: event.deal_id,
            txHash: event.tx_hash,
            blockNumber: event.block_number,
          });
          return 'ack';
        } catch (err) {
          this.logger.warn(`failed to mark escrow released for ${event.deal_id}: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );
    this.logger.log('subscribed to Base DealReleased observations');

    await this.events.subscribe(
      SUBJECTS.CHAIN_BASE_DEAL_REFUNDED,
      'execution-base-escrow-refunded',
      async (event) => {
        try {
          await this.escrow.markRefunded({
            dealId: event.deal_id,
            txHash: event.tx_hash,
            blockNumber: event.block_number,
          });
          return 'ack';
        } catch (err) {
          this.logger.warn(`failed to mark escrow refunded for ${event.deal_id}: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );
    this.logger.log('subscribed to Base DealRefunded observations');

    await this.events.subscribe(
      SUBJECTS.CHAIN_XRPL_PAYMENT_OBSERVED,
      'execution-xrpl-confirmations',
      async (event) => {
        try {
          await this.txs.markSettledByTxHash({
            txHash: event.tx_hash,
            blockNumber: event.ledger_index,
            chain: 'XRPL',
            confirmationsDepth: event.confirmations_depth ?? requiredConfirmations('XRPL'),
          });
          return 'ack';
        } catch (err) {
          this.logger.warn(`failed to mark XRPL settled for ${event.tx_hash}: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );
    this.logger.log('subscribed to XRPL payment observations');

    await this.events.subscribe(
      SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED,
      'execution-l3-confirmations',
      async (event) => {
        try {
          await this.txs.markSettledByTxHash({
            txHash: event.tx_hash,
            blockNumber: event.block_number,
            blockHash: event.block_hash,
            chain: 'SALY_L3',
            confirmationsDepth: event.confirmations_depth ?? requiredConfirmations('SALY_L3'),
          });
          return 'ack';
        } catch (err) {
          this.logger.warn(`failed to mark L3 settled for ${event.tx_hash}: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );
    this.logger.log('subscribed to L3 transfer observations');

    await this.events.subscribe(
      SUBJECTS.CHAIN_BASE_REORG_DETECTED,
      'execution-base-reorg',
      async (event) => {
        try {
          await this.txs.handleChainReorg({
            chain: 'BASE',
            fromBlock: event.from_block,
            toBlock: event.to_block,
            orphanedBlockHash: event.orphaned_block_hash,
          });
          return 'ack';
        } catch (err) {
          this.logger.warn(`failed to handle Base reorg: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );
    this.logger.log('subscribed to Base reorg detections');

    await this.events.subscribe(
      SUBJECTS.CHAIN_L3_REORG_DETECTED,
      'execution-l3-reorg',
      async (event) => {
        try {
          await this.txs.handleChainReorg({
            chain: 'SALY_L3',
            fromBlock: event.from_block,
            toBlock: event.to_block,
            orphanedBlockHash: event.orphaned_block_hash,
          });
          return 'ack';
        } catch (err) {
          this.logger.warn(`failed to handle L3 reorg: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );
    this.logger.log('subscribed to L3 reorg detections');
  }
}
