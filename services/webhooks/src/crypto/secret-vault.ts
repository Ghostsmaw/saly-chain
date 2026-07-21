import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { ConfigError } from '@salychain/config';

/**
 * Encrypts webhook signing secrets before they touch the database.
 *
 * A leaked DB dump must not hand an attacker the ability to forge signed
 * webhook deliveries to every partner. Secrets are sealed with AES-256-GCM
 * under `WEBHOOK_SECRET_ENC_KEY` (base64, 32 bytes).
 *
 * Stored format:  enc:v1:<base64(iv[12] | tag[16] | ciphertext)>
 *
 * Values without the `enc:v1:` prefix are legacy plaintext rows — they are
 * returned as-is on read (deliveries keep working) and become encrypted the
 * next time the secret is rotated. Without a configured key the vault is a
 * passthrough; production startup rejects that posture (see main.ts).
 */
const PREFIX = 'enc:v1:';
const IV_LEN = 12;
const TAG_LEN = 16;

export const SECRET_VAULT = Symbol('SECRET_VAULT');

export class SecretVault {
  private readonly key: Buffer | null;

  constructor(base64Key: string | undefined) {
    if (!base64Key) {
      this.key = null;
      return;
    }
    const buf = Buffer.from(base64Key, 'base64');
    if (buf.length !== 32) {
      throw new ConfigError(
        `WEBHOOK_SECRET_ENC_KEY must decode to 32 bytes (got ${buf.length})`,
      );
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
    if (!stored.startsWith(PREFIX)) return stored; // legacy plaintext row
    if (!this.key) {
      throw new ConfigError(
        'Encrypted webhook secret found but WEBHOOK_SECRET_ENC_KEY is not configured',
      );
    }
    const raw = Buffer.from(stored.slice(PREFIX.length), 'base64');
    if (raw.length < IV_LEN + TAG_LEN + 1) {
      throw new ConfigError('Encrypted webhook secret is malformed');
    }
    const iv = raw.subarray(0, IV_LEN);
    const tag = raw.subarray(IV_LEN, IV_LEN + TAG_LEN);
    const body = raw.subarray(IV_LEN + TAG_LEN);
    const decipher = createDecipheriv('aes-256-gcm', this.key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(body), decipher.final()]).toString('utf8');
  }
}
