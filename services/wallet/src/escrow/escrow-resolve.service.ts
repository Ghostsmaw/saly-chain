import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import type { Address, Hex } from 'viem';
import { ValidationError } from '@salychain/errors';
import { BaseChainAdapter, isEscrowDealId } from '@salychain/chain-base';
import { SignerClient } from '@salychain/sdk-internal';
import { loadEnv } from '@salychain/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { PolicyService } from '../wallets/policy.service.js';
import { SIGNER_CLIENT } from '../signer/signer.module.js';
import { BASE_ADAPTER } from '../chains/chains.module.js';
import { walletEnvSchema } from '../config/env.js';

export interface ResolveEscrowInput {
  walletId: string;
  dealId: string;
  action: 'release' | 'refund';
  escrowContract: string;
  idempotencyKey?: string;
}

@Injectable()
export class EscrowResolveService {
  private readonly logger = new Logger(EscrowResolveService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly policyService: PolicyService,
    @Inject(SIGNER_CLIENT) private readonly signer: SignerClient,
    @Inject(BASE_ADAPTER) private readonly base: BaseChainAdapter,
  ) {}

  async resolve(input: ResolveEscrowInput) {
    const env = loadEnv(walletEnvSchema);
    if (!isEscrowDealId(input.dealId)) {
      throw ValidationError('wallet.escrow.bad_deal_id', 'deal_id must be bytes32 hex');
    }
    if (env.ESCROW_CONTRACT_ADDRESS && input.escrowContract.toLowerCase() !== env.ESCROW_CONTRACT_ADDRESS.toLowerCase()) {
      throw ValidationError('wallet.escrow_contract_mismatch', 'escrow_contract does not match configured address');
    }

    const wallet = await this.prisma.wallet.findUnique({ where: { id: input.walletId } });
    if (!wallet || wallet.chain !== 'BASE') {
      throw ValidationError('wallet.not_found', 'Resolver wallet not found on BASE');
    }

    const base = this.base;
    const from = wallet.address as Address;
    const escrowAddress = input.escrowContract as Address;
    const dealId = input.dealId as Hex;

    const prepared =
      input.action === 'release'
        ? await base.prepareRelease({ from, escrowAddress, dealId })
        : await base.prepareRefund({ from, escrowAddress, dealId });

    const { policy, rolling24hSpentMinor } = await this.policyService.loadForSigning(wallet.id);
    const approvers = 0;

    const signed = await this.signer.sign({
      idempotency_key: input.idempotencyKey ?? `escrow:${input.action}:${dealId}:nonce${prepared.nonce}`,
      wallet_id: wallet.id,
      signer_key_ref: wallet.signerKeyRef,
      chain: 'BASE',
      unsigned_tx: prepared.unsigned,
      policy_context: {
        destination_chain: 'BASE',
        destination_address: escrowAddress,
        amount_minor: '0',
        asset_symbol: 'USDC',
        memo: `escrow ${input.action}`,
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

    const { txHash } = await base.broadcast(signed.signed_tx as Hex);
    await base.waitForReceipt(txHash, 1);

    this.logger.log(`escrow ${input.action} deal=${dealId} tx=${txHash}`);

    return { tx_hash: txHash, action: input.action, deal_id: dealId };
  }
}

export function assertWalletInternalAuth(authorization: string | undefined) {
  const env = loadEnv(walletEnvSchema);
  const token = env.WALLET_INTERNAL_ADMIN_TOKEN;
  if (!token) return;
  if (authorization !== `Bearer ${token}`) {
    throw new UnauthorizedException('invalid internal admin token');
  }
}
