import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Worker, type Job, type ConnectionOptions } from 'bullmq';
import type { Redis } from 'ioredis';
import { BaseChainAdapter } from '@salychain/chain-base';
import { L3ChainAdapter } from '@salychain/chain-l3';
import { XrplChainAdapter } from '@salychain/chain-xrpl';
import { EventBus, SUBJECTS } from '@salychain/events';
import { SignerClient } from '@salychain/sdk-internal';
import { ulid } from 'ulid';
import { PrismaService } from '../prisma/prisma.service.js';
import { REDIS_CONNECTION, BROADCAST_QUEUE_NAME } from '../queues/queues.module.js';
import { BASE_ADAPTER, XRPL_ADAPTER, L3_ADAPTER } from '../chains/chains.module.js';
import { SIGNER_CLIENT } from '../signer/signer.module.js';
import { EVENT_BUS } from '../events/events.module.js';
import { PolicyService } from '../wallets/policy.service.js';
import { BROADCAST_JOB, type BroadcastJobPayload } from './transfers.service.js';
import { BaseDispatcher } from './dispatchers/base.dispatcher.js';
import { BaseBridgeDispatcher } from './dispatchers/base-bridge.dispatcher.js';
import { EscrowDispatcher } from './dispatchers/escrow.dispatcher.js';
import { XrplDispatcher } from './dispatchers/xrpl.dispatcher.js';
import { L3Dispatcher } from './dispatchers/l3.dispatcher.js';
import { L3BridgeDispatcher } from './dispatchers/l3-bridge.dispatcher.js';
import {
  SalysdApproveDispatcher,
  SalysdMintDispatcher,
  SalysdOracleUpdateDispatcher,
  SalysdRedeemDispatcher,
} from './dispatchers/salysd.dispatcher.js';
import { ContractCallDispatcher } from './dispatchers/contract-call.dispatcher.js';
import { SwapDispatcher } from './dispatchers/swap.dispatcher.js';
import type { TxDispatcher } from './dispatchers/dispatcher.js';
import { loadEnv } from '@salychain/config';
import { walletEnvSchema } from '../config/env.js';
import type { L3Network } from '@salychain/chain-l3';

/**
 * Pulls jobs off the broadcast queue and runs the prepare→sign→broadcast loop
 * against the appropriate chain dispatcher.
 *
 * Each job is idempotent: if a previous attempt produced a tx_hash, we skip
 * re-dispatching. Confirmation tracking lives in the per-chain listener; this
 * worker exits as soon as the network accepts the transaction.
 */
