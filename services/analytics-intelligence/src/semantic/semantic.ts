import { z } from 'zod';

/**
 * A small **semantic layer**: a registry of allowlisted metrics + dimensions +
 * filters that compile to safe, parameterized ClickHouse SQL. This is the
 * grounding for natural-language analytics — the NL planner can only ever
 * produce a query expressed in these terms, so an LLM (or a rule planner) can
 * never reach raw SQL. Dimension/filter *expressions* are constants defined
 * here; only *values* are bound as `{name:Type}` params.
 */
export interface Dimension {
  id: string;
  /** SQL expression + the alias it is selected/grouped as. */
  expr: string;
}

export interface FilterField {
  id: string;
  /** Column the filter binds to (compared with a bound String param). */
  column: string;
}

export interface Metric {
  id: string;
  description: string;
  table: string;
  /** Aggregate expression, selected as `value`. */
  agg: string;
  /** Timestamp column for the time-range filter. */
  timeColumn: string;
  /** Extra always-applied predicate (no user input). */
  baseWhere?: string;
  dimensions: Record<string, Dimension>;
  filters: Record<string, FilterField>;
}

const DAY: Dimension = { id: 'day', expr: 'toDate(ts) AS day' };

export const METRICS: Record<string, Metric> = {
  transfer_count: {
    id: 'transfer_count',
    description: 'Number of token transfers.',
    table: 'token_transfers',
    agg: 'count() AS value',
    timeColumn: 'ts',
    dimensions: {
      chain: { id: 'chain', expr: 'chain_id AS chain' },
      token: { id: 'token', expr: 'token_symbol AS token' },
      day: DAY,
    },
    filters: {
      chain: { id: 'chain', column: 'chain_id' },
      token: { id: 'token', column: 'token_symbol' },
    },
  },
  transfer_volume: {
    id: 'transfer_volume',
    description: 'Gross token transfer volume (sum of raw amounts).',
    table: 'token_transfers',
    agg: 'sum(toFloat64OrZero(amount_raw)) AS value',
    timeColumn: 'ts',
    dimensions: {
      chain: { id: 'chain', expr: 'chain_id AS chain' },
      token: { id: 'token', expr: 'token_symbol AS token' },
      day: DAY,
    },
    filters: {
      chain: { id: 'chain', column: 'chain_id' },
      token: { id: 'token', column: 'token_symbol' },
    },
  },
  routed_intents: {
    id: 'routed_intents',
    description: 'Count of routed intents per rail.',
    table: 'intent_events',
    agg: 'count() AS value',
    timeColumn: 'ts',
    baseWhere: "event_type = 'routed'",
    dimensions: {
      rail: { id: 'rail', expr: 'rail AS rail' },
      day: DAY,
    },
    filters: {
      rail: { id: 'rail', column: 'rail' },
    },
  },
};

export const METRIC_IDS = Object.keys(METRICS);

export const semanticQuerySchema = z.object({
  metric: z.string(),
  dimensions: z.array(z.string()).max(3).optional(),
  filters: z
    .array(z.object({ field: z.string(), value: z.string().max(128) }))
    .max(10)
    .optional(),
  sinceDays: z.coerce.number().int().min(1).max(365).optional(),
  limit: z.coerce.number().int().min(1).max(10_000).optional(),
});
export type SemanticQuery = z.infer<typeof semanticQuerySchema>;

export interface CompiledQuery {
  metric: string;
  sql: string;
  params: Record<string, string | number>;
}

export class SemanticError extends Error {}

/**
 * Compile a validated semantic query into parameterized ClickHouse SQL.
 * Throws SemanticError for any unknown metric/dimension/filter (fail-closed).
 */
export function compileSemanticQuery(
  input: SemanticQuery,
  opts: { maxLimit: number },
): CompiledQuery {
  const query = semanticQuerySchema.parse(input);
  const metric = METRICS[query.metric];
  if (!metric) {
    throw new SemanticError(`Unknown metric '${query.metric}'. Allowed: ${METRIC_IDS.join(', ')}`);
  }

  const params: Record<string, string | number> = {};
  const selectDims: string[] = [];
  const groupDims: string[] = [];

  for (const dimId of query.dimensions ?? []) {
    const dim = metric.dimensions[dimId];
    if (!dim) {
      throw new SemanticError(
        `Metric '${metric.id}' has no dimension '${dimId}'. Allowed: ${Object.keys(metric.dimensions).join(', ')}`,
      );
    }
    selectDims.push(dim.expr);
    // group/order by the alias (the part after " AS ").
    groupDims.push(dim.expr.split(/\s+AS\s+/i)[1]!.trim());
  }

  const where: string[] = [];
  if (metric.baseWhere) where.push(metric.baseWhere);

  if (query.sinceDays) {
    params.sinceDays = query.sinceDays;
    where.push(`${metric.timeColumn} >= now() - toIntervalDay({sinceDays:UInt32})`);
  }

  (query.filters ?? []).forEach((f, i) => {
    const field = metric.filters[f.field];
    if (!field) {
      throw new SemanticError(
        `Metric '${metric.id}' has no filter '${f.field}'. Allowed: ${Object.keys(metric.filters).join(', ')}`,
      );
    }
    const key = `f${i}`;
    params[key] = f.value;
    where.push(`${field.column} = {${key}:String}`);
  });

  const limit = Math.min(query.limit ?? 100, opts.maxLimit);
  params.limit = limit;

  const selectList = [...selectDims, metric.agg].join(', ');
  const whereClause = where.length ? `WHERE ${where.join(' AND ')} ` : '';
  const groupClause = groupDims.length ? `GROUP BY ${groupDims.join(', ')} ` : '';
  const orderClause = groupDims.length ? 'ORDER BY value DESC ' : '';

  const sql =
    `SELECT ${selectList} FROM ${metric.table} FINAL ${whereClause}` +
    `${groupClause}${orderClause}LIMIT {limit:UInt32}`;

  return { metric: metric.id, sql, params };
}
