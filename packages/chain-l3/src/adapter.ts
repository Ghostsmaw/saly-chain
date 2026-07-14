import {
  createPublicClient,
  decodeEventLog,
  encodeFunctionData,
  getAbiItem,
  http,
  isAddress,
  serializeTransaction,
  type Address,
  type Hex,
  type Log,
  type TransactionSerializable,
} from 'viem';
import { ExternalError, ValidationError } from '@salychain/errors';
import type { Logger } from '@salychain/logger';
import { ERC20_ABI } from './abi.js';
import { encodeWithdrawTo } from './bridge/tx-builders.js';
import { encodeSalysdBurnFrom, encodeSalysdMint } from './salysd.js';
import { encodeReserveOracleUpdate } from './reserve-oracle.js';
import { getL3Asset, resolveUsdcAddress, type L3Asset } from './assets.js';
import type { L3Network } from './network.js';
import { l3Network } from './network.js';
import { l3ViemChain } from './viem-chain.js';
import { resolveL3RpcUrl } from './rpc.js';

export interface L3AdapterOptions {
  l3Network: L3Network;
  rpcUrl?: string;
  logger?: Logger;
}

export interface PreparedTransfer {
  to: Address;
  data: Hex;
  value: bigint;
  gas: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  nonce: number;
  chainId: number;
  unsigned: Hex;
}

export interface DecodedTransferLog {
  contractAddress: Address;
  from: Address;
  to: Address;
  amountMinor: bigint;
  txHash: Hex;
  blockNumber: bigint;
  blockHash: Hex;
  logIndex: number;
}

/**
 * L3 execution client — builds unsigned ERC-20 transfers on Saly OP-Stack L3.
 * Keys stay in the signer service (ADR-0005).
 */
export class L3ChainAdapter {
  readonly l3Network: L3Network;
  private readonly logger: Logger | undefined;
  private readonly client;

  constructor(opts: L3AdapterOptions) {
    this.l3Network = opts.l3Network;
    this.logger = opts.logger;
    const def = l3Network(opts.l3Network);
    const rpcUrl = opts.rpcUrl ?? resolveL3RpcUrl(opts.l3Network);
    this.client = createPublicClient({
      chain: l3ViemChain(def, rpcUrl),
      transport: http(rpcUrl, { timeout: 15_000 }),
    });
  }

  async prepareTransfer(input: {
    from: Address;
    to: Address;
    amountMinor: bigint;
    asset: L3Asset;
  }): Promise<PreparedTransfer> {
    if (!isAddress(input.from))
      throw ValidationError('chain.l3.bad_from', `Invalid from: ${input.from}`);
    if (!isAddress(input.to)) throw ValidationError('chain.l3.bad_to', `Invalid to: ${input.to}`);
    if (input.amountMinor <= 0n)
      throw ValidationError('chain.l3.bad_amount', 'amountMinor must be positive');

    const asset = getL3Asset(this.l3Network, input.asset);
    const chain = this.client.chain;
    if (!chain) throw ExternalError('chain.l3.no_chain', 'No chain context configured');

    let to: Address;
    let data: Hex;
    let value: bigint;
    if (asset.address) {
      to = asset.address;
      data = encodeFunctionData({
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [input.to, input.amountMinor],
      });
      value = 0n;
    } else {
      to = input.to;
      data = '0x';
      value = input.amountMinor;
    }

    return this.prepareEip1559Tx({ from: input.from, to, data, value });
  }

  async getAllowance(input: {
    owner: Address;
    spender: Address;
    token: Address;
  }): Promise<bigint> {
    return this.safeRpc(() =>
      this.client.readContract({
        address: input.token,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [input.owner, input.spender],
      }),
    );
  }

  async prepareApprove(input: {
    from: Address;
    token: Address;
    spender: Address;
    amountMinor: bigint;
  }): Promise<PreparedTransfer> {
    const data = encodeFunctionData({
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [input.spender, input.amountMinor],
    });
    return this.prepareEip1559Tx({ from: input.from, to: input.token, data, value: 0n });
  }

  /** SalySD.mint — treasury minter role only. */
  async prepareSalysdMint(input: {
    from: Address;
    token: Address;
    recipient: Address;
    amountMinor: bigint;
  }): Promise<PreparedTransfer> {
    if (!isAddress(input.token)) {
      throw ValidationError('chain.l3.bad_token', 'Invalid SalySD token address');
    }
    const data = encodeSalysdMint({ to: input.recipient, amountMinor: input.amountMinor });
    return this.prepareEip1559Tx({ from: input.from, to: input.token, data, value: 0n });
  }

