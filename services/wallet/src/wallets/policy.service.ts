import { Injectable } from '@nestjs/common';
import { XrplChainAdapter, trustLineKey } from '@salychain/chain-xrpl';
import { Prisma } from '../generated/prisma/index.js';
import { NotFoundError, ValidationError } from '@salychain/errors';
import { loadEnv } from '@salychain/config';
import { defaultDexRouterAllowlist, type BaseNetwork } from '@salychain/chain-base';
import type { BroadcastJob, Wallet } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { SpendApprovalService } from './spend-approval.service.js';
import { walletEnvSchema } from '../config/env.js';
import { defaultXrplTrustedIssuerAllowlist } from '../config/xrpl-iou.js';

export interface WalletPolicyDto {
  wallet_id: string;
  destination_allowlist: string[];
  trusted_issuer_allowlist: string[];
  per_tx_cap_minor: string;
  daily_cap_minor: string;
  approval_threshold_minor: string;
  required_approvers: number;
  updated_at: string;
}

export interface RollingSpendDto {
  wallet_id: string;
  rolling_24h_spent_minor: string;
}

export interface RollingSpend30dDto {
  wallet_id: string;
  rolling_30d_spent_minor: string;
}

@Injectable()
export class PolicyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly spendApproval: SpendApprovalService,
  ) {}

  async getPolicy(walletId: string): Promise<WalletPolicyDto> {
    const policy = await this.requirePolicy(walletId);
    return toDto(walletId, policy);
  }

  async updatePolicy(
    walletId: string,
    patch: {
      destinationAllowlist?: string[];
      trustedIssuerAllowlist?: string[];
      perTxCapMinor?: string;
      dailyCapMinor?: string;
      approvalThresholdMinor?: string;
      requiredApprovers?: number;
    },
  ): Promise<WalletPolicyDto> {
    await this.requireWallet(walletId);
    if (patch.perTxCapMinor !== undefined && BigInt(patch.perTxCapMinor) < 0n) {
      throw ValidationError('wallet.policy.invalid_cap', 'per_tx_cap_minor must be non-negative');
    }
    if (patch.dailyCapMinor !== undefined && BigInt(patch.dailyCapMinor) < 0n) {
      throw ValidationError('wallet.policy.invalid_cap', 'daily_cap_minor must be non-negative');
    }
    if (patch.trustedIssuerAllowlist !== undefined) {
      validateTrustedIssuerAllowlist(patch.trustedIssuerAllowlist);
    }

    const updated = await this.prisma.walletPolicy.update({
      where: { walletId },
      data: {
        destinationAllowlist:
          patch.destinationAllowlist !== undefined
            ? (patch.destinationAllowlist as unknown as Prisma.InputJsonValue)
            : undefined,
        trustedIssuerAllowlist:
          patch.trustedIssuerAllowlist !== undefined
            ? (patch.trustedIssuerAllowlist as unknown as Prisma.InputJsonValue)
            : undefined,
        perTxCapMinor: patch.perTxCapMinor !== undefined ? BigInt(patch.perTxCapMinor) : undefined,
        dailyCapMinor: patch.dailyCapMinor !== undefined ? BigInt(patch.dailyCapMinor) : undefined,
        approvalThresholdMinor:
          patch.approvalThresholdMinor !== undefined ? BigInt(patch.approvalThresholdMinor) : undefined,
        requiredApprovers: patch.requiredApprovers,
      },
    });
    return toDto(walletId, updated);
  }

  /**
   * Merge Uniswap SwapRouter02 into allowlist and raise zero caps for BASE wallets.
   * Safe to call repeatedly — idempotent for router + default caps.
   */
  async ensureDexPolicy(walletId: string): Promise<WalletPolicyDto> {
    const wallet = await this.requireWallet(walletId);
    if (wallet.chain !== 'BASE') {
      throw ValidationError('wallet.policy.not_base', 'DEX policy applies to BASE wallets only');
    }

    const env = loadEnv(walletEnvSchema);
    const policy = await this.requirePolicy(walletId);
    const routers = defaultDexRouterAllowlist(env.BASE_NETWORK as BaseNetwork);
    const current = (policy.destinationAllowlist as string[]).map((a) => a.toLowerCase());
    const merged = [...new Set([...current, ...routers])];

    const perTxCapMinor =
      policy.perTxCapMinor > 0n ? policy.perTxCapMinor : env.WALLET_BASE_DEFAULT_PER_TX_CAP_MINOR;
    const dailyCapMinor =
      policy.dailyCapMinor > 0n ? policy.dailyCapMinor : env.WALLET_BASE_DEFAULT_DAILY_CAP_MINOR;

    const updated = await this.prisma.walletPolicy.update({
      where: { walletId },
      data: {
        destinationAllowlist: merged as unknown as Prisma.InputJsonValue,
        perTxCapMinor,
        dailyCapMinor,
      },
    });
    return toDto(walletId, updated);
  }

  /**
   * Merge configured XRPL IOU issuers into trust-line allowlist and raise zero caps.
   * Safe to call repeatedly — idempotent for env-configured issuers.
   */
  async ensureXrplIouPolicy(walletId: string): Promise<WalletPolicyDto> {
    const wallet = await this.requireWallet(walletId);
    if (wallet.chain !== 'XRPL') {
      throw ValidationError('wallet.policy.not_xrpl', 'XRPL IOU policy applies to XRPL wallets only');
    }

    const env = loadEnv(walletEnvSchema);
    const policy = await this.requirePolicy(walletId);
    const defaults = defaultXrplTrustedIssuerAllowlist(env.XRPL_IOU_ISSUERS);
    const current = (policy.trustedIssuerAllowlist as string[]).map((entry) => entry.toUpperCase());
    const merged = [...new Set([...current, ...defaults.map((entry) => entry.toUpperCase())])];

    const perTxCapMinor =
      policy.perTxCapMinor > 0n ? policy.perTxCapMinor : env.WALLET_XRPL_DEFAULT_PER_TX_CAP_MINOR;
    const dailyCapMinor =
      policy.dailyCapMinor > 0n ? policy.dailyCapMinor : env.WALLET_XRPL_DEFAULT_DAILY_CAP_MINOR;

    const updated = await this.prisma.walletPolicy.update({
      where: { walletId },
      data: {
        trustedIssuerAllowlist: merged as unknown as Prisma.InputJsonValue,
        perTxCapMinor,
        dailyCapMinor,
      },
    });
    return toDto(walletId, updated);
  }

  async getRolling24hSpentMinor(walletId: string): Promise<RollingSpendDto> {
    await this.requireWallet(walletId);
    return {
      wallet_id: walletId,
      rolling_24h_spent_minor: (await this.aggregateSpendSince(walletId, 24)).toString(),
    };
  }

  async getRolling30dSpentMinor(walletId: string): Promise<RollingSpend30dDto> {
    await this.requireWallet(walletId);
    return {
      wallet_id: walletId,
      rolling_30d_spent_minor: (await this.aggregateSpendSince(walletId, 24 * 30)).toString(),
    };
  }

  private async aggregateSpendSince(walletId: string, hours: number): Promise<bigint> {
    const since = new Date(Date.now() - hours * 60 * 60 * 1_000);
    const agg = await this.prisma.broadcastJob.aggregate({
      where: {
        walletId,
        createdAt: { gte: since },
        status: { in: ['PENDING', 'SUBMITTED', 'CONFIRMED'] },
      },
      _sum: { amountMinor: true },
    });
    return agg._sum.amountMinor ?? 0n;
  }

  async loadForSigning(walletId: string) {
    const policy = await this.requirePolicy(walletId);
    const rolling = await this.getRolling24hSpentMinor(walletId);
    const allowlist = policy.destinationAllowlist as string[];
    const trustedIssuerAllowlist = (policy.trustedIssuerAllowlist as string[]) ?? [];
    return {
      policy: {
        destinationAllowlist: allowlist,
        trustedIssuerAllowlist,
        perTxCapMinor: policy.perTxCapMinor,
        dailyCapMinor: policy.dailyCapMinor,
        approvalThresholdMinor: policy.approvalThresholdMinor,
        requiredApprovers: policy.requiredApprovers,
      },
      rolling24hSpentMinor: BigInt(rolling.rolling_24h_spent_minor),
      approvers: 0,
    };
  }

  async loadForBroadcast(wallet: Wallet, job: BroadcastJob) {
    const policy = await this.requirePolicy(wallet.id);
    const rolling = await this.getRolling24hSpentMinor(wallet.id);
    const allowlist = policy.destinationAllowlist as string[];
    const trustedIssuerAllowlist = (policy.trustedIssuerAllowlist as string[]) ?? [];
    const approvers = await this.spendApproval.resolveApproversForJob(wallet, job, policy);
    return {
      policy: {
        destinationAllowlist: allowlist,
        trustedIssuerAllowlist,
        perTxCapMinor: policy.perTxCapMinor,
        dailyCapMinor: policy.dailyCapMinor,
        approvalThresholdMinor: policy.approvalThresholdMinor,
        requiredApprovers: policy.requiredApprovers,
      },
      rolling24hSpentMinor: BigInt(rolling.rolling_24h_spent_minor),
      approvers,
    };
  }

  private async requireWallet(walletId: string) {
    const wallet = await this.prisma.wallet.findUnique({ where: { id: walletId } });
    if (!wallet) throw NotFoundError('wallet.not_found', `Wallet ${walletId} not found`);
    return wallet;
  }

  private async requirePolicy(walletId: string) {
    const policy = await this.prisma.walletPolicy.findUnique({ where: { walletId } });
    if (!policy) throw NotFoundError('wallet.policy.not_found', `Policy for wallet ${walletId} not found`);
    return policy;
  }
}

