import { describe, expect, it } from 'vitest';
import { SUBJECTS } from '@salychain/events';
import { chDateTime, toCanonicalRow } from './mappers.js';

const base = {
  schema_version: '1' as const,
  event_id: '01J0000000000000000000000A',
  occurred_at: '2026-06-24T12:00:00.000Z',
};

describe('chDateTime', () => {
  it('formats to ClickHouse DateTime64(3)', () => {
    expect(chDateTime(new Date('2026-06-24T12:00:00.000Z'))).toBe('2026-06-24 12:00:00.000');
  });
});

describe('toCanonicalRow', () => {
  it('maps a base transfer to token_transfers', () => {
    const mapped = toCanonicalRow(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, {
      ...base,
      chain: 'BASE',
      block_number: 100,
      block_hash: '0xabc',
      tx_hash: '0xdead',
      log_index: 3,
      contract_address: '0xtoken',
      from: '0xfrom',
      to: '0xto',
      amount_minor: '1000000',
      asset: 'USDC',
    } as never);
    expect(mapped).not.toBeNull();
    expect(mapped?.table).toBe('token_transfers');
    expect(mapped?.row).toMatchObject({
      chain_id: 'base',
      tx_hash: '0xdead',
      log_index: 3,
      transfer_type: 'erc20',
      token_symbol: 'USDC',
      amount_raw: '1000000',
      event_id: base.event_id,
    });
  });

  it('maps an xrpl IOU payment with composite token address', () => {
    const mapped = toCanonicalRow(SUBJECTS.CHAIN_XRPL_PAYMENT_OBSERVED, {
      ...base,
      chain: 'XRPL',
      ledger_index: 42,
      close_time: 1_700_000_000,
      tx_hash: 'ABC',
      from: 'rFrom',
      to: 'rTo',
      iou: { currency: 'USD', issuer: 'rIssuer', value: '12.5' },
      fee_drops: '10',
    } as never);
    expect(mapped?.row).toMatchObject({
      chain_id: 'xrpl',
      transfer_type: 'xrpl_iou',
      token_address: 'USD.rIssuer',
      amount_raw: '12.5',
    });
  });

  it('maps intent.screened into intent_events', () => {
    const mapped = toCanonicalRow(SUBJECTS.INTENT_SCREENED, {
      ...base,
      intent_id: 'int_1',
      kind: 'payout',
      compliance_decision: 'ALLOW',
      risk_decision: 'REVIEW',
      risk_score: 42,
      flags: [],
    } as never);
    expect(mapped?.table).toBe('intent_events');
    expect(mapped?.row).toMatchObject({
      intent_id: 'int_1',
      event_type: 'screened',
      risk_score: 42,
      compliance_decision: 'ALLOW',
    });
  });

  it('maps agent.created and serializes wallet_ids', () => {
    const mapped = toCanonicalRow(SUBJECTS.AGENT_CREATED, {
      ...base,
      agent_id: 'agt_1',
      owner_id: 'usr_1',
      owner_kind: 'USER',
      wallet_ids: ['w1', 'w2'],
    } as never);
    expect(mapped?.table).toBe('agent_events');
    expect(mapped?.row.wallet_ids).toBe('["w1","w2"]');
  });
});
