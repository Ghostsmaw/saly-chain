import { randomBytes } from 'node:crypto';
import {
  keccak256,
  parseTransaction,
  serializeTransaction,
  type Hex,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { ExternalError, ValidationError } from '@salychain/errors';
import type { ChainSigner } from './chain.signer.js';

/**
 * EVM (Base / Ethereum / Polygon) signer.
 *
 * Uses viem's `privateKeyToAccount` for signing — a thin wrapper over the
 * audited `@noble/curves` secp256k1 implementation.
 *
 *  - Generates 32-byte secp256k1 keys via Node's CSPRNG.
 *  - Re-serializes the unsigned tx to defend against the signer being asked
 *    to sign something different from what the adapter prepared (the wallet
 *    service later asserts the parsed tx matches its expectation).
 */
export class EvmChainSigner implements ChainSigner {
  readonly chain: ChainSigner['chain'];

  constructor(chain: 'BASE' | 'ETHEREUM' | 'POLYGON' | 'SALY_L3' = 'BASE') {
    this.chain = chain;
  }

  async generateKey(): Promise<{ privateKey: Buffer; publicAddress: string }> {
    // Reject the negligible probability of the key being zero or above the curve order.
    // 32 random bytes is overwhelmingly within (0, n); we still validate via viem.
    let attempt = 0;
    while (attempt++ < 8) {
      const buf = randomBytes(32);
      try {
        const account = privateKeyToAccount(`0x${buf.toString('hex')}` as Hex);
        return { privateKey: buf, publicAddress: account.address };
      } catch {
        // Try again on the astronomically rare invalid scalar.
        continue;
      }
    }
    throw ExternalError('signer.evm.keygen_failed', 'Failed to derive a valid EVM key after 8 attempts');
  }

  async sign(input: { privateKey: Buffer; unsignedTx: string }): Promise<{ signedTx: Hex; txHash: Hex }> {
    if (input.privateKey.length !== 32) {
      throw ValidationError('signer.evm.bad_key_length', 'EVM private key must be exactly 32 bytes');
    }
    if (!input.unsignedTx.startsWith('0x')) {
      throw ValidationError('signer.evm.bad_tx_format', 'Unsigned tx must be 0x-prefixed hex');
    }

    const parsed = parseTransaction(input.unsignedTx as Hex);
    const account = privateKeyToAccount(`0x${input.privateKey.toString('hex')}` as Hex);
    const signature = await account.signTransaction(parsed);
    const txHash = keccak256(signature);
    // Re-serialize to ensure round-trip safety: parseTransaction(serialize(parsed)) ≡ parsed.
    const reserialized = serializeTransaction(parsed, undefined);
    if (reserialized !== input.unsignedTx) {
      // Different field ordering shouldn't happen with viem, but if it does we want to know.
      throw ExternalError(
        'signer.evm.round_trip_mismatch',
        'Unsigned tx did not round-trip through parse/serialize',
      );
    }
    return { signedTx: signature, txHash };
  }
}
