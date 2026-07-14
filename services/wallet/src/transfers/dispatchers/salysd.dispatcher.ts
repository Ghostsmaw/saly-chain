import type { Address, Hex } from 'viem';
import { L3ChainAdapter } from '@salychain/chain-l3';
import { SignerClient } from '@salychain/sdk-internal';
import type { Wallet, BroadcastJob } from '../../generated/prisma/index.js';
import type { PolicyService } from '../../wallets/policy.service.js';
import type { TxDispatcher, DispatchResult } from './dispatcher.js';

export interface SalysdPayload {
  token?: string;
  /** Mint recipient or burn holder (classic address). */
  counterparty?: string;
  /** burnFrom holder — required for SALYSD_REDEEM. */
  holder?: string;
  /** ERC-20 approve spender — required for SALYSD_APPROVE. */
  spender?: string;
  /** ReserveOracle contract — required for SALYSD_ORACLE_UPDATE. */
  reserve_oracle?: string;
  attestation_hash?: string;
  ceiling_minor?: string;
}

/** SalySD.mint(to, amount) from treasury minter wallet. */
export class SalysdMintDispatcher implements TxDispatcher {
  readonly rail = 'L3' as const;

  constructor(
    private readonly l3: L3ChainAdapter,
    private readonly signer: SignerClient,
    private readonly policyService: PolicyService,
  ) {}

