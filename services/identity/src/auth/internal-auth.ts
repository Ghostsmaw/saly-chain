import { timingSafeEqual } from 'node:crypto';
import { UnauthorizedException } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { identityEnvSchema } from '../config/env.js';

/**
 * Guards internal-only endpoints (super-admin provisioning, token minting).
 *
 * Fails closed: outside local development a shared secret MUST be configured,
 * otherwise every request is rejected.
 */
export function assertIdentityInternalAuth(authorization: string | undefined): void {
  const env = loadEnv(identityEnvSchema);
  const token = env.IDENTITY_INTERNAL_ADMIN_TOKEN;
  if (!token) {
    if (env.NODE_ENV === 'development') return;
    throw new UnauthorizedException('identity internal admin token not configured');
  }
  const expected = `Bearer ${token}`;
  if (!authorization || !constantTimeEquals(authorization, expected)) {
    throw new UnauthorizedException('invalid internal admin token');
  }
}

function constantTimeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
