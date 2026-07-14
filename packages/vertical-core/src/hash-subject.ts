import { createHash } from 'node:crypto';

/**
 * Derive an on-chain-safe subject hash from a domain identifier.
 * Never put raw PII on-chain — hash with org-scoped salt.
 */
export function hashSubject(rawId: string, orgSalt: string): string {
  return `0x${createHash('sha256').update(`${orgSalt}:${rawId}`).digest('hex')}`;
}

export function hashDataPayload(payload: unknown): string {
  const canonical = JSON.stringify(payload, Object.keys(payload as object).sort());
  return `0x${createHash('sha256').update(canonical).digest('hex')}`;
}
