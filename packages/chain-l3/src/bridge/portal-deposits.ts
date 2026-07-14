import type { Address, Hash, PublicClient } from 'viem';
import { createPublicClient, http, keccak256 } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { OPTIMISM_PORTAL_ABI } from '../contracts.js';

export interface PortalDepositLog {
  blockNumber: bigint;
  blockHash: Hash;
  txHash: Hash;
  logIndex: number;
  portalAddress: Address;
  depositor: Address;
  l2Recipient: Address;
  depositVersion: bigint;
  opaqueData: `0x${string}`;
  opaqueDataHash: Hash;
}

export async function fetchPortalDeposits(input: {
  client: PublicClient;
  portalAddress: Address;
  fromBlock: bigint;
  toBlock: bigint;
}): Promise<PortalDepositLog[]> {
  const logs = await input.client.getContractEvents({
    address: input.portalAddress,
    abi: OPTIMISM_PORTAL_ABI,
    eventName: 'TransactionDeposited',
    fromBlock: input.fromBlock,
    toBlock: input.toBlock,
  });

  return logs.map((log) => ({
    blockNumber: log.blockNumber,
    blockHash: log.blockHash,
    txHash: log.transactionHash,
    logIndex: log.logIndex,
    portalAddress: input.portalAddress,
    depositor: log.args.from!,
    l2Recipient: log.args.to!,
    depositVersion: log.args.version!,
    opaqueData: log.args.opaqueData!,
    opaqueDataHash: keccak256(log.args.opaqueData!),
  }));
}

export async function fetchPortalDepositsForSettlement(input: {
  rpcUrl: string;
  settlement: 'base-sepolia' | 'base-mainnet';
  portalAddress: Address;
  fromBlock: bigint;
  toBlock: bigint;
}): Promise<PortalDepositLog[]> {
  const chain = input.settlement === 'base-mainnet' ? base : baseSepolia;
  const client = createPublicClient({ chain, transport: http(input.rpcUrl) });
  return fetchPortalDeposits({
    client: client as unknown as PublicClient,
    portalAddress: input.portalAddress,
    fromBlock: input.fromBlock,
    toBlock: input.toBlock,
  });
}