  /** SalySD.burnFrom — treasury burner role; holder must approve burner first. */
  async prepareSalysdBurnFrom(input: {
    from: Address;
    token: Address;
    holder: Address;
    amountMinor: bigint;
  }): Promise<PreparedTransfer> {
    if (!isAddress(input.token)) {
      throw ValidationError('chain.l3.bad_token', 'Invalid SalySD token address');
    }
    const data = encodeSalysdBurnFrom({ from: input.holder, amountMinor: input.amountMinor });
    return this.prepareEip1559Tx({ from: input.from, to: input.token, data, value: 0n });
  }

  /** ReserveOracle.updateAttestation — treasury oracle owner only (Milestone D6). */
  async prepareReserveOracleUpdate(input: {
    from: Address;
    reserveOracle: Address;
    ceilingMinor: bigint;
    attestationHash: Hex;
  }): Promise<PreparedTransfer> {
    if (!isAddress(input.reserveOracle)) {
      throw ValidationError('chain.l3.bad_oracle', 'Invalid ReserveOracle address');
    }
    const data = encodeReserveOracleUpdate({
      ceilingMinor: input.ceilingMinor,
      attestationHash: input.attestationHash,
    });
    return this.prepareEip1559Tx({ from: input.from, to: input.reserveOracle, data, value: 0n });
  }

  /** Generic contract call — governance pause/unpause, attestation admin, etc. */
  async prepareContractCall(input: {
    from: Address;
    contract: Address;
    calldata: Hex;
  }): Promise<PreparedTransfer> {
    if (!isAddress(input.contract)) {
      throw ValidationError('chain.l3.bad_contract', 'Invalid contract address');
    }
    return this.prepareEip1559Tx({
      from: input.from,
      to: input.contract,
      data: input.calldata,
      value: 0n,
    });
  }

  async readAttestationVerify(registry: Address, attestationId: Hex): Promise<{
    valid: boolean;
    record: {
      schemaId: Hex;
      issuer: Address;
      subject: Hex;
      dataHash: Hex;
      issuedAt: bigint;
      expiresAt: bigint;
      revoked: boolean;
    };
  }> {
    const [valid, record] = await this.client.readContract({
      address: registry,
      abi: [
        {
          type: 'function',
          name: 'verify',
          stateMutability: 'view',
          inputs: [{ name: 'id', type: 'bytes32' }],
          outputs: [
            { name: 'valid', type: 'bool' },
            {
              name: 'record',
              type: 'tuple',
              components: [
                { name: 'schemaId', type: 'bytes32' },
                { name: 'issuer', type: 'address' },
                { name: 'subject', type: 'bytes32' },
                { name: 'dataHash', type: 'bytes32' },
                { name: 'issuedAt', type: 'uint64' },
                { name: 'expiresAt', type: 'uint64' },
                { name: 'revoked', type: 'bool' },
              ],
            },
          ],
        },
      ] as const,
      functionName: 'verify',
      args: [attestationId],
    });
    return { valid, record };
  }

