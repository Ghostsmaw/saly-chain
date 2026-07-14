import { Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma, Wallet, type Chain } from '../generated/prisma/index.js';
import { ulid } from 'ulid';
import { ErrorCodes, InternalError, isSalyChainError, NotFoundError, ValidationError } from '@salychain/errors';
import { loadEnv } from '@salychain/config';
import { defaultDexRouterAllowlist, type BaseNetwork } from '@salychain/chain-base';
import { isSchemaOnlyChain } from '@salychain/types';
import { LedgerClient, SignerClient, type SignerChain } from '@salychain/sdk-internal';
import { PrismaService } from '../prisma/prisma.service.js';
import { SIGNER_CLIENT } from '../signer/signer.module.js';
import { LEDGER_CLIENT } from '../clients/ledger.client.module.js';
import { defaultXrplTrustedIssuerAllowlist } from '../config/xrpl-iou.js';
import { walletEnvSchema } from '../config/env.js';
import { ProvisionWalletDto } from './dto.js';

/**
 * Wallet provisioning. Talks to the signer service for key generation.
 * Each provisioned wallet gets a default zero-cap, allowlist-empty policy
 * — callers must explicitly raise caps before transfers will be authorized.
 *
 * Chain wallets (BASE, XRPL, …) are linked to a ledger liability account so
 * execution can reserve funds before broadcasting on-chain payouts.
 */
@Injectable()
export class WalletsService {
  private readonly logger = new Logger(WalletsService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(SIGNER_CLIENT) private readonly signer: SignerClient,
    @Inject(LEDGER_CLIENT) private readonly ledger: LedgerClient,
  ) {}

  async provision(dto: ProvisionWalletDto): Promise<Wallet> {
    if (isSchemaOnlyChain(dto.chain)) {
      throw ValidationError(
        'wallet.chain_not_implemented',
        `Chain ${dto.chain} is defined in schema only — provision BASE, XRPL, or SALY_L3.`,
      );
    }

    const signerChain = toSignerChain(dto.chain);
    const env = loadEnv(walletEnvSchema);

    let key;
    if (signerChain) {
      key = await this.signer.createKey({ chain: signerChain, label: dto.label });
    } else {
      const internalId = ulid().toLowerCase();
      key = { key_ref: `internal:${internalId}`, public_address: `internal:${internalId}` };
    }

    const baseDexPolicy =
      dto.chain === 'BASE'
        ? {
            destinationAllowlist: defaultDexRouterAllowlist(env.BASE_NETWORK as BaseNetwork),
            trustedIssuerAllowlist: [] as string[],
            perTxCapMinor: env.WALLET_BASE_DEFAULT_PER_TX_CAP_MINOR,
            dailyCapMinor: env.WALLET_BASE_DEFAULT_DAILY_CAP_MINOR,
          }
        : null;

    const xrplPolicy =
      dto.chain === 'XRPL'
        ? {
            destinationAllowlist: [] as string[],
            trustedIssuerAllowlist: defaultXrplTrustedIssuerAllowlist(env.XRPL_IOU_ISSUERS),
            perTxCapMinor: env.WALLET_XRPL_DEFAULT_PER_TX_CAP_MINOR,
            dailyCapMinor: env.WALLET_XRPL_DEFAULT_DAILY_CAP_MINOR,
          }
        : null;

    const l3Policy =
      dto.chain === 'SALY_L3'
        ? {
            destinationAllowlist: [] as string[],
            trustedIssuerAllowlist: [] as string[],
            perTxCapMinor: env.WALLET_L3_DEFAULT_PER_TX_CAP_MINOR,
            dailyCapMinor: env.WALLET_L3_DEFAULT_DAILY_CAP_MINOR,
          }
        : null;

    const defaultPolicy = baseDexPolicy ?? xrplPolicy ?? l3Policy ?? {
      destinationAllowlist: [] as string[],
      trustedIssuerAllowlist: [] as string[],
      perTxCapMinor: 0n,
      dailyCapMinor: 0n,
    };

    const wallet = await this.prisma.wallet.create({
      data: {
        chain: dto.chain,
        kind: dto.kind,
        address: key.public_address,
        signerKeyRef: key.key_ref,
        status: 'ACTIVE',
        ownerId: dto.owner_id ?? null,
        ownerKind: dto.owner_kind ?? null,
        label: dto.label ?? null,
        metadata: (dto.metadata as Prisma.InputJsonValue | undefined) ?? Prisma.DbNull,
        policy: {
          create: {
            destinationAllowlist: defaultPolicy.destinationAllowlist as unknown as Prisma.InputJsonValue,
            trustedIssuerAllowlist: defaultPolicy.trustedIssuerAllowlist as unknown as Prisma.InputJsonValue,
            perTxCapMinor: defaultPolicy.perTxCapMinor,
            dailyCapMinor: defaultPolicy.dailyCapMinor,
            approvalThresholdMinor: 0n,
            requiredApprovers: 0,
          },
        },
      },
    });

    const linked = await this.ensureLedgerAccountForWallet(wallet);
    this.logger.log(`Provisioned ${dto.chain} wallet ${linked.id} (signer key ${key.key_ref})`);
    return linked;
  }

