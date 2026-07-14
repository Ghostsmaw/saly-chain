import type { FinalityChain } from './policy.js';

export interface SettlementFinality {
  chain: FinalityChain;
  block_number: number;
  block_hash?: string;
  confirmation_depth: number;
  ledger_settle_entry_id?: string;
}

type TxEventLike = {
  toState: string;
  detail: unknown;
};

/** Parse finality metadata stamped on the SETTLED transition event. */
export function extractSettlementFinality(events: readonly TxEventLike[]): SettlementFinality | undefined {
  for (const event of events) {
    if (event.toState !== 'SETTLED') continue;
    const detail = event.detail;
    if (!detail || typeof detail !== 'object') continue;

    const record = detail as Record<string, unknown>;
    const finality = record.finality;
    if (!finality || typeof finality !== 'object') continue;

    const f = finality as Record<string, unknown>;
    if (typeof f.chain !== 'string' || typeof f.block_number !== 'number') continue;

    return {
      chain: f.chain as FinalityChain,
      block_number: f.block_number,
      confirmation_depth: typeof f.confirmation_depth === 'number' ? f.confirmation_depth : 0,
      ...(typeof f.block_hash === 'string' ? { block_hash: f.block_hash } : {}),
      ...(typeof record.ledger_settle_entry_id === 'string'
        ? { ledger_settle_entry_id: record.ledger_settle_entry_id }
        : {}),
    };
  }
  return undefined;
}
