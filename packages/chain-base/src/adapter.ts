import {
  createPublicClient,
  decodeEventLog,
  encodeFunctionData,
  getAbiItem,
  http,
  isAddress,
  parseTransaction,
  serializeTransaction,
  type Address,
  type Hex,
  type Log,
  type TransactionSerializable,
} from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { ExternalError, ValidationError } from '@salychain/errors';
import type { Logger } from '@salychain/logger';
import { BASE_ASSETS, type BaseAsset, type BaseNetwork, getAsset } from './assets.js';
import { ERC20_ABI } from './abi.js';
import { encodeDepositErc20To } from './bridge.js';
import { SALY_ESCROW_ABI } from './escrow.js';
import { getDexTokenAddress, type DexTokenSymbol } from './dex-tokens.js';

/**
 * Base chain adapter.
 *
 * Build/sign/broadcast split — the adapter assembles an unsigned transaction
 * and asks the caller (the wallet service, talking to the signer) to sign it.
 * The adapter then broadcasts the resulting raw transaction. This keeps key
 * material outside this package entirely (see ADR-0005).
 */

export interface BaseAdapterOptions {
  network: BaseNetwork;
  rpcUrl: string;
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

export interface DecodedDealFundedLog {
  dealId: Hex;
  payer: Address;
  payee: Address;
  token: Address;
  amountMinor: bigint;
  deadline: bigint;
  txHash: Hex;
  blockNumber: bigint;
  blockHash: Hex;
  logIndex: number;
}

export interface DecodedDealReleasedLog {
  dealId: Hex;
  payee: Address;
  amountMinor: bigint;
  txHash: Hex;
  blockNumber: bigint;
  blockHash: Hex;
  logIndex: number;
}

export interface DecodedDealRefundedLog {
  dealId: Hex;
  payer: Address;
  amountMinor: bigint;
  txHash: Hex;
  blockNumber: bigint;
  blockHash: Hex;
  logIndex: number;
}

export class BaseChainAdapter {
  readonly network: BaseNetwork;
  private readonly logger: Logger | undefined;
  private readonly client;

  constructor(opts: BaseAdapterOptions) {
    this.network = opts.network;
    this.logger = opts.logger;
    this.client = createPublicClient({
      chain: opts.network === 'base-mainnet' ? base : baseSepolia,
      transport: http(opts.rpcUrl, { timeout: 15_000 }),
    });
  }

  // ───────────────────────────── Build ─────────────────────────────

  /**
   * Build an unsigned ERC-20 (or native) transfer ready for the signer.
   * Estimates gas conservatively, fetches nonce + fee suggestions, and returns
   * both the structured fields and a serialized hex blob.
   */
  async prepareTransfer(input: {
    from: Address;
    to: Address;
    amountMinor: bigint;
    asset: BaseAsset;
  }): Promise<PreparedTransfer> {
    if (!isAddress(input.from)) throw ValidationError('chain.base.bad_from', `Invalid from address: ${input.from}`);
    if (!isAddress(input.to)) throw ValidationError('chain.base.bad_to', `Invalid to address: ${input.to}`);
    if (input.amountMinor <= 0n)
      throw ValidationError('chain.base.bad_amount', 'amountMinor must be positive');

    const asset = getAsset(this.network, input.asset);
    const chain = this.client.chain;
    if (!chain) throw ExternalError('chain.base.no_chain', 'No chain context configured');

    let to: Address;
    let data: Hex;
    let value: bigint;
    if (asset.address) {
      to = asset.address;
      data = encodeFunctionData({ abi: ERC20_ABI, functionName: 'transfer', args: [input.to, input.amountMinor] });
      value = 0n;
    } else {
      to = input.to;
      data = '0x';
      value = input.amountMinor;
    }

    return this.prepareEip1559Tx({ from: input.from, to, data, value });
  }

