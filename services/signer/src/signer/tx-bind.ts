import { parseTransaction, type Hex } from 'viem';
import { decode } from 'xrpl';
import { AuthorizationError, ValidationError } from '@salychain/errors';
import type { PolicyContext } from './policy.engine.js';

/** ERC-20 `transfer(address,uint256)` selector. */
const ERC20_TRANSFER_SELECTOR = '0xa9059cbb';

/**
 * Bind a policy context to the actual unsigned transaction so a caller cannot
 * pass an allowlisted micro-payment context while signing a different drain.
 *
 * Supported shapes:
 *  - Native value transfer (`data` empty/`0x`, `value` + `to` set) — strict
 *  - ERC-20 `transfer(to, amount)` — strict
 *  - Other calldata (escrow/DEX/mint) — require the destination address (and
 *    amount when encodable) to appear in the calldata, so the context cannot
 *    describe a different beneficiary than the bytes being signed
 */
export function assertUnsignedTxMatchesPolicy(
  chain: string,
  unsignedTx: string,
  context: PolicyContext,
): void {
  if (chain === 'XRPL') {
    assertXrplPaymentMatches(unsignedTx, context);
    return;
  }

  if (!unsignedTx.startsWith('0x')) {
    throw ValidationError('signer.tx_bind.bad_format', 'Unsigned tx must be 0x-prefixed hex');
  }

  let parsed;
  try {
    parsed = parseTransaction(unsignedTx as Hex);
  } catch (err) {
    throw ValidationError('signer.tx_bind.parse_failed', `Unable to parse unsigned tx: ${(err as Error).message}`);
  }

  const expectedDest = context.destinationAddress.toLowerCase();
  const expectedAmount = context.amountMinor;
  const data = (parsed.data ?? '0x').toLowerCase();
  const value = parsed.value ?? 0n;
  const to = parsed.to?.toLowerCase();

  // Native transfer.
  if ((!data || data === '0x') && value > 0n) {
    if (!to) {
      throw AuthorizationError('signer.tx_bind.missing_to', 'Native transfer missing destination');
    }
    if (to !== expectedDest) {
      throw AuthorizationError(
        'signer.tx_bind.destination_mismatch',
        `Unsigned tx destination ${to} does not match policy context ${expectedDest}`,
      );
    }
    if (value !== expectedAmount) {
      throw AuthorizationError(
        'signer.tx_bind.amount_mismatch',
        `Unsigned tx value ${value} does not match policy context amount ${expectedAmount}`,
      );
    }
    return;
  }

  // ERC-20 transfer(address,uint256) — 4 byte selector + 32 addr + 32 amount.
  if (data.startsWith(ERC20_TRANSFER_SELECTOR) && data.length === 2 + 8 + 64 + 64) {
    const recipient = `0x${data.slice(34, 74)}`;
    const amount = BigInt(`0x${data.slice(74, 138)}`);
    if (recipient !== expectedDest) {
      throw AuthorizationError(
        'signer.tx_bind.destination_mismatch',
        `ERC-20 transfer recipient ${recipient} does not match policy context ${expectedDest}`,
      );
    }
    if (amount !== expectedAmount) {
      throw AuthorizationError(
        'signer.tx_bind.amount_mismatch',
        `ERC-20 transfer amount ${amount} does not match policy context amount ${expectedAmount}`,
      );
    }
    return;
  }

  // Contract call (escrow fund, DEX, SalySD mint, …): require the claimed
  // destination address bytes appear in calldata so the context cannot name
  // a different beneficiary than the one encoded in the signed payload.
  const destBare = expectedDest.startsWith('0x') ? expectedDest.slice(2) : expectedDest;
  if (!data.includes(destBare)) {
    throw AuthorizationError(
      'signer.tx_bind.destination_mismatch',
      `Policy context destination ${expectedDest} does not appear in unsigned calldata`,
    );
  }
  const amountWord = expectedAmount.toString(16).padStart(64, '0');
  if (!data.includes(amountWord)) {
    throw AuthorizationError(
      'signer.tx_bind.amount_mismatch',
      `Policy context amount ${expectedAmount} does not appear in unsigned calldata`,
    );
  }
}

function parseXrplUnsigned(unsignedTx: string): {
  TransactionType?: string;
  Destination?: string;
  Amount?: string | { value: string };
} {
  const trimmed = unsignedTx.trim();
  if (trimmed.startsWith('{')) {
    return JSON.parse(trimmed) as ReturnType<typeof parseXrplUnsigned>;
  }
  const hex = trimmed.startsWith('0x') ? trimmed.slice(2) : trimmed;
  if (!hex || /[^0-9A-Fa-f]/.test(hex)) {
    throw ValidationError(
      'signer.tx_bind.xrpl_parse_failed',
      'XRPL unsigned tx must be JSON or hex-encoded binary blob',
    );
  }
  try {
    return decode(hex) as ReturnType<typeof parseXrplUnsigned>;
  } catch (err) {
    throw ValidationError(
      'signer.tx_bind.xrpl_parse_failed',
      `Could not decode XRPL blob: ${(err as Error).message}`,
    );
  }
}

function assertXrplPaymentMatches(unsignedTx: string, context: PolicyContext): void {
  const payment = parseXrplUnsigned(unsignedTx);
  if (payment.TransactionType !== 'Payment') {
    throw AuthorizationError(
      'signer.tx_bind.xrpl_unsupported',
      `Unsupported XRPL transaction type ${payment.TransactionType ?? 'unknown'}`,
    );
  }
  const dest = payment.Destination?.toLowerCase();
  if (!dest || dest !== context.destinationAddress.toLowerCase()) {
    throw AuthorizationError(
      'signer.tx_bind.destination_mismatch',
      `XRPL Destination ${dest ?? 'missing'} does not match policy context ${context.destinationAddress}`,
    );
  }
  const raw =
    typeof payment.Amount === 'string'
      ? payment.Amount
      : payment.Amount && typeof payment.Amount === 'object'
        ? payment.Amount.value
        : undefined;
  if (raw === undefined) {
    throw AuthorizationError('signer.tx_bind.xrpl_missing_amount', 'XRPL Payment missing Amount');
  }
  try {
    if (BigInt(raw) !== context.amountMinor) {
      throw AuthorizationError(
        'signer.tx_bind.amount_mismatch',
        `XRPL Amount ${raw} does not match policy context amount ${context.amountMinor}`,
      );
    }
  } catch (err) {
    if ((err as { code?: string }).code === 'signer.tx_bind.amount_mismatch') throw err;
    // IOU Amount.value may be a decimal string — compare as text.
    if (raw.replace(/\.?0+$/, '') !== context.amountMinor.toString()) {
      throw AuthorizationError(
        'signer.tx_bind.amount_mismatch',
        `XRPL Amount ${raw} does not match policy context amount ${context.amountMinor}`,
      );
    }
  }
}
