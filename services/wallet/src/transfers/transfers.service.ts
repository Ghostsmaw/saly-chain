import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Queue } from 'bullmq';
import {
  ConflictError,
  ErrorCodes,
  NotFoundError,
  ValidationError,
} from '@salychain/errors';
import { isXrplIouAsset, isXrplNativeAsset } from '@salychain/chain-xrpl';
import { loadEnv } from '@salychain/config';
import { resolveXrplIouIssuer } from '../config/xrpl-iou.js';
import { isAllowedDexRouter, type BaseNetwork } from '@salychain/chain-base';
import { isTransferWalletChain } from '@salychain/types';
import { BroadcastJob, BroadcastJobStatus, Prisma } from '../generated/prisma/index.js';
import { walletEnvSchema } from '../config/env.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { BROADCAST_QUEUE } from '../queues/queues.module.js';
import { CreateTransferDto } from './dto.js';

export const BROADCAST_JOB = 'broadcast-job';

export interface BroadcastJobPayload {
  broadcastJobId: string;
  walletId: string;
  destinationAddress: string;
  amountMinor: string;
  asset: string;
  memo?: string;
}

@Injectable()
export class TransfersService {
  private readonly logger = new Logger(TransfersService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(BROADCAST_QUEUE) private readonly queue: Queue,
  ) {}

