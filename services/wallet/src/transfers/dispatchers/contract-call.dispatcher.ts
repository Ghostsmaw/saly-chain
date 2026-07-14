// SPDX-License-Identifier: BUSL-1.1
import type { Address, Hex } from 'viem';
import { BaseChainAdapter } from '@salychain/chain-base';
import { L3ChainAdapter } from '@salychain/chain-l3';
import { SignerClient } from '@salychain/sdk-internal';
import type { Wallet, BroadcastJob } from '../../generated/prisma/index.js';
import type { PolicyService } from '../../wallets/policy.service.js';
import type { TxDispatcher, DispatchResult } from './dispatcher.js';

export interface ContractCallPayload {
  contract: string;
  calldata: string;
  chain?: 'SALY_L3' | 'BASE';
}

/** Generic contract call — governance pause, attestation admin, etc. */
export class ContractCallDispatcher implements TxDispatcher {
  readonly rail = 'L3' as const;

  constructor(
    private readonly base: BaseChainAdapter,
    private readonly l3: L3ChainAdapter,
    private readonly signer: SignerClient,
    private readonly policyService: PolicyService,
  ) {}

  async dispatch(wallet: Wallet, job: BroadcastJob): Promise<DispatchResult> {
    if (job.kind !== 'CONTRACT_CALL') {
      throw new Error(`ContractCallDispatcher expected CONTRACT_CALL, got ${job.kind}`);
    }
    const payload = job.contractCallPayload as ContractCallPayload | null;
    if (!payload?.contract || !payload.calldata) {
      throw new Error(`CONTRACT_CALL job ${job.id} missing contractCallPayload`);
    }

    const chain = payload.chain ?? wallet.chain;
    const from = wallet.address as Address;
    const contract = payload.contract as Address;
    const calldata = payload.calldata as Hex;

    const adapter = chain === 'SALY_L3' ? this.l3 : this.base;
    const { policy, rolling24hSpentMinor, approvers } = await this.policyService.loadForBroadcast(wallet, job);
    const prepared = await adapter.prepareContractCall({ from, contract, calldata });

    const signed = await this.signer.sign({
      idempotency_key: `bcast:${job.id}:contract-call:nonce${prepared.nonce}`,
      wallet_id: wallet.id,
      signer_key_ref: wallet.signerKeyRef,
      chain: chain === 'SALY_L3' ? 'SALY_L3' : 'BASE',
      unsigned_tx: prepared.unsigned,
      policy_context: {
        destination_chain: chain === 'SALY_L3' ? 'SALY_L3' : 'BASE',
        destination_address: contract,
        amount_minor: '0',
        asset_symbol: job.asset,
        memo: job.memo ?? undefined,
      },
      policy: {
        destination_allowlist: policy.destinationAllowlist,
        per_tx_cap_minor: policy.perTxCapMinor.toString(),
        daily_cap_minor: policy.dailyCapMinor.toString(),
        approval_threshold_minor: policy.approvalThresholdMinor.toString(),
        required_approvers: policy.requiredApprovers,
      },
      rolling_24h_spent_minor: rolling24hSpentMinor.toString(),
      approvers: String(approvers),
    });

    const broadcaster = chain === 'SALY_L3' ? this.l3 : this.base;
    const { txHash } = await broadcaster.broadcast(signed.signed_tx as Hex);
    return { txHash, signedTx: prepared.unsigned, rail: chain === 'SALY_L3' ? 'L3' : 'BASE' };
  }
}