  async readSalysdTotalSupply(token: Address): Promise<bigint> {
    return this.client.readContract({
      address: token,
      abi: [{ type: 'function', name: 'totalSupply', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] }] as const,
      functionName: 'totalSupply',
    });
  }

  async readReserveOracleState(oracle: Address): Promise<{
    authorizedMintCeiling: bigint;
    reserveAttestationHash: Hex;
    lastAttestationAt: bigint;
  }> {
    const [authorizedMintCeiling, reserveAttestationHash, lastAttestationAt] = await Promise.all([
      this.client.readContract({
        address: oracle,
        abi: [{ type: 'function', name: 'authorizedMintCeiling', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] }] as const,
        functionName: 'authorizedMintCeiling',
      }),
      this.client.readContract({
        address: oracle,
        abi: [{ type: 'function', name: 'reserveAttestationHash', stateMutability: 'view', inputs: [], outputs: [{ type: 'bytes32' }] }] as const,
        functionName: 'reserveAttestationHash',
      }),
      this.client.readContract({
        address: oracle,
        abi: [{ type: 'function', name: 'lastAttestationAt', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint64' }] }] as const,
        functionName: 'lastAttestationAt',
      }),
    ]);
    return { authorizedMintCeiling, reserveAttestationHash, lastAttestationAt };
  }

  /** L2StandardBridge.withdrawTo — initiates L3 → Base withdrawal. */
  async prepareBridgeWithdraw(input: {
    from: Address;
    l2StandardBridge: Address;
    l2Token: Address;
    l1Recipient: Address;
    amountMinor: bigint;
  }): Promise<PreparedTransfer> {
    if (!isAddress(input.l2StandardBridge)) {
      throw ValidationError('chain.l3.bad_bridge', 'Invalid L2 standard bridge address');
    }
    const data = encodeWithdrawTo({
      l2Token: input.l2Token,
      l1Recipient: input.l1Recipient,
      amountMinor: input.amountMinor,
    });
    return this.prepareEip1559Tx({
      from: input.from,
      to: input.l2StandardBridge,
      data,
      value: 0n,
    });
  }

  async broadcast(signedTx: Hex): Promise<{ txHash: Hex }> {
    try {
      const txHash = await this.client.sendRawTransaction({ serializedTransaction: signedTx });
      this.logger?.info?.(`broadcast tx ${txHash}`);
      return { txHash };
    } catch (err) {
      throw ExternalError(
        'chain.l3.broadcast_failed',
        `Broadcast failed: ${(err as Error).message}`,
        {
          cause: err,
        },
      );
    }
  }

  getCurrentBlockNumber(): Promise<bigint> {
    return this.safeRpc(() => this.client.getBlockNumber());
  }

  /** Chain ID reported by the connected execution RPC (op-geth). */
  getChainId(): Promise<number> {
    return this.safeRpc(() => this.client.getChainId());
  }

  /** True when an address has deployed bytecode (i.e. is a contract, not an EOA). */
  async isContractDeployed(address: Address): Promise<boolean> {
    if (!isAddress(address))
      throw ValidationError('chain.l3.bad_address', `Invalid address: ${address}`);
    const code = await this.safeRpc(() => this.client.getBytecode({ address }));
    return Boolean(code && code !== '0x');
  }

  getBlock(blockNumber: bigint) {
    return this.safeRpc(() => this.client.getBlock({ blockNumber, includeTransactions: false }));
  }

  async getTransferLogs(input: {
    fromBlock: bigint;
    toBlock: bigint;
    contractAddresses?: readonly Address[];
  }): Promise<DecodedTransferLog[]> {
    const usdc = resolveUsdcAddress(this.l3Network);
    const addresses = input.contractAddresses ?? (usdc ? [usdc] : []);
    if (addresses.length === 0) return [];

    const transferEvent = getAbiItem({ abi: ERC20_ABI, name: 'Transfer' });
    const rawLogs = await this.safeRpc(() =>
      this.client.getLogs({
        address: addresses as Address[],
        event: transferEvent,
        fromBlock: input.fromBlock,
        toBlock: input.toBlock,
      }),
    );

    return rawLogs
      .map((log: Log) => {
        try {
          const decoded = decodeEventLog({ abi: ERC20_ABI, data: log.data, topics: log.topics });
          if (decoded.eventName !== 'Transfer') return null;
          const args = decoded.args as { from: Address; to: Address; value: bigint };
          return {
            contractAddress: log.address as Address,
            from: args.from,
            to: args.to,
            amountMinor: args.value,
            txHash: log.transactionHash!,
            blockNumber: log.blockNumber!,
            blockHash: log.blockHash!,
            logIndex: log.logIndex!,
          } satisfies DecodedTransferLog;
        } catch {
          return null;
        }
      })
      .filter((x): x is DecodedTransferLog => x !== null);
  }

  private async prepareEip1559Tx(input: {
    from: Address;
    to: Address;
    data: Hex;
    value: bigint;
  }): Promise<PreparedTransfer> {
    const chain = this.client.chain;
    if (!chain) throw ExternalError('chain.l3.no_chain', 'No chain context configured');

    const [nonce, fees] = await Promise.all([
      this.safeRpc(() =>
        this.client.getTransactionCount({ address: input.from, blockTag: 'pending' }),
      ),
      this.safeRpc(() => this.client.estimateFeesPerGas()),
    ]);

    const gas = await this.safeRpc(() =>
      this.client.estimateGas({
        account: input.from,
        to: input.to,
        data: input.data,
        value: input.value,
      }),
    );

    const paddedGas = (gas * 120n) / 100n;
    const unsignedTx: TransactionSerializable = {
      type: 'eip1559',
      chainId: chain.id,
      to: input.to,
      data: input.data,
      value: input.value,
      gas: paddedGas,
      maxFeePerGas: fees.maxFeePerGas,
      maxPriorityFeePerGas: fees.maxPriorityFeePerGas,
      nonce,
    };

    return {
      to: input.to,
      data: input.data,
      value: input.value,
      gas: paddedGas,
      maxFeePerGas: fees.maxFeePerGas,
      maxPriorityFeePerGas: fees.maxPriorityFeePerGas,
      nonce,
      chainId: chain.id,
      unsigned: serializeTransaction(unsignedTx),
    };
  }

  private async safeRpc<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      throw ExternalError('chain.l3.rpc_error', `L3 RPC error: ${(err as Error).message}`, {
        cause: err,
      });
    }
  }
}
