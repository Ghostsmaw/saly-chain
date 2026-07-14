import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { WalletClient } from '@salychain/sdk-internal';
import {
  ContractStatus,
  ExecutionMode,
  ProposalStatus,
} from '../generated/prisma/index.js';
import { contractRegistryEnvSchema } from '../config/env.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class GovernanceReconcilerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(GovernanceReconcilerService.name);
  private timer?: NodeJS.Timeout;
  private readonly wallet: WalletClient;
  private readonly intervalMs: number;

  constructor(private readonly prisma: PrismaService) {
    const env = loadEnv(contractRegistryEnvSchema);
    this.wallet = new WalletClient({ baseUrl: env.WALLET_BASE_URL });
    this.intervalMs = env.GOVERNANCE_RECONCILE_INTERVAL_MS;
  }

  onModuleInit(): void {
    this.timer = setInterval(() => {
      void this.reconcilePending().catch((err) =>
        this.logger.warn(`reconcile failed: ${(err as Error).message}`),
      );
    }, this.intervalMs);
    this.logger.log(`GovernanceReconciler polling every ${this.intervalMs}ms`);
  }

  onModuleDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  async reconcilePending(): Promise<void> {
    const pending = await this.prisma.statusProposal.findMany({
      where: { status: { in: [ProposalStatus.PENDING, ProposalStatus.SUBMITTED] } },
      include: { contract: true },
      take: 20,
    });

    for (const proposal of pending) {
      if (proposal.contract.executionMode === ExecutionMode.DB_ONLY) continue;

      if (proposal.status === ProposalStatus.SUBMITTED && proposal.broadcastJobId) {
        const job = await this.wallet.getTransfer(proposal.broadcastJobId);
        if (job.status === 'CONFIRMED' && job.tx_hash) {
          const nextStatus =
            proposal.action === 'PAUSE' ? ContractStatus.PAUSED : ContractStatus.ACTIVE;
          await this.prisma.$transaction([
            this.prisma.deployedContract.update({
              where: { id: proposal.contractId },
              data: { status: nextStatus },
            }),
            this.prisma.statusProposal.update({
              where: { id: proposal.id },
              data: {
                status: ProposalStatus.EXECUTED,
                txHash: job.tx_hash,
                executedAt: new Date(),
                error: null,
              },
            }),
          ]);
          this.logger.log(`proposal ${proposal.id} executed on-chain tx=${job.tx_hash}`);
        } else if (job.status === 'FAILED') {
          await this.prisma.statusProposal.update({
            where: { id: proposal.id },
            data: {
              status: ProposalStatus.FAILED,
              error: job.last_error ?? 'broadcast failed',
            },
          });
        }
      }
    }
  }
}
