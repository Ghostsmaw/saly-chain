import { z } from 'zod';

/**
 * Classification drives the redaction engine's *fail-closed* defaults: a column
 * tagged PII or ADDRESS is redacted unless the share's policy explicitly allows
 * it. NONE columns pass through by default.
 */
export type ColumnClass = 'NONE' | 'ADDRESS' | 'PII';

export interface ColumnSpec {
  readonly name: string;
  readonly type: 'string' | 'number' | 'date';
  readonly class: ColumnClass;
  readonly description?: string;
}

export interface BuiltQuery {
  readonly query: string;
  readonly params: Record<string, string | number | boolean>;
}

/**
 * A curated, allowlisted dataset. Customers never send SQL: they pick a dataset
 * id and supply validated params, which are bound as ClickHouse query params.
 * The declared `columns` are the governance contract — only these columns are
 * ever emitted, and their `class` selects the default redaction behaviour.
 */
export interface NamedDataset {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly columns: readonly ColumnSpec[];
  readonly schema: z.ZodTypeAny;
  readonly build: (params: Record<string, unknown>) => BuiltQuery;
}

const lookbackDays = z.coerce.number().int().min(1).max(365).default(30);
const rowLimit = z.coerce.number().int().min(1).max(1_000_000).default(100_000);
const chain = z.string().min(1).max(64).optional();

export const NAMED_DATASETS: Record<string, NamedDataset> = {
  token_transfers_daily: {
    id: 'token_transfers_daily',
    title: 'Daily token flows',
    description:
      'Daily transfer count and gross volume per chain + token. Aggregated; contains no addresses.',
    columns: [
      { name: 'dt', type: 'date', class: 'NONE' },
      { name: 'chain_id', type: 'string', class: 'NONE' },
      { name: 'token_symbol', type: 'string', class: 'NONE' },
      { name: 'transfers', type: 'number', class: 'NONE' },
      { name: 'volume', type: 'number', class: 'NONE' },
    ],
    schema: z.object({ chain, days: lookbackDays }),
    build: (p) => {
      const params: Record<string, string | number> = { days: p.days as number };
      let where = 'WHERE ts >= now() - toIntervalDay({days:UInt32})';
      if (p.chain) {
        where += ' AND chain_id = {chain:String}';
        params.chain = p.chain as string;
      }
      return {
        query:
          'SELECT toDate(ts) AS dt, chain_id, token_symbol, count() AS transfers, ' +
          'sum(toFloat64OrZero(amount_raw)) AS volume ' +
          `FROM token_transfers FINAL ${where} ` +
          'GROUP BY dt, chain_id, token_symbol ORDER BY dt DESC, volume DESC',
        params,
      };
    },
  },

  token_transfers_detail: {
    id: 'token_transfers_detail',
    title: 'Token transfers (row level)',
    description:
      'Row-level transfers including counterparties. from_address/to_address are ADDRESS-class and ' +
      'redacted by default; tx_hash is a quasi-identifier kept by default.',
    columns: [
      { name: 'chain_id', type: 'string', class: 'NONE' },
      { name: 'ts', type: 'date', class: 'NONE' },
      { name: 'tx_hash', type: 'string', class: 'NONE' },
      { name: 'token_symbol', type: 'string', class: 'NONE' },
      { name: 'from_address', type: 'string', class: 'ADDRESS' },
      { name: 'to_address', type: 'string', class: 'ADDRESS' },
      { name: 'amount_raw', type: 'string', class: 'NONE' },
      { name: 'transfer_type', type: 'string', class: 'NONE' },
    ],
    schema: z.object({ chain, days: lookbackDays, limit: rowLimit }),
    build: (p) => {
      const params: Record<string, string | number> = {
        days: p.days as number,
        limit: p.limit as number,
      };
      let where = 'WHERE ts >= now() - toIntervalDay({days:UInt32})';
      if (p.chain) {
        where += ' AND chain_id = {chain:String}';
        params.chain = p.chain as string;
      }
      return {
        query:
          'SELECT chain_id, ts, tx_hash, token_symbol, from_address, to_address, amount_raw, ' +
          'transfer_type ' +
          `FROM token_transfers FINAL ${where} ` +
          'ORDER BY ts DESC LIMIT {limit:UInt32}',
        params,
      };
    },
  },

  rail_settlement_daily: {
    id: 'rail_settlement_daily',
    title: 'Daily rail settlement',
    description: 'Routed-intent counts per rail per day. Aggregated; contains no PII.',
    columns: [
      { name: 'dt', type: 'date', class: 'NONE' },
      { name: 'rail', type: 'string', class: 'NONE' },
      { name: 'routed_intents', type: 'number', class: 'NONE' },
    ],
    schema: z.object({ days: lookbackDays }),
    build: (p) => ({
      query:
        'SELECT toDate(ts) AS dt, rail, count() AS routed_intents ' +
        'FROM intent_events FINAL ' +
        "WHERE event_type = 'routed' AND ts >= now() - toIntervalDay({days:UInt32}) " +
        'GROUP BY dt, rail ORDER BY dt DESC, routed_intents DESC',
      params: { days: p.days as number },
    }),
  },
};

export const NAMED_DATASET_IDS = Object.keys(NAMED_DATASETS);

export function getDataset(id: string): NamedDataset | undefined {
  return NAMED_DATASETS[id];
}
