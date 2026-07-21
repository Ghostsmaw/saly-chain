import {
  Client,
  decode,
  encode,
  encodeForSigning,
  isValidClassicAddress,
  xrpToDrops,
  type Payment,
  type SubmitResponse,
  type TrustSet,
  type TxResponse,
} from 'xrpl';
import { deriveAddress, generateSeed, deriveKeypair } from 'ripple-keypairs';
import { ExternalError, ValidationError } from '@salychain/errors';
import type { Logger } from '@salychain/logger';
import { buildIouPayment, buildTrustSet, type IssuedCurrency } from './iou.js';
import { XRPL_NETWORKS, type XrplNetwork } from './networks.js';

/**
 * XRPL chain adapter.
 *
 * Follows the same build/sign/broadcast split as the Base adapter:
 *
 *   1. `prepareTransfer`  → builds + autofills a Payment transaction
 *   2. caller signs       → SignerService (ed25519, key never leaves the signer)
 *   3. `broadcast`        → submits the signed tx blob to rippled
 *
 * Native XRP and issued-currency (IOU) transfers share the same prepare → sign →
 * broadcast flow. IOU payouts require a wallet policy trust-line allowlist and an
 * established TrustSet on the custodial account.
 */

export interface XrplAdapterOptions {
  network: XrplNetwork;
  wsUrl?: string;
  logger?: Logger;
}

/** Flat fields used by payment decoding after ledger expand. */
export interface NormalizedExpandedLedgerTx {
  TransactionType?: string;
  Account?: string;
  Destination?: string;
  Amount?: unknown;
  DestinationTag?: number;
  Fee?: string;
  hash?: string;
  metaResult?: string;
}

/**
 * Normalize expanded ledger txs across HTTP JSON-RPC (flat Payment + metaData)
 * and newer rippled / xrpl.js WS responses ({ hash, meta, tx_json }).
 */
export function normalizeExpandedLedgerTx(txEntry: unknown): NormalizedExpandedLedgerTx | null {
  if (!txEntry || typeof txEntry !== 'object') return null;
  const raw = txEntry as Record<string, unknown>;
  const txJson =
    raw.tx_json && typeof raw.tx_json === 'object'
      ? (raw.tx_json as Record<string, unknown>)
      : raw;
  const metaCandidate =
    raw.meta ??
    raw.metaData ??
    txJson.meta ??
    txJson.metaData;
  const meta =
    metaCandidate && typeof metaCandidate === 'object'
      ? (metaCandidate as { TransactionResult?: string })
      : undefined;
  return {
    TransactionType: txJson.TransactionType as string | undefined,
    Account: txJson.Account as string | undefined,
    Destination: txJson.Destination as string | undefined,
    // Newer rippled/WS payloads often omit Amount and only set DeliverMax.
    Amount: (txJson.Amount ?? txJson.DeliverMax) as unknown,
    DestinationTag: txJson.DestinationTag as number | undefined,
    Fee: txJson.Fee as string | undefined,
    hash: (raw.hash ?? txJson.hash) as string | undefined,
    metaResult: meta?.TransactionResult,
  };
}

export interface PreparedXrplPayment {
  /** Unsigned, autofilled Payment transaction in canonical XRPL JSON. */
  transaction: Payment;
  /** Hex-encoded blob the signer signs (StreamLine: `encodeForSigning(transaction)`). */
  signingPayload: string;
  /** Hex-encoded fully-serialized unsigned transaction (for reference + idempotency). */
  unsignedBlob: string;
  /** Fee in drops the network suggested. */
  feeDrops: string;
  /** Last ledger sequence we're allowed to be included in. */
  lastLedgerSequence: number;
  /** Account sequence number used. */
  sequence: number;
}

export interface XrplKeypair {
  publicKey: string;
  privateKey: string;
  address: string;
  seed: string;
}

export interface DecodedXrplPayment {
  txHash: string;
  ledgerIndex: number;
  closeTime: number;
  from: string;
  to: string;
  /** Native XRP amount in drops. Omitted for IOU payments. */
  amountDrops?: string;
  /** Issued-currency amount when `Amount` is an object. */
  iou?: { currency: string; issuer: string; value: string };
  destinationTag?: number;
  fee: string;
  result: 'tesSUCCESS' | string;
}

export interface AutofilledXrplTrustSet {
  transaction: TrustSet;
  signingPayload: string;
  unsignedBlob: string;
  feeDrops: string;
  lastLedgerSequence: number;
  sequence: number;
}

