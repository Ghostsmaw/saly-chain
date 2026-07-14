import type { Address, Hex } from 'viem';
import { BaseChainAdapter, BASE_ASSETS, type BaseNetwork } from '@salychain/chain-base';
import { resolveBridgeL2TokenAddress, type L3Network } from '@salychain/chain-l3';
import { SignerClient } from '@salychain/sdk-internal';
import type { Wallet, BroadcastJob } from '../../generated/prisma/index.js';
import type { PolicyService } from '../../wallets/policy.service.js';
import type { TxDispatcher, DispatchResult } from './dispatcher.js';

export interface BridgePayload {
  l1_standard_bridge: string;
  l1_token: string;
  l2_token: string;
  l2_recipient: string;
}

/** Base → L3 via L1StandardBridge.depositERC20To (+ approve when needed). */
export class BaseBridgeDispatcher implements TxDispatcher {
  readonly rail = 'BASE' as const;

  constructor(
    private readonly base: BaseChainAdapter,
    private readonly signer: SignerClient,
    private readonly policyService: PolicyService,
    private readonly baseNetwork: BaseNetwork,
    private readonly l3Network: L3Network,
  ) {}

  async dispatch(wallet: Wallet, job: BroadcastJob): Promise<DispatchResult> {
    if (job.kind !== 'BRIDGE_DEPOSIT') {
      throw new Error(`BaseBridgeDispatcher expected BRIDGE_DEPOSIT, got ${job.kind}`);
    }
    const payload = job.bridgePayload as BridgePayload | null;
    if (!payload?.l1_standard_bridge || !payload.l1_token || !payload.l2_token || !payload.l2_recipient) {
      throw new Error(`Bridge job ${job.id} missing bridge_payload fields`);
    }

    const from = wallet.address as Address;
    const bridge = payload.l1_standard_bridge as Address;
    const l1Token = payload.l1_token as Address;
    const l2Token = payload.l2_token as Address;
    const l2Recipient = payload.l2_recipient as Address;

    const { policy, rolling24hSpentMinor, approvers } = await this.policyService.loadForBroadcast(wallet, job);

    const allowance = await this.base.getAllowance({ owner: from, spender: bridge, asset: 'USDC' });
    if (allowance < job.amountMinor) {
      const approvePrepared = await this.base.prepareApprove({
        from,
        spender: bridge,
        amountMinor: job.amountMinor,
        asset: 'USDC',
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

    const depositPrepared = await this.base.prepareBridgeDeposit({
      from,
      l1StandardBridge: bridge,
      l1Token,
      l2Token,
      l2Recipient,
      amountMinor: job.amountMinor,
    });

    const txHash = await this.signAndBroadcast({
      wallet,
      job,
      prepared: depositPrepared,
      policy,
      rolling24hSpentMinor,
      approvers,
      label: 'bridge-deposit',
    });

    return { txHash, signedTx: depositPrepared.unsigned, rail: this.rail };
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
      chain: 'BASE',
      unsigned_tx: input.prepared.unsigned,
      policy_context: {
        destination_chain: 'BASE',
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

    const { txHash } = await this.base.broadcast(signed.signed_tx as Hex);
    await this.base.waitForReceipt(txHash, 1);
    return txHash;
  }
}

/** Resolve default bridge payload for USDC deposit when caller omits explicit tokens. */
export function defaultBridgeDepositPayload(input: {
  l3Network: L3Network;
  baseNetwork: BaseNetwork;
  l1StandardBridge: Address;
  l2Recipient: Address;
  cwd?: string;
}): BridgePayload {
  const l1Token = BASE_ASSETS[input.baseNetwork].USDC.address;
  const l2Token = resolveBridgeL2TokenAddress(input.l3Network, 'USDC', input.cwd);
  if (!l1Token || !l2Token) {
    throw new Error('Bridge tokens not configured — set manifest assets or L3_USDC_ADDRESS / L3_SALYSD_ADDRESS');
  }
  return {
    l1_standard_bridge: input.l1StandardBridge,
    l1_token: l1Token,
    l2_token: l2Token,
    l2_recipient: input.l2Recipient,
  };
}
