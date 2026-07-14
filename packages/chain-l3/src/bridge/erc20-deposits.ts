import type { Address, Hash, PublicClient } from 'viem';
import { createPublicClient, http } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { L1_STANDARD_BRIDGE_ABI } from '../contracts.js';

export interface Erc20BridgeDepositLog {
  blockNumber: bigint;
  blockHash: Hash;
  txHash: Hash;
  logIndex: number;
  bridgeAddress: Address;
  l1Token: Address;
  l2Token: Address;
  from: Address;
  to: Address;
  amountMinor: bigint;
}

export async function fetchErc20BridgeDeposits(input: {
  client: PublicClient;
  bridgeAddress: Address;
  fromBlock: bigint;
  toBlock: bigint;
}): Promise<Erc20BridgeDepositLog[]> {
  const logs = await input.client.getContractEvents({
    address: input.bridgeAddress,
    abi: L1_STANDARD_BRIDGE_ABI,
    eventName: 'ERC20DepositInitiated',
    fromBlock: input.fromBlock,
    toBlock: input.toBlock,
  });

  return logs.map((log) => ({
    blockNumber: log.blockNumber,
    blockHash: log.blockHash,
    txHash: log.transactionHash,
    logIndex: log.logIndex,
    bridgeAddress: input.bridgeAddress,
    l1Token: log.args.l1Token!,
    l2Token: log.args.l2Token!,
    from: log.args.from!,
    to: log.args.to!,
    amountMinor: log.args.amount!,
  }));
}

export async function fetchErc20BridgeDepositsForSettlement(input: {
  rpcUrl: string;
  settlement: 'base-sepolia' | 'base-mainnet';
  bridgeAddress: Address;
  fromBlock: bigint;
  toBlock: bigint;
}): Promise<Erc20BridgeDepositLog[]> {
  const chain = input.settlement === 'base-mainnet' ? base : baseSepolia;
  const client = createPublicClient({ chain, transport: http(input.rpcUrl) });
  return fetchErc20BridgeDeposits({
    client: client as unknown as PublicClient,
    bridgeAddress: input.bridgeAddress,
    fromBlock: input.fromBlock,
    toBlock: input.toBlock,
  });
}