  /**
   * Build an unsigned ERC-20 approve for a spender (used before escrow fundDeal).
   */
  async prepareApprove(input: {
    from: Address;
    spender: Address;
    amountMinor: bigint;
    asset: BaseAsset;
  }): Promise<PreparedTransfer> {
    if (!isAddress(input.from)) throw ValidationError('chain.base.bad_from', `Invalid from address: ${input.from}`);
    if (!isAddress(input.spender)) throw ValidationError('chain.base.bad_spender', `Invalid spender: ${input.spender}`);
    if (input.amountMinor <= 0n) throw ValidationError('chain.base.bad_amount', 'amountMinor must be positive');

    const asset = getAsset(this.network, input.asset);
    if (!asset.address) {
      throw ValidationError('chain.base.approve_native', 'Native asset approve is not supported');
    }

    const data = encodeFunctionData({
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [input.spender, input.amountMinor],
    });
    return this.prepareEip1559Tx({ from: input.from, to: asset.address, data, value: 0n });
  }

  /**
   * Build unsigned L1StandardBridge.depositERC20To (Base → L3).
   * Caller must ensure ERC-20 approve to the bridge first when allowance is insufficient.
   */
  async prepareBridgeDeposit(input: {
    from: Address;
    l1StandardBridge: Address;
    l1Token: Address;
    l2Token: Address;
    l2Recipient: Address;
    amountMinor: bigint;
    minGasLimit?: number;
  }): Promise<PreparedTransfer> {
    if (!isAddress(input.l1StandardBridge)) {
      throw ValidationError('chain.base.bad_bridge', 'Invalid L1 standard bridge address');
    }
    if (input.amountMinor <= 0n) throw ValidationError('chain.base.bad_amount', 'amountMinor must be positive');

    const data = encodeDepositErc20To({
      l1Token: input.l1Token,
      l2Token: input.l2Token,
      l2Recipient: input.l2Recipient,
      amountMinor: input.amountMinor,
      ...(input.minGasLimit !== undefined ? { minGasLimit: input.minGasLimit } : {}),
    });
    return this.prepareEip1559Tx({
      from: input.from,
      to: input.l1StandardBridge,
      data,
      value: 0n,
    });
  }

  /** ERC-20 approve for DEX tokens (USDC / WETH). */
  async prepareDexTokenApprove(input: {
    from: Address;
    spender: Address;
    amountMinor: bigint;
    token: DexTokenSymbol;
  }): Promise<PreparedTransfer> {
    if (!isAddress(input.from)) throw ValidationError('chain.base.bad_from', `Invalid from address: ${input.from}`);
    if (!isAddress(input.spender)) throw ValidationError('chain.base.bad_spender', `Invalid spender: ${input.spender}`);
    if (input.amountMinor <= 0n) throw ValidationError('chain.base.bad_amount', 'amountMinor must be positive');

    const tokenAddress = getDexTokenAddress(this.network, input.token);
    const data = encodeFunctionData({
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [input.spender, input.amountMinor],
    });
    return this.prepareEip1559Tx({ from: input.from, to: tokenAddress, data, value: 0n });
  }

