import { decode, encode, encodeForSigning, hashes, type Transaction } from 'xrpl';
import { deriveAddress, deriveKeypair, generateSeed, sign as signWithKey } from 'ripple-keypairs';
import { ExternalError, ValidationError } from '@salychain/errors';
import type { ChainSigner } from './chain.signer.js';

/**
 * XRPL signer.
 *
 * Key material:
 *   - generateKey() produces a fresh ed25519 seed (the XRPL secret).
 *   - The seed is the canonical key form on XRPL; the public/private keypair
 *     is derived deterministically. Encrypting the seed (not the derived keys)
 *     means we can support all XRPL-native uses (Payment, TrustSet, etc.)
 *     from the same wrapped material.
 *   - The seed is encoded as `Buffer.from(seed, 'utf-8')` so it round-trips
 *     through the KMS provider's byte interface.
 *
 * Signing:
 *   - The input `unsignedTx` is the hex-encoded canonical XRPL transaction
 *     blob (the same blob the adapter returns from `prepareTransfer`).
 *   - We decode → set SigningPubKey → compute the signing hash → sign with the
 *     private key → set TxnSignature → re-encode.
 */
export class XrplChainSigner implements ChainSigner {
  readonly chain = 'XRPL';

  async generateKey(): Promise<{ privateKey: Buffer; publicAddress: string }> {
    const seed = generateSeed({ algorithm: 'ed25519' });
    const keys = deriveKeypair(seed);
    const address = deriveAddress(keys.publicKey);
    return { privateKey: Buffer.from(seed, 'utf-8'), publicAddress: address };
  }

  async sign(input: { privateKey: Buffer; unsignedTx: string }): Promise<{ signedTx: `0x${string}`; txHash: `0x${string}` }> {
    const seed = input.privateKey.toString('utf-8');
    if (!seed.startsWith('s')) {
      throw ValidationError('signer.xrpl.bad_seed', 'XRPL seed must begin with "s"');
    }
    if (!input.unsignedTx || /[^0-9A-Fa-f]/.test(input.unsignedTx)) {
      throw ValidationError('signer.xrpl.bad_tx_format', 'XRPL unsigned blob must be hex');
    }

    let keys: { publicKey: string; privateKey: string };
    try {
      keys = deriveKeypair(seed);
    } catch (err) {
      throw ExternalError('signer.xrpl.derive_failed', `Failed to derive XRPL keys: ${(err as Error).message}`, {
        cause: err,
      });
    }

    let tx: Transaction;
    try {
      tx = decode(input.unsignedTx) as Transaction;
    } catch (err) {
      throw ValidationError('signer.xrpl.decode_failed', `Could not decode XRPL blob: ${(err as Error).message}`);
    }

    // Validate that the account in the transaction matches the keypair we're signing with.
    const expectedAddress = deriveAddress(keys.publicKey);
    if (tx.Account && tx.Account !== expectedAddress) {
      throw ValidationError(
        'signer.xrpl.account_mismatch',
        `Tx Account ${String(tx.Account)} does not match signer address ${expectedAddress}`,
      );
    }

    tx.SigningPubKey = keys.publicKey;
    // `encodeForSigning` returns the hex-encoded payload with the canonical
    // XRPL "STX\0" prefix that ripple-keypairs.sign expects.
    const signingPayload = encodeForSigning(tx);
    const signature = signWithKey(signingPayload, keys.privateKey);
    tx.TxnSignature = signature;

    const signedBlob = encode(tx);
    const txHash = hashes.hashSignedTx(signedBlob);
    // Match the EVM signer's hex prefix convention so the audit log and downstream consumers
    // can treat all signed tx representations uniformly. XRPL native blobs are uppercase hex.
    return { signedTx: `0x${signedBlob}` as `0x${string}`, txHash: `0x${txHash}` as `0x${string}` };
  }
}
