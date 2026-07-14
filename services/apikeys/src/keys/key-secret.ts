import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { ulid } from 'ulid';

/**
 * API-key secret derivation.
 *
 * - The raw secret is shown to the caller exactly ONCE on issuance.
 * - At rest we store: `salt` (per-key) and `secretHash = scrypt(secret || pepper, salt)`.
 * - The pepper is server-side; rotating it requires a re-hash job.
 * - We use scrypt with `N=2^14` which is fast enough for an API gateway hot path
 *   (~10ms) while still meaningfully slowing brute-force on a dumped database.
 *
 * Key format on the wire: `sk_{env}_{12-char-ulid-prefix}_{40-char-base32-secret}`.
 * The prefix is the index. The trailing 40 chars are the entropy.
 */

const SCRYPT_N = 1 << 14; // 16384
const SCRYPT_r = 8;
const SCRYPT_p = 1;
const SCRYPT_KEYLEN = 32;

const SECRET_BYTES = 30; // 240 bits → 48 base32 chars (we trim to 40 for display)

const BASE32_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford base32

function base32(bytes: Uint8Array, length: number): string {
  let bits = 0;
  let value = 0;
  let out = '';
  for (const b of bytes) {
    value = (value << 8) | b;
    bits += 8;
    while (bits >= 5) {
      out += BASE32_ALPHABET[(value >>> (bits - 5)) & 0x1f];
      bits -= 5;
    }
  }
  if (bits > 0) out += BASE32_ALPHABET[(value << (5 - bits)) & 0x1f];
  return out.slice(0, length);
}

export interface GeneratedKey {
  /** Public, indexable prefix — also the human-readable id-hint. */
  prefix: string;
  /** What the caller sees once. Includes prefix + secret. */
  fullSecret: string;
  /** Stored. */
  salt: string;
  /** Stored. */
  secretHash: string;
  /** Stored for UX. */
  lastFour: string;
}

export function generateApiKey(env: 'TEST' | 'LIVE', pepper: string): GeneratedKey {
  const envSegment = env === 'LIVE' ? 'live' : 'test';
  const prefixSuffix = ulid().slice(0, 12);
  const prefix = `sk_${envSegment}_${prefixSuffix}`;

  const secretBytes = randomBytes(SECRET_BYTES);
  const secret = base32(secretBytes, 40);
  const fullSecret = `${prefix}_${secret}`;

  const salt = randomBytes(16).toString('hex');
  const hashBuf = scryptSync(`${secret}${pepper}`, Buffer.from(salt, 'hex'), SCRYPT_KEYLEN, {
    N: SCRYPT_N,
    r: SCRYPT_r,
    p: SCRYPT_p,
  });

  return {
    prefix,
    fullSecret,
    salt,
    secretHash: hashBuf.toString('hex'),
    lastFour: secret.slice(-4),
  };
}

export function verifyApiKey(
  presented: string,
  stored: { salt: string; secretHash: string },
  pepper: string,
): boolean {
  const parts = presented.split('_');
  // sk_<env>_<prefix>_<secret>
  if (parts.length !== 4) return false;
  const secret = parts[3];
  if (!secret) return false;
  const computed = scryptSync(`${secret}${pepper}`, Buffer.from(stored.salt, 'hex'), SCRYPT_KEYLEN, {
    N: SCRYPT_N,
    r: SCRYPT_r,
    p: SCRYPT_p,
  });
  const expected = Buffer.from(stored.secretHash, 'hex');
  if (expected.length !== computed.length) return false;
  return timingSafeEqual(computed, expected);
}

/** Extract the prefix from a presented secret. Returns null if shape is wrong. */
export function extractPrefix(presented: string): string | null {
  const parts = presented.split('_');
  if (parts.length !== 4) return null;
  const [scheme, env, suffix] = parts;
  if (scheme !== 'sk') return null;
  if (env !== 'test' && env !== 'live') return null;
  if (!suffix || suffix.length < 8) return null;
  return `${scheme}_${env}_${suffix}`;
}
