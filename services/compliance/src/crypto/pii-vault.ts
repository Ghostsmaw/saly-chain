import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { ConfigError } from '@salychain/config';

/**
 * Field-level encryption for KYC/KYB payloads at rest.
 *
 * Format: enc:v1:<base64(iv[12] | tag[16] | ciphertext)>
 * Without a key the vault is a passthrough (dev); production rejects that.
 */
const PREFIX = 'enc:v1:';
const IV_LEN = 12;
const TAG_LEN = 16;

export const PII_VAULT = Symbol('PII_VAULT');

export class PiiVault {
  private readonly key: Buffer | null;

  constructor(base64Key: string | undefined) {
    if (!base64Key) {
      this.key = null;
      return;
    }
    const buf = Buffer.from(base64Key, 'base64');
    if (buf.length !== 32) {
      throw new ConfigError(`COMPLIANCE_PII_ENC_KEY must decode to 32 bytes (got ${buf.length})`);
    }
    this.key = buf;
  }

  get enabled(): boolean {
    return this.key !== null;
  }

  seal(plaintext: string): string {
    if (!this.key) return plaintext;
    const iv = randomBytes(IV_LEN);
    const cipher = createCipheriv('aes-256-gcm', this.key, iv);
    const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return PREFIX + Buffer.concat([iv, tag, ciphertext]).toString('base64');
  }

  open(stored: string): string {
    if (!stored.startsWith(PREFIX)) return stored;
    if (!this.key) {
      throw new ConfigError('Encrypted PII found but COMPLIANCE_PII_ENC_KEY is not configured');
    }
    const raw = Buffer.from(stored.slice(PREFIX.length), 'base64');
    if (raw.length < IV_LEN + TAG_LEN + 1) {
      throw new ConfigError('Encrypted PII payload is malformed');
    }
    const iv = raw.subarray(0, IV_LEN);
    const tag = raw.subarray(IV_LEN, IV_LEN + TAG_LEN);
    const body = raw.subarray(IV_LEN + TAG_LEN);
    const decipher = createDecipheriv('aes-256-gcm', this.key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(body), decipher.final()]).toString('utf8');
  }

  /** Seal a JSON-serializable object for storage inside metadata. */
  sealJson(value: unknown): { _enc: string } | unknown {
    if (!this.key) return value;
    return { _enc: this.seal(JSON.stringify(value)) };
  }

  /** Open a previously sealed JSON blob (or return plaintext legacy shapes). */
  openJson<T = unknown>(value: unknown): T {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      typeof (value as { _enc?: unknown })._enc === 'string'
    ) {
      return JSON.parse(this.open((value as { _enc: string })._enc)) as T;
    }
    return value as T;
  }
}
