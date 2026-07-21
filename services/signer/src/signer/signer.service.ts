import { Inject, Injectable, Logger } from '@nestjs/common';
import { createHash } from 'node:crypto';
import {
  AuthorizationError,
  ConflictError,
  ErrorCodes,
  ExternalError,
  NotFoundError,
} from '@salychain/errors';
import { signerSignTotal } from '@salychain/observability';
import { PrismaService } from '../prisma/prisma.service.js';
import { KMS_PROVIDER_TOKEN } from '../kms/kms.module.js';
import type { KmsProvider } from '../kms/kms.provider.js';
import { EvmChainSigner } from '../chains/evm.signer.js';
import { XrplChainSigner } from '../chains/xrpl.signer.js';
import type { ChainSigner } from '../chains/chain.signer.js';
import { PolicyEngine } from './policy.engine.js';
import { assertUnsignedTxMatchesPolicy } from './tx-bind.js';
import { CreateKeyDto, SignDto } from './dto.js';
import type { SignerChain, SignerKey } from '../generated/prisma/index.js';
import { ulid } from 'ulid';

/**
 * The single sanctioned signer.
 *
 * Lifecycle of `sign()`:
 *
 *   1. Idempotency check       (DB lookup on idempotency_key)
 *   2. Key lookup + status     (must be ACTIVE)
 *   3. Policy evaluation       (no key material touched yet)
 *   4. Unwrap key              (KMS decrypt; held in memory only)
 *   5. Sign                    (chain-specific signer)
 *   6. Audit log (SignRequest) (always written, even on rejection)
 *   7. Return signed tx + tx hash
 *
 * The unwrapped key buffer is overwritten with zeros before the function
 * returns to minimize residence time of plaintext key material in the heap.
 */
@Injectable()
export class SignerService {
  private readonly logger = new Logger(SignerService.name);
  private readonly chainSigners: Record<SignerChain, ChainSigner> = {
    BASE: new EvmChainSigner('BASE'),
    ETHEREUM: new EvmChainSigner('ETHEREUM'),
    POLYGON: new EvmChainSigner('POLYGON'),
    SALY_L3: new EvmChainSigner('SALY_L3'),
    XRPL: new XrplChainSigner(),
  };

  constructor(
    private readonly prisma: PrismaService,
    @Inject(KMS_PROVIDER_TOKEN) private readonly kms: KmsProvider,
    private readonly policy: PolicyEngine,
  ) {}

  // ──────────────────────────── createKey ────────────────────────────

  async createKey(dto: CreateKeyDto) {
    const chainSigner = this.requireChainSigner(dto.chain);
    const { privateKey, publicAddress } = await chainSigner.generateKey();

    const wrapped = await this.kms.encrypt(privateKey);
    privateKey.fill(0);

    const keyRef = `kms:${this.kms.name}:${ulid().toLowerCase()}`;
    const key = await this.prisma.signerKey.create({
      data: {
        keyRef,
        chain: dto.chain,
        publicAddress,
        wrappedPrivateKey: wrapped,
        wrappingKeyRef: this.kms.wrappingKeyRef,
        label: dto.label ?? null,
        status: 'ACTIVE',
      },
    });

    this.logger.log(`generated ${dto.chain} key ${key.keyRef} (${publicAddress})`);
    return key;
  }

  // ──────────────────────────── sign ────────────────────────────