  /**
   * Create a transfer. This is the entry-point for outbound on-chain moves
   * from a custodial wallet. The actual sign+broadcast happens in the
   * `BroadcastWorker`, asynchronously, so the API stays responsive and the
   * caller can poll `getTransfer()` for status.
   */
  async create(dto: CreateTransferDto): Promise<BroadcastJob> {
    const wallet = await this.prisma.wallet.findUnique({ where: { id: dto.wallet_id } });
    if (!wallet) throw NotFoundError(ErrorCodes.WALLET_NOT_FOUND, `Wallet ${dto.wallet_id} not found`);
    if (wallet.status !== 'ACTIVE') {
      throw ConflictError('wallet.not_active', `Wallet ${wallet.id} is ${wallet.status}`);
    }
    if (!isTransferWalletChain(wallet.chain)) {
      throw ValidationError(
        'wallet.chain_not_supported',
        `Transfers on chain ${wallet.chain} are not supported`,
      );
    }
    if (wallet.chain === 'BASE' && !/^0x[a-fA-F0-9]{40}$/.test(dto.destination_address)) {
      throw ValidationError('wallet.bad_destination', `Invalid EVM destination ${dto.destination_address}`);
    }
    if (wallet.chain === 'XRPL' && !/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(dto.destination_address)) {
      throw ValidationError('wallet.bad_destination', `Invalid XRPL destination ${dto.destination_address}`);
    }

    const kind = dto.kind ?? 'TRANSFER';

    if (BigInt(dto.amount_minor) <= 0n && kind !== 'SALYSD_ORACLE_UPDATE') {
      throw ValidationError('wallet.bad_amount', 'amount_minor must be positive');
    }

    if (wallet.chain === 'XRPL' && kind === 'TRANSFER') {
      const asset = dto.asset.toUpperCase();
      if (!isXrplNativeAsset(asset) && !isXrplIouAsset(asset)) {
        throw ValidationError(
          'wallet.xrpl.asset_unsupported',
          `XRPL transfers support XRP or 3-char IOU codes (got ${dto.asset})`,
        );
      }
      if (isXrplIouAsset(asset)) {
        const env = loadEnv(walletEnvSchema);
        const issuer = resolveXrplIouIssuer(asset, env.XRPL_IOU_ISSUERS, dto.iou_issuer);
        if (!issuer) {
          throw ValidationError(
            'wallet.xrpl.iou_issuer_missing',
            `No issuer configured for ${asset} (set XRPL_IOU_ISSUERS or pass iou_issuer)`,
          );
        }
        if (dto.iou_issuer && !/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(dto.iou_issuer)) {
          throw ValidationError('wallet.xrpl.bad_issuer', `Invalid iou_issuer address ${dto.iou_issuer}`);
        }
      }
    }

    if (kind === 'ESCROW_FUND') {
      if (wallet.chain !== 'BASE') {
        throw ValidationError('wallet.escrow_base_only', 'Escrow funding is supported on BASE only');
      }
      if (!dto.deal_id || !dto.escrow_contract) {
        throw ValidationError('wallet.escrow_fields_required', 'deal_id and escrow_contract are required for ESCROW_FUND');
      }
      const env = loadEnv(walletEnvSchema);
      if (env.ESCROW_CONTRACT_ADDRESS && dto.escrow_contract.toLowerCase() !== env.ESCROW_CONTRACT_ADDRESS.toLowerCase()) {
        throw ValidationError('wallet.escrow_contract_mismatch', 'escrow_contract does not match configured ESCROW_CONTRACT_ADDRESS');
      }
    }

    if (kind === 'DEX_SWAP') {
      if (wallet.chain !== 'BASE') {
        throw ValidationError('wallet.dex_base_only', 'DEX swaps are supported on BASE only');
      }
      const p = dto.swap_payload;
      if (!p?.router || !p.calldata || !p.token_in || !p.token_out || !p.min_amount_out || !p.recipient) {
        throw ValidationError('wallet.dex_payload_required', 'swap_payload with router, calldata, tokens, and recipient is required for DEX_SWAP');
      }
      if (!/^0x[a-fA-F0-9]{40}$/.test(p.router)) {
        throw ValidationError('wallet.dex_bad_router', 'swap_payload.router must be a valid EVM address');
      }
      if (!/^0x[a-fA-F0-9]{40}$/.test(p.recipient)) {
        throw ValidationError('wallet.dex_bad_recipient', 'swap_payload.recipient must be a valid EVM address');
      }
      const env = loadEnv(walletEnvSchema);
      if (!isAllowedDexRouter(env.BASE_NETWORK as BaseNetwork, p.router)) {
        throw ValidationError(
          'wallet.dex_router_not_allowed',
          `swap_payload.router must be the canonical Uniswap SwapRouter02 for ${env.BASE_NETWORK}`,
        );
      }
    }

    if (kind === 'BRIDGE_DEPOSIT') {
      if (wallet.chain !== 'BASE') {
        throw ValidationError('wallet.bridge_deposit_base_only', 'Bridge deposits originate from BASE wallets');
      }
      if (!dto.bridge_payload?.l1_standard_bridge || !dto.bridge_payload.l2_recipient) {
        throw ValidationError(
          'wallet.bridge_payload_required',
          'bridge_payload with l1_standard_bridge and l2_recipient is required for BRIDGE_DEPOSIT',
        );
      }
    }

    if (kind === 'BRIDGE_WITHDRAW') {
      if (wallet.chain !== 'SALY_L3') {
        throw ValidationError('wallet.bridge_withdraw_l3_only', 'Bridge withdrawals originate from SALY_L3 wallets');
      }
      if (!dto.bridge_payload?.l2_standard_bridge || !dto.bridge_payload.l1_recipient) {
        throw ValidationError(
          'wallet.bridge_payload_required',
          'bridge_payload with l2_standard_bridge and l1_recipient is required for BRIDGE_WITHDRAW',
        );
      }
    }

    if (kind === 'SALYSD_MINT' || kind === 'SALYSD_REDEEM' || kind === 'SALYSD_APPROVE' || kind === 'SALYSD_ORACLE_UPDATE') {
      if (wallet.chain !== 'SALY_L3') {
        throw ValidationError('wallet.salysd_l3_only', 'SalySD operations require SALY_L3 wallets');
      }
      if (dto.asset.toUpperCase() !== 'SALYSD') {
        throw ValidationError('wallet.salysd_asset_required', 'SalySD jobs require asset SALYSD');
      }
      if (kind === 'SALYSD_ORACLE_UPDATE') {
        if (!dto.salysd_payload?.reserve_oracle || !dto.salysd_payload.attestation_hash || !dto.salysd_payload.ceiling_minor) {
          throw ValidationError(
            'wallet.salysd_oracle_payload',
            'salysd_payload.reserve_oracle, attestation_hash, and ceiling_minor are required for SALYSD_ORACLE_UPDATE',
          );
        }
      } else if (!dto.salysd_payload?.token) {
        throw ValidationError('wallet.salysd_payload_required', 'salysd_payload.token is required for SALYSD_* jobs');
      }
      if (kind === 'SALYSD_MINT' && !dto.salysd_payload?.counterparty) {
        throw ValidationError('wallet.salysd_mint_recipient', 'salysd_payload.counterparty (mint recipient) is required');
      }
      if (kind === 'SALYSD_REDEEM' && !dto.salysd_payload?.holder && !dto.salysd_payload?.counterparty) {
        throw ValidationError('wallet.salysd_redeem_holder', 'salysd_payload.holder is required for SALYSD_REDEEM');
      }
      if (kind === 'SALYSD_APPROVE' && !dto.salysd_payload?.spender) {
        throw ValidationError('wallet.salysd_approve_spender', 'salysd_payload.spender is required for SALYSD_APPROVE');
      }
    }

    if (kind === 'CONTRACT_CALL') {
      if (wallet.chain !== 'SALY_L3' && wallet.chain !== 'BASE') {
        throw ValidationError('wallet.contract_call_evm_only', 'CONTRACT_CALL requires BASE or SALY_L3 wallets');
      }
      if (!dto.contract_call_payload?.contract || !dto.contract_call_payload.calldata) {
        throw ValidationError(
          'wallet.contract_call_payload',
          'contract_call_payload.contract and calldata are required for CONTRACT_CALL',
        );
      }
      if (!/^0x[a-fA-F0-9]{40}$/.test(dto.contract_call_payload.contract)) {
        throw ValidationError('wallet.contract_call_bad_target', 'contract_call_payload.contract must be a valid EVM address');
      }
      if (!/^0x[a-fA-F0-9]*$/.test(dto.contract_call_payload.calldata)) {
        throw ValidationError('wallet.contract_call_bad_calldata', 'contract_call_payload.calldata must be hex');
      }
    }

    // Idempotency: a replay with the same key against the same wallet returns the existing job
    // even if the original is still pending.
    const existing = await this.prisma.broadcastJob.findUnique({
      where: { walletId_idempotencyKey: { walletId: wallet.id, idempotencyKey: dto.idempotency_key } },
    });
    if (existing) return existing;

    let iouIssuer: string | null = null;
    if (wallet.chain === 'XRPL' && isXrplIouAsset(dto.asset.toUpperCase())) {
      const env = loadEnv(walletEnvSchema);
      iouIssuer = resolveXrplIouIssuer(dto.asset.toUpperCase(), env.XRPL_IOU_ISSUERS, dto.iou_issuer);
    }

    const job = await this.prisma.broadcastJob.create({
      data: {
        idempotencyKey: dto.idempotency_key,
        walletId: wallet.id,
        chain: wallet.chain,
        kind,
        destinationAddress: dto.destination_address,
        amountMinor: BigInt(dto.amount_minor),
        asset: dto.asset.toUpperCase(),
        iouIssuer,
        destinationTag: dto.destination_tag ?? null,
        memo: dto.memo ?? null,
        intentId: dto.intent_id ?? null,
        dealId: dto.deal_id ?? null,
        escrowContract: dto.escrow_contract ?? null,
        escrowDeadline: dto.escrow_deadline != null ? BigInt(dto.escrow_deadline) : null,
        swapPayload: (dto.swap_payload ?? null) as Prisma.InputJsonValue,
        bridgePayload: (dto.bridge_payload ?? null) as Prisma.InputJsonValue,
        salysdPayload: (dto.salysd_payload ?? null) as Prisma.InputJsonValue,
        contractCallPayload: (dto.contract_call_payload ?? null) as Prisma.InputJsonValue,
        status: 'PENDING',
      },
    });

    const payload: BroadcastJobPayload = {
      broadcastJobId: job.id,
      walletId: wallet.id,
      destinationAddress: dto.destination_address,
      amountMinor: dto.amount_minor,
      asset: dto.asset,
      memo: dto.memo,
    };

    await this.queue.add(BROADCAST_JOB, payload, {
      jobId: `broadcast:${dto.idempotency_key}`,
    });

    this.logger.log(`enqueued broadcast job ${job.id} for wallet ${wallet.id}`);
    return job;
  }

  async findById(id: string): Promise<BroadcastJob> {
    const job = await this.prisma.broadcastJob.findUnique({ where: { id } });
    if (!job) throw NotFoundError('wallet.transfer_not_found', `Transfer ${id} not found`);
    return job;
  }

  async list(opts: { limit: number; status?: BroadcastJobStatus }) {
    const where = opts.status ? { status: opts.status } : undefined;
    return this.prisma.broadcastJob.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: opts.limit,
    });
  }

  async markStatus(id: string, status: BroadcastJobStatus, patch: Prisma.BroadcastJobUpdateInput = {}) {
    return this.prisma.broadcastJob.update({
      where: { id },
      data: { status, ...patch },
    });
  }

  toResponse(job: BroadcastJob) {
    return {
      id: job.id,
      wallet_id: job.walletId,
      kind: job.kind,
      status: job.status,
      tx_hash: job.txHash,
      deal_id: job.dealId,
      attempts: job.attempts,
      last_error: job.lastError,
      created_at: job.createdAt.toISOString(),
    };
  }
}
