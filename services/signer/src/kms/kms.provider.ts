/**
 * KMS provider abstraction.
 *
 * The signer service never sees plaintext key material at rest. All keys are
 * wrapped (encrypted) by a Key Management Service. The provider is swappable:
 *   - LocalKmsProvider     → AES-256-GCM with a master key from the environment (dev/test only)
 *   - AwsKmsProvider       → AWS KMS Encrypt/Decrypt (default in staging+prod)
 *   - VaultKmsProvider     → HashiCorp Vault Transit (option for self-hosted deploys)
 *
 * The interface returns and accepts only opaque `Buffer`s. Callers
 * (the SignerService) never inspect the bytes.
 */
export interface KmsProvider {
  readonly name: string;
  /**
   * Reference to the active wrapping key (e.g. KMS key version ARN, or
   * "local:v1" for the dev provider). Stored alongside wrapped material so
   * rotation can find the right unwrap key.
   */
  readonly wrappingKeyRef: string;

  encrypt(plaintext: Buffer): Promise<Buffer>;
  decrypt(ciphertext: Buffer, wrappingKeyRef: string): Promise<Buffer>;
  /** Connectivity / correctness probe for health checks. */
  ping(): Promise<void>;
}