  async sign(dto: SignDto) {
    // 1) Idempotency check.
    const existing = await this.prisma.signRequest.findUnique({
      where: { idempotencyKey: dto.idempotency_key },
    });
    if (existing) {
      this.assertSameRequest(existing, dto);
      if (existing.outcome !== 'SIGNED' || !existing.signedTxHash) {
        // Replaying a previously denied or errored request should yield the same error,
        // not silently retry.
        throw ConflictError(
          'signer.idempotency.terminal',
          `Idempotency key ${dto.idempotency_key} was previously ${existing.outcome}`,
        );
      }
      // We never store the signed tx body (sensitive). The client should have it.
      throw ConflictError(
        'signer.idempotency.signed_already',
        `Idempotency key ${dto.idempotency_key} already signed; caller must persist the signed tx`,
      );
    }

    // 2) Key lookup.
    const key = await this.prisma.signerKey.findUnique({
      where: { keyRef: dto.signer_key_ref },
    });
    if (!key) {
      throw NotFoundError('signer.key.not_found', `Signer key ${dto.signer_key_ref} not found`);
    }
    if (key.status !== 'ACTIVE') {
      throw ConflictError('signer.key.not_active', `Signer key ${key.keyRef} is ${key.status}`);
    }
    if (key.chain !== dto.chain) {
      throw ConflictError(
        'signer.chain_mismatch',
        `Key ${key.keyRef} is for ${key.chain} but request is for ${dto.chain}`,
      );
    }

    const chainSigner = this.requireChainSigner(dto.chain);

    // 3) Policy evaluation (no key material involved).
    // Fail closed: a missing policy used to default to allow-all / unlimited
    // caps, which meant any caller who could reach the signer could drain a
    // wallet. The wallet service always supplies the stored policy; reject
    // anything else.
    if (!dto.policy) {
      const err = AuthorizationError(
        'signer.policy.required',
        'Signing policy is required — refusing allow-all default',
      );
      await this.recordRequest(dto, key, 'POLICY_DENIED', err);
      throw err;
    }

    const effectivePolicy = {
      destinationAllowlist: dto.policy.destination_allowlist.map((a) => a.toLowerCase()),
      perTxCapMinor:
        dto.policy.per_tx_cap_minor === null || dto.policy.per_tx_cap_minor === undefined
          ? null
          : BigInt(dto.policy.per_tx_cap_minor),
      dailyCapMinor:
        dto.policy.daily_cap_minor === null || dto.policy.daily_cap_minor === undefined
          ? null
          : BigInt(dto.policy.daily_cap_minor),
      approvalThresholdMinor:
        dto.policy.approval_threshold_minor === null || dto.policy.approval_threshold_minor === undefined
          ? null
          : BigInt(dto.policy.approval_threshold_minor),
      requiredApprovers: dto.policy.required_approvers,
    };

    const policyContext = {
      destinationChain: dto.policy_context.destination_chain,
      destinationAddress: dto.policy_context.destination_address,
      amountMinor: BigInt(dto.policy_context.amount_minor),
      assetSymbol: dto.policy_context.asset_symbol,
    };

    try {
      this.policy.evaluate({
        policy: effectivePolicy,
        context: policyContext,
        rolling24hSpentMinor: dto.rolling_24h_spent_minor ? BigInt(dto.rolling_24h_spent_minor) : 0n,
        approvers: dto.approvers ? Number(dto.approvers) : 0,
      });
      // Bind context → unsigned bytes so a permissive context cannot authorize
      // a different on-chain transfer.
      assertUnsignedTxMatchesPolicy(dto.chain, dto.unsigned_tx, policyContext);
    } catch (err) {
      await this.recordRequest(dto, key, 'POLICY_DENIED', err);
      throw err;
    }

    // 4) Unwrap key. Plaintext is held in `privateKey` only for the next few lines.
    let privateKey: Buffer | undefined;
    try {
      privateKey = await this.kms.decrypt(Buffer.from(key.wrappedPrivateKey), key.wrappingKeyRef);
    } catch (err) {
      await this.recordRequest(dto, key, 'ERROR', err);
      throw ExternalError(ErrorCodes.SIGNER_KMS_UNAVAILABLE, 'KMS unwrap failed', { cause: err });
    }

    // 5) Sign.
    let signed;
    try {
      signed = await chainSigner.sign({ privateKey, unsignedTx: dto.unsigned_tx });
    } catch (err) {
      await this.recordRequest(dto, key, 'ERROR', err);
      throw ExternalError('signer.sign_failed', `Signing failed: ${(err as Error).message}`, { cause: err });
    } finally {
      if (privateKey) privateKey.fill(0);
    }

    // 6) Audit.
    await this.recordRequest(dto, key, 'SIGNED', undefined, signed.txHash);

    // 7) Response.
    return {
      idempotency_key: dto.idempotency_key,
      signed_tx: signed.signedTx,
      signer_key_ref: key.keyRef,
      signed_at: new Date().toISOString(),
    };
  }

  // ──────────────────────────── helpers ────────────────────────────

  private requireChainSigner(chain: SignerChain): ChainSigner {
    const signer = this.chainSigners[chain];
    if (!signer) {
      throw ExternalError(
        'signer.chain_unsupported',
        `Chain ${chain} is not supported in this build (lands in a later slice)`,
      );
    }
    return signer;
  }

  private async recordRequest(
    dto: SignDto,
    key: SignerKey,
    outcome: 'SIGNED' | 'POLICY_DENIED' | 'ERROR',
    err?: unknown,
    signedTxHash?: string,
  ): Promise<void> {
    const unsignedHash = hashUnsignedTx(dto.unsigned_tx);
    const metricOutcome =
      outcome === 'SIGNED' ? 'granted' : outcome === 'POLICY_DENIED' ? 'denied' : 'error';
    signerSignTotal.inc({ outcome: metricOutcome, chain: key.chain });
    const reasonCode =
      err && (err as { code?: string }).code ? (err as { code: string }).code : undefined;
    const reasonMessage = err instanceof Error ? err.message : undefined;
    try {
      await this.prisma.signRequest.create({
        data: {
          idempotencyKey: dto.idempotency_key,
          signerKeyId: key.id,
          chain: key.chain,
          walletId: dto.wallet_id ?? null,
          policyContext: dto.policy_context as unknown as object,
          unsignedTxHash: unsignedHash,
          outcome,
          reasonCode: reasonCode ?? null,
          reasonMessage: reasonMessage ?? null,
          signedTxHash: signedTxHash ?? null,
        },
      });
    } catch (auditErr) {
      // We never let an audit-log failure mask a successful sign — but we do log loudly.
      this.logger.error(`audit-log write failed: ${(auditErr as Error).message}`);
    }
  }

  private assertSameRequest(
    existing: { unsignedTxHash: string; signerKeyId: string; chain: SignerChain },
    dto: SignDto,
  ): void {
    const incomingHash = hashUnsignedTx(dto.unsigned_tx);
    if (existing.unsignedTxHash !== incomingHash || existing.chain !== dto.chain) {
      throw ConflictError(
        'signer.idempotency_conflict',
        `Idempotency key ${dto.idempotency_key} reused with a different unsigned tx`,
      );
    }
  }
}

/** Chain-agnostic content hash. SHA-256 over the unsigned tx string. */
function hashUnsignedTx(unsigned: string): string {
  return '0x' + createHash('sha256').update(unsigned, 'utf-8').digest('hex');
}
