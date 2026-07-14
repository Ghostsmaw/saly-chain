import type { Address, Hex } from 'viem';
import { L3ChainAdapter, resolveBridgeL2TokenAddress, type L3Network } from '@salychain/chain-l3';
import { SignerClient } from '@salychain/sdk-internal';
import type { Wallet, BroadcastJob } from '../../generated/prisma/index.js';
import type { PolicyService } from '../../wallets/policy.service.js';
import type { TxDispatcher, DispatchResult } from './dispatcher.js';

export interface L2BridgePayload {
  l2_standard_bridge: string;
  l2_token: string;
  l1_recipient: string;
}

/** L3 → Base via L2StandardBridge.withdrawTo (+ approve when needed). */
export class L3BridgeDispatcher implements TxDispatcher {
  readonly rail = 'L3' as const;

  constructor(
    private readonly l3: L3ChainAdapter,
    private readonly signer: SignerClient,
    private readonly policyService: PolicyService,
    private readonly l3Network: L3Network,
  ) {}

  async dispatch(wallet: Wallet, job: BroadcastJob): Promise<DispatchResult> {
    if (job.kind !== 'BRIDGE_WITHDRAW') {
      throw new Error(`L3BridgeDispatcher expected BRIDGE_WITHDRAW, got ${job.kind}`);
    }
    const payload = job.bridgePayload as L2BridgePayload | null;
    if (!payload?.l2_standard_bridge || !payload.l2_token || !payload.l1_recipient) {
      throw new Error(`Bridge job ${job.id} missing bridge_payload fields`);
    }

    const from = wallet.address as Address;
    const bridge = payload.l2_standard_bridge as Address;
    const l2Token = payload.l2_token as Address;
    const l1Recipient = payload.l1_recipient as Address;

    const { policy, rolling24hSpentMinor, approvers } = await this.policyService.loadForBroadcast(wallet, job);

    const allowance = await this.l3.getAllowance({ owner: from, spender: bridge, token: l2Token });
    if (allowance < job.amountMinor) {
      const approvePrepared = await this.l3.prepareApprove({
        from,
        token: l2Token,
        spender: bridge,
        amountMinor: job.amountMinor,
      });
      await this.signAndBroadcast({
        wallet,
        job,
        prepared: approvePrepared,
        policy,
        rolling24hSpentMinor,
        approvers,
        label: 'bridge-approve',
      });
    }

    const withdrawPrepared = await this.l3.prepareBridgeWithdraw({
      from,
      l2StandardBridge: bridge,
      l2Token,
      l1Recipient,
      amountMinor: job.amountMinor,
    });

    const txHash = await this.signAndBroadcast({
      wallet,
      job,
      prepared: withdrawPrepared,
      policy,
      rolling24hSpentMinor,
      approvers,
      label: 'bridge-withdraw',
    });

    return { txHash, signedTx: withdrawPrepared.unsigned, rail: this.rail };
  }

  private async signAndBroadcast(input: {
    wallet: Wallet;
    job: BroadcastJob;
    prepared: { unsigned: Hex; nonce: number };
    policy: Awaited<ReturnType<PolicyService['loadForBroadcast']>>['policy'];
    rolling24hSpentMinor: bigint;
    approvers: number;
    label: string;
  }): Promise<string> {
    const signed = await this.signer.sign({
      idempotency_key: `bcast:${input.job.id}:${input.label}:nonce${input.prepared.nonce}`,
      wallet_id: input.wallet.id,
      signer_key_ref: input.wallet.signerKeyRef,
      chain: 'SALY_L3',
      unsigned_tx: input.prepared.unsigned,
      policy_context: {
        destination_chain: 'SALY_L3',
        destination_address: input.job.destinationAddress,
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

    const { txHash } = await this.l3.broadcast(signed.signed_tx as Hex);
    return txHash;
  }
}

export function defaultBridgeWithdrawPayload(input: {
  l3Network: L3Network;
  l2StandardBridge: Address;
  l1Recipient: Address;
  cwd?: string;
}): L2BridgePayload {
  const l2Token = resolveBridgeL2TokenAddress(input.l3Network, 'USDC', input.cwd);
  if (!l2Token) {
    throw new Error('L2 bridge token not configured');
  }
  return {
    l2_standard_bridge: input.l2StandardBridge,
    l2_token: l2Token,
    l1_recipient: input.l1Recipient,
  };
}
