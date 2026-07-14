import type { Address, Hex } from 'viem';
import { BaseChainAdapter, type DexTokenSymbol } from '@salychain/chain-base';
import { SignerClient } from '@salychain/sdk-internal';
import type { Wallet, BroadcastJob } from '../../generated/prisma/index.js';
import type { PolicyService } from '../../wallets/policy.service.js';
import type { TxDispatcher, DispatchResult } from './dispatcher.js';

export interface DexSwapPayload {
  router: string;
  calldata: string;
  token_in: string;
  token_out: string;
  min_amount_out: string;
  recipient: string;
}

function parseSwapPayload(job: BroadcastJob): DexSwapPayload {
  const raw = job.swapPayload;
  if (!raw || typeof raw !== 'object') {
    throw new Error(`DEX job ${job.id} missing swap_payload`);
  }
  const p = raw as Record<string, unknown>;
  for (const key of ['router', 'calldata', 'token_in', 'token_out', 'min_amount_out', 'recipient'] as const) {
    if (typeof p[key] !== 'string' || !p[key]) {
      throw new Error(`DEX job ${job.id} swap_payload.${key} is required`);
    }
  }
  return p as unknown as DexSwapPayload;
}

/**
 * Executes a Uniswap V3 exactInputSingle swap: ERC-20 approve (if needed) then router call.
 */
export class SwapDispatcher implements TxDispatcher {
  readonly rail = 'BASE' as const;

  constructor(
    private readonly base: BaseChainAdapter,
    private readonly signer: SignerClient,
    private readonly policyService: PolicyService,
  ) {}

  async dispatch(wallet: Wallet, job: BroadcastJob): Promise<DispatchResult> {
    if (job.kind !== 'DEX_SWAP') {
      throw new Error(`SwapDispatcher received job kind ${job.kind}`);
    }

    const payload = parseSwapPayload(job);
    const from = wallet.address as Address;
    const router = payload.router as Address;
    const tokenIn = payload.token_in.toUpperCase() as DexTokenSymbol;

    const { policy, rolling24hSpentMinor, approvers } = await this.policyService.loadForBroadcast(wallet, job);

    const allowance = await this.base.getDexTokenAllowance({
      owner: from,
      spender: router,
      token: tokenIn,
    });

    if (allowance < job.amountMinor) {
      const approvePrepared = await this.base.prepareDexTokenApprove({
        from,
        spender: router,
        amountMinor: job.amountMinor,
        token: tokenIn,
      });
      await this.signAndBroadcast({
        wallet,
        job,
        prepared: approvePrepared,
        policy,
        rolling24hSpentMinor,
        approvers,
        destination: router,
        nonce: approvePrepared.nonce,
        label: 'approve',
        assetSymbol: tokenIn,
      });
    }

    const swapPrepared = await this.base.prepareDexSwap({
      from,
      router,
      calldata: payload.calldata as Hex,
    });

    const swapTxHash = await this.signAndBroadcast({
      wallet,
      job,
      prepared: swapPrepared,
      policy,
      rolling24hSpentMinor,
      approvers,
      destination: router,
      nonce: swapPrepared.nonce,
      label: 'swap',
      assetSymbol: tokenIn,
    });

    return { txHash: swapTxHash, signedTx: swapPrepared.unsigned, rail: this.rail };
  }

  private async signAndBroadcast(input: {
    wallet: Wallet;
    job: BroadcastJob;
    prepared: { unsigned: Hex; nonce: number };
    policy: Awaited<ReturnType<PolicyService['loadForBroadcast']>>['policy'];
    rolling24hSpentMinor: bigint;
    approvers: number;
    destination: Address;
    nonce: number;
    label: string;
    assetSymbol: string;
  }): Promise<string> {
    const signed = await this.signer.sign({
      idempotency_key: `bcast:${input.job.id}:${input.label}:nonce${input.nonce}`,
      wallet_id: input.wallet.id,
      signer_key_ref: input.wallet.signerKeyRef,
      chain: 'BASE',
      unsigned_tx: input.prepared.unsigned,
      policy_context: {
        destination_chain: 'BASE',
        destination_address: input.destination,
        amount_minor: input.job.amountMinor.toString(),
        asset_symbol: input.assetSymbol,
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
