import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ContractStatus, ControlKind, ExecutionMode } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';

const CONTRACTS = [
  { id: 'c_escrow', name: 'SalyEscrow', purpose: 'Conditional deal escrow + release', network: 'Base', address: '0x8a3f4c9b21d7e6f0a1b2c3d4e5f60718293a4b5c', version: 'v2.1.0', status: ContractStatus.ACTIVE, tvlUsd: 18_400_000, audited: true, deployedAt: new Date('2025-01-12') },
  { id: 'c_settle', name: 'SettlementVault', purpose: 'Batch payout settlement', network: 'Base', address: '0x1f2e3d4c5b6a7980f1e2d3c4b5a69788f0e1d2c3', version: 'v1.4.2', status: ContractStatus.ACTIVE, tvlUsd: 9_120_000, audited: true, deployedAt: new Date('2025-02-03') },
  { id: 'c_token', name: 'SalyToken', purpose: '$SALY ERC-20 (launch-gated)', network: 'Base', address: '0xabc1234567890def1234567890abcdef12345678', version: 'v1.0.0', status: ContractStatus.PAUSED, tvlUsd: 0, audited: true, deployedAt: new Date('2025-05-20') },
  { id: 'c_stake', name: 'SalyStaking', purpose: 'Synthetix-style staking rewards', network: 'Base', address: '0xdef9876543210fedcba9876543210fedcba98765', version: 'v1.0.0', status: ContractStatus.PAUSED, tvlUsd: 0, audited: false, deployedAt: new Date('2025-05-20') },
  { id: 'c_xrpl', name: 'XRPL Hook: Allowlist', purpose: 'Trust-line issuer allowlist enforcement', network: 'XRPL', address: 'rSALYHookAllowlist9x2k4m8p1q7w3e5r6t8y0u', version: 'v1.1.0', status: ContractStatus.ACTIVE, tvlUsd: 6_300_000, audited: true, deployedAt: new Date('2025-03-08') },
  { id: 'c_salysd', name: 'SalySD', purpose: 'Native L3 stablecoin (pausable)', network: 'Saly L3', address: '0x0000000000000000000000000000000000000001', version: 'v1.0.0', status: ContractStatus.ACTIVE, tvlUsd: 12_000_000, audited: true, deployedAt: new Date('2026-03-01'), chainId: 84532001, controlKind: ControlKind.PAUSABLE, executionMode: ExecutionMode.ON_CHAIN },
  { id: 'c_attest', name: 'SalyAttestationRegistry', purpose: 'Cross-vertical attestation anchor', network: 'Saly L3', address: '0x0000000000000000000000000000000000000002', version: 'v1.0.0', status: ContractStatus.ACTIVE, tvlUsd: 0, audited: true, deployedAt: new Date('2026-06-01'), chainId: 84532001, controlKind: ControlKind.NONE, executionMode: ExecutionMode.ON_CHAIN },
  { id: 'c_l3bridge', name: 'L3 Bridge', purpose: 'L3 ↔ Base canonical bridge', network: 'Base ↔ L3', address: '0x4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e', version: 'v0.9.3', status: ContractStatus.ACTIVE, tvlUsd: 3_980_000, audited: false, deployedAt: new Date('2025-04-19') },
] as const;

const UPGRADES = [
  { id: 'u1', contractId: 'c_escrow', contractName: 'SalyEscrow', fromVersion: 'v2.0.1', toVersion: 'v2.1.0', upgradedAt: new Date('2025-05-14'), approvedBy: 'multisig 3/5' },
  { id: 'u2', contractId: 'c_settle', contractName: 'SettlementVault', fromVersion: 'v1.4.1', toVersion: 'v1.4.2', upgradedAt: new Date('2025-04-28'), approvedBy: 'multisig 3/5' },
  { id: 'u3', contractId: 'c_xrpl', contractName: 'XRPL Hook: Allowlist', fromVersion: 'v1.0.0', toVersion: 'v1.1.0', upgradedAt: new Date('2025-04-02'), approvedBy: 'multisig 4/5' },
  { id: 'u4', contractId: 'c_escrow', contractName: 'SalyEscrow', fromVersion: 'v2.0.0', toVersion: 'v2.0.1', upgradedAt: new Date('2025-03-11'), approvedBy: 'multisig 3/5' },
] as const;

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap(): Promise<void> {
    const count = await this.prisma.deployedContract.count();
    if (count > 0) return;

    await this.prisma.$transaction([
      ...CONTRACTS.map((c) => this.prisma.deployedContract.create({ data: c })),
      ...UPGRADES.map((u) => this.prisma.contractUpgrade.create({ data: u })),
    ]);
  }
}
