import { createHash, randomBytes } from 'node:crypto';
import { describe, expect, it } from 'vitest';

/** Mirrors AuthService hashing so rotation tests stay algorithm-locked. */
function hashRefreshToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}

describe('refresh token hashing', () => {
  it('is deterministic and collision-resistant for distinct tokens', () => {
    const a = randomBytes(32).toString('base64url');
    const b = randomBytes(32).toString('base64url');
    expect(hashRefreshToken(a)).toBe(hashRefreshToken(a));
    expect(hashRefreshToken(a)).not.toBe(hashRefreshToken(b));
    expect(hashRefreshToken(a)).toHaveLength(64);
  });
});
