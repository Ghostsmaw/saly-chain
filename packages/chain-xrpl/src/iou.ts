import {
  encode,
  encodeForSigning,
  isValidClassicAddress,
  type Payment,
  type TrustSet,
} from 'xrpl';
import { ExternalError, ValidationError } from '@salychain/errors';

/**
 * XRPL "issued currency" (IOU) helpers.
 *
 * The XRPL has two payment surfaces:
 *
 *   1. Native XRP transfers — the only on-ledger asset; amount is a string of
 *      "drops" (1 XRP = 1,000,000 drops). Handled in `adapter.ts`.
 *
 *   2. Issued currency (IOU) transfers — anyone can issue a token by being
 *      the named `issuer` in a `Payment` with `Amount: { currency, value, issuer }`.
 *      The recipient must hold a `TrustSet` line for that (currency, issuer) pair
 *      with a high-enough limit, OR the sender must hold matching balance.
 *
 * This module produces unsigned `TrustSet` and IOU `Payment` transactions
 * ready to hand to the signer. We deliberately split the build step from the
 * client to keep this file pure-CPU (no network IO) and easy to test.
 */

export interface IssuedCurrency {
  /** Three-letter code (`USD`, `EUR`) or a 40-char hex blob for arbitrary names. */
  currency: string;
  /** XRPL classic address of the issuing account. */
  issuer: string;
}

export interface PreparedXrplTrustSet {
  transaction: TrustSet;
  signingPayload: string;
  unsignedBlob: string;
}

export interface PreparedXrplIouPayment {
  transaction: Payment;
  signingPayload: string;
  unsignedBlob: string;
}

/** Decimal places for common XRPL IOU assets (minor units → IOU value). */
export const XRPL_IOU_DECIMALS: Record<string, number> = {
  USD: 2,
  EUR: 2,
  GBP: 2,
};

export function isXrplNativeAsset(asset: string): boolean {
  return asset.toUpperCase() === 'XRP';
}

export function isXrplIouAsset(asset: string): boolean {
  const code = asset.toUpperCase();
  return code !== 'XRP' && /^[A-Z0-9]{3}$/.test(code);
}

/** Canonical key for trust-line policy entries: `USD:rhub8VRN…` */
export function trustLineKey(currency: string, issuer: string): string {
  return `${currency.toUpperCase()}:${issuer}`;
}

export function parseTrustLineKey(key: string): { currency: string; issuer: string } | null {
  const idx = key.indexOf(':');
  if (idx <= 0) return null;
  const currency = key.slice(0, idx).toUpperCase();
  const issuer = key.slice(idx + 1);
  if (!/^[A-Z0-9]{3}$|^[0-9A-Fa-f]{40}$/.test(currency)) return null;
  if (!isValidClassicAddress(issuer)) return null;
  return { currency, issuer };
}

/** Returns true if issuer is allowed (`*` wildcard or exact `CURRENCY:issuer`). */
export function isTrustedIssuer(allowlist: readonly string[], currency: string, issuer: string): boolean {
  if (allowlist.includes('*')) return true;
  const key = trustLineKey(currency, issuer);
  return allowlist.some((entry) => entry.toUpperCase() === key.toUpperCase());
}

/** Convert ledger minor units (e.g. USD cents) to XRPL IOU decimal string. */
export function iouValueFromMinor(amountMinor: bigint, decimals = 2): string {
  if (amountMinor < 0n) {
    throw ValidationError('chain.xrpl.iou.bad_amount', 'amountMinor must be non-negative');
  }
  const base = 10n ** BigInt(decimals);
  const whole = amountMinor / base;
  const frac = amountMinor % base;
  const fracStr = frac.toString().padStart(decimals, '0').replace(/0+$/, '');
  return fracStr ? `${whole}.${fracStr}` : whole.toString();
}

/**
 * Build a `TrustSet` transaction. The caller (a SalyChain custodial wallet)
 * will become able to hold up to `limit` units of `currency` from `issuer`.
 *
 * `limit` is a decimal string (e.g. "1000000") — XRPL accepts up to 16 digits
 * of precision. Pass "0" to remove a trust line (only allowed if balance is 0).
 *
 * This builder does NOT autofill `Fee`, `Sequence`, `LastLedgerSequence` —
 * those are network-dependent and are added by `XrplChainAdapter.prepareTrustSet`.
 */
