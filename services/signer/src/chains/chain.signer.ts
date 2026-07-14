import type { Hex } from 'viem';

/**
 * Per-chain signing strategy. The signer service hands a `ChainSigner`
 * an unsigned transaction (in the chain's canonical wire format) plus the
 * plaintext private key (held in memory for the duration of the call only)
 * and gets back a signed transaction ready for broadcast.
 *
 * Implementations MUST NOT log key material, persist it, or return it.
 */
export interface ChainSigner {
  readonly chain: 'BASE' | 'XRPL' | 'ETHEREUM' | 'POLYGON' | 'SALY_L3';
  /**
   * Produce a fresh keypair. Returns the public address used to receive funds
   * and the raw private key material. The signer service is responsible for
   * encrypting the private key before persistence.
   */
  generateKey(): Promise<{ privateKey: Buffer; publicAddress: string }>;
  /**
   * Sign an unsigned transaction. `privateKey` is plaintext key material
   * (consumed in-memory). `unsignedTx` is hex (EVM) or canonical JSON (XRPL).
   * Returns the hex-encoded signed transaction.
   */
  sign(input: { privateKey: Buffer; unsignedTx: string }): Promise<{ signedTx: Hex; txHash: Hex }>;
}
