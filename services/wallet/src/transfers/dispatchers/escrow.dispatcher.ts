import type { Address, Hex } from 'viem';
import { BaseChainAdapter } from '@salychain/chain-base';
import { SignerClient } from '@salychain/sdk-internal';
import type { Wallet, BroadcastJob } from '../../generated/prisma/index.js';
import type { PolicyService } from '../../wallets/policy.service.js';
import type { TxDispatcher, DispatchResult } from './dispatcher.js';

/**
 * Funds an on-chain SalyEscrow deal: approve USDC (if needed) then fundDeal.
 * Returns the fundDeal transaction hash for confirmation tracking.
 */
export class EscrowDispatcher implements TxDispatcher {
  readonly rail = 'ESCROW' as const;

  constructor(
    private readonly base: BaseChainAdapter,
    private readonly signer: SignerClient,
    private readonly policyService: PolicyService,
  ) {}

  async dispatch(wallet: Wallet, job: BroadcastJob): Promise<DispatchResult> {
    if (job.kind !== 'ESCROW_FUND') {
      throw new Error(`EscrowDispatcher received job kind ${job.kind}`);
    }
    if (!job.dealId || !job.escrowContract) {
      throw new Error(`Escrow job ${job.id} missing dealId or escrowContract`);
    }

    const from = wallet.address as Address;
    const payee = job.destinationAddress as Address;
    const escrowAddress = job.escrowContract as Address;
    const dealId = job.dealId as Hex;
    const asset = job.asset as 'USDC' | 'ETH';
    const deadline = job.escrowDeadline ?? 0n;

    const { policy, rolling24hSpentMinor, approvers } = await this.policyService.loadForBroadcast(wallet, job);

    const allowance = await this.base.getAllowance({
      owner: from,
      spender: escrowAddress,
      asset,
    });

    if (allowance < job.amountMinor) {
      const approvePrepared = await this.base.prepareApprove({
        from,
        spender: escrowAddress,
        amountMinor: job.amountMinor,
        asset,
      });
      await this.signAndBroadcast({
        wallet,
        job,
        prepared: approvePrepared,
        policy,
        rolling24hSpentMinor,
        approvers,
        payee,
        nonce: approvePrepared.nonce,
        label: 'approve',
      });
    }

    const fundPrepared = await this.base.prepareFundDeal({
      from,
      escrowAddress,
      dealId,
      payee,
      asset,
      amountMinor: job.amountMinor,
      deadline,
    });

    const fundTxHash = await this.signAndBroadcast({
      wallet,
      job,
      prepared: fundPrepared,
      policy,
      rolling24hSpentMinor,
      approvers,
      payee,
      nonce: fundPrepared.nonce,
      label: 'fundDeal',
    });

    return { txHash: fundTxHash, signedTx: fundPrepared.unsigned, rail: this.rail };
  }

  private async signAndBroadcast(input: {
    wallet: Wallet;
    job: BroadcastJob;
    prepared: { unsigned: Hex; nonce: number };
    policy: Awaited<ReturnType<PolicyService['loadForBroadcast']>>['policy'];
    rolling24hSpentMinor: bigint;
    approvers: number;
    payee: Address;
    nonce: number;
    label: string;
  }): Promise<string> {
    const signed = await this.signer.sign({
      idempotency_key: `bcast:${input.job.id}:${input.label}:nonce${input.nonce}`,
      wallet_id: input.wallet.id,
      signer_key_ref: input.wallet.signerKeyRef,
      chain: 'BASE',
      unsigned_tx: input.prepared.unsigned,
      policy_context: {
        destination_chain: 'BASE',
        destination_address: input.payee,
        amount_minor: input.job.amountMinor.toString(),
        asset_symbol: input.job.asset,
        memo: input.job.memo ?? undefined,
      },
      policy: {
        destination_allowlist: input.policy.destinationAllowlist,
        per_tx_cap_minor: input.policy.perTxCapMinor.toString(),
        daily_cap_minor: input.policy.dailyCapMinor.toString(),
        approval_threshold_minor: input.policy.approvalThresholdMinor.toString(),
        required_approvers: input.policy.requiredApprovers,
      },
      rolling_24h_spent_minor: input.rolling24hSpentMinor.toString(),
      approvers: String(input.approvers),
    });

    const { txHash } = await this.base.broadcast(signed.signed_tx as Hex);
    await this.base.waitForReceipt(txHash, 1);
    return txHash;
  }
}