  async getDexTokenAllowance(input: {
    owner: Address;
    spender: Address;
    token: DexTokenSymbol;
  }): Promise<bigint> {
    const tokenAddress = getDexTokenAddress(this.network, input.token);
    return this.safeRpc(() =>
      this.client.readContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [input.owner, input.spender],
      }),
    );
  }

  /** Build an unsigned Uniswap V3 router swap (exactInputSingle). */
  async prepareDexSwap(input: {
    from: Address;
    router: Address;
    calldata: Hex;
  }): Promise<PreparedTransfer> {
    if (!isAddress(input.from)) throw ValidationError('chain.base.bad_from', `Invalid from address: ${input.from}`);
    if (!isAddress(input.router)) throw ValidationError('chain.base.bad_router', `Invalid router: ${input.router}`);
    return this.prepareEip1559Tx({ from: input.from, to: input.router, data: input.calldata, value: 0n });
  }

  /** Generic contract call — governance-controlled operations on Base. */
  async prepareContractCall(input: {
    from: Address;
    contract: Address;
    calldata: Hex;
  }): Promise<PreparedTransfer> {
    if (!isAddress(input.contract)) {
      throw ValidationError('chain.base.bad_contract', 'Invalid contract address');
    }
    return this.prepareEip1559Tx({
      from: input.from,
      to: input.contract,
      data: input.calldata,
      value: 0n,
    });
  }

  /**
   * Build an unsigned SalyEscrow.fundDeal call. Caller must have approved the
   * escrow contract for at least `amountMinor` of the token first.
   */
  async prepareFundDeal(input: {
    from: Address;
    escrowAddress: Address;
    dealId: Hex;
    payee: Address;
    asset: BaseAsset;
    amountMinor: bigint;
    deadline: bigint;
  }): Promise<PreparedTransfer> {
    if (!isAddress(input.from)) throw ValidationError('chain.base.bad_from', `Invalid from address: ${input.from}`);
    if (!isAddress(input.escrowAddress)) {
      throw ValidationError('chain.base.bad_escrow', `Invalid escrow address: ${input.escrowAddress}`);
    }
    if (!isAddress(input.payee)) throw ValidationError('chain.base.bad_payee', `Invalid payee: ${input.payee}`);
    if (input.amountMinor <= 0n) throw ValidationError('chain.base.bad_amount', 'amountMinor must be positive');
    if (input.amountMinor > 2n ** 128n - 1n) {
      throw ValidationError('chain.base.amount_too_large', 'amount exceeds uint128');
    }
    if (input.deadline < 0n || input.deadline > 2n ** 64n - 1n) {
      throw ValidationError('chain.base.bad_deadline', 'deadline must fit uint64');
    }

    const asset = getAsset(this.network, input.asset);
    if (!asset.address) {
      throw ValidationError('chain.base.escrow_native', 'Escrow supports ERC-20 tokens only');
    }

    const data = encodeFunctionData({
      abi: SALY_ESCROW_ABI,
      functionName: 'fundDeal',
      args: [
        input.dealId,
        input.payee,
        asset.address,
        input.amountMinor,
        input.deadline,
      ],
    });

    return this.prepareEip1559Tx({ from: input.from, to: input.escrowAddress, data, value: 0n });
  }

  /** Build an unsigned SalyEscrow.release call (resolver wallet). */
  async prepareRelease(input: { from: Address; escrowAddress: Address; dealId: Hex }): Promise<PreparedTransfer> {
    if (!isAddress(input.from)) throw ValidationError('chain.base.bad_from', `Invalid from address: ${input.from}`);
    if (!isAddress(input.escrowAddress)) {
      throw ValidationError('chain.base.bad_escrow', `Invalid escrow address: ${input.escrowAddress}`);
    }
    const data = encodeFunctionData({
      abi: SALY_ESCROW_ABI,
      functionName: 'release',
      args: [input.dealId],
    });
    return this.prepareEip1559Tx({ from: input.from, to: input.escrowAddress, data, value: 0n });
  }

  /** Build an unsigned SalyEscrow.refund call (resolver or post-deadline). */
  async prepareRefund(input: { from: Address; escrowAddress: Address; dealId: Hex }): Promise<PreparedTransfer> {
    if (!isAddress(input.from)) throw ValidationError('chain.base.bad_from', `Invalid from address: ${input.from}`);
    if (!isAddress(input.escrowAddress)) {
      throw ValidationError('chain.base.bad_escrow', `Invalid escrow address: ${input.escrowAddress}`);
    }
    const data = encodeFunctionData({
      abi: SALY_ESCROW_ABI,
      functionName: 'refund',
      args: [input.dealId],
    });
    return this.prepareEip1559Tx({ from: input.from, to: input.escrowAddress, data, value: 0n });
  }

  /** Read on-chain deal state from SalyEscrow.deals mapping. */
  async readEscrowDeal(escrowAddress: Address, dealId: Hex) {
    const result = await this.safeRpc(() =>
      this.client.readContract({
        address: escrowAddress,
        abi: SALY_ESCROW_ABI,
        functionName: 'deals',
        args: [dealId],
      }),
    );
    return {
      payer: result[0],
      payee: result[1],
      token: result[2],
      amount: result[3],
      deadline: result[4],
      status: result[5],
    };
  }

  async readEscrowResolver(escrowAddress: Address): Promise<Address> {
    return this.safeRpc(() =>
      this.client.readContract({
        address: escrowAddress,
        abi: SALY_ESCROW_ABI,
        functionName: 'resolver',
      }),
    );
  }
  async getAllowance(input: { owner: Address; spender: Address; asset: BaseAsset }): Promise<bigint> {
    const asset = getAsset(this.network, input.asset);
    if (!asset.address) return 0n;
    return this.safeRpc(() =>
      this.client.readContract({
        address: asset.address!,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [input.owner, input.spender],
      }),
    );
  }

  private async prepareEip1559Tx(input: {
    from: Address;
    to: Address;
    data: Hex;
    value: bigint;
  }): Promise<PreparedTransfer> {
    const chain = this.client.chain;
    if (!chain) throw ExternalError('chain.base.no_chain', 'No chain context configured');

    const [nonce, fees] = await Promise.all([
      this.safeRpc(() => this.client.getTransactionCount({ address: input.from, blockTag: 'pending' })),
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
    const unsigned = serializeTransaction(unsignedTx);

    return {
      to: input.to,
      data: input.data,
      value: input.value,
      gas: paddedGas,
      maxFeePerGas: fees.maxFeePerGas,
      maxPriorityFeePerGas: fees.maxPriorityFeePerGas,
      nonce,
      chainId: chain.id,
      unsigned,
    };
  }

  // ───────────────────────────── Broadcast ─────────────────────────────

  async broadcast(signedTx: Hex): Promise<{ txHash: Hex }> {
    try {
      const txHash = await this.client.sendRawTransaction({ serializedTransaction: signedTx });
      this.logger?.info?.(`broadcast tx ${txHash}`);
      return { txHash };
    } catch (err) {
      throw ExternalError('chain.base.broadcast_failed', `Broadcast failed: ${(err as Error).message}`, {
        cause: err,
      });
    }
  }

  /**
   * Wait for a transaction to mine with the requested number of confirmations.
   * Returns receipt details. Used by the broadcast worker.
   */
  async waitForReceipt(txHash: Hex, confirmations = 1) {
    return this.safeRpc(() =>
      this.client.waitForTransactionReceipt({ hash: txHash, confirmations, timeout: 120_000 }),
    );
  }

  // ───────────────────────────── Reads ─────────────────────────────

  getCurrentBlockNumber(): Promise<bigint> {
    return this.safeRpc(() => this.client.getBlockNumber());
  }

  getBlock(blockNumber: bigint) {
    return this.safeRpc(() => this.client.getBlock({ blockNumber, includeTransactions: false }));
  }

  /**
   * Fetch ERC-20 Transfer logs in a block range for the given contract(s).
   * Used by the chain listener.
   */
  async getTransferLogs(input: {
    fromBlock: bigint;
    toBlock: bigint;
    contractAddresses?: readonly Address[];
  }): Promise<DecodedTransferLog[]> {
    const transferEvent = getAbiItem({ abi: ERC20_ABI, name: 'Transfer' });
    const rawLogs = await this.safeRpc(() =>
      this.client.getLogs({
        address: input.contractAddresses as Address[] | undefined,
        event: transferEvent,
        fromBlock: input.fromBlock,
        toBlock: input.toBlock,
      }),
    );

    return rawLogs
      .map((log: Log) => {
        try {
          const decoded = decodeEventLog({
            abi: ERC20_ABI,
            data: log.data,
            topics: log.topics,
          });
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
        } catch (err) {
          this.logger?.warn?.(`failed to decode log: ${(err as Error).message}`);
          return null;
        }
      })
      .filter((x): x is DecodedTransferLog => x !== null);
  }

  /**
   * Fetch SalyEscrow DealFunded logs in a block range.
   */
  async getDealFundedLogs(input: {
    fromBlock: bigint;
    toBlock: bigint;
    escrowAddress: Address;
  }): Promise<DecodedDealFundedLog[]> {
    const dealFundedEvent = getAbiItem({ abi: SALY_ESCROW_ABI, name: 'DealFunded' });
    const rawLogs = await this.safeRpc(() =>
      this.client.getLogs({
        address: input.escrowAddress,
        event: dealFundedEvent,
        fromBlock: input.fromBlock,
        toBlock: input.toBlock,
      }),
    );

    return rawLogs
      .map((log: Log) => {
        try {
          const decoded = decodeEventLog({
            abi: SALY_ESCROW_ABI,
            data: log.data,
            topics: log.topics,
          });
          if (decoded.eventName !== 'DealFunded') return null;
          const args = decoded.args as {
            dealId: Hex;
            payer: Address;
            payee: Address;
            token: Address;
            amount: bigint;
            deadline: bigint;
          };
          return {
            dealId: args.dealId,
            payer: args.payer,
            payee: args.payee,
            token: args.token,
            amountMinor: args.amount,
            deadline: args.deadline,
            txHash: log.transactionHash!,
            blockNumber: log.blockNumber!,
            blockHash: log.blockHash!,
            logIndex: log.logIndex!,
          } satisfies DecodedDealFundedLog;
        } catch (err) {
          this.logger?.warn?.(`failed to decode DealFunded log: ${(err as Error).message}`);
          return null;
        }
      })
      .filter((x): x is DecodedDealFundedLog => x !== null);
  }

  /** Fetch SalyEscrow DealReleased logs in a block range. */
  async getDealReleasedLogs(input: {
    fromBlock: bigint;
    toBlock: bigint;
    escrowAddress: Address;
  }): Promise<DecodedDealReleasedLog[]> {
    const event = getAbiItem({ abi: SALY_ESCROW_ABI, name: 'DealReleased' });
    const rawLogs = await this.safeRpc(() =>
      this.client.getLogs({
        address: input.escrowAddress,
        event,
        fromBlock: input.fromBlock,
        toBlock: input.toBlock,
      }),
    );

    return rawLogs
      .map((log: Log) => {
        try {
          const decoded = decodeEventLog({ abi: SALY_ESCROW_ABI, data: log.data, topics: log.topics });
          if (decoded.eventName !== 'DealReleased') return null;
          const args = decoded.args as { dealId: Hex; payee: Address; amount: bigint };
          return {
            dealId: args.dealId,
            payee: args.payee,
            amountMinor: args.amount,
            txHash: log.transactionHash!,
            blockNumber: log.blockNumber!,
            blockHash: log.blockHash!,
            logIndex: log.logIndex!,
          } satisfies DecodedDealReleasedLog;
        } catch (err) {
          this.logger?.warn?.(`failed to decode DealReleased log: ${(err as Error).message}`);
          return null;
        }
      })
      .filter((x): x is DecodedDealReleasedLog => x !== null);
  }

  /** Fetch SalyEscrow DealRefunded logs in a block range. */
  async getDealRefundedLogs(input: {
    fromBlock: bigint;
    toBlock: bigint;
    escrowAddress: Address;
  }): Promise<DecodedDealRefundedLog[]> {
    const event = getAbiItem({ abi: SALY_ESCROW_ABI, name: 'DealRefunded' });
    const rawLogs = await this.safeRpc(() =>
      this.client.getLogs({
        address: input.escrowAddress,
        event,
        fromBlock: input.fromBlock,
        toBlock: input.toBlock,
      }),
    );

    return rawLogs
      .map((log: Log) => {
        try {
          const decoded = decodeEventLog({ abi: SALY_ESCROW_ABI, data: log.data, topics: log.topics });
          if (decoded.eventName !== 'DealRefunded') return null;
          const args = decoded.args as { dealId: Hex; payer: Address; amount: bigint };
          return {
            dealId: args.dealId,
            payer: args.payer,
            amountMinor: args.amount,
            txHash: log.transactionHash!,
            blockNumber: log.blockNumber!,
            blockHash: log.blockHash!,
            logIndex: log.logIndex!,
          } satisfies DecodedDealRefundedLog;
        } catch (err) {
          this.logger?.warn?.(`failed to decode DealRefunded log: ${(err as Error).message}`);
          return null;
        }
      })
      .filter((x): x is DecodedDealRefundedLog => x !== null);
  }

  /** Returns the configured asset map for the active network. */
  getAssets(): Record<BaseAsset, ReturnType<typeof getAsset>> {
    return BASE_ASSETS[this.network] as Record<BaseAsset, ReturnType<typeof getAsset>>;
  }

  /**
   * Defensive parse — used in tests and to sanity-check a signed tx before
   * broadcasting it (e.g. confirm chainId and to-address haven't been mangled
   * between the adapter and the signer).
   */
  parse(signedTx: Hex) {
    return parseTransaction(signedTx);
  }

  // ───────────────────────────── Helpers ─────────────────────────────

  private async safeRpc<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      throw ExternalError('chain.base.rpc_error', `Base RPC error: ${(err as Error).message}`, { cause: err });
    }
  }
}