export interface AutofilledXrplIouPayment {
  transaction: Payment;
  signingPayload: string;
  unsignedBlob: string;
  feeDrops: string;
  lastLedgerSequence: number;
  sequence: number;
}

export interface XrplTrustLine {
  currency: string;
  issuer: string;
  limit: string;
  balance: string;
}

export class XrplChainAdapter {
  readonly network: XrplNetwork;
  private readonly wsUrl: string;
  private readonly logger?: Logger;
  private client?: Client;

  constructor(opts: XrplAdapterOptions) {
    this.network = opts.network;
    this.wsUrl = opts.wsUrl ?? XRPL_NETWORKS[opts.network].wsUrl;
    this.logger = opts.logger;
  }

  // ───────────────────────── Connection lifecycle ─────────────────────────

  async connect(): Promise<Client> {
    if (this.client?.isConnected()) return this.client;
    // `timeout` is per-request; `connectionTimeout` covers the initial WS handshake
    // (rippled testnet often exceeds the library default of 5s).
    this.client = new Client(this.wsUrl, { timeout: 15_000, connectionTimeout: 30_000 });
    try {
      await this.client.connect();
      this.logger?.debug?.(`xrpl connected to ${this.wsUrl}`);
      return this.client;
    } catch (err) {
      throw ExternalError('chain.xrpl.connect_failed', `XRPL connection failed: ${(err as Error).message}`, {
        cause: err,
      });
    }
  }

  async disconnect(): Promise<void> {
    if (this.client?.isConnected()) await this.client.disconnect();
    this.client = undefined;
  }

  // ─────────────────────────────── Keys ───────────────────────────────

  /**
   * Generate a fresh XRPL keypair using ed25519 (the XRPL preferred algorithm
   * for new accounts since 2017). Returns seed + keys + classic address.
   *
   * The seed is the source of truth; the signer service wraps and stores it.
   * The private key is derived from the seed at signing time.
   */
  generateKey(): XrplKeypair {
    const seed = generateSeed({ algorithm: 'ed25519' });
    const keys = deriveKeypair(seed);
    const address = deriveAddress(keys.publicKey);
    return {
      publicKey: keys.publicKey,
      privateKey: keys.privateKey,
      address,
      seed,
    };
  }

  /** Re-derive keys + address from a seed. Used by the signer to unwrap. */
  deriveFromSeed(seed: string): XrplKeypair {
    const keys = deriveKeypair(seed);
    const address = deriveAddress(keys.publicKey);
    return { ...keys, address, seed };
  }

  // ─────────────────────────── Build / submit ───────────────────────────

  async prepareTransfer(input: {
    from: string;
    to: string;
    amountDrops: bigint;
    destinationTag?: number;
    memo?: string;
  }): Promise<PreparedXrplPayment> {
    if (!isValidClassicAddress(input.from))
      throw ValidationError('chain.xrpl.bad_from', `Invalid XRPL source address ${input.from}`);
    if (!isValidClassicAddress(input.to))
      throw ValidationError('chain.xrpl.bad_to', `Invalid XRPL destination address ${input.to}`);
    if (input.amountDrops <= 0n)
      throw ValidationError('chain.xrpl.bad_amount', 'amountDrops must be positive');

    const client = await this.connect();
    const draft: Payment = {
      TransactionType: 'Payment',
      Account: input.from,
      Destination: input.to,
      Amount: input.amountDrops.toString(),
      DestinationTag: input.destinationTag,
    };
    if (input.memo) {
      draft.Memos = [
        {
          Memo: {
            MemoData: Buffer.from(input.memo, 'utf-8').toString('hex').toUpperCase(),
            MemoFormat: Buffer.from('text/plain', 'utf-8').toString('hex').toUpperCase(),
          },
        },
      ];
    }

    let autofilled: Payment;
    try {
      autofilled = await client.autofill(draft);
    } catch (err) {
      throw ExternalError('chain.xrpl.autofill_failed', `Autofill failed: ${(err as Error).message}`, {
        cause: err,
      });
    }

    const signingPayload = encodeForSigning(autofilled);
    const unsignedBlob = encode(autofilled);

    return {
      transaction: autofilled,
      signingPayload,
      unsignedBlob,
      feeDrops: String(autofilled.Fee),
      lastLedgerSequence: Number(autofilled.LastLedgerSequence),
      sequence: Number(autofilled.Sequence),
    };
  }

