import { UnauthorizedException } from '@nestjs/common';
import { constantTimeEquals } from '@salychain/config';

/**
 * Bearer-token gate for execution's privileged endpoints (escrow resolution,
 * clearing seed, reconciliation, PSP webhook ingestion).
 *
 * Fails closed when the expected token is not configured and compares in
 * constant time — a `!==` on secrets leaks a byte-position oracle through
 * response timing.
 */
export function assertBearerToken(
  authorization: string | undefined,
  expectedToken: string | undefined,
  disabledMessage: string,
): void {
  if (!expectedToken) throw new UnauthorizedException(disabledMessage);
  if (!authorization || !constantTimeEquals(authorization, `Bearer ${expectedToken}`)) {
    throw new UnauthorizedException('invalid token');
  }
}
