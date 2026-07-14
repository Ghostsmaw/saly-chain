import type { Address, Hex } from 'viem';
import { BaseChainAdapter } from '@salychain/chain-base';
import { SignerClient } from '@salychain/sdk-internal';
import type { Wallet, BroadcastJob } from '../../generated/prisma/index.js';
import type { PolicyService } from '../../wallets/policy.service.js';
import type { TxDispatcher, DispatchResult } from './dispatcher.js';

/**
 * Dispatches a BroadcastJob over the Base / EVM rail.
 *  - Uses the chain adapter to prepare an unsigned ERC-20 (or ETH) transfer.
 *  - Asks the signer service to sign with the wallet's signer key.
 *  - Broadcasts via the adapter and returns the resulting tx hash.
 */
export class BaseDispatcher implements TxDispatcher {
  readonly rail = 'BASE' as const;

  constructor(
    private readonly base: BaseChainAdapter,
    private readonly signer: SignerClient,
    private readonly policyService: PolicyService,
  ) {}

  async dispatch(wallet: Wallet, job: BroadcastJob): Promise<DispatchResult> {
    const { policy, rolling24hSpentMinor, approvers } = await this.policyService.loadForBroadcast(wallet, job);
    const prepared = await this.base.prepareTransfer({
      from: wallet.address as Address,
      to: job.destinationAddress as Address,
      amountMinor: job.amountMinor,
      asset: job.asset as 'USDC' | 'ETH',
    });

    const signed = await this.signer.sign({
      idempotency_key: `bcast:${job.id}:nonce${prepared.nonce}`,
      wallet_id: wallet.id,
      signer_key_ref: wallet.signerKeyRef,
      chain: 'BASE',
      unsigned_tx: prepared.unsigned,
      policy_context: {
        destination_chain: 'BASE',
        destination_address: job.destinationAddress,
        amount_minor: job.amountMinor.toString(),
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

    const { txHash } = await this.base.broadcast(signed.signed_tx as Hex);
    return { txHash, signedTx: signed.signed_tx, rail: this.rail };
  }
}
