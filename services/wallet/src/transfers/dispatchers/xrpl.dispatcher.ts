import {
  XrplChainAdapter,
  XRPL_IOU_DECIMALS,
  iouValueFromMinor,
  isTrustedIssuer,
  isXrplIouAsset,
  isXrplNativeAsset,
} from '@salychain/chain-xrpl';
import { loadEnv } from '@salychain/config';
import { SignerClient } from '@salychain/sdk-internal';
import { ValidationError } from '@salychain/errors';
import type { Wallet, BroadcastJob } from '../../generated/prisma/index.js';
import { walletEnvSchema } from '../../config/env.js';
import { resolveXrplIouIssuer } from '../../config/xrpl-iou.js';
import type { PolicyService } from '../../wallets/policy.service.js';
import type { TxDispatcher, DispatchResult } from './dispatcher.js';

type PolicySnapshot = {
  destinationAllowlist: unknown;
  trustedIssuerAllowlist: unknown;
  perTxCapMinor: bigint;
  dailyCapMinor: bigint;
  approvalThresholdMinor: bigint;
  requiredApprovers: number;
};

/**
 * Dispatches XRPL broadcast jobs: native XRP Payments and issued-currency (IOU)
 * transfers. IOU payouts enforce wallet trust-line policy and auto-establish a
 * TrustSet when the custodial account lacks a line for the configured issuer.
 */
export class XrplDispatcher implements TxDispatcher {
  readonly rail = 'XRPL' as const;

  constructor(
    private readonly xrpl: XrplChainAdapter,
    private readonly signer: SignerClient,
    private readonly policyService: PolicyService,
  ) {}

  async dispatch(wallet: Wallet, job: BroadcastJob): Promise<DispatchResult> {
    const ctx = await this.policyService.loadForBroadcast(wallet, job);
    if (isXrplNativeAsset(job.asset)) {
      return this.dispatchNativeXrp(wallet, job, ctx);
    }
    if (isXrplIouAsset(job.asset)) {
      return this.dispatchIou(wallet, job, ctx);
    }
    throw ValidationError(
      'wallet.xrpl.asset_unsupported',
      `Unsupported XRPL asset ${job.asset} (expected XRP or 3-char IOU code)`,
    );
  }

  private async dispatchNativeXrp(
    wallet: Wallet,
    job: BroadcastJob,
    ctx: Awaited<ReturnType<PolicyService['loadForBroadcast']>>,
  ): Promise<DispatchResult> {
    const prepared = await this.xrpl.prepareTransfer({
      from: wallet.address,
      to: job.destinationAddress,
      amountDrops: job.amountMinor,
      destinationTag: job.destinationTag ?? undefined,
      memo: job.memo ?? undefined,
    });

    const txHash = await this.signAndBroadcast({
      wallet,
      job,
      policy: ctx.policy,
      rolling24hSpentMinor: ctx.rolling24hSpentMinor,
      approvers: ctx.approvers,
      unsignedBlob: prepared.unsignedBlob,
      sequence: prepared.sequence,
      assetSymbol: 'XRP',
      label: 'xrp-payment',
    });

    return { txHash, signedTx: '', rail: this.rail };
  }

  private async dispatchIou(
    wallet: Wallet,
    job: BroadcastJob,
    ctx: Awaited<ReturnType<PolicyService['loadForBroadcast']>>,
  ): Promise<DispatchResult> {
    const env = loadEnv(walletEnvSchema);
    const currency = job.asset.toUpperCase();
    const issuer = resolveXrplIouIssuer(currency, env.XRPL_IOU_ISSUERS, job.iouIssuer);
    if (!issuer) {
      throw ValidationError(
        'wallet.xrpl.iou_issuer_missing',
        `No XRPL issuer configured for ${currency} (set XRPL_IOU_ISSUERS or pass iou_issuer)`,
      );
    }

    const trustedAllowlist = (ctx.policy.trustedIssuerAllowlist as string[]) ?? [];
    if (!isTrustedIssuer(trustedAllowlist, currency, issuer)) {
      throw ValidationError(
        'wallet.xrpl.issuer_not_trusted',
        `Issuer ${issuer} is not in wallet trusted_issuer_allowlist for ${currency}`,
      );
    }

    const hasLine = await this.xrpl.hasTrustLine(wallet.address, currency, issuer);
    if (!hasLine) {
      const trustPrepared = await this.xrpl.prepareTrustSet({
        account: wallet.address,
        currency,
        issuer,
        limit: env.XRPL_DEFAULT_TRUST_LIMIT,
      });
      await this.signAndBroadcast({
        wallet,
        job,
        policy: ctx.policy,
        rolling24hSpentMinor: ctx.rolling24hSpentMinor,
        approvers: ctx.approvers,
        unsignedBlob: trustPrepared.unsignedBlob,
        sequence: trustPrepared.sequence,
        assetSymbol: currency,
        label: 'trust-set',
      });
    }

    const decimals = XRPL_IOU_DECIMALS[currency] ?? 2;
    const value = iouValueFromMinor(job.amountMinor, decimals);
    const paymentPrepared = await this.xrpl.prepareIouPayment({
      from: wallet.address,
      to: job.destinationAddress,
      currency: { currency, issuer },
      value,
      destinationTag: job.destinationTag ?? undefined,
      memo: job.memo ?? undefined,
    });

    const txHash = await this.signAndBroadcast({
      wallet,
      job,
      policy: ctx.policy,
      rolling24hSpentMinor: ctx.rolling24hSpentMinor,
      approvers: ctx.approvers,
      unsignedBlob: paymentPrepared.unsignedBlob,
      sequence: paymentPrepared.sequence,
      assetSymbol: currency,
      label: 'iou-payment',
    });

    return { txHash, signedTx: '', rail: this.rail };
  }

  private async signAndBroadcast(input: {
    wallet: Wallet;
    job: BroadcastJob;
    policy: PolicySnapshot;
    rolling24hSpentMinor: bigint;
    approvers: number;
    unsignedBlob: string;
    sequence: number;
    assetSymbol: string;
    label: string;
  }): Promise<string> {
    const signed = await this.signer.sign({
      idempotency_key: `bcast:${input.job.id}:${input.label}:seq${input.sequence}`,
      wallet_id: input.wallet.id,
      signer_key_ref: input.wallet.signerKeyRef,
      chain: 'XRPL',
      unsigned_tx: input.unsignedBlob,
      policy_context: {
        destination_chain: 'XRPL',
        destination_address: input.job.destinationAddress,
        amount_minor: input.job.amountMinor.toString(),
        asset_symbol: input.assetSymbol,
        memo: input.job.memo ?? undefined,
      },
      policy: {
        destination_allowlist: input.policy.destinationAllowlist as string[],
        per_tx_cap_minor: input.policy.perTxCapMinor.toString(),
        daily_cap_minor: input.policy.dailyCapMinor.toString(),
        approval_threshold_minor: input.policy.approvalThresholdMinor.toString(),
        required_approvers: input.policy.requiredApprovers,
      },
      rolling_24h_spent_minor: input.rolling24hSpentMinor.toString(),
      approvers: String(input.approvers),
    });

    const blob = signed.signed_tx.startsWith('0x')
      ? signed.signed_tx.slice(2).toUpperCase()
      : signed.signed_tx.toUpperCase();

    const { txHash } = await this.xrpl.broadcast(blob);
    return txHash;
  }
}
