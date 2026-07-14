import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { EventBus, SUBJECTS } from '@salychain/events';
import { BridgeService } from './bridge.service.js';
import { EVENT_BUS } from '../events/events.module.js';

/**
 * Subscribes to bridge observation events and coordinates ledger settlement.
 */
@Injectable()
export class BridgeConfirmationsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BridgeConfirmationsService.name);

  constructor(
    @Inject(EVENT_BUS) private readonly events: EventBus,
    private readonly bridge: BridgeService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.events.subscribe(
      SUBJECTS.CHAIN_BASE_BRIDGE_ERC20_DEPOSIT_OBSERVED,
      'execution-bridge-erc20-deposits',
      async (event) => {
        try {
          await this.bridge.handleErc20DepositObserved(event);
          return 'ack';
        } catch (err) {
          this.logger.warn(`erc20 bridge deposit handler failed: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );

    await this.events.subscribe(
      SUBJECTS.CHAIN_BASE_BRIDGE_DEPOSIT_OBSERVED,
      'execution-bridge-portal-deposits',
      async (event) => {
        try {
          await this.bridge.handleBridgeDepositObserved(event);
          return 'ack';
        } catch (err) {
          this.logger.warn(`portal bridge deposit handler failed: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );

    await this.events.subscribe(
      SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED,
      'execution-bridge-l3-credits',
      async (event) => {
        try {
          await this.bridge.handleL3CreditForBridge(event);
          return 'ack';
        } catch (err) {
          this.logger.warn(`bridge L3 credit handler failed: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );

    await this.events.subscribe(
      SUBJECTS.CHAIN_L3_BRIDGE_WITHDRAWAL_INITIATED,
      'execution-bridge-l3-withdrawals',
      async (event) => {
        try {
          await this.bridge.handleL3WithdrawalInitiated(event);
          return 'ack';
        } catch (err) {
          this.logger.warn(`bridge L3 withdrawal handler failed: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );

    await this.events.subscribe(
      SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED,
      'execution-bridge-base-withdraw-credits',
      async (event) => {
        try {
          await this.bridge.handleBaseCreditForBridgeWithdraw(event);
          return 'ack';
        } catch (err) {
          this.logger.warn(`bridge Base withdraw credit handler failed: ${(err as Error).message}`);
          return 'nack';
        }
      },
    );

    this.logger.log('subscribed to bridge observation events');
  }
}
