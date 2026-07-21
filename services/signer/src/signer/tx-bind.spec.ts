import { describe, expect, it } from 'vitest';
import { serializeTransaction, type Hex } from 'viem';
import { isSalyChainError } from '@salychain/errors';
import { assertUnsignedTxMatchesPolicy } from './tx-bind.js';
import type { PolicyContext } from './policy.engine.js';

const DEST = '0x1234567890abcdef1234567890abcdef12345678';
const AMOUNT = 1_000_000n;

const ctx: PolicyContext = {
  destinationChain: 'BASE',
  destinationAddress: DEST,
  amountMinor: AMOUNT,
  assetSymbol: 'USDC',
};

function throws(code: string) {
  return (fn: () => unknown) => {
    try {
      fn();
      return false;
    } catch (err) {
      return isSalyChainError(err) && err.code === code;
    }
  };
}

describe('assertUnsignedTxMatchesPolicy', () => {
  it('allows a native transfer matching destination + amount', () => {
    const unsigned = serializeTransaction({
      chainId: 8453,
      type: 'eip1559',
      to: DEST as Hex,
      value: AMOUNT,
      data: '0x',
      nonce: 0,
      maxFeePerGas: 1n,
      maxPriorityFeePerGas: 1n,
      gas: 21_000n,
    });
    expect(() => assertUnsignedTxMatchesPolicy('BASE', unsigned, ctx)).not.toThrow();
  });

  it('rejects a native transfer to a different address', () => {
    const unsigned = serializeTransaction({
      chainId: 8453,
      type: 'eip1559',
      to: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' as Hex,
      value: AMOUNT,
      data: '0x',
      nonce: 0,
      maxFeePerGas: 1n,
      maxPriorityFeePerGas: 1n,
      gas: 21_000n,
    });
    expect(() => assertUnsignedTxMatchesPolicy('BASE', unsigned, ctx)).toSatisfy(
      throws('signer.tx_bind.destination_mismatch'),
    );
  });

  it('allows ERC-20 transfer(to, amount) matching context', () => {
    const selector = 'a9059cbb';
    const addr = DEST.slice(2).padStart(64, '0');
    const amount = AMOUNT.toString(16).padStart(64, '0');
    const data = (`0x${selector}${addr}${amount}`) as Hex;
    const unsigned = serializeTransaction({
      chainId: 8453,
      type: 'eip1559',
      to: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913' as Hex,
      value: 0n,
      data,
      nonce: 0,
      maxFeePerGas: 1n,
      maxPriorityFeePerGas: 1n,
      gas: 60_000n,
    });
    expect(() => assertUnsignedTxMatchesPolicy('BASE', unsigned, ctx)).not.toThrow();
  });

  it('rejects contract calldata that omits the claimed destination', () => {
    const data = ('0xdeadbeef' + 'bb'.repeat(32) + AMOUNT.toString(16).padStart(64, '0')) as Hex;
    const unsigned = serializeTransaction({
      chainId: 8453,
      type: 'eip1559',
      to: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913' as Hex,
      value: 0n,
      data,
      nonce: 0,
      maxFeePerGas: 1n,
      maxPriorityFeePerGas: 1n,
      gas: 100_000n,
    });
    expect(() => assertUnsignedTxMatchesPolicy('BASE', unsigned, ctx)).toSatisfy(
      throws('signer.tx_bind.destination_mismatch'),
    );
  });

  it('binds XRPL Payment destination + amount (JSON)', () => {
    const payment = JSON.stringify({
      TransactionType: 'Payment',
      Destination: DEST,
      Amount: AMOUNT.toString(),
    });
    expect(() => assertUnsignedTxMatchesPolicy('XRPL', payment, ctx)).not.toThrow();
  });

  it('rejects XRPL Payment with wrong amount', () => {
    const payment = JSON.stringify({
      TransactionType: 'Payment',
      Destination: DEST,
      Amount: '999',
    });
    expect(() => assertUnsignedTxMatchesPolicy('XRPL', payment, ctx)).toSatisfy(
      throws('signer.tx_bind.amount_mismatch'),
    );
  });

  it('rejects non-JSON non-hex XRPL payload', () => {
    expect(() => assertUnsignedTxMatchesPolicy('XRPL', 'not-json-or-hex', ctx)).toSatisfy(
      throws('signer.tx_bind.xrpl_parse_failed'),
    );
  });
});
