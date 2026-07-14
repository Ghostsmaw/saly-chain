import type { QueryParams } from '../clickhouse/clickhouse.read.service.js';

export interface BuiltQuery {
  readonly query: string;
  readonly params: QueryParams;
}

/** EVM zero address — mint = transfer FROM zero, burn = transfer TO zero. */
export const ZERO_EVM = '0x0000000000000000000000000000000000000000';

const TRANSFER_COLUMNS =
  'chain_id, tx_hash, log_index, ts, block_number, token_address, token_symbol, ' +
  'from_address, to_address, amount_raw, transfer_type';

export interface TransferFilters {
  chain?: string;
  token?: string;
  address?: string;
  limit: number;
  offset: number;
}

export function buildTransfersQuery(f: TransferFilters): BuiltQuery {
  const params: QueryParams = { limit: f.limit, offset: f.offset };
  const where: string[] = [];
  if (f.chain) {
    where.push('chain_id = {chain:String}');
    params.chain = f.chain;
  }
  if (f.token) {
    where.push('token_symbol = {token:String}');
    params.token = f.token;
  }
  if (f.address) {
    where.push('(from_address = {address:String} OR to_address = {address:String})');
    params.address = f.address;
  }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const query =
    `SELECT ${TRANSFER_COLUMNS} FROM token_transfers FINAL ` +
    `${whereSql} ORDER BY ts DESC LIMIT {limit:UInt32} OFFSET {offset:UInt32}`;
  return { query, params };
}

export function buildAddressBalancesQuery(chain: string, address: string): BuiltQuery {
  const query =
    'SELECT token_symbol, ' +
    'sum(if(to_address = {address:String}, toFloat64OrZero(amount_raw), 0)) - ' +
    'sum(if(from_address = {address:String}, toFloat64OrZero(amount_raw), 0)) AS net_amount, ' +
    'countIf(to_address = {address:String}) AS transfers_in, ' +
    'countIf(from_address = {address:String}) AS transfers_out ' +
    'FROM token_transfers FINAL ' +
    'WHERE chain_id = {chain:String} AND (from_address = {address:String} OR to_address = {address:String}) ' +
    'GROUP BY token_symbol ORDER BY token_symbol';
  return { query, params: { chain, address } };
}

export function buildTxTransfersQuery(chain: string, hash: string): BuiltQuery {
  const query =
    `SELECT ${TRANSFER_COLUMNS} FROM token_transfers FINAL ` +
    'WHERE chain_id = {chain:String} AND tx_hash = {hash:String} ORDER BY log_index';
  return { query, params: { chain, hash } };
}

export function buildTxDecodedQuery(chain: string, hash: string): BuiltQuery {
  const query =
    'SELECT chain_id, tx_hash, log_index, ts, contract_address, event_name, args ' +
    'FROM decoded_events FINAL ' +
    'WHERE chain_id = {chain:String} AND tx_hash = {hash:String} ORDER BY log_index, event_name';
  return { query, params: { chain, hash } };
}

export function buildTxLineageLookupQuery(hash: string): BuiltQuery {
  const query =
    'SELECT transaction_id, any(intent_id) AS intent_id ' +
    'FROM tx_lifecycle ' +
    'WHERE tx_hash = {hash:String} ' +
    'GROUP BY transaction_id LIMIT 1';
  return { query, params: { hash } };
}

export function buildTxStatesQuery(transactionId: string): BuiltQuery {
  const query =
    'SELECT state, ts, kind, rail, tx_hash, amount_minor, currency, reason_code ' +
    'FROM tx_lifecycle FINAL ' +
    'WHERE transaction_id = {tid:String} ORDER BY ts';
  return { query, params: { tid: transactionId } };
}

export function buildTxByIntentQuery(intentId: string): BuiltQuery {
  const query =
    'SELECT transaction_id, argMax(state, ts) AS latest_state, ' +
    "anyIf(tx_hash, state = 'settled') AS settle_tx_hash, " +
    "anyIf(rail, rail != '') AS rail, " +
    'min(ts) AS first_at, max(ts) AS last_at ' +
    'FROM tx_lifecycle FINAL ' +
    'WHERE intent_id = {iid:String} ' +
    'GROUP BY transaction_id ORDER BY last_at';
  return { query, params: { iid: intentId } };
}

export function buildIntentTraceQuery(intentId: string): BuiltQuery {
  const query =
    'SELECT event_type, ts, kind, source, actor_id, compliance_decision, risk_decision, ' +
    'risk_score, rail, expected_cost_minor, expected_seconds, reason_code ' +
    'FROM intent_events FINAL ' +
    'WHERE intent_id = {iid:String} ORDER BY ts';
  return { query, params: { iid: intentId } };
}

export function buildStablecoinSupplyQuery(symbol: string): BuiltQuery {
  const minted = 'sum(if(from_address = {zero:String}, toFloat64OrZero(amount_raw), 0))';
  const burned = 'sum(if(to_address = {zero:String}, toFloat64OrZero(amount_raw), 0))';
  const query =
    `SELECT chain_id, ${minted} AS minted, ${burned} AS burned, ` +
    `${minted} - ${burned} AS net_supply ` +
    'FROM token_transfers FINAL ' +
    'WHERE token_symbol = {symbol:String} ' +
    'GROUP BY chain_id ORDER BY chain_id';
  return { query, params: { symbol, zero: ZERO_EVM } };
}

export function buildBlockQuery(chain: string, blockNumber: number): BuiltQuery {
  const query =
    'SELECT chain_id, block_number, block_hash, ts, event_id ' +
    'FROM blocks FINAL ' +
    'WHERE chain_id = {chain:String} AND block_number = {block:UInt64} LIMIT 1';
  return { query, params: { chain, block: blockNumber } };
}

export function buildBlockTransfersQuery(chain: string, blockNumber: number, limit: number): BuiltQuery {
  const query =
    `SELECT ${TRANSFER_COLUMNS} FROM token_transfers FINAL ` +
    'WHERE chain_id = {chain:String} AND block_number = {block:UInt64} ' +
    'ORDER BY log_index LIMIT {limit:UInt32}';
  return { query, params: { chain, block: blockNumber, limit } };
}

export function buildL3OutputProposedQuery(limit: number, chain?: string): BuiltQuery {
  const params: QueryParams = { limit };
  const where = ["event_name = 'OutputProposed'"];
  if (chain) {
    where.push('chain_id = {chain:String}');
    params.chain = chain;
  }
  const query =
    'SELECT chain_id, tx_hash, log_index, ts, contract_address, event_name, args ' +
    `FROM decoded_events FINAL WHERE ${where.join(' AND ')} ` +
    'ORDER BY ts DESC LIMIT {limit:UInt32}';
  return { query, params };
}