export function buildTrustSet(input: {
  account: string;
  currency: string;
  issuer: string;
  limit: string;
}): PreparedXrplTrustSet {
  if (!isValidClassicAddress(input.account)) {
    throw ValidationError('chain.xrpl.iou.bad_account', `Invalid XRPL account: ${input.account}`);
  }
  if (!isValidClassicAddress(input.issuer)) {
    throw ValidationError('chain.xrpl.iou.bad_issuer', `Invalid issuer address: ${input.issuer}`);
  }
  if (!/^[A-Za-z0-9]{3}$|^[0-9A-Fa-f]{40}$/.test(input.currency)) {
    throw ValidationError(
      'chain.xrpl.iou.bad_currency',
      `Currency must be a 3-char code or 40-char hex blob: ${input.currency}`,
    );
  }
  if (!/^[0-9]+(\.[0-9]+)?$/.test(input.limit)) {
    throw ValidationError('chain.xrpl.iou.bad_limit', `Limit must be a decimal string: ${input.limit}`);
  }
  const tx: TrustSet = {
    TransactionType: 'TrustSet',
    Account: input.account,
    LimitAmount: {
      currency: input.currency,
      issuer: input.issuer,
      value: input.limit,
    },
  };
  return {
    transaction: tx,
    signingPayload: safeEncodeForSigning(tx),
    unsignedBlob: safeEncode(tx),
  };
}

/**
 * Build a `Payment` transaction that moves an IOU between two accounts.
 *
 * Mechanics:
 *   - If `from === issuer` then we are *issuing* the IOU into circulation.
 *   - If `to   === issuer` then we are *redeeming* the IOU back to the issuer.
 *   - Otherwise it's a peer-to-peer transfer that requires either matching
 *     trust lines or a rippling path; in the SalyChain case we always operate
 *     through custodial wallets that hold the trust line directly.
 */
export function buildIouPayment(input: {
  from: string;
  to: string;
  currency: IssuedCurrency;
  value: string;
  destinationTag?: number;
  memo?: string;
}): PreparedXrplIouPayment {
  if (!isValidClassicAddress(input.from)) {
    throw ValidationError('chain.xrpl.iou.bad_from', `Invalid XRPL source address ${input.from}`);
  }
  if (!isValidClassicAddress(input.to)) {
    throw ValidationError('chain.xrpl.iou.bad_to', `Invalid XRPL destination address ${input.to}`);
  }
  if (!isValidClassicAddress(input.currency.issuer)) {
    throw ValidationError('chain.xrpl.iou.bad_issuer', `Invalid issuer address ${input.currency.issuer}`);
  }
  if (!/^[0-9]+(\.[0-9]+)?$/.test(input.value)) {
    throw ValidationError('chain.xrpl.iou.bad_value', `Value must be a decimal string: ${input.value}`);
  }
  const tx: Payment = {
    TransactionType: 'Payment',
    Account: input.from,
    Destination: input.to,
    Amount: {
      currency: input.currency.currency,
      issuer: input.currency.issuer,
      value: input.value,
    },
  };
  if (input.destinationTag !== undefined) tx.DestinationTag = input.destinationTag;
  if (input.memo) {
    tx.Memos = [
      {
        Memo: {
          MemoData: Buffer.from(input.memo, 'utf-8').toString('hex').toUpperCase(),
          MemoFormat: Buffer.from('text/plain', 'utf-8').toString('hex').toUpperCase(),
        },
      },
    ];
  }
  return {
    transaction: tx,
    signingPayload: safeEncodeForSigning(tx),
    unsignedBlob: safeEncode(tx),
  };
}

function safeEncode(tx: unknown): string {
  try { return encode(tx as never); }
  catch (err) {
    throw ExternalError('chain.xrpl.iou.encode_failed', `xrpl encode failed: ${(err as Error).message}`, { cause: err });
  }
}

function safeEncodeForSigning(tx: unknown): string {
  try { return encodeForSigning(tx as never); }
  catch (err) {
    throw ExternalError('chain.xrpl.iou.encode_failed', `xrpl encodeForSigning failed: ${(err as Error).message}`, { cause: err });
  }
}
