import { describe, expect, it } from 'vitest';
import { SUBJECTS } from '@salychain/events';
import { extractEventFacets } from './facets.js';
import { CompiledFilter, parseStreamFilter, subjectMatches } from './filter.js';

const ENVELOPE = {
  schema_version: '1',
  event_id: 'evt_1',
  occurred_at: '2026-01-01T00:00:00.000Z',
};

const baseTransfer = {
  ...ENVELOPE,
  chain: 'BASE',
  block_number: 100,
  block_hash: '0xblock',
  tx_hash: '0xtx',
  log_index: 0,
  contract_address: '0xUSDCcontract',
  from: '0xAAA111',
  to: '0xBBB222',
  amount_minor: '1500000', // 1.5 USDC (6dp)
  asset: 'USDC',
};

const l3Transfer = {
  ...ENVELOPE,
  chain: 'SALY_L3',
  l3_network: 'saly-devnet',
  block_number: 5,
  block_hash: '0xb',
  tx_hash: '0xt',
  log_index: 1,
  contract_address: '0xL3usdc',
  from: '0xCCC',
  to: '0xDDD',
  amount_minor: '9000000000',
  asset: 'USDC',
};

const xrplPayment = {
  ...ENVELOPE,
  chain: 'XRPL',
  ledger_index: 42,
  close_time: 1,
  tx_hash: 'ABC',
  from: 'rSenderXRP',
  to: 'rDestXRP',
  amount_drops: '25000000', // 25 XRP
  fee_drops: '10',
};

const txCreated = {
  ...ENVELOPE,
  transaction_id: 'tx_1',
  kind: 'BASE_PAYOUT',
  source: { wallet_id: 'w1', amount_minor: '500000', currency: 'USDC' },
  destination: { address: '0xRECIPIENT', chain: 'BASE' },
  intent_id: 'int_1',
};

const agentCreated = {
  ...ENVELOPE,
  agent_id: 'agent_99',
  owner_id: 'u1',
  owner_kind: 'USER',
  wallet_ids: ['w1'],
};

function f(filter: Parameters<typeof parseStreamFilter>[0]): CompiledFilter {
  return new CompiledFilter(parseStreamFilter(filter));
}

describe('subjectMatches', () => {
  it('matches exact subjects', () => {
    expect(subjectMatches('salychain.tx.settled', 'salychain.tx.settled')).toBe(true);
    expect(subjectMatches('salychain.tx.settled', 'salychain.tx.failed')).toBe(false);
  });
  it('supports single-token wildcard', () => {
    expect(subjectMatches('salychain.tx.*', 'salychain.tx.settled')).toBe(true);
    expect(subjectMatches('salychain.tx.*', 'salychain.chain.base.transfer_observed')).toBe(false);
    expect(
      subjectMatches(
        'salychain.chain.*.transfer_observed',
        'salychain.chain.base.transfer_observed',
      ),
    ).toBe(true);
  });
  it('supports greedy tail wildcard', () => {
    expect(subjectMatches('salychain.chain.>', 'salychain.chain.base.transfer_observed')).toBe(
      true,
    );
    expect(subjectMatches('salychain.>', 'salychain.agent.created')).toBe(true);
    expect(subjectMatches('salychain.chain.>', 'salychain.tx.settled')).toBe(false);
  });
});

describe('extractEventFacets', () => {
  it('extracts base transfer facets', () => {
    const facets = extractEventFacets(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, baseTransfer);
    expect(facets.chain).toBe('BASE');
    expect(facets.asset).toBe('USDC');
    expect(facets.amountMinor).toBe(1_500_000n);
    expect(facets.fromAddress).toBe('0xaaa111');
    expect(facets.toAddress).toBe('0xbbb222');
    expect(facets.addresses).toContain('0xusdccontract');
  });

  it('infers XRP asset and drops amount for xrpl payments', () => {
    const facets = extractEventFacets(SUBJECTS.CHAIN_XRPL_PAYMENT_OBSERVED, xrplPayment);
    expect(facets.chain).toBe('XRPL');
    expect(facets.asset).toBe('XRP');
    expect(facets.amountMinor).toBe(25_000_000n);
    expect(facets.fromAddress).toBe('rsenderxrp');
  });

  it('derives chain + amount + kind from tx.created source/destination', () => {
    const facets = extractEventFacets(SUBJECTS.TX_CREATED, txCreated);
    expect(facets.chain).toBe('BASE');
    expect(facets.asset).toBe('USDC');
    expect(facets.amountMinor).toBe(500_000n);
    expect(facets.kind).toBe('BASE_PAYOUT');
    expect(facets.toAddress).toBe('0xrecipient');
    expect(facets.intentId).toBe('int_1');
  });

  it('extracts agent id for agent events', () => {
    const facets = extractEventFacets(SUBJECTS.AGENT_CREATED, agentCreated);
    expect(facets.agentId).toBe('agent_99');
    expect(facets.chain).toBeUndefined();
  });

  it('rejects non-integer amount strings', () => {
    const facets = extractEventFacets(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, {
      ...baseTransfer,
      amount_minor: '1.5',
    });
    expect(facets.amountMinor).toBeUndefined();
  });
});

describe('CompiledFilter — empty filter is a firehose', () => {
  it('matches everything', () => {
    const filter = f({});
    expect(filter.matches(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, baseTransfer)).toBe(true);
    expect(filter.matches(SUBJECTS.AGENT_CREATED, agentCreated)).toBe(true);
  });
});

