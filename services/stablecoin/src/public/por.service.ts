import { Inject, Injectable } from '@nestjs/common';
import {
  L3ChainAdapter,
  resolveSalysdAddress,
  type L3Network,
} from '@salychain/chain-l3';
import {
  isUnderCollateralized,
  reserveRatioBps,
  supplyDriftMinor,
} from '@salychain/stablecoin-por';
import type { StablecoinEnv } from '../config/env.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { STABLECOIN_ENV } from '../config/env.js';

type EvmAddress = `0x${string}`;

@Injectable()
export class PorService {
  private readonly l3Network: L3Network;
  private readonly l3RpcUrl: string | undefined;
  private readonly salysdAddress: EvmAddress | undefined;
  private readonly reserveOracleAddress: EvmAddress | undefined;

  constructor(
    private readonly prisma: PrismaService,
    @Inject(STABLECOIN_ENV) env: StablecoinEnv,
  ) {
    this.l3Network = env.L3_NETWORK;
    this.l3RpcUrl = env.L3_L3_RPC_URL;
    this.salysdAddress = env.L3_SALYSD_ADDRESS as EvmAddress | undefined;
    this.reserveOracleAddress = env.L3_RESERVE_ORACLE_ADDRESS as EvmAddress | undefined;
  }

  async getPublicPor() {
    const [reserves, latestSnapshot, attestations] = await Promise.all([
      this.prisma.reserveAccount.findMany({ orderBy: { custodian: 'asc' } }),
      this.prisma.supplySnapshot.findFirst({
        where: { chain: 'SALY_L3' },
        orderBy: { capturedAt: 'desc' },
      }),
      this.prisma.reserveAttestation.findMany({
        orderBy: { asOf: 'desc' },
        take: 10,
      }),
    ]);

    const reserveTotal = reserves.reduce((sum, row) => sum + row.balanceMinor, 0n);
    const onChainFromSnapshot = latestSnapshot?.onChainSupplyMinor ?? 0n;
    let onChainSupply = onChainFromSnapshot;
    let onChainOracle: {
      authorized_mint_ceiling: string;
      reserve_attestation_hash: string;
      last_attestation_at: string;
    } | null = null;

    const token = this.salysdAddress ?? resolveSalysdAddress(this.l3Network);
    if (token && this.l3RpcUrl) {
      const adapter = new L3ChainAdapter({
        l3Network: this.l3Network,
        rpcUrl: this.l3RpcUrl,
      });
      onChainSupply = await adapter.readSalysdTotalSupply(token);
      if (this.reserveOracleAddress) {
        const state = await adapter.readReserveOracleState(this.reserveOracleAddress);
        onChainOracle = {
          authorized_mint_ceiling: state.authorizedMintCeiling.toString(),
          reserve_attestation_hash: state.reserveAttestationHash,
          last_attestation_at: new Date(Number(state.lastAttestationAt) * 1000).toISOString(),
        };
      }
    }

    const drift = supplyDriftMinor(onChainSupply, reserveTotal);
    const ratioBps = reserveRatioBps(onChainSupply, reserveTotal);
    const latestAttestation = attestations[0];
    const primaryReserve = reserves[0];

    return {
      currency: 'SALYSD',
      chain: 'SALY_L3',
      on_chain_supply_minor: onChainSupply.toString(),
      reserve_total_minor: reserveTotal.toString(),
      reserve_ratio_bps: ratioBps,
      supply_drift_minor: drift.toString(),
      under_collateralized: isUnderCollateralized(onChainSupply, reserveTotal),
      last_snapshot_at: latestSnapshot?.capturedAt.toISOString() ?? null,
      attestation: latestAttestation
        ? {
            hash: latestAttestation.attestationHash,
            balance_minor: latestAttestation.balanceMinor.toString(),
            authorized_ceiling_minor: latestAttestation.authorizedCeilingMinor.toString(),
            as_of: latestAttestation.asOf.toISOString(),
            url: latestAttestation.attestationUrl,
            custodian: primaryReserve?.custodian ?? null,
          }
        : null,
      on_chain_oracle: onChainOracle,
      reserve_accounts: reserves.map((row) => ({
        id: row.id,
        custodian: row.custodian,
        balance_minor: row.balanceMinor.toString(),
        authorized_ceiling_minor: row.authorizedCeilingMinor.toString(),
        as_of: row.asOf?.toISOString() ?? null,
      })),
      attestation_history: attestations.map((row) => ({
        hash: row.attestationHash,
        balance_minor: row.balanceMinor.toString(),
        authorized_ceiling_minor: row.authorizedCeilingMinor.toString(),
        as_of: row.asOf.toISOString(),
        url: row.attestationUrl,
      })),
    };
  }

  async listPublicMintRequests(limit = 20) {
    const rows = await this.prisma.mintRequest.findMany({
      where: { status: { in: ['COMPLETED', 'MINTING', 'APPROVED'] } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((row) => ({
      id: row.id,
      status: row.status,
      amount_minor: row.amountMinor.toString(),
      chain: row.chain,
      tx_hash: row.txHash,
      created_at: row.createdAt.toISOString(),
      updated_at: row.updatedAt.toISOString(),
    }));
  }

  async listPublicRedeemRequests(limit = 20) {
    const rows = await this.prisma.redeemRequest.findMany({
      where: { status: { in: ['COMPLETED', 'BURNING', 'PAYOUT', 'APPROVED'] } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((row) => ({
      id: row.id,
      status: row.status,
      amount_minor: row.amountMinor.toString(),
      chain: row.chain,
      payout_rail: row.payoutRail,
      tx_hash: row.txHash,
      created_at: row.createdAt.toISOString(),
      updated_at: row.updatedAt.toISOString(),
    }));
  }
}
