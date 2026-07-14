import { BadRequestException, Injectable } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { ClickHouseReadService } from '../clickhouse/clickhouse.read.service.js';
import { analyticsApiEnvSchema } from '../config/env.js';
import { NAMED_QUERIES, NAMED_QUERY_NAMES } from './named-queries.js';
import type { NamedQueryDto, TransfersQueryDto } from './dto.js';
import {
  buildAddressBalancesQuery,
  buildBlockQuery,
  buildBlockTransfersQuery,
  buildIntentTraceQuery,
  buildL3OutputProposedQuery,
  buildStablecoinSupplyQuery,
  buildTransfersQuery,
  buildTxByIntentQuery,
  buildTxDecodedQuery,
  buildTxLineageLookupQuery,
  buildTxStatesQuery,
  buildTxTransfersQuery,
} from './sql.js';

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

@Injectable()
export class DataService {
  private readonly env = loadEnv(analyticsApiEnvSchema);

  constructor(private readonly ch: ClickHouseReadService) {}

  async transfers(dto: TransfersQueryDto) {
    const limit = clamp(dto.limit ?? this.env.QUERY_DEFAULT_LIMIT, 1, this.env.QUERY_MAX_LIMIT);
    const offset = Math.max(0, dto.offset ?? 0);
    const { query, params } = buildTransfersQuery({
      chain: dto.chain,
      token: dto.token,
      address: dto.address,
      limit,
      offset,
    });
    const data = await this.ch.query(query, params);
    return {
      data,
      paging: {
        limit,
        offset,
        next_offset: data.length === limit ? offset + limit : null,
      },
    };
  }

  async addressBalances(chain: string, address: string) {
    const { query, params } = buildAddressBalancesQuery(chain, address);
    const balances = await this.ch.query(query, params);
    return { chain, address, balances };
  }

  async tx(chain: string, hash: string) {
    const [transfers, decodedEvents, lineageLookup] = await Promise.all([
      this.run(buildTxTransfersQuery(chain, hash)),
      this.run(buildTxDecodedQuery(chain, hash)),
      this.run<{ transaction_id: string; intent_id: string }>(buildTxLineageLookupQuery(hash)),
    ]);

    let lineage: unknown = null;
    const hit = lineageLookup[0];
    if (hit?.transaction_id) {
      const [states, intentTrace] = await Promise.all([
        this.run(buildTxStatesQuery(hit.transaction_id)),
        hit.intent_id ? this.run(buildIntentTraceQuery(hit.intent_id)) : Promise.resolve([]),
      ]);
      lineage = {
        transaction_id: hit.transaction_id,
        intent_id: hit.intent_id || null,
        states,
        intent_trace: intentTrace,
      };
    }

    return {
      chain,
      tx_hash: hash,
      transfers,
      decoded_events: decodedEvents,
      salychain_originated: lineage !== null,
      lineage,
    };
  }

  async intentLineage(intentId: string) {
    const [intentTrace, txs] = await Promise.all([
      this.run(buildIntentTraceQuery(intentId)),
      this.run<{ transaction_id: string }>(buildTxByIntentQuery(intentId)),
    ]);
    const transactions = await Promise.all(
      txs.map(async (t) => ({
        ...t,
        states: await this.run(buildTxStatesQuery(t.transaction_id)),
      })),
    );
    return {
      intent_id: intentId,
      found: intentTrace.length > 0 || transactions.length > 0,
      intent_trace: intentTrace,
      transactions,
    };
  }

  async block(chain: string, blockNumber: number) {
    const limit = this.env.QUERY_MAX_LIMIT;
    const [blocks, transfers] = await Promise.all([
      this.run(buildBlockQuery(chain, blockNumber)),
      this.run(buildBlockTransfersQuery(chain, blockNumber, limit)),
    ]);
    return {
      chain,
      block_number: blockNumber,
      found: blocks.length > 0,
      block: blocks[0] ?? null,
      transfers,
    };
  }

  async l3Settlements(chain?: string, limit = 50) {
    const capped = clamp(limit, 1, this.env.QUERY_MAX_LIMIT);
    const outputs = await this.run(buildL3OutputProposedQuery(capped, chain));
    return { chain: chain ?? null, data: outputs };
  }

  async stablecoinSupply(symbol = 'USDC') {
    const rows = await this.run<{ chain_id: string; net_supply: number }>(
      buildStablecoinSupplyQuery(symbol),
    );
    const total = rows.reduce((sum, r) => sum + Number(r.net_supply ?? 0), 0);
    return { asset: symbol, by_chain: rows, total_net_supply: total };
  }

  async runNamed(dto: NamedQueryDto) {
    const named = NAMED_QUERIES[dto.query];
    if (!named) {
      throw new BadRequestException(
        `Unknown query '${dto.query}'. Allowed: ${NAMED_QUERY_NAMES.join(', ')}`,
      );
    }
    const parsed = named.schema.safeParse(dto.params ?? {});
    if (!parsed.success) {
      throw new BadRequestException(`Invalid params for '${dto.query}': ${parsed.error.message}`);
    }
    const data = await this.run(named.build(parsed.data as Record<string, unknown>));
    return { query: dto.query, data };
  }

  /** List the allowlisted named queries (for discovery). */
  describeQueries() {
    return {
      queries: NAMED_QUERY_NAMES.map((name) => ({
        name,
        description: NAMED_QUERIES[name]!.description,
      })),
    };
  }

  private run<T = Record<string, unknown>>(built: { query: string; params: Record<string, string | number | boolean> }) {
    return this.ch.query<T>(built.query, built.params);
  }
}
