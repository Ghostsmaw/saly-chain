import { Inject, Injectable, Logger } from '@nestjs/common';
import { ulid } from 'ulid';
import {
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from '@salychain/errors';
import { SUBJECTS } from '@salychain/events';
import { WalletClient, ExecutionClient } from '@salychain/sdk-internal';
import type { Agent, AgentSpendingPolicy, AgentStatus, OwnerKind, Prisma } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AGENTS_ENV, type AgentsRuntimeEnv } from '../config/env.runtime.js';
import { WALLET_CLIENT } from '../clients/wallet.client.module.js';
import { EXECUTION_CLIENT } from '../clients/execution.client.module.js';
import { OutboxService } from '../outbox/outbox.service.js';

export interface PublicAgent {
  id: string;
  owner_id: string;
  owner_kind: OwnerKind;
  org_id?: string;
  name: string;
  status: AgentStatus;
  metadata?: Record<string, unknown>;
  wallet_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface PublicSpendingPolicy {
  agent_id: string;
  per_tx_cap_minor: string;
  daily_cap_minor: string;
  monthly_cap_minor?: string;
  destination_allowlist: string[];
  approval_threshold_minor: string;
  required_approvers: number;
  currency: string;
  version: number;
  updated_at: string;
}

export interface AuthorizeSpendResult {
  allowed: boolean;
  pending_approval?: boolean;
  approval_request_id?: string;
  reason_code?: string;
  reason_message?: string;
  policy_version: number;
}

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(WALLET_CLIENT) private readonly wallet: WalletClient,
    @Inject(EXECUTION_CLIENT) private readonly execution: ExecutionClient,
    @Inject(AGENTS_ENV) private readonly env: AgentsRuntimeEnv,
    private readonly outbox: OutboxService,
  ) {}

  async create(input: {
    ownerId: string;
    ownerKind: OwnerKind;
    orgId?: string;
    name: string;
    metadata?: Record<string, unknown>;
    provisionChains?: Array<'BASE' | 'XRPL'>;
  }): Promise<PublicAgent> {
    if (!input.ownerId.startsWith('usr_') && !input.ownerId.startsWith('biz_')) {
      throw ValidationError('agents.owner.invalid', 'owner_id must be a usr_* or biz_* reference');
    }

    const id = `agt_${ulid()}`;
    const chains = input.provisionChains?.length ? input.provisionChains : (['BASE'] as const);

    const agent = await this.prisma.agent.create({
      data: {
        id,
        ownerId: input.ownerId,
        ownerKind: input.ownerKind,
        orgId: input.orgId ?? null,
        name: input.name,
        metadata: input.metadata !== undefined ? (input.metadata as Prisma.InputJsonValue) : undefined,
        policy: {
          create: {
            perTxCapMinor: this.env.DEFAULT_PER_TX_CAP_MINOR,
            dailyCapMinor: this.env.DEFAULT_DAILY_CAP_MINOR,
            destinationAllowlist: ['*'],
            approvalThresholdMinor: 0n,
            requiredApprovers: 0,
            currency: 'USD',
          },
        },
      },
      include: { policy: true },
    }) as Agent & { policy: AgentSpendingPolicy };

    const walletIds: string[] = [];
    for (const chain of chains) {
      const w = await this.wallet.provision({
        chain,
        kind: 'AGENT_CUSTODIAL',
        ownerId: id,
        ownerKind: 'AGENT',
        label: `${input.name} (${chain})`,
      });
      walletIds.push(w.id);
      await this.wallet.updatePolicy(w.id, {
        perTxCapMinor: agent.policy.perTxCapMinor.toString(),
        dailyCapMinor: agent.policy.dailyCapMinor.toString(),
        destinationAllowlist: ['*'],
        approvalThresholdMinor: '0',
        requiredApprovers: 0,
      });
    }

    await this.outbox.enqueue(SUBJECTS.AGENT_CREATED, {
      agent_id: id,
      owner_id: input.ownerId,
      owner_kind: input.ownerKind,
      wallet_ids: walletIds,
    });

    this.logger.log(`agent created id=${id} owner=${input.ownerId} wallets=${walletIds.join(',')}`);
    return this.toPublic(agent, walletIds);
  }

  async list(opts: { ownerId?: string; orgId?: string; limit?: number }): Promise<PublicAgent[]> {
    const where: { ownerId?: string; orgId?: string; status?: { not: 'ARCHIVED' } } = {
      status: { not: 'ARCHIVED' },
    };
    if (opts.ownerId) where.ownerId = opts.ownerId;
    if (opts.orgId) where.orgId = opts.orgId;

    const rows = await this.prisma.agent.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: Math.min(Math.max(opts.limit ?? 50, 1), 200),
    });

    return Promise.all(rows.map(async (row) => this.toPublicWithWallets(row)));
  }

  async getById(id: string): Promise<PublicAgent> {
    const agent = await this.prisma.agent.findUnique({ where: { id } });
    if (!agent) throw NotFoundError('agents.not_found', `Agent ${id} not found`);
    return this.toPublicWithWallets(agent);
  }

  async setStatus(id: string, status: AgentStatus): Promise<PublicAgent> {
    const agent = await this.prisma.agent.update({ where: { id }, data: { status } });
    return this.toPublicWithWallets(agent);
  }

  async getPolicy(agentId: string): Promise<PublicSpendingPolicy> {
    const policy = await this.requirePolicy(agentId);
    return toPublicPolicy(policy);
  }

  async updatePolicy(
    agentId: string,
    patch: {
      perTxCapMinor?: string;
      dailyCapMinor?: string;
      monthlyCapMinor?: string;
      destinationAllowlist?: string[];
      approvalThresholdMinor?: string;
      requiredApprovers?: number;
      currency?: string;
    },
  ): Promise<PublicSpendingPolicy> {
    const agent = await this.prisma.agent.findUnique({ where: { id: agentId } });
    if (!agent) throw NotFoundError('agents.not_found', `Agent ${agentId} not found`);
    if (agent.status !== 'ACTIVE') {
      throw AuthorizationError('agents.inactive', `Agent ${agentId} is ${agent.status}`);
    }

    const existing = await this.requirePolicy(agentId);
    const updated = await this.prisma.agentSpendingPolicy.update({
      where: { agentId },
      data: {
        perTxCapMinor: patch.perTxCapMinor !== undefined ? BigInt(patch.perTxCapMinor) : undefined,
        dailyCapMinor: patch.dailyCapMinor !== undefined ? BigInt(patch.dailyCapMinor) : undefined,
        monthlyCapMinor: patch.monthlyCapMinor !== undefined ? BigInt(patch.monthlyCapMinor) : undefined,
        destinationAllowlist:
          patch.destinationAllowlist !== undefined ? patch.destinationAllowlist : undefined,
        approvalThresholdMinor:
          patch.approvalThresholdMinor !== undefined ? BigInt(patch.approvalThresholdMinor) : undefined,
        requiredApprovers: patch.requiredApprovers,
        currency: patch.currency,
        version: { increment: 1 },
      },
    });

    const wallets = await this.wallet.listWalletsByActor({ actorRef: agentId });
    for (const w of wallets.data) {
      await this.wallet.updatePolicy(w.id, {
        perTxCapMinor: updated.perTxCapMinor.toString(),
        dailyCapMinor: updated.dailyCapMinor.toString(),
        destinationAllowlist: updated.destinationAllowlist as string[],
        approvalThresholdMinor: updated.approvalThresholdMinor.toString(),
        requiredApprovers: updated.requiredApprovers,
      });
    }

    await this.outbox.enqueue(SUBJECTS.AGENT_POLICY_UPDATED, {
      agent_id: agentId,
      policy_version: updated.version,
    });

    return toPublicPolicy(updated);
  }

  async authorizeSpend(
    agentId: string,
    input: { amountMinor: string; destinationAddress: string; intentId?: string },
  ): Promise<AuthorizeSpendResult> {
    const agent = await this.prisma.agent.findUnique({ where: { id: agentId } });
    if (!agent) throw NotFoundError('agents.not_found', `Agent ${agentId} not found`);
    if (agent.status !== 'ACTIVE') {
      return {
        allowed: false,
        reason_code: 'agents.inactive',
        reason_message: `Agent is ${agent.status}`,
        policy_version: 0,
      };
    }

    const policy = await this.requirePolicy(agentId);
    const amount = BigInt(input.amountMinor);
    const dest = input.destinationAddress.toLowerCase();
    const allowlist = policy.destinationAllowlist as string[];

    if (
      allowlist.length > 0 &&
      !allowlist.includes('*') &&
      !allowlist.some((a) => a.toLowerCase() === dest)
    ) {
      await this.publishSpendDenied(agentId, input.intentId, 'agents.policy.destination_not_allowed');
      return {
        allowed: false,
        reason_code: 'agents.policy.destination_not_allowed',
        reason_message: `Destination ${input.destinationAddress} not in agent allowlist`,
        policy_version: policy.version,
      };
    }

    if (amount > policy.perTxCapMinor) {
      await this.publishSpendDenied(agentId, input.intentId, 'agents.policy.per_tx_cap_exceeded');
      return {
        allowed: false,
        reason_code: 'agents.policy.per_tx_cap_exceeded',
        reason_message: `Amount ${amount} exceeds per-tx cap ${policy.perTxCapMinor}`,
        policy_version: policy.version,
      };
    }

    const wallets = await this.wallet.listWalletsByActor({ actorRef: agentId });
    let rolling24h = 0n;
    let rolling30d = 0n;
    for (const w of wallets.data) {
      const spend24 = await this.wallet.getRollingSpend(w.id);
      rolling24h += BigInt(spend24.rolling_24h_spent_minor);
      const spend30 = await this.wallet.getRollingSpend30d(w.id);
      rolling30d += BigInt(spend30.rolling_30d_spent_minor);
    }
    if (rolling24h + amount > policy.dailyCapMinor) {
      await this.publishSpendDenied(agentId, input.intentId, 'agents.policy.daily_cap_exceeded');
      return {
        allowed: false,
        reason_code: 'agents.policy.daily_cap_exceeded',
        reason_message: `Rolling 24h spend would exceed daily cap ${policy.dailyCapMinor}`,
        policy_version: policy.version,
      };
    }

    if (policy.monthlyCapMinor !== null && rolling30d + amount > policy.monthlyCapMinor) {
      await this.publishSpendDenied(agentId, input.intentId, 'agents.policy.monthly_cap_exceeded');
      return {
        allowed: false,
        reason_code: 'agents.policy.monthly_cap_exceeded',
        reason_message: `Rolling 30d spend would exceed monthly cap ${policy.monthlyCapMinor}`,
        policy_version: policy.version,
      };
    }

    if (
      policy.requiredApprovers > 0 &&
      policy.approvalThresholdMinor > 0n &&
      amount > policy.approvalThresholdMinor
    ) {
      const approved = input.intentId
        ? await this.prisma.spendApprovalRequest.findFirst({
            where: { agentId, intentId: input.intentId, status: 'APPROVED' },
          })
        : null;
      if (approved) {
        return { allowed: true, policy_version: policy.version };
      }

      let pending = input.intentId
        ? await this.prisma.spendApprovalRequest.findFirst({
            where: { agentId, intentId: input.intentId, status: 'PENDING' },
          })
        : null;

      if (!pending) {
        pending = await this.prisma.spendApprovalRequest.create({
          data: {
            id: `apr_${ulid()}`,
            agentId,
            intentId: input.intentId ?? null,
            amountMinor: amount,
            destination: input.destinationAddress,
            requiredApprovers: policy.requiredApprovers,
          },
        });
      }

      if (pending.approvalCount >= pending.requiredApprovers) {
        await this.prisma.spendApprovalRequest.update({
          where: { id: pending.id },
          data: { status: 'APPROVED' },
        });
        return { allowed: true, policy_version: policy.version };
      }

      return {
        allowed: false,
        pending_approval: true,
        approval_request_id: pending.id,
        reason_code: 'agents.policy.approvals_required',
        reason_message: `Amount ${amount} requires ${policy.requiredApprovers} approver(s); ${pending.approvalCount} recorded`,
        policy_version: policy.version,
      };
    }

    return { allowed: true, policy_version: policy.version };
  }

  async listSpendApprovals(agentId: string, status?: 'PENDING' | 'APPROVED' | 'REJECTED') {
    await this.getById(agentId);
    const rows = await this.prisma.spendApprovalRequest.findMany({
      where: { agentId, ...(status ? { status } : {}) },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return {
      data: rows.map((r) => ({
        id: r.id,
        agent_id: r.agentId,
        intent_id: r.intentId ?? undefined,
        amount_minor: r.amountMinor.toString(),
        destination: r.destination,
        approval_count: r.approvalCount,
        required_approvers: r.requiredApprovers,
        status: r.status,
        created_at: r.createdAt.toISOString(),
        updated_at: r.updatedAt.toISOString(),
      })),
    };
  }

  async getSpendApprovalByIntent(agentId: string, intentId: string) {
    await this.getById(agentId);
    const row = await this.prisma.spendApprovalRequest.findFirst({
      where: { agentId, intentId },
      orderBy: { createdAt: 'desc' },
    });
    if (!row) {
      return {
        agent_id: agentId,
        intent_id: intentId,
        approval_count: 0,
        required_approvers: 0,
        status: 'NONE' as const,
      };
    }
    return {
      id: row.id,
      agent_id: row.agentId,
      intent_id: row.intentId ?? intentId,
      approval_count: row.approvalCount,
      required_approvers: row.requiredApprovers,
      status: row.status,
      created_at: row.createdAt.toISOString(),
      updated_at: row.updatedAt.toISOString(),
    };
  }

  async voteSpendApproval(agentId: string, requestId: string, approverId: string) {
    if (!approverId.startsWith('usr_')) {
      throw ValidationError('agents.approval.invalid_approver', 'approver_id must be a usr_* reference');
    }
    const agent = await this.prisma.agent.findUnique({ where: { id: agentId } });
    if (!agent) throw NotFoundError('agents.not_found', `Agent ${agentId} not found`);

    const request = await this.prisma.spendApprovalRequest.findFirst({
      where: { id: requestId, agentId },
    });
    if (!request) throw NotFoundError('agents.approval.not_found', `Approval request ${requestId} not found`);
    if (request.status !== 'PENDING') {
      throw ValidationError('agents.approval.not_pending', `Approval request is ${request.status}`);
    }

    try {
      await this.prisma.spendApprovalVote.create({
        data: { id: `apv_${ulid()}`, requestId, approverId },
      });
    } catch {
      throw ValidationError('agents.approval.duplicate_vote', `${approverId} already voted on this request`);
    }

    const updated = await this.prisma.spendApprovalRequest.update({
      where: { id: requestId },
      data: { approvalCount: { increment: 1 } },
    });

    const approved = updated.approvalCount >= updated.requiredApprovers;
    if (approved) {
      await this.prisma.spendApprovalRequest.update({
        where: { id: requestId },
        data: { status: 'APPROVED' },
      });
      if (updated.intentId) {
        try {
          await this.execution.resumeAfterApproval(updated.intentId);
        } catch (err) {
          this.logger.warn(`execution resume after approval failed intent=${updated.intentId}: ${(err as Error).message}`);
        }
      }
    }

    return {
      id: updated.id,
      agent_id: updated.agentId,
      intent_id: updated.intentId ?? undefined,
      approval_count: updated.approvalCount,
      required_approvers: updated.requiredApprovers,
      status: approved ? 'APPROVED' : 'PENDING',
    };
  }

  async recordReasoningLog(
    agentId: string,
    input: { summary: string; steps: unknown[]; intentId?: string; traceId?: string },
  ) {
    const agent = await this.prisma.agent.findUnique({ where: { id: agentId } });
    if (!agent) throw NotFoundError('agents.not_found', `Agent ${agentId} not found`);

    const log = await this.prisma.agentReasoningLog.create({
      data: {
        id: `arl_${ulid()}`,
        agentId,
        intentId: input.intentId ?? null,
        traceId: input.traceId ?? null,
        summary: input.summary,
        steps: input.steps as never,
      },
    });

    return {
      id: log.id,
      agent_id: log.agentId,
      intent_id: log.intentId ?? undefined,
      trace_id: log.traceId ?? undefined,
      summary: log.summary,
      steps: log.steps,
      created_at: log.createdAt.toISOString(),
    };
  }

  async listReasoningLogs(agentId: string, limit = 25) {
    const rows = await this.prisma.agentReasoningLog.findMany({
      where: { agentId },
      orderBy: { createdAt: 'desc' },
      take: Math.min(Math.max(limit, 1), 100),
    });
    return {
      data: rows.map((r) => ({
        id: r.id,
        agent_id: r.agentId,
        intent_id: r.intentId ?? undefined,
        trace_id: r.traceId ?? undefined,
        summary: r.summary,
        steps: r.steps,
        created_at: r.createdAt.toISOString(),
      })),
    };
  }

  async assertAgentActive(agentId: string, ownerId?: string): Promise<void> {
    const agent = await this.prisma.agent.findUnique({ where: { id: agentId } });
    if (!agent) throw NotFoundError('agents.not_found', `Agent ${agentId} not found`);
    if (agent.status !== 'ACTIVE') {
      throw AuthorizationError('agents.inactive', `Agent ${agentId} is ${agent.status}`);
    }
    if (ownerId && agent.ownerId !== ownerId) {
      throw AuthorizationError('agents.owner_mismatch', `Agent ${agentId} is not owned by ${ownerId}`);
    }
  }

  private async requirePolicy(agentId: string): Promise<AgentSpendingPolicy> {
    const policy = await this.prisma.agentSpendingPolicy.findUnique({ where: { agentId } });
    if (!policy) throw NotFoundError('agents.policy.not_found', `Policy for agent ${agentId} not found`);
    return policy;
  }

  private async toPublicWithWallets(agent: Agent): Promise<PublicAgent> {
    const wallets = await this.wallet.listWalletsByActor({ actorRef: agent.id });
    return this.toPublic(agent, wallets.data.map((w) => w.id));
  }

  private toPublic(agent: Agent, walletIds: string[]): PublicAgent {
    return {
      id: agent.id,
      owner_id: agent.ownerId,
      owner_kind: agent.ownerKind,
      org_id: agent.orgId ?? undefined,
      name: agent.name,
      status: agent.status,
      metadata: (agent.metadata as Record<string, unknown> | null) ?? undefined,
      wallet_ids: walletIds,
      created_at: agent.createdAt.toISOString(),
      updated_at: agent.updatedAt.toISOString(),
    };
  }

  private async publishSpendDenied(agentId: string, intentId: string | undefined, reasonCode: string) {
    await this.outbox.enqueue(SUBJECTS.AGENT_SPEND_DENIED, {
      agent_id: agentId,
      intent_id: intentId,
      reason_code: reasonCode,
    });
  }
}

function toPublicPolicy(policy: AgentSpendingPolicy): PublicSpendingPolicy {
  return {
    agent_id: policy.agentId,
    per_tx_cap_minor: policy.perTxCapMinor.toString(),
    daily_cap_minor: policy.dailyCapMinor.toString(),
    monthly_cap_minor: policy.monthlyCapMinor?.toString(),
    destination_allowlist: policy.destinationAllowlist as string[],
    approval_threshold_minor: policy.approvalThresholdMinor.toString(),
    required_approvers: policy.requiredApprovers,
    currency: policy.currency,
    version: policy.version,
    updated_at: policy.updatedAt.toISOString(),
  };
}