describe('CompiledFilter — subjects', () => {
  it('scopes to matching subjects only', () => {
    const filter = f({ subjects: ['salychain.chain.*.transfer_observed'] });
    expect(filter.matches(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, baseTransfer)).toBe(true);
    expect(filter.matches(SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED, l3Transfer)).toBe(true);
    expect(filter.matches(SUBJECTS.TX_CREATED, txCreated)).toBe(false);
  });
});

describe('CompiledFilter — chain / asset', () => {
  it('matches case-insensitively on chain', () => {
    expect(
      f({ chains: ['base'] }).matches(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, baseTransfer),
    ).toBe(true);
    expect(
      f({ chains: ['XRPL'] }).matches(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, baseTransfer),
    ).toBe(false);
  });
  it('matches on asset', () => {
    expect(f({ assets: ['USDC'] }).matches(SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED, l3Transfer)).toBe(
      true,
    );
    expect(f({ assets: ['ETH'] }).matches(SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED, l3Transfer)).toBe(
      false,
    );
  });
  it('excludes events lacking the faceted field', () => {
    // agent.created has no chain facet → a chain filter must not match it
    expect(f({ chains: ['BASE'] }).matches(SUBJECTS.AGENT_CREATED, agentCreated)).toBe(false);
  });
});

describe('CompiledFilter — amount thresholds (fail-closed)', () => {
  it('applies inclusive lower bound', () => {
    expect(
      f({ minAmountMinor: '1500000' }).matches(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, baseTransfer),
    ).toBe(true);
    expect(
      f({ minAmountMinor: '1500001' }).matches(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, baseTransfer),
    ).toBe(false);
  });
  it('applies inclusive upper bound', () => {
    expect(
      f({ maxAmountMinor: '1500000' }).matches(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, baseTransfer),
    ).toBe(true);
    expect(
      f({ maxAmountMinor: '1499999' }).matches(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, baseTransfer),
    ).toBe(false);
  });
  it('handles huge values beyond Number precision via bigint', () => {
    expect(
      f({ minAmountMinor: '9000000000' }).matches(SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED, l3Transfer),
    ).toBe(true);
    expect(
      f({ minAmountMinor: '9000000001' }).matches(SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED, l3Transfer),
    ).toBe(false);
  });
  it('excludes amount-less events when a bound is set', () => {
    expect(f({ minAmountMinor: '1' }).matches(SUBJECTS.AGENT_CREATED, agentCreated)).toBe(false);
  });
});

describe('CompiledFilter — addresses + direction', () => {
  it('matches either direction by default', () => {
    expect(
      f({ addresses: ['0xBBB222'] }).matches(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, baseTransfer),
    ).toBe(true);
    expect(
      f({ addresses: ['0xAAA111'] }).matches(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, baseTransfer),
    ).toBe(true);
  });
  it('honors from-direction', () => {
    expect(
      f({ addresses: ['0xAAA111'], direction: 'from' }).matches(
        SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED,
        baseTransfer,
      ),
    ).toBe(true);
    expect(
      f({ addresses: ['0xBBB222'], direction: 'from' }).matches(
        SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED,
        baseTransfer,
      ),
    ).toBe(false);
  });
  it('honors to-direction', () => {
    expect(
      f({ addresses: ['0xBBB222'], direction: 'to' }).matches(
        SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED,
        baseTransfer,
      ),
    ).toBe(true);
    expect(
      f({ addresses: ['0xAAA111'], direction: 'to' }).matches(
        SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED,
        baseTransfer,
      ),
    ).toBe(false);
  });
});

describe('CompiledFilter — kind / agent', () => {
  it('matches tx kind', () => {
    expect(f({ kinds: ['BASE_PAYOUT'] }).matches(SUBJECTS.TX_CREATED, txCreated)).toBe(true);
    expect(f({ kinds: ['SWAP'] }).matches(SUBJECTS.TX_CREATED, txCreated)).toBe(false);
  });
  it('matches agent id', () => {
    expect(f({ agentIds: ['agent_99'] }).matches(SUBJECTS.AGENT_CREATED, agentCreated)).toBe(true);
    expect(f({ agentIds: ['agent_00'] }).matches(SUBJECTS.AGENT_CREATED, agentCreated)).toBe(false);
  });
});

describe('CompiledFilter — combined clauses are AND-ed', () => {
  it('requires all clauses to pass', () => {
    const filter = f({
      subjects: ['salychain.chain.base.>'],
      chains: ['BASE'],
      assets: ['USDC'],
      minAmountMinor: '1000000',
      addresses: ['0xAAA111'],
      direction: 'from',
    });
    expect(filter.matches(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, baseTransfer)).toBe(true);

    // flip one clause: amount below floor
    expect(
      filter.matches(SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED, {
        ...baseTransfer,
        amount_minor: '999999',
      }),
    ).toBe(false);
  });
});

describe('parseStreamFilter — validation', () => {
  it('rejects unknown keys', () => {
    expect(() => parseStreamFilter({ bogus: true })).toThrow();
  });
  it('rejects min > max', () => {
    expect(() => parseStreamFilter({ minAmountMinor: '10', maxAmountMinor: '5' })).toThrow();
  });
  it('rejects non-integer amount bounds', () => {
    expect(() => parseStreamFilter({ minAmountMinor: '1.5' })).toThrow();
  });
  it('rejects direction without addresses', () => {
    expect(() => parseStreamFilter({ direction: 'from' })).toThrow();
  });
  it('accepts an empty filter', () => {
    expect(parseStreamFilter({})).toEqual({});
    expect(parseStreamFilter(undefined)).toEqual({});
  });
});