  async findById(id: string): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUnique({ where: { id } });
    if (!wallet) throw NotFoundError(ErrorCodes.WALLET_NOT_FOUND, `Wallet ${id} not found`);
    return wallet;
  }

  async findByAddress(chain: Chain, address: string): Promise<Wallet | null> {
    return this.prisma.wallet.findUnique({ where: { chain_address: { chain, address } } });
  }

  async list(query: { ownerId?: string; chain?: Chain; limit?: number }): Promise<Wallet[]> {
    const where: Prisma.WalletWhereInput = {};
    if (query.ownerId) where.ownerId = query.ownerId;
    if (query.chain) where.chain = query.chain;
    return this.prisma.wallet.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: Math.min(Math.max(query.limit ?? 50, 1), 200),
    });
  }

  async stats() {
    const [total, byStatus, byChain, pendingBroadcasts] = await Promise.all([
      this.prisma.wallet.count(),
      this.prisma.wallet.groupBy({ by: ['status'], _count: { _all: true } }),
      this.prisma.wallet.groupBy({ by: ['chain'], _count: { _all: true } }),
      this.prisma.broadcastJob.count({
        where: { status: { in: ['PENDING', 'SUBMITTED'] } },
      }),
    ]);
    return {
      total,
      pending_broadcasts: pendingBroadcasts,
      by_status: Object.fromEntries(byStatus.map((r) => [r.status, r._count._all])),
      by_chain: Object.fromEntries(byChain.map((r) => [r.chain, r._count._all])),
    };
  }

  /** Idempotent: create and link a ledger liability account when missing. */
  async ensureLedgerAccount(walletId: string): Promise<Wallet> {
    const wallet = await this.findById(walletId);
    return this.ensureLedgerAccountForWallet(wallet);
  }

  toResponse(wallet: Wallet) {
    return {
      id: wallet.id,
      chain: wallet.chain,
      address: wallet.address,
      kind: wallet.kind,
      status: wallet.status,
      signer_key_ref: wallet.signerKeyRef,
      ledger_account_id: wallet.ledgerAccountId ?? undefined,
      owner_id: wallet.ownerId ?? undefined,
      owner_kind: wallet.ownerKind ?? undefined,
      created_at: wallet.createdAt.toISOString(),
    };
  }

  private async ensureLedgerAccountForWallet(wallet: Wallet): Promise<Wallet> {
    if (wallet.ledgerAccountId) return wallet;

    const currency = ledgerCurrencyForChain(wallet.chain);
    if (!currency) return wallet;

    const code = walletLiabilityAccountCode(wallet.id);
    let accountId: string;

    try {
      const account = await this.ledger.createAccount({
        code,
        type: 'LIABILITY',
        currency,
        ownerId: wallet.ownerId ?? wallet.id,
        ownerKind: wallet.ownerKind ?? 'WALLET',
        metadata: { wallet_id: wallet.id, chain: wallet.chain },
      });
      accountId = account.id;
    } catch (err) {
      if (isSalyChainError(err) && err.code === 'ledger.account.code_conflict') {
        const existing = await this.ledger.getAccountByCode(code);
        accountId = existing.id;
      } else {
        throw err;
      }
    }

    return this.prisma.wallet.update({
      where: { id: wallet.id },
      data: { ledgerAccountId: accountId },
    });
  }
}

export function walletLiabilityAccountCode(walletId: string): string {
  return `liability.wallet.${walletId}`;
}

function ledgerCurrencyForChain(chain: Chain): string | null {
  switch (chain) {
    case 'BASE':
    case 'ETHEREUM':
    case 'POLYGON':
    case 'SALY_L3':
      return 'USDC';
    case 'XRPL':
      return 'XRP';
    case 'INTERNAL':
      return null;
    default: {
      const _exhaustive: never = chain;
      throw InternalError(ErrorCodes.INTERNAL_UNEXPECTED, `Unknown chain: ${String(_exhaustive)}`);
    }
  }
}

function toSignerChain(chain: Chain): SignerChain | undefined {
  switch (chain) {
    case 'BASE':
    case 'ETHEREUM':
    case 'POLYGON':
    case 'SALY_L3':
    case 'XRPL':
      return chain;
    case 'INTERNAL':
      return undefined;
    default: {
      const _exhaustive: never = chain;
      throw InternalError(ErrorCodes.INTERNAL_UNEXPECTED, `Unknown chain: ${String(_exhaustive)}`);
    }
  }
}