  async prepareTrustSet(input: {
    account: string;
    currency: string;
    issuer: string;
    limit: string;
  }): Promise<AutofilledXrplTrustSet> {
    const built = buildTrustSet(input);
    const autofilled = await this.autofill(built.transaction);
    return this.toPreparedTrustSet(autofilled);
  }

  async prepareIouPayment(input: {
    from: string;
    to: string;
    currency: IssuedCurrency;
    value: string;
    destinationTag?: number;
    memo?: string;
  }): Promise<AutofilledXrplIouPayment> {
    const built = buildIouPayment(input);
    const autofilled = await this.autofill(built.transaction);
    return this.toPreparedIouPayment(autofilled);
  }

  async getAccountTrustLines(address: string): Promise<XrplTrustLine[]> {
    const client = await this.connect();
    try {
      const res = await client.request({
        command: 'account_lines',
        account: address,
        ledger_index: 'validated',
      });
      const lines = (res.result.lines ?? []) as Array<{
        currency: string;
        account: string;
        limit: string;
        balance: string;
      }>;
      return lines.map((line) => ({
        currency: line.currency,
        issuer: line.account,
        limit: line.limit,
        balance: line.balance,
      }));
    } catch (err) {
      const message = (err as Error).message;
      if (message.includes('actNotFound')) return [];
      throw ExternalError('chain.xrpl.account_lines_failed', `account_lines failed: ${message}`, { cause: err });
    }
  }

  async hasTrustLine(address: string, currency: string, issuer: string): Promise<boolean> {
    const lines = await this.getAccountTrustLines(address);
    return lines.some(
      (line) =>
        line.currency.toUpperCase() === currency.toUpperCase() &&
        line.issuer === issuer &&
        Number(line.limit) > 0,
    );
  }

  /**
   * Broadcast a signed transaction. The signer returns a full transaction blob
   * with the signature embedded; we just hand it to rippled and await acceptance.
   *
   * `result.engine_result` of `tesSUCCESS` means accepted by the network; we
   * still need to wait for the ledger to close before treating as settled
   * (that's the chain-listener-xrpl's job).
   */
  async broadcast(signedTxBlob: string): Promise<{ txHash: string; engineResult: string }> {
    const client = await this.connect();
    try {
      const res: SubmitResponse = await client.submit(signedTxBlob);
      const engineResult = res.result.engine_result;
      const txHash = (res.result.tx_json as { hash?: string }).hash ?? '';
      this.logger?.info?.(`xrpl submitted ${txHash} (${engineResult})`);
      if (!engineResult.startsWith('tes') && !engineResult.startsWith('ter')) {
        throw ExternalError(
          'chain.xrpl.submit_rejected',
          `XRPL submit returned ${engineResult}: ${res.result.engine_result_message}`,
        );
      }
      return { txHash, engineResult };
    } catch (err) {
      if ((err as { code?: string }).code?.startsWith('chain.xrpl')) throw err;
      throw ExternalError('chain.xrpl.broadcast_failed', `XRPL broadcast failed: ${(err as Error).message}`, {
        cause: err,
      });
    }
  }

  /**
   * Fetch a transaction by hash. The listener uses this to confirm validation
   * + final result. Returns null if the ledger hasn't included the tx yet.
   */
  async getTransaction(txHash: string): Promise<TxResponse | null> {
    const client = await this.connect();
    try {
      const tx = await client.request({ command: 'tx', transaction: txHash });
      return tx;
    } catch (err) {
      const message = (err as Error).message;
      if (message.includes('txnNotFound')) return null;
      throw ExternalError('chain.xrpl.tx_lookup_failed', `XRPL tx lookup failed: ${message}`, { cause: err });
    }
  }

  // ──────────────────────────── Reads ────────────────────────────

  async getLedgerIndex(): Promise<number> {
    const client = await this.connect();
    const res = await client.request({ command: 'ledger', ledger_index: 'validated' });
    return Number((res.result as { ledger_index?: number }).ledger_index ?? 0);
  }

  async getAccountBalance(address: string): Promise<{ balanceDrops: string; sequence: number }> {
    const client = await this.connect();
    try {
      const res = await client.request({
        command: 'account_info',
        account: address,
        ledger_index: 'validated',
      });
      const account = res.result.account_data;
      return { balanceDrops: account.Balance, sequence: account.Sequence };
    } catch (err) {
      const message = (err as Error).message;
      if (message.includes('actNotFound')) return { balanceDrops: '0', sequence: 0 };
      throw ExternalError('chain.xrpl.account_info_failed', `account_info failed: ${message}`, { cause: err });
    }
  }

