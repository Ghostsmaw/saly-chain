import type { Address, Hash, PublicClient } from 'viem';
import { createPublicClient, http } from 'viem';
import { L2_STANDARD_BRIDGE_ABI } from '../contracts.js';
import type { L3Network } from '../network.js';
import { l3Network } from '../network.js';
import { l3ViemChain } from '../viem-chain.js';

export interface L2BridgeWithdrawalLog {
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

export async function fetchL2BridgeWithdrawals(input: {
  client: PublicClient;
  bridgeAddress: Address;
  fromBlock: bigint;
  toBlock: bigint;
}): Promise<L2BridgeWithdrawalLog[]> {
  const logs = await input.client.getContractEvents({
    address: input.bridgeAddress,
    abi: L2_STANDARD_BRIDGE_ABI,
    eventName: 'WithdrawalInitiated',
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

export async function fetchL2BridgeWithdrawalsForSettlement(input: {
  l3Network: L3Network;
  rpcUrl: string;
  bridgeAddress: Address;
  fromBlock: bigint;
  toBlock: bigint;
}): Promise<L2BridgeWithdrawalLog[]> {
  const def = l3Network(input.l3Network);
  const client = createPublicClient({
    chain: l3ViemChain(def, input.rpcUrl),
    transport: http(input.rpcUrl, { timeout: 15_000 }),
  });
  return fetchL2BridgeWithdrawals({
    client: client as unknown as PublicClient,
    bridgeAddress: input.bridgeAddress,
    fromBlock: input.fromBlock,
    toBlock: input.toBlock,
  });
}