  async dispatch(wallet: Wallet, job: BroadcastJob): Promise<DispatchResult> {
    if (job.kind !== 'SALYSD_MINT') {
      throw new Error(`SalysdMintDispatcher expected SALYSD_MINT, got ${job.kind}`);
    }
    const payload = job.salysdPayload as SalysdPayload | null;
    if (!payload?.token || !payload.counterparty) {
      throw new Error(`SalySD mint job ${job.id} missing salysd_payload.token or counterparty`);
    }

    const from = wallet.address as Address;
    const token = payload.token as Address;
    const recipient = payload.counterparty as Address;

    const { policy, rolling24hSpentMinor, approvers } = await this.policyService.loadForBroadcast(wallet, job);
    const prepared = await this.l3.prepareSalysdMint({
      from,
      token,
      recipient,
      amountMinor: job.amountMinor,
    });

    const signed = await this.signer.sign({
      idempotency_key: `bcast:${job.id}:salysd-mint:nonce${prepared.nonce}`,
      wallet_id: wallet.id,
      signer_key_ref: wallet.signerKeyRef,
      chain: 'SALY_L3',
      unsigned_tx: prepared.unsigned,
      policy_context: {
        destination_chain: 'SALY_L3',
        destination_address: recipient,
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

    const { txHash } = await this.l3.broadcast(signed.signed_tx as Hex);
    return { txHash, signedTx: prepared.unsigned, rail: this.rail };
  }
}

/** ERC-20 approve(spender, amount) — redeem prep from custodial holder wallet. */
export class SalysdApproveDispatcher implements TxDispatcher {
  readonly rail = 'L3' as const;

  constructor(
    private readonly l3: L3ChainAdapter,
    private readonly signer: SignerClient,
    private readonly policyService: PolicyService,
  ) {}

  async dispatch(wallet: Wallet, job: BroadcastJob): Promise<DispatchResult> {
    if (job.kind !== 'SALYSD_APPROVE') {
      throw new Error(`SalysdApproveDispatcher expected SALYSD_APPROVE, got ${job.kind}`);
    }
    const payload = job.salysdPayload as SalysdPayload | null;
    if (!payload?.token || !payload.spender) {
      throw new Error(`SalySD approve job ${job.id} missing salysd_payload.token or spender`);
    }

    const from = wallet.address as Address;
    const token = payload.token as Address;
    const spender = payload.spender as Address;

    const { policy, rolling24hSpentMinor, approvers } = await this.policyService.loadForBroadcast(wallet, job);
    const prepared = await this.l3.prepareApprove({
      from,
      token,
      spender,
      amountMinor: job.amountMinor,
    });

    const signed = await this.signer.sign({
      idempotency_key: `bcast:${job.id}:salysd-approve:nonce${prepared.nonce}`,
      wallet_id: wallet.id,
      signer_key_ref: wallet.signerKeyRef,
      chain: 'SALY_L3',
      unsigned_tx: prepared.unsigned,
      policy_context: {
        destination_chain: 'SALY_L3',
        destination_address: spender,
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

    const { txHash } = await this.l3.broadcast(signed.signed_tx as Hex);
    return { txHash, signedTx: prepared.unsigned, rail: this.rail };
  }
}

/** SalySD.burnFrom(holder, amount) from treasury burner wallet. */
export class SalysdRedeemDispatcher implements TxDispatcher {
  readonly rail = 'L3' as const;

  constructor(
    private readonly l3: L3ChainAdapter,
    private readonly signer: SignerClient,
    private readonly policyService: PolicyService,
  ) {}

  async dispatch(wallet: Wallet, job: BroadcastJob): Promise<DispatchResult> {
    if (job.kind !== 'SALYSD_REDEEM') {
      throw new Error(`SalysdRedeemDispatcher expected SALYSD_REDEEM, got ${job.kind}`);
    }
    const payload = job.salysdPayload as SalysdPayload | null;
    const holder = payload?.holder ?? payload?.counterparty;
    if (!payload?.token || !holder) {
      throw new Error(`SalySD redeem job ${job.id} missing salysd_payload.token or holder`);
    }

    const from = wallet.address as Address;
    const token = payload.token as Address;
    const holderAddr = holder as Address;

    const { policy, rolling24hSpentMinor, approvers } = await this.policyService.loadForBroadcast(wallet, job);
    const prepared = await this.l3.prepareSalysdBurnFrom({
      from,
      token,
      holder: holderAddr,
      amountMinor: job.amountMinor,
    });

    const signed = await this.signer.sign({
      idempotency_key: `bcast:${job.id}:salysd-redeem:nonce${prepared.nonce}`,
      wallet_id: wallet.id,
      signer_key_ref: wallet.signerKeyRef,
      chain: 'SALY_L3',
      unsigned_tx: prepared.unsigned,
      policy_context: {
        destination_chain: 'SALY_L3',
        destination_address: token,
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

    const { txHash } = await this.l3.broadcast(signed.signed_tx as Hex);
    return { txHash, signedTx: prepared.unsigned, rail: this.rail };
  }
}

/** ReserveOracle.updateAttestation — treasury oracle owner wallet (Milestone D6). */
export class SalysdOracleUpdateDispatcher implements TxDispatcher {
  readonly rail = 'L3' as const;

  constructor(
    private readonly l3: L3ChainAdapter,
    private readonly signer: SignerClient,
    private readonly policyService: PolicyService,
  ) {}

  async dispatch(wallet: Wallet, job: BroadcastJob): Promise<DispatchResult> {
    if (job.kind !== 'SALYSD_ORACLE_UPDATE') {
      throw new Error(`SalysdOracleUpdateDispatcher expected SALYSD_ORACLE_UPDATE, got ${job.kind}`);
    }
    const payload = job.salysdPayload as SalysdPayload | null;
    if (!payload?.reserve_oracle || !payload.attestation_hash || !payload.ceiling_minor) {
      throw new Error(`Oracle update job ${job.id} missing reserve_oracle, attestation_hash, or ceiling_minor`);
    }

    const from = wallet.address as Address;
    const oracle = payload.reserve_oracle as Address;

    const { policy, rolling24hSpentMinor, approvers } = await this.policyService.loadForBroadcast(wallet, job);
    const prepared = await this.l3.prepareReserveOracleUpdate({
      from,
      reserveOracle: oracle,
      ceilingMinor: BigInt(payload.ceiling_minor),
      attestationHash: payload.attestation_hash as Hex,
    });

    const signed = await this.signer.sign({
      idempotency_key: `bcast:${job.id}:salysd-oracle:nonce${prepared.nonce}`,
      wallet_id: wallet.id,
      signer_key_ref: wallet.signerKeyRef,
      chain: 'SALY_L3',
      unsigned_tx: prepared.unsigned,
      policy_context: {
        destination_chain: 'SALY_L3',
        destination_address: oracle,
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

    const { txHash } = await this.l3.broadcast(signed.signed_tx as Hex);
    return { txHash, signedTx: prepared.unsigned, rail: this.rail };
  }
}