  /**
   * Decode Payment transactions in a ledger range that touch any of the
   * supplied addresses. Used by the chain listener.
   *
   * Note: XRPL's WebSocket subscription model is more efficient at scale, but
   * range-scan is fine for S2 volumes and matches the Base listener's API.
   */
  async getPayments(input: {
    fromLedger: number;
    toLedger: number;
    addresses: readonly string[];
  }): Promise<DecodedXrplPayment[]> {
    if (input.addresses.length === 0) return [];
    const client = await this.connect();
    const results: DecodedXrplPayment[] = [];
    const addressSet = new Set(input.addresses);

    for (let ledgerIndex = input.fromLedger; ledgerIndex <= input.toLedger; ledgerIndex++) {
      try {
        const res = await client.request({
          command: 'ledger',
          ledger_index: ledgerIndex,
          transactions: true,
          expand: true,
        });
        const ledger = res.result.ledger as {
          close_time?: number;
          transactions?: Array<unknown>;
        };
        const closeTime = Number(ledger.close_time ?? 0);
        for (const txEntry of ledger.transactions ?? []) {
          // HTTP JSON-RPC returns flat Payment fields + metaData; newer rippled /
          // xrpl.js WS expand returns { hash, meta, tx_json }.
          const normalized = normalizeExpandedLedgerTx(txEntry);
          if (!normalized || normalized.TransactionType !== 'Payment') continue;
          const from = String(normalized.Account ?? '');
          const to = String(normalized.Destination ?? '');
          if (!addressSet.has(from) && !addressSet.has(to)) continue;
          const amount = normalized.Amount;
          const result = normalized.metaResult ?? 'unknown';
          if (result !== 'tesSUCCESS') continue;

          if (typeof amount === 'string') {
            results.push({
              txHash: String(normalized.hash ?? ''),
              ledgerIndex,
              closeTime,
              from,
              to,
              amountDrops: amount,
              destinationTag: normalized.DestinationTag,
              fee: String(normalized.Fee ?? '0'),
              result,
            });
            continue;
          }

          if (amount && typeof amount === 'object') {
            const iou = amount as { currency?: string; issuer?: string; value?: string };
            if (!iou.currency || !iou.issuer || !iou.value) continue;
            results.push({
              txHash: String(normalized.hash ?? ''),
              ledgerIndex,
              closeTime,
              from,
              to,
              iou: { currency: iou.currency, issuer: iou.issuer, value: iou.value },
              destinationTag: normalized.DestinationTag,
              fee: String(normalized.Fee ?? '0'),
              result,
            });
          }
        }
      } catch (err) {
        this.logger?.warn?.(`xrpl ledger ${ledgerIndex} fetch failed: ${(err as Error).message}`);
      }
    }
    return results;
  }

  private async autofill<T extends Payment | TrustSet>(
    draft: T,
  ): Promise<T & { Fee: string; Sequence: number; LastLedgerSequence: number }> {
    const client = await this.connect();
    try {
      return (await client.autofill(draft)) as T & {
        Fee: string;
        Sequence: number;
        LastLedgerSequence: number;
      };
    } catch (err) {
      throw ExternalError('chain.xrpl.autofill_failed', `Autofill failed: ${(err as Error).message}`, {
        cause: err,
      });
    }
  }

  private toPreparedTrustSet(autofilled: TrustSet & { Fee: string; Sequence: number; LastLedgerSequence: number }): AutofilledXrplTrustSet {
    return {
      transaction: autofilled,
      signingPayload: encodeForSigning(autofilled),
      unsignedBlob: encode(autofilled),
      feeDrops: String(autofilled.Fee),
      lastLedgerSequence: Number(autofilled.LastLedgerSequence),
      sequence: Number(autofilled.Sequence),
    };
  }

  private toPreparedIouPayment(autofilled: Payment & { Fee: string; Sequence: number; LastLedgerSequence: number }): AutofilledXrplIouPayment {
    return {
      transaction: autofilled,
      signingPayload: encodeForSigning(autofilled),
      unsignedBlob: encode(autofilled),
      feeDrops: String(autofilled.Fee),
      lastLedgerSequence: Number(autofilled.LastLedgerSequence),
      sequence: Number(autofilled.Sequence),
    };
  }

  // Helpers re-exported for downstream consumers
  static xrpToDrops(xrp: string | number): string { return xrpToDrops(String(xrp)); }
  static isValidAddress(address: string): boolean { return isValidClassicAddress(address); }
  static decodeBlob(blob: string): unknown { return decode(blob); }
}
