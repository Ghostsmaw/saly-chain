/**
 * Point-in-time feature engineering for an address.
 *
 * **No leakage:** features are computed only from transfers whose timestamp is
 * `<= asOf`. This is the core correctness property for ML features — at training
 * time you must reconstruct exactly what was known at decision time. The cutoff
 * is enforced here (not left to the SQL) and unit-tested.
 *
 * Pure + deterministic. Amounts are treated as numeric *features* (best-effort
 * `Number(amount_raw)`); they are not money math, so precision loss is fine.
 */
export interface TransferRow {
  ts: string;
  chain_id: string;
  from_address: string;
  to_address: string;
  amount_raw: string;
  token_symbol: string;
}

export interface AddressFeatures {
  address: string;
  chain: string;
  as_of: string;
  transfers_total: number;
  outbound_count: number;
  inbound_count: number;
  distinct_counterparties: number;
  distinct_tokens: number;
  volume_out: number;
  volume_in: number;
  net_volume: number;
  max_transfer: number;
  avg_transfer: number;
  active_days: number;
  first_seen_at: string | null;
  last_seen_at: string | null;
  age_days: number;
  days_since_last_activity: number;
}

export function computeAddressFeatures(
  transfers: TransferRow[],
  address: string,
  chain: string,
  asOf: Date,
): AddressFeatures {
  const addr = address.toLowerCase();
  const asOfMs = asOf.getTime();

  let outbound = 0;
  let inbound = 0;
  let volumeOut = 0;
  let volumeIn = 0;
  let maxTransfer = 0;
  let sumTransfer = 0;
  let count = 0;
  let firstMs = Number.POSITIVE_INFINITY;
  let lastMs = Number.NEGATIVE_INFINITY;
  const counterparties = new Set<string>();
  const tokens = new Set<string>();
  const days = new Set<string>();

  for (const t of transfers) {
    const tsMs = Date.parse(t.ts);
    if (Number.isNaN(tsMs) || tsMs > asOfMs) continue; // point-in-time cutoff

    const from = (t.from_address ?? '').toLowerCase();
    const to = (t.to_address ?? '').toLowerCase();
    const isOut = from === addr;
    const isIn = to === addr;
    if (!isOut && !isIn) continue;

    const amount = toNumber(t.amount_raw);
    count += 1;
    sumTransfer += amount;
    if (amount > maxTransfer) maxTransfer = amount;
    if (tsMs < firstMs) firstMs = tsMs;
    if (tsMs > lastMs) lastMs = tsMs;
    if (t.token_symbol) tokens.add(t.token_symbol);
    days.add(new Date(tsMs).toISOString().slice(0, 10));

    if (isOut) {
      outbound += 1;
      volumeOut += amount;
      if (to && to !== addr) counterparties.add(to);
    }
    if (isIn) {
      inbound += 1;
      volumeIn += amount;
      if (from && from !== addr) counterparties.add(from);
    }
  }

  const firstSeen = Number.isFinite(firstMs) ? new Date(firstMs) : null;
  const lastSeen = Number.isFinite(lastMs) ? new Date(lastMs) : null;

  return {
    address: addr,
    chain,
    as_of: asOf.toISOString(),
    transfers_total: count,
    outbound_count: outbound,
    inbound_count: inbound,
    distinct_counterparties: counterparties.size,
    distinct_tokens: tokens.size,
    volume_out: round2(volumeOut),
    volume_in: round2(volumeIn),
    net_volume: round2(volumeIn - volumeOut),
    max_transfer: round2(maxTransfer),
    avg_transfer: count ? round2(sumTransfer / count) : 0,
    active_days: days.size,
    first_seen_at: firstSeen ? firstSeen.toISOString() : null,
    last_seen_at: lastSeen ? lastSeen.toISOString() : null,
    age_days: firstSeen ? daysBetween(firstSeen.getTime(), asOfMs) : 0,
    days_since_last_activity: lastSeen ? daysBetween(lastSeen.getTime(), asOfMs) : 0,
  };
}

function toNumber(raw: string): number {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function daysBetween(fromMs: number, toMs: number): number {
  return Math.max(0, Math.floor((toMs - fromMs) / 86_400_000));
}