@Injectable()
export class BroadcastWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BroadcastWorker.name);
  private worker?: Worker;
  private readonly dispatchers: Record<
    'BASE' | 'XRPL' | 'SALY_L3' | 'ESCROW' | 'DEX' | 'BRIDGE_BASE' | 'BRIDGE_L3' | 'SALYSD_MINT' | 'SALYSD_REDEEM' | 'SALYSD_APPROVE' | 'SALYSD_ORACLE_UPDATE' | 'CONTRACT_CALL',
    TxDispatcher
  >;

  constructor(
    private readonly prisma: PrismaService,
    @Inject(REDIS_CONNECTION) private readonly redis: Redis,
    @Inject(BASE_ADAPTER) base: BaseChainAdapter,
    @Inject(XRPL_ADAPTER) xrpl: XrplChainAdapter,
    @Inject(L3_ADAPTER) l3: L3ChainAdapter,
    @Inject(SIGNER_CLIENT) signer: SignerClient,
    @Inject(EVENT_BUS) private readonly events: EventBus,
    policyService: PolicyService,
  ) {
    const env = loadEnv(walletEnvSchema);
    this.dispatchers = {
      BASE: new BaseDispatcher(base, signer, policyService),
      XRPL: new XrplDispatcher(xrpl, signer, policyService),
      SALY_L3: new L3Dispatcher(l3, signer, policyService),
      ESCROW: new EscrowDispatcher(base, signer, policyService),
      DEX: new SwapDispatcher(base, signer, policyService),
      BRIDGE_BASE: new BaseBridgeDispatcher(
        base,
        signer,
        policyService,
        env.BASE_NETWORK,
        env.L3_NETWORK as L3Network,
      ),
      BRIDGE_L3: new L3BridgeDispatcher(l3, signer, policyService, env.L3_NETWORK as L3Network),
      SALYSD_MINT: new SalysdMintDispatcher(l3, signer, policyService),
      SALYSD_REDEEM: new SalysdRedeemDispatcher(l3, signer, policyService),
      SALYSD_APPROVE: new SalysdApproveDispatcher(l3, signer, policyService),
      SALYSD_ORACLE_UPDATE: new SalysdOracleUpdateDispatcher(l3, signer, policyService),
      CONTRACT_CALL: new ContractCallDispatcher(base, l3, signer, policyService),
    };
  }

  async onModuleInit(): Promise<void> {
    this.worker = new Worker(
      BROADCAST_QUEUE_NAME,
      async (job: Job<BroadcastJobPayload>) => this.handle(job),
      { connection: this.redis as ConnectionOptions, concurrency: 5 },
    );
    this.worker.on('failed', (job, err) => {
      this.logger.warn(`broadcast job ${job?.id} failed: ${err.message}`);
    });
    this.worker.on('completed', (job) => {
      this.logger.log(`broadcast job ${job.id} completed`);
    });
    this.logger.log(`BroadcastWorker listening on ${BROADCAST_QUEUE_NAME}`);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.worker) await this.worker.close();
  }

  private async handle(job: Job<BroadcastJobPayload>): Promise<void> {
    const { broadcastJobId } = job.data;

    const broadcast = await this.prisma.broadcastJob.findUnique({ where: { id: broadcastJobId } });
    if (!broadcast) {
      this.logger.error(`broadcast job ${broadcastJobId} missing — terminating`);
      return;
    }

    if (broadcast.status === 'CONFIRMED' || (broadcast.status === 'SUBMITTED' && broadcast.txHash)) {
      this.logger.debug?.(`job ${broadcastJobId} already broadcast (${broadcast.txHash})`);
      return;
    }

    const wallet = await this.prisma.wallet.findUnique({ where: { id: broadcast.walletId } });
    if (!wallet) throw new Error(`wallet ${broadcast.walletId} disappeared`);

    const dispatcherKey =
      broadcast.kind === 'BRIDGE_DEPOSIT'
        ? 'BRIDGE_BASE'
        : broadcast.kind === 'BRIDGE_WITHDRAW'
          ? 'BRIDGE_L3'
          : broadcast.kind === 'SALYSD_MINT'
            ? 'SALYSD_MINT'
            : broadcast.kind === 'SALYSD_REDEEM'
              ? 'SALYSD_REDEEM'
              : broadcast.kind === 'SALYSD_APPROVE'
                ? 'SALYSD_APPROVE'
                : broadcast.kind === 'SALYSD_ORACLE_UPDATE'
                  ? 'SALYSD_ORACLE_UPDATE'
                  : broadcast.kind === 'CONTRACT_CALL'
                    ? 'CONTRACT_CALL'
                  : broadcast.kind === 'ESCROW_FUND'
                  ? 'ESCROW'
                  : broadcast.kind === 'DEX_SWAP'
                    ? 'DEX'
                    : (wallet.chain as 'BASE' | 'XRPL' | 'SALY_L3');
    const dispatcher = this.dispatchers[dispatcherKey];
    if (!dispatcher) {
      throw new Error(`No dispatcher for chain ${wallet.chain} kind ${broadcast.kind}`);
    }

    await this.prisma.broadcastJob.update({
      where: { id: broadcastJobId },
      data: { attempts: { increment: 1 }, status: 'PENDING', lastError: null },
    });

    try {
      const result = await dispatcher.dispatch(wallet, broadcast);

      await this.prisma.broadcastJob.update({
        where: { id: broadcastJobId },
        data: { rawTx: result.signedTx, txHash: result.txHash, status: 'SUBMITTED', lastError: null },
      });

      await this.events.publish(SUBJECTS.TX_AWAITING_CONFIRMATION, {
        event_id: ulid(),
        occurred_at: new Date().toISOString(),
        transaction_id: broadcast.id,
        kind:
          broadcast.kind === 'BRIDGE_DEPOSIT'
            ? 'BRIDGE_DEPOSIT'
            : broadcast.kind === 'BRIDGE_WITHDRAW'
              ? 'BRIDGE_WITHDRAW'
              : broadcast.kind === 'SALYSD_MINT'
                ? 'SALYSD_MINT'
                : broadcast.kind === 'SALYSD_REDEEM'
                  ? 'SALYSD_REDEEM'
                  : broadcast.kind === 'ESCROW_FUND'
                    ? 'ESCROW_PAYOUT'
                    : broadcast.kind === 'DEX_SWAP'
                      ? 'DEX_SWAP'
                      : wallet.chain === 'XRPL'
                        ? 'XRPL_PAYOUT'
                        : wallet.chain === 'SALY_L3'
                          ? 'L3_PAYOUT'
                          : 'BASE_PAYOUT',
        tx_hash: result.txHash,
        rail: result.rail,
      } as never);

      this.logger.log(`broadcast ${broadcastJobId} (${wallet.chain}) → ${result.txHash}`);
    } catch (err) {
      const msg = (err as Error).message;
      await this.prisma.broadcastJob.update({
        where: { id: broadcastJobId },
        data: { status: 'FAILED', lastError: msg.slice(0, 1000) },
      });
      throw err;
    }
  }
}
