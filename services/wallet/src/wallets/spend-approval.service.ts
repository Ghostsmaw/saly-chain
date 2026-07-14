import { Inject, Injectable, Logger } from '@nestjs/common';
import { AgentsClient } from '@salychain/sdk-internal';
import type { BroadcastJob, Wallet } from '../generated/prisma/index.js';
import { AGENTS_CLIENT } from '../clients/agents.client.module.js';

/**
 * Resolves how many approver votes the signer should see for a broadcast job.
 * The agents service is the source of truth for spend approvals.
 */
@Injectable()
export class SpendApprovalService {
  private readonly logger = new Logger(SpendApprovalService.name);

  constructor(@Inject(AGENTS_CLIENT) private readonly agents: AgentsClient) {}

  async resolveApproversForJob(
    wallet: Wallet,
    job: BroadcastJob,
    policy: { approvalThresholdMinor: bigint; requiredApprovers: number },
  ): Promise<number> {
    if (policy.requiredApprovers <= 0) return 0;
    if (job.amountMinor <= policy.approvalThresholdMinor) return 0;
    if (!job.intentId) return 0;
    if (wallet.kind !== 'AGENT_CUSTODIAL' || !wallet.ownerId) return 0;

    try {
      const approval = await this.agents.getSpendApprovalByIntent(wallet.ownerId, job.intentId);
      if (approval.status !== 'APPROVED') return 0;
      return approval.approval_count;
    } catch (err) {
      this.logger.warn(
        `spend approval lookup failed agent=${wallet.ownerId} intent=${job.intentId}: ${(err as Error).message}`,
      );
      return 0;
    }
  }
}
