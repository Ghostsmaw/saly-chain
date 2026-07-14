/**
 * IP allow-list matching with exact IPv4/IPv6 and IPv4 CIDR support.
 *
 * When the allow-list is non-empty, a missing client IP is denied (fail closed).
 */

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  let value = 0;
  for (const part of parts) {
    const n = Number(part);
    if (!Number.isInteger(n) || n < 0 || n > 255) return null;
    value = (value << 8) + n;
  }
  return value >>> 0;
}

function matchesIpv4Cidr(ip: string, cidr: string): boolean {
  const [network, prefixRaw] = cidr.split('/');
  const prefix = Number(prefixRaw);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) return false;
  const ipInt = ipv4ToInt(ip);
  const networkInt = ipv4ToInt(network ?? '');
  if (ipInt === null || networkInt === null) return false;
  if (prefix === 0) return true;
  const mask = prefix === 32 ? 0xffff_ffff : (~0 << (32 - prefix)) >>> 0;
  return (ipInt & mask) === (networkInt & mask);
}

export function isIpAllowed(clientIp: string | undefined, allowList: readonly string[]): boolean {
  if (allowList.length === 0) return true;
  if (!clientIp?.trim()) return false;

  const normalized = clientIp.trim();
  for (const entry of allowList) {
    const rule = entry.trim();
    if (!rule) continue;
    if (rule.includes('/')) {
      if (matchesIpv4Cidr(normalized, rule)) return true;
      continue;
    }
    if (normalized === rule) return true;
  }
  return false;
}