function toDto(
  walletId: string,
  policy: {
    destinationAllowlist: unknown;
    trustedIssuerAllowlist?: unknown;
    perTxCapMinor: bigint;
    dailyCapMinor: bigint;
    approvalThresholdMinor: bigint;
    requiredApprovers: number;
    updatedAt: Date;
  },
): WalletPolicyDto {
  return {
    wallet_id: walletId,
    destination_allowlist: policy.destinationAllowlist as string[],
    trusted_issuer_allowlist: (policy.trustedIssuerAllowlist as string[] | undefined) ?? [],
    per_tx_cap_minor: policy.perTxCapMinor.toString(),
    daily_cap_minor: policy.dailyCapMinor.toString(),
    approval_threshold_minor: policy.approvalThresholdMinor.toString(),
    required_approvers: policy.requiredApprovers,
    updated_at: policy.updatedAt.toISOString(),
  };
}

function validateTrustedIssuerAllowlist(entries: string[]): void {
  for (const entry of entries) {
    if (entry === '*') continue;
    const parsed = entry.includes(':') ? entry.split(':') : null;
    if (!parsed || parsed.length !== 2) {
      throw ValidationError(
        'wallet.policy.bad_trust_line',
        `Invalid trust-line entry "${entry}" — expected CURRENCY:issuer or "*"`,
      );
    }
    const [currency, issuer] = parsed;
    if (!currency || !issuer) {
      throw ValidationError('wallet.policy.bad_trust_line', `Invalid trust-line entry "${entry}"`);
    }
    if (!/^[A-Z0-9]{3}$|^[0-9A-Fa-f]{40}$/i.test(currency)) {
      throw ValidationError('wallet.policy.bad_trust_line', `Invalid currency in trust-line entry "${entry}"`);
    }
    if (!XrplChainAdapter.isValidAddress(issuer)) {
      throw ValidationError('wallet.policy.bad_trust_line', `Invalid issuer address in trust-line entry "${entry}"`);
    }
    if (trustLineKey(currency, issuer).toUpperCase() !== entry.toUpperCase()) {
      throw ValidationError(
        'wallet.policy.bad_trust_line',
        `Trust-line entry must use canonical form ${trustLineKey(currency, issuer)}`,
      );
    }
  }
}
