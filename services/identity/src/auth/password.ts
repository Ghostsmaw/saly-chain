import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

/**
 * Password hashing using Node's built-in scrypt (memory-hard KDF). We avoid an
 * external bcrypt/argon2 dependency so the service has zero native build steps.
 *
 * Stored format: `scrypt$N$<saltHex>$<hashHex>` where N is the cost parameter.
 */
const KEY_LEN = 64;
const COST = 16384; // 2^14

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, KEY_LEN, { N: COST });
  return `scrypt$${COST}$${salt.toString('hex')}$${derived.toString('hex')}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split('$');
  if (parts.length !== 4 || parts[0] !== 'scrypt') return false;
  const cost = Number(parts[1]);
  const salt = Buffer.from(parts[2]!, 'hex');
  const expected = Buffer.from(parts[3]!, 'hex');
  if (!Number.isFinite(cost) || salt.length === 0 || expected.length === 0) return false;
  const derived = scryptSync(password, salt, expected.length, { N: cost });
  return derived.length === expected.length && timingSafeEqual(derived, expected);
}
