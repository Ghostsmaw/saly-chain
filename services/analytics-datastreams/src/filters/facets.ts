import type { Subject } from '@salychain/events';

/**
 * A normalized, sink-agnostic projection of the salient fields of any domain
 * event. The filter matcher works exclusively against facets, so it never has
 * to know the shape of all 24 event schemas — and adding a new event type only
 * requires teaching the extractor where its chain/asset/address/amount live.
 *
 * All values are normalized for comparison:
 *   - chain / asset are upper-cased
 *   - addresses are lower-cased (EVM + XRPL addresses are case-folded here for
 *     case-insensitive matching; XRPL is technically case-sensitive but the
 *     classic-address alphabet has no case collisions, so folding is safe)
 */
export interface EventFacets {
  /** Logical chain, e.g. BASE | XRPL | SALY_L3. Absent for pure intent/agent events. */
  chain?: string;
  /** Settlement rail for tx-lifecycle events, e.g. BASE | XRPL | L3 | INTERNAL | FIAT | ESCROW. */
  rail?: string;
  /** Asset / token symbol, e.g. USDC | XRP | ETH. */
  asset?: string;
  /** Every address referenced by the event (from/to/payer/payee/destination), lower-cased. */
  addresses: string[];
  /** Sender-role address (from / payer), lower-cased, when the event has one. */
  fromAddress?: string;
  /** Recipient-role address (to / payee / destination), lower-cased, when present. */
  toAddress?: string;
  /** Smallest-unit integer amount as a bigint, when the event carries a transfer value. */
  amountMinor?: bigint;
  /** Intent or transaction "kind" classifier, e.g. BASE_PAYOUT | DEX_SWAP. */
  kind?: string;
  /** Agent id for agent-lifecycle events. */
  agentId?: string;
  /** Intent id when present. */
  intentId?: string;
}

function str(v: unknown): string | undefined {
  return typeof v === 'string' && v.length > 0 ? v : undefined;
}

function lower(v: string | undefined): string | undefined {
  return v === undefined ? undefined : v.toLowerCase();
}

function pushAddr(out: string[], v: unknown): void {
  const s = str(v);
  if (s) out.push(s.toLowerCase());
}

/** Parse a smallest-unit decimal string into a bigint, tolerating bad input. */
function toMinor(v: unknown): bigint | undefined {
  const s = str(v);
  if (s === undefined) return undefined;
  // amount_minor is always an integer string; reject anything else rather than
  // silently truncating a fractional value into the wrong threshold bucket.
  if (!/^-?\d+$/.test(s)) return undefined;
  try {
    return BigInt(s);
  } catch {
    return undefined;
  }
}

/**
 * Project a validated domain event into its filterable facets. The event is
 * treated structurally (Record access) so this stays decoupled from the exact
 * zod types; the bus has already validated the payload against its schema.
 */
export function extractEventFacets(subject: Subject, event: unknown): EventFacets {
  const e = (event ?? {}) as Record<string, unknown>;
  const addresses: string[] = [];
  const destination = e.destination as Record<string, unknown> | undefined;

  // Sender / recipient roles, normalized across the role-specific keys each
  // event type uses (from/payer for sender, to/payee/destination for recipient).
  const fromAddress = lower(str(e.from) ?? str(e.payer));
  const toAddress = lower(
    str(e.to) ?? str(e.payee) ?? (destination ? str(destination.address) : undefined),
  );

  // Full address union (also includes contract/escrow addresses) for `either`.
  pushAddr(addresses, e.from);
  pushAddr(addresses, e.to);
  pushAddr(addresses, e.payer);
  pushAddr(addresses, e.payee);
  pushAddr(addresses, e.contract_address);
  pushAddr(addresses, e.escrow_contract);
  if (destination) pushAddr(addresses, destination.address);

  // Chain: explicit on chain.* events; derivable from `rail`/destination on tx.
  const rail = str(e.rail);
  const chain = str(e.chain) ?? (destination ? str(destination.chain) : undefined);

  // Asset / token symbol across the various carriers.
  const iou = e.iou as Record<string, unknown> | undefined;
  const source = e.source as Record<string, unknown> | undefined;
  let asset = str(e.asset) ?? str(e.token);
  if (!asset && iou) asset = str(iou.currency);
  if (!asset && subject.startsWith('salychain.chain.xrpl') && e.amount_drops !== undefined)
    asset = 'XRP';
  if (!asset && source) asset = str(source.currency);

  // Amount (smallest unit). XRPL native is in drops; IOU value is decimal and
  // intentionally NOT coerced to "minor" (different scale) — left undefined so
  // amount thresholds simply don't apply to IOU legs.
  let amountMinor = toMinor(e.amount_minor);
  if (amountMinor === undefined) amountMinor = toMinor(e.amount_drops);
  if (amountMinor === undefined && source) amountMinor = toMinor(source.amount_minor);

  const facets: EventFacets = {
    addresses: dedupe(addresses),
  };
  if (fromAddress) facets.fromAddress = fromAddress;
  if (toAddress) facets.toAddress = toAddress;
  if (chain) facets.chain = chain.toUpperCase();
  if (rail) facets.rail = rail.toUpperCase();
  if (asset) facets.asset = asset.toUpperCase();
  if (amountMinor !== undefined) facets.amountMinor = amountMinor;
  const kind = str(e.kind);
  if (kind) facets.kind = kind;
  const agentId = str(e.agent_id);
  if (agentId) facets.agentId = agentId;
  const intentId = str(e.intent_id);
  if (intentId) facets.intentId = intentId;

  return facets;
}

function dedupe(xs: string[]): string[] {
  return xs.length <= 1 ? xs : [...new Set(xs)];
}
