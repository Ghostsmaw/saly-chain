import { METRICS, type SemanticQuery } from './semantic.js';

/**
 * Rule-based natural-language → semantic-query planner. It maps a question onto
 * the allowlisted semantic layer (never raw SQL). This is the deterministic
 * default; an LLM provider can be plugged in behind the same `NlProvider`
 * contract, but even an LLM would be constrained to emit a `SemanticQuery`,
 * which is then validated + compiled by the semantic layer.
 */
export type PlanResult =
  | { supported: true; query: SemanticQuery; rationale: string }
  | { supported: false; reason: string };

export interface NlProvider {
  plan(question: string): Promise<PlanResult>;
}

const KNOWN_CHAINS = ['base', 'xrpl', 'ethereum', 'polygon', 'l3', 'saly-mainnet'];
const KNOWN_TOKENS = ['usdc', 'usdt', 'weth', 'wbtc', 'dai', 'eth'];

export function planFromQuestion(question: string): PlanResult {
  const q = question.toLowerCase();

  // 1) Metric selection (order matters: volume before generic "transfer").
  let metricId: string;
  if (/\b(volume|notional|value transferred|how much)\b/.test(q)) {
    metricId = 'transfer_volume';
  } else if (/\b(rail|route|routed|routing|settle|settlement)\b/.test(q)) {
    metricId = 'routed_intents';
  } else if (/\b(transfer|transaction|txs?|count|how many|activity|sends?)\b/.test(q)) {
    metricId = 'transfer_count';
  } else {
    return {
      supported: false,
      reason: `Could not map the question to a known metric (${Object.keys(METRICS).join(', ')}).`,
    };
  }

  const metric = METRICS[metricId]!;
  const validDims = new Set(Object.keys(metric.dimensions));
  const validFilters = new Set(Object.keys(metric.filters));

  // 2) Dimensions.
  const dimensions: string[] = [];
  if (/\b(by|per|each)\s+chain\b/.test(q) && validDims.has('chain')) dimensions.push('chain');
  if (/\b(by|per|each)\s+token\b/.test(q) && validDims.has('token')) dimensions.push('token');
  if (/\b(by|per|each)\s+rail\b/.test(q) && validDims.has('rail')) dimensions.push('rail');
  if (/\b(daily|per day|by day|over time|trend|each day)\b/.test(q) && validDims.has('day')) {
    dimensions.push('day');
  }

  // 3) Filters (chain / token by name).
  const filters: Array<{ field: string; value: string }> = [];
  if (validFilters.has('chain')) {
    const chain = KNOWN_CHAINS.find((c) => new RegExp(`\\b${c}\\b`).test(q));
    if (chain) filters.push({ field: 'chain', value: chain });
  }
  if (validFilters.has('token')) {
    const token = KNOWN_TOKENS.find((t) => new RegExp(`\\b${t}\\b`).test(q));
    if (token) filters.push({ field: 'token', value: token.toUpperCase() });
  }

  // 4) Time range.
  const sinceDays = parseSinceDays(q);

  // 5) Limit ("top N").
  const topMatch = q.match(/\btop\s+(\d{1,4})\b/);
  const limit = topMatch ? Number(topMatch[1]) : undefined;

  const query: SemanticQuery = {
    metric: metricId,
    ...(dimensions.length ? { dimensions } : {}),
    ...(filters.length ? { filters } : {}),
    sinceDays,
    ...(limit ? { limit } : {}),
  };

  const rationale =
    `metric=${metricId}` +
    (dimensions.length ? ` dims=[${dimensions.join(',')}]` : '') +
    (filters.length ? ` filters=[${filters.map((f) => `${f.field}=${f.value}`).join(',')}]` : '') +
    ` sinceDays=${sinceDays}` +
    (limit ? ` limit=${limit}` : '');

  return { supported: true, query, rationale };
}

function parseSinceDays(q: string): number {
  const nDays = q.match(/\b(?:last|past)\s+(\d{1,3})\s+days?\b/);
  if (nDays) return clampDays(Number(nDays[1]));
  if (/\b(today|last 24 hours|past day)\b/.test(q)) return 1;
  if (/\b(last|past)\s+week\b/.test(q) || /\bweekly\b/.test(q)) return 7;
  if (/\b(last|past)\s+month\b/.test(q) || /\bmonthly\b/.test(q)) return 30;
  if (/\b(last|past)\s+(year|12 months)\b/.test(q)) return 365;
  return 30; // sensible default window
}

function clampDays(n: number): number {
  return Math.max(1, Math.min(365, n));
}

/** Default provider: the deterministic rule planner. */
export class RuleNlProvider implements NlProvider {
  async plan(question: string): Promise<PlanResult> {
    return planFromQuestion(question);
  }
}
