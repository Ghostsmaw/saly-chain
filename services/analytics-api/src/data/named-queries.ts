import { z } from 'zod';
import type { BuiltQuery } from './sql.js';

/**
 * Allowlist for `POST /v1/data/query`. Customers never send SQL — they pick a
 * named query and supply validated params, which are bound as ClickHouse query
 * params. This is the "sandboxed parameterized query" surface: expressive enough
 * to be useful, structurally safe against injection and runaway scans.
 */
export interface NamedQuery {
  readonly description: string;
  readonly schema: z.ZodTypeAny;
  readonly build: (params: Record<string, unknown>) => BuiltQuery;
}

export const NAMED_QUERIES: Record<string, NamedQuery> = {
  daily_transfer_counts: {
    description: 'Daily transfer count and unique senders, optionally filtered by chain.',
    schema: z.object({
      chain: z.string().min(1).max(64).optional(),
      days: z.coerce.number().int().min(1).max(90).default(7),
    }),
    build: (p) => {
      const params: Record<string, string | number> = { days: p.days as number };
      let where = '';
      if (p.chain) {
        where = 'WHERE chain_id = {chain:String}';
        params.chain = p.chain as string;
      }
      return {
        query:
          'SELECT toDate(ts) AS date, count() AS transfers, uniqExact(from_address) AS senders ' +
          `FROM token_transfers FINAL ${where} ` +
          'GROUP BY date ORDER BY date DESC LIMIT {days:UInt32}',
        params,
      };
    },
  },

  top_tokens_by_volume: {
    description: 'Top tokens by transfer volume, optionally filtered by chain.',
    schema: z.object({
      chain: z.string().min(1).max(64).optional(),
      limit: z.coerce.number().int().min(1).max(100).default(10),
    }),
    build: (p) => {
      const params: Record<string, string | number> = { limit: p.limit as number };
      let where = '';
      if (p.chain) {
        where = 'WHERE chain_id = {chain:String}';
        params.chain = p.chain as string;
      }
      return {
        query:
          'SELECT token_symbol, count() AS transfers, sum(toFloat64OrZero(amount_raw)) AS volume ' +
          `FROM token_transfers FINAL ${where} ` +
          'GROUP BY token_symbol ORDER BY volume DESC LIMIT {limit:UInt32}',
        params,
      };
    },
  },

  rail_settlement_summary: {
    description: 'Routed-intent counts per rail over the last N days.',
    schema: z.object({
      days: z.coerce.number().int().min(1).max(90).default(7),
    }),
    build: (p) => ({
      query:
        'SELECT rail, count() AS routed_intents ' +
        'FROM intent_events FINAL ' +
        "WHERE event_type = 'routed' AND ts >= now() - toIntervalDay({days:UInt32}) " +
        'GROUP BY rail ORDER BY routed_intents DESC',
      params: { days: p.days as number },
    }),
  },
};

export const NAMED_QUERY_NAMES = Object.keys(NAMED_QUERIES);
