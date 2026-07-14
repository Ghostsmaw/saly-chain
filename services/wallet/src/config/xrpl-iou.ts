import { trustLineKey } from '@salychain/chain-xrpl';

const XRPL_ADDRESS = /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/;

/** Parse `XRPL_IOU_ISSUERS` env JSON into `{ USD: "r…", … }`. */
export function parseXrplIouIssuers(raw: string | undefined): Record<string, string> {
  if (!raw || raw.trim() === '' || raw.trim() === '{}') return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const [currency, issuer] of Object.entries(parsed)) {
      if (typeof issuer === 'string' && XRPL_ADDRESS.test(issuer)) {
        out[currency.toUpperCase()] = issuer;
      }
    }
    return out;
  } catch {
    return {};
  }
}

export function defaultXrplTrustedIssuerAllowlist(issuers: Record<string, string>): string[] {
  return Object.entries(issuers).map(([currency, issuer]) => trustLineKey(currency, issuer));
}

export function resolveXrplIouIssuer(
  asset: string,
  issuers: Record<string, string>,
  override?: string | null,
): string | null {
  const currency = asset.toUpperCase();
  if (override) return override;
  return issuers[currency] ?? null;
}
